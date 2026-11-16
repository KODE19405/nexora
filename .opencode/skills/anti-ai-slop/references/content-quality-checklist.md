# Content Quality Checklist — Anti-AI Slop

For documentation, comments, copy, PR descriptions, plans, and reports.

## Slop signals (reject these)

- Docs made of generic statements ("This module provides robust, scalable solutions") with no specifics.
- Claims without evidence or traceability ("handles all edge cases", "fully tested").
- Comments narrating code instead of adding information (\`// loop through items\`).
- Placeholders left unmarked (\`TBD\`, \`TODO\`, \`<your-key>\`, \`example.com\`) presented as finished.
- Documenting features that don't exist, or describing intended instead of actual behavior.
- Repetition: same point restated in different words to fill space.
- Filler transitions and throat-clearing ("In today's fast-paced world of software...").
- Headers with no content underneath; tables restating prose.
- Copy that sells instead of informs; vague errors with no cause or remedy.

## Mandatory bar (require these)

- **Specific information**: names, versions, commands, file paths, numbers, dates — verifiable facts.
- **Verifiable claims**: every claim traces to code, a command output, a test, or is marked UNVERIFIED/inferred.
- **Plain language**: short sentences, active voice, domain words the reader knows; no corporate filler.
- **Scannable structure**: heading hierarchy, tables/lists where they carry information, one idea per section.
- **Consistency with reality**: docs describe what IS, including limitations and known unknowns; mismatch is a defect.
- **Right-sized**: as short as completeness allows; never padded to look thorough.

## Review questions

1. Could a reader act on this without asking a follow-up question?
2. Which sentence here could be deleted with no information loss? Delete it.
3. For every claim: what evidence exists? Mark gaps explicitly.
4. Does this contradict the code/config it describes? Then it's wrong, not "stale".
5. Is every placeholder marked as such?
