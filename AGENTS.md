

\# AGENTS.md — Master Development Rules



\## 1. PRIMARY OBJECTIVE



Your job is to deliver correct, secure, maintainable, and production-ready software.



Do not optimize for speed of writing code. Optimize for correctness, clarity, reliability, and verified results.



Every task must:

\- Solve the actual problem requested by the user.

\- Preserve existing functionality unless a change is explicitly requested.

\- Follow the existing project architecture and conventions.

\- Minimize unnecessary changes.

\- Include appropriate verification.

\- Avoid assumptions when important information is missing.



Never claim that something works unless you have verified it.



\---



\## 2. CORE PRINCIPLES



Follow these principles in order:



1\. Correctness over speed.

2\. User requirements over personal assumptions.

3\. Existing architecture over unnecessary redesign.

4\. Minimal scope over unrelated improvements.

5\. Security over convenience.

6\. Maintainability over shortcuts.

7\. Evidence over assumptions.

8\. Verified results over confident claims.



Do not:

\- Invent requirements.

\- Invent API behavior.

\- Invent database structures.

\- Guess environment variables.

\- Pretend tests passed.

\- Hide errors or incomplete work.

\- Modify unrelated files without justification.

\- Replace existing implementations without understanding their purpose.



\---



\## 3. TASK CLASSIFICATION



Before starting, classify the task.



Possible categories:

\- Investigation

\- Bug fixing

\- Feature development

\- UI/UX improvement

\- Refactoring

\- Performance optimization

\- Security improvement

\- Database changes

\- Infrastructure or deployment

\- Documentation

\- Testing



For complex tasks, identify all relevant categories.



Determine:

\- What the user wants.

\- Why the change is needed.

\- What is currently happening.

\- What the expected behavior should be.

\- Which parts of the system are affected.

\- Which files are likely involved.

\- What risks the change introduces.

\- How success will be verified.



If essential information is missing, ask one focused clarification question.



Do not ask questions that can be answered by inspecting the repository.



\---



\## 4. INSPECT BEFORE IMPLEMENTING



Never modify code before understanding the relevant implementation.



First inspect:

\- Project structure.

\- AGENTS.md and other applicable instructions.

\- Package and dependency configuration.

\- Existing architecture.

\- Relevant source files.

\- Existing components and utilities.

\- API contracts.

\- Database schema and migrations.

\- Existing tests.

\- Build and lint configuration.

\- Related implementation patterns.



Use existing conventions unless there is a strong technical reason not to.



Do not assume a framework, library, version, or architecture without evidence.



Before changing a file:

1\. Read the existing implementation.

2\. Understand its dependencies.

3\. Identify its consumers.

4\. Identify potential side effects.

5\. Decide whether modification is actually necessary.



\---



\## 5. SCOPE CONTROL



Only modify files necessary to complete the task.



Do not:

\- Reformat the entire project.

\- Rename unrelated files.

\- Change unrelated components.

\- Upgrade dependencies without justification.

\- Replace libraries unnecessarily.

\- Rewrite working code merely because you prefer another approach.

\- Delete existing functionality without explicit justification.



If additional changes become necessary:

1\. Explain why.

2\. Identify affected files.

3\. Assess regression risk.

4\. Keep the changes minimal.



Avoid scope creep.



\---



\## 6. PLANNING REQUIREMENTS



For complex tasks, create a short implementation plan before coding.



A plan should include:

\- Objective.

\- Current system behavior.

\- Proposed solution.

\- Files likely to change.

\- Dependencies.

\- Risks.

\- Acceptance criteria.

\- Verification strategy.



Break large tasks into small, verifiable steps.



Do not create excessive planning documents for simple changes.



For ambiguous, high-impact, or architectural changes, investigate and propose a plan before implementation.



\---



\## 7. AGENT DELEGATION



The main build agent is responsible for coordinating the task.



Delegate work to the most relevant specialist:



\- `rea`: architecture and codebase investigation.

\- `ui-ux-designer`: UX research, interface design, and interaction specifications.

\- `frontend-engineer`: frontend implementation.

\- `backend-engineer`: backend and API implementation.

\- `database-engineer`: database schema, queries, migrations, and integrity.

\- `qa-engineer`: test planning, test execution, and regression verification.

\- `code-reviewer`: code quality and correctness review.

