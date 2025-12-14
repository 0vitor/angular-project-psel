/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      mockListEmployees(fixtureFile?: string): Chainable<void>;
      mockSearchEmployees(fixtureFile?: string): Chainable<void>;
      mockErrorEmployees(): Chainable<void>;
      mockCreateEmployee(fixtureFile: string): Chainable<void>;
      mockUpdateEmployee(id: string | number, fixtureFile: string): Chainable<void>;
      mockDeleteEmployee(id: string | number): Chainable<void>;
      mockEmptyEmployee(): Chainable<void>;
    }
  }
}

export {};

// Buscar funcionários
Cypress.Commands.add('mockListEmployees', (fixtureFile = 'employees.json') => {
  cy.fixture(fixtureFile).then((employees) => {
    cy.intercept('GET', 'http://localhost:3000/employees', {
      statusCode: 200,
      body: employees,
    }).as('getEmployees');
  });
});

// Filtrar funcionários
Cypress.Commands.add('mockSearchEmployees', (fixtureFile = 'employees-filtered.json') => {
  cy.fixture(fixtureFile).then((employees) => {
    cy.intercept('GET', 'http://localhost:3000/employees?*', {
      statusCode: 200,
      body: employees,
    }).as('searchEmployees');
  });
});

// Empty funcionários
Cypress.Commands.add('mockEmptyEmployees', () => {
  cy.intercept('GET', 'http://localhost:3000/employees?*', {
    statusCode: 200,
    body: [],
  }).as('emptyEmployees');
});

// Mock de erro
Cypress.Commands.add('mockErrorEmployees', () => {
  cy.intercept('GET', 'http://localhost:3000/employees*', {
    statusCode: 500,
    body: { message: 'Internal Server Error' },
  }).as('getEmployeesError');
});

// Criar funcionário
Cypress.Commands.add('mockCreateEmployee', () => {
  cy.intercept('POST', 'http://localhost:3000/employees', {
    statusCode: 201,
  }).as('createEmployee');
});

// Editar funcionário
Cypress.Commands.add('mockUpdateEmployee', (fixtureFile = 'employees.json') => {
  cy.fixture(fixtureFile).then((employee) => {
    cy.intercept('PUT', `http://localhost:3000/employees/1`, {
      statusCode: 200,
    }).as('updateEmployee');

    cy.intercept('GET', `http://localhost:3000/employees/1`, {
      statusCode: 200,
      body: employee[0],
    }).as('getOneEmployee');
  });
});

// Deletar funcionário
Cypress.Commands.add('mockDeleteEmployee', (id, fixtureFile = 'employee-deleted.json') => {
  cy.fixture(fixtureFile).then((employees) => {
    cy.intercept('DELETE', `http://localhost:3000/employees/${id}`, {
      statusCode: 200,
    }).as('deleteEmployee');
  });
});
