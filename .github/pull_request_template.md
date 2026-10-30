## Description
_What does this PR change and why? Replace this text with your description._

<details>
<summary><b>Checklist</b></summary>

- [ ] Related issues and PRs are referenced (e.g. `Closes #123`)
- [ ] Properties: names are camelCase, changes to existing ones are backwards compatible (or marked `BREAKING`), and new ones are added to a `DeploymentSpecifics.properties` file with a default value (may be empty) and a comment if the name alone is not clear
- [ ] Larva tests are added or updated
- [ ] End-to-end tests (SoapUI or Bruno) are added or updated
- [ ] Tested locally
- [ ] Frank!Console does not show any development related warnings
- [ ] No secrets or credentials are committed
- [ ] Documentation is updated where needed

</details>

<details open>
<summary><b>Preferred merge method</b></summary>

_Pick one. Rebase is preferred._

- [ ] Rebase and merge (preferred)
- [ ] Merge commit
- [ ] Squash and merge

</details>

<details>
<summary><b>Merge checklist</b></summary>

- [ ] Commit messages (or the PR title when squashing) follow [Conventional Commits](https://www.conventionalcommits.org/)
- [ ] Rebase or merge commit: every commit message is clean and suitable for the changelog (no `fix typo` or `wip` commits). Do an interactive rebase (`git rebase -i`) to clean up commits if needed
- [ ] Squash: the PR title is clean and suitable for the changelog
- [ ] Breaking changes are marked with `BREAKING: <description>` on the last line of the commit message
- [ ] The PR targets the right branch: `main`, or a release channel (`next` for features, `next-major` for breaking changes) if the change should not be released immediately

</details>
