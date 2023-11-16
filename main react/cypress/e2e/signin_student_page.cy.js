describe('template spec', () => {
  it('successfully loads', () => {
    cy.visit('/signin/student');
  });

  it('successfully logged in via form submission', () => {
      // Intercepting API request
    cy.intercept('POST', '/api/students/signin/student', { fixture: 'user.json' }).as('getUser');
    
    cy.visit('/signin/student');

    cy.get('input[name=email]').type(userEamil);

    // {enter} causes the form to submit
    cy.get('input[name=password]').type(`${userPassword}{enter}`);

    // we should be redirected to /
    .wait('@getUser')
    cy.url().should('include', '/');

    // UI should reflect this user being logged in
    cy.get('span').should('contain', 'john.doe@test.com');
  });
});
