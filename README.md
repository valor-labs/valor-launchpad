# ValorLaunchpad

## Purpose

The current state of this repo is a proof of concept around creating a seed project to launch new projects to success in
a more rapid manner. That is how the name, Valor Launchpad came to be.

## Stack

The stack used for this project is as follows.

* Angular 11
* NestJS 7
* TypeORM 0.2.32
* MySQL 8.0.23
* Redis 6.2.3

## Setup

1) Make sure you have Redis and MySQL installed. MySQL credentials for local is in the .env file
1) run the `npm run seed:run` command to scaffold the seed database with its structure and default data
1) run the server with `npm run start:server`
1) run the client with `npm run start`
1) navigate to `http://localhost:4200/sign-in` and sign in with the credentials in the placeholder

## Feature List
The features for our initial admin panel were based on the [Appstack template](https://appstack.bootlab.io/dashboard-default.html) by [Bootlab](https://bootlab.io/). 
After the template was purchased, it was used for the raw HTML and SCSS. From there it was converted to Angular and rebranded.

| Feature                  | HTML Generated                    | Converted to Angular              | Data via Server                   | Seed Created                      | Tests Added               | Extracted to Lib          | Polished                  |
|--------------------------|-----------------------------------|-----------------------------------|-----------------------------------|-----------------------------------|---------------------------|---------------------------|---------------------------|
| Blank                    | <input type="checkbox" checked /> | <input type="checkbox" checked /> | N/A                               | N/A                               | <input type="checkbox" /> | <input type="checkbox" /> | <input type="checkbox" /> |
| Sign In                  | <input type="checkbox" checked /> | <input type="checkbox" checked /> | <input type="checkbox" checked /> | N/A                               | <input type="checkbox" /> | <input type="checkbox" /> | <input type="checkbox" /> |
| Sign Up                  | <input type="checkbox" checked /> | <input type="checkbox" checked /> | <input type="checkbox" checked /> | N/A                               | <input type="checkbox" /> | <input type="checkbox" /> | <input type="checkbox" /> |
| Calendar                 | <input type="checkbox" />         | <input type="checkbox" />         | <input type="checkbox" />         | <input type="checkbox" />         | <input type="checkbox" /> | <input type="checkbox" /> | <input type="checkbox" /> |
| Charts-apexcharts        | <input type="checkbox" />         | <input type="checkbox" />         | <input type="checkbox" />         | <input type="checkbox" />         | <input type="checkbox" /> | <input type="checkbox" /> | <input type="checkbox" /> |
| Charts-chartjs           | <input type="checkbox" />         | <input type="checkbox" />         | <input type="checkbox" />         | <input type="checkbox" />         | <input type="checkbox" /> | <input type="checkbox" /> | <input type="checkbox" /> |
| Chat                     | <input type="checkbox" checked /> | <input type="checkbox" />         | <input type="checkbox" />         | <input type="checkbox" />         | <input type="checkbox" /> | <input type="checkbox" /> | <input type="checkbox" /> |
| Clients                  | <input type="checkbox" checked /> | <input type="checkbox" checked /> | <input type="checkbox" />         | <input type="checkbox" />         | <input type="checkbox" /> | <input type="checkbox" /> | <input type="checkbox" /> |
| Dashboard Analytics      | <input type="checkbox" checked /> | <input type="checkbox" checked /> | <input type="checkbox" checked /> | <input type="checkbox" checked /> | <input type="checkbox" /> | <input type="checkbox" /> | <input type="checkbox" /> |
| Dashboard Crypto         | <input type="checkbox" checked /> | <input type="checkbox" />         | <input type="checkbox" />         | <input type="checkbox" />         | <input type="checkbox" /> | <input type="checkbox" /> | <input type="checkbox" /> |
| Dashboard Default        | <input type="checkbox" checked /> | <input type="checkbox" checked /> | <input type="checkbox" checked /> | <input type="checkbox" checked /> | <input type="checkbox" /> | <input type="checkbox" /> | <input type="checkbox" /> |
| Dashboard SaaS           | <input type="checkbox" checked /> | <input type="checkbox" />         | <input type="checkbox" />         | <input type="checkbox" />         | <input type="checkbox" /> | <input type="checkbox" /> | <input type="checkbox" /> |
| Dashboard Social         | <input type="checkbox" checked /> | <input type="checkbox" />         | <input type="checkbox" />         | <input type="checkbox" />         | <input type="checkbox" /> | <input type="checkbox" /> | <input type="checkbox" /> |
| Datatables Ajax          | <input type="checkbox" />         | <input type="checkbox" />         | <input type="checkbox" />         | <input type="checkbox" />         | <input type="checkbox" /> | <input type="checkbox" /> | <input type="checkbox" /> |
| Datatables Buttons       | <input type="checkbox" />         | <input type="checkbox" />         | <input type="checkbox" />         | <input type="checkbox" />         | <input type="checkbox" /> | <input type="checkbox" /> | <input type="checkbox" /> |
| Datatables Column Search | <input type="checkbox" />         | <input type="checkbox" />         | <input type="checkbox" />         | <input type="checkbox" />         | <input type="checkbox" /> | <input type="checkbox" /> | <input type="checkbox" /> |
| Datatables Fixed Header  | <input type="checkbox" />         | <input type="checkbox" />         | <input type="checkbox" />         | <input type="checkbox" />         | <input type="checkbox" /> | <input type="checkbox" /> | <input type="checkbox" /> |
| Datatables Multi         | <input type="checkbox" />         | <input type="checkbox" />         | <input type="checkbox" />         | <input type="checkbox" />         | <input type="checkbox" /> | <input type="checkbox" /> | <input type="checkbox" /> |
| Datatables Responsive    | <input type="checkbox" />         | <input type="checkbox" />         | <input type="checkbox" />         | <input type="checkbox" />         | <input type="checkbox" /> | <input type="checkbox" /> | <input type="checkbox" /> |
| Docs Changelog           | <input type="checkbox" />         | <input type="checkbox" />         | <input type="checkbox" />         | <input type="checkbox" />         | <input type="checkbox" /> | <input type="checkbox" /> | <input type="checkbox" /> |
| Docs Customization       | <input type="checkbox" />         | <input type="checkbox" />         | <input type="checkbox" />         | <input type="checkbox" />         | <input type="checkbox" /> | <input type="checkbox" /> | <input type="checkbox" /> |
| Docs Installation        | <input type="checkbox" />         | <input type="checkbox" />         | <input type="checkbox" />         | <input type="checkbox" />         | <input type="checkbox" /> | <input type="checkbox" /> | <input type="checkbox" /> |
| Docs Introduction        | <input type="checkbox" />         | <input type="checkbox" />         | <input type="checkbox" />         | <input type="checkbox" />         | <input type="checkbox" /> | <input type="checkbox" /> | <input type="checkbox" /> |
| Docs Plugins             | <input type="checkbox" />         | <input type="checkbox" />         | <input type="checkbox" />         | <input type="checkbox" />         | <input type="checkbox" /> | <input type="checkbox" /> | <input type="checkbox" /> |
| Error Page               | <input type="checkbox" checked /> | <input type="checkbox" />         | <input type="checkbox" />         | <input type="checkbox" />         | <input type="checkbox" /> | <input type="checkbox" /> | <input type="checkbox" /> |
| Forms Advanced Inputs    | <input type="checkbox" />         | <input type="checkbox" />         | <input type="checkbox" />         | <input type="checkbox" />         | <input type="checkbox" /> | <input type="checkbox" /> | <input type="checkbox" /> |
| Forms Basic Inputs       | <input type="checkbox" checked /> | <input type="checkbox" checked /> | <input type="checkbox" />         | <input type="checkbox" />         | <input type="checkbox" /> | <input type="checkbox" /> | <input type="checkbox" /> |
| Forms Editors            | <input type="checkbox" />         | <input type="checkbox" />         | <input type="checkbox" />         | <input type="checkbox" />         | <input type="checkbox" /> | <input type="checkbox" /> | <input type="checkbox" /> |
| Forms Floating Labels    | <input type="checkbox" checked /> | <input type="checkbox" checked /> | <input type="checkbox" />         | <input type="checkbox" />         | <input type="checkbox" /> | <input type="checkbox" /> | <input type="checkbox" /> |
| Forms Input Groups       | <input type="checkbox" checked /> | <input type="checkbox" checked /> | <input type="checkbox" />         | <input type="checkbox" />         | <input type="checkbox" /> | <input type="checkbox" /> | <input type="checkbox" /> |
| Forms Layouts            | <input type="checkbox" checked /> | <input type="checkbox" checked /> | <input type="checkbox" />         | <input type="checkbox" />         | <input type="checkbox" /> | <input type="checkbox" /> | <input type="checkbox" /> |
| Forms Validation         | <input type="checkbox" />         | <input type="checkbox" />         | <input type="checkbox" />         | <input type="checkbox" />         | <input type="checkbox" /> | <input type="checkbox" /> | <input type="checkbox" /> |
| Forms Wizard             | <input type="checkbox" checked /> | <input type="checkbox" checked /> | <input type="checkbox" />         | <input type="checkbox" />         | <input type="checkbox" /> | <input type="checkbox" /> | <input type="checkbox" /> |
| Icons Font Awesome       | <input type="checkbox" checked /> | <input type="checkbox" />         | <input type="checkbox" />         | <input type="checkbox" />         | <input type="checkbox" /> | <input type="checkbox" /> | <input type="checkbox" /> |
| Invoice                  | <input type="checkbox" checked /> | <input type="checkbox" />         | <input type="checkbox" />         | <input type="checkbox" />         | <input type="checkbox" /> | <input type="checkbox" /> | <input type="checkbox" /> |
| Maps Google              | <input type="checkbox" />         | <input type="checkbox" />         | <input type="checkbox" />         | <input type="checkbox" />         | <input type="checkbox" /> | <input type="checkbox" /> | <input type="checkbox" /> |
| Maps Vector              | <input type="checkbox" />         | <input type="checkbox" />         | <input type="checkbox" />         | <input type="checkbox" />         | <input type="checkbox" /> | <input type="checkbox" /> | <input type="checkbox" /> |
| Not Found                | <input type="checkbox" checked /> | <input type="checkbox" />         | <input type="checkbox" />         | <input type="checkbox" />         | <input type="checkbox" /> | <input type="checkbox" /> | <input type="checkbox" /> |
| Notifications            | <input type="checkbox" />         | <input type="checkbox" />         | <input type="checkbox" />         | <input type="checkbox" />         | <input type="checkbox" /> | <input type="checkbox" /> | <input type="checkbox" /> |
| Payments                 | <input type="checkbox" checked /> | <input type="checkbox" checked /> | <input type="checkbox" checked /> | <input type="checkbox" />         | <input type="checkbox" /> | <input type="checkbox" /> | <input type="checkbox" /> |
| Pricing                  | <input type="checkbox" checked /> | <input type="checkbox" checked /> | <input type="checkbox" />         | <input type="checkbox" />         | <input type="checkbox" /> | <input type="checkbox" /> | <input type="checkbox" /> |
| Profile                  | <input type="checkbox" checked /> | <input type="checkbox" checked /> | <input type="checkbox" checked /> | <input type="checkbox" checked /> | <input type="checkbox" /> | <input type="checkbox" /> | <input type="checkbox" /> |
| Projects Detail          | <input type="checkbox" checked /> | <input type="checkbox" checked /> | <input type="checkbox" checked /> | <input type="checkbox" checked /> | <input type="checkbox" /> | <input type="checkbox" /> | <input type="checkbox" /> |
| Projects Listing         | <input type="checkbox" checked /> | <input type="checkbox" checked /> | <input type="checkbox" checked /> | <input type="checkbox" checked /> | <input type="checkbox" /> | <input type="checkbox" /> | <input type="checkbox" /> |
| Reset Password           | <input type="checkbox" checked /> | <input type="checkbox" />         | <input type="checkbox" />         | <input type="checkbox" />         | <input type="checkbox" /> | <input type="checkbox" /> | <input type="checkbox" /> |
| Settings                 | <input type="checkbox" checked /> | <input type="checkbox" />         | <input type="checkbox" />         | <input type="checkbox" />         | <input type="checkbox" /> | <input type="checkbox" /> | <input type="checkbox" /> |
| Tasks                    | <input type="checkbox" checked /> | <input type="checkbox" />         | <input type="checkbox" />         | <input type="checkbox" />         | <input type="checkbox" /> | <input type="checkbox" /> | <input type="checkbox" /> |
| UI Alerts                | <input type="checkbox" checked /> | <input type="checkbox" checked /> | <input type="checkbox" />         | <input type="checkbox" />         | <input type="checkbox" /> | <input type="checkbox" /> | <input type="checkbox" /> |
| UI Buttons               | <input type="checkbox" checked /> | <input type="checkbox" />         | <input type="checkbox" />         | <input type="checkbox" />         | <input type="checkbox" /> | <input type="checkbox" /> | <input type="checkbox" /> |
| UI Cards                 | <input type="checkbox" checked /> | <input type="checkbox" />         | <input type="checkbox" />         | <input type="checkbox" />         | <input type="checkbox" /> | <input type="checkbox" /> | <input type="checkbox" /> |
| UI Carousel              | <input type="checkbox" />         | <input type="checkbox" />         | <input type="checkbox" />         | <input type="checkbox" />         | <input type="checkbox" /> | <input type="checkbox" /> | <input type="checkbox" /> |
| UI Embed Video           | <input type="checkbox" />         | <input type="checkbox" />         | <input type="checkbox" />         | <input type="checkbox" />         | <input type="checkbox" /> | <input type="checkbox" /> | <input type="checkbox" /> |
| UI General               | <input type="checkbox" />         | <input type="checkbox" />         | <input type="checkbox" />         | <input type="checkbox" />         | <input type="checkbox" /> | <input type="checkbox" /> | <input type="checkbox" /> |
| UI Grid                  | <input type="checkbox" />         | <input type="checkbox" />         | <input type="checkbox" />         | <input type="checkbox" />         | <input type="checkbox" /> | <input type="checkbox" /> | <input type="checkbox" /> |
| UI Modals                | <input type="checkbox" />         | <input type="checkbox" />         | <input type="checkbox" />         | <input type="checkbox" />         | <input type="checkbox" /> | <input type="checkbox" /> | <input type="checkbox" /> |
| UI Off Canvas            | <input type="checkbox" />         | <input type="checkbox" />         | <input type="checkbox" />         | <input type="checkbox" />         | <input type="checkbox" /> | <input type="checkbox" /> | <input type="checkbox" /> |
| UI Tabs                  | <input type="checkbox" checked /> | <input type="checkbox" />         | <input type="checkbox" />         | <input type="checkbox" />         | <input type="checkbox" /> | <input type="checkbox" /> | <input type="checkbox" /> |
| UI Typography            | <input type="checkbox" checked /> | <input type="checkbox" />         | <input type="checkbox" />         | <input type="checkbox" />         | <input type="checkbox" /> | <input type="checkbox" /> | <input type="checkbox" /> |
| Verify User              | <input type="checkbox" checked /> | <input type="checkbox" checked /> | <input type="checkbox" checked /> | <input type="checkbox" />         | <input type="checkbox" /> | <input type="checkbox" /> | <input type="checkbox" /> |

## Future Features

CMS functionality emulating [Strapi](https://strapi.io/) with added multi-tenancy

## Integrations

| Integration | Created                           | Extracted to NestJS Lib           | Tests Added                       | Polished                          |
|-------------|-----------------------------------|-----------------------------------|-----------------------------------|-----------------------------------|
| Stripe      | <input type="checkbox" checked /> | <input type="checkbox" checked /> | <input type="checkbox" />         | <input type="checkbox" />         |
| Twilio      | <input type="checkbox" checked /> | <input type="checkbox" checked /> | <input type="checkbox" />         | <input type="checkbox" />         |
| Sendgrid    | <input type="checkbox" checked /> | <input type="checkbox" checked /> | <input type="checkbox" />         | <input type="checkbox" />         |
| JWT Auth    | <input type="checkbox" checked /> | <input type="checkbox" checked /> | <input type="checkbox" />         | <input type="checkbox" />         |

## Conversion methodology
1) Copy and paste raw HTML from hardcoded template files
1) Migrate page logic to Angular Components and extract hardcoded raw data to Angular Services
1) Create NestJS Controller and Services to manage hardcoded raw data
1) Create TypeORM Entities and TypeORM Seeds and Factories for generating dynamic raw data

