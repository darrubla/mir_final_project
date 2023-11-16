describe('template spec', () => {
  it('successfully loads', () => {
    //cy.visit('/signin/student');
    cy.visit('/auth/login');
  });

  it('successfully logged in via form submission', () => {
    cy.intercept(
      'POST',
      'https://class-nexus-api.onrender.com/api/students/signin/student',
    ).as('getUser');

    const userEmail = 'carlos9559+s@gmail.com';
    const userPassword = '12345678';
    cy.visit('/auth/login');
    cy.get('button:contains("student")').click();

    cy.get('input[name=email]').type(userEmail);

    // {enter} causes the form to submit
    cy.get('input[name=password]').type(`${userPassword}{enter}`);

    // we should be redirected to /
    //cy.wait('@getUser');
    cy.url().should('include', '/');

    // UI should reflect this user being logged in
    cy.get('span', { timeout: 15000 }).should(
      'contain',
      'carlos9559+s@gmail.com',
    );
  });
});
