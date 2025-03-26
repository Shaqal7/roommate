'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function ChatroomRedirect() {
  const router = useRouter();
  const params = useParams();
  const chatroomId = params.chatroomId as string;
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChatroomDetails = async () => {
      try {
        // Fetch the chatroom to get its topic ID
        const response = await fetch(`/api/chatrooms/${chatroomId}`);
        
        if (!response.ok) {
          if (response.status === 401) {
            router.push('/auth/signin');
            return;
          }
          throw new Error('Failed to fetch chatroom details');
        }

        const data = await response.json();
        
        // Redirect to the topic-specific chatroom page
        router.replace(`/topics/${data.topic.id}/chatrooms/${chatroomId}`);
      } catch (err: unknown) {
        console.error('Error fetching chatroom:', err);
        setError('Could not find chatroom details. Redirecting to topics...');
        
        // If we can't get the topic ID, redirect to the topics page
        setTimeout(() => {
          router.replace('/topics');
        }, 2000);
      } finally {
        setIsLoading(false);
      }
    };

    fetchChatroomDetails();
  }, [chatroomId, router]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500 mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-blue-500"></div>
    </div>
  );
}
