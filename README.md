# Resume Site — Edit & Deploy Guide

Your resume content lives in one file you can edit anytime:

## **`content/resume.json`**

Update your name, bio, skills, projects, experience, and education there. No code changes needed.

### Example — add a project

```json
{
  "name": "My New Project",
  "period": "2024 — Present",
  "role": "Lead Developer",
  "description": "What the project does.",
  "technologies": ["React", "Laravel"],
  "link": "https://example.com",
  "linkLabel": "View Live Demo"
}
```

Add that object to the `"projects"` array in `content/resume.json`.

For a **featured** project (highlighted card):

```json
"highlight": true,
"highlightLabel": "Featured Personal Project"
```

For **status** badges (e.g. Ongoing, On Hold):

```json
"status": "Ongoing"
```

---

## Preview changes locally

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

## Publish to GitHub Pages

After editing `content/resume.json`:

```bash
npm run build:pages
git add content/resume.json assets/ index.html 404.html print.css img/
git commit -m "Update resume content"
git push origin master
```

GitHub Actions (`.github/workflows/deploy.yml`) builds and deploys automatically on push.

**Important:** Do not commit a dev `index.html` that points to `/src/main.tsx`. That breaks the live site with a MIME type error. Always run `npm run build:pages` before pushing, or rely on GitHub Actions (which builds from `index.source.html`).

In repo **Settings → Pages**, set **Source** to **GitHub Actions**.

Your site updates at [https://chaturanga836.github.io/](https://chaturanga836.github.io/)

---

## Project structure

| Path | Purpose |
|------|---------|
| `content/resume.json` | **Edit this** — all resume text & data |
| `public/profile.jpg` | Profile photo |
| `src/` | Site layout & design (rarely need to touch) |
| `assets/` | Built files (auto-generated — do not edit) |

---

## Profile photo

Replace `public/profile.jpg` with your photo, then run `npm run build:pages`.

---

## Export as PDF

1. Open the site locally (`npm run dev`) or live at [https://chaturanga836.github.io/](https://chaturanga836.github.io/)
2. Click **Download PDF** in the top navigation
3. In the print dialog, choose **Save as PDF** (or **Microsoft Print to PDF** on Windows)
4. Save the file

The PDF uses a clean résumé layout (summary, skills, experience, projects, education) pulled from `content/resume.json`. It may span multiple pages depending on how many projects you list.

**Tip:** In the print dialog, disable headers/footers for a cleaner PDF.
