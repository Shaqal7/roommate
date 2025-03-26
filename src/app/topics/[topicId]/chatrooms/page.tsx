'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';

interface Chatroom {
  id: string;
  name: string;
  aiModel: string;
}

export default function TopicChatrooms() {
  const { data: session } = useSession();
  const params = useParams();
  const topicId = params.topicId as string;

  const [chatrooms, setChatrooms] = useState<Chatroom[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [topicTitle, setTopicTitle] = useState<string>('');

  useEffect(() => {
    const fetchTopicChatrooms = async () => {
      if (!session || !topicId) return;

      try {
        // Fetch topic details and chatrooms
        const response = await fetch(`/api/topics/${topicId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch topic details');
        }
        const data = await response.json();
        
        setChatrooms(data.chatrooms);
        setTopicTitle(data.title);
        setIsLoading(false);
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to load topic chatrooms';
        setError(errorMessage);
        setIsLoading(false);
      }
    };

    fetchTopicChatrooms();
  }, [session, topicId]);

  if (isLoading) {
    return (
      <div className="full-height bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <p className="text-gray-600 dark:text-gray-300">Loading chatrooms...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="full-height bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="full-height bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
      <main className="container mx-auto px-4 py-16 flex-grow">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-blue-800 dark:text-blue-400 mb-4">
            {topicTitle} Chatrooms
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Explore and manage chatrooms for this topic
          </p>
        </div>
        
        {chatrooms.length === 0 ? (
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              No chatrooms created for this topic yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {chatrooms.map((chatroom) => (
              <Link 
                key={chatroom.id} 
                href={`/topics/${topicId}/chatrooms/${chatroom.id}`} 
                className="transform transition-all duration-300 hover:scale-105"
              >
                <div className="card bg-white dark:bg-gray-700 hover:shadow-lg p-6 rounded-lg">
                  <h3 className="text-center text-xl font-semibold text-blue-800 dark:text-blue-300 mb-2">
                    {chatroom.name}
                  </h3>
                  <p className="text-center text-gray-600 dark:text-gray-300 text-sm">
                    AI Model: {chatroom.aiModel}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
        
        <div className="text-center mt-12">
          <Link 
            href={`/topics/${topicId}/chatrooms/new`} 
            className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 inline-block transition-colors"
          >
            Create New Chatroom
          </Link>
        </div>
      </main>
    </div>
  );
}
