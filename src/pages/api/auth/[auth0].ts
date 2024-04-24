import { env } from "~/env";
import {
  handleAuth,
  handleCallback,
  handleLogin,
  handleLogout,
} from "@auth0/nextjs-auth0";
import type { NextApiRequest, NextApiResponse } from "next";

function returnPreviewHost(req: NextApiRequest) {
  const host = req.headers.host;

  const regexBranchUrl = /^linear-copy-git-.*-minasjams-projects\.vercel\.app$/;

  if (!host) return env.VERCEL_BRANCH_URL;

  if (regexBranchUrl.test(host)) {
    return env.VERCEL_BRANCH_URL;
  } else if (host.endsWith("-minasjams-projects.vercel.app")) {
    return env.VERCEL_COMMIT_URL;
  } else {
    return env.VERCEL_BRANCH_URL;
  }
}

function returnHost(req: NextApiRequest) {
  const host = returnPreviewHost(req);

  switch (env.VERCEL_ENV) {
    case "production":
      return "linear-copy.vercel.app";
    case "preview":
      return host;
    default:
      return "localhost:3000";
  }
}

function getUrls(req: NextApiRequest): {
  redirectUri: string;
  returnTo: string;
} {
  const protocol = env.VERCEL_ENV === "development" ? "http" : "https";
  const host = returnHost(req);
  return {
    redirectUri: `${protocol}://${host}/api/auth/callback`,
    returnTo: `${protocol}://${host}`,
  };
}

export default handleAuth({
  async callback(req: NextApiRequest, res: NextApiResponse) {
    try {
      const { redirectUri } = getUrls(req);
      await handleCallback(req, res, { redirectUri: redirectUri });
    } catch (error) {
      const err = error as Error;
      res.status(500).end(err.message);
    }
  },

  async login(req: NextApiRequest, res: NextApiResponse) {
    try {
      const { redirectUri, returnTo } = getUrls(req);

      await handleLogin(req, res, {
        authorizationParams: {
          redirect_uri: redirectUri,
        },
        returnTo: returnTo,
      });
    } catch (error) {
      const err = error as Error;
      res.status(400).end(err.message);
    }
  },

  async logout(req: NextApiRequest, res: NextApiResponse) {
    const { returnTo } = getUrls(req);
    await handleLogout(req, res, {
      returnTo: returnTo,
    });
  },
});
