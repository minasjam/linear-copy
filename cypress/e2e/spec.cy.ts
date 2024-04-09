import { LandingAssertions } from "cypress/support/assertions/LandingAssertions";
import { LandingSteps } from "cypress/support/steps/LandingSteps";
import { MainAssertions } from "cypress/support/assertions/MainAsserions";
import { MainSteps } from "cypress/support/steps/MainSteps";

describe("template spec", () => {
  it("passes", () => {
    cy.visit(Cypress.config().baseUrl ?? "");

    LandingAssertions.titleIsVisible();
    LandingAssertions.logInButtonIsVisible();
    LandingSteps.selectLogInButton();

    cy.login();

    MainAssertions.titleIsVisible();
    MainAssertions.logOutButtonIsVisible();
    MainAssertions.subtitleIsVisible();
    MainAssertions.taskInputIsVisible();
    MainSteps.fillTaskInput("task name 1");
    MainSteps.selectAddTaskButton();

    MainSteps.selectDeleteTaskButton();
    MainSteps.selectLogOutButton();
  });
});
