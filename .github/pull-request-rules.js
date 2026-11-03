// Extra pull request rules for this repository, on top of the base rules of
// https://github.com/wearefrank/ci-cd-templates/tree/main/pull-request-rules

const BASE_BRANCHES = /^(main|master|next|next-major|\d+(\.\d+)?\.x)$/;
const PROPERTY_KEY = /^\s*([^#!\s=:][^=:\s]*)\s*[=:]/;
const CAMEL_CASE_KEY = /^[a-z][a-zA-Z0-9]*(\.[a-z][a-zA-Z0-9]*)*$/;

const withoutCode = (text) => (text || '').replace(/```[\s\S]*?```/g, '').replace(/`[^`\n]*`/g, '');
const isPropertiesFile = (file) =>
  file.startsWith('src/main/') &&
  file.endsWith('.properties') &&
  !file.startsWith('src/main/secrets/') &&
  !file.endsWith('/BuildInfo.properties');

const propertyKeys = (lines) =>
  (lines || '')
    .split('\n')
    .map((line) => PROPERTY_KEY.exec(line))
    .filter(Boolean)
    .map((match) => match[1]);

module.exports = {
  rules: [
    {
      id: 'issue-referenced',
      description: 'The PR description references an issue or PR.',
      run({ pr, isBot, warn }) {
        const body = withoutCode(pr.body);
        const referenced = /(^|[\s(])([\w.-]+\/[\w.-]+)?#\d+\b/.test(body) || /github\.com\/[^/\s]+\/[^/\s]+\/(issues|pull)\/\d+/.test(body);
        if (!isBot && !referenced) {
          warn('No related issue or PR is referenced in the description, for example `Closes #123`.');
        }
      },
    },
    {
      id: 'checklist-completed',
      description: 'All items of the Checklist in the PR description are ticked.',
      run({ pr, isBot, fail }) {
        if (isBot) return;

        const section = /<summary>\s*<b>Checklist<\/b>\s*<\/summary>([\s\S]*?)<\/details>/i.exec(pr.body || '');
        if (!section) {
          fail('The PR description does not contain the Checklist of the pull request template.');
          return;
        }

        const unticked = [...section[1].matchAll(/^\s*[-*] \[ \] (.+)$/gm)].map((match) => match[1].trim());
        if (unticked.length) {
          fail(`Tick all items of the Checklist, also the ones that do not apply. Not ticked:\n${unticked.map((item) => `- ${item}`).join('\n')}`);
        }
      },
    },
    {
      id: 'tests-updated',
      description: 'Changed configurations come with updated tests.',
      run({ files, warn }) {
        const configurationChanged = files.all.some((file) => file.startsWith('src/main/configurations/'));
        const testsChanged = files.all.some((file) => file.startsWith('src/test/'));
        if (configurationChanged && !testsChanged) {
          warn('A configuration is changed but no tests are. Are Larva and end-to-end tests added or updated?');
        }
      },
    },
    {
      id: 'docs-updated',
      description: 'Changed configurations come with updated documentation.',
      run({ files, warn }) {
        const configurationChanged = files.all.some((file) => file.startsWith('src/main/configurations/'));
        const docsChanged = files.all.some((file) => file.startsWith('docusaurus/docs/') || file.endsWith('.md'));
        if (configurationChanged && !docsChanged) {
          warn('A configuration is changed but no documentation is. Is the documentation up to date?');
        }
      },
    },
    {
      id: 'properties',
      description: 'New properties are camelCase, and removed properties are marked as breaking change.',
      async run({ danger, files, commits, title, warn }) {
        const breaking = title.breaking || commits.some((commit) => commit.parsed.breaking);

        for (const file of [...files.created, ...files.modified].filter(isPropertiesFile)) {
          const diff = await danger.git.diffForFile(file);
          if (!diff) continue;

          const added = propertyKeys(diff.added);
          const removed = propertyKeys(diff.removed).filter((key) => !added.includes(key));
          for (const key of added.filter((key) => !CAMEL_CASE_KEY.test(key))) {
            warn(`Property \`${key}\` in \`${file}\` is not camelCase.`);
          }
          if (removed.length && !breaking) {
            warn(`Properties ${removed.map((key) => `\`${key}\``).join(', ')} are removed or renamed in \`${file}\`. Mark the commit as breaking with \`!\` and a \`BREAKING: <description>\` footer, or restore backwards compatibility.`);
          }
        }
      },
    },
    {
      id: 'target-branch',
      description: 'Breaking changes target the next-major release channel, not next.',
      run({ pr, commits, title, fail, warn }) {
        const base = pr.base.ref;
        const breaking = title.breaking || commits.some((commit) => commit.parsed.breaking);

        if (base === 'next' && breaking) {
          fail('Breaking changes must target `next-major`, not `next`.');
        } else if (!BASE_BRANCHES.test(base)) {
          warn(`The PR targets \`${base}\`, which is not \`main\` or a release channel (\`next\`, \`next-major\`).`);
        }
      },
    },
  ],
};
