# Tesko Frontend (Angular 20)

This is the Angular 20 SPA for Tesko, a Test Data Management System. It provides a modern, responsive interface for managing telecom test assets with real-time updates.

## Features
- **Authentication:** JWT-based login with role-based access control
- **Dashboard:** Real-time metrics and charts for asset management
- **User Management:** Admin interface for CRUD operations on users
- **Asset Management:** Inventory tracking with create/edit/delete functionality
- **Request System:** Submit and approve asset requests with SignalR notifications
- **Responsive Design:** Bootstrap 5 with modern sidebar navigation
- **Real-Time Updates:** Live notifications and dashboard updates via SignalR

## Prerequisites
- Node.js 18.x or 20.x LTS (recommended)
- npm 9.x or 10.x
- .NET 10 SDK (for backend API)

## Setup & Run

### Development Mode (Recommended)
1. **Install dependencies:**
   ```bash
   npm ci
   ```

2. **Start the Angular dev server:**
   ```bash
   npm start
   ```
   The app will run at `http://localhost:4200` and proxy API calls to `http://localhost:5283`.

3. **Start the backend API:**
   ```bash
   cd ../Tesko
   dotnet run
   ```

### Production Build
```bash
npm run build
```
Copy the `dist/tesko-frontend` folder to the backend's `wwwroot` and configure ASP.NET Core to serve static files.

## Architecture
- **Standalone Components:** Modern Angular 20 architecture with no NgModules
- **Reactive Signals:** State management using Angular signals
- **Services:** HttpClient-based services for API communication
- **Routing:** Lazy-loaded feature modules
- **Proxy Configuration:** Development proxy for seamless API integration

## Migration/Upgrade Notes
See `MIGRATE-ANGULAR-20.md` for full migration steps, troubleshooting, and rollback guidance.

## SignalR Integration
Connects to `/hubs/dashboard` for real-time updates on requests and notifications.

## Node Version Pinning
This project recommends Node >=18 <23. You can add this to `package.json`:
```json
"engines": { "node": ">=18 <23" }
```

---
Last updated: 2025-11-27
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
