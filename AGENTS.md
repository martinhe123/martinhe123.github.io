# Project Context

This repository is for Martin He's CMU 15-113 Project 1: a professional personal portfolio website.

The site should showcase work across:
- Architecture
- Computational Design
- Software Development
- AI / Machine Learning
- AEC technology

The website is being built as a learning exercise using only:
- HTML
- CSS
- JavaScript

Do not introduce frameworks or libraries unless explicitly requested later.

# Project Goals

The website must include:
- About Me section
- Projects section
- Contact section
- Responsive design for desktop, tablet, and mobile
- Clean, professional visual appearance
- Optional lightweight JavaScript interaction
- GitHub Pages deployment

The website should feel like a professional architecture / computational design portfolio, not a generic software developer template.

# Design Principles

Use the following design principles consistently:

1. Minimal and restrained.
2. Strong typography and spacing.
3. Generous white space.
4. Clear hierarchy.
5. Avoid visual clutter.
6. Avoid excessive cards, borders, gradients, shadows, and rounded containers.
7. Use graphics and decoration sparingly.
8. Let project imagery be the dominant visual element.
9. Prefer editorial / architectural portfolio aesthetics over startup-dashboard aesthetics.
10. The site should feel mature, precise, and professional.

# Typography

Use a modern sans-serif system font stack unless explicitly changed later:

font-family:
Inter,
Helvetica Neue,
Helvetica,
Arial,
sans-serif;

Do not rely on externally hosted fonts unless explicitly requested.

Typography hierarchy should generally be:

- Hero/name: large and confident
- Section headings: clear but understated
- Body text: highly readable
- Project metadata/captions: smaller and quieter

Avoid excessive font weights.

# Color

Default palette:

- Background: white or near-white
- Primary text: near-black
- Secondary text: medium gray
- Lines/borders: very light gray
- Accent color: use sparingly

Do not introduce multiple bright colors without explicit instruction.

# Layout

Use a centered content container with a comfortable maximum width.

Desktop:
- generous horizontal margins
- strong grid alignment
- project content may use 2-column layouts where appropriate

Tablet:
- reduce margins and gaps
- preserve hierarchy

Mobile:
- single-column layout
- comfortable padding
- no horizontal scrolling
- navigation and project content must remain usable

# Page Structure

Default page hierarchy:

1. Header / navigation
2. Hero / introduction
3. About
4. Projects
5. Contact
6. Footer

Do not add extra major sections unless requested.

# HTML Guidelines

Use semantic HTML where appropriate:
- header
- nav
- main
- section
- article
- footer

Keep HTML readable and relatively simple.

Accessibility:
- include alt text for meaningful images
- use proper heading hierarchy
- links and buttons should be keyboard accessible
- maintain reasonable text contrast

# CSS Guidelines

Keep the CSS architecture intentionally simple. The project uses:

- `base.css` = global/shared styles and the single source of truth for shared design values
- `landing.css` = landing-screen-specific styles only
- `portfolio.css` = portfolio gallery and filter styles only
- `project.css` = reusable styles for individual project pages

## Single Source of Truth

`base.css` is the single source of truth for shared styling. Define shared values only there, including:

- colors
- CSS variables
- typography and page background
- shared spacing values
- shared buttons and controls
- shared borders, shadows, and transition values
- global box-sizing and reset rules

Do not redefine shared values in `landing.css`, `portfolio.css`, or `project.css`. If both pages use the same component appearance, define it once in `base.css`. When changing a shared design value, change the source definition instead of adding a later override.

Avoid CSS rules whose main purpose is to undo or override another CSS rule. Before adding a new rule, check whether the existing source rule should be changed instead.

Do not fix CSS by adding another override. Find the source rule and change it there.

## Page-Specific CSS

`landing.css` should contain only landing-specific styles, such as:

- `.landing-layout`
- `.identity`
- `.timeline`
- landing-specific responsive layout

`portfolio.css` should contain only portfolio-specific styles, such as:

- `.portfolio-layout`
- gallery and filter layouts
- portfolio-specific responsive layout

`project.css` contains shared individual-project layouts, titles, credits, images, captions, and responsive rules. Each project page loads `base.css` first, then `project.css`. Inherit the font family and primary text color from `base.css`; use its variables for shared colors, typography sizes, and spacing. Use reusable `project-*` classes rather than project-name-specific classes. Keep page composition in `project.css` and shared design values in `base.css`.

Do not place global/shared styling in page-specific CSS files.

## Simplicity

This is a small 6-unit student project. Favor the simplest implementation that clearly works.

Prefer:

- short, readable CSS
- simple class selectors
- CSS Grid or Flexbox where useful
- a small number of CSS variables
- one obvious place to change each design value
- straightforward media queries
- explicit code over clever abstractions

Avoid:

- unnecessary wrapper elements
- deeply nested selectors
- selector specificity battles
- repeated overrides
- `!important`
- unnecessary CSS variables
- excessive utility classes
- unnecessary animations
- complicated responsive systems
- duplicated declarations
- abstractions created only to reduce a few lines of code

If five simple lines are easier to understand than a reusable abstraction, use the five simple lines.

# JavaScript Guidelines

Keep JavaScript in script.js.

Use JavaScript only when it adds meaningful interaction.

Prefer simple features such as:
- mobile navigation
- dark mode
- subtle reveal interaction
- project filtering

Do not add JavaScript simply for decoration.

# File Organization

Current intended structure:

/
  index.html
  christ-church-cathedral.html
  script.js
  README.md
  AGENTS.md
  css/
    base.css
    landing.css
    portfolio.css
    project.css
  images/

Store image assets inside images/.

- `base.css`: global/shared design system
- `landing.css`: landing-only layout and styling
- `portfolio.css`: portfolio gallery layout and styling
- `project.css`: reusable individual-project layout and styling
- `script.js`: all JavaScript behavior

Do not create additional CSS or JavaScript files unless there is a clear, substantial reason. Do not split code into more files merely for organizational purity.

Do not create unnecessary files or folders.

# Working Style

Before making changes:

1. Read this AGENTS.md.
2. Inspect the existing implementation.
3. Understand which file owns the behavior or style being changed.
4. Preserve working functionality unless the task requires changing it.

When implementing a task:

- make the smallest coherent change necessary
- prefer modifying existing code over adding new systems
- keep code understandable to a student learning HTML, CSS, and JavaScript
- keep one source of truth for shared values
- do not solve CSS problems by stacking overrides
- remove obsolete code when replacing an implementation
- do not create helper functions, classes, variables, or files without a clear need
- do not introduce dependencies without permission
- do not redesign unrelated parts of the site
- do not optimize prematurely
- do not build infrastructure for hypothetical future requirements

This is a 6-unit course project, not a production framework.

Code quality means:

1. easy to understand
2. easy to modify
3. minimal duplication
4. clear ownership
5. few moving parts

It does not mean maximizing abstraction or architectural sophistication.

When two implementations work equally well, choose the simpler one.

After changes:
- summarize what was changed
- explain any important HTML/CSS/JavaScript concepts introduced
- mention any assumptions made
