import GraphqlWraper from "@/providers/graphql-wraper";
import { ReactNode } from "react";

export default function MainRouteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <GraphqlWraper>{children}</GraphqlWraper>
    </>
  );
}
