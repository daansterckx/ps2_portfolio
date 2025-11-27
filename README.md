# ps2_portfolio
Personal portfolio website and project gallery showcasing school and personal projects.

Live demo: https://portfoliops2-daansterckx.netlify.app/

---

## Overview

This repository is a static portfolio site that uses Bootstrap for layout and a small collection of custom CSS and JS to manage card and modal behavior. The site is composed of several pages (index, projects, internship, personal projects) with a grid of cards and lightweight modal popups for each project.

Key files and folders:
- `index.html` — landing page
- `projects.html` — School Projects (grid of project cards + modals)
- `personal-projects.html` — Personal Projects (grid of cards + modals)
- `css/styke.css` — main stylesheet (includes theme and custom overrides)
- `css/custom.css` — custom thumbnail/portfolio overrides
- `script.js` — modal open/close handlers and accessibility support
- `js/scripts.js` — theme scripts
- `assets/img/portfolio/*` and `images/` — project images used by cards and modals

---

## Running locally

A minimal way to view the site locally is to serve the folder with a simple HTTP server. From the project root, run:

```fish
# Serve the site locally in the current directory on port 8000
python3 -m http.server 8000
# Then open http://localhost:8000/projects.html or index.html in your browser
```

Alternatively, use the VS Code Live Server extension to preview pages.

---

## Adding or updating project cards

Cards and modals are defined in the page HTML (e.g., `projects.html`, `personal-projects.html`). Each project has two parts:

1. The grid card element (Bootstrap column) — example:

```html
<div class="col-lg-4 col-md-6 col-sm-12 mb-4">
	<div class="card" onclick="openModal31()">
		<img class="card-img-top" src="images/soc.png" alt="SOC">
		<div class="card-body">
			<h5 class="card-title">SOC (Security Operations Center)</h5>
			<p class="card-text">Brief description</p>
		</div>
	</div>
</div>
```

2. A modal block with details and matching ID (the `openModalX()` function must match the `myModalX` id):

```html
<div id="myModal31" class="modal">
	<div class="modal-content">
		<span class="close" onclick="closeModal31()">&times;</span>
		<h1>Title</h1>
		<img src="images/soc.png" alt="SOC">
		<p>Longer description...</p>
	</div>
</div>
```

Important:
- The `script.js` contains `openModalN()` and `closeModalN()` functions. If you add more modals, add corresponding open/close functions or refactor the JS to use a data attribute (recommended for maintainability).
- Place the card inside the existing `<div class="row">` container so it participates in the grid; if it’s outside the row, it may flow into the page as a standalone element.

---

## CSS & Modal sizing

- The main modal sizing and responsiveness are controlled in `css/styke.css` using a final override block that reduces modal width and max-height to keep popups compact on smaller screens.
- Card thumbnails are constrained (using `object-fit: cover`) for consistent layout; use consistent aspect ratios for best results.

---

## Accessibility & UX improvements

Recent changes:
- ESC key now closes any open modal.
- Click on the dark overlay (outside `.modal-content`) closes the modal.
- Close controls use `<button class="close">` on `projects.html` to improve keyboard accessibility and semantics; `personal-projects.html` keeps the originally styled `span.close` to preserve older markup (no changes were made to that page at the user's request).

Recommendations:
- Replace `span.close` with semantic `<button type="button" class="close" aria-label="Close">` across all pages.
- Consolidate `openModalN()` and `closeModalN()` functions to a single handler that derives the modal id from a data attribute to reduce duplication.

---

## Recent updates
- Added SOC project card to `projects.html` with modal id `myModal31` (the card content mirrors the SOC info already present in `personal-projects.html`).
- Added ESC key + overlay click-to-close behavior in `script.js`.
- Restored `personal-projects.html` markup per user preference (no visible layout changes beyond that revert).

---

## Contributing

- Edit page HTML to add or update cards and modals.
- When adding a new `myModalX`, ensure `openModalX()` / `closeModalX()` exist in `script.js` (or add a data-driven handler).
- Keep `css/styke.css` ordering in mind — the final override block enforces modal sizing rules.

---

If you want, I can:
- Replace all `span.close` with accessible buttons across all pages, and refactor the modal open/close handlers to a data-driven approach.
- Add a short script to consolidate modal handlers.

> Tip: After making changes, hard-refresh the browser (Ctrl/Cmd + Shift + R) to bypass caching and confirm the site updates immediately.

