# Architectural Decision Records

This folder contains the Architectural Decision Records (ADRs) of this project.
An ADR captures a single architecturally significant decision together with its context, the options that were considered and the consequences.

The ADRs are written in [MADR](https://adr.github.io/madr/) (Markdown Architectural Decision Records) **4.0.0**.
The MADR documentation is available at <https://adr.github.io/madr/>, while general information about ADRs is available at <https://adr.github.io/>.

## Files

* [adr-template.md](adr-template.md) has all sections, with explanations about them. It is the unmodified MADR 4.0.0 template.
* [.markdownlint.yml](.markdownlint.yml) is the MADR 4.0.0 lint configuration.
* `NNNN-title-with-dashes.md` are the ADRs. [0000-use-markdown-architectural-decision-records.md](0000-use-markdown-architectural-decision-records.md) is the first one, adapted from the MADR seed ADR.

## Creating a new ADR

1. Copy `adr-template.md` to `NNNN-title-with-dashes.md`, where `NNNN` indicates the next number in sequence.
2. Edit `NNNN-title-with-dashes.md`. Remove the optional sections and explanatory comments that you do not use.
3. Add the ADR to the [index](#index) below.
4. Open a pull request. See [Lifecycle](#lifecycle).

The filenames follow the pattern `NNNN-title-with-dashes.md`, where

* `NNNN` is a consecutive number of four digits. Numbers are never reused.
* The title is lowercase and uses dashes. It describes the problem and the solution, e.g. `0007-use-hmac-signatures-for-webhook-auth.md`.
* The suffix is `.md`.

The `write-adr` skill (`.github/skills/write-adr` for GitHub Copilot, `.claude/skills/write-adr` for Claude Code) automates these steps. Keep the two copies identical, the workflow checks this.

## When to write an ADR

Any decision that might impact the architecture is an architectural decision, but not every decision needs an ADR.
Write one for decisions that are hard or costly to reverse, or that affect more than one component, team or consumer.
For integration projects this typically means:

* API and protocol choices (REST, SOAP, JSON:API, CloudEvents, webhooks, messaging)
* Authentication, authorization and secret handling
* Data mapping and canonical model rules
* Error handling, retry and idempotency strategy
* Structure of configurations and adapters, and use of shared components
* Choice of libraries, frameworks and tooling
* Deviations from the defaults of the project template

Local, easily reversible or purely implementation-level choices do not need an ADR.
When in doubt, write a short one.

## Writing guidance for integration projects

MADR leaves the content of the sections open.
For integration projects, the following helps to make a decision complete:

* **Context and Problem Statement:** name the systems, interfaces and consumers in scope, e.g. the OpenAPI contract, the message broker or the target API.
* **Decision Drivers:** consider the following concerns, and delete the ones that do not apply.
  * Standards and API design rules (e.g. JSON:API, CloudEvents, Dutch API Design Rules)
  * Security, authentication and authorization
  * Personal data and privacy (GDPR/AVG)
  * Delivery guarantees, idempotency, retries and error handling
  * Contract versioning and backwards compatibility for consumers
  * Rate limits and performance
  * Observability and supportability
  * Vendor lock-in and licensing
* **Consequences:** state the impact on consumers and providers (breaking changes) and any migration needed.
* **Confirmation:** point to concrete checks where possible, e.g. a Larva test, a CI check or a review checklist item.
* **More Information:** link the related issue, the OpenAPI specification, Larva tests and related ADRs.

Other conventions:

* Front matter: `status`, `date` (ISO 8601, the date of the last status change) and `decision-makers` are required. `consulted` and `informed` are optional.
* Write in full sentences and use "We will ..." for the decision. Keep one sentence per line.
* Always list the considered options, including "do nothing" if it is realistic.

## Lifecycle

```text
proposed ──► accepted ──► deprecated
    │            └──────► superseded by ADR-NNNN
    └──────► rejected
```

* **proposed**: the pull request that adds the ADR is open and under review.
* **accepted**: the pull request is approved by the decision-makers. Set `status: accepted` and the `date` in the same pull request, before merging.
* **rejected**: the decision was considered and turned down. Keep the ADR so the reasoning is not lost.
* **deprecated**: the decision no longer applies and has no replacement.
* **superseded by ADR-NNNN**: a newer ADR replaces this one. The old ADR stays `accepted` until the new ADR is approved. In the pull request that accepts the new ADR, set `status: "superseded by ADR-NNNN"` and update the `date` of the old ADR.

An accepted ADR is not edited afterwards, except for its status, links and typos.
To change a decision, write a new ADR that explains why, and mark the old one as superseded.
Link both ADRs to each other in *More Information*.

## Linting

ADRs are written in Markdown, which allows many styles.
The configuration in [.markdownlint.yml](.markdownlint.yml) is used by the *Lint Architectural Decision Records* workflow to check pull requests that touch this folder.

## Index

* [0000](0000-use-markdown-architectural-decision-records.md): Use Markdown Architectural Decision Records (accepted)
