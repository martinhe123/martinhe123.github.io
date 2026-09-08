# Prompt Log

## September 5th, 2026

**Source:** *Explain Box Shadow Values.pdf*, an exported summary of the portfolio website iteration conversation. The notes below summarize the prompts and decisions rather than reproduce a verbatim transcript.

### Landing page styling and CSS concepts

Asked for explanations of `box-shadow`, `border`, and `border-radius` while refining the landing page. Learned how horizontal and vertical offsets, blur radius, and color affect a shadow, and how border thickness and corner radius change a panel's appearance.

The visual direction settled on a light blue-gray background, subtle grid, large name, short introduction, professional timeline, and a restrained translucent glass panel. The goal was an architectural and computational design portfolio with clear typography and spacing.

### Browser cache debugging

Investigated cases where edits to CSS and JavaScript did not appear in the browser. Used DevTools to inspect computed styles, loaded stylesheet URLs, and fetched CSS. The conversation identified stale resources as the cause of several apparent styling and filtering failures.

The resulting workflow was to disable cache in DevTools and perform an Empty Cache and Hard Reload before changing code that appeared broken. The key lesson was to verify which files the browser had loaded before rewriting working source code.

### Coding rules and file organization

Asked for stricter `AGENTS.md` guidance to keep the course project simple and understandable. At this stage, responsibilities were:

- `base.css`: shared colors, typography, variables, controls, borders, shadows, resets, and screen behavior.
- `landing.css`: landing page layout and styling.
- `portfolio.css`: portfolio navigation, gallery, cards, previews, and responsive layout.
- `script.js`: screen navigation and project filtering.

Agreed to change source rules instead of stacking CSS overrides, avoid unnecessary abstractions and dependencies, and choose the simpler implementation when alternatives work equally well.

Project media remained together under `images/<project-name>/`, without extra folders for individual file types. Discussed splitting `index.html`, but kept the landing and portfolio gallery together with clear comments at that stage. Rejected premature templates, HTML partials, dynamic card generation, and build systems.

### Portfolio gallery implementation

Requested a gallery using existing project names and actual imagery, without inventing project facts, dates, roles, clients, technologies, or awards. Included Christ Church Cathedral, Henry Horton, VU Residency and Event Center, Astra, Electricity Forecast, and Walking Down Broadway.

Changed the desktop gallery from two columns to three. Standardized thumbnail height with `object-fit: cover`, accepting cropping for previews. Chose JPG/PNG thumbnails instead of embedded PDFs for predictable display and styling.

Applied lighter glass backgrounds to project cards using shared values from `base.css`, with restrained rounding and shadows. Reduced preview image opacity to `0.75` to fit the pale visual palette.

### Navigation and project filtering

Requested Architecture, Computational Design, ML, Resume, and Contact navigation on the same row as the Portfolio heading. Rejected a glass navigation ribbon in favor of plain text controls without card backgrounds, borders, shadows, or pills.

Implemented one gallery with `data-category` attributes and filter buttons using `data-filter`. JavaScript reads category membership from the HTML and updates visibility and `aria-pressed` state.

- Portfolio / All: all six projects.
- Architecture: cathedral, Henry Horton, Vanderbilt, and Astra.
- Computational Design: Astra and Walking Down Broadway.
- ML: Electricity Forecast.

Astra belongs to two categories. Hidden cards allow the grid to reflow without preserving empty slots. Resume and Contact were present but not yet implemented in this conversation.

### Proposed next step

Requested a less abrupt filter transition: fade nonmatching cards out before hiding them, and fade matching cards in. The proposed approach used an opacity transition of about 300 milliseconds, `requestAnimationFrame`, and a timeout before setting `hidden`.

The source records this as the next improvement, not a verified completed change. The intended scope excluded scaling, sliding, animation libraries, and complex state management; grid reflow could remain immediate after the fade.

## September 6th–7th, 2026

**Source:** The current Codex conversation about implementing and refining the portfolio website. This entry groups the work under September 6–7 as requested, rather than assigning individual prompts to specific days. The notes summarize prompts, decisions, and completed work rather than reproduce a verbatim transcript.

### Project context and working permissions

Asked whether Codex could read the website repository and whether it remembered the website requirements. Confirmed read access and read `AGENTS.md` to establish the project context: a professional architecture and computational design portfolio for CMU 15-113, built with plain HTML, CSS, and JavaScript.

The repository was outside the task's default writable workspace. Changes were prepared in a staging copy and applied through the app's approval process. The implementation remained local; no deployment or publishing was performed.

### Christ Church Cathedral first pass

Requested the first individual project presentation for Christ Church Cathedral. Reviewed the existing gallery, project images, and portfolio PDFs before writing the content.

Built a project view with a large lead image, five images with captions, a design narrative, project credits, and return navigation. The narrative addressed the historic building, the addition as a lantern, waterjet-cut panels, and connections between old and new. Recorded the specific contribution described in the source: leading custom panel design and fabrication within the EOA Architects team.

### Separating project pages from the gallery

Noticed that `index.html` was becoming crowded and asked for a recommendation before further changes. Agreed that a complete project narrative was a useful boundary for a separate HTML page.

Moved the cathedral content into `christ-church-cathedral.html`. The landing screen and portfolio gallery stayed in `index.html`. Replaced cathedral-specific screen-switching logic with normal page links, and adjusted home-page navigation so `index.html#portfolio` opens the gallery directly.

