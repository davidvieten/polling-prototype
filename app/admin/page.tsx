'use client';
import Link from "next/link";
import { useEffect, useState } from 'react';
import AwardCard from "../components/AwardCard";
import AllStarTeamCard from "../components/AllStarTeamCard";

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

const Admin: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const [playerOfTheYearNominees, setPlayerOfTheYearNominees] = useState<string[]>([]);
  const [coachOfTheYearNominees, setCoachOfTheYearNominees] = useState<string[]>([]);
  const [defensivePlayerOfTheYearNominees, setDefensivePlayerOfTheYearNominees] = useState<string[]>([]);
  const [allStarTeam, setAllStarTeam] = useState<AllStarTeam>({
    forwards: [],
    defensemen: [],
    goalie: ''
  });

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch('/api/users/me');
        if (response.ok) {
          const user = await response.json();
          setIsAdmin(user.isAdmin);
        } else {
          console.error('Failed to fetch user details');
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      } finally {
        setLoading(false);
      }
    };

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

    fetchUserDetails();
    fetchTopPlayers();
  }, []);

  if (loading) {
    return <div className="text-gray-400">Loading...</div>;
  }

  if (!isAdmin) {
    return (
      <main className="min-h-screen bg-white dark:bg-gray-900 p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-extrabold text-black dark:text-white mb-8">
            Access Denied
          </h1>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            You do not have permission to access this page.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold text-black dark:text-white mb-8">
          Admin Dashboard
        </h1>

        <div className="mt-8">
          <h2 className="text-3xl font-bold text-black dark:text-white mb-4">
            Welcome, Admin
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            This is the administration area where you can manage the voting system, view results, and manage coaches.
          </p>
          <div className="container">
            <AwardCard title="Player of the Year" nominees={playerOfTheYearNominees} />
            <AwardCard title="Defenseman of the Year" nominees={defensivePlayerOfTheYearNominees} />
            <AwardCard title="Coach of the Year" nominees={coachOfTheYearNominees} />
            <AllStarTeamCard {...allStarTeam} />
          </div>

          <section className="mb-10">
            <h3 className="text-2xl font-semibold text-black dark:text-white mb-4">
              All Votes
            </h3>
            <Link href="/admin/display-votes">
              <div className="block p-4 bg-gray-500 text-white rounded-md shadow-md hover:bg-gray-600 transition">
                View all votes
              </div>
            </Link>
          </section>


          <section className="mb-10">
            <h3 className="text-2xl font-semibold text-black dark:text-white mb-4">
              Send Email
            </h3>
            <Link href="/admin/send-emails">
              <div className="block p-4 bg-gray-500 text-white rounded-md shadow-md hover:bg-gray-600 transition">
                Alert coaches of updates.
              </div>
            </Link>
          </section>

          <section className="mb-10">
            <h3 className="text-2xl font-semibold text-black dark:text-white mb-4">
              User Management
            </h3>
            <Link href="/admin/manage-coaches">
              <div className="block p-4 bg-gray-500 text-white rounded-md shadow-md hover:bg-gray-600 transition">
                View and Manage Coaches
              </div>
            </Link>
          </section>

          <section className="mb-10">
            <h3 className="text-2xl font-semibold text-black dark:text-white mb-4">
              Player Management
            </h3>
            <Link href="/admin/manage-players">
              <div className="block p-4 bg-gray-500 text-white rounded-md shadow-md hover:bg-gray-600 transition">
                View and Manage Players
              </div>
            </Link>
          </section>

          <section className="mb-10">
            <h3 className="text-2xl font-semibold text-black dark:text-white mb-4">
              System Settings
            </h3>
            <Link href="/admin/settings">
              <div className="block p-4 bg-gray-500 text-white rounded-md shadow-md hover:bg-gray-600 transition">
                Configure System Settings
              </div>
            </Link>
          </section>
        </div>
      </div>
    </main>
  );
}

export default Admin;
