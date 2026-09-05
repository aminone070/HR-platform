<<<<<<< HEAD
- [caniuse-lite pin](caniuse-lite-pin.md) — caniuse-lite must stay at 1.0.30001579; newer versions break browserslist v4.28.6.
- [Sidebar CSS approach](sidebar-css-approach.md) — responsive sidebar must use CSS media queries in component file, not Tailwind responsive prefixes via Angular class bindings.
- [Tailwind semantic tokens](tailwind-semantic-tokens.md) — gray/primary/surface/sidebar colors in tailwind.config point to CSS vars; slate/indigo classes replaced with these semantic names across templates.
=======
- [Tailwind v4 config loading](tailwind-v4-config.md) — custom Tailwind tokens require an explicit @config reference from the global stylesheet.
- [Selection control convention](selection-controls.md) — use the shared semantic select for choices; reserve the compact dropdown for action menus.
>>>>>>> pr-5
