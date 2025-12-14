/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      mockarBuscarFuncionarios(fixtureFile?: string): Chainable<void>;
      mockarFiltrarFuncionarios(fixtureFile?: string): Chainable<void>;
      mockarErroFuncionarios(): Chainable<void>;
      mockarCriarFuncionario(fixtureFile: string): Chainable<void>;
      mockarEditarFuncionario(id: string | number, fixtureFile: string): Chainable<void>;
      mockarDeletarFuncionario(id: string | number): Chainable<void>;
    }
  }
}

export {};

// Buscar funcionários
Cypress.Commands.add('mockarBuscarFuncionarios', (fixtureFile = 'employees.json') => {
  cy.fixture(fixtureFile).then((employees) => {
    cy.intercept('GET', 'http://localhost:3000/employees', {
      statusCode: 200,
      body: employees,
    }).as('getEmployees');
  });
});

// Filtrar funcionários
Cypress.Commands.add('mockarFiltrarFuncionarios', (fixtureFile = 'employees-filtered.json') => {
  cy.fixture(fixtureFile).then((employees) => {
    cy.intercept('GET', 'http://localhost:3000/employees?*', {
      statusCode: 200,
      body: employees,
    }).as('searchEmployees');
  });
});

// Empty funcionários
Cypress.Commands.add('mockarNenhumFuncionarios', (fixtureFile = 'employees-empty.json') => {
  cy.fixture(fixtureFile).then((employees) => {
    cy.intercept('GET', 'http://localhost:3000/employees?*', {
      statusCode: 200,
      body: employees,
    }).as('searchEmployees');
  });
});

// Mock de erro
Cypress.Commands.add('mockarErroFuncionarios', () => {
  cy.intercept('GET', 'http://localhost:3000/employees*', {
    statusCode: 500,
    body: { message: 'Internal Server Error' },
  }).as('getEmployeesError');
});

// Criar funcionário
Cypress.Commands.add('mockarCriarFuncionario', (fixtureFile) => {
  cy.fixture(fixtureFile).then((employee) => {
    cy.intercept('POST', 'http://localhost:3000/employees', {
      statusCode: 201,
      body: employee,
    }).as('createEmployee');
  });
});

// Editar funcionário
Cypress.Commands.add('mockarEditarFuncionario', (fixtureFile = 'employees.json') => {
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
Cypress.Commands.add('mockarDeletarFuncionario', (id, fixtureFile = 'employee-deleted.json') => {
  cy.fixture(fixtureFile).then((employees) => {
    cy.intercept('DELETE', `http://localhost:3000/employees/${id}`, {
      statusCode: 200,
    }).as('deleteEmployee');
  });
});
