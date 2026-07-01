import prisma from '@/lib/prisma';
import { loginSchema } from '@/lib/schema';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      async authorize(input: unknown) {
        const data = loginSchema.parse(input);
        const user = await prisma.user.findFirst({
          where: {
            email: data.email,
            password: data.password
          }
        });

        if (!user) {
          return null;
        }
        // return null or throw any error ===> login failed
        // return User { id, name, email, image } ===> login success
        return { id: user.id.toString(), email: user.email, role: user.role };
      }
    }),
    Google({}),
    GitHub({})
  ]
});
