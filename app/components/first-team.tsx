import { FC, useState } from 'react';
import Autocomplete from '../components/auto-complete';

interface FirstTeamProps {}

const FirstTeam: FC<FirstTeamProps> = () => {
  const [forwards, setForwards] = useState(['', '', '', '']);
  const [defenders, setDefenders] = useState(['', '', '']);
  const [goalie, setGoalie] = useState('');
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
      setGoalie(value);
    }
  };

  const handleSubmit = async () => {
    if (forwards.includes('') || defenders.includes('') || !goalie) {
      alert('Please make all selections.');
      return;
    }

    try {
      const response = await fetch('/api/votes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          forwards,
          defenders,
          goalie,
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
            <p className="mb-2 text-gray-700 dark:text-gray-300">Goalie: {goalie}</p>
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
                  suggestions={[]} // Will fetch dynamically in the dashboard
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
                  suggestions={[]} // Will fetch dynamically in the dashboard
                  placeholder={`Select defender ${index + 1}`}
                  onValueChange={(value) => handleVoteChange('defenders', index, value)}
                />
              </div>
            ))}
          </div>
          <div className="mb-4">
            <h2 className="text-2xl font-semibold mb-2 text-black dark:text-white">Goalie</h2>
            <Autocomplete
              suggestions={[]} // Will fetch dynamically in the dashboard
              placeholder="Select goalie"
              onValueChange={(value) => handleVoteChange('goalie', 0, value)}
            />
          </div>
          <button
            type="button"
            className="mt-2 bg-black text-white font-bold py-2 px-4 rounded hover:bg-gray-700 dark:hover:bg-gray-600 transition duration-300"
            onClick={handleSubmit}
            disabled={forwards.includes('') || defenders.includes('') || !goalie}
          >
            Submit
          </button>
        </>
      )}
    </div>
  );
};

export default FirstTeam;
