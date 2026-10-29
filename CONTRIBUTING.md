# Deliverables

This project builds the following artifacts:
* A docker image that can be used to run this application stand-alone.

# Project Structure

## Drivers
Drivers needed for jdbc/jms connection can be added to `./src/main/drivers` and will become part of the built image under `/opt/frank/drivers`.

For drivers that are only needed for local development or CI/CD, it is recommended to instead place the driver in the `./contrib` folder somewhere and mount the driver
in the Docker Compose file. For example:
```yaml
services:
  frank:
    volumes:
      - ./contrib/activemq/drivers/activemq-all-6.2.0.jar:/opt/frank/drivers/activemq-all-6.2.0.jar
```

# Development
## Local development with Docker Compose
Docker Compose file `compose.frank.loc.yaml` brings up an instance for local development.

It is recommended to a 'sync+restart' watch action for each configuration's 'DeploymentSpecifics' files.
This ensures that the container is automatically restarted when a change is made in it. Additionally,
it is recommended to set the 'classLoaderType' to 'ScanningDirectoryClassLoader', so that the Frank!Framework
automatically reloads the configuration when changes are made to it.

To use this Docker Compose file:
```
docker compose -f ./compose.frank.loc.yaml up --build --force-recreate --watch
```
Arguments:
- `--build` - Builds a new image from your local source.
- `--force-recreate` - Eventhough you built a new image, by default Docker reuses the already existing container. This forces Docker to recreate the container, which will then use your newly built image to build the new container from.
- `--watch` - Use the Docker Watch functionality to automatically sync, restart or rebuild the container when certain files in your local source change. Which files/folders trigger what action can be found in the Docker Compose file under the `frank` service, in the `develop.watch` section.

Access the Frank!Console by navigating to `http://frank.localtest.me:8080` or`http://localhost:8080/`.

### Frank!Flow
Frank!Flow is included to provide a visual representation of the integration's flow. It allows users to visually configure
adapters by dragging and connecting components in a graphical environment, rather than directly editing XML code. This makes
the Frank!Framework more accessible, especially for users who are less familiar with XML.

Access Frank!Flow by navigating to `http://frank-flow.localtest.me:8080` or`http://localhost:8080/`.

## Local Development Docusaurus
1. Navigate to "docusaurus" subfolder.
    ```
    cd ./docusaurus
    ```

2. Install dependencies.
    ```
    npm install
    ```

3. Serve Docusaurus webserver locally.
    ```
    ./node_modules/.bin/docusaurus.cmd start
    ```
    By default it is served at `http://localhost:3000/`.

4. Basic guide on how to use Docusaurus and a styleguide can be found at `./docusaurus/docs/_README.md`.

# Dependencies
## Update Docusaurus dependencies
1. Navigate to the 'docusaurus' subfolder:
    ```
    cd ./docusaurus
    ```
2. Update dependencies:
    ```
    npm i @docusaurus/core@latest @docusaurus/preset-classic@latest @docusaurus/theme-mermaid@latest @docusaurus/module-type-aliases@latest @docusaurus/tsconfig@latest @docusaurus/types@latest
    ```
## Merge changes from 'Skeleton' project template
The 'Skeleton' project template repository will always stay up-to-date with the latest developments and best practices. It is recommended to merge changes from the Skeleton repo every one or two months.
Otherwise projects will over time become less and less compatible with the Skeleton project. This leads to extra troubleshooting work, because usually the issues you might run into are already fixed in the
Skeleton repo. Additionally, the Skeleton repo ia regularly expanded with new tools and features to make development and maintenance easier and faster.

To merge changes from the Skeleton repo, the Skeleton repo needs to be added as an upstream. Because of the way GitHub template repositories work, the project's Git history is not related to the Skeleton repo's
Git history. Because of this, it is needed to merge with the `--allow-unrelated-histories` argument. Unfortunatly this creates very ugly and hard to resolve merge conflicts, because Git can't use the commit history
to diff properly. To resolve this, it is recommended to do a rebase once instead of a merge. This will apply every single commit in the project repo on top of the Skeleton repo's Git history. After a rebase, future
merging should be as easy as merging simple PR, as for Git the project repo is now effectively a fork of the Skeleton repo with a shared Git History.

1. Add the Skeleton repo as upstream.
    ```
    git remote add upstream https://github.com/wearefrank/skeleton.git
    ```
1. Fetch from upstream.
    ```
    git fetch upstream
    ```
1. Create and switch to new branch.
    ```
    git checkout -b <branchname-for-upstream-changes>
    ```
1. Merge from upstream.
    ```
    git merge upstream/main --allow-unrelated-histories
    ```
1. Stage and commit changes.
    ```
    git add .
    git commit -m "<commit message>"
    ```
1. Create Pull Request.


# CI/CD

We use conventional commits, see https://www.conventionalcommits.org/en/v1.0.0/. Releases are created automatically by GitHub Actions, see [.github/workflows/ci.yml](.github/workflows/ci.yml) and [.github/workflows/release.yml](.github/workflows/release.yml).

Please take care to write meaningful commit messages that result in meaningful entries in [CHANGELOG.md](CHANGELOG.md). Here is an example of the commit message for a breaking change:

    chore: example of a chore that breaks

    BREAKING: This is what breaks

This commit message appears as follows in the release notes:

![changeLogScreenshot.jpg](./changeLogScreenshot.jpg)

A breaking change means that this version is not backwards compatible with the previous release. A breaking change should result in a major release (first number of semantic version is incremented). Please note the following:

* The word BREAKING should appear on the last line of the commit message.
* The word BREAKING is followed by a `:` and a description. This description appears in the release notes in a bullet that explains what is breaking.
* The commit type (e.g. chore) is still relevant for breaking changes. This information appears in the release notes in the same way as a non-breaking change.
* For non-breaking changes, omit the line with BREAKING and make a commit message like the first line shown.

