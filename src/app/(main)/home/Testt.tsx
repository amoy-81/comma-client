"use client";
import { GET_TRACKS } from "@/lib/graphql/querys";
import { useQuery } from "@apollo/client";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";

export default function Testt() {
  const { data: session } = useSession();
  const { data, loading, error } = useQuery(GET_TRACKS);
  console.log({
    data,
    loading,
    error,
  });
  return <div>{data ? data.accountInfo.name : "Loading..."}</div>;
}
