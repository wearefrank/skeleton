---
name: write-adr
description: Write, review, supersede or reject an Architectural Decision Record (ADR) in docs/decisions using MADR 4.0.0. Use when the user wants to record, document or change an architectural decision, or asks for an ADR.
---

# Write an ADR

Create or update an Architectural Decision Record in `docs/decisions/`.
The rules (when to write an ADR, conventions, lifecycle) are in `docs/decisions/README.md`, and the template is `docs/decisions/adr-template.md`.
Read both first instead of relying on memory, and follow them.

## Principles

* Never invent facts. Context, options, drivers, decision-makers and consequences come from the user or from sources you have read. Ask when something is missing.
* Ask one question at a time, and propose likely answers where you can.
* Record the reasoning, not the implementation steps.
* Do not edit the body of an accepted ADR. Supersede it instead.

## Steps for a new ADR

1. **Check significance.** If the decision is local, easily reversible or purely an implementation detail, say so and ask whether an ADR is still wanted (see "When to write an ADR" in the README).
2. **Check for existing ADRs.** List `docs/decisions/` and read related ADRs. If the new decision changes an accepted ADR, follow "Superseding an ADR" below.
3. **Gather input**, asking for what you cannot find yourself:
   * The problem and its context, including the systems, interfaces and consumers in scope
   * Decision drivers. Suggest the integration concerns listed under "Writing guidance for integration projects" in the README (standards, security, privacy, delivery guarantees, contract versioning, rate limits, observability, lock-in) that seem relevant
   * The options considered, including "do nothing" when realistic
   * The chosen option and why
   * Consequences, good and bad, including the impact on consumers
   * How compliance will be confirmed (e.g., a Larva test, a CI check, a review item)
   * Decision-makers, plus consulted and informed people if applicable
   * Links to issues, OpenAPI specifications and related ADRs
4. **Pick the number.** Take the highest `NNNN` in `docs/decisions/` and add one. Keep four digits. Never reuse a number.
5. **Create the file** `docs/decisions/NNNN-title-with-dashes.md` from `adr-template.md`.
   * Lowercase title with dashes, describing problem and solution
   * Front matter: `status: proposed`, `date` as today in `YYYY-MM-DD`, `decision-makers`, and `consulted`/`informed` only if known
   * Remove optional sections that are not used, and remove the explanatory comments and unused placeholders of the template
   * Write full sentences, use "We will ..." for the decision, and put one sentence per line
6. **Update the index** list at the bottom of `docs/decisions/README.md`.
7. **Check** that no `{...}` placeholders remain, that links resolve, and that the front matter is valid. If `markdownlint-cli2` is available, run it with `docs/decisions/**/*.md`.
8. **Report** the file created and what still needs a human decision. The ADR stays `proposed` until the pull request is approved. The status changes to `accepted` in that same pull request, before merging.

## Superseding an ADR

1. Write the new ADR as above, and name the old ADR in its *Context* and *More Information*. Leave the old ADR `accepted` while the new ADR is `proposed`.
2. When the new ADR is approved, make these changes in the same pull request, before merging:
   * Set the new ADR to `status: accepted` and update its `date`.
   * In the old ADR, change only `status` to `"superseded by ADR-NNNN"` and update `date`. Add a link to the new ADR in *More Information*.
   * Update the status of both ADRs in the index.
3. If the new ADR is rejected, the old ADR stays `accepted` and is not changed.

## Accepting, rejecting or deprecating an ADR

* **Accept**: set `status: accepted` and update `date` when the decision-makers have approved.
* **Reject**: set `status: rejected`, update `date` and add the reason to *More Information*. Keep the file.
* **Deprecate**: set `status: deprecated`, update `date` and add the reason to *More Information*.
* Always update the index.

## Notes

* Do not change the template, the lint configuration or the MADR version. Propose that as a separate change.
* This skill exists for both GitHub Copilot (`.github/skills/write-adr`) and Claude Code (`.claude/skills/write-adr`). Keep the two copies identical.
