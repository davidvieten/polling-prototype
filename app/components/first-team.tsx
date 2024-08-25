import { FC, use, useEffect, useState } from 'react';
import Autocomplete from '../components/auto-complete';

interface FirstTeamProps {}

const FirstTeam: FC<FirstTeamProps> = () => {
  const [forwards, setForwards] = useState(['', '', '', '']);
  const [defenders, setDefenders] = useState(['', '', '']);
  const [goalies, setGoalies] = useState(['']);
  const [hasVoted, setHasVoted] = useState<boolean>(false);

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
      const newGoalies = [...goalies];
      newGoalies[index] = value;
      setGoalies(newGoalies);
    }
  };

  useEffect(() => {
    const fetchForwards = async () => {
      try {
        const response = await fetch('/api/players?position=FORWARD');
        const data = await response.json();
        const forwardNames = data.map((player : {name : string}) => player.name);
        setForwards(forwardNames);
      } catch (error) {
        console.error('Error fetching forwards:', error);
      }
    };
    fetchForwards();
  }, []);

  useEffect(() => {
    const fetchDefenders = async () => {
      try {
        const response = await fetch('/api/players?position=DEFENSE');
        const data = await response.json();
        const defenderNames = data.map((player : {name : string}) => player.name);
        setDefenders(defenderNames);
      } catch (error) {
        console.error('Error fetching defenders:', error);
      }
    };
    fetchDefenders();
  }, []);

  useEffect(() => {
    const fetchGoalies = async () => {
      try {
        const response = await fetch('/api/players?position=GOALIE');
        const data = await response.json();
        const goalieName = data.map((player : {name : string}) => player.name);
        setGoalies(goalieName);
      } catch (error) {
        console.error('Error fetching goalies:', error);
      }
    };
    fetchGoalies();
  }, []);

  const handleSubmit = async () => {
    if (forwards.includes('') || defenders.includes('') || !goalies) {
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
      console.error(error);
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
              onValueChange={(value) => handleVoteChange('goalie', 0, value)}
            />
          </div>
          <button
            type="button"
            className="mt-2 bg-black text-white font-bold py-2 px-4 rounded hover:bg-gray-700 dark:hover:bg-gray-600 transition duration-300"
            onClick={handleSubmit}
            disabled={forwards.includes('') || defenders.includes('') || !goalies}
          >
            Submit
          </button>
        </>
      )}
    </div>
  );
};

export default FirstTeam;
