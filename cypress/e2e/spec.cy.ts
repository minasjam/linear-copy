import { LandingAssertions } from "cypress/support/assertions/LandingAssertions";
import { MainAssertions } from "cypress/support/assertions/MainAsserions";
import { MainSteps } from "cypress/support/steps/MainSteps";

describe.only("App run through", () => {
  beforeEach(function () {
    cy.visit("/");
    LandingAssertions.titleIsVisible();
    LandingAssertions.logInButtonIsVisible();
    cy.loginToAuth0("martin.minasjan+test1@profiq.com", "jD7qfeCqgJQwE5s");
    cy.visit("/");
  });

  it("Logs in through branches", () => {
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
