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

## All Prompts 

**Prompt 1:** Single Page Portfolio (No Scroll)

Build a complete, fully coded single page portfolio website for Tayyaba Zubaid using only HTML5, CSS3, and vanilla JavaScript. Scrolling is strictly not allowed. The entire website must stay within the viewport at all times.

Color scheme: 
#E6A5CD, 
#E81760, 
#F0A01D, 
#000000, 
#FFFFFF

Font: Syne for headings, Inter for body text. Load both from Google Fonts.

File structure:

index.html
css/style.css
js/main.js
assets/ (for images, icons, CV)

Design requirements:

Modern, clean, and visually appealing look that fits entirely within the screen.
Every section must be designed compactly so nothing overflows the viewport height.
Use the color scheme meaningfully. 
#E81760 for primary buttons and highlights, 
#F0A01D for accents and badges, 
#E6A5CD for soft backgrounds and decorative elements, 
#000000 and 
#FFFFFF for text and contrast.

How sections work:
All sections exist in one HTML file. Only one section is visible at a time using a .active class toggled by JavaScript. Clicking a nav link hides the current section and reveals the new one with a smooth fade or slide transition. overflow: hidden must be applied to both html and body at all times. No scrollbar should ever appear.

Sections to build:

1. Navbar
Fixed at the top on every view. Logo on the left, nav links on the right, Download CV button, hamburger menu for mobile.

2. Home View
Badge “Frontend Engineer”. Large bold name “TAYYABA ZUBAID”. Short description about being a Frontend Engineering Intern at FlyRank and CS student at Qarshi University. Location badge: Lahore, Pakistan. Get In Touch button. 4 compact stats below: Projects (8+), Experience (2+), Certificates (3+), Technologies (10+). Numbers count up from 0 when Home becomes active.

3. About View
Two column layout compact enough to fit the screen. Left: profile image with decorative blob and experience badge. Right: label, heading “Who I am?”, short description, checklist: Frontend with React and HTML/CSS, Accessible and responsive UI, REST API with Node.js and Express, AI-assisted development, Algorithms and data structures.

4. Skills View
Heading “Technical Skills”. Compact skill bars organized into 4 categories: Languages, Frontend, Backend, Tools. Bars animate by filling left to right every time this section becomes active. No percentage numbers anywhere.

5. Projects View
Filter buttons: All, Web Design, Desktop App, Console-based. Compact project card grid. On hover, overlay shows title, category, and links. All 7 projects included.

6. Contact View
Heading “Let’s Work Together”. 3 contact cards: Email, LinkedIn, GitHub. Footer line at the bottom of the view.

JavaScript functionality:

Section switching with fade or slide transition on nav click.
Active nav link updates based on which section is currently shown.
Hamburger menu works on all views.
Project filter buttons show and hide cards by category.
Skill bars animate every time the Skills view becomes active.
Stat numbers count up every time the Home view becomes active.

Standards:

overflow: hidden on html and body always. No scrollbar.
Every section fits within viewport height without overflow.
Fully responsive on mobile (360px and above), tablet, and desktop.
Semantic HTML5 throughout.
No inline styles. All styling in style.css.
Clean, well-commented code.

Deliver the complete working code for index.html, css/style.css, and js/main.js.

**Prompt 2:**

One thing to update:
I'm xIntern from FlyRank and I have completed the internship in the duration:
July 2026 - Oct 2026

**Prompt 3:**

Insert all the links (github and netlify) for each project from uploaded index.html

**Prompt 4:**

Add animations and make the portfolio look like a game as perfect as possible

**Prompt 5:**

Do the following fixes and edits in the uploaded edited zip:

1. Change font style. Use simple font and increase font size. Decrease the font size of the hero title and increase the remaining font size as they are too small to read
2. The "stage " is overlapping with other cards and headings. Fix them completely
3. Update the section="view-class", remove the name and class, and replace them with something else
4. The hamburger doesn't display properly on mobile
5. Check complete responsiveness, SEO optimization, accessibility, security, maintenance


--------

&copy; 2026 Tayyaba Zubaid. All rights reserved.

