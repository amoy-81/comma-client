import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloLink,
  Observable,
} from "@apollo/client";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import { options } from "../auth/next-auth-config";

const GRAPHQL_ENDPOINT = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT;

const httpLink = new HttpLink({
  uri: GRAPHQL_ENDPOINT,
});

// Create an auth link to attach the accessToken to the headers
const authLink = new ApolloLink((operation, forward) => {
  return new Observable((observer) => {
    (async () => {
      let session;
      if (typeof window === "undefined") {
        // Server-side
        session = await getServerSession(options);
      } else {
        // Client-side
        session = await getSession();
      }

      const accessToken = session?.user?.accessToken;

      operation.setContext({
        headers: {
          authorization: accessToken ? `Bearer ${accessToken}` : "",
        },
      });

      const subscriber = {
        next: observer.next.bind(observer),
        error: observer.error.bind(observer),
        complete: observer.complete.bind(observer),
      };

      forward(operation).subscribe(subscriber);
    })().catch(observer.error.bind(observer));
  });
});

export const { getClient } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink),
  });
});
