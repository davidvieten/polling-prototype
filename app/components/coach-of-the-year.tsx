import { FC, useEffect, useState } from 'react';
import Autocomplete from '../components/auto-complete';

interface CoachOfTheYearProps {}

const CoachOfTheYear: FC<CoachOfTheYearProps> = () => {
  const [selectedCoach, setSelectedCoach] = useState<string>('');
  const [hasVoted, setHasVoted] = useState<boolean>(false);
  const [coaches, setCoaches] = useState<{ name: string; id: string }[]>([]);

  useEffect(() => {
    const fetchCoaches = async () => {
      try {
        const response = await fetch('/api/users'); 
        const data = await response.json();
        setCoaches(data); 
      } catch (error) {
        console.error('Error fetching coaches:', error);
      }
    };
    fetchCoaches();
  }, []);

  const handleSubmit = async () => {
    if (!selectedCoach) {
      alert('Please select a coach.');
      return;
    }

    try {
      const coach = coaches.find(coach => coach.name === selectedCoach);
      if (!coach) {
        alert('Coach not found.');
        return;
      }

      const response = await fetch('/api/votes/coaches', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          category: 'COACH_OF_THE_YEAR',
          coachId: coach.id, 
        }),
      });

      if (!response.ok) {
        throw new Error('Something went wrong');
      }

      setHasVoted(true);
      alert(`You voted for: ${selectedCoach}`);
    } catch (error) {
      console.error(error);
      alert('Failed to submit vote');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-8 w-full max-w-lg">
      <h2 className="text-3xl font-bold mb-4 text-center text-black dark:text-white">
        Coach of the Year Voting
      </h2>
      {hasVoted ? (
        <div className="text-center">
          <p className="mb-4 text-gray-700 dark:text-gray-300">Thank you for voting!</p>
          <p className="font-bold text-black dark:text-white">You voted for: {selectedCoach}</p>
        </div>
      ) : (
        <>
          <p className="mb-6 text-center text-gray-700 dark:text-gray-300">
            Vote for your favorite coach of the year by searching for their name below.
          </p>
          <div className="relative mb-4">
            <Autocomplete
              suggestions={coaches.map(coach => coach.name)} 
              placeholder="Search for a coach..."
              onValueChange={setSelectedCoach}
            />
          </div>
          <button
            type="button"
            className="mt-2 bg-black text-white font-bold py-2 px-4 rounded hover:bg-gray-700 dark:hover:bg-gray-600 transition duration-300"
            onClick={handleSubmit}
            disabled={!selectedCoach}
          >
            Submit
          </button>
        </>
      )}
    </div>
  );
};

export default CoachOfTheYear;
