import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import OpenAI from "openai";
import Anthropic from "@anthropic-ai/sdk";

// AI model integrations
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// Send a message to a chatroom
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
    const { chatroomId, content } = body;

    if (!chatroomId || !content) {
      return NextResponse.json(
        { message: "Chatroom ID and content are required" },
        { status: 400 }
      );
    }

    // Verify the chatroom belongs to the user
    const chatroom = await prisma.chatroom.findUnique({
      where: {
        id: chatroomId,
        topic: {
          userId: session.user.id,
        },
      },
    });

    if (!chatroom) {
      return NextResponse.json(
        { message: "Chatroom not found" },
        { status: 404 }
      );
    }

    // Save user message
    const userMessage = await prisma.message.create({
      data: {
        content,
        chatroomId,
        userId: session.user.id,
        isAi: false,
      },
    });

    // Retrieve previous messages for context
    const previousMessages = await prisma.message.findMany({
      where: { chatroomId },
      orderBy: { createdAt: "desc" },
      take: 10, // Limit to last 10 messages
    });

    // Prepare context for AI
    const context = previousMessages
      .reverse()
      .map((msg: { isAi: boolean; content: string }) => `${msg.isAi ? "AI" : "User"}: ${msg.content}`)
      .join("\n");

    // Generate AI response based on the selected model
    let aiResponse: string;
    switch (chatroom.aiModel) {
      case "gpt-4":
        const gptResponse = await openai.chat.completions.create({
          model: "gpt-4",
          messages: [
            { role: "system", content: "You are a helpful AI assistant." },
            { role: "user", content: `Context:\n${context}\n\nUser: ${content}` },
          ],
          stream: false,
        });
        aiResponse = gptResponse.choices[0].message.content || "I'm not sure how to respond.";
        break;

      case "claude":
        const claudeResponse = await anthropic.messages.create({
          model: "claude-3-5-sonnet-20241022",
          max_tokens: 300,
          messages: [
            { role: "user", content: `Context:\n${context}\n\nUser: ${content}` },
          ],
        });
        aiResponse = claudeResponse.content[0].text || "I'm not sure how to respond.";
        break;

      default:
        return NextResponse.json(
          { message: "Invalid AI model" },
          { status: 400 }
        );
    }

    // Save AI message
    const aiMessage = await prisma.message.create({
      data: {
        content: aiResponse,
        chatroomId,
        isAi: true,
      },
    });

    return NextResponse.json({
      userMessage,
      aiMessage,
    }, { status: 201 });
  } catch (error: unknown) {
    console.error("Message sending error:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}

// Get messages for a specific chatroom
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
    const chatroomId = searchParams.get('chatroomId');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');

    if (!chatroomId) {
      return NextResponse.json(
        { message: "Chatroom ID is required" },
        { status: 400 }
      );
    }

    // Verify the chatroom belongs to the user
    const chatroom = await prisma.chatroom.findUnique({
      where: {
        id: chatroomId,
        topic: {
          userId: session.user.id,
        },
      },
    });

    if (!chatroom) {
      return NextResponse.json(
        { message: "Chatroom not found" },
        { status: 404 }
      );
    }

    const messages = await prisma.message.findMany({
      where: { chatroomId },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    });

    const totalMessages = await prisma.message.count({
      where: { chatroomId },
    });

    return NextResponse.json({
      messages: messages.reverse(), // Reverse to show oldest first
      totalPages: Math.ceil(totalMessages / limit),
      currentPage: page,
    });
  } catch (error: unknown) {
    console.error("Messages retrieval error:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