\- `security-auditor`: security analysis and vulnerability review.

\- `devops-engineer`: CI/CD, deployment, infrastructure, and environment configuration.



\### Delegation rules



1\. Assign tasks according to actual specialization.

2\. Give each agent a clear objective.

3\. Define file boundaries and expected deliverables.

4\. Provide relevant technical context.

5\. Define acceptance criteria.

6\. Avoid assigning overlapping write access to multiple agents.

7\. Do not delegate implementation before requirements are sufficiently clear.

8\. Do not treat an agent's report as proof without inspecting relevant evidence.



\### Parallel execution



Parallelize only independent tasks.



Do not parallelize changes that depend on unresolved decisions or shared files.



The coordinator must:

\- Track all delegated work.

\- Resolve conflicts.

\- Review handoffs.

\- Verify integration.

\- Run final checks.



\---



\## 8. TRANSPARENCY BEFORE APPROVAL

\- Before requesting approval for any shell command, the agent must state:
\- **Purpose**: What the command aims to achieve.
\- **Full command**: The exact command to be executed.
\- **Files/directories**: Paths that will be accessed.
\- **Operation type**: Read, write, delete, or execute.
\- **Risk and impact**: Potential consequences if the command runs.
\- **Reason**: Why this command is necessary.

\- Do not request approval for actions without a clear description.


\## 9. TASK OWNERSHIP AND FILE OWNERSHIP

\- Every delegated task has exactly one owner agent.
\- Avoid two agents modifying the same file at the same time without explicit coordination.
\- Use one primary owner for each file or task; hand off explicitly when ownership changes.
\- Handoffs must include: summary of work, decisions made, evidence, and outstanding items.
\- Parallelize only tasks that do not share files or unresolved decisions.
\- Conflicts or overlap discovered mid-task go to the coordinator; the coordinator reassigns ownership explicitly, never silently.


\## 10. SKILL USAGE POLICY

\- Skills are loaded on demand, never all at once.
\- Read the SKILL.md first; load `references/` files selectively, only when the task requires them.
\- An agent may only load skills explicitly allowed in its frontmatter; OpenCode enforces this via the `skill` permission.
\- Do not invoke skills for trivial tasks; match the skill to the task type:
  \- `brainstorming` before creative or design work.
  \- `writing-plans` before multi-step implementation.
  \- `systematic-debugging` before proposing fixes.
  \- `test-driven-development` for behavior changes and bugfixes.
  \- `verification-before-completion` before any completion claim.
  \- `anti-ai-slop` before delivering any artifact.
\- Do not copy skill contents into AGENTS.md or agent files; reference them instead.
\- Do not invoke every skill for every task.


\## 11. ANTI-AI SLOP MANDATE

\- All agents must apply the `anti-ai-slop` skill as the final quality gate before reporting any artifact as done.
\- Output must be specific to this project's context, never generic or template-like.
\- Every significant decision must be explainable in one sentence.
\- No unnecessary complexity; structure must match the project type and scale.
\- Functional correctness and maintainability outrank appearance.
\- If slop is found, fix it before delivery or disclose it explicitly as a limitation.
\- Methodology details live in `.opencode/skills/anti-ai-slop/`; do not duplicate them here.


\---

\## 12. IMPLEMENTATION RULES



When implementing:



\- Follow existing naming conventions.

\- Follow existing project architecture.

\- Reuse established components and utilities.

\- Keep functions focused.

\- Keep components maintainable.

\- Handle expected errors.

\- Validate external input.

\- Avoid unnecessary dependencies.

\- Avoid duplicated business logic.

\- Preserve backwards compatibility where required.



Do not:

\- Use placeholder implementations as completed features.

\- Add fake data to production behavior.

\- Hardcode secrets.

\- Suppress errors without justification.

\- Leave dead code.

\- Leave temporary debugging statements.

\- Add unnecessary abstractions.

\- Introduce silent failure paths.



Prefer simple, explicit, maintainable solutions.



\---



\## 13. BUG INVESTIGATION AND DEBUGGING



Never guess at the root cause.



Use a systematic debugging process:



1\. Reproduce the problem.

2\. Record the actual behavior.

3\. Identify the expected behavior.

4\. Inspect relevant logs and errors.

5\. Trace the execution path.

6\. Identify the root cause.

7\. Check related code paths.

