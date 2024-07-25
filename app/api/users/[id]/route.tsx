import { NextRequest, NextResponse } from "next/server";
import schema from "../schema";
import prisma from "@/prisma/client";



export async function GET(
    request: NextRequest,
    { params }: { params: { id: string} }) {
    
    const id = parseInt(params.id, 10)
    if (isNaN(id)) {
        return NextResponse.json({ error : "Invalid ID" }, { status: 400 })
    }


    const user = await prisma.user.findUnique({
        where: { id: id }
    });
    
    if (!user)
        return NextResponse.json({ error: 'User not found'}, { status: 404 });

    return NextResponse.json(user);
}

export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {

    // Validate the request body
    // If invalid, return 400
    const body = await request.json();
    const validation = schema.safeParse(body);

    if (!validation.success)
        return NextResponse.json(validation.error.errors, { status: 400 });
    
    // Fetch the user with the given id
    // If doesn't exist, return 404
    const user = await prisma.user.findUnique({
        where: {id: parseInt(params.id)}
    });

    if (!user)
        return NextResponse.json({ error: "User not found"}, { status: 404});
    
    // Update the user
    const updatedUser = await prisma.user.update({
        where: {id: user.id},
        data: {
            name: body.name,
            email: body.email
        }
    });
    // Return the updated user
    return NextResponse.json(updatedUser);

}


export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    // Fetch user from db
    const user = await prisma.user.findUnique({
        where: {id: parseInt(params.id)}
    });
    // If not found, return 404
    if (!user)
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    // Delete the user
    await prisma.user.delete({
        where: {id: user.id}
    });
    
    // Return 200    
    return NextResponse.json({});
}