This preserved the appearance while making each project easier to edit and share. The project page also remained readable without JavaScript. No templates, dynamic HTML loading, or build system were introduced.

### Shared project stylesheet and design ownership

Asked to move cathedral-specific styles out of `portfolio.css` so future projects could reuse one stylesheet. Discussed and approved the structure before implementing it:

- `base.css`: site font, colors, shared design values, background, controls, and common media surfaces.
- `landing.css`: landing screen layout and styling.
- `portfolio.css`: gallery and filter styling.
- `project.css`: reusable project titles, credits, narratives, figures, layouts, and responsive rules.

Renamed cathedral-specific classes to generic `project-*` classes. Individual project pages load `base.css` first and `project.css` second, inheriting the font family and primary text color and using shared variables. Updated `AGENTS.md` to document the agreed ownership.

Compared element layouts, typography, and colors before and after the extraction at desktop, tablet, and mobile widths; the appearance matched.

### Glass backgrounds and professional credits

Requested image backgrounds on the cathedral page similar to the portfolio thumbnails. Applied shared padding, translucent backgrounds, light borders, rounded corners, and soft shadows to project figures. Kept the common styling in `base.css` so the gallery and project pages use one definition.

Requested an EOA Architects credit and website link at the bottom of the cathedral page to acknowledge the firm and the team context of the work.

Later checked the same glass treatment on Henry Horton and Walking Down Broadway. Their figure styles already matched the cathedral's computed background, padding, border, radius, and shadow; no duplicate styling was added.

### Reading the full portfolio for project context

Provided `Portfolio_CMU_2025_V2_LR.pdf` and asked Codex to read it before developing more pages. Reviewed its 24 pages of project descriptions, diagrams, drawings, and images.

The portfolio provided context for Walking Down Broadway, Astra, Ropes, Christ Church Cathedral, Six Mile Island, Vanderbilt Residence and Event Center, and Post OSHA. It clarified individual contributions, collaborators, and distinctions between professional work, competition proposals, and interface concepts. Henry Horton and Electricity Forecast required separate source material.

### Henry Horton and Walking Down Broadway

Requested both pages using the cathedral as the example. Built separate HTML pages with shared styles, image captions, credits, full-size image links, and return navigation, then linked their gallery cards.

For Henry Horton, reviewed the four local images and the matching EOA project description. Clarified that the contribution was during schematic design and that this was not a major personal project. Kept the presentation concise, identified SD-phase support, and included EOA credit and a link to the firm's project page.

For Walking Down Broadway, used the portfolio's description of the individual CMU 15-112 project: a Python game exploring Nashville through AI dialogue, probabilistic character behavior, and OpenCV lighting effects. Included design-process and technical boards, with course and instructor credits.

Requested replacing Broadway's lead image with the supplied gameplay video. Embedded the YouTube video in a responsive 16:9 frame with fullscreen support and a direct YouTube link. Later removed the redundant demo button from the bottom of the page while retaining the project credits.

### Vanderbilt Residence and Event Center

Requested a matching project page. Used five available images to present the "Garden within a Garden" concept, entry portal, landscape connections, and timber-and-steel design.

Included the five-person EOA team and the portfolio's account of the project architect role, rendering production, drawing contributions, and coordination meetings. Described LEED Platinum as a target rather than an achieved certification. Added the EOA link and connected the gallery card to the new page.

### Astra

Requested the same structure for Astra. Built a page with three image boards, the airport-of-2100 concept, resource systems, ecological ambitions, and computational design narrative.

Credited Martin He and Jonathan Liang and included the Top 10 finalist recognition reported in the portfolio. Presented the project as a speculative competition proposal rather than a built airport. Reused the existing glass figures and shared stylesheet without adding project-specific CSS.

### Electricity Forecast from a PDF report

Asked how to present the machine learning project when only a PDF was available. Agreed to extract individual charts, explain the research in readable sections, and provide a full-report link rather than use full report pages as the main imagery.

Read the 11-page report and extracted four original charts: economic cost, spike detection metrics, false positives versus false negatives, and normal versus spike error. Built `electricity-forecast.html` with the dataset, preprocessing, chronological split, model variants, results, and limitations.

Explained the study's finding that a fixed-weight LSTM balances missed spikes and false alarms. Clarified that spikes are defined in the transformed and differenced series and that the economic score is a penalty-based evaluation, not realized trading profit. Added full-size chart links and the original PDF link, and replaced the gallery placeholder with a chart thumbnail.

### Contact page

Requested a simple Contact page containing the supplied LinkedIn link. Created `contact.html` with the existing typography and controls, a LinkedIn link, and return navigation. Updated the portfolio's Contact link to open that page.

### Verification and documentation

Checked project navigation, image loading, shared stylesheet loading, and responsive layouts at desktop, tablet, and mobile widths. Relevant checks also covered browser history, direct gallery links, refresh behavior, filtering, no-JavaScript project display, video sizing, and local file links. Inspected browser screenshots during implementation and checked changes for whitespace errors.

Opened local previews for review throughout the conversation. The resulting site has six linked project pages and a simple Contact page, with shared CSS and no added frontend dependencies.

Finally, used the supplied *Explain Box Shadow Values.pdf* to populate the September 5 prompt-log entry, keeping its proposed filter fade separate from completed work. Requested this second entry to document the current conversation in the same format.
