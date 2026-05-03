# AGENTS.md

## Cursor Cloud specific instructions

This is a static website (HTML/CSS/JS only) deployed to GitHub Pages at `kafenet.com`. There are no build tools, package managers, or backend services.

### Project structure

- `index.html` — Main landing page (Persian/RTL, dark theme)
- `vps.html` — VPS services page
- `logo.png` — Site logo
- `CNAME` — GitHub Pages custom domain config

### Running locally

Serve the site with any static HTTP server:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080/index.html` in Chrome.

### Notes

- No lint, test, or build commands exist — this is a plain static site.
- External CDN resources (Swiper.js, Google Fonts) load at runtime; pages degrade gracefully without internet access.
- All styling is inline within the HTML files (no separate CSS files).
