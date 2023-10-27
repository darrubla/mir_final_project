describe('template spec', () => {
  it('successfully loads', () => {
    cy.visit('/signin/stude')
  })

  it('successfully logged in via form submission', () => {
    const userEamil = 'carlos9559+s@gmail.com'
    const userPassword = '12345678'
    cy.visit('/signin/student')

    cy.get('input[name=email]').type(userEamil)

    // {enter} causes the form to submit
    cy.get('input[name=password]').type(`${userPassword}{enter}`)

    // we should be redirected to /
    cy.url().should('include', '/')

    // UI should reflect this user being logged in
    cy.get('span').should('contain', 'carlos9559+s@gmail.com')
  })
})
