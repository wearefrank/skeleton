# {{ cookiecutter.instance_name }}

Project for Frank applications deployed by Docker

<!-- TOC -->
- [{{ cookiecutter.instance\_name }}](#-cookiecutterinstance_name-)
  - [Introduction](#introduction)
  - [Included](#included)
  - [Usage](#usage)
    - [Steps](#steps)
    - [Configure Docusaurus GitHub Pages deployment](#configure-docusaurus-github-pages-deployment)
  - [Template variables](#template-variables)
<!-- TOC -->

## Introduction
This project serves as a starting point for new projects or as example for existing ones.
This "empty" Frank! will have configuration files to build and deploy.
 
## Included
* Dockerfile
* Docker compose
* Publicode (WIP)
* GitHub Actions
  * Continuous Integration workflow
  * Release workflow

Please check if you deem all these functionalities necessary, if not remove them.

## Usage

### Steps

1. Create a new repository and choose this as template repository
1. Clone the newly created project
1. Fill in the skeletonrc.json to replace the template strings
1. Run the skeleton.js script with node e.g. `node ./skeleton.js`
1. Add your own configuration files
2. Make sure that a [PAT](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-personal-access-token-classic) is configured for the repository. For public repositories within the WeAreFrank organization, this secret is often provided as organization secret. For private or external repositories the secret needs to be added manually. By default the CI/CD workflows expect the PAT to be available under the secret name 'WEAREFRANK_BOT_PAT'. If the PAT is made available under a different secret name, a find/replace can be done in the '.github/workflows' folder, replacing `WEAREFRANK_BOT_PAT` with `<your-secret-name>`.
3. Commit & Profit!

### Configure Docusaurus GitHub Pages deployment
1. Navigate to `GitHub -> Repository -> Pages -> Build and deployment` and select `GitHub Actions` from the **source** dropdown.
2. Navigate to `GitHub -> Repository -> Environments` and create a **New Environment** called `github-pages` if it does not exist yet.
3. Enable the "docusaurus-release" job in `.github/workflows/release.yml` by setting "if" to `true`.

## Template variables

| Template variable             | Description                                                                                    | Example        |
|-------------------------------|------------------------------------------------------------------------------------------------|----------------|
| `{{ cookiecutter.instance_name }}`            | The name of the Frank! to be deployed. It's best to keep this inline with the name of the repo | Frank2Skeleton |
| `{{ cookiecutter.instance_name_lc }}`         | Lowercase version of the instance name.                                                        | frank2skeleton |
| `{{ cookiecutter.configuration_name }}`       | The name of the first configuration (others have to be added manually)                         | frank2example  |
