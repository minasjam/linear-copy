export const LandingElements = {
  get logInButton() {
    return cy.get("a").contains("Log in");
  },

  get title() {
    return cy.get("h1").contains("Welcome to Linear copy, stranger!");
  },
};
