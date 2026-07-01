'use server';

import { signIn, signOut } from '@/lib/auth';
import { LoginInput } from '@/lib/schema';
import { redirect } from 'next/navigation';

export async function login(input: LoginInput) {
  await signIn('credentials', { ...input, redirectTo: '/profile' });
}

export async function logout() {
  await signOut();
}
