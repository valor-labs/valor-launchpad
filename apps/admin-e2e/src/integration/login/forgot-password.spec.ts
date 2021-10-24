import config from '../config';

describe('Login Test', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.contains("Forgot password?").click();
  });

  it('Send reset password mail', () => {
    cy.get("input[data-id=username]").type("user3");
    cy.get("button[data-id=password-reset]").click();
    cy.contains("New password will be sent to your email!").should(($data) => {
      expect($data).to.be.visible;
    })
  })
})