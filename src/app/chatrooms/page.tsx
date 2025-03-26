import Link from 'next/link';

export default function Chatrooms() {
  const chatrooms = [
    {
      id: 1,
      name: 'Tech Startup Founders',
      topic: 'Tech Professionals',
      members: 24,
      description: 'Networking and collaboration for startup entrepreneurs',
      color: 'blue'
    },
    {
      id: 2,
      name: 'Design Studio Mates',
      topic: 'Artists & Creatives',
      members: 18,
      description: 'Shared living for creative professionals',
      color: 'purple'
    },
    {
      id: 3,
      name: 'Campus Coders',
      topic: 'Students',
      members: 36,
      description: 'Student housing for tech and programming enthusiasts',
      color: 'green'
    },
    {
      id: 4,
      name: 'Green Living Collective',
      topic: 'Eco-Friendly Living',
      members: 15,
      description: 'Sustainable living community',
      color: 'teal'
    }
  ];

  return (
    <div className="full-height bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
      <main className="container mx-auto px-4 py-16 flex-grow">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-blue-800 dark:text-blue-400 mb-4">
            Explore Chatrooms
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Join communities that match your interests, lifestyle, and living preferences.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {chatrooms.map((chatroom) => (
            <Link 
              key={chatroom.id} 
              href={`/chatrooms/${chatroom.id}`} 
              className="transform transition-all duration-300 hover:scale-105"
            >
              <div className={`card bg-${chatroom.color}-100 dark:bg-gray-700 hover:shadow-lg`}>
                <div className="flex items-center mb-4">
                  <div className={`w-12 h-12 rounded-full bg-${chatroom.color}-200 dark:bg-gray-600 flex items-center justify-center mr-4`}>
                    <span className={`text-xl text-${chatroom.color}-600 dark:text-${chatroom.color}-400`}>
                      {chatroom.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3 className={`text-xl font-semibold text-${chatroom.color}-800 dark:text-${chatroom.color}-300`}>
                      {chatroom.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {chatroom.topic}
                    </p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                  {chatroom.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                    </svg>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {chatroom.members}
                    </span>
                  </div>
                  <span className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                    Join
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-12">
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            Want to create your own chatroom?
          </p>
          <Link 
            href="/chatrooms/new" 
            className="btn btn-primary inline-block"
          >
            Create Chatroom
          </Link>
        </div>
      </main>
    </div>
  );
}
