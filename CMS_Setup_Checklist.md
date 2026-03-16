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
5. Save/publish the entry from Decap.
6. Confirm a markdown file appears in `src/content/blog/`.

## 4) Verify frontend population from CMS

1. Run `npm run build` locally (or deploy preview).
2. Open `/blog` and confirm post appears on list page.
3. Open `/blog/<slug>` and verify content renders.
4. Confirm SEO fields on post page:
   - `<title>` uses post title
   - description uses `meta_description` fallback logic

## 4.1 Draft vs Live behavior

- Keep `is_published: false` until final approval.
- A post appears on the website only when `is_published` is set to `true`.

## 5) Launch-safety checks

- Keep CMS work on branch: `cms-prep-decapsafe-2026-03-13`.
- Merge only after preview QA passes.
- Keep production deploy locked to `main` until sign-off.

## 6) Transcript test endpoint (Step 1)

Endpoint: `/.netlify/functions/transcript-test`

Request method: `POST`

Payload:

```json
{
   "sourceType": "instagram",
   "sourceUrl": "https://www.instagram.com/reel/ABC123/",
   "mock": true
}
```

Expected behavior:

- With `mock: true` (or env `TRANSCRIPT_TEST_MODE=mock`), returns a placeholder transcript for end-to-end CMS testing.
- Without mock mode, function calls your transcript provider URL and expects transcript text in `transcript`, `text`, `transcript[]`, or `segments[]`.

Optional environment variables:

- `TRANSCRIPT_TEST_MODE=mock`
- `TRANSCRIPT_API_URL=https://your-provider-endpoint`
- `TRANSCRIPT_API_KEY=your-secret-key`

## 7) Video-to-blog workflow (Step 2)

Use this flow whenever `creation_mode: video`:

1. Set `creation_mode` to `video` and `workflow_stage` to `intake`.
2. Paste the social video in `source_url` and choose `source_type`.
3. Call `/.netlify/functions/transcript-test` with the same URL.
4. Paste returned text into `transcript`, then set `workflow_stage` to `transcript_ready`.
5. Write/edit the post body from the transcript, then set `workflow_stage` to `draft_ready`.
6. Final polish for title/excerpt/meta/FAQ, then set `workflow_stage` to `final_review`.
7. When approved, set `is_published: true` and `workflow_stage: published`.

Guardrails:

- Keep only one source URL per post.
- Keep `is_published: false` until final review is complete.
- If transcript fails, use mock mode for testing and continue drafting manually.

## 8) Rich text mode verification (Step 3)

1. In `/admin`, create or edit a post with `Body` in rich text mode.
2. Add one heading, one bullet list, one link, and one image.
3. Save and confirm no "failed to persist" errors.
4. Open `/blog/<slug>` and verify formatting renders correctly.
5. Confirm only one page-level H1 is visible (post title in page header).

Expected result:

- Rich text and markdown body formats both render on the site.
- Any leading body H1 is ignored to prevent duplicate H1 on the post page.

## 9) Heading authoring rules (Step 4)

- The post title field is the only page H1.
- In the body, start sections at H2.
- Use H3 only for subsections under an H2.
- Avoid skipping levels (H2 to H4).

## 10) AI workflow (URL -> transcript -> blog)

Use the stable generator page at `/admin/video-to-blog.html`:

1. Paste `source_url` and choose `source_type`.
2. Click **Generate Draft**.
3. Copy generated fields into the blog entry in `/admin` (`Blog Posts` collection).
4. Set `creation_mode: video` and `workflow_stage: draft_ready`.
5. Review/edit body in rich text or markdown mode.
6. Publish only after final review.

Fields to copy:

- `title`, `slug`, `excerpt`, `meta_description`, `key_answer`
- `transcript`, `body`

Environment variables for real AI mode:

- `OPENAI_API_KEY`
- `OPENAI_MODEL` (optional, default: `gpt-4.1-mini`)
- `OPENAI_MAX_RETRIES` (optional, default: `2`)
- `TRANSCRIPT_MAX_CHARS` (optional, default: `12000`)

Notes:

- If no OpenAI key is set, the function uses a safe fallback draft from transcript text.
- Prompt is constrained to transcript-only messaging (no external facts).
- This path avoids custom Decap widgets for better runtime stability.
