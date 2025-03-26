import Link from 'next/link';

export default function SignUp() {
  return (
    <div className="full-height bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
      <div className="card w-full max-w-md p-8 space-y-6 animate-fade-in">
        <h1 className="text-center text-2xl font-bold text-blue-800 dark:text-blue-400">
          Create Your RoomMate Account
        </h1>
        <form className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Full Name
            </label>
            <input 
              type="text" 
              id="name" 
              className="input" 
              placeholder="Enter your full name" 
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
