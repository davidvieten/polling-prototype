'use client';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';
import Image from 'next/image'

const NavBar = () => {
  const { status, data: session } = useSession();
  return (
    <div className="flex items-center bg-white p-4 space-x-4">
      <Link href="/" className="text-black hover:text-gray-500">
        Add Image Here.
      </Link>
      <Link href="/poy" className="text-black hover:text-gray-500">
        POY
      </Link>
      <Link href="/dpoy" className="text-black hover:text-gray-500">
        DPOY
      </Link>
      <Link href="/coy" className="text-black hover:text-gray-500">
        Coach of the Year
      </Link>
      <Link href="/team" className="text-black hover:text-gray-500">
        1st Team
      </Link>
      <div className="flex-grow"></div> {/* Spacer */}
      {status === 'loading' && <div className="text-gray-400">Loading...</div>}
      {status === 'authenticated' && (
        <div className="flex items-center text-black">
          <span>{session.user?.name}</span>
          <Link href="/api/auth/signout" className="ml-4 text-red-400 hover:text-red-600">
            Sign Out
          </Link>
        </div>
      )}
      {status === 'unauthenticated' && (
        <Link href="/api/auth/signin" className="text-black hover:text-gray-500">
          Login
        </Link>
      )}
    </div>
  );
};

export default NavBar;