# Boilerplate generation text

This project was generated using [Nx](https://nx.dev).

<p style="text-align: center;"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="450"></p>

🔎 **Powerful, Extensible Dev Tools**

This project requires mysql

## Quick Start & Documentation

[Nx Documentation](https://nx.dev/angular)

[10-minute video showing all Nx features](https://nx.dev/angular/getting-started/what-is-nx)

[Interactive Tutorial](https://nx.dev/angular/tutorial/01-create-application)

## Adding capabilities to your workspace

Nx supports many plugins which add capabilities for developing different types of applications and different tools.

These capabilities include generating applications, libraries, etc as well as the devtools to test, and build projects
as well.

Below are our core plugins:

- [Angular](https://angular.io)
  - `ng add @nrwl/angular`
- [React](https://reactjs.org)
  - `ng add @nrwl/react`
- Web (no framework frontends)
  - `ng add @nrwl/web`
- [Nest](https://nestjs.com)
  - `ng add @nrwl/nest`
- [Express](https://expressjs.com)
  - `ng add @nrwl/express`
- [Node](https://nodejs.org)
  - `ng add @nrwl/node`

There are also many [community plugins](https://nx.dev/nx-community) you could add.

## Generate an application

Run `ng g @nrwl/angular:app my-app` to generate an application.

> You can use any of the plugins above to generate applications as well.

When using Nx, you can create multiple applications and libraries in the same workspace.

## Generate an Angular library

Run `nx generate @nrwl/angular:lib my-lib` to generate a library.

## Generate a NestJS library

Run `nx generate @nrwl/nest:library my-lib` to generate a library.

> You can also use any of the plugins above to generate libraries as well.

Libraries are shareable across libraries and applications. They can be imported from `@valor-launchpad/mylib`.

## Development server

Run `ng serve my-app` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you
change any of the source files.

## Code scaffolding

Run `ng g component my-component --project=my-app` to generate a new component.

## Build

Run `ng build my-app` to build the project. The build artifacts will be stored in the `dist/` directory. Use
the `--prod` flag for a production build.

## Running unit tests

Run `ng test my-app` to execute the unit tests via [Jest](https://jestjs.io).

Run `nx affected:test` to execute the unit tests affected by a change.

## Running end-to-end tests

Run `ng e2e my-app` to execute the end-to-end tests via [Cypress](https://www.cypress.io).

Run `nx affected:e2e` to execute the end-to-end tests affected by a change.

## Understand your workspace

Run `nx dep-graph` to see a diagram of the dependencies of your projects.

## Further help

Visit the [Nx Documentation](https://nx.dev/angular) to learn more.

## ☁ Nx Cloud

### Computation Memoization in the Cloud

<p style="text-align: center;"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-cloud-card.png"></p>

Nx Cloud pairs with Nx in order to enable you to build and test code more rapidly, by up to 10 times. Even teams that
are new to Nx can connect to Nx Cloud and start saving time instantly.

Teams using Nx gain the advantage of building full-stack applications with their preferred framework alongside Nx’s
advanced code generation and project dependency graph, plus a unified experience for both frontend and backend
developers.

Visit [Nx Cloud](https://nx.app/) to learn more.
