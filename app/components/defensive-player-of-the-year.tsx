import { FC, useEffect, useState } from 'react';
import Autocomplete from '../components/auto-complete';

interface DefensivePlayerOfTheYearProps {}

const DefensivePlayerOfTheYear: FC<DefensivePlayerOfTheYearProps> = () => {
  const [selectedPlayer, setSelectedPlayer] = useState<string>('');
  const [hasVoted, setHasVoted] = useState<boolean>(false);
  const [players, setPlayers] = useState<{ name: string; id: string }[]>([]);
  const [votedPlayer, setVotedPlayer] = useState<string>('');

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await fetch('/api/players');
        const data = await response.json();
        setPlayers(data);
      } catch (error) {
        console.error('Error fetching players:', error);
      }
    };

    const checkIfVoted = async () => {
      try {
        const response = await fetch('/api/votes/players?category=DEFENSEMAN_OF_THE_YEAR');
        if (response.ok) {
          const vote = await response.json();
          if (vote && vote.length > 0) {
            setHasVoted(true);
            setVotedPlayer(vote[0].player.name); 
          }
        }
      } catch (error) {
        console.error('Error checking vote status:', error);
      }
    };

    fetchPlayers();
    checkIfVoted();
  }, []);

  const handleSubmit = async () => {
    if (!selectedPlayer) {
      alert('Please select a player.');
      return;
    }

    try {
      const player = players.find(player => player.name === selectedPlayer);
      if (!player) {
        alert('Player not found.');
        return;
      }

      const response = await fetch('/api/votes/players', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          category: 'DEFENSEMAN_OF_THE_YEAR',
          playerId: player.id,
        }),
      });

      if (!response.ok) {
        throw new Error('Something went wrong');
      }
      setHasVoted(true);
      setVotedPlayer(selectedPlayer);
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
      {hasVoted ? (
        <div className="text-center">
          <p className="mb-4 text-gray-700 dark:text-gray-300">Thank you for voting!</p>
          <p className="font-bold text-black dark:text-white">You voted for: {votedPlayer}</p>
        </div>
      ) : (
        <>
          <p className="mb-6 text-center text-gray-700 dark:text-gray-300">
            Vote for your favorite defensive player by searching for their name below.
          </p>
          <div className="relative mb-4">
            <Autocomplete
              suggestions={players.map(player => player.name)}
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

export default DefensivePlayerOfTheYear;
