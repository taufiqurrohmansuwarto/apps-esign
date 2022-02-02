import jsonwebtoken from "jsonwebtoken";
import NextAuth from "next-auth/next";

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const wellKnown = process.env.WELL_KNOWN;
const scope = process.env.SCOPE;

export default NextAuth({
  pages: {
    signIn: "/esign/signin",
  },
  providers: [
    {
      name: "SIMASTER",
      id: "esign",
      type: "oauth",
      wellKnown,
      clientId,
      clientSecret,
      authorization: {
        params: {
          scope,
          prompt: "login",
        },
      },
      idToken: true,
      checks: ["pkce", "state"],
      profile(profile, token) {
        const currentToken = token.id_token;
        const { role, group, employee_number } =
          jsonwebtoken.decode(currentToken);

        const currentUser = {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          employee_number: employee_number || "",
          role,
          group,
        };

        return currentUser;
      },
    },
  ],
  callbacks: {
    redirect: async (url, baseUrl) => {
      return Promise.resolve(`${url?.baseUrl}${process.env.BASE_PATH}`);
    },
    async session({ session, token, user }) {
      session.accessToken = token.accessToken;
      session.expires = token?.expires;

      // session.scope = token.scope;
      session.user.id = token.id;
      session.user.role = token?.role;
      session.user.group = token?.group;
      session.user.employee_number = token?.employee_number;

      const check = Date.now() < new Date(token?.expires * 1000);

      if (check) {
        return session;
      }
    },
    async jwt({ token, account, isNewUser, profile, user }) {
      if (account) {
        token.accessToken = account?.access_token;

        token.expires = profile.exp;
        token.id = account?.providerAccountId;
        token.role = profile?.role;
        token.group = profile?.group;
        token.employee_number = profile?.employee_number;
      }

      return token;
    },
  },
  theme: "light",
  secret: process.env.SECRET,
  jwt: {
    secret: process.env.SECRET,
  },
});
