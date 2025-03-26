import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

// Get a specific chatroom
export async function GET(
  request: NextRequest, 
  context: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await Promise.resolve(context.params);

    const chatroom = await prisma.chatroom.findUnique({
      where: {
        id,
        topic: {
          userId: session.user.id,
        },
      },
      include: {
        topic: true,
        messages: {
          orderBy: {
            createdAt: "asc",
          },
          take: 50, // Limit to last 50 messages
        },
      },
    });

    if (!chatroom) {
      return NextResponse.json(
        { message: "Chatroom not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(chatroom);
  } catch (error: unknown) {
    console.error("Chatroom retrieval error:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}

// Update a specific chatroom
export async function PUT(
  request: NextRequest, 
  context: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { name, aiModel } = body;

    if (!name || !aiModel) {
      return NextResponse.json(
        { message: "Name and AI model are required" },
        { status: 400 }
      );
    }

    const { id } = await Promise.resolve(context.params);

    const updatedChatroom = await prisma.chatroom.update({
      where: {
        id,
        topic: {
          userId: session.user.id,
        },
      },
      data: {
        name,
        aiModel,
      },
    });

    return NextResponse.json(updatedChatroom);
  } catch (error: unknown) {
    console.error("Chatroom update error:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}

// Delete a specific chatroom
export async function DELETE(
  request: NextRequest, 
  context: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await Promise.resolve(context.params);

    await prisma.chatroom.delete({
      where: {
        id,
        topic: {
          userId: session.user.id,
        },
      },
    });

    return NextResponse.json(
      { message: "Chatroom deleted successfully" },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Chatroom deletion error:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
