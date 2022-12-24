import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";

import { trpc } from "../utils/trpc";

import "../styles/globals.css";
import Navbar from "../components/Navbar";
import { AuthProvider } from "src/context/AuthProvider";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <AuthProvider>
        <Head>
          <title>Adudu</title>
          <meta name="description" content="Buat Makrab h-3 jam" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Navbar />
        <Component {...pageProps} />
      </AuthProvider>
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
