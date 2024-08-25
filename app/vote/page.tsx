'use client';
import { FC, useEffect, useState } from 'react';
import CoachOfTheYear from '../components/coach-of-the-year';
import DefensivePlayerOfTheYear from '../components/defensive-player-of-the-year';
import PlayerOfTheYear from '../components/player-of-the-year';
import FirstTeam from '../components/first-team';


const VotingDashboard: FC = () => {
  const [players, setPlayers] = useState<string[]>([]);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await fetch('/api/players');
        const data = await response.json();

        setPlayers(data.map((player: { name: string }) => player.name));
      } catch (error) {
        console.error('Error fetching players:', error);
      }
    };

    fetchPlayers();
  }, []);

  return (
    <main className="min-h-sc</div>reen bg-white dark:bg-gray-900 p-8">
      <div className=" max-w-6xl mx-auto space-y-10">
        <h1 className="text-4xl font-extrabold text-black dark:text-white mb-8 text-center">
          Voting Dashboard
        </h1>
        <div className='wrapper'>
          <div>
            <FirstTeam />
          </div>
          <div>
            <CoachOfTheYear />
          </div>
          <div>
            <PlayerOfTheYear />
          </div>
          <div>
            <DefensivePlayerOfTheYear />
          </div>

        </div>

      </div>
    </main>
  );
};

export default VotingDashboard;
