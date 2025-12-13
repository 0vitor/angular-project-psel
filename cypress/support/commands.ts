/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      mockarBuscarFuncionarios(employees?: any[]): Chainable<void>;
      mockarFiltrarFuncionarios(employees?: any[]): Chainable<void>;
      mockarErroFuncionarios(): Chainable<void>;
      mockarCriarFuncionario(employee: any): Chainable<void>;
      mockarEditarFuncionario(id: string | number, employee: any): Chainable<void>;
      mockarDeletarFuncionario(id: string | number): Chainable<void>;
    }
  }
}

export {};

Cypress.Commands.add('mockarFiltrarFuncionarios', (employees = []) => {
  cy.intercept('GET', 'http://localhost:3000/employees?*', {
    statusCode: 200,
    body: employees,
  }).as('searchEmployees');
});

Cypress.Commands.add('mockarBuscarFuncionarios', (employees = []) => {
  cy.intercept('GET', 'http://localhost:3000/employees', {
    statusCode: 200,
    body: employees,
  }).as('getEmployees');
});

// Mock para erro na listagem
Cypress.Commands.add('mockarErroFuncionarios', () => {
  cy.intercept('GET', 'http://localhost:3000/employees*', {
    statusCode: 500,
    body: { message: 'Internal Server Error' },
  }).as('getEmployeesError');
});

// Mock para criar funcionário
Cypress.Commands.add('mockarCriarFuncionario', (employee) => {
  cy.intercept('POST', 'http://localhost:3000/employees', {
    statusCode: 201,
    body: employee,
  }).as('createEmployee');
});

// Mock para editar funcionário
Cypress.Commands.add('mockarEditarFuncionario', (id, employee) => {
  cy.intercept('GET', `http://localhost:3000/employees/${id}`, {
    statusCode: 200,
    body: employee,
  }).as('getEmployee');

  cy.intercept('PUT', `http://localhost:3000/employees/${id}`, {
    statusCode: 200,
    body: employee,
  }).as('updateEmployee');
});

// Mock para deletar funcionário
Cypress.Commands.add('mockarDeletarFuncionario', (id) => {
  cy.intercept('DELETE', `http://localhost:3000/employees/${id}`, {
    statusCode: 200,
  }).as('deleteEmployee');
});
