import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function getAllPost() {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error('Unauthorized');
  }

  return await prisma.post.findMany({ where: { userId: +session.user.id } });
}
