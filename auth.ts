import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import { api } from "./Components/lib/api";
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google,GitHub],
  callbacks:{
    async signIn({ profile, account, user }) {

  if (!account || !user) return false;

  const email = user.email;
  const username =
    account.provider === "github"
      ? profile?.login
      : user.name?.toLowerCase();

  if (!email || !username) {
    console.log("Missing email or username");
    return false;
  }

  const { success } = await api.auth.oAuthSignin({
    user: {
      email,
      image: user.image || "",
      username: account.provider==='github' ? profile?.login as string
       : user.name?.toLocaleLowerCase() as string,
    },
    provider: account.provider,
    providerAccountId: account.providerAccountId,
  });

  return success;
}
  }
  
})