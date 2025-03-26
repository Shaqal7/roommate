"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import LogoutButton from './auth/LogoutButton';

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { href: '/topics', label: 'Topics' },
    { href: '/profile', label: 'Profile' },
  ];

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <div className="flex space-x-4">
          {navItems.map((item) => (
            <Link 
              key={item.href}
              href={item.href}
              className={`
                text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 
                ${pathname === item.href ? 'font-bold text-blue-600 dark:text-blue-400' : ''}
              `}
            >
              {item.label}
            </Link>
          ))}
        </div>
        <LogoutButton />
      </div>
    </nav>
  );
}
