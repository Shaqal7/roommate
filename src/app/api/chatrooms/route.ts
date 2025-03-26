import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

// Create a new chatroom
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { name, topicId, aiModel } = body;

    if (!name || !topicId || !aiModel) {
      return NextResponse.json(
        { message: "Name, topicId, and aiModel are required" },
        { status: 400 }
      );
    }

    // Verify the topic belongs to the user
    const topic = await prisma.topic.findFirst({
      where: {
        id: topicId,
        userId: session.user.id,
      },
    });

    if (!topic) {
      return NextResponse.json(
        { message: "Topic not found" },
        { status: 404 }
      );
    }

    const chatroom = await prisma.chatroom.create({
      data: {
        name,
        topicId,
        aiModel,
      },
    });

    return NextResponse.json(chatroom, { status: 201 });
  } catch (error: unknown) {
    console.error("Chatroom creation error:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}

// Get all chatrooms for a specific topic
export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const topicId = searchParams.get('topicId');

    if (!topicId) {
      return NextResponse.json(
        { message: "Topic ID is required" },
        { status: 400 }
      );
    }

    // Verify the topic belongs to the user
    const topic = await prisma.topic.findFirst({
      where: {
        id: topicId,
        userId: session.user.id,
      },
    });

    if (!topic) {
      return NextResponse.json(
        { message: "Topic not found" },
        { status: 404 }
      );
    }

    const chatrooms = await prisma.chatroom.findMany({
      where: {
        topicId,
      },
      include: {
        _count: {
          select: { messages: true },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(chatrooms);
  } catch (error: unknown) {
    console.error("Chatrooms retrieval error:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
