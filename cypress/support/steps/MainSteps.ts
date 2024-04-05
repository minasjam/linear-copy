import { MainElements } from "../elements/MainELements";

export const MainSteps = {
  selectLogOutButton() {
    MainElements.logOutButton.click();
  },

  fillTaskInput(task: string) {
    MainElements.taskInput.type(task);
  },

  selectAddTaskButton() {
    MainElements.addTaskButton.click();
  },

  selectDeleteTaskButton() {
    MainElements.deleteTaskButton.click();
  },
};
