'use client';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  // Explicitly define the type for the event parameter
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission behavior

    const result = await signIn('credentials', {
      redirect: false, // Prevent automatic redirection
      email,
      password,
    });

    if (result?.error) {
      setError('Sign in failed. Check the details you provided are correct.');
    } else {
      router.push('/'); // Redirect to the home page or another page on successful sign-in
    }
  };

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 p-8 flex flex-col items-center justify-center">
      <div className="text-center mb-8">
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
          Your participation helps us determine the most outstanding athletes and coaches. Please sign in using the form below to get started.
        </p>
      </div>

      <div className="max-w-md w-full space-y-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Sign in
          </button>
        </form>
      </div>
    </main>
  );
};

export default SignInPage;
