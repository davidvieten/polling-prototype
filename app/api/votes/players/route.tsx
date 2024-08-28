import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/client';
import { z } from 'zod';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/auth/nextauth';


const voteSchema = z.object({
  category: z.enum(['PLAYER_OF_THE_YEAR', 'DEFENSEMAN_OF_THE_YEAR', 'ALL_TEAM']),
  playerId: z.string(), // Player ID is required for player voting
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validation = voteSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(validation.error.errors, { status: 400 });
    }

    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = session.user.id;

    const existingVote = await prisma.vote.findUnique({
      where: {
        userId_category: {
          userId,
          category: body.category,
        },
      },
    });

    if (existingVote) {
      return NextResponse.json({ error: 'You have already voted in this category' }, { status: 400 });
    }

    const newVote = await prisma.vote.create({
      data: {
        category: body.category,
        playerId: body.playerId,
        userId,
      },
    });

    return NextResponse.json(newVote, { status: 201 });
  } catch (error) {
    console.error('Error creating player vote:', error);
    return NextResponse.json({ error: 'Error creating vote' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const votes = await prisma.vote.findMany({
      where: { playerId: { not: null } },
      include: { player: true, user: true },
    });
    return NextResponse.json(votes);
  } catch (error) {
    console.error('Error fetching player votes:', error);
    return NextResponse.json({ error: 'Error fetching player votes' }, { status: 500 });
  }
}
