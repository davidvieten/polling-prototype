'use client';
import { NextPage } from 'next';
import { useState } from 'react';
import Autocomplete from '../components/auto-complete';

const players = [
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

const FirstTeam: NextPage = () => {
  const [forwards, setForwards] = useState(['', '', '', '']);
  const [defenders, setDefenders] = useState(['', '', '']);
  const [goalie, setGoalie] = useState('');

  const handleVoteChange = (category: 'forwards' | 'defenders' | 'goalie', index: number, value: string) => {
    if (category === 'forwards') {
      const newForwards = [...forwards];
      newForwards[index] = value;
      setForwards(newForwards);
    } else if (category === 'defenders') {
      const newDefenders = [...defenders];
      newDefenders[index] = value;
      setDefenders(newDefenders);
    } else if (category === 'goalie') {
      setGoalie(value);
    }
  };

  const handleSubmit = () => {
    // Submit the votes (this can be expanded to handle actual submission logic)
    console.log('Forwards:', forwards);
    console.log('Defenders:', defenders);
    console.log('Goalie:', goalie);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900 p-8">
      <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-8 w-full max-w-lg">
        <h1 className="text-4xl font-bold mb-4 text-center text-black dark:text-white">
          SSL All-Star Team Voting
        </h1>
        <p className="mb-6 text-center text-gray-700 dark:text-gray-300">
          Vote for your SSL All-Star Team by selecting 4 forwards, 3 defenders, and 1 goalie.
        </p>

        <div className="mb-4">
          <h2 className="text-2xl font-semibold mb-2 text-black dark:text-white">Forwards</h2>
          {forwards.map((forward, index) => (
            <div key={index} className="mb-2">
              <div className="border border-gray-300 dark:border-gray-600 rounded w-48">
                <Autocomplete
                  suggestions={players}
                  placeholder={`Select forward ${index + 1}`}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mb-4">
          <h2 className="text-2xl font-semibold mb-2 text-black dark:text-white">Defenders</h2>
          {defenders.map((defender, index) => (
            <div key={index} className="mb-2">
              <div className="border border-gray-300 dark:border-gray-600 rounded w-48">
                <Autocomplete
                  suggestions={players}
                  placeholder={`Select defender ${index + 1}`}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mb-4">
          <h2 className="text-2xl font-semibold mb-2 text-black dark:text-white">Goalie</h2>
          <div className="border border-gray-300 dark:border-gray-600 rounded w-48">
            <Autocomplete
              suggestions={players}
              placeholder="Select goalie"
            />
          </div>
        </div>

        <div>
          <button
            type="button"
            className="mt-2 bg-black text-white font-bold py-2 px-4 rounded hover:bg-gray-700 dark:hover:bg-gray-600 transition duration-300"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default FirstTeam;
