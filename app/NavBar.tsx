'use client';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';

const NavBar = () => {
  const { status, data: session } = useSession();

  // If there is no session, don't render the navbar
  if (status === 'unauthenticated') {
    return null;
  }

  return (
    <div className="flex items-center bg-black h-20 p-6 space-x-4">
      <Link href="/">
        <Image 
          src="/SSL23LOGO copy.png" 
          alt="Logo" 
          width={100} 
          height={100} 
          className="cursor-pointer"
        />
      </Link>
      <Link href="/poy" className="text-white hover:text-gray-400">
        POY
      </Link>
      <Link href="/dpoy" className="text-white hover:text-gray-400">
        DPOY
      </Link>
      <Link href="/coy" className="text-white hover:text-gray-400">
        Coach of the Year
      </Link>
      <Link href="/team" className="text-white hover:text-gray-400">
        1st Team
      </Link>
      <div className="flex-grow"></div> {/* Spacer */}
      <Link href="/admin" className="text-white hover:text-gray-400">
          Admin Dashboard
      </Link>
      {status === 'loading' && <div className="text-gray-400">Loading...</div>}
      {status === 'authenticated' && (
        <div className="flex items-center text-white">
          <Link href="/api/auth/signout" className="ml-4 text-red-400 hover:text-red-600">
            Sign Out
          </Link>
        </div>
      )}
    </div>
  );
};

export default NavBar;
