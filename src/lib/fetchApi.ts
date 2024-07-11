import { getServerSession } from "next-auth";
import { options } from "./auth/next-auth-config";

const BASE_URL = process.env.SERVER_BASE_URL;

export enum httpMethods {
  get = "GET",
  post = "POST",
  put = "PUT",
  delete = "DELETE",
}

interface fetchOptions {
  body: any;
  headers: any;
}

async function refreshToken(refreshToken: string) {
  console.log(BASE_URL);

  const res = await fetch(BASE_URL + "/auth/refresh-token", {
    method: "GET",
    headers: { r_t: refreshToken },
  });
  const data = await res.json();
  console.log({ data });

  return { token: data.token, refreshToken: data.refreshToken };
}

export async function AuthFetchApi(
  url: string,
  method: httpMethods,
  option?: fetchOptions
) {
  const session = await getServerSession(options);

  let res = await fetch(BASE_URL + url, {
    method: method,
    body: option?.body && option.body,
    headers: {
      authorization: `bearer ${session?.user.accessToken}`,
      ...option?.headers,
    },
    cache: "no-store",
  });

  if (res.status == 401) {
    const rt = await refreshToken(session?.user.refreshToken ?? "");
    if (session) {
      session.user.accessToken = rt.token;
      session.user.refreshToken = rt.refreshToken;
    }
    const res = await fetch(BASE_URL + url, {
      method: method,
      body: option?.body && option.body,
      headers: {
        Authorization: `bearer ${rt.token}`,
        ...option?.headers,
      },
      cache: "no-store",
    });
    return await res.json();
  }

  return await res.json();
}
