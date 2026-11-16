# Universal Quality Principles — Anti-AI Slop

Expanded form of the 10 principles with concrete do/don't. Load for any artifact.

## 1. No Generic Output
- **Don't:** produce the same layout/module/paragraph for any brief; paste patterns from other projects without adaptation.
- **Do:** tie every major choice to this project's domain, users, and constraints. If you can swap the project name and nothing else changes, redo it.

## 2. Context Before Creation
- **Don't:** design before reading the existing code, configs, and docs.
- **Do:** enumerate what exists (components, helpers, tokens, entities, conventions) and build on it. Record what you checked.

## 3. Intentional Decisions
- **Don't:** pick libraries, colors, or names because they are fashionable or default.
- **Do:** name the trade-off you accepted. "Chose X over Y because this project needs Z" is the standard.

## 4. No Unnecessary Complexity
- **Don't:** add abstraction layers, config options, or indirection without a present requirement.
- **Do:** start with the boring direct solution; add complexity only when a concrete case demands it.

## 5. Quality Over Appearance
- **Don't:** deliver a beautiful mock that hides broken logic, missing a11y, or untested paths.
- **Do:** make it work, then make it clear, then make it beautiful — in that order.

## 6. Project-Specific Solutions
- **Don't:** impose enterprise patterns on a small tool, or MVP hacks on a payment system.
- **Do:** match the solution's weight to the project's scale and risk (see project-type-guidelines.md).

## 7. Functional Correctness
- **Don't:** equate "compiles / renders" with "correct".
- **Do:** verify the main path AND the failure paths; test what can break; log what you verified.

## 8. Maintainability
- **Don't:** clever one-liners, magic values, dead code, commented-out blocks.
- **Do:** boring, explicit code; names that carry domain meaning; deletion of everything unused.

## 9. Consistency
- **Don't:** mix paradigms (three error-handling styles, two naming conventions) in one codebase.
- **Do:** follow the file you're editing; if the file is inconsistent, flag it, don't silently add a fourth style.

## 10. Evidence-Based Quality
- **Don't:** claim "tested", "responsive", "secure", or "accessible" without showing how.
- **Do:** attach proof: commands run, outputs, screenshots, reviewed checklists — or mark the item UNVERIFIED.

## Cross-cutting litmus test
For any output ask: "What did I decide, what did I default, and what did I not check?" Slop lives in the second and third categories.
