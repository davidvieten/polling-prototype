import { FC, useEffect, useState } from 'react';
import Autocomplete from '../components/auto-complete';

interface FirstTeamProps {}

const FirstTeam: FC<FirstTeamProps> = () => {
  const [forwards, setForwards] = useState<string[]>(['', '', '', '']);
  const [defenders, setDefenders] = useState<string[]>(['', '', '']);
  const [goalies, setGoalies] = useState<string[]>(['']);
  const [hasVoted, setHasVoted] = useState<boolean>(false);
  const [availableForwards, setAvailableForwards] = useState<string[]>([]);
  const [availableDefenders, setAvailableDefenders] = useState<string[]>([]);
  const [availableGoalies, setAvailableGoalies] = useState<string[]>([]);

  const handleVoteChange = (
    category: 'forwards' | 'defenders' | 'goalies',
    index: number,
    value: string
  ) => {
    if (category === 'forwards') {
      setForwards((prev) => prev.map((item, i) => (i === index ? value : item)));
    } else if (category === 'defenders') {
      setDefenders((prev) => prev.map((item, i) => (i === index ? value : item)));
    } else if (category === 'goalies') {
      setGoalies((prev) => prev.map((item, i) => (i === index ? value : item)));
    }
  };

  const fetchPlayersByPosition = async (position: 'FORWARD' | 'DEFENSEMAN' | 'GOALIE', setFunction: React.Dispatch<React.SetStateAction<string[]>>) => {
    try {
      const response = await fetch(`/api/players?position=${position}`);
      const data = await response.json();
      const playerNames = data.map((player: { name: string }) => player.name);
      setFunction(playerNames);
    } catch (error) {
      console.error(`Error fetching ${position.toLowerCase()}s:`, error);
    }
  };

  const checkIfVoted = async () => {
    try {
      const response = await fetch('/api/votes/players?category=ALL_TEAM');
      if (response.ok) {
        const votes = await response.json();
        if (votes && votes.length > 0) {
          const votedPlayers = {
            forwards: ['', '', '', ''],
            defenders: ['', '', ''],
            goalies: ['']
          };

          votes.forEach((vote: any) => {
            if (vote.category === 'ALL_TEAM') {
              if (vote.player.position === 'FORWARD') {
                const forwardIndex = votedPlayers.forwards.findIndex(vp => vp === '');
                if (forwardIndex !== -1) votedPlayers.forwards[forwardIndex] = vote.player.name;
              } else if (vote.player.position === 'DEFENSEMAN') {
                const defenderIndex = votedPlayers.defenders.findIndex(vp => vp === '');
                if (defenderIndex !== -1) votedPlayers.defenders[defenderIndex] = vote.player.name;
              } else if (vote.player.position === 'GOALIE') {
                votedPlayers.goalies[0] = vote.player.name;
              }
            }
          });

          setForwards(votedPlayers.forwards);
          setDefenders(votedPlayers.defenders);
          setGoalies(votedPlayers.goalies);

          // Check if all positions are filled to mark voting as complete
          if (
            !votedPlayers.forwards.includes('') &&
            !votedPlayers.defenders.includes('') &&
            !votedPlayers.goalies.includes('')
          ) {
            setHasVoted(true);
          }
        }
      }
    } catch (error) {
      console.error('Error checking vote status:', error);
    }
  };

  useEffect(() => {
    fetchPlayersByPosition('FORWARD', setAvailableForwards);
    fetchPlayersByPosition('DEFENSEMAN', setAvailableDefenders);
    fetchPlayersByPosition('GOALIE', setAvailableGoalies);
    checkIfVoted();
  }, []);

  const handleSubmit = async () => {
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
          goalies,
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
                  suggestions={availableForwards}
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
                  suggestions={availableDefenders}
                  placeholder={`Select defender ${index + 1}`}
                  onValueChange={(value) => handleVoteChange('defenders', index, value)}
                />
              </div>
            ))}
          </div>
          <div className="mb-4">
            <h2 className="text-2xl font-semibold mb-2 text-black dark:text-white">Goalie</h2>
            <Autocomplete
              suggestions={availableGoalies}
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