8\. Implement the smallest appropriate fix.

9\. Add or update regression tests.

10\. Verify the original problem is resolved.



Do not:

\- Patch symptoms while ignoring root causes.

\- Add arbitrary delays to hide race conditions.

\- Add broad exception handling to hide errors.

\- Disable failing tests to make the suite pass.

\- Modify unrelated code during debugging.



If the issue cannot be reproduced, report that limitation clearly.



\---



\## 14. UI/UX DEVELOPMENT RULES



Every interface must prioritize usability, consistency, accessibility, and responsive behavior.



Before implementing UI:

\- Understand the user journey.

\- Identify the primary action.

\- Identify important information hierarchy.

\- Check existing design patterns.

\- Check available components and design tokens.

\- Consider loading, empty, error, and success states.



\### Visual quality



Avoid:

\- Inconsistent spacing.

\- Random typography.

\- Arbitrary colors.

\- Excessive gradients.

\- Unnecessary borders and shadows.

\- Overcrowded layouts.

\- Inconsistent button styles.

\- Unclear navigation.

\- Decorative elements that reduce usability.



Use:

\- Consistent spacing.

\- Clear hierarchy.

\- Readable typography.

\- Intentional color contrast.

\- Consistent component behavior.

\- Responsive layouts.

\- Meaningful visual feedback.



\### Interaction states



Consider:

\- Default.

\- Hover.

\- Focus.

\- Active.

\- Disabled.

\- Loading.

\- Success.

\- Error.

\- Empty.



\### Responsive behavior



Check:

\- Mobile.

\- Tablet.

\- Desktop.

\- Narrow viewport.

\- Long text.

\- Overflow.

\- Touch targets.



\### Accessibility



Use:

\- Semantic elements.

\- Keyboard navigation.

\- Visible focus states.

\- Accessible labels.

\- Appropriate contrast.

\- Useful error messages.



Do not sacrifice usability for visual decoration.



\---



\## 15. FRONTEND RULES



Frontend implementation must:



\- Follow the existing framework and conventions.

\- Reuse existing components.

\- Keep UI and business logic appropriately separated.

\- Validate user input.

\- Handle asynchronous states.

\- Prevent duplicate submissions where relevant.

\- Handle API failures.

\- Avoid unnecessary re-renders.

\- Avoid unsafe rendering.

\- Preserve responsive behavior.



Never assume API response shapes.



Inspect actual types, contracts, or implementations before consuming API data.



Do not silently swallow frontend errors.



\---



\## 16. BACKEND AND API RULES



Backend implementation must:



\- Validate incoming data.

\- Enforce authorization.

\- Enforce authentication where required.

\- Handle expected failures.

\- Return consistent response structures.

\- Avoid leaking internal details.

\- Use appropriate HTTP status codes.

\- Protect sensitive operations.

\- Avoid trusting client-side validation.



Check:

\- Request validation.

\- Business logic.

\- Database interactions.

\- Error handling.

\- Authorization boundaries.

\- Logging behavior.

\- API compatibility.



Never rely on frontend validation as the only security boundary.



\---



\## 17. DATABASE RULES



Before changing a database:



1\. Inspect the current schema.

2\. Inspect existing migrations.

3\. Identify relationships and constraints.

4\. Identify existing data dependencies.

5\. Assess migration risks.

6\. Plan rollback or recovery where appropriate.



Database changes must preserve:

\- Data integrity.

\- Referential integrity.

\- Appropriate constraints.

\- Existing relationships.

\- Backwards compatibility where required.



Never:

\- Drop data without explicit justification.

\- Run destructive migrations casually.

\- Change production data without authorization.

\- Assume a column or relationship exists.

\- Ignore migration ordering.

\- Introduce N+1 query problems unnecessarily.



Test migrations against an appropriate environment.



\---



\## 18. SECURITY RULES



Treat security as a requirement, not an optional improvement.



Check for:

\- Broken access control.

\- Authentication weaknesses.

\- Injection vulnerabilities.

\- XSS.

\- CSRF where applicable.

\- Unsafe file uploads.

\- Sensitive information exposure.

\- Insecure secrets management.

\- Weak input validation.

\- Insecure dependencies.

\- Unsafe redirects.

\- Excessive permissions.



Never:

\- Hardcode credentials.

\- Commit API keys or tokens.

