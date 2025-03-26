import Link from 'next/link';

export default function Topics() {
  const topics = [
    { 
      id: 1, 
      name: 'Tech Professionals', 
      description: 'For those working in technology and software',
      color: 'blue'
    },
    { 
      id: 2, 
      name: 'Artists & Creatives', 
      description: 'Community for artists, designers, and creative minds',
      color: 'purple'
    },
    { 
      id: 3, 
      name: 'Students', 
      description: 'Connecting students looking for shared living spaces',
      color: 'green'
    },
    { 
      id: 4, 
      name: 'Eco-Friendly Living', 
      description: 'Sustainable and environmentally conscious roommates',
      color: 'teal'
    }
  ];

  return (
    <div className="full-height bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
      <main className="container mx-auto px-4 py-16 flex-grow">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-blue-800 dark:text-blue-400 mb-4">
            Find Your Community
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Explore different topics and find roommates who share your interests, lifestyle, and goals.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {topics.map((topic) => (
            <Link 
              key={topic.id} 
              href={`/topics/${topic.id}/chatrooms`} 
              className="transform transition-all duration-300 hover:scale-105"
            >
              <div className={`card bg-${topic.color}-100 dark:bg-gray-700 hover:shadow-lg`}>
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-${topic.color}-200 dark:bg-gray-600 flex items-center justify-center`}>
                  <span className={`text-2xl text-${topic.color}-600 dark:text-${topic.color}-400`}>
                    {topic.name.charAt(0)}
                  </span>
                </div>
                <h3 className={`text-center text-xl font-semibold text-${topic.color}-800 dark:text-${topic.color}-300 mb-2`}>
                  {topic.name}
                </h3>
                <p className="text-center text-gray-600 dark:text-gray-300 text-sm">
                  {topic.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-12">
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            Don&apos;t see a topic that fits you?
          </p>
          <Link 
            href="/topics/new" 
            className="btn btn-primary inline-block"
          >
            Create New Topic
          </Link>
        </div>
      </main>
    </div>
  );
}
