import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { api } from "~/utils/api";
import "@mantine/core/styles.css";
import "@mantine/form";
import "~/styles/globals.css";
import type { AppType } from "next/app";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <UserProvider>
      <MantineProvider>
        <ModalsProvider>
          <Head>
            <title>Almost linear</title>
            <meta name="description" content="Linear copy" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0"
            />
            <meta charSet="UTF-8" />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <main>
            <Component {...pageProps} />
          </main>
        </ModalsProvider>
      </MantineProvider>
    </UserProvider>
  );
};

export default api.withTRPC(MyApp);
