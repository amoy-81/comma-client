"use client";
import { ApolloWrapper } from "@/lib/graphql/apollo-wrapper";

export default function GraphqlWraper({ children }: { children: any }) {
  return (
    <>
      <ApolloWrapper>{children}</ApolloWrapper>
    </>
  );
}
