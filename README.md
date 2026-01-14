<div align="center">

### 🧺 WASH&GO

Modern marketing site for an on-demand laundry service. Built with the Next.js App Router, fully responsive layout components, reusable UI primitives, and animated sections powered by CSS + Radix UI.

</div>

---

## Features

- **Landing sections:** Promo carousel, services grid, how-it-works steps, pricing cards, and a multi-step order form.
- **Reusable UI kit:** Button, dialog, dropdown, and form controls that wrap Radix UI primitives.
- **Smooth interactions:** Intersection-observer driven reveal animations, sticky header, and smooth scroll between anchors.
- **Typed codebase:** TypeScript throughout, with strict ESLint + Next.js config.
- **Testing:** Vitest + React Testing Library unit tests for core UI components.

## Requirements

- Node.js 20+
- npm 10+ (or any compatible package manager)

## Getting Started

Install dependencies and start the dev server:

```bash
npm install
npm run dev
```

Visit `http://localhost:3000` to browse the site. The App Router automatically reloads when files in `src/` change.

## Available Scripts

| Command            | Description                                                                 |
| ------------------ | --------------------------------------------------------------------------- |
| `npm run dev`      | Start the Next.js development server with Turbopack.                        |
| `npm run build`    | Create a production build.                                                  |
| `npm run start`    | Launch the built app in production mode.                                    |
| `npm run lint`     | Run ESLint using `eslint.config.mjs`.                                       |
| `npm run test`     | Execute unit tests with Vitest (jsdom environment, RTL assertions).         |
| `npm run test:watch` | Run Vitest in watch mode.                                                 |

## Testing

Vitest is configured via `vitest.config.ts` with:

- jsdom environment
- React plugin + path alias `@/`
- Global setup in `vitest.setup.tsx` (IntersectionObserver, ResizeObserver, `next/link` mocks)
- React Testing Library + `@testing-library/jest-dom`

To run the suite:

```bash
npm run test
```

Tests cover components such as `PromoCarousel`, `Section`, `Button`, `Dropdown`, `Dialog`, `Select`, and form controls.

## Project Structure

```
src/
├─ app/                  # Next.js App Router pages (home, pricing, order, etc.)
├─ components/
│  ├─ Layout/            # Header, Footer, Page layout pieces
│  ├─ PromoCarousel/     # Hero carousel
│  ├─ Services/, Pricing/, HowItWorks/, OrderForm/
│  └─ UI/                # Reusable UI primitives & form controls
└─ app/globals.css       # Global styles & CSS variables
```

## Deployment

1. Generate a production build: `npm run build`
2. Run locally with `npm run start` or deploy to any platform that supports Next.js (Vercel recommended).

## License

This project is distributed for demonstration purposes. Adapt or extend it for your own laundry/delivery service UI.
