'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const NavBar = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch('/api/users/me');
        if (response.ok) {
          const user = await response.json();
          setIsAdmin(user.isAdmin);
          console.log('User details:', user.isAdmin);
        } else {
          console.error('Failed to fetch user details');
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  if (loading) {
    return <div className="text-gray-400">Loading...</div>;
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
      <Link href="/vote" className="text-white hover:text-gray-400">
        Voting Dashboard
      </Link>

      <div className="flex-grow"></div> {/* Spacer */}

      {/* Conditionally render the Admin Dashboard link */}
      {isAdmin && (
        <Link href="/admin" className="text-white hover:text-gray-400">
          Admin Dashboard
        </Link>
      )}

      <div className="flex items-center text-white">
        <Link href="/api/auth/signout" className="ml-4 text-red-400 hover:text-red-600">
          Sign Out
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
