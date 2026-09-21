import { resources } from '../src/resources.js';
import { mkdir } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';

const playwrightUrl = pathToFileURL('C:/Users/moren/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs').href;
const { chromium } = await import(playwrightUrl);

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outDir = path.join(projectRoot, 'public', 'covers');
await mkdir(outDir, { recursive: true });

const browser = await chromium.launch({ channel: 'msedge', headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 760 }, deviceScaleFactor: 1 });
for (const resource of resources) {
  const output = path.join(outDir, `${resource.id}.png`);
  try {
    await page.goto(resource.url, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(1200);
    await page.screenshot({ path: output, type: 'png' });
    console.log(`captured ${resource.id}`);
  } catch (error) {
    console.warn(`skipped ${resource.id}: ${error.message}`);
  }
}
await browser.close();
