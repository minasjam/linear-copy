/* eslint-disable @typescript-eslint/no-namespace */
/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add("login", () => {
  cy.origin("https://dev-4quxvne3srvtb7w3.us.auth0.com/", () => {
    cy.get("#username").type(`martin.minasjan+test@profiq.com`);
    cy.get("#password").type("3LyuPW2qhpd37Ym");
    cy.get(
      "form > div:last-child() > button[type=submit][name=action]"
    ).click();
  });
});
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
declare global {
  namespace Cypress {
    interface Chainable {
      login(): Chainable<void>;
    }
  }
}
