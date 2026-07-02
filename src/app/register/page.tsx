'use client';

import { registerAction } from '@/lib/action';
import { LoginInput, loginSchema } from '@/lib/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginInput>({
    defaultValues: { email: '', password: '' },
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = async (data: LoginInput) => {
    await registerAction(data);
  };

  return (
    <div
      className="flex justify-center items-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <form action="" className="flex flex-col gap-2">
        <input
          type="text"
          {...register('email')}
          className="border placeholder:text-center"
          placeholder="Enter email"
        />
        {errors.email && <p>{errors.email.message}</p>}
        <input type="text" {...register('password')} className="border" />
        {errors.password && <p>{errors.password.message}</p>}
        <button>Sign Up</button>
      </form>
    </div>
  );
}
