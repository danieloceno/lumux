# lumux

Accessible themes and components, with contrast enforced at build time.

Six WCAG 2.2 AAA themes, one semantic token vocabulary, and a small React component set. Built on CSS custom properties and Tailwind v4.

**[Live demo](https://danieloceno.github.io/lumux/)**: every component in every state, in all six themes.

> **Status:** pre-release. Expect breaking changes before `1.0.0`.

## Why

Accessibility is usually a review step. In lumux it is a property of the system: a color pair that fails contrast breaks the build, and a control smaller than 44px cannot be built.

- **7:1 text contrast** in every theme, no large-text discount
- **3:1** for borders, focus rings and chart marks
- **44 × 44px** minimum touch targets, every pointer, dense layouts included
- **2px focus outline**, never obscured, forced-colors safe
- **Reduced motion** respected by every motion token
- **Keyboard-first**: nothing depends on hover
- **No timing**: error toasts never auto-dismiss

## Themes

Selected with a single attribute: `<html data-theme="ocean">`.

| `data-theme` | Scheme | Canvas / surface | Accent |
|---|---|---|---|
| `day` | light | `#f6f8fa` / `#ffffff` | `#005778` |
| `night` | dark | `#0a1d2a` / `#112634` | `#00cde0` |
| `dawn` | light | `#fdfcfb` / `#ffffff` | `#4326d5` |
| `midnight` | dark | `#0e0e11` / `#17171c` | `#b69ffa` |
| `forest` | light | `#f3f6f5` / `#ffffff` | `#1a5a3a` |
| `ocean` | dark | `#0f131a` / `#171d26` | `#24c0f3` |

`system` resolves to `day` or `night` from `prefers-color-scheme`. All 378 color pairs (63 per theme) are checked by `npm run check:contrast`. Full reference: [docs/tokens.md](./docs/tokens.md).

## Install

Git-tag install, with `dist/` committed on the tag commit. Step by step: [docs/getting-started.md](./docs/getting-started.md).

```sh
npm i github:danieloceno/lumux#v0.3.0
```

```css
/* app.css */
@import "tailwindcss";
@import "lumux/tokens.css";
@import "lumux/theme.css";
```

Add the pre-paint script inline in `<head>`, before any CSS, to avoid a theme flash:

```html
<script>try{var t=localStorage.getItem("lumux-theme");if(["day","night","dawn","midnight","forest","ocean"].indexOf(t)>-1)document.documentElement.setAttribute("data-theme",t)}catch(e){}</script>
```

Switch themes from code:

```ts
import { applyTheme } from "lumux/theme";

applyTheme({ theme: "ocean" }); // any theme name, or "system"
```

## Use the tokens

Reference semantic tokens, never raw values.

```html
<button class="bg-accent text-accent-foreground min-h-target rounded-control">
  Save
</button>
```

Or use the components:

```tsx
import { Button, ThemeProvider, ThemeSwitcher } from "lumux/react";
```

## What's inside

| Subpath | Contents |
|---|---|
| `lumux/tokens.css` | All six themes, density, focus, motion, base rules |
| `lumux/theme.css` | Tailwind v4 `@theme` mapping |
| `lumux/tokens.embed.css` | 16-token `:host` subset for embeds, no Tailwind, minified |
| `lumux/tokens.host.css` | Every token on `:host`, for shadow roots |
| `lumux/theme-init.js` | Pre-paint script, to inline |
| `lumux/theme` | `applyTheme`, `readTheme`, `resolvedTheme`, `resolvedScheme`, `THEME_NAMES` |
| `lumux/react` | Components, `ThemeProvider`, `ThemeSwitcher` |
| `lumux/eslint` | `eslint-plugin-jsx-a11y` strict config |
| `scripts/install-gates.sh` | Installs the className, disabled-title and nested-scroller gates into a consumer |

## Stack

React 19 · Radix primitives · Tailwind v4 · TypeScript (strict) · Inter Variable + Geist Mono · lucide-react

## Development

```sh
npm ci
npm run check        # typecheck, lint, contrast, gates, build, unit
npm run e2e          # axe, 44px targets, focus, 320px / 200% zoom, every theme
npm run playground   # the demo page, locally
```

A red gate is never bypassed.

## Documents

| Document | Purpose |
|---|---|
| [docs/getting-started.md](./docs/getting-started.md) | Adopting lumux: install, CSS, `<head>`, React root, lint, CI, shadow roots |
| [docs/tokens.md](./docs/tokens.md) | Token reference: the six themes, every colour, type, spacing, motion, focus |
| [docs/components.md](./docs/components.md) | Component contracts, props and the a11y behaviour each one guarantees |
| [docs/gates.md](./docs/gates.md) | The three gates: what each catches, install, config, ratchets, blind spots |
| [docs/copy.md](./docs/copy.md) | UI copy rules and the boundary on what never gets removed |

## Versioning

Semver on git tags. Token renames and removals are breaking; removed tokens ship as deprecated aliases for one minor before deletion. Pin an exact tag and upgrade deliberately.

## Contributing

1. A new token or component needs a real use in at least two apps.
2. Every PR must pass `npm run check` and `npm run e2e`.
3. Commits follow Conventional Commits.

## License

MIT
