import Link from 'next/link';

export default function Home() {
  return (
    <div className="full-height bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
      <main className="container mx-auto px-4 py-16 flex-grow flex items-center justify-center">
        <div className="card max-w-2xl text-center space-y-6 animate-fade-in">
          <h1 className="text-4xl font-extrabold text-blue-800 dark:text-blue-400">
            Welcome to RoomMate
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            Connect, Collaborate, and Create Meaningful Connections
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/auth/signin" className="btn btn-primary">
              Sign In
            </Link>
            <Link href="/auth/signup" className="btn btn-secondary">
              Sign Up
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-8">
            <div className="bg-blue-100 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="text-blue-700 dark:text-blue-300 mb-2">Connect</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Find like-minded roommates
              </p>
            </div>
            <div className="bg-green-100 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="text-green-700 dark:text-green-300 mb-2">Collaborate</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Share spaces and experiences
              </p>
            </div>
            <div className="bg-purple-100 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="text-purple-700 dark:text-purple-300 mb-2">Communicate</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Chat and plan together
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
