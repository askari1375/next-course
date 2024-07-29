import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { z } from "zod";
import bcrypt from 'bcrypt';


const schema = z.object({
    email: z.string().email(),
    oldPassword: z.string().min(3),
    newPassword: z.string().min(3)
})

export async function POST(request:NextRequest) {

    const body = await request.json();

    const validation = schema.safeParse(body);
    if (!validation.success)
        return NextResponse.json(validation.error.errors, { status: 400 });
    
    console.log(body)

    const user = await prisma.user.findUnique({
        where: { email: body.email}
    });

    if (!user)
        return NextResponse.json({ error: "user not found"}, { status: 404 });

    const passwordsMatch = await bcrypt.compare(body.oldPassword, user.hashedPassword!);
    
    if (!passwordsMatch)
        return NextResponse.json({ error: "Old password is incorrect" }, { status: 401 });

    const hashedNewPassword = await bcrypt.hash(body.newPassword, 10);

    const updatedUser = await prisma.user.update({
        where: { email: user.email! },
        data: { hashedPassword: hashedNewPassword}
    });

    return NextResponse.json(updatedUser, { status: 200});

}