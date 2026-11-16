# Agent Workflow and Handoff Protocol (Updated)

## 1. Coordinator

The primary build agent owns:
- User requirements.
- Task scope.
- Planning.
- Agent assignments.
- Integration.
- Final verification.
- Final report.

Specialists do not independently expand the approved scope.

## 2. Investigation

Use REA when:
- Architecture is unclear.
- Existing behavior must be traced.
- Multiple modules may be affected.
- Implementation risks are unknown.

REA returns evidence and recommendations, not code changes.

## 3. Design

Use UI/UX Designer when:
- A new user flow is needed.
- Existing UI requires substantial redesign.
- Responsive behavior is unclear.
- Interaction states need specifications.

Frontend Engineer owns implementation.

## 4. Implementation

Frontend Engineer:
- Owns frontend code (index.html CSS/JS).

Backend Engineer:
- Owns APIs and server-side business logic (backend_pa/app.py).

Database Engineer:
- Owns schema, migrations, query design, and data integrity (SQLite).

DevOps Engineer:
- Owns infrastructure and delivery configuration.

Do not assign overlapping edits to multiple agents without explicit coordination.

## 5. Verification

QA Engineer:
- Independently tests acceptance criteria and user workflows.

Code Reviewer:
- Independently reviews implementation and scope.

Security Auditor:
- Reviews security-sensitive execution paths.

These agents report findings; they do not silently modify implementation.

## 6. Handoff Contract

Every agent must report:

1. Assigned objective.
2. Scope inspected.
3. Files inspected.
4. Files changed, if permitted.
5. Decisions made.
6. Evidence collected.
7. Tests executed.
8. Results.
9. Risks and unknowns.
10. Recommended next action.

## 7. Parallel Work

Parallel execution is allowed only when:
- Tasks are independent.
- File ownership is clear.
- Shared interfaces are agreed upon.
- Dependencies are understood.

Otherwise use sequential handoffs.

## 8. Conflict Resolution

When findings conflict:
1. Inspect the underlying evidence.
2. Recheck project conventions.
3. Compare against approved requirements.
4. Resolve before integration.
5. Document the decision.

## 9. Final Gate

Before completion:
- All acceptance criteria are addressed.
- Relevant tests are executed.
- QA findings are resolved or disclosed.
- Review findings are resolved or disclosed.
- Security risks are assessed when relevant.
- Final diff is inspected.
- Remaining limitations are reported.

## 10. No False Completion

An agent's statement that work is done is not proof.

The coordinator must verify the result independently.

## 11. Kimsweb-Specific Workflow

### FASE 1 — Discovery
Pahami proyek, sembilan agent, struktur file, dan arsitekturnya.

### FASE 2 — Audit
Temukan akar masalah, inventarisasi tools, dan identifikasi risiko.

### FASE 3 — Bug Fix
Perbaiki sembilan masalah utama (pesan admin, rate limit, tema biru, log admin, animasi biru, tools, performa, tema merah meteor, tema mobile).

### FASE 4 — Feature Development
Buat seluruh fitur baru dan integrasikan dengan sistem lama (GYM, QR, Diskon, Message Sharing, Modal).

### FASE 5 — UI/UX
Sempurnakan tema, modal, navigasi, dan animasi.

### FASE 6 — Performance & Security
Optimalkan performa dan lakukan security audit.

### FASE 7 — Integration & QA
Integrasikan seluruh hasil agent dan jalankan pengujian regresi.

### Status Agent
Gunakan status: PENDING, INVESTIGATING, IN_PROGRESS, BLOCKED, REVIEW, TESTING, COMPLETED.