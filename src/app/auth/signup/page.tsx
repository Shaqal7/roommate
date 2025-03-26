'use client';

import Link from 'next/link';
import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Redirect to sign-in page or dashboard
        router.push('/auth/signin');
      } else {
        // Handle error from server
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
      console.error('Registration error:', err);
    }
  };

  return (
    <div className="full-height bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
      <div className="card w-full max-w-md p-8 space-y-6 animate-fade-in">
        <h1 className="text-center text-2xl font-bold text-blue-800 dark:text-blue-400">
          Create Your RoomMate Account
        </h1>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Full Name
            </label>
            <input 
              type="text" 
              id="name" 
              className="input" 
              placeholder="Enter your full name" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              required 
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email Address
            </label>
            <input 
              type="email" 
              id="email" 
              className="input" 
              placeholder="Enter your email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Password
            </label>
            <input 
              type="password" 
              id="password" 
              className="input" 
              placeholder="Create a strong password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>
          <div>
            <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Confirm Password
            </label>
            <input 
              type="password" 
              id="confirm-password" 
              className="input" 
              placeholder="Repeat your password" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required 
            />
          </div>
          <div className="flex items-center">
            <input 
              id="terms" 
              type="checkbox" 
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" 
              required 
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
              I agree to the{' '}
              <Link href="/terms" className="text-blue-600 hover:underline dark:text-blue-400">
                Terms of Service
              </Link>
            </label>
          </div>
          <div>
            <button 
              type="submit" 
              className="btn btn-primary w-full"
            >
              Create Account
            </button>
          </div>
        </form>
        <div className="text-center">
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{' '}
            <Link href="/auth/signin" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
