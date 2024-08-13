'use client';
import { NextPage } from 'next';
import Autocomplete from '../components/auto-complete';
import { useState } from 'react';

const coaches = [
  'Lionel Messi',
  'Cristiano Ronaldo',
  'Neymar Jr',
  'Kylian Mbappe',
  'Luka Modric',
  'Kevin De Bruyne',
  'Virgil van Dijk',
  'Sergio Ramos',
  'Eden Hazard',
  'Harry Kane',
];

const CoachOfTheYear: NextPage = () => {
  const [selectedCoach, setSelectedCoach] = useState<string>('');
  const [hasVoted, setHasVoted] = useState<boolean>(false);

  const handleSubmit = async () => {
    if (!selectedCoach) {
      alert('Please select a coach.');
      return;
    }

    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: selectedCoach,
          email: `${selectedCoach.toLowerCase().replace(' ', '.')}@example.com`,
        }),
      });

      if (!response.ok) {
        throw new Error('Something went wrong');
      }

      const data = await response.json();
      setHasVoted(true);
      alert(`Coach ${data.name} has been added!`);
    } catch (error) {
      console.error(error);
      alert('Failed to add coach');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900 p-8">
      <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-8 w-full max-w-lg">
        <h1 className="text-4xl font-bold mb-4 text-center text-black dark:text-white">
          Coach of the Year Voting
        </h1>
        {hasVoted ? (
          <div className="text-center">
            <p className="mb-4 text-gray-700 dark:text-gray-300">Thank you for voting!</p>
            <p className="font-bold text-black dark:text-white">You voted for: {selectedCoach}</p>
          </div>
        ) : (
          <>
            <p className="mb-6 text-center text-gray-700 dark:text-gray-300">
              Vote for your favorite coach of the year in the SSL by searching for their name below.
            </p>
            <div className="relative mb-4">
              <div className="border border-gray-300 dark:border-gray-600 rounded w-48">
                <Autocomplete 
                  suggestions={coaches} 
                  placeholder="Search for a coach..." 
                  onValueChange={setSelectedCoach}
                />
              </div>
            </div>
            <div>
              <button
                type="button"
                className="mt-2 bg-black text-white font-bold py-2 px-4 rounded hover:bg-gray-700 dark:hover:bg-gray-600 transition duration-300"
                onClick={handleSubmit}
                disabled={!selectedCoach} // Disable if no coach is selected
              >
                Submit
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CoachOfTheYear;
