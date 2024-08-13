'use client';
import { useSession, signIn, getProviders } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const SignInPage = () => {
  const { status } = useSession();
  const router = useRouter();

  const [providers, setProviders] = useState<Record<string, any> | null>(null);

  useEffect(() => {
    const fetchProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };

    fetchProviders();
  }, []);

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/');
    }
  }, [status, router]);

  if (status === 'authenticated' || !providers) {
    return <div>Loading...</div>;
  }

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 p-8 flex items-center justify-center">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Image 
            src="/SSL23LOGO copy.png" 
            alt="SSL Logo" 
            width={150} 
            height={150} 
            className="mx-auto mb-4"
          />
          <h1 className="text-4xl font-extrabold text-black dark:text-white mb-4">
            Welcome to the SSL All-Star Voting Website
          </h1>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            This is the official platform for voting for the SoCal Summer League. Sign in to cast your votes for the best players and coaches in the league.
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Your participation helps us determine the most outstanding athletes and coaches. Please sign in using one of the providers below to get started.
          </p>
        </div>
        <div className="space-y-6">
          {Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <button
                onClick={() => signIn(provider.id)}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign in with {provider.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default SignInPage;
