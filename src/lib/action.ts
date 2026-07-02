'use server';

import { auth, signIn, signOut } from '@/lib/auth';
import { LoginInput, PostInput } from '@/lib/schema';
import { redirect } from 'next/navigation';
import bcrypt from 'bcrypt';
import prisma from '@/lib/prisma';

export async function login(input: LoginInput) {
  await signIn('credentials', { ...input, redirectTo: '/profile' });
}

export async function logout() {
  await signOut();
}

export async function registerAction(input: LoginInput) {
  const hashed = await bcrypt.hash(input.password, 12);
  await prisma.user.create({
    data: {
      email: input.email,
      password: hashed
    }
  });

  redirect('/login');
}

export async function createPost(input: PostInput) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error('Unauthorized');
  }
  await prisma.post.create({
    data: { title: input.title, userId: +session.user.id }
  });
}
