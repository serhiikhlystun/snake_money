import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { refreshAuth } from "@/app/queries/users";

const options = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "Enter your email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
        },
      },
      async authorize(credentials) {
        const payload = {
          email: credentials.email,
          password: credentials.password,
        };

        const res = await fetch(
          "https://snam.web3flow.online/auth/login",
          {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
              "Content-Type": "application/json",
              "Accept-Language": "en-US",
            },
          }
        );

        const user = await res.json();

        if (!res.ok) {
          throw new Error("Wrong username or password");
        }

        if (res.ok && user) {
          return user;
        }

        return null;
      },
    }),
  ],
  session: {
    jwt: true,
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  callbacks: {
    async jwt({ token, user, account }) {

      // Check if token is has expired
      if (token && Date.now() > token.accessTokenExpires * 1000) {
        try {
          // Refresh the access token
          const refreshedToken = await refreshAccessToken(token);

          // Update the token with the new access token
          token.accessToken = refreshedToken.data.accessToken;
          token.accessTokenExpires = refreshedToken.data.expires;
          token.refreshToken = refreshedToken.data.refresh_token;
        } catch (error) {
          console.error("Failed to refresh access token:", error);
        }
        console.log(token);
        return token;
      }

      if (account && user) {
        return {
          ...token,
          accessToken: user.data.access_token,
          refreshToken: user.data.refresh_token,
          accessTokenExpires: user.data.expires,
        };
      }
      return token;
    },

    async session({ session, token }) {
      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;
      session.user.exp = token.accessTokenExpires;

      return session;
    },
  },
  pages: {
    signIn: "/",
  },
};

async function refreshAccessToken(token) {
  const variables = {
    refresh_token: token.refreshToken,
  };
  // Logic for refreshing the access token
  const response = await fetch(
    "https://snam.web3flow.online/graphql/system",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.accessToken}`,
      },
      body: JSON.stringify({
        refreshAuth,
        variables,
      }),
    }
  );
  const refreshedToken = await response.json();
  return refreshedToken;
}
const handler = NextAuth(options);

// export default (req, res) => NextAuth(req, res, options);
export { handler as GET, handler as POST };
