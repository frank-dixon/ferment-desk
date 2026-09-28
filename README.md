# Ferment Desk

Yeast and lacto pathways across **bread**, **kraut**, **yogurt**, and **coffee**.

A small static desk tool: pick a food, read stages / organisms / takeaways, and toggle **Advanced** for published citations (DOIs and publisher URLs).

## Develop

```bash
npm install
npm run build    # CSS → docs/css, JS → docs/js
npm start        # watch CSS + JS
```

Open `docs/index.html` (or serve the `docs/` folder). Site output lives **only** in `docs/`.

## Stack

- Tailwind CSS 3
- Vanilla JS (esbuild minify)
- PWA shell (`manifest.webmanifest`, `sw.js`, icons)

## Hub

Companion on [frank-dixon.github.io](https://frank-dixon.github.io/).
