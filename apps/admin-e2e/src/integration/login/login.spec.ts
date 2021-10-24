import config from '../config';

describe('Login Test', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Login with valid account and password', () => {
    cy.get('input[name=username]')
      .type(config.account.success.user)
      .should('have.value', 'user1');
    cy.get('input[name=password]').type(config.account.success.password);
    cy.get('button[data-id=sign-in-button]').click();
    cy.url().should('include', 'dashboard-default')
  });

  it('Login with invalid account and password', () => {
    cy.get('input[name=username]')
      .type(config.account.failed.user)
      .should('have.value', 'user1');
    cy.get('input[name=password]').type(config.account.failed.password);
    cy.get('button[data-id=sign-in-button]').click();
    cy.contains("Incorrect username or password").should('to.be.visible');
  })

  it('Click forgot password', () => {
    cy.contains('Forgot password?').click();
    cy.url().should("include", 'reset-password')
  })

  it('Click sign up', () => {
    cy.contains('Not having an account?').click();
    cy.url().should("include", 'sign-up')
  })
});