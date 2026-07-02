import prisma from '@/lib/prisma';
import { loginSchema } from '@/lib/schema';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import bcrypt from 'bcrypt';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      async authorize(input: unknown) {
        const data = loginSchema.parse(input);
        const user = await prisma.user.findFirst({
          where: {
            email: data.email
          }
        });

        if (!user) {
          return null;
        }

        const isMatch = await bcrypt.compare(data.password, user.password);
        if (!isMatch) {
          return null;
        }

        // return null or throw any error ===> login failed
        // return User { id, name, email, image } ===> login success
        return {
          id: user.id.toString(),
          email: user.email,
          role: user.role,
          name: 'muamua',
          picture: 'aaaaa',
          gender: 'male'
        };
      }
    }),
    Google({}),
    GitHub({})
  ],
  callbacks: {
    jwt({ token: payload, user }) {
      // jwt executed: 1. after success login, 2. call auth()
      console.log('+++++++++++++++++');
      console.log(user);
      console.log('+++++++++++++++++');
      // payload { sub ==> user id, email ==> user email, name ==> user name, picture ==> user image }
      // console.log(user);
      // console.log(payload);
      // payload.picture = 'modifiiiiiiiiii';
      payload.test = 'abcdef';
      if (user) {
        payload.role = user.role;
      }
      return payload;
    },
    session({ session, token }) {
      // console.log(session);
      // session user { email ==> payload email, image ==> payload picture, name ===> payload name}
      session.user.role = token.role;
      if (token.sub) session.user.id = token.sub;
      return session;
    }
  }
});
