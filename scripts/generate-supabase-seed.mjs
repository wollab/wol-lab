import { writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { adminSites } from '../src/adminSites.js';
import { resources } from '../src/resources.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sql = (value) => `'${String(value ?? '').replaceAll("'", "''")}'`;
const json = (value) => `${sql(JSON.stringify(value))}::jsonb`;
const array = (value) => `array[${(value || []).map(sql).join(',')}]::text[]`;

const resourceRows = resources.map((item) => `(
  ${sql(item.id)}, ${sql(item.title)}, ${sql(item.summary)}, ${sql(item.category)}, ${sql(item.categoryLabel)},
  ${sql(item.status)}, ${sql(item.visibility)}, ${sql(item.url)}, ${sql(item.cover)}, ${json(item.socialLinks)},
  ${array(item.tags)}, ${Boolean(item.featured)}, ${sql(item.milestone)}, ${sql(item.nextStep)}, ${sql(item.needs)},
  ${sql(item.updateStatus)}, ${sql(item.updatedAt)}::date, ${sql(item.lastVerifiedAt)}::date
)`).join(',\n');

const contentRows = Object.values(adminSites)
  .filter((site) => site.id !== 'wol-lab')
  .flatMap((site) => site.seed.map((item) => {
    const { id, title, status, ...fields } = item;
    return `(${sql(site.id)}, 'entry', ${sql(id)}, ${sql(title)}, ${json(fields)}, ${sql(status)})`;
  })).join(',\n');

const output = `-- Generated from src/resources.js and src/adminSites.js.\n-- Re-run npm run generate:seed after changing canonical seed data.\n\ninsert into public.resources\n  (id, title, summary, category, category_label, status, visibility, canonical_url, cover_url, social_links, tags, featured, milestone, next_step, needs, update_status, reviewed_at, last_verified_at)\nvalues\n${resourceRows}\non conflict (id) do update set\n  title = excluded.title, summary = excluded.summary, category = excluded.category, category_label = excluded.category_label,\n  status = excluded.status, visibility = excluded.visibility, canonical_url = excluded.canonical_url, cover_url = excluded.cover_url,\n  social_links = excluded.social_links, tags = excluded.tags, featured = excluded.featured, milestone = excluded.milestone,\n  next_step = excluded.next_step, needs = excluded.needs, update_status = excluded.update_status,\n  reviewed_at = excluded.reviewed_at, last_verified_at = excluded.last_verified_at, updated_at = now();\n\ninsert into public.content_items (site_id, content_type, slug, title, fields, status)\nvalues\n${contentRows}\non conflict (site_id, content_type, slug) do update set\n  title = excluded.title, fields = excluded.fields, status = excluded.status, updated_at = now();\n`;

await writeFile(path.join(root, 'supabase', 'seed.sql'), output, 'utf8');
console.log(`Generated Supabase seed for ${resources.length} resources and ${contentRows ? Object.values(adminSites).filter((site) => site.id !== 'wol-lab').reduce((sum, site) => sum + site.seed.length, 0) : 0} content items.`);
