---
name: anti-ai-slop
description: Universal quality gate that prevents generic, low-effort, template-like output across ALL project types — visuals, code, documentation, and content. Use before delivering any artifact (feature, page, component, API, schema, CLI, doc, plan). Applies to web, backend, database, mobile, desktop, infrastructure, libraries, and legacy modernization alike.
metadata:
  version: "1.0"
---

# Anti-AI Slop

Slop is output that could have been produced for any brief: generic layouts, interchangeable code, filler prose, unverifiable claims. This skill is the final quality gate that catches slop before delivery. It applies to every artifact and every project type, not only frontend or visual work.

## When to Use

- Before declaring any artifact done: code, UI, docs, plans, schemas, configs, reports.
- When reviewing your own or another agent's output for genericness.
- When a result "works" but feels templated, bloated, or hollow.

Do not use it as a reason to gold-plate. The gate removes slop; it does not expand scope.

## The 10 Universal Quality Principles

1. **No Generic Output** — if the same artifact would result from any similar brief, it is slop. Anchor every decision in this project's actual context.
2. **Context Before Creation** — read the existing code, conventions, users, and constraints first. Never design in a vacuum.
3. **Intentional Decisions** — every color, dependency, abstraction, and word must be defensible. "It's the default" is not a reason.
4. **No Unnecessary Complexity** — the simplest structure that satisfies the requirement wins. Complexity must be justified by a real constraint.
5. **Quality Over Appearance** — something that looks polished but doesn't work, or works but can't be maintained, is slop.
6. **Project-Specific Solutions** — reuse what the project already has; don't import patterns that don't fit its scale.
7. **Functional Correctness** — slop is also code that compiles but is wrong, untested, or unverifiable.
8. **Maintainability** — the next engineer must understand the result without you in the room.
9. **Consistency** — one way of doing things per concern, matching the codebase's established idiom.
10. **Evidence-Based Quality** — quality claims require verification (tests, screenshots, output), not adjectives.

## How to Work

1. **Load context first.** Read the files you will touch, their consumers, and the conventions in force. If you cannot name the project's conventions, you have not done this step.
2. **Make decisions explicitly.** For each significant choice, be able to answer "why this, not the default?"
3. **Build to the project's actual bar.** A CLI tool, a dashboard, and a landing page do not share a quality checklist — see `references/project-type-guidelines.md`.
4. **Run the gate before delivery.** Answer the 7 questions in the Quality Gate below. Fix failures before reporting done.

## Reference Files (load selectively, only when relevant)

| File | Load when |
|---|---|
| `references/universal-quality-principles.md` | Any artifact — the full principles with do/don't |
| `references/visual-quality-checklist.md` | Anything with a rendered surface (web, mobile, desktop, docs with figures) |
| `references/code-quality-checklist.md` | Any source code, schema, query, or config |
| `references/content-quality-checklist.md` | Docs, comments, copy, PR descriptions, plans |
| `references/project-type-guidelines.md` | When the project type is backend/database/CLI/infra/library/mobile/desktop/legacy — i.e., almost always |

Do not load references you don't need. A pure backend change does not need the visual checklist.

## Anti-AI Slop Quality Gate (run before delivery)

Answer all seven, honestly:

1. Does the solution fit this project's context and conventions?
2. Is there any generic part that isn't needed (boilerplate, placeholder, filler)?
3. Can I justify each significant technical decision in one sentence?
4. Is there complexity that nothing requires?
5. Does the result actually work — verified, not assumed?
6. Will the next engineer maintain it without distress?
7. Is the quality bar right for this project type (not under-built, not gold-plated)?

Any "no" → fix it, or state it explicitly as a known limitation. Never ship slop silently.

## Red Flags (stop signs)

- "It follows best practices" with no project-specific reason.
- Copy-pasted structure that duplicates something already in the repo.
- A new dependency for something the stack already does.
- Screenshots/claims with no verification behind them.
- Placeholder content not marked as such.
- "Done" when nothing was run.
