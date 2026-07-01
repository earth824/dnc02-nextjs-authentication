'use client';

import { login } from '@/lib/action';
import { LoginInput, loginSchema } from '@/lib/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

// import { signIn } from 'next-auth/react';

// import { signIn } from '@/lib/auth';

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' }
  });

  const onSubmit = async (data: LoginInput) => {
    await login(data);
  };

  return (
    <div className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <form action="">
        <div>
          <input type="text" placeholder="Email" {...register('email')} />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div>
          <input type="text" placeholder="Password" {...register('password')} />
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <button>Login</button>
      </form>

      {/* <button
        className="px-4 py-2 bg-cyan-500"
        onClick={() => signIn('google')}
      >
        Login with Google
      </button>
      <button
        className="px-4 py-2 bg-violet-500"
        onClick={() => signIn('github')}
      >
        Login with Github
      </button> */}
    </div>
  );
}
