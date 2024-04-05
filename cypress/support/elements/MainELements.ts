export const MainElements = {
  get logOutButton() {
    return cy.get("a").contains("Log out");
  },

  get title() {
    return cy.get("h1").contains("Welcome");
  },

  get taskInput() {
    return cy.get("input[data-test-id='task-input']");
  },

  get subtitle() {
    return cy.get("h2").contains("Tasks");
  },

  get addTaskButton() {
    return cy.get("button").contains("Add");
  },

  get deleteTaskButton() {
    return cy.get("button").contains("Delete");
  },
};
