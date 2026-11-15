# HusseinHany.github.io

Personal portfolio site of Hussein Mansour. Live at **https://husseinhany.github.io**

## What's on it

- Hero, about, skills, featured projects and a contact form, on a single page
- Light and dark mode, remembered between visits
- Scroll animations with GSAP (the page still works if the animation library fails to load)
- Contact form sent through FormSubmit

## Built with

Plain HTML, CSS and JavaScript. No framework and no build step.

| Path | What it holds |
| --- | --- |
| `index.html` | The page |
| `css/styles.css` | All styling |
| `js/data.js` | Skills and project content |
| `js/core.js` | Entrance and scroll animations |
| `js/ui.js` | Theme switch, project modal, contact form |
| `js/utils.js` | Small helpers |
| `img/` | Photo and project images |

## Run it locally

Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
```

## Deployment

Every push to `main` is published to GitHub Pages by `.github/workflows/deploy.yml`.
