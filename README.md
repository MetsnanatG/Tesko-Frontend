# Tesko Frontend (Angular 20)

This is the Angular 20 SPA for Tesko. It uses standalone components and the new build system.

## Prerequisites
- Node.js 18.x or 20.x LTS (recommended)
- npm 9.x or 10.x

## Setup & Run
```bash
npm ci        # install dependencies exactly as locked
npm start     # run the dev server (http://localhost:4200)
npm run build # create a production build
npm test      # run unit tests (if present)
```

## Migration/Upgrade Notes
See `MIGRATE-ANGULAR-20.md` for full migration steps, troubleshooting, and rollback guidance.

## SignalR
If you use SignalR in the SPA, import from `@microsoft/signalr` and connect to `/dashboardHub`.

## Node Version Pinning
This project recommends Node >=18 <23. You can add this to `package.json`:
```json
"engines": { "node": ">=18 <23" }
```

---
Last updated: 2025-11-26
# TeskoFrontend

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.3.12.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
