# Tunely

Static landing page for Tunely, an offline Flutter music player. Plain
HTML/CSS/JS — no build tooling or framework.

## Structure

```
index.html              All sections, one <section> per page region
css/
  variables.css         Color/space/type tokens; light + dark themes
  base.css              Reset, typography, layout primitives
  sections.css          Styles per page region (topbar, hero, rows, ...)
js/
  theme-toggle.js       data-theme toggle + _light/_dark image swapping
screenshots/            Screenshots (icon.png, *_light.png / *_dark.png,
                        settings.gif)
```

## How the theme toggle works

- `theme-toggle.js` sets `data-theme="light"|"dark"` on `<html>` and persists
  the choice in `localStorage` (`tunely-theme`).
- Colors come from CSS custom properties in `css/variables.css`
  (`:root` = light, `[data-theme="dark"]` = dark overrides).
- Any `<img>` with both `data-light` and `data-dark` attributes has its `src`
  swapped to the matching variant on toggle. Images without a dark variant
  (e.g. `icon.png`, `settings.gif`) need no attributes.

## Editing a section

Each section in `index.html` is delimited by a comment banner with its id:

```html
<!-- Section 4 — Playback row: Queue / Player / Lyrics -->
<section class="section" id="playback"> ... </section>
```

To change a section's styles, find the matching block in `css/sections.css`
(the file is ordered to match the page: topbar → hero → showcase → rows →
footer). To restyle globally, prefer updating a token in `variables.css`.

## Adding a screenshot

1. Drop the file into `screenshots/` with a descriptive name, e.g.
   `equalizer_light.png`.
2. Add a `<figure class="screenshot-card">` block inside the relevant section
   (or a new `<section class="section" id="...">`), copying an existing one.
3. If a dark variant exists, add both attributes to the `<img>`:
   `data-light="screenshots/equalizer_light.png"`
   `data-dark="screenshots/equalizer_dark.png"`.
4. Set the caption in `<figcaption>` and, if the row already has several
   images, double-check it still wraps nicely (see `.screenshot-row`).

## Running locally

Open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8000
```
