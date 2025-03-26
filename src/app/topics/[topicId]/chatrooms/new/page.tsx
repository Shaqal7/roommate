"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

const AI_MODELS = [
  { id: "claude", name: "Claude (Anthropic)" },
  { id: "gpt-4", name: "GPT-4 (OpenAI)" },
];

export default function NewChatroomPage() {
  const [name, setName] = useState("");
  const [aiModel, setAiModel] = useState(AI_MODELS[0].id);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const params = useParams();
  const topicId = params.topicId as string;

  const handleCreateChatroom = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/chatrooms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          topicId,
          aiModel,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create chatroom");
      }

      const createdChatroom = await response.json();
      router.push(`/chatrooms/${createdChatroom.id}`);
    } catch (err: any) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Create New Chatroom</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          {error}
        </div>
      )}

      <form 
        onSubmit={handleCreateChatroom} 
        className="max-w-md mx-auto bg-white dark:bg-gray-800 shadow-md rounded-lg p-8"
      >
        <div className="mb-4">
          <label 
            htmlFor="name" 
            className="block text-gray-700 dark:text-gray-300 mb-2"
          >
            Chatroom Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            required
            placeholder="Enter chatroom name"
          />
        </div>

        <div className="mb-4">
          <label 
            htmlFor="aiModel" 
            className="block text-gray-700 dark:text-gray-300 mb-2"
          >
            AI Model
          </label>
          <select
            id="aiModel"
            value={aiModel}
            onChange={(e) => setAiModel(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          >
            {AI_MODELS.map((model) => (
              <option key={model.id} value={model.id}>
                {model.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Creating Chatroom..." : "Create Chatroom"}
        </button>
      </form>
    </div>
  );
}
