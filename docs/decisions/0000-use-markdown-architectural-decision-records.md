---
status: accepted
date: 2026-11-06
decision-makers: skeleton maintainers
---

# Use Markdown Architectural Decision Records

## Context and Problem Statement

We want to record the architecturally significant decisions made in this project, so that the reasoning behind them is not lost and is not re-debated without new information.
This project is an integration project, where decisions about interfaces, protocols, authentication, error handling and data mapping affect other systems and their consumers.
Which format and structure should these records follow, and where should they live?

## Decision Drivers

* Decisions are versioned and reviewed together with the code
* Consistency with the other WeAreFrank integration projects
* Explicit documentation of the options that were considered
* Low overhead to write, and plain Markdown without tooling requirements

## Considered Options

* [MADR](https://adr.github.io/madr/) 4.0.0 – Markdown Architectural Decision Records
* [Michael Nygard's template](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions) – the first incarnation of the term "ADR"
* Y-Statements – a single-sentence decision format
* No convention – freeform documents

## Decision Outcome

Chosen option: "MADR 4.0.0", because it is lean, widely adopted and maintained, and makes the options, drivers, decision-makers and status of a decision explicit.
It is also the format provided by the project template this project was created from, which keeps our records consistent with other integration projects.

The MADR files are kept in this repository, in `docs/decisions`, instead of being referenced externally.
When to write an ADR, how it is reviewed and how it is changed are described in [README.md](README.md).

### Consequences

* Good, because decisions are easy to find, review and follow up on
* Good, because considered options are explicit, which prevents re-litigating decisions
* Good, because the MADR 4.0.0 files are in the repository and work offline
* Bad, because writing an ADR takes some effort, which the `write-adr` skill reduces
* Bad, because MADR has no tooling support for 4.0.0, so numbering and the index are maintained by hand or with the `write-adr` skill

### Confirmation

Reviewers check that new ADRs follow [README.md](README.md).
Pull requests that touch `docs/decisions` are also linted by the *Lint Architectural Decision Records* workflow, when it is enabled.

## More Information

* [MADR documentation](https://adr.github.io/madr/)
* [MADR 4.0.0 release](https://github.com/adr/madr/releases/tag/4.0.0)
