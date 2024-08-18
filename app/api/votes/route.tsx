import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/client';
import { z } from 'zod';
import { VoteCategory } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';

// Define the schema for the vote creation
const voteSchema = z.object({
  category: z.enum(['PLAYER_OF_THE_YEAR', 'DEFENSEMAN_OF_THE_YEAR', 'COACH_OF_THE_YEAR', 'ALL_TEAM']),
  playerId: z.string().optional(), // Player ID is optional for categories like COACH_OF_THE_YEAR
});

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
        player: true, // Include related player data
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            school: true,
          },
        },
      },
    });
    return NextResponse.json(votes);
  } catch (error) {
    console.error('Error fetching votes:', error);
    return NextResponse.json({ error: 'Error fetching votes' }, { status: 500 });
  }
}

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
            category: body.category as VoteCategory,
          },
        },
      });
  
      if (existingVote) {
        return NextResponse.json({ error: 'You have already voted in this category' }, { status: 400 });
      }
  
      const newVote = await prisma.vote.create({
        data: {
          category: body.category as VoteCategory,
          playerId: body.playerId,
          userId,
        },
      });
  
      return NextResponse.json(newVote, { status: 201 });
    } catch (error) {
      console.error('Error creating vote:', error);
      return NextResponse.json({ error: 'Error creating vote' }, { status: 500 });
    }
  }
  