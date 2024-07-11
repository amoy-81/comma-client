"use client";

import { AuthFetchApi, httpMethods } from "@/lib/fetchApi";
import useHttpRequest from "@/lib/hooks/useHttpRequest";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";

export default function page() {
  const { data: session } = useSession();
  const { response, loading, error, fetchRequest } = useHttpRequest(
    "/chat/my-rooms",
    httpMethods.get
  );

  useEffect(() => {
    if (session) {
      fetchRequest();
    }
  }, [session]);

  console.log({ response, loading, error, fetchRequest });
  return <div>page TTT</div>;
}
