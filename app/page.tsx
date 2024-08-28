import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/auth/nextauth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/auth/signin');
  }
  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-black dark:text-white mb-8">
          Hello, {session && <span className="text-gray-500">{session.user!.name}</span>}
        </h1>
        <div className="mt-8">
          <h2 className="text-3xl font-bold text-black dark:text-white mb-4">
            Welcome to the Official SSL All-Stars Voting Website
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            This is the official platform to vote for the SSL All-Stars. Your votes will help decide the best players and coaches in the league. There are four categories you need to vote in:
          </p>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-6">
            <li>All-Star Team Voting</li>
            <li>Player of the Year Voting</li>
            <li>Defensive Player of the Year Voting</li>
            <li>Coach of the Year Voting</li>
          </ul>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Please make sure to cast your votes in each category to ensure your voice is heard. Thank you for participating and supporting the SSL!
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            To vote, navigate to the respective pages for each category using the menu or links provided in the site. Make sure to vote for all categories to make your vote count fully. Your participation is greatly appreciated!
          </p>
        </div>
      </div>
    </main>
  );
}
