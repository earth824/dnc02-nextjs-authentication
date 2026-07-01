'use server';

import { signIn } from '@/lib/auth';
import { LoginInput } from '@/lib/schema';

export async function login(input: LoginInput) {
  await signIn('credentials', input);
}
