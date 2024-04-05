import { BE_VISIBLE } from "../utils";
import { LandingElements } from "../elements/LandingElements";

export const LandingAssertions = {
  logInButtonIsVisible() {
    LandingElements.logInButton.should(BE_VISIBLE);
  },

  titleIsVisible() {
    LandingElements.title.should(BE_VISIBLE);
  },
};
