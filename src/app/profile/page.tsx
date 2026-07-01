import { logout } from '@/lib/action';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function ProfilePage() {
  const session = await auth();
  console.log(session);

  if (!session) {
    redirect('/login');
  }

  return (
    <div>
      <h1>Email: {session.user?.email}</h1>
      <form action={logout}>
        <button>Logout</button>
      </form>
    </div>
  );
}
