"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import { httpMethods } from "../fetchApi";
import useAxiosAuth from "./useAxiosAuth";

export default function useHttpRequest(
  url: string,
  method: httpMethods,
  option?: { headers?: any; body?: any }
) {
  const { data: session } = useSession();
  const axios: any = useAxiosAuth();
  // states
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchRequest = () => {
    setLoading(true);
    axios[method.toLowerCase()](url, option?.body, {
      headers: { ...option?.headers },
    })
      .then((res: any) => {
        setResponse(res.data);
      })
      .catch((err: any) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { response, loading, error, fetchRequest };
}
