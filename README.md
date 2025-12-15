# SergipetecFront

Frontend application built with **Angular**, using a **mocked API with json-server** and **end-to-end tests with Cypress**.

---

## 🚀 Installation

First, install the project dependencies:

```bash
npm install --legacy-peer-deps
```

---

## 🖥️ Running the Application (Frontend)

To start the Angular application:

```bash
npm start
```

The application will be available at:

```
http://localhost:4200
```

---

## 🔌 Running the Mock API

This project uses **json-server** to mock the backend API.

From the **project root directory**, run:

```bash
npx json-server db.json --port 3000
```

The mock API will be available at:

```
http://localhost:3000
```

---

## 🧪 Running End-to-End Tests (Cypress)

This project uses **Cypress** for end-to-end testing.

### Steps to run E2E tests:

1. Start the frontend application:

   ```bash
   npm start
   ```

2. In another terminal, run Cypress:

   ```bash
   npm run e2e
   ```

Cypress will execute the automated tests against the running application.

---

## 📚 Tech Stack

- **TypeScript**
- **Angular** (Angular CLI 20.3.13)
- **PrimeNG** (UI Component Library)
- **PrimeIcons**
- **json-server** (Mock API)
- **Cypress** (End-to-End Testing)
- **ESLint** (code quality, import ordering and best practices)
- **TypeScript Path Aliases (tsconfig paths)**

---

## 🔗 Additional Resources

- Angular CLI Documentation: [https://angular.dev/tools/cli](https://angular.dev/tools/cli)
- Cypress Documentation: [https://docs.cypress.io](https://docs.cypress.io)
- json-server Documentation: [https://github.com/typicode/json-server](https://github.com/typicode/json-server)
