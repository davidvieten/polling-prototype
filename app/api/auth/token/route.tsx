import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

    if (token) {
        // The user is authenticated and token contains user information
        return NextResponse.json(token);
    } else {
        // The user is not authenticated
        return NextResponse.json({ error: 'Authentication token not found' }, { status: 401 });
    }
}
