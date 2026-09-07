# John Misiko Kakai — Portfolio (Astro + TinaCMS)

This is an Astro site wired up for TinaCMS visual editing,
hosted through TinaCloud.

Every section of the page; hero, about, experience, education, skills, certifications, projects, and contact is editable through the
Tina admin (/admin), and changes are committed straight to this repo's `content/home/index.json`.

## Project Structure
/
├── content/
│   └── home/
│       └── index.json         ← all editable page content lives here
├── tina/
│   └── config.ts               ← Tina schema (defines what's editable)
├── public/
│   ├── assets/                 ← logos, hero illustration, etc. (Tina's media library)
│   └── script.js
├── src/
│   ├── components/islands/
│   │   └── PageBody.astro      ← renders the page, marks fields as click-to-edit
│   ├── lib/tina/
│   │   ├── data.ts             ← fetches content through Tina
│   │   └── islands.ts          ← registers the editable "home" region
│   ├── pages/
│   │   ├── index.astro         ← thin page wrapper
│   │   └── tina-island/[name].ts  ← endpoint the live editor talks to
│   └── styles/
│       └── global.css
├── astro.config.mjs
└── package.json

## 1. Install

Run npm install (Git Bash)

## 2. Edit locally

npm run dev


This starts Astro and a local Tina server together.
Open: http://localhost:4321/ - > the live site , http://localhost:4321/admin/index.html - > the Tina editor

Click any highlighted text/image on the site while the admin is open, or edit the
form in the sidebar directly.

Saves write straight to `content/home/index.json`
on disk.

## 3. Connect to TinaCloud (for the hosted editor)

1. Push this repo to GitHub.
2. Go to [app.tina.io](https://app.tina.io), sign up, and create a new project
   from that repo.
3. Copy the Client ID and generate a Read only Token from the project
   dashboard (next to overview).
4. Copy .env.example to .env and fill in: TINA_CLIENT_ID=your-client-id , TINA_TOKEN=your-token

## 4. Build & deploy

npm run build   # runs tinacms build then astro build
npm run preview (Git bash)

This project needs an SSR host (not static hosting) because the live editor
refreshes content through an on-demand route (`/tina-island/[name]`).
