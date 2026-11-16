# Visual Quality Checklist — Anti-AI Slop

For rendered surfaces: web pages, app screens, desktop/mobile UI, HTML docs. Does NOT apply to pure backend/infra artifacts — see project-type-guidelines.md.

## Slop signals (reject these)

- Layout indistinguishable from a generic template; could belong to any product.
- Generic palette chosen without reference to the subject (e.g., default purple-gradient SaaS look).
- Type without hierarchy: one weight, one size, everything shouting or everything flat.
- Everything in cards — content chopped into identical rounded rectangles with the same shadow.
- Decorative gradients/glows/shadows serving no information.
- Numbered markers (01/02/03) on non-sequential content.
- Unmotivated motion: fade-slide-up on every section, hover zoom on every card.
- Empty states that say "No data" and nothing else — no cause, no action.
- CTA that doesn't say what happens ("Submit", "Go") or five competing CTAs.
- Responsive = just stacked columns; touch targets < 44px; hover-only affordances.
- Placeholder copy ("Lorem", "John Doe", "Acme Inc.") left in delivered UI.

## Mandatory bar (require these)

- **Art direction from the subject**: industry, vernacular, and audience visibly shape palette/type/layout. One sentence can explain why this looks like THIS product.
- **Clear visual hierarchy**: a viewer can state what to look at first, second, third, without reading.
- **Deliberate typography**: at most two families with distinct roles; intentional scale, weights, line-height; body line length < 80 chars.
- **Layout fitted to need**: density, alignment, and structure derived from the content's job — not from a grid someone copy-pasted.
- **Component consistency**: one button system, one spacing scale, one icon style across the surface.
- **Purposeful interaction**: every interactive element has visible default/hover/focus/active/disabled states; motion explains change or draws attention to one thing.
- **True responsiveness**: verified at mobile/tablet/desktop widths, not just "it doesn't overflow".
- **Visual quality review**: screenshot/inspect your own output and critique it before delivery; remove one thing that doesn't serve the brief.

## Review questions

1. Would a designer who knows this product sign off, or is this "AI default"?
2. What is the ONE memorable element? If none — the design is a template.
3. Does every empty/loading/error state tell the user what happened and what to do?
4. Is anything decorative that carries no information? Remove it.
