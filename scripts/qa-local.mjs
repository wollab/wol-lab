import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';

const playwrightUrl = pathToFileURL('C:/Users/moren/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs').href;
const { chromium } = await import(playwrightUrl);
const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const browser = await chromium.launch({ channel: 'msedge', headless: true });
const results = [];

for (const viewport of [{ width: 1440, height: 1050, name: 'desktop' }, { width: 390, height: 844, name: 'mobile' }]) {
  const page = await browser.newPage({ viewport });
  const errors = [];
  page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });
  page.on('pageerror', (error) => errors.push(error.message));

  await page.goto('http://127.0.0.1:5184/', { waitUntil: 'networkidle' });
  await page.screenshot({ path: path.join(projectRoot, 'design', `qa-home-${viewport.name}.png`), fullPage: true });
  const initialCards = await page.locator('.resource-card').count();
  const featuredSections = await page.locator('.featured-section').count();
  const facebookProjectLinks = await page.locator('.resource-card a[aria-label*="Facebook"]').count();
  let reportDownload = '';
  if (viewport.name === 'desktop') {
    const [download] = await Promise.all([page.waitForEvent('download'), page.getByRole('button', { name: 'ดาวน์โหลดรายงานงานต่อ' }).click()]);
    reportDownload = download.suggestedFilename();
  }
  await page.locator('.plan-button').first().click();
  const projectUpdateVisible = await page.locator('.project-update').first().isVisible();
  if (viewport.name === 'desktop') await page.screenshot({ path: path.join(projectRoot, 'design', 'qa-home-update-desktop.png'), fullPage: false });
  await page.getByPlaceholder('ค้นหาเว็บไซต์ เครื่องมือ หรือแบบฟอร์ม').fill('ประวัติศาสตร์');
  const filteredCards = await page.locator('.directory-section .resource-card').count();
  await page.getByPlaceholder('ค้นหาเว็บไซต์ เครื่องมือ หรือแบบฟอร์ม').fill('');
  await page.getByRole('button', { name: 'QR Code' }).first().click();
  const qrVisible = await page.locator('.qr-code svg').isVisible();
  await page.getByRole('button', { name: 'ปิด', exact: true }).click();
  const bodyWidth = await page.locator('body').evaluate((element) => ({ scroll: element.scrollWidth, client: element.clientWidth }));

  await page.goto('http://127.0.0.1:5184/admin', { waitUntil: 'networkidle' });
  await page.screenshot({ path: path.join(projectRoot, 'design', `qa-admin-${viewport.name}.png`), fullPage: true });
  await page.getByLabel('ชื่อเรื่อง *').fill('การเรียนรู้แบบลงมือทำ — QA');
  await page.getByRole('button', { name: 'ดูตัวอย่าง' }).click();
  const previewVisible = await page.getByText('ตัวอย่างก่อนเผยแพร่').isVisible();
  await page.getByRole('button', { name: 'ปิด', exact: true }).click();

  const pilotAdmins = [];
  let layoutManagerVisible = false;
  let reorderedFirstGroup = '';
  if (viewport.name === 'desktop') {
    for (const siteId of ['meta-learning', 'thai-people-history', 'product-landing-pages', 'wol-lab']) {
      await page.goto(`http://127.0.0.1:5184/admin/${siteId}`, { waitUntil: 'networkidle' });
      pilotAdmins.push({ siteId, editorVisible: await page.locator('.editor').isVisible(), itemCount: await page.locator('.content-list > button').count() });
      if (siteId === 'wol-lab') await page.screenshot({ path: path.join(projectRoot, 'design', 'qa-admin-wol-desktop.png'), fullPage: false });
    }
    layoutManagerVisible = await page.locator('.layout-manager').isVisible();
    await page.getByRole('button', { name: 'เลื่อน คลังความรู้และประวัติศาสตร์ ลง' }).click();
    await page.goto('http://127.0.0.1:5184/', { waitUntil: 'networkidle' });
    reorderedFirstGroup = await page.locator('.resource-group .group-heading h3').first().innerText();
  }

  results.push({ viewport, initialCards, featuredSections, facebookProjectLinks, reportDownload, projectUpdateVisible, filteredCards, qrVisible, previewVisible, pilotAdmins, layoutManagerVisible, reorderedFirstGroup, bodyWidth, errors });
  await page.close();
}

await browser.close();
const failed = results.some((result) => result.errors.length || result.featuredSections !== 0 || result.facebookProjectLinks !== 5 || !result.projectUpdateVisible || !result.qrVisible || !result.previewVisible || result.pilotAdmins.some((site) => !site.editorVisible || site.itemCount === 0) || (result.viewport.name === 'desktop' && (!result.reportDownload.endsWith('.md') || !result.layoutManagerVisible || result.reorderedFirstGroup !== 'เกมและเครื่องมือเรียนรู้')) || result.bodyWidth.scroll > result.bodyWidth.client + 1 || result.filteredCards === 0);
console.log(JSON.stringify(results, null, 2));
if (failed) process.exit(1);
