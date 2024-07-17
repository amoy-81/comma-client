import { options } from "@/lib/auth/next-auth-config";
import { getServerSession } from "next-auth";

export default async function HomePage() {
  const session = await getServerSession(options);
  console.log(session);
  return <div className=" break-words">{session?.user.accessToken}</div>;
}
