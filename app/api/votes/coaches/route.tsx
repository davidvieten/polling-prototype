import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/client';
import { z } from 'zod';
import { VoteCategory } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/auth/nextauth';


const voteSchema = z.object({
  category: z.enum(['PLAYER_OF_THE_YEAR', 'DEFENSEMAN_OF_THE_YEAR', 'COACH_OF_THE_YEAR', 'ALL_TEAM']),
  coachId: z.string().optional(), 
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
        coachId: body.coachId || null,  // Use coachId if it's a coach vote
        userId: userId,  // This is the voter
      },
    });
  
    return NextResponse.json(newVote, { status: 201 });
  } catch (error) {
    console.error('Error creating vote:', error);
    return NextResponse.json({ error: 'Error creating vote' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const votes = await prisma.vote.findMany({
      where: { coachId: { not: null } },
      include: { coach: true, user: true },
    });
    return NextResponse.json(votes);
  } catch (error) {
    console.error('Error fetching coach votes:', error);
    return NextResponse.json({ error: 'Error fetching coach votes' }, { status: 500 });
  }
}
