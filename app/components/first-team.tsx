import { FC, useEffect, useState } from 'react';
import Autocomplete from '../components/auto-complete';

interface FirstTeamProps {}

const FirstTeam: FC<FirstTeamProps> = () => {
  const [players, setPlayers] = useState({
    forwards: ['', '', '', ''],
    defenders: ['', '', ''],
    goalies: ['']
  });
  const [hasVoted, setHasVoted] = useState<boolean>(false);

  const handleVoteChange = (category: 'forwards' | 'defenders' | 'goalies', index: number, value: string) => {
    setPlayers((prev) => ({
      ...prev,
      [category]: prev[category].map((item, i) => (i === index ? value : item))
    }));
  };

  const fetchPlayers = async (position: 'FORWARD' | 'DEFENSE' | 'GOALIE', category: 'forwards' | 'defenders' | 'goalies') => {
    try {
      const response = await fetch(`/api/players?position=${position}`);
      const data = await response.json();
      const names = data.map((player: { name: string }) => player.name);
      
      setPlayers((prev) => ({
        ...prev,
        [category]: prev[category].map((item, i) => names[i] || item)
      }));
    } catch (error) {
      console.error(`Error fetching ${position.toLowerCase()}s:`, error);
    }
  };

  const checkIfVoted = async () => {
    try {
      const response = await fetch('/api/votes/players?category=ALL_TEAM');
      if (response.ok) {
        const vote = await response.json();
        if (vote && vote.length > 0) {
          setHasVoted(true);

          const votedPlayers = vote.reduce(
            (acc: { forwards: string[]; defenders: string[]; goalies: string[] }, v: any) => {
              if (v.player.position === 'FORWARD') {
                acc.forwards.push(v.player.name);
              } else if (v.player.position === 'DEFENSEMAN') {
                acc.defenders.push(v.player.name);
              } else if (v.player.position === 'GOALIE') {
                acc.goalies.push(v.player.name);
              }
              return acc;
            },
            { forwards: [], defenders: [], goalies: [] }
          );

          setPlayers(votedPlayers);
        }
      }
    } catch (error) {
      console.error('Error checking vote status:', error);
    }
  };

  useEffect(() => {
    fetchPlayers('FORWARD', 'forwards');
    fetchPlayers('DEFENSE', 'defenders');
    fetchPlayers('GOALIE', 'goalies');
    checkIfVoted();
  }, []);

  const handleSubmit = async () => {
    const { forwards, defenders, goalies } = players;
    if (forwards.includes('') || defenders.includes('') || goalies.includes('')) {
      alert('Please make all selections.');
      return;
    }

    try {
      const response = await fetch('/api/votes/players', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          category: 'ALL_TEAM',
          forwards,
          defenders,
          goalies
        }),
      });

      if (!response.ok) {
        throw new Error('Something went wrong');
      }

      setHasVoted(true);
      alert('Your votes have been submitted!');
    } catch (error) {
      console.error('Failed to submit votes:', error);
      alert('Failed to submit votes');
    }
  };

  const { forwards, defenders, goalies } = players;

  return (
    <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-8 w-full max-w-lg">
      <h2 className="text-3xl font-bold mb-4 text-center text-black dark:text-white">
        SSL All-Star Team Voting
      </h2>
      {hasVoted ? (
        <div className="text-center">
          <p className="mb-4 text-gray-700 dark:text-gray-300">Thank you for voting!</p>
          <div>
            <h2 className="text-2xl font-semibold mb-2 text-black dark:text-white">Your Selections</h2>
            <p className="mb-2 text-gray-700 dark:text-gray-300">Forwards: {forwards.join(', ')}</p>
            <p className="mb-2 text-gray-700 dark:text-gray-300">Defenders: {defenders.join(', ')}</p>
            <p className="mb-2 text-gray-700 dark:text-gray-300">Goalie: {goalies.join(', ')}</p>
          </div>
        </div>
      ) : (
        <>
          <p className="mb-6 text-center text-gray-700 dark:text-gray-300">
            Vote for your SSL All-Star Team by selecting 4 forwards, 3 defenders, and 1 goalie.
          </p>
          <div className="mb-4">
            <h2 className="text-2xl font-semibold mb-2 text-black dark:text-white">Forwards</h2>
            {forwards.map((forward, index) => (
              <div key={index} className="mb-2">
                <Autocomplete
                  suggestions={forwards}
                  placeholder={`Select forward ${index + 1}`}
                  onValueChange={(value) => handleVoteChange('forwards', index, value)}
                />
              </div>
            ))}
          </div>
          <div className="mb-4">
            <h2 className="text-2xl font-semibold mb-2 text-black dark:text-white">Defenders</h2>
            {defenders.map((defender, index) => (
              <div key={index} className="mb-2">
                <Autocomplete
                  suggestions={defenders}
                  placeholder={`Select defender ${index + 1}`}
                  onValueChange={(value) => handleVoteChange('defenders', index, value)}
                />
              </div>
            ))}
          </div>
          <div className="mb-4">
            <h2 className="text-2xl font-semibold mb-2 text-black dark:text-white">Goalie</h2>
            <Autocomplete
              suggestions={goalies}
              placeholder="Select goalie"
              onValueChange={(value) => handleVoteChange('goalies', 0, value)}
            />
          </div>
          <button
            type="button"
            className="mt-2 bg-black text-white font-bold py-2 px-4 rounded hover:bg-gray-700 dark:hover:bg-gray-600 transition duration-300"
            onClick={handleSubmit}
            disabled={forwards.includes('') || defenders.includes('') || goalies.includes('')}
          >
            Submit
          </button>
        </>
      )}
    </div>
  );
};

export default FirstTeam;
