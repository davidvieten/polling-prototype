import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/client';
import { VoteCategory } from '@prisma/client';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category') as VoteCategory | null;
  const userId = searchParams.get('userId');

  try {
    const votes = await prisma.vote.findMany({
      where: {
        ...(category && { category }),
        ...(userId && { userId }),
      },
      include: {
        player: true,  // Include player data if playerId is set
        coach: true,   // Include coach data if coachId is set
        user: true,    // Always include the user who cast the vote
      },
    });

    return NextResponse.json(votes);
  } catch (error) {
    console.error('Error fetching votes:', error);
    return NextResponse.json({ error: 'Error fetching votes' }, { status: 500 });
  }
}
