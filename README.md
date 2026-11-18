# Encspect website

The landing page of [Encspect](https://github.com/smares/encspect), an audio file analyzer, served by GitHub Pages.

- `site/`: the page (plain HTML, CSS and a small script for the copy button; no build step).
- `.github/workflows/pages.yml`: publishes `site/` on every push to `main`.
- The screenshots in `site/images` are WebP versions of `docs/images/readme-*.png` in the Encspect repository, at two widths where the smaller one is smaller in bytes.

To preview locally: `python3 -m http.server --directory site`, then open http://localhost:8000.
