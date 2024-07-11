import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      _id: string;
      name: string;
      email: string;
      avatar: string;
      role: string;
      bio: string;
      createdAt: string;
      updatedAt: string;

      accessToken: string;
      refreshToken: string;
    };
  }
}
