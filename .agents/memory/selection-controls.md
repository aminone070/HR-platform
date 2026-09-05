---
name: Selection control convention
description: Shared UI rules for dropdowns and select-style controls in the HR analytics app.
---

Use the shared semantic select component for page choices and filters, including single-value settings, analytics periods, page size, and multi-select filters. Use the compact dropdown component for action menus such as employee sorting.

**Why:** Keeping choice controls on one component keeps selected values, menu positioning, keyboard behavior, and light/dark styling consistent. Action menus have different semantics and should remain compact.

**How to apply:** Add only options that are meaningful for the page context, provide an explicit default value, and use semantic tokens from the global design system rather than slate/indigo-specific styling.