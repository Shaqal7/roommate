'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ChatroomsRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to topics page
    router.replace('/topics');
  }, [router]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-blue-500"></div>
    </div>
  );
}
