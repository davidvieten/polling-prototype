'use client';
import { useRouter } from 'next/navigation'; 
import { useState } from 'react';

export default function AddCoachPage() {
    const router = useRouter(); 

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [school, setSchool] = useState('');
    const [notification, setNotification] = useState('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault(); 

        try {
            const response = await fetch('/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, school, password }),
            });

            if (response.ok) {
                setName('');
                setEmail('');
                setPassword('');
                setSchool('');

                setNotification('Coach has been added successfully!');

                setTimeout(() => {
                    setNotification('');
                    router.back(); 
                }, 3000);
            } else {
                console.error('Error adding coach:', response.statusText);
            }
        } catch (error) {
            console.error('Error adding coach:', error);
        }
    };

    return (
        <main className="min-h-screen bg-white dark:bg-gray-900 p-8">
            <div className="max-w-6xl mx-auto">
                <button 
                    onClick={() => router.back()} 
                    className="mb-4 py-2 px-4 bg-gray-500 text-white rounded-md shadow-md hover:bg-gray-600 transition"
                >
                    Back
                </button>

                <h1 className="text-4xl font-extrabold text-black dark:text-white mb-8">
                    Add New Coach
                </h1>

                <section className="bg-gray-100 dark:bg-gray-800 p-8 rounded-md shadow-md">
                    <h2 className="text-2xl font-bold text-black dark:text-white mb-6">
                        Add Coach Details
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-lg font-medium text-gray-700 dark:text-gray-300">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-900 dark:text-gray-300"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="school" className="block text-lg font-medium text-gray-700 dark:text-gray-300">
                                School
                            </label>
                            <select
                                id="school"
                                value={school}
                                onChange={(e) => setSchool(e.target.value)}
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-900 dark:text-gray-300"
                                required
                            >
                                <option value="" disabled>Select School</option>
                                <option value="PROSTRIDE">Team Prostride</option>
                                <option value="RAD">Team RAD</option>
                                <option value="GOLDCORE">Team Goldcore</option>
                                <option value="PUCKS_FOR_PUPS">Team Pucks for Pups</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-lg font-medium text-gray-700 dark:text-gray-300">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-900 dark:text-gray-300"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-lg font-medium text-gray-700 dark:text-gray-300">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-900 dark:text-gray-300"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full py-2 px-4 bg-gray-500 text-white rounded-md shadow-md hover:bg-gray-600 transition"
                        >
                            Add Coach
                        </button>
                    </form>
                </section>

                {notification && (
                    <div className="fixed bottom-4 right-4 bg-black text-white py-2 px-4 rounded-md shadow-md">
                        {notification}
                    </div>
                )}
            </div>
        </main>
    );
}
