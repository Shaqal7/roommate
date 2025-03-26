"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ 
      redirect: false 
    });
    // Redirect to signin page after logout
    router.push('/auth/signin');
  };

  return (
    <button 
      onClick={handleLogout}
      className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-300"
    >
      Logout
    </button>
  );
}
