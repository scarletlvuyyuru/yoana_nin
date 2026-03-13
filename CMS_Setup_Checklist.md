# CMS Setup Checklist (Decap + Netlify)

Use this checklist to safely enable CMS editing and verify end-to-end publishing.

## 1) Enable Netlify Identity + Git Gateway

In Netlify dashboard for this site:

1. Go to **Site configuration** → **Identity**.
2. Click **Enable Identity**.
3. Under **Registration preferences**, set to **Invite only** (recommended for client sites).
4. Under **Services**, enable **Git Gateway**.

## 2) Invite CMS users

1. In **Identity** → **Users**, click **Invite users**.
2. Add your client/editor email.
3. User accepts invite and sets password.
4. Test login at `/admin`.

## 3) Verify Decap collection writes to repo

1. Open `/admin`.
2. Login with invited user.
3. Create a new blog post using the **Blog Posts** collection.
4. Fill at minimum:
   - `title`
   - `slug`
   - `date`
   - `author`
   - `category`
   - `excerpt`
   - `meta_description`
   - `body`
   - `is_published` (keep OFF while drafting)
5. Save as draft, then publish.
6. Confirm a markdown file appears in `src/content/blog/`.

## 4) Verify frontend population from CMS

1. Run `npm run build` locally (or deploy preview).
2. Open `/blog` and confirm post appears on list page.
3. Open `/blog/<slug>` and verify content renders.
4. Confirm SEO fields on post page:
   - `<title>` uses post title
   - description uses `meta_description` fallback logic

## 4.1 Draft vs Live behavior

- Use **Save draft** while writing or revising.
- Keep `is_published: false` until final approval.
- A post appears on the website only when:
   - entry is published in Decap, and
   - `is_published` is set to `true`.

## 5) Launch-safety checks

- Keep CMS work on branch: `cms-prep-decapsafe-2026-03-13`.
- Merge only after preview QA passes.
- Keep production deploy locked to `main` until sign-off.
