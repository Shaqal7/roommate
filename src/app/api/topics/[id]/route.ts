import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

// Get a specific topic with its chatrooms
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

    const topic = await prisma.topic.findUnique({
      where: {
        id,
      },
      include: {
        chatrooms: true,
      },
    });

    if (!topic || topic.userId !== session.user.id) {
      return NextResponse.json(
        { message: "Topic not found or unauthorized" },
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

// Delete a specific topic
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

    // First, verify the topic belongs to the user
    const existingTopic = await prisma.topic.findUnique({
      where: {
        id,
      },
    });

    if (!existingTopic || existingTopic.userId !== session.user.id) {
      return NextResponse.json(
        { message: "Topic not found or unauthorized" },
        { status: 404 }
      );
    }

    await prisma.topic.delete({
      where: {
        id,
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
