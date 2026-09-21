# WoL Lab Directory

Production pilot for the WoL public directory and shared Admin system.

Live URL: `https://wollab.github.io/wol-lab/`

Custom domain target: `https://wollab.wizardsoflearning.com/` (DNS record still pending).

## Included

- Public directory with verified WoL websites, tools, products, forms and systems
- Real WoL logo and direct category-first navigation; no featured-content detour
- Public/private filtering and team-mode preview
- Search, category filters, grouped resource sections and downloadable SVG QR codes
- Per-project expandable milestone, next step and missing-input summary, plus downloadable Markdown report
- WoL Lab Admin category naming, section ordering and visibility controls persisted through Supabase when signed in
- Responsive `/admin` pilot with site-specific fields and Draft → Preview → Publish flow
- Shared Supabase schema for Google allowlist roles, resources, content, revisions and social post ledger
- Data validation that blocks public Google Form edit URLs
- Browser-cover capture script using current live websites

The production Admin uses Supabase Auth and RLS for shared data. Google OAuth still needs to be enabled before Chief can sign in; unauthenticated visitors can use the public directory. It never embeds a service key or GitHub token in the browser.

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

## Production configuration

1. Supabase project `ogxjhyysevcjljjmjham` is connected, seeded and configured for the GitHub Pages URL plus localhost.
2. `contact@wizardsoflearning.com` is allowlisted as the owner.
3. Enable Google OAuth with callback `https://ogxjhyysevcjljjmjham.supabase.co/auth/v1/callback` before using Admin.
4. Add the custom-domain CNAME when DNS access is available, then enable HTTPS in GitHub Pages.
5. Store deployment credentials only in Supabase Edge Function or GitHub Actions secrets.

Do not put a Supabase service-role key or GitHub token in `VITE_*` variables.

## Publication boundary

The GitHub repository and Pages deployment are live. Supabase migration and seed are applied. DNS/custom-domain setup and Google OAuth remain separate configuration gates.
