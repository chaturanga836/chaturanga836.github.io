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
git add content/resume.json assets/ index.html 404.html profile.jpg
git commit -m "Update resume content"
git push origin master
```

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
