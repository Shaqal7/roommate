"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Topic {
  id: string;
  title: string;
  description?: string;
  createdAt: string;
  chatrooms: Chatroom[];
}

interface Chatroom {
  id: string;
  name: string;
  aiModel: string;
}

export default function TopicsPage() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [newTopic, setNewTopic] = useState({ title: "", description: "" });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchTopics();
  }, []);

  const fetchTopics = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/topics");
      
      if (!response.ok) {
        if (response.status === 401) {
          router.push("/auth/signin");
          return;
        }
        throw new Error("Failed to fetch topics");
      }

      const data = await response.json();
      setTopics(data);
      setIsLoading(false);
    } catch (err: any) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  const handleCreateTopic = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch("/api/topics", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTopic),
      });

      if (!response.ok) {
        throw new Error("Failed to create topic");
      }

      const createdTopic = await response.json();
      setTopics([createdTopic, ...topics]);
      setNewTopic({ title: "", description: "" });
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleDeleteTopic = async (topicId: string) => {
    try {
      const response = await fetch(`/api/topics/${topicId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete topic");
      }

      setTopics(topics.filter(topic => topic.id !== topicId));
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Topics</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleCreateTopic} className="mb-8 bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 dark:text-gray-300 mb-2">
            Topic Title
          </label>
          <input
            type="text"
            id="title"
            value={newTopic.title}
            onChange={(e) => setNewTopic({ ...newTopic, title: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 dark:text-gray-300 mb-2">
            Description (Optional)
          </label>
          <textarea
            id="description"
            value={newTopic.description}
            onChange={(e) => setNewTopic({ ...newTopic, description: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            rows={3}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Create Topic
        </button>
      </form>

      {topics.length === 0 ? (
        <div className="text-center text-gray-600 dark:text-gray-400">
          No topics yet. Create your first topic!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topics.map((topic) => (
            <div 
              key={topic.id} 
              className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 relative"
            >
              <button
                onClick={() => handleDeleteTopic(topic.id)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                title="Delete Topic"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-6 w-6" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" 
                  />
                </svg>
              </button>
              <h2 className="text-xl font-semibold mb-2">{topic.title}</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {topic.description || "No description"}
              </p>
              <div className="mt-4">
                <h3 className="text-lg font-medium mb-2">Chatrooms</h3>
                {topic.chatrooms.length === 0 ? (
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    No chatrooms yet
                  </p>
                ) : (
                  <ul className="space-y-2">
                    {topic.chatrooms.map((chatroom) => (
                      <li key={chatroom.id}>
                        <Link 
                          href={`/chatrooms/${chatroom.id}`} 
                          className="text-blue-600 dark:text-blue-400 hover:underline flex items-center"
                        >
                          {chatroom.name} 
                          <span className="ml-2 text-xs bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">
                            {chatroom.aiModel}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
                <Link 
                  href={`/topics/${topic.id}/chatrooms/new`} 
                  className="mt-2 inline-block text-sm text-green-600 dark:text-green-400 hover:underline"
                >
                  + Create Chatroom
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
