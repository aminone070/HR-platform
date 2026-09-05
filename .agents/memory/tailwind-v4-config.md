---
name: Tailwind v4 config loading
description: How this project exposes semantic Tailwind tokens backed by CSS variables.
---

Tailwind v4 does not automatically load this project's legacy TypeScript config when using `@import "tailwindcss"`. The global stylesheet must explicitly reference it with `@config "../tailwind.config.ts";`.

**Why:** Without that reference, built-in utility classes still work but project-specific semantic utilities such as `bg-sidebar-bg`, `text-sidebar-text`, and `bg-surface-card` are omitted from the generated CSS and silently fall back to unrelated global styles.

**How to apply:** Keep the `@config` directive beside the global Tailwind import whenever custom colors, shadows, variants, or animations from `tailwind.config.ts` are used in templates or component styles.