"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useParams } from "next/navigation";

interface Message {
  id: string;
  content: string;
  isAi: boolean;
  createdAt: string;
  user?: {
    id: string;
    name: string | null;
    image: string | null;
  };
}

interface Chatroom {
  id: string;
  name: string;
  aiModel: string;
  topic: {
    id: string;
    title: string;
  };
}

export default function ChatroomPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [chatroom, setChatroom] = useState<Chatroom | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSendingMessage, setIsSendingMessage] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const params = useParams();
  const chatroomId = params.chatroomId as string;

  useEffect(() => {
    fetchChatroomDetails();
    fetchMessages();
  }, [chatroomId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchChatroomDetails = async () => {
    try {
      const response = await fetch(`/api/chatrooms/${chatroomId}`);
      
      if (!response.ok) {
        if (response.status === 401) {
          router.push("/auth/signin");
          return;
        }
        throw new Error("Failed to fetch chatroom details");
      }

      const data = await response.json();
      setChatroom(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : String(err));
    }
  };

  const fetchMessages = async () => {
    try {
      const response = await fetch(`/api/messages?chatroomId=${chatroomId}`);
      
      if (!response.ok) {
        if (response.status === 401) {
          router.push("/auth/signin");
          return;
        }
        throw new Error("Failed to fetch messages");
      }

      const data = await response.json();
      setMessages(data.messages);
      setIsLoading(false);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : String(err));
      setIsLoading(false);
    }
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim()) return;

    setIsSendingMessage(true);
    setError(null);

    try {
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chatroomId,
          content: newMessage,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to send message");
      }

      const { userMessage, aiMessage } = await response.json();
      setMessages(prevMessages => [...prevMessages, userMessage, aiMessage]);
      setNewMessage("");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setIsSendingMessage(false);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  if (!chatroom) {
    return <div>Chatroom not found</div>;
  }

  return (
    <div className="flex flex-col h-full">
      <div className="bg-white dark:bg-gray-800 shadow-md p-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">{chatroom.name}</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Topic: {chatroom.topic.title} | AI: {chatroom.aiModel}
          </p>
        </div>
        <button 
          onClick={() => router.push(`/topics/${chatroom.topic.id}/chatrooms`)}
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          Back to Topic
        </button>
      </div>

      <div className="flex-grow overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`flex ${
              message.isAi ? "justify-start" : "justify-end"
            }`}
          >
            <div 
              className={`max-w-[70%] p-3 rounded-lg ${
                message.isAi 
                  ? "bg-gray-200 dark:bg-gray-700" 
                  : "bg-blue-500 text-white"
              }`}
            >
              <p>{message.content}</p>
              {!message.isAi && message.user && (
                <div className="text-xs text-gray-300 mt-1">
                  {message.user.name}
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          {error}
        </div>
      )}

      <form 
        onSubmit={sendMessage} 
        className="bg-white dark:bg-gray-800 p-4 border-t dark:border-gray-700 flex items-center"
      >
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-grow px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          disabled={isSendingMessage}
        />
        <button
          type="submit"
          disabled={!newMessage.trim() || isSendingMessage}
          className="ml-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSendingMessage ? "Sending..." : "Send"}
        </button>
      </form>
    </div>
  );
}
