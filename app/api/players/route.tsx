import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { PositionCategory, SchoolCategory } from "@prisma/client";

// Type for the expected structure of the Player
type Player = {
    name: string;
    school: string;
    position: string;
};

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const name = searchParams.get('name') || '';
        const school = searchParams.get('school') || '';
        const position = searchParams.get('position') as PositionCategory | null;

        const players = await prisma.player.findMany({
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
        const body: Player = await request.json();
        const newPlayer = await prisma.player.create({
            data: {
                name: body.name,
                school: body.school as SchoolCategory,
                position: body.position as PositionCategory,
            },
        });

        return NextResponse.json(newPlayer, { status: 201 });
    } catch (error) {
        console.error('Error creating player:', error);
        return NextResponse.json({ error: 'Error creating player' }, { status: 500 });
    }
}
