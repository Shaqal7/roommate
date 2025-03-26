"use client";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ 
      redirect: false 
    });
    // Redirect to signin page after logout
    router.push('/auth/signin');
  };

  // Only render the logout button if a session exists
  if (!session) return null;

  return (
    <button 
      onClick={handleLogout}
      className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded text-sm transition duration-300"
    >
      Logout
    </button>
  );
}
