import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

// Get a specific topic
export async function GET(
  request: Request, 
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const topic = await prisma.topic.findUnique({
      where: {
        id: params.id,
        userId: session.user.id,
      },
      include: {
        chatrooms: true,
      },
    });

    if (!topic) {
      return NextResponse.json(
        { message: "Topic not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(topic);
  } catch (error: unknown) {
    console.error("Topic retrieval error:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}

// Update a specific topic
export async function PUT(
  request: Request, 
  { params }: { params: { id: string } }
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
    const { title, description } = body;

    if (!title) {
      return NextResponse.json(
        { message: "Title is required" },
        { status: 400 }
      );
    }

    const updatedTopic = await prisma.topic.update({
      where: {
        id: params.id,
        userId: session.user.id,
      },
      data: {
        title,
        description,
      },
    });

    return NextResponse.json(updatedTopic);
  } catch (error: unknown) {
    console.error("Topic update error:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}

// Delete a specific topic
export async function DELETE(
  request: Request, 
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    await prisma.topic.delete({
      where: {
        id: params.id,
        userId: session.user.id,
      },
    });

    return NextResponse.json(
      { message: "Topic deleted successfully" },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Topic deletion error:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
