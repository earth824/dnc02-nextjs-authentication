import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function CreatePost() {
  const session = await auth();
  if (!session) {
    redirect('/login');
  }

  return <div>CreatePost</div>;
}
