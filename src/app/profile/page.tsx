import Link from 'next/link';

export default function Profile() {
  return (
    <div className="full-height bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
      <main className="container mx-auto px-4 py-16 flex-grow">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <div className="card space-y-4 text-center">
              <div className="w-32 h-32 mx-auto bg-blue-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                <span className="text-4xl text-blue-600 dark:text-blue-400">
                  JD
                </span>
              </div>
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                John Doe
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Software Engineer
              </p>
              <div className="space-y-2">
                <Link href="/profile/edit" className="btn btn-primary w-full">
                  Edit Profile
                </Link>
                <Link href="/profile/preferences" className="btn btn-secondary w-full">
                  Roommate Preferences
                </Link>
              </div>
            </div>
          </div>
          <div className="md:col-span-2 space-y-6">
            <div className="card">
              <h3 className="text-lg font-semibold mb-4 text-blue-800 dark:text-blue-400">
                About Me
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Passionate software engineer looking for a collaborative and friendly living environment. 
                I enjoy coding, hiking, and trying out new coffee shops.
              </p>
            </div>
            <div className="card">
              <h3 className="text-lg font-semibold mb-4 text-blue-800 dark:text-blue-400">
                Current Roommate Status
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-100 dark:bg-gray-700 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-blue-700 dark:text-blue-300 mb-2">
                    Seeking
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    Shared Apartment
                  </p>
                </div>
                <div className="bg-green-100 dark:bg-gray-700 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-green-700 dark:text-green-300 mb-2">
                    Preferred Location
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    Downtown Area
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
