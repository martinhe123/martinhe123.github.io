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

Keep styles in style.css.

Prefer:
- CSS variables for repeated design values
- flexbox and CSS grid
- responsive media queries
- simple, understandable CSS

Avoid:
- overly complicated selectors
- unnecessary animations
- excessive absolute positioning
- large amounts of duplicated CSS

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
  style.css
  script.js
  README.md
  AGENTS.md
  images/

Store image assets inside images/.

Do not create unnecessary files or folders.

# Working Style

Before making changes:
1. Read this AGENTS.md.
2. Inspect the existing implementation.
3. Preserve working functionality unless the requested task requires changing it.

When implementing a task:
- make the smallest coherent set of changes necessary
- keep code understandable for a student learning web development
- do not overengineer
- do not introduce dependencies without permission
- do not redesign unrelated parts of the site

After changes:
- summarize what was changed
- explain any important HTML/CSS/JavaScript concepts introduced
- mention any assumptions made