## Release channels and maintenance releases

Releases are normally made from `main`. Two other kinds of branches can publish releases as well. A branch only releases if it has exactly one of the names below.

| Branch name | Use it for | Example version | Docker tags |
| --- | --- | --- | --- |
| `main` | Regular releases | `2.1.0` | `2.1.0`, `2.1`, `2`, `latest` |
| `next-major` | Collecting breaking changes for the next major version | `3.0.0-next-major.1` | `3.0.0-next-major.1`, `next-major` |
| `next` | Collecting new features for the next minor version | `2.2.0-next.1` | `2.2.0-next.1`, `next` |
| `1.x` or `1.4.x` | Fixing an older version after `main` has moved on | `1.4.1` | `1.4.1`, `1.4`, `1`, and the branch name (`1.4.x`). Never `latest` |

### Release channels (`next-major` and `next`)

**Why:** A breaking change on `main` releases a new major version immediately. That is not always what you want:
* Several breaking changes that belong together, or one breaking change that is built up over multiple PRs, should reach users as a single release.
* Small breaking changes, such as renaming a property or a file, are not worth a major version on their own. Collect them on `next-major` until there is enough reason to release a new major.
* A breaking change may need testing by early adopters before everybody gets it.

On a channel branch every release is a pre-release. `latest` and tags like `3` do not move, so nobody gets the changes by accident. Users who want to try them can pin the exact version (`3.0.0-next-major.1`) or follow the `next-major` tag, which always points to the latest pre-release. Each new release on the branch increments the last number (`.2`, `.3`, ...). `next` works the same way for features that should not be released yet.

**How:**
1. Create the branch from `main` and push it:
    ```
    git switch main
    git pull
    git switch -c next-major
    git push -u origin next-major
    ```
1. Open pull requests that target `next-major` instead of `main`. A `feat:` or `fix:` commit creates a new pre-release, a `chore:` commit does not.
1. Merge `main` into `next-major` regularly, so the branch does not drift away:
    ```
    git switch next-major
    git pull
    git merge main
    git push
    ```
    > [!WARNING]
    > Always **merge** `main` into `next-major`. Never rebase it and never force-push it. Release tags and release commits (`CHANGELOG.md`, `BuildInfo`) live on this branch, and rewriting its history breaks them. This applies to every release branch (`next`, `next-major` and the maintenance branches).
1. When there is sufficient reason for a new major, open a pull request from `next-major` to `main`. Merge it with a merge commit, not a squash, so the original commit messages (including `BREAKING:`) are preserved. `main` then releases the major version (e.g. `3.0.0`) and updates `latest`.

### Maintenance releases (`1.x` and `1.4.x`)

**Why:** `main` has moved on to `2.x`, but some users are still on `1.x` and need a fix. Releasing it from `main` would force them to take all the changes of version 2. A fix on a maintenance branch releases a patch for the old version only (`1.4.1`) and does not touch `main` or `latest`.

The branch name determines what it may release:
* `1.4.x` allows fixes only: `1.4.1`, `1.4.2`, ...
* `1.x` also allows new features: `1.5.0`, `1.6.0`, ...

**How:**
1. Find the latest tag of the old version:
    ```
    git fetch --tags
    git tag --list "v1.*" --sort=-v:refname
    ```
1. Create the branch from that tag and push it. This is only needed once per old version:
    ```
    git switch -c 1.4.x v1.4.0
    git push -u origin 1.4.x
    ```
1. Open a pull request with a `fix:` commit that targets `1.4.x`. After merging, `1.4.1` is released.
1. Apply the same fix to `main` (e.g. `git cherry-pick <commit hash>`) if the bug exists there too.

A breaking change (`BREAKING:`) on a maintenance branch fails the release, because it would require a major version outside the branch's range. Put it on `main` or `next-major` instead.

# Checklist for testing CI/CD

Here is a checklist for testing the CI/CD.

* Testing goes best when you make hot fixes on the main branch. Check with the team that you are allowed to do this.
* Do a commit on main that has a commit message starting with `fix:`. The following should happen:
  * The pipeline succeeds - this checks all authorizations are in place.
  * A commit with a message starting with `chore:` has been added automatically.
  * The extra commit updates files `src/main/resources/BuildInfo.properties`, `configurations/{{ cookiecutter.configuration_name }}/BuildInfo.properties`, `publiccode.yaml` and `CHANGELOG.md`.
  * These files should have trustworthy contents - speaks for itself.
  * On GitHub, there is a tag for the new version that starts with `v`. For example if the new release is `3.2.1` then the tag should be `v3.2.1`. You can get this tag using `git fetch origin` on the command line.
  * The docker image for the release has been created on http://www.dockerhub.com. The `latest` tag should have been updated - creation time should be the current time. Depending on the type of release, the `3.2.1`, the `3.2` or the `3` tags should be the current date.
  * Check on dockerhub that tags that should not have been updated do not have the current time as creation time.
  * Run the docker image using `docker run -p 8080:8080 wearefrank/{{ cookiecutter.instance_name_lc }}:3.2.1`. Check the name of the docker container you started using `docker ps -a`. Login to the docker container using `docker exec -it <container name> bash`. Check that `/opt/frank/resources/BuildInfo.properties` and `/opt/frank/configurations/{{ cookiecutter.configuration_name }}/BuildInfo.properties` contain the right version and the right date.
* Check a breaking change like above. This should update the major version.
* Do a commit with \[skip ci\] in the commit message. It should not make a release and it should not push a docker image.
* Make a pull request. Check that no release is made and that no docker image is pushed.
