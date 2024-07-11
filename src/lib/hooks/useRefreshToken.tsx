"use client";

import { useRouter } from "next/navigation";
import axios from "../axios";
import { useSession } from "next-auth/react";

export const useRefreshToken = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const refreshToken = async () => {
    const res = await axios.get("/auth/refresh-token", {
      headers: {
        r_t: session?.user.refreshToken,
      },
    });

    if (session && (res.status === 200 || res.status === 201)) {
      session.user.accessToken = res.data.token;
      session.user.refreshToken = res.data.refreshToken;
    } else router.push("/auth/login");
  };
  return refreshToken;
};
