import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/client';
import { z } from 'zod';
import bcrypt from 'bcrypt';

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6), // Added password validation
});

export async function GET(request: NextRequest) {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching users' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validation = schema.safeParse(body);
    
    if (!validation.success) {
      return NextResponse.json(validation.error.errors, { status: 400 });
    }
    
    const existingUser = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });
    
    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(body.password, 10);
    
    const newUser = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        hashedPassword: hashedPassword,
        school: body.school,  
      },
    });
    
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Error creating user' }, { status: 500 });
  }
}
