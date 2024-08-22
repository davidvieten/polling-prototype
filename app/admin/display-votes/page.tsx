'use client';
import VotesList from '@/app/components/VotesList'
import router, { useRouter } from 'next/navigation'
import React from 'react'

const DisplayVotes = () => {
const router = useRouter(); 
  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 p-8">
    <div className="max-w-6xl mx-auto">
    <button 
        onClick={() => router.back()} 
        className="mb-4 py-2 px-4 bg-gray-500 text-white rounded-md shadow-md hover:bg-gray-600 transition"
    >
        Back
    </button>

      <div className="mt-8">

        <section className="mb-10">
          <h3 className="text-2xl font-semibold text-black dark:text-white mb-4">
            All Votes
          </h3>
          <VotesList /> 
        </section>
      </div>
    </div>
  </main>
  )
}

export default DisplayVotes