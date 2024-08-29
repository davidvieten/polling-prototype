import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

import prisma from '@/prisma/client';
import { authOptions } from '@/app/auth/nextauth';

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);

  console.log('Session:', session);

  if (!session || !session.user || !session.user.email) {
    return NextResponse.json({ error: 'Not authenticated or email is missing' }, { status: 401 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email as string },
      select: {
        id: true,
        name: true,
        email: true,
        isAdmin: true,
        school: true, 
      },
    });

    console.log('User fetched:', user);

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error('Error fetching user data:', error);
    return NextResponse.json({ error: 'Error fetching user data' }, { status: 500 });
  }
}
