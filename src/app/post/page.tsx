import { auth } from '@/lib/auth';
import { getAllPost } from '@/lib/data';
import { redirect } from 'next/navigation';

export default async function PostPage() {
  const session = await auth();
  if (!session) {
    redirect('/login');
  }

  const posts = await getAllPost();

  return (
    <div>
      {posts.map((el) => (
        <p key={el.id}>{el.title}</p>
      ))}
    </div>
  );
}
