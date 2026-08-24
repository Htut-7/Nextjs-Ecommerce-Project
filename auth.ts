import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import { api } from "./Components/lib/api";
import Credential from "next-auth/providers/credentials";
import validateBody from "./Components/lib/validateBody";
import signInWithCredentialsSchema from "./Components/lib/schema/signInWithCredentialSchema";
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google,GitHub,
    Credential({
      async authorize(credential) {
        const validateField = validateBody(credential, signInWithCredentialsSchema);
        if (validateField) {
          const { email, password } = validateField;
          const { data: existingAccount } =
            await api.accounts.getByProvider(email);

          if (!existingAccount) return null;

          const { data: existingUser } = await api.users.getById(
            existingAccount.userId.toString()
          );
          if (!existingUser) return null;

          const isvalidPassword = await bcrypt.compare(
            password,
            existingAccount.password
          );
          if (isvalidPassword) {
            return {
              id: existingUser.id,
              name:existingUser.username,
              email: existingUser.email,
              image: existingUser.image,
            };
          }
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async signIn({ profile, user, account }) {
      if (account?.type === "credentials") return true;
      if (!account || !user) return false;

      const { success } = await api.auth.oAuthSignin({
        user: {
          email: user.email || "",
          image: user.image || "",
          username:
            account.provider === "github"
              ? (profile?.login as string)
              : (user?.name?.toLocaleLowerCase() as string),
        },
        provider: account?.provider,
        providerAccountId: account?.providerAccountId,
      });
      return success;
    },

    async jwt({ token, account }) {
      if (account) {
        const { success, accountData } =
          await api.accounts.getByProvider(account?.providerAccountId);

        if (!success || !accountData) return token;

        const userId = accountData?.userId;

        if (userId) {
          token.sub = userId;
        }
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.sub as string;
      return session;
    },
  }
  
})