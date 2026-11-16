# Security Skills Integration Report — Claude-BugHunter → OpenCode

Date: 2026-11-16
Working directory: `C:\Users\king\project baru`

## Upstream source

- Repository: https://github.com/elementalsouls/Claude-BugHunter
- Source commit (shallow clone, 2026-11-15): `2cfe533df8efa2ced87c91299e1f62b88cb26108`
- Author: Sachin Sharma ("Bug Hunting & GenAI Security Research")
- Dual license (verified on disk): code — MIT (`LICENSE`); skill/documentation content — CC BY 4.0 (`LICENSE-CONTENT`); attribution notes in `NOTICE`
- Handling: content reused under CC BY 4.0 with attribution; MIT code not modified or redistributed as code (only skill Markdown/templates copied).

## Selection summary

- Upstream skills enumerated: **83**
- Relevant & compatible selected and installed: **61**
- Modified for compatibility: **1** (`bug-bounty` — see Modifications)
- Rejected: **22** (see Rejected skills)
- Duplicate skill IDs introduced: **0**

## Safety audit (all 83 inspected)

Programmatic scan of every skill file for: prompt-injection-directed-at-the-operator, destructive shell patterns (`rm -rf`, format, mkfs), `curl | sh` / `iex` / `Invoke-Expression`, `os.system`/`shell=True`, `FromBase64String`, and script files in the skill tree. Findings:

- Scripts exist only in `offensive-osint/scripts/*.py` — that skill was **rejected**, none of which ships into this project; zero scripts copied.
- High-signal hits inside selected skills (e.g. `hunt-llm-ai` "ignore previous instructions", `hunt-ssti` Jinja2 payload, `security-arsenal` `shell=True` PoC, `hunt-rce` crontab line) are **attack payloads/examples for testing targets**, not instructions directed at this agent. Accepted as content.
- No outbound exfiltration or operator-directed injection found in selected skills.
- No instruction in any selected skill authorizes bypassing OpenCode permissions; authorized-use and scope framing is consistent with the repo's engagement model.

Verdicts: 61× PASS (60 as-is + 1 PASS WITH MODIFICATION: `bug-bounty`).

## Installed skill IDs (61) and domains

### Bug-hunting methodology and program workflow
`bb-methodology`, `bug-bounty`, `bugcrowd-reporting`, `evidence-hygiene`, `recon-scope-triage`, `report-writing`, `security-arsenal`, `triage-validation`, `web2-recon`

### Web vulnerability classes (hunt-*, 52)
`hunt-api-misconfig`, `hunt-aspnet`, `hunt-ato`, `hunt-auth-bypass`, `hunt-brute-force`, `hunt-business-logic`, `hunt-cache-poison`, `hunt-captcha-bypass`, `hunt-clickjacking`, `hunt-cloud-misconfig`, `hunt-cors`, `hunt-csrf`, `hunt-deserialization`, `hunt-dom`, `hunt-exceptional-conditions`, `hunt-file-upload`, `hunt-fintech-graphql`, `hunt-forgot-password`, `hunt-graphql`, `hunt-grpc`, `hunt-host-header`, `hunt-html-injection`, `hunt-http-smuggling`, `hunt-idor`, `hunt-jwt-crypto`, `hunt-laravel`, `hunt-ldap`, `hunt-lfi`, `hunt-llm-ai`, `hunt-mfa-bypass`, `hunt-misc`, `hunt-nextjs`, `hunt-nodejs`, `hunt-nosqli`, `hunt-oauth`, `hunt-open-redirect`, `hunt-race-condition`, `hunt-rag-vector`, `hunt-rce`, `hunt-saml`, `hunt-session`, `hunt-shadow-api`, `hunt-source-leak`, `hunt-spa-api`, `hunt-springboot`, `hunt-sqli`, `hunt-ssrf`, `hunt-ssti`, `hunt-subdomain`, `hunt-websocket`, `hunt-xss`, `hunt-xxe`

Installed location: `.opencode/skills/<skill-id>/` (project-local, same format as existing skills).

## Judgment calls (documented)

- `hunt-cloud-misconfig` INCLUDED: AWS/GCP/Azure web-facing misconfigs (public buckets, JS-bundle secrets, IMDS-via-SSRF) — within web-app attack surface.
- `hunt-cicd` EXCLUDED: CI/CD pipeline attacks — infrastructure/supply-chain, not web-app surface.
- `hunt-tls-network` EXCLUDED: TLS/DNS infrastructure misconfig, not a web-app vulnerability class.
- `hunt-llm-ai`, `hunt-rag-vector`, `hunt-fintech-graphql`, `hunt-grpc`, `hunt-ldap`, `hunt-saml` INCLUDED: attack classes against web-exposed APIs and SSO/LLM-backed web features.
- `hunt-cloud-misconfig`, `hunt-shadow-api`, `recon-scope-triage`, `web2-recon`, `bb-methodology`, `bug-bounty` kept despite partial overlap — they are the orchestrators/recon backbone of the offensive workflow; not duplicates of any existing skill.

