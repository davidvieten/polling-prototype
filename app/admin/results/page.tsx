"use client";
import AllStarTeamCard from '@/app/components/AllStarTeamCard';
import AwardCard from '@/app/components/AwardCard';
import VotesList from '@/app/components/VotesList';
import { useRouter } from 'next/navigation'; 
import { useEffect, useState } from 'react';


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
  
  interface AllStarTeam {
    forwards: string[];
    defensemen: string[];
    goalie: string;
  }
  
  interface VoteCounts {
    [category: string]: {
      [playerName: string]: number;
    };
  }

export default function ViewResults() {
    const router = useRouter();
    const [playerOfTheYearNominees, setPlayerOfTheYearNominees] = useState<string[]>([]);
    const [coachOfTheYearNominees, setCoachOfTheYearNominees] = useState<string[]>([]);
    const [defensivePlayerOfTheYearNominees, setDefensivePlayerOfTheYearNominees] = useState<string[]>([]);
    const [allStarTeam, setAllStarTeam] = useState<AllStarTeam>({
      forwards: [],
      defensemen: [],
      goalie: ''
    });
  
    useEffect(() => {
  
      const fetchTopPlayers = async () => {
        try {
          const response = await fetch('/api/votes');
          const votesData: Vote[] = await response.json();
  
          const voteCounts: VoteCounts = votesData.reduce((acc: VoteCounts, vote: Vote) => {
            const category = vote.category;
            const playerName = vote.player?.name || vote.user.name;
  
            if (!acc[category]) acc[category] = {};
            if (!acc[category][playerName]) acc[category][playerName] = 0;
  
            acc[category][playerName] += 1;
  
            return acc;
          }, {});
  
          const getTopNominees = (category: string) => {
            const categoryVotes = voteCounts[category] || {};
            return Object.entries(categoryVotes)
              .sort(([, aVotes], [, bVotes]) => bVotes - aVotes)
              .slice(0, 3)
              .map(([name]) => name);
          };
  
          setPlayerOfTheYearNominees(getTopNominees('PLAYER_OF_THE_YEAR'));
          setCoachOfTheYearNominees(getTopNominees('COACH_OF_THE_YEAR'));
          setDefensivePlayerOfTheYearNominees(getTopNominees('DEFENSEMAN_OF_THE_YEAR'));
  
          setAllStarTeam({
            forwards: getTopNominees('ALL_TEAM').filter(name =>  true),
            defensemen: getTopNominees('ALL_TEAM').filter(name => true),
            goalie: getTopNominees('ALL_TEAM').find(name =>  true) || '',
          });
  
        } catch (error) {
          console.error('Error fetching votes:', error);
        }
      };
      fetchTopPlayers();
    }, []);

    return (
        <main className="min-h-screen bg-white dark:bg-gray-900 p-8">
            <div className="max-w-6xl mx-auto">
                <button 
                    onClick={() => router.back()} 
                    className="mb-4 py-2 px-4 bg-gray-500 text-white rounded-md shadow-md hover:bg-gray-600 transition"
                >
                    Back
                </button>
                <div className="container">
                    <AwardCard title="Player of the Year" nominees={playerOfTheYearNominees} />
                    <AwardCard title="Defenseman of the Year" nominees={defensivePlayerOfTheYearNominees} />
                    <AwardCard title="Coach of the Year" nominees={coachOfTheYearNominees} />
                    <AllStarTeamCard {...allStarTeam} />
                </div>
                <div className="flex justify-left mt-8">
                    <VotesList />
                </div>

            </div>
        </main>
    );
}
