import { BE_VISIBLE } from "../utils";
import { MainElements } from "../elements/MainELements";

export const MainAssertions = {
  titleIsVisible() {
    MainElements.title.should(BE_VISIBLE);
  },

  logOutButtonIsVisible() {
    MainElements.logOutButton.should(BE_VISIBLE);
  },

  subtitleIsVisible() {
    MainElements.subtitle.should(BE_VISIBLE);
  },

  taskInputIsVisible() {
    MainElements.taskInput.should(BE_VISIBLE);
  },

  addTaskButtonIsVisible() {
    MainElements.addTaskButton.should(BE_VISIBLE);
  },
};
