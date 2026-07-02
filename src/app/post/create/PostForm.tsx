'use client';

import { createPost } from '@/lib/action';
import { PostInput, postSchema } from '@/lib/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

export default function PostForm() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<PostInput>({
    defaultValues: { title: '' },
    resolver: zodResolver(postSchema)
  });

  const onSubmit = async (data: PostInput) => {
    await createPost(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" placeholder="title" {...register('title')} />
      {errors.title && <p>{errors.title.message}</p>}
      <button>Create</button>
    </form>
  );
}
