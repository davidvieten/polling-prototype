import { FC, useState } from 'react';
import Autocomplete from '../components/auto-complete';

interface DefensivePlayerOfTheYearProps {}

const DefensivePlayerOfTheYear: FC<DefensivePlayerOfTheYearProps> = () => {
  const [selectedPlayer, setSelectedPlayer] = useState<string>('');

  const handleSubmit = async () => {
    if (!selectedPlayer) {
      alert('Please select a player.');
      return;
    }

    try {
      const response = await fetch('/api/votes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          category: 'DEFENSEMAN_OF_THE_YEAR',
          player: selectedPlayer,
        }),
      });

      if (!response.ok) {
        throw new Error('Something went wrong');
      }

      alert(`You voted for: ${selectedPlayer}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-8 w-full max-w-lg">
      <h2 className="text-3xl font-bold mb-4 text-center text-black dark:text-white">
        Defensive Player of the Year Voting
      </h2>
      <p className="mb-6 text-center text-gray-700 dark:text-gray-300">
        Vote for your favorite defensive player by searching for their name below.
      </p>
      <div className="relative mb-4">
        <Autocomplete
          suggestions={[]} // Will fetch dynamically in the dashboard
          placeholder="Search for a player..."
          onValueChange={setSelectedPlayer}
        />
      </div>
      <button
        type="button"
        className="mt-2 bg-black text-white font-bold py-2 px-4 rounded hover:bg-gray-700 dark:hover:bg-gray-600 transition duration-300"
        onClick={handleSubmit}
        disabled={!selectedPlayer}
      >
        Submit
      </button>
    </div>
  );
};

export default DefensivePlayerOfTheYear;
