'use client';
import { NextPage } from 'next';
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

const PlayerOfTheYear: NextPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-200">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-lg">
        <h1 className="text-4xl font-bold mb-4 text-center text-black">Player of the Year Voting</h1>
        <p className="mb-6 text-center text-gray-700">
          Vote for your favorite player of the year in the SSL by searching for their name below.
        </p>
        <div className="relative mb-4">
          <div className="border border-gray-300 rounded w-48">
            <Autocomplete suggestions={players} placeholder="Search for a player..." />
          </div>
        </div>
        <div>
          <button
            type="button"
            className="mt-2 bg-black text-white font-bold py-2 px-4 rounded hover:bg-gray-700 transition duration-300"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlayerOfTheYear;
