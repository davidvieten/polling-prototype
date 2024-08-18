"use client"; 
import ToggleButton from '@/app/components/toggle-button';
import { useRouter } from 'next/navigation'; 
import { useState } from 'react';


export default function AddPlayerPage() {
    const router = useRouter();

    const [name, setName] = useState('');
    const [position, setPosition] = useState('');
    const [school, setSchool] = useState('');

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const handlePositionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPosition(event.target.value);
    };

    const handleSchoolChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSchool(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            const response = await fetch('/api/players', {

                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, school, position}),
            });

            if (response.ok) {
                setName('');
                setPosition('');
                setSchool('');
            } else {
                console.error('Error adding player:', response.statusText);
            }
        } catch (error) {
            console.error('Error adding player:', error);
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
                    Add New Player
                </h1>

                <section className="bg-gray-100 dark:bg-gray-800 p-8 rounded-md shadow-md">
                    <h2 className="text-2xl font-bold text-black dark:text-white mb-6">
                        Add Player Details
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
                                onChange={handleNameChange}
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-900 dark:text-gray-300"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="school" className="block text-lg font-medium text-gray-700 dark:text-gray-300">
                                School
                            </label>
                            <input
                                type="text"
                                id="school"
                                value={school}
                                onChange={handleSchoolChange}
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-900 dark:text-gray-300"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-lg font-medium text-gray-700 dark:text-gray-300">
                                Position
                            </label>
                            <input
                                type="text"
                                id="position"
                                value={position}
                                onChange={handlePositionChange}
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-900 dark:text-gray-300"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full py-2 px-4 bg-gray-500 text-white rounded-md shadow-md hover:bg-gray-600 transition"
                        >
                            Add Player
                        </button>
                    </form>
                </section>
            </div>
        </main>
    );
}
