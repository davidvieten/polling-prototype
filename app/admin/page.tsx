
import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function Admin() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    redirect('/auth/signin');
  }

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold text-black dark:text-white mb-8">
          Admin Dashboard
        </h1>

        <div className="mt-8">
          <h2 className="text-3xl font-bold text-black dark:text-white mb-4">
            Welcome, {session && <span className="text-gray-500">{session.user!.name}</span>}
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            This is the administration area where you can manage the voting system, view results, and manage coaches.
          </p>

          <section className="mb-10">
            <h3 className="text-2xl font-semibold text-black dark:text-white mb-4">
              Dashboard Overview
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-md shadow-md">
                <h4 className="text-lg font-bold text-gray-800 dark:text-gray-200">Total Votes</h4>
                <p className="text-2xl font-semibold text-black dark:text-white">150</p>
              </div>
              <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-md shadow-md">
                <h4 className="text-lg font-bold text-gray-800 dark:text-gray-200">Categories</h4>
                <p className="text-2xl font-semibold text-black dark:text-white">4</p>
              </div>
              <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-md shadow-md">
                <h4 className="text-lg font-bold text-gray-800 dark:text-gray-200">Recent Votes</h4>
                <p className="text-2xl font-semibold text-black dark:text-white">View All</p>
              </div>
            </div>
          </section>

          <section className="mb-10">
            <h3 className="text-2xl font-semibold text-black dark:text-white mb-4">
              Manage Votes
            </h3>
            <Link href="/admin/votes">
              <div className="block p-4 bg-gray-500 text-white rounded-md shadow-md hover:bg-gray-600 transition">
                View and Manage Votes
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
              Analytics and Reports
            </h3>
            <Link href="/admin/reports">
              <div className="block p-4 bg-gray-500 text-white rounded-md shadow-md hover:bg-gray-600 transition">
                View Voting Statistics
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
