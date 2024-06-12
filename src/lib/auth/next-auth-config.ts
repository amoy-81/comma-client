import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";
import { cookieParse } from "@/helpers/cookieParser";

const tokensParser = (responsJson: any, responseCookies: string[]) => {
  // Parse the cookies
  const tokens = responseCookies.map((cookie) => cookieParse(cookie));

  // Extract access token and refresh token from the cookies
  tokens.forEach((token) => {
    if (token?.a_t) {
      responsJson.token = token.a_t;
    } else if (token?.r_t) {
      responsJson.refreshToken = token.r_t;
      responsJson["Max-Age"] = token["Max-Age"];
    }
  });
};

// Define the NextAuth options
const options: NextAuthOptions = {
  providers: [
    // Set up the credentials provider for custom email/password login
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      // Authorization logic
      async authorize(credentials, req) {
        // Send a POST request to the backend authentication endpoint
        const res = await fetch(`${process.env.SERVER_BASE_URL}/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
        });
        // Parse the response from the server
        const responsJson = await res.json();

        // Check if the response is successful
        if (responsJson && res.status == 200) {
          // Retrieve cookies from the response headers
          const responseCookies = res.headers.getSetCookie();

          // Geting tokens from cookie and add in jwt
          tokensParser(responsJson, responseCookies);

          // Return the response JSON with tokens
          return responsJson;
        } else {
          // Throw an error if authentication fails
          throw new Error(responsJson?.message || "Login faile");
        }
      },
    }),
  ],
  session: {
    // Use JWT strategy for session management
    strategy: "jwt",
  },
  callbacks: {
    // JWT callback to handle token logic
    async jwt({ token, user }: { token: JWT; user?: any }) {
      if (user) {
        // Assign user details to token
        token = user;
        if (user["Max-Age"]) {
          // Set token expiration
          token.exp = Math.floor(Date.now() / 1000) + parseInt(user["Max-Age"]);
        }
      }
      // Return the updated token
      return token;
    },

    // Session callback to handle session logic
    async session({ session, token }: { session: any; token: any }) {
      // Assign token to session user
      session.user = token;
      if (token.exp) {
        // Set session expiration
        session.expires = new Date(token.exp * 1000).toISOString();
      }
      // Return the updated session
      return session;
    },
  },

  // Use environment variable for secret
  secret: process.env.NEXTAUTH_SECRET,
};

// Export GET and POST handlers for NextAuth
export const GET = NextAuth(options);
export const POST = NextAuth(options);
// Export authentication methods
export const { auth, signIn, signOut } = NextAuth(options);
