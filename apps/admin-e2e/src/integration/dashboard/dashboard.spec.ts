import config from '../config';

describe('Dashboard Test', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('input[name=username]')
      .type(config.account.success.user)
      .should('have.value', 'user1');
    cy.get('input[name=password]').type(config.account.success.password);
    cy.get('button[data-id=sign-in-button]').click();
  });

  it('Sidebar', () => {
    cy.get('ul.sidebar-nav > li').should(($data) => {
      expect($data).length.to.greaterThan(1);
    })
  })

  it('dashboard blocks', () => {
    cy.contains("Welcome Back").should(($data) => {
      expect($data).to.be.visible;
    })
    cy.contains("Total Earnings").should(($data) => {
      expect($data).to.be.visible;
    })
    cy.contains("Pending Orders").should(($data) => {
      expect($data).to.be.visible;
    })
    cy.contains("Total Revenue").should(($data) => {
      expect($data).to.be.visible;
    })
    cy.contains("Sales / Revenue").should(($data) => {
      expect($data).to.be.visible;
    })
    cy.contains("Activities").should(($data) => {
      expect($data).to.be.visible;
    })
    cy.contains("Calendar").should(($data) => {
      expect($data).to.be.visible;
    })
    cy.contains("Appointments").should(($data) => {
      expect($data).to.be.visible;
    })
    cy.contains("Latest Projects").should(($data) => {
      expect($data).to.be.visible;
    })
  })
})