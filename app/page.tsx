import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-black dark:text-white mb-8">
          Hello, {session && <span className="text-blue-500">{session.user!.name}</span>}
        </h1>
        <div className="mt-8">
        </div>
      </div>
    </main>
  );
}
