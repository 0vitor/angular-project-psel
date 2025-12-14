describe('Employees CRUD (mocked)', () => {
  const baseUrl = 'http://localhost:4200';
  let employees: any[];
  beforeEach(() => {
    cy.fixture('employees.json')
      .as('employees')
      .then((employeesJ) => {
        employees = employeesJ;
      });
  });

  it('should list employees', () => {
    cy.mockListEmployees();
    cy.visit(baseUrl);
    cy.wait('@getEmployees');

    employees.forEach((employee: any) => {
      cy.contains(employee.name).should('be.visible');
      cy.contains(employee.role).should('be.visible');
    });
  });

  it('should search employee by name', () => {
    cy.mockListEmployees();
    cy.visit(baseUrl);
    cy.mockSearchEmployees();

    cy.get('input').type(employees[0].name);
    cy.contains('Buscar').click();

    cy.wait('@searchEmployees');

    cy.contains(employees[0].name).should('be.visible');
    cy.contains(employees[1].name).should('not.exist');
  });

  it('should create a new employee and show success toast', () => {
    cy.mockListEmployees();
    cy.mockCreateEmployee();

    cy.visit(baseUrl);
    cy.wait('@getEmployees');

    cy.contains('Novo Funcionário').click();

    cy.get('input[formcontrolname="name"]').type('Carla Mendes');
    cy.get('input[formcontrolname="role"]').type('Designer');
    cy.get('input[formcontrolname="email"]').type('Carla@gmail.com');

    cy.contains('button', 'Salvar').should('not.be.disabled').click();
    cy.wait('@createEmployee');

    cy.contains('Funcionário criado com sucesso').should('be.visible');
  });

  it('should show empty state when search returns no results', () => {
    cy.mockListEmployees();
    cy.visit(baseUrl);
    cy.mockEmptyEmployees();

    cy.get('input').type('Inexistente');
    cy.contains('Buscar').click();
    cy.wait('@emptyEmployees');

    cy.contains('Nenhum funcionário encontrado').should('be.visible');
  });

  it('should delete an employee and show success toast', () => {
    cy.mockListEmployees();
    cy.mockDeleteEmployee(1);

    cy.visit(baseUrl);
    cy.wait('@getEmployees');

    cy.contains('Excluir').first().click();
    cy.get('button').contains('Deletar').click();

    cy.wait('@deleteEmployee');

    cy.contains('Funcionário removido com sucesso').should('be.visible');
    cy.contains(employees[0].name).should('not.exist');
  });

  it('should edit an employee and show success toast', () => {
    cy.mockListEmployees();
    cy.visit(baseUrl);
    cy.wait('@getEmployees');

    cy.mockUpdateEmployee();
    cy.get('button').contains('Editar').first().click();

    cy.wait('@getOneEmployee');
    const { name, role, email } = employees[0];

    cy.get('input[formcontrolname="name"]').should('have.value', name);
    cy.get('input[formcontrolname="role"]').should('have.value', role);
    cy.get('input[formcontrolname="email"]').should('have.value', email);

    cy.get('input[formcontrolname="name"]').clear().type('Alice Silva Editada');
    cy.get('input[formcontrolname="role"]').clear().type('Senior Developer').as('roleInput');
    cy.contains('button', 'Salvar').should('not.be.disabled').click();
    cy.wait('@updateEmployee');

    cy.contains('Funcionário atualizado com sucesso').should('be.visible');
  });

  it('should show friendly error message when API fails', () => {
    cy.mockErrorEmployees();
    cy.visit(baseUrl);

    cy.wait('@getEmployeesError');

    cy.contains('Erro ao carregar funcionários').should('be.visible');
  });
});
