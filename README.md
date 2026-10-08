# Lumo
 
Accessible themes and components, with contrast enforced at build time.
 
Six WCAG 2.2 AAA themes, one semantic token vocabulary, and a small React component set. Built on CSS custom properties and Tailwind v4.
 
> **Status:** pre-release. Expect breaking changes before `0.1.0`.
 
## Why
 
Accessibility is usually a review step. In Lumo it is a property of the system: a color pair that fails contrast breaks the build, and a control smaller than 44px cannot be built.
 
- **7:1 text contrast** in every theme, no large-text discount
- **3:1** for borders, focus rings and chart marks
- **44 × 44px** minimum touch targets
- **2px focus outline**, never obscured, forced-colors safe
- **Reduced motion** respected by every motion token
- **Keyboard-first**: nothing depends on hover
## Themes
 
Selected with a single attribute: `<html data-theme="ocean">`.
 
| `data-theme` | Scheme | Canvas | Accent |
|---|---|---|---|
| `day` | light | `#f6f8fa` | `#005778` |
| `night` | dark | `#0a1d2a` | `#00cde0` |
| `dawn` | light | `#fdfcfb` | `#4326d5` |
| `midnight` | dark | `#0e0e11` | `#b69ffa` |
| `forest` | light | `#f3f6f5` | `#1a5a3a` |
| `ocean` | dark | `#0f131a` | `#24c0f3` |
 
`system` resolves to `day` or `night` from `prefers-color-scheme`. All 378 color pairs (63 per theme) are checked by `npm run check:contrast`.
 
## Install
 
```sh
npm i github:YOUR_USER/lumo#v0.1.0
```
 
```css
/* app.css */
@import "tailwindcss";
@import "lumo/tokens.css";
@import "lumo/theme.css";
```
 
Add the pre-paint script inline in `<head>`, before any CSS, to avoid a theme flash:
 
```html
<script>try{var t=localStorage.getItem("lumo-theme");if(["day","night","dawn","midnight","forest","ocean"].indexOf(t)>-1)document.documentElement.setAttribute("data-theme",t)}catch(e){}</script>
```
 
Switch themes from code:
 
```ts
import { applyTheme } from "lumo/theme";
 
applyTheme({ theme: "ocean" }); // any theme name, or "system"
```
 
## Use the tokens
 
Reference semantic tokens, never raw values.
 
```html
<button class="bg-accent text-accent-foreground focus-visible:outline-focus">
  Save
</button>
```
 
## What's inside
 
| Subpath | Contents |
|---|---|
| `lumo/tokens.css` | All six themes, density, focus, motion, base rules |
| `lumo/theme.css` | Tailwind v4 `@theme` mapping |
| `lumo/tokens.embed.css` | Minimal token subset for embeds, no Tailwind |
| `lumo/tokens.host.css` | Every token on `:host`, for shadow roots |
| `lumo/theme-init.js` | Pre-paint script, to inline |
| `lumo/theme` | `applyTheme`, `readTheme`, `resolvedTheme` |
| `lumo/react` | Components, `ThemeProvider`, `ThemeSwitcher` |
| `lumo/eslint` | `eslint-plugin-jsx-a11y` strict config |
 
## Stack
 
React 19 · Radix primitives · Tailwind v4 · TypeScript (strict) · Inter Variable + Geist Mono · lucide-react
 
## Development
 
```sh
npm run check      # typecheck, lint, contrast, build, unit
npm run e2e        # axe, 44px targets, focus, 320px / 200% zoom, every theme
```
 
A red gate is never bypassed.
 
## Versioning
 
Semver on git tags. Token renames and removals are breaking; removed tokens ship as deprecated aliases for one minor before deletion.
 
## Contributing
 
1. A new token or component needs a real use in at least two apps.
2. Every PR must pass `npm run check` and `npm run e2e`.
3. Commits follow Conventional Commits.
## License
 
MIT
