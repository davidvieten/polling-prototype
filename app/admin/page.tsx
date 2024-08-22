'use client';
import Link from "next/link";
import { useEffect, useState } from 'react';
import VotesList from "../components/VotesList"; // Import the VotesList component

const Admin = () => {
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

  if (!isAdmin) {
    return (
      <main className="min-h-screen bg-white dark:bg-gray-900 p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-extrabold text-black dark:text-white mb-8">
            Access Denied
          </h1>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            You do not have permission to access this page.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold text-black dark:text-white mb-8">
          Admin Dashboard
        </h1>

        <div className="mt-8">
          <h2 className="text-3xl font-bold text-black dark:text-white mb-4">
            Welcome, Admin
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            This is the administration area where you can manage the voting system, view results, and manage coaches.
          </p>

          <section className="mb-10">
            <h3 className="text-2xl font-semibold text-black dark:text-white mb-4">
              All Votes
            </h3>
            <Link href="/admin/display-votes">
              <div className="block p-4 bg-gray-500 text-white rounded-md shadow-md hover:bg-gray-600 transition">
                View all votes
              </div>
            </Link>
          </section>


          <section className="mb-10">
            <h3 className="text-2xl font-semibold text-black dark:text-white mb-4">
              Manage Deadlines
            </h3>
            <Link href="/admin/categories">
              <div className="block p-4 bg-gray-500 text-white rounded-md shadow-md hover:bg-gray-600 transition">
                Place time restrictions on voting
              </div>
            </Link>
          </section>

          <section className="mb-10">
            <h3 className="text-2xl font-semibold text-black dark:text-white mb-4">
              User Management
            </h3>
            <Link href="/admin/manage-coaches">
              <div className="block p-4 bg-gray-500 text-white rounded-md shadow-md hover:bg-gray-600 transition">
                View and Manage Coaches
              </div>
            </Link>
          </section>

          <section className="mb-10">
            <h3 className="text-2xl font-semibold text-black dark:text-white mb-4">
              Player Management
            </h3>
            <Link href="/admin/manage-players">
              <div className="block p-4 bg-gray-500 text-white rounded-md shadow-md hover:bg-gray-600 transition">
                View and Manage Players
              </div>
            </Link>
          </section>

          <section className="mb-10">
            <h3 className="text-2xl font-semibold text-black dark:text-white mb-4">
              System Settings
            </h3>
            <Link href="/admin/settings">
              <div className="block p-4 bg-gray-500 text-white rounded-md shadow-md hover:bg-gray-600 transition">
                Configure System Settings
              </div>
            </Link>
          </section>
        </div>
      </div>
    </main>
  );
}

export default Admin;
