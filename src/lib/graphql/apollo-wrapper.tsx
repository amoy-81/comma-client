"use client";

import { ApolloLink, HttpLink, concat } from "@apollo/client";
import {
  NextSSRApolloClient,
  ApolloNextAppProvider,
  NextSSRInMemoryCache,
  SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support/ssr";
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";
import { setVerbosity } from "ts-invariant";
import { useSession } from "next-auth/react";

if (process.env.NODE_ENV === "development") {
  setVerbosity("debug");
  loadDevMessages();
  loadErrorMessages();
}

const GRAPHQL_ENDPOINT = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT;

function makeClient(session: any) {
  const httpLink = new HttpLink({
    uri: GRAPHQL_ENDPOINT,
  });

  const authMiddleware = new ApolloLink((operation, forward) => {
    operation.setContext({
      headers: {
        authorization: session ? `Bearer ${session.user.accessToken}` : "",
      },
    });
    return forward(operation);
  });

  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    link:
      typeof window === "undefined"
        ? ApolloLink.from([
            new SSRMultipartLink({
              stripDefer: true,
            }),
            httpLink,
          ])
        : concat(authMiddleware, httpLink),
  });
}

export function ApolloWrapper({ children }: { children: any }) {
  const { data: session } = useSession();
  console.log(session, "SEEEEESSSION");
  if (session)
    return (
      <ApolloNextAppProvider makeClient={() => makeClient(session)}>
        {children}
      </ApolloNextAppProvider>
    );
}