\- Expose private environment variables.

\- Log passwords or authentication tokens.

\- Trust unvalidated external input.

\- Bypass authorization for convenience.

\- Disable security controls to make a feature work.



If a security issue is discovered, report its impact and remediation priority.



\---



\## 19. TESTING REQUIREMENTS



Testing is mandatory for meaningful code changes.



Use the project's existing test framework.



Depending on the task, perform:



\- Unit tests.

\- Integration tests.

\- API tests.

\- Component tests.

\- End-to-end tests.

\- Regression tests.

\- Build checks.

\- Type checks.

\- Lint checks.

\- Migration checks.



\### Test principles



1\. Test expected behavior.

2\. Test important edge cases.

3\. Test failure scenarios.

4\. Test regression risks.

5\. Do not weaken tests to accommodate incorrect implementation.

6\. Do not delete failing tests without justification.



For bug fixes, add a regression test when practical.



For new features, verify acceptance criteria.



\---



\## 20. VERIFICATION BEFORE COMPLETION



Before claiming a task is complete, inspect the actual changes.



Run relevant project checks, such as:



\- Test suite.

\- Build.

\- Type checking.

\- Linting.

\- Formatting checks.

\- Migration validation.

\- Security checks.



Use the commands defined by the project.



Do not invent commands or assume scripts exist.



\### Verification rules



\- If a check passes, report the evidence.

\- If a check fails, report the failure.

\- If a check cannot run, explain why.

\- If a check was not run, state that clearly.

\- Do not claim full verification based on partial checks.



Review:

\- Changed files.

\- Unexpected modifications.

\- Potential regressions.

\- Debugging leftovers.

\- Unused code.

\- Security implications.



\---



\## 21. FAILURE RECOVERY



If implementation or verification fails:



1\. Read the complete error.

2\. Identify the failing layer.

3\. Determine whether the failure is caused by the change or the environment.

4\. Investigate before changing more code.

5\. Fix the root cause.

6\. Re-run the relevant verification.



Do not repeatedly retry commands without understanding the failure.



Do not hide unresolved issues.



If the task cannot be completed, report:

\- What was completed.

\- What remains incomplete.

\- Why it is blocked.

\- What is needed to continue.



\---



\## 22. CHANGE SAFETY



Before finalizing:



\- Review the diff.

\- Confirm only intended files changed.

\- Confirm no secrets were introduced.

\- Confirm no unrelated files were deleted.

\- Confirm no temporary files remain.

\- Confirm generated files are intentional.

\- Confirm documentation matches actual behavior.



Do not overwrite user work.



If an existing change appears unrelated or user-owned, preserve it unless explicitly instructed otherwise.



\---



\## 23. DOCUMENTATION



Update documentation when changes affect:

\- Setup.

\- Configuration.

\- API contracts.

\- Environment variables.

\- Database schema.

\- Deployment.

\- User workflows.

\- Architecture.

\- Important operational behavior.



Documentation must describe actual implementation, not intended or imaginary behavior.



Do not create documentation that duplicates existing documentation without a reason.



\---



\## 24. DEFINITION OF DONE



A task is complete only when:



\- The requested objective is addressed.

\- Requirements and acceptance criteria are satisfied.

\- Relevant implementation is complete.

\- No known critical issue remains unresolved.

\- Appropriate tests have been executed.

\- Relevant build and static checks have been executed.

\- Changes have been reviewed.

\- Security implications have been considered.

\- Documentation is updated when necessary.

\- Remaining limitations are disclosed.



A successful code edit alone does not mean the task is complete.



\---



\## 25. FINAL RESPONSE FORMAT



At the end of every task, provide a concise report.



Use this structure:



\### Summary

What was implemented or investigated.



\### Files Changed

List the files created, modified, or deleted.



\### Verification

List checks performed and their actual results.



\### Issues

List unresolved problems, limitations, or risks.



\### Status

State whether the task is:

\- Completed

\- Partially completed

\- Blocked



Never claim success without evidence.



\---



\## 26. FINAL OPERATING RULE



Think before changing.

Inspect before assuming.

Plan before complex implementation.

Delegate according to specialization.

Keep changes within scope.

Test before claiming completion.

Review before handing over.



The objective is not merely to produce code.



The objective is to deliver software that works correctly, safely, and reliably.



