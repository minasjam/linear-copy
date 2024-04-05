import { env } from "~/env";
import { initAuth0 } from "@auth0/nextjs-auth0";

export function returnAuth0BaseURL() {
  switch (env.VERCEL_ENV) {
    case "production":
      return env.AUTH0_BASE_URL;
    case "preview":
      return env.VERCEL_BRANCH_URL
        ? `https://${env.VERCEL_BRANCH_URL}`
        : "https://linear-copy.vercel.app";
    default:
      return env.AUTH0_BASE_URL || "http://localhost:3000";
  }
}

const baseURL = returnAuth0BaseURL();

export default initAuth0({
  baseURL,
});