## Overlap / conflict analysis vs existing 14 skills

- `security-review` (defensive scanner) vs `hunt-*` (offensive class methodology): complementary, not duplicate. No IDs collide.
- `bug-bounty` overlaps conceptually with `bugcrowd-reporting`/`report-writing`/`triage-validation` — upstream intentional pairing (validation → report → submit). Kept as-is.
- `anti-ai-slop`, `code-review-skill`, `webapp-testing`, `test-driven-development`: no overlap.
- `webapp-testing` ↔ `hunt-*`: QA browser testing vs pentest methodology — complementary.
- No SKILL.md methodology was rewritten or merged.

## Dangling references (informational only, left intact)

Some installed skills reference upstream skills that were intentionally not installed: `hunt-dispatch`, `offensive-osint`, `osint-methodology`, `redteam-mindset`, `redteam-report-template`, `supply-chain-attack-recon`, `cloud-iam-deep`, `hunt-k8s`, `hunt-cicd`, `hunt-sharepoint`, `hunt-ntlm-info`, `hunt-tls-network`, `bb-local-toolkit`, `apk/ios-redteam-pipeline`. These mentions are descriptive ("owned by X", "see X"), not invocations; they will not resolve at runtime. No file was edited to remove them except the one documented modification.

## Modifications (1)

- `.opencode/skills/bug-bounty/SKILL.md` — replaced the `# INSTALLATION (Claude Code Skill)` section (Clone-to-~/.claude / direct-copy instructions) with a project-local OpenCode installation note. **Original behavior:** instructed users to clone/link the skill into `~/.claude/skills/`. **Reason:** Claude Code-specific install instructions; irrelevant and misleading in OpenCode; content elsewhere byte-identical. (Note: `SKILL.md` hashes differ from upstream; all other 60 installed skills are byte-identical to upstream.)
- `bug-bounty` description frontmatter intentionally left untouched (upstream content, including trigger phrases).

## Agent integration

- `security-auditor` (frontmatter only): added `skill: allow` rules for all 61 installed skill IDs after its existing allows (default-deny for skill otherwise would have blocked them). No other permission changed; `edit: deny`, no shell, read-only boundaries unchanged.
- No other agent was given the new skills (minimality). No agents created; default agent unchanged; `opencode.json` unchanged.
- Workflow preserved: build coordinates → security-auditor assesses → backend/frontend/database/devops remediate → qa-engineer verifies (read-only) → code-reviewer reviews (read-only) → anti-ai-slop gate before delivery.

## Verification (runtime, OpenCode v2.2.5 V2)

- `opencode debug agents`: 16 agents registered (9 specialist + 7 built-in/hidden). `security-auditor` present with 61 new `skill allow` rules in normalized registry.
- Frontmatter structural check across all 9 agent files: ALL OK.
- Existing 14 skills: SHA-256 inventory vs pre-integration snapshot — no modified files.
- Existing skills remain discoverable; new skills appear as native `<available_skills>` in this very session.
- Representative live loads by `security-auditor` (native skill tool): `hunt-sqli`, `hunt-xss`, `hunt-idor`, `hunt-ssrf`, `report-writing` — all loaded successfully.
- Functional fixture test (local, no network): fixture `fixture.js` with SQLi + innerHTML XSS + broken object-level authorization identified correctly by security-auditor with per-finding remediation. **PASS.** No scans of external targets were run; no attacks against live systems.
- `rea`, QA/code-reviewer boundary regression: not re-run in this task (unchanged files); their prior hardening remains in force.

## Rollback

1. Delete the 61 new skill directories under `.opencode/skills/` (list them from the IDs above).
2. In `.opencode/agents/security-auditor.md`, delete the 61 `action: skill, resource: "<id>", effect: allow` rules added after the `anti-ai-slop` allow (they are contiguous, prefixed by `  - action: skill`).
3. The pre-integration hash inventory is at `%TEMP%\skills-inventory-before.txt` (session-local; the project itself is not a git repo — copy this file elsewhere if you need a durable rollback baseline).
4. `bug-bounty` returns to upstream by re-copying that single directory from the upstream clone at commit `2cfe533...`.
5. No other file was modified.

## Remaining limitations

- Skills are invoked by topic/description; none of the offensive skills was exercised against a live target (by design; not executed here).
- Dangling references above mean some "see X" pointers point to uninstalled skills.
- `bug-bounty` still mentions `hunt-dispatch`, `/hunt` engagement scaffold and `offensive-osint` (upstream text, informational).
- Full attack-path execution requires an explicitly authorized live target; none exists in this workspace.
- CC BY 4.0 attribution satisfies the license; no warranty expressed.
