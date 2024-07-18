import { getClient } from "@/lib/graphql/client";
import { GET_TRACKS } from "@/lib/graphql/querys";

export default async function TTestSsr() {
  const albums = await getClient().query({ query: GET_TRACKS });
  console.log(albums);
  return <div>{albums?.data?.accountInfo?.email}</div>;
}
