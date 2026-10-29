# Tayyaba Zubaid | Portfolio

A single-page portfolio for Tayyaba Zubaid, a Computer Science student at Qarshi University and former Frontend Engineering Intern at FlyRank (July to Oct 2026). It is built with plain HTML5, CSS3 and vanilla JavaScript, with no frameworks and no build step.

## Features

- **No scrolling.** `html` and `body` use `overflow: hidden`, and every view is sized to fit the viewport.
- **One view at a time.** Home, About, Skills, Projects and Contact are switched with a fade and slide transition. The active nav link updates automatically, and the URL hash follows the current view.
- **Animated stats.** The Home numbers count up from 0 every time Home becomes active.
- **Animated skill bars.** The bars fill left to right every time Skills becomes active.
- **Project filter.** Filter by All, Web Design, Desktop App or Console-based. Hovering (or focusing) a card shows its title, category and links.
- **Responsive.** Works from 360px phones up to large desktops, with a hamburger menu on small screens.
- **Accessible.** Semantic HTML, visible keyboard focus, `aria-current` on the active link, `aria-pressed` on filters, and reduced-motion support.

## Project structure

```
portfolio/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── main.js
└── assets/
    ├── Tayyaba_Zubaid_CV.pdf
    └── profile.jpg        (add your own photo)
```

## Running locally

No installation is needed. Open `index.html` in a browser.

To serve it locally instead:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Customizing

| What | Where |
|---|---|
| Profile photo | Save a square image as `assets/profile.jpg`. Until it exists, an initials badge ("TZ") is shown. |
| CV | Replace `assets/Tayyaba_Zubaid_CV.pdf`, keeping the same file name. |
| Colors | CSS variables at the top of `css/style.css` (`--primary`, `--accent`, `--soft`). |
| Skill levels | The `data-level` value (0 to 100) on each `.fill` element in `index.html`. Percentages are never shown. |
| Stats | The `data-count` value on each `.count` element in `index.html`. |
| Projects | Each `<article class="card">` in the Projects section. Set `data-category` to `Web Design`, `Desktop App` or `Console-based`. |
| Contact details | The three `.contact-card` links in the Contact section. |

## Design notes

- **Fonts:** Syne for headings and Inter for body text, loaded from Google Fonts.
- **Palette:** `#E81760` for primary buttons and highlights, `#F0A01D` for badges and accents, `#E6A5CD` for soft backgrounds and decoration, plus `#000000` and `#FFFFFF` for text and contrast.
- **Fitting the viewport:** the projects grid changes by screen size (2 by 4 on phones, 3 by 3 on tablets, 4 by 2 on desktops) so all seven cards stay visible without scrolling.

## Deploying

Because the site is static, you can deploy it by dragging the `portfolio` folder onto Netlify, or by pushing it to GitHub and enabling GitHub Pages or Vercel.

## Known notes

- The email on the Contact card is `tayyabazubaid@gmail.com` (from the CV). Update it if you prefer a different address.
- The bundled CV PDF still lists the FlyRank internship as "Present". Replace it with an updated version.