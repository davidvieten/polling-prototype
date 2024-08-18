import { FC, useState } from 'react';
import Autocomplete from '../components/auto-complete';

interface CoachOfTheYearProps {}

const CoachOfTheYear: FC<CoachOfTheYearProps> = () => {
  const [selectedCoach, setSelectedCoach] = useState<string>('');
  const [hasVoted, setHasVoted] = useState<boolean>(false);

  const handleSubmit = async () => {
    if (!selectedCoach) {
      alert('Please select a coach.');
      return;
    }

    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: selectedCoach,
          email: `${selectedCoach.toLowerCase().replace(' ', '.')}@example.com`,
        }),
      });

      if (!response.ok) {
        throw new Error('Something went wrong');
      }

      const data = await response.json();
      setHasVoted(true);
    } catch (error) {
      console.error(error);
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
              suggestions={[]} // Will fetch dynamically in the dashboard
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
