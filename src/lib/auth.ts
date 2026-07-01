import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';

export const { handlers, signIn } = NextAuth({
  providers: [
    Credentials({
      authorize(input: unknown) {
        // return null or throw any error ===> login failed
        // return User { id, name, email, image } ===> login success
        return { email: 'a@blabla.com' };
      }
    }),
    Google({}),
    GitHub({})
  ]
});
