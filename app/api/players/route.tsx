import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const name = searchParams.get('name') || '';
        const school = searchParams.get('school') || '';
        const position = searchParams.get('position') || '';

        const players = await prisma.player.findMany({
            where: {
                name: {
                    contains: name,
                },
                school: {
                    contains: school,
                },
                position: {
                    contains: position,
                },
            },
            select: {
                id: true,
                name: true,
                school: true,
                position: true,
            },
        });

        return NextResponse.json(players);
    } catch (error) {
        console.error('Error fetching players:', error);
        return NextResponse.json({ error: 'Error fetching players' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const newPlayer = await prisma.player.create({
            data: {
                name: body.name,
                school: body.school,
                position: body.position,
            },
        });

        return NextResponse.json(newPlayer, { status: 201 });
    } catch (error) {
        console.error('Error creating player:', error);
        return NextResponse.json({ error: 'Error creating player' }, { status: 500 });
    }
}[]
