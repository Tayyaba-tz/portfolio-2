# Tayyaba Zubaid | Portfolio

A single-page portfolio for Tayyaba Zubaid, a Computer Science student at Qarshi University and former Frontend Engineering Intern at FlyRank (July to Oct 2026). It is built with plain HTML5, CSS3 and vanilla JavaScript, with no frameworks and no build step.

## Live Site

**Vercel:** https://tayyaba-portfolio-2.vercel.app/

## Features

- **Responsive scrolling.** Views scroll independently when content exceeds the available height; the document itself remains fixed to the viewport.
- **One view at a time.** Home, About, Skills, Projects and Contact are switched with a fade and slide transition. The active nav link updates automatically, and the URL hash follows the current view.
- **Animated stats.** The Home numbers count up from 0 every time Home becomes active.
- **Animated skill bars.** The bars fill left to right every time Skills becomes active.
- **Project filter.** Filter by All, Web Design, Desktop App or Console-based. Hovering (or focusing) a card shows its title, category and links.
- **Responsive.** Fluid layouts from narrow phones through large desktop screens, touch-friendly menu, and scroll-safe sections.
- **Accessible.** Semantic HTML, skip link, visible keyboard focus, labelled menu and dialog, progressbar values, hidden inactive views, and reduced-motion support.

## Game layer

- **Start screen** with a loading bar and a Press Start button.
- **HUD** with a level and XP bar that fills as you discover each stage, plus an achievement toast when all five are found.
- **Player card** on Home, floating coins and stars with mouse parallax, a typewriter intro, glitch hover on the name and staggered pop-in animations.
- **Controls:** arrow keys, keys 1 to 5, or swipe left and right. Clicks release a coin burst, and the SFX button toggles retro sound effects.

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
    └── profile.png
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
| Profile photo | Save a square image as `assets/profile.png`. Until it exists, an initials badge ("TZ") is shown. |
| CV | Replace `assets/Tayyaba_Zubaid_CV.pdf`, keeping the same file name. |
| Colors | CSS variables at the top of `css/style.css` (`--primary`, `--accent`, `--soft`). |
| Skill levels | The `data-level` value (0 to 100) on each `.fill` element in `index.html`. Percentages are never shown. |
| Stats | The `data-count` value on each `.count` element in `index.html`. |
| Projects | Each `<article class="card">` in the Projects section. Set `data-category` to `Web Design`, `Desktop App` or `Console-based`. |
| Contact details | The three `.contact-card` links in the Contact section. |

## Design notes

- **Fonts:** System Arial/Helvetica sans-serif stack for fast, reliable rendering without third-party font requests.
- **Palette:** `#E81760` for primary buttons and highlights, `#F0A01D` for badges and accents, `#E6A5CD` for soft backgrounds and decoration, plus `#000000` and `#FFFFFF` for text and contrast.
- **Fitting the viewport:** the projects grid changes by screen size (2 by 4 on phones, 3 by 3 on tablets, 4 by 2 on desktops) so all seven cards stay visible without scrolling.

## SEO, security, and maintenance

- Search metadata includes a descriptive title and description, canonical URL, Open Graph/Twitter card tags, `robots.txt`, and `sitemap.xml`.
- `vercel.json` configures a restrictive Content Security Policy and common browser security headers, plus static asset caching. Review these headers if adding third-party scripts, fonts, embeds, or API calls.
- The site has no package manager dependencies or build step; update `index.html`, `css/style.css`, and `js/main.js` directly, then test on keyboard, touch, reduced-motion settings, and narrow/short viewports before deployment.

## Contact

- Email: tayyabazubaid@gmail.com
- LinkedIn: [tayyaba-zubaid](https://www.linkedin.com/in/tayyaba-zubaid/)
- GitHub: [Tayyaba-tz](https://github.com/Tayyaba-tz)

## Prompts Used

