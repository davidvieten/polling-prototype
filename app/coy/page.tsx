import { NextPage } from 'next';

const CoachOfTheYear: NextPage = () => {
  return (
    <div className="margin-bottom: 1000px min-h-screen flex flex-col items-center justify-center bg-gradient-radial from-blue-500 to-blue-800 p-4">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-lg">
        <h1 className="text-4xl font-bold mb-4 text-center text-blue-600">Coach of the Year Voting</h1>
        <p className="mb-6 text-center text-gray-700">
          Vote for the coach of the year in the SSL by searching for their name below.
        </p>
        <div className="relative">
          <input
            type="text"
            placeholder="Search for a coach..."
            className="input input-bordered input-primary w-full mb-4"
          />
        </div>
        <div>
        <button
            type="button"
            className="mt-2 mr-2 bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoachOfTheYear;
