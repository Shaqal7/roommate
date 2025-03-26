'use client';

import React, { useState } from 'react';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

// Modal for adding new topics
const AddTopicModal = ({ isOpen, onClose, onAddTopic }: {
  isOpen: boolean;
  onClose: () => void;
  onAddTopic: (topicName: string) => Promise<void>;
}) => {
  const [topicName, setTopicName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topicName.trim()) return;

    setIsSubmitting(true);
    try {
      await onAddTopic(topicName);
      setTopicName('');
      onClose();
    } catch (error) {
      console.error('Failed to add topic:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-96">
        <h2 className="text-xl font-bold mb-4">Add New Topic</h2>
        <form onSubmit={handleSubmit}>
          <input 
            type="text"
            value={topicName}
            onChange={(e) => setTopicName(e.target.value)}
            placeholder="Enter topic name"
            className="w-full p-2 border rounded mb-4"
            required
          />
          <div className="flex justify-between">
            <button 
              type="button"
              onClick={onClose}
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button 
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
            >
              {isSubmitting ? 'Adding...' : 'Add Topic'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Main Action Bar Component
export default function ActionBar() {
  const router = useRouter();
  const [isAddTopicModalOpen, setIsAddTopicModalOpen] = useState(false);

  // Function to add a new topic
  const handleAddTopic = async (topicName: string) => {
    try {
      const response = await fetch('/api/topics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: topicName }),
      });

      if (!response.ok) {
        throw new Error('Failed to add topic');
      }

      // Optionally, you can refresh the topics page or show a success message
      router.refresh();
    } catch (error) {
      console.error('Error adding topic:', error);
      throw error;
    }
  };

  // Logout handler
  const handleLogout = async () => {
    try {
      await signOut({ 
        redirect: true, 
        callbackUrl: '/auth/signin' 
      });
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg p-4 flex justify-between items-center z-40">
      <button 
        onClick={() => setIsAddTopicModalOpen(true)}
        className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 flex items-center space-x-2 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
        </svg>
        <span>New Topic</span>
      </button>

      <button 
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 flex items-center space-x-2 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L14.586 11H7a1 1 0 110-2h7.586l-1.293-1.293a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
        <span>Logout</span>
      </button>

      <AddTopicModal 
        isOpen={isAddTopicModalOpen}
        onClose={() => setIsAddTopicModalOpen(false)}
        onAddTopic={handleAddTopic}
      />
    </div>
  );
}
