import { FC, useEffect, useState } from 'react';
import Autocomplete from '../components/auto-complete';

interface PlayerOfTheYearProps {}

const PlayerOfTheYear: FC<PlayerOfTheYearProps> = () => {
  const [selectedPlayer, setSelectedPlayer] = useState<string>('');
  const [hasVoted, setHasVoted] = useState<boolean>(false);
  const [players, setPlayers] = useState<string[]>([]);

  useEffect(() => {
    const fetchPlayers = async ()=> {
      try {
        const response = await fetch('/api/players');
        const data = await response.json();
        const playerNames = data.map((player: { name: string }) => player.name);
        setPlayers(playerNames);

      } catch (error) {
        console.error('Error fetching players:', error);
      }
    };
    fetchPlayers();
  }, []);

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
          category: 'PLAYER_OF_THE_YEAR',
          player: selectedPlayer,
        }),
      });

      if (!response.ok) {
        throw new Error('Something went wrong');
      }

      setHasVoted(true);
      alert(`You voted for: ${selectedPlayer}`);
    } catch (error) {
      console.error(error);
      alert('Failed to submit vote');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-8 w-full max-w-lg">
      <h2 className="text-3xl font-bold mb-4 text-center text-black dark:text-white">
        Player of the Year Voting
      </h2>
      {hasVoted ? (
        <div className="text-center">
          <p className="mb-4 text-gray-700 dark:text-gray-300">Thank you for voting!</p>
          <p className="font-bold text-black dark:text-white">You voted for: {selectedPlayer}</p>
        </div>
      ) : (
        <>
          <p className="mb-6 text-center text-gray-700 dark:text-gray-300">
            Vote for your favorite player by searching for their name below.
          </p>
          <div className="relative mb-4">
            <Autocomplete
              suggestions={players} // Will fetch dynamically in the dashboard
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
        </>
      )}
    </div>
  );
};

export default PlayerOfTheYear;
