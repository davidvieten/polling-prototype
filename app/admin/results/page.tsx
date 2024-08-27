"use client";
import AllStarTeamCard from '@/app/components/allstar-team-card';
import AwardCard from '@/app/components/award-card';
import VotesList from '@/app/components/VotesList';
import { useRouter } from 'next/navigation'; 
import { useEffect, useState } from 'react';

interface PlayerVote {
    id: string;
    category: string;
    player: {
      name: string;
    };
    user: {
      name: string;
    };
}

interface CoachVote {
    id: string;
    category: string;
    coach: {
      name: string;
    };
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
      [name: string]: number;
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

      const fetchVotes = async () => {
        try {
          const [playerResponse, coachResponse] = await Promise.all([
            fetch('/api/votes/players'),
            fetch('/api/votes/coaches'),
          ]);

          const playerVotesData: PlayerVote[] = await playerResponse.json();
          const coachVotesData: CoachVote[] = await coachResponse.json();

          const playerVoteCounts: VoteCounts = playerVotesData.reduce((acc: VoteCounts, vote: PlayerVote) => {
            const category = vote.category;
            const playerName = vote.player.name;

            if (!acc[category]) acc[category] = {};
            if (!acc[category][playerName]) acc[category][playerName] = 0;

            acc[category][playerName] += 1;

            return acc;
          }, {});

          const coachVoteCounts: VoteCounts = coachVotesData.reduce((acc: VoteCounts, vote: CoachVote) => {
            const category = vote.category;
            const coachName = vote.coach.name;

            if (!acc[category]) acc[category] = {};
            if (!acc[category][coachName]) acc[category][coachName] = 0;

            acc[category][coachName] += 1;

            return acc;
          }, {});

          const getTopNominees = (category: string, voteCounts: VoteCounts, count: number) => {
            const categoryVotes = voteCounts[category] || {};
            return Object.entries(categoryVotes)
              .sort(([, aVotes], [, bVotes]) => bVotes - aVotes)
              .slice(0, count)
              .map(([name]) => name);
          };

          setPlayerOfTheYearNominees(getTopNominees('PLAYER_OF_THE_YEAR', playerVoteCounts, 3));
          setCoachOfTheYearNominees(getTopNominees('COACH_OF_THE_YEAR', coachVoteCounts, 3));
          setDefensivePlayerOfTheYearNominees(getTopNominees('DEFENSEMAN_OF_THE_YEAR', playerVoteCounts, 3));

          setAllStarTeam({
            forwards: getTopNominees('ALL_TEAM_FORWARDS', playerVoteCounts, 4),
            defensemen: getTopNominees('ALL_TEAM_DEFENSE', playerVoteCounts, 3),
            goalie: getTopNominees('ALL_TEAM_GOALIE', playerVoteCounts, 1)[0] || '',
          });

        } catch (error) {
          console.error('Error fetching votes:', error);
        }
      };

      fetchVotes();
    }, []);

    const renderNominees = (nominees: string[]) => {
      return nominees.length > 0 ? nominees : ['No votes yet'];
    };

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
                    <AwardCard title="Player of the Year" nominees={renderNominees(playerOfTheYearNominees)} />
                    <AwardCard title="Defenseman of the Year" nominees={renderNominees(defensivePlayerOfTheYearNominees)} />
                    <AwardCard title="Coach of the Year" nominees={renderNominees(coachOfTheYearNominees)} />
                    <AllStarTeamCard
                      forwards={renderNominees(allStarTeam.forwards)}
                      defensemen={renderNominees(allStarTeam.defensemen)}
                      goalie={allStarTeam.goalie || 'No votes yet'}
                    />
                </div>
                <div className="flex justify-left mt-8">
                    <VotesList />
                </div>
            </div>
        </main>
    );
}
