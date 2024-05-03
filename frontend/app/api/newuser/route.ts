import prisma from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
	const user = await request.json();
    const match = await prisma.user.findUnique({
    where: {
        email: user.email as string,
    },
    });

    if (!match) {
    await prisma.user.create({
        data: {
        name: user.displayName as string,
        avatar: user.photoURL as string,
        email: user.email as string,
        },
    });


    return NextResponse.json({ data: "User creation completed" },{status: 200});
    }

    return NextResponse.json({ data: "User already exists" },{status: 200});

}

export const dynamic = "force-static";