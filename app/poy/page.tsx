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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-radial from-blue-500 to-blue-800 p-4">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-lg">
        <h1 className="text-4xl font-bold mb-4 text-center text-blue-600">Player of the Year Voting</h1>
        <p className="mb-6 text-center text-gray-700">
          Vote for your favorite player of the year in the SSL by searching for their name below.
        </p>
        <div className="relative">
          <Autocomplete suggestions={players} placeholder="Search for a player..." />
        </div>
        <div>
          <button
            type="button"
            className="mt-2 bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlayerOfTheYear;
