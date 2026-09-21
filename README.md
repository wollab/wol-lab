# WoL Lab Directory

Local implementation preview for `wollab.wizardsoflearning.com`.

## Included

- Public directory with verified WoL websites, tools, products, forms and systems
- Real WoL logo and direct category-first navigation; no featured-content detour
- Public/private filtering and team-mode preview
- Search, category filters, grouped resource sections and downloadable SVG QR codes
- Per-project expandable milestone, next step and missing-input summary, plus downloadable Markdown report
- WoL Lab Admin category naming, section ordering and visibility controls stored in the local preview
- Responsive `/admin` prototype with site-specific fields and Draft → Preview → Publish flow
- Shared Supabase schema for Google allowlist roles, resources, content, revisions and social post ledger
- Data validation that blocks public Google Form edit URLs
- Browser-cover capture script using current live websites

The local Admin stores demo edits in browser storage until Supabase environment values are supplied. It never embeds a service key or GitHub token in the browser.

Category names edited in WoL Lab Admin propagate to the work-type cards, filter navigation, section headings and category labels on resource cards after refresh.

Only resources with a confirmed project-specific Facebook Page or Group show a Facebook button. Other projects do not inherit the main WoL Facebook link.

## Run

```powershell
npm install
npm run capture:covers
npm test
npm run build
npm run dev -- --host 127.0.0.1 --port 5184
```

Open:

- Directory: `http://127.0.0.1:5184/`
- Admin selector: `http://127.0.0.1:5184/admin`
- Meta Learning: `http://127.0.0.1:5184/admin/meta-learning`
- Thai People History: `http://127.0.0.1:5184/admin/thai-people-history`
- Product Landing Pages: `http://127.0.0.1:5184/admin/product-landing-pages`
- WoL Lab resources: `http://127.0.0.1:5184/admin/wol-lab`

The Facebook audit seed and duplicate review live under:

`03_Documents/06_Business_Systems/WoL-Owned-Audience-System/content-community-communication/publication-ledger/`

## Connect Supabase

1. Create a Supabase project owned by WoL.
2. Run `supabase/migrations/202609200001_wol_lab_content_system.sql`.
3. Enable Google OAuth and add localhost plus the future custom domain callback URLs.
4. Insert Chief's lowercase email in `allowed_users` with role `owner`.
5. Copy `.env.example` to `.env` and add the public project URL and anonymous key.
6. Store deployment credentials only in Supabase Edge Function or GitHub Actions secrets.

Do not put a Supabase service-role key or GitHub token in `VITE_*` variables.

## Publication boundary

This folder is a local preview. Creating the GitHub repository, setting DNS, applying the Supabase migration and publishing the site are separate external actions after Chief reviews the preview.
