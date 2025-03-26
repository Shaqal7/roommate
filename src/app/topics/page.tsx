'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { TrashIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/navigation';

interface Topic {
  id: string;  // Changed to string to match Prisma model
  title: string;
  description?: string;
}

export default function Topics() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [topics, setTopics] = useState<Topic[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const getTopicColor = (index: number) => {
    const colors = ['blue', 'purple', 'green', 'teal', 'indigo', 'pink'];
    return colors[index % colors.length];
  };

  useEffect(() => {
    // Redirect to signin if not authenticated
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
      return;
    }
    
    const fetchTopics = async () => {
      if (!session) return;

      try {
        const response = await fetch('/api/topics');
        if (!response.ok) {
          throw new Error('Failed to fetch topics');
        }
        const data = await response.json();
        setTopics(data);
        setIsLoading(false);
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to load topics';
        setError(errorMessage);
        setIsLoading(false);
      }
    };

    fetchTopics();
  }, [session]);

  const handleDeleteTopic = async (topicId: string, event: React.MouseEvent) => {
    // Prevent link navigation when clicking delete
    event.preventDefault();
    
    if (!session) return;

    const confirmDelete = window.confirm('Are you sure you want to delete this topic? All associated chatrooms will also be deleted.');
    
    if (!confirmDelete) return;

    try {
      const response = await fetch(`/api/topics/${topicId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete topic');
      }

      // Remove the deleted topic from the list
      setTopics(topics.filter(topic => topic.id !== topicId));
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete topic';
      setError(errorMessage);
    }
  };

  if (isLoading) {
    return (
      <div className="h-full bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <p className="text-gray-600 dark:text-gray-300">Loading topics...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="h-full bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
      <main className="container mx-auto px-4 py-6 flex-grow">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-blue-800 dark:text-blue-400 mb-4">
            Your Topics
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Explore and manage your topics
          </p>
        </div>
        
        {topics.length === 0 ? (
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              You haven&apos;t created any topics yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {topics.map((topic, index) => (
              <div 
                key={topic.id} 
                className="relative transform transition-all duration-300 hover:scale-105"
              >
                <Link 
                  href={`/topics/${topic.id}/chatrooms`} 
                  className="block"
                >
                  <div className={`card bg-${getTopicColor(index)}-100 dark:bg-gray-700 hover:shadow-lg p-6 rounded-lg`}>
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-${getTopicColor(index)}-200 dark:bg-gray-600 flex items-center justify-center`}>
                      <span className={`text-2xl text-${getTopicColor(index)}-600 dark:text-${getTopicColor(index)}-400`}>
                        {topic.title.charAt(0)}
                      </span>
                    </div>
                    <h3 className={`text-center text-xl font-semibold text-${getTopicColor(index)}-800 dark:text-${getTopicColor(index)}-300 mb-2`}>
                      {topic.title}
                    </h3>
                    {topic.description && (
                      <p className="text-center text-gray-600 dark:text-gray-300 text-sm">
                        {topic.description}
                      </p>
                    )}
                  </div>
                </Link>
                <button 
                  onClick={(e) => handleDeleteTopic(topic.id, e)}
                  className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                  title="Delete Topic"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>
        )}
        
        <div className="text-center mt-12">
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            Want to create a new topic?
          </p>
          <Link 
            href="/topics/new" 
            className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 inline-block transition-colors"
          >
            Create New Topic
          </Link>
        </div>
      </main>
    </div>
  );
}
