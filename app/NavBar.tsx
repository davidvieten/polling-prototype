'use client';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';

const NavBar = () => {
  const { status, data: session } = useSession();
  return (
    <div className="flex items-center bg-black p-4 space-x-4">
      <Link href="/" className="text-white hover:text-gray-300">
        Home
      </Link>
      <Link href="/poy" className="text-white hover:text-gray-300">
        POY
      </Link>
      <Link href="/dpoy" className="text-white hover:text-gray-300">
        DPOY
      </Link>
      <Link href="/coy" className="text-white hover:text-gray-300">
        Coach of the Year
      </Link>
      <div className="flex-grow"></div> {/* Spacer */}
      {status === 'loading' && <div className="text-gray-400">Loading...</div>}
      {status === 'authenticated' && (
        <div className="flex items-center text-white">
          <span>{session.user?.name}</span>
          <Link href="/api/auth/signout" className="ml-4 text-red-400 hover:text-red-600">
            Sign Out
          </Link>
        </div>
      )}
      {status === 'unauthenticated' && (
        <Link href="/api/auth/signin" className="text-white hover:text-gray-300">
          Login
        </Link>
      )}
    </div>
  );
};

export default NavBar;
