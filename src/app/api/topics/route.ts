import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

// Create a new topic
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
const { name, description } = body;

    if (!name) {
      return NextResponse.json(
        { message: "Topic name is required" },
        { status: 400 }
      );
    }

    const topic = await prisma.topic.create({
      data: {
        title: name,
        description,
        userId: session.user.id,
      },
    });

    return NextResponse.json(topic, { status: 201 });
  } catch (error: unknown) {
    console.error("Topic creation error:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}

// Get all topics for the current user
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const topics = await prisma.topic.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        chatrooms: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(topics);
  } catch (error: unknown) {
    console.error("Topics retrieval error:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
