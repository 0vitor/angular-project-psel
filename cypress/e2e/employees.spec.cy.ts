describe('Employees CRUD (mocked)', () => {
  const baseUrl = 'http://localhost:4200';

  const employeesMock = [
    { id: 1, name: 'Alice Silva', email: 'alice@gmail.com', role: 'Developer', active: true },
    { id: 2, name: 'Bruno Roger', email: 'bruno@gmail.com', role: 'QA', active: false },
  ];

  it('should list employees', () => {
    cy.mockarBuscarFuncionarios(employeesMock);
    cy.visit(`${baseUrl}/employees`);
    cy.wait('@getEmployees');

    cy.contains('Alice Silva').should('be.visible');
    cy.contains('Bruno Roger').should('be.visible');
    cy.contains('Developer');
    cy.contains('QA');
  });

  it('should search employee by name', () => {
    cy.mockarBuscarFuncionarios(employeesMock);
    cy.visit(baseUrl);
    cy.mockarFiltrarFuncionarios([employeesMock[0]]);

    cy.get('input').type('Alice');
    cy.contains('Buscar').click();

    cy.wait('@searchEmployees');

    cy.contains('Alice Silva').should('be.visible');
    cy.contains('Bruno Roger').should('not.exist');
  });

  it('should show empty state when search returns no results', () => {
    cy.mockarBuscarFuncionarios(employeesMock);
    cy.visit(baseUrl);
    cy.mockarFiltrarFuncionarios();

    cy.get('input').type('Inexistente');
    cy.contains('Buscar').click();
    cy.wait('@searchEmployees');
    cy.contains('Nenhum funcionário encontrado').should('be.visible');
  });

  it('should delete an employee and show success toast', () => {
    cy.mockarBuscarFuncionarios(employeesMock);
    cy.mockarDeletarFuncionario(1);

    cy.visit(baseUrl);
    cy.wait('@getEmployees');

    cy.contains('Excluir').first().click();

    cy.wait('@deleteEmployee');

    cy.contains('Funcionário removido com sucesso').should('be.visible');
    cy.contains('Alice Silva').should('not.exist');
  });

  it('should edit an employee and show success toast', () => {
    cy.mockarEditarFuncionario(1, employeesMock[1]);

    cy.visit(`${baseUrl}/employees/1/edit`);

    cy.wait('@getEmployee');
    const { name, role, email, active } = employeesMock[1];
    cy.get('input[formcontrolname="name"]').should('have.value', name);
    cy.get('input[formcontrolname="role"]').should('have.value', role);
    cy.get('input[formcontrolname="email"]').should('have.value', email);
    cy.get('input[formcontrolname="active"]').should(active ? 'be.checked' : 'not.be.checked');

    cy.get('input[formcontrolname="name"]').clear().type('Alice Silva Editada');
    cy.get('input[formcontrolname="role"]').clear().type('Senior Developer');
    cy.get('input[formcontrolname="email"]').clear().type('alice.editada@gmail.com');
    cy.get('input[formcontrolname="active"]').uncheck({ force: true });

    cy.contains('Salvar').click();

    cy.wait('@updateEmployee');

    cy.contains('Funcionário atualizado com sucesso').should('be.visible');
  });

  it('should show friendly error message when API fails', () => {
    cy.mockarErroFuncionarios();
    cy.visit(baseUrl);

    cy.wait('@getEmployeesError');

    cy.contains('Erro ao carregar funcionários').should('be.visible');
  });
});
