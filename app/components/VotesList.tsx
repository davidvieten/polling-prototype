'use client';
import { FC, useEffect, useState } from 'react';

interface Vote {
  id: string;
  category: string;
  player: {
    name: string;
  } | null;
  user: {
    name: string;
  };
}

const VotesList: FC = () => {
  const [votes, setVotes] = useState<Vote[]>([]);

  useEffect(() => {
    const fetchVotes = async () => {
      try {
        const response = await fetch('/api/votes');
        const data = await response.json();
        setVotes(data);
      } catch (error) {
        console.error('Error fetching votes:', error);
      }
    };

    fetchVotes();
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold text-black dark:text-white mb-4">All Votes</h2>
      {votes.length === 0 ? (
        <p className="text-gray-700 dark:text-gray-300">No votes have been cast yet.</p>
      ) : (
        <ul className="divide-y divide-gray-300 dark:divide-gray-700">
          {votes.map(vote => (
            <li key={vote.id} className="py-4">
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Category:</strong> {vote.category}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Voted for:</strong> {vote.player ? vote.player.name : 'No player'}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Voted by:</strong> {vote.user.name}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default VotesList;
