describe('The Home Page', () => {
  it('successfully loads', () => {
    cy.visit('/')
    cy.findByRole('textbox', { name: 'task' }).type('task01')
    cy.findByRole('button', { name: 'Add' }).click()
    cy.findByRole('textbox', { name: 'task' }).should('not.have.value')
    cy.findByDisplayValue('task01').should('exist')
  })
})
