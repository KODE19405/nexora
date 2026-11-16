# Project-Type Guidelines — Anti-AI Slop

Quality bars are not uniform. Apply the bar that fits the project type; forcing the wrong bar is itself slop.

| Project type | Quality bar that matters | Do NOT impose |
|---|---|---|
| **SaaS** | Onboarding clarity, activation flow, empty/error states, data-density trade-offs, multi-tenant authz, conversion of primary CTA | Landing-page hero spectacle inside the app; vanity animations |
| **Dashboard** | Information density with hierarchy, scan-ability, filter/sort correctness, consistent units & formatting, export correctness | Editorial typography; decorative illustration |
| **E-commerce** | Product legibility, price/stock/cart correctness, checkout friction, trust signals, image quality discipline | Enterprise admin patterns; playful experimental layouts in checkout |
| **Landing page** | Message-market fit, single clear CTA, proof (numbers/testimonials) discipline, load performance, distinct art direction | App-style dense navigation; empty feature lists |
| **Internal tools** | Speed of common tasks, keyboard efficiency, honest error messages, low ceremony, role-based views | Public-brand polish budget; excessive animation |
| **API** | Contract stability, consistent error schema, status-code correctness, validation, idempotency where relevant, docs matching reality | UI checklists (irrelevant); verbose prose endpoints |
| **Backend service** | Reliability, observability (logs/metrics/tracing), graceful degradation, safe migrations, timeouts & retries | Any visual guidance; clever startup frameworks |
| **Database system** | Integrity, constraints, indexing from real access patterns, reversible migrations, backup/restore story | ORM-bait abstraction for its own sake |
| **CLI** | Composability, stdin/stdout hygiene, `--help` quality, exit codes, scriptability, quiet/verbose modes | TUI/screenshots theatrics; mandatory interactivity |
| **Mobile application** | Touch ergonomics, offline behavior, platform conventions (iOS/Android), battery/start-up cost, permission discipline | Desktop hover patterns; dense web-table layouts |
| **Desktop application** | Keyboard shortcuts, window/state persistence, OS integration, file-dialog correctness, resource footprint | Webview-bloat masquerading as desktop |
| **Infrastructure** | Reproducibility (IaC), environment parity, least-privilege, rollback path, secrets hygiene, drift detection | Application-code style; novel tooling for its own sake |
| **Library / framework** | Small API surface, semver discipline, no hidden side effects, excellent docs + examples, deprecation policy | Internal-app patterns; heavy dependencies |
| **Legacy modernization** | Behavioral equivalence evidence, phased safety ladder, rollback at every rung, characterization tests before change | Big-bang rewrites; "clean slate" ideology |

## Rules that apply everywhere

1. **Backend/infra/CLI/library projects must not be given visual or copy checklists.** If a reviewer flags "missing art direction" on an API service, the reviewer is the slop.
2. **Simple projects must not be given enterprise complexity.** A 200-line script doesn't need DDD, DI containers, or a design doc.
3. **Risky projects (payments, auth, health, personal data) raise the bar on correctness and verification**, regardless of size.
4. When in doubt about the bar: match the existing system's conventions, and flag the gap rather than silently exceeding or lowering it.
5. State the project type and chosen bar explicitly in your report so reviewers can check it.
