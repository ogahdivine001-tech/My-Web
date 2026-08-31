# Ogah Divine Henry — Portfolio

A modern, responsive personal portfolio built with React, Vite, Tailwind CSS,
and Framer Motion.

## Getting started

```
npm install
npm run dev
```

Then open the local URL shown in your terminal (usually http://localhost:5173).

## Build for production

```
npm run build
```

Output goes to the `dist/` folder, ready to deploy on Vercel, Netlify, or any
static host.

## Project structure

```
src/
├── components/   Reusable UI (Navbar, Footer, BackToTop, etc.)
├── sections/     Page sections (Hero, About, Skills, Projects, etc.)
├── data/         Content arrays (projects, skills, services, etc.)
├── hooks/        useTheme, useActiveSection
├── assets/       Images
├── App.jsx
└── main.jsx
```

## Editing content

Everything text-based lives in `src/data/`, edit those files to update
projects, skills, services, testimonials, experience, or stats without
touching component code.

## Known placeholders to replace

- **Testimonials** (`src/data/testimonials.js`): generic placeholder
  quotes, ready for real client feedback.
- **Graphic Design gallery** (`src/data/gallery.js`): gradient tiles
  standing in for real design samples. Add real images to
  `src/assets/images` and update the gallery component to use them.
- **Project source links** (`src/data/projects.js`): currently point to
  your GitHub profile. Update `source` per project if you want direct
  repo links instead.

## Theme

Dark/light mode is handled by `src/hooks/useTheme.js` and persists via
`localStorage`. The accent color (violet to coral gradient) is set in
`tailwind.config.js` under `theme.extend.colors`.
