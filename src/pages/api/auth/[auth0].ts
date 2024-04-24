import {
  handleAuth,
  handleCallback,
  handleLogin,
  handleLogout,
} from "@auth0/nextjs-auth0";
import type { NextApiRequest, NextApiResponse } from "next";

function getUrls(req: NextApiRequest): {
  redirectUri: string;
  returnTo: string;
} {
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  const host = req.headers.host;
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
