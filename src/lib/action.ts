'use server';

import { signIn, signOut } from '@/lib/auth';
import { LoginInput } from '@/lib/schema';

export async function login(input: LoginInput) {
  await signIn('credentials', input);
}

export async function logout() {
  await signOut();
}
