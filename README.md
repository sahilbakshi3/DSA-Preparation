# DSA Pattern Recon

A fast, terminal-themed DSA + system design preparation app built with **React + Vite + Tailwind CSS**.

It helps you practice interview thinking with:

- Pattern recognition cards (signals, complexity, traps, flows)
- Code templates for fast recall
- Drill mode for active recall
- System design framework + topic cards
- Complexity matrix and decision guide

---

## Why this project exists

Interview prep usually fails because people memorize solutions instead of learning recognition.

This project is organized around a simple idea:

1. **Recognize** the pattern quickly.
2. **Choose** the right technique with a decision flow.
3. **Execute** from memory using templates.
4. **Reinforce** with timed drills and review.

---

## Tech stack

- **React 19** for UI and state-driven rendering
- **Vite 8** for fast dev server and production builds
- **Tailwind CSS 3** for utility-first styling and responsive breakpoints
- **ESLint 9** for linting and code quality checks

---

## Getting started

### 1) Install dependencies

```bash
npm install
```

### 2) Start development server

```bash
npm run dev
```

Then open the local URL shown in the terminal (typically `http://localhost:5173`).

### 3) Create a production build

```bash
npm run build
```

### 4) Preview production build

```bash
npm run preview
```

### 5) Lint the project

```bash
npm run lint
```

---

## Project structure

```text
DSA-Preparation/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── TabBar.jsx
│   │   ├── SearchBar.jsx
│   │   ├── TOC.jsx
│   │   ├── PatternCard.jsx
│   │   ├── CodeTemplates.jsx
│   │   ├── DrillMode.jsx
│   │   ├── Systemdesign.jsx
│   │   ├── ComplexityTable.jsx
│   │   └── DecisionGuide.jsx
│   ├── data/
│   │   ├── patterns.js
│   │   ├── templates.js
│   │   ├── drills.js
│   │   └── sysdesign.js
│   ├── App.jsx
│   ├── index.css
│   ├── App.css
│   └── main.jsx
├── eslint.config.js
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
├── package.json
└── README.md
```

---

## Architecture choices (and why)

### 1) Data-first UI design

All prep content is stored in `src/data/*.js` and rendered via reusable components.

**Why:**
- Keeps UI components generic and lightweight
- Makes content updates easy without touching logic-heavy UI
- Supports future migration to CMS/API if needed

### 2) Single-page, tab-driven navigation

`App.jsx` controls the active section (`patterns`, `templates`, `drills`, `sysdesign`, etc.).

**Why:**
- Instant section switching with minimal complexity
- No routing setup overhead for a focused prep tool
- Shared top-level state for search/filter interactions

### 3) Component modularity

Each major prep mode has its own component.

**Why:**
- Easier maintenance and testing
- Cleaner boundaries between concerns
- Faster onboarding for contributors

### 4) Tailwind utility classes

Styling is mostly done in JSX via utility classes with a small custom utility layer in `src/index.css`.

**Why:**
- Fast iteration on spacing/layout/typography
- Clear responsive breakpoint usage (`sm`, `md`, `lg`)
- Consistent visual language across components

### 5) Mobile-first responsiveness

Layout decisions prioritize smaller screens first, then scale up.

**Why:**
- Better usability across phones/tablets/laptops
- Avoids horizontal overflow in dense UI sections
- Improves readability during practice sessions on mobile

---

## Feature walkthrough

### 1) Patterns

- Search by pattern, keyword, signal, or problem name
- Filter by category
- Expand cards to view:
  - Time/space complexity
  - Trigger signals
  - Decision flow
  - Common traps
  - Similar-pattern confusion points

### 2) Templates

- Pattern-specific code skeletons
- Variant switching (when available)
- One-click clipboard copy for repetition training

### 3) Drill mode

- Problem clue cards for recognition practice
- Category and difficulty filters
- Optional shuffle mode
- Self-rating flow (known vs review)

### 4) System design

- 45-minute interview framework blocks
- Topic cards with section tabs
- Common mistakes and practice prompts

### 5) Complexity table + decision guide

- Compact complexity reference matrix
- Question/answer style decision nodes

---

## Responsive design guidelines used in this project

The app follows these practical rules:

1. **Prefer wrapping/stacking** for dense rows (header, footer, badges).
2. **Use horizontal scroll only when required** (tab bar, code blocks, tables).
3. **Hide low-value labels on tiny screens** to prioritize interactive fields.
4. **Use `min-w-0` + truncation** inside flex rows to avoid text overflow.
5. **Keep touch targets roomy** (buttons/filters are designed with comfortable paddings).

---

## How to add new content

### Add a new DSA pattern

1. Open `src/data/patterns.js`.
2. Add an entry matching the existing object shape.
3. Ensure fields include category, complexity, signals, keywords, and flow.
4. Save; UI updates automatically.

### Add a new template

1. Open `src/data/templates.js`.
2. Add a template object with `variants` and `code`.
3. Verify copy button behavior in Templates tab.

### Add a new drill

1. Open `src/data/drills.js`.
2. Add a drill with `problem`, `clues`, `answer`, `why`, and difficulty.

### Add a system design topic

1. Open `src/data/sysdesign.js`.
2. Add topic metadata, sections, traps, and questions.

---

## Contributing notes

- Keep components focused and small.
- Prefer deriving UI from data objects rather than hardcoded markup.
- Preserve the existing visual style (terminal-inspired, high-contrast).
- Validate both desktop and mobile behavior before submitting changes.

Recommended local checks:

```bash
npm run lint
npm run build
```

---

## Future improvements (suggested)

- Persist drill ratings in local storage
- Add keyboard shortcuts for faster navigation
- Add unit tests for filtering logic
- Add dark/light theme toggle
- Move large static data to JSON or remote source for easier editing

---

## License

No explicit license is defined yet. Add a `LICENSE` file if you plan to open-source with specific terms.
