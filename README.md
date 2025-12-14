# Frontend

This repository contains a React-based drag-and-drop pipeline editor using React Flow. It includes a small node system, dynamic handles, and Tailwind CSS for styling. The project was bootstrapped with Create React App.

# Backend
Backend code is pushed [on this repo](https://github.com/foolhardy21/backend-vs-assessment)

## Tech stack

- React 18
- React Flow (graph/flow UI)
- Zustand (lightweight state management)
- Tailwind CSS (utility-first CSS)
- PostCSS + Autoprefixer (CSS processing)
- Create React App (build/dev toolchain)

## Prerequisites

- Node.js (16+) and npm
- Git (optional)

## Install

Install dependencies:

```bash
npm install
```

## Development (run)

Start the dev server:

```bash
npm run start
```

Open http://localhost:3000 in your browser.

## Build

```bash
npm run build
```

## Project structure (important files)

- `src/` - React source
  - `App.js` - app root
  - `index.js` - entry; imports `src/index.css`
  - `index.css` - global CSS + Tailwind directives
  - `ui.js` - React Flow pipeline UI
  - `store.js` - Zustand store for nodes/edges
  - `nodes/` - node components and types
  - `baseNode.js` - HOC that renders `Handle` components
  - `types/` - node type implementations (text, file, image, etc.)
  - `utils.js` - handles configuration and draggable node list

## How the node handles/edges work

- Each node type declares handles via `HANDLES_CONFIG` (in `src/utils.js`).
- The `withBaseNode` HOC renders a `Handle` for each handle entry and uses the `idSuffix` as the handle `id` (so edges should reference the plain `idSuffix`, not `nodeId-idSuffix`).
- When programmatically creating edges, use the node `id` for `source`/`target` and the handle `idSuffix` for `sourceHandle`/`targetHandle`.

Example connection object:

```js
{
  source: 'file-1',
  sourceHandle: 'file',
  target: 'text-1',
  targetHandle: 'input',
}
```

## Troubleshooting

- Tailwind styles not applied:
  - Ensure `src/index.css` contains the `@tailwind` directives and is imported by `src/index.js`.
  - Ensure only one PostCSS config is present (prefer `postcss.config.js` with CommonJS export):

```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

- Restart the dev server after changing configs.

- Edge creation errors (React Flow):
    - Confirm handle ids used in connections are the plain `idSuffix` values (not prefixed by node id).
    - Log `getEdges()` and the connection object before calling `setEdges` to verify values.
