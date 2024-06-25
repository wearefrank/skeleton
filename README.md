# {{ cookiecutter.instance_name }}

Project for Frank applications deployed by JAR or Docker

<!-- TOC -->
* [Skeleton Project for Frank applications deployed by JAR or Docker](#skeleton-project-for-frank-applications-deployed-by-jar-or-docker)
  * [Introduction](#introduction)
  * [Included](#included)
  * [Usage](#usage)
    * [Steps](#steps)
    * [Template variables](#template-variables)
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
2. Clone the newly created project
3. Fill in the skeletonrc.json to replace the template strings
4. Run the skeleton.js script with node e.g. `node ./skeleton.js`
5. Add your own configuration files
6. Make sure that the GitHub action credentials are added
7. Commit & Profit!

### Configure Docusaurus GitHub Pages deployment
1. Navigate to `GitHub -> Repository -> Pages -> Build and deployment` and select `GitHub Actions` from the **source** dropdown.
2. Navigate to `GitHub -> Repository -> Environments` and create a **New Environment** called `github-pages` if it does not exist yet.
3. Enable the "docusaurus-release" job in `.github/workflows/release.yml` by setting "if" to `true`.

## Local Development Docusaurus
1. Navigate to "docusaurus" subfolder with `cd ./docusaurus`.
2. Install dependencies with `npm install`.
3. Serve Docusaurus webserver locally with `docusaurus start`. By default it is served at `http://localhost:3000/`.
4. Basic guide on how to use Docusaurus and a styleguide can be found at `./docusaurus/docs/_README.md`.

#### Update Docusaurus dependencies
1. Navigate to "docusaurus" subfolder with `cd ./docusaurus`.
2. Update dependencies with `npm i @docusaurus/core@latest @docusaurus/preset-classic@latest @docusaurus/module-type-aliases@latest @docusaurus/tsconfig@latest @docusaurus/types@latest`

## Template variables

| Template variable             | Description                                                                                    | Example        |
|-------------------------------|------------------------------------------------------------------------------------------------|----------------|
| `{{ cookiecutter.instance_name }}`            | The name of the Frank! to be deployed. It's best to keep this inline with the name of the repo | Frank2Skeleton |
| `{{ cookiecutter.instance_name_lc }}`         | Lowercase version of the instance name.                                                        | frank2example  |
| `{{ cookiecutter.configuration_name }}`       | The name of the first configuration (others have to be added manually)                         | Sans           |
