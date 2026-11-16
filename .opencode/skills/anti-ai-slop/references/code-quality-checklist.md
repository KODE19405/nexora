# Code Quality Checklist — Anti-AI Slop

For source code, SQL/migrations, and configuration. Complements (does not replace) systematic-debugging and test-driven-development.

## Slop signals (reject these)

- Abstractions with one implementation and no second caller ("just in case").
- Overengineering: generic frameworks, plugin systems, config matrices for a fixed requirement.
- Copy-paste duplication instead of reuse (and its mirror: forced reuse of poorly-fitting shared code).
- God components/functions mixing UI + fetching + state + formatting in one body.
- Names like `data`, `handle`, `process`, `temp`, `utils2`; single letters outside tiny loops.
- Fake error handling: `catch (e) {}`, swallowing errors, logging and returning null silently.
- Comments restating the code (`i++ // increment i`) or TODO without owner/date/issue.
- New dependency for what the stack does natively; dependency added without checking existing usage.
- "Temporary" hacks presented as final (`// quick fix`, sleep-based sync, magic sleeps).
- Dead code, commented-out code, unused exports left "for later".
- Untested happy-path-only code delivered as done.

## Mandatory bar (require these)

- **Readable by a stranger**: clear names from the domain, small functions, shallow nesting, early returns.
- **Structure scaled to complexity**: single file for a script; modules when boundaries exist; no architecture theater.
- **Separation of concerns**: UI / domain logic / data access / transport don't bleed into each other.
- **Reuse where beneficial**: search the repo before writing; if a near-miss exists, adapt it or justify a new one.
- **Real error handling**: expected failures produce meaningful, safe errors; unexpected ones fail loudly with context; nothing swallowed.
- **Relevant testing**: tests for behavior and failure paths that actually run, with recorded results.
- **Maintainability**: deletable without fear; no hidden coupling; comments explain WHY, never WHAT.

## Review questions

1. What requirement forces this complexity? If none — delete the layer.
2. Where is this already done in the repo? Did you reuse it?
3. What happens on the failure path? Show it handled, not just the success path.
4. What would you delete if forced to cut 30% of this change?
5. If the author disappeared, could someone modify this safely next month?
