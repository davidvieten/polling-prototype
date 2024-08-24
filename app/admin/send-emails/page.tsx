'use client';
import Form from '@/app/components/Form'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function EmailPage () {
    const router = useRouter()
  return (
        <main className="min-h-screen bg-white dark:bg-gray-900 p-8">
                <button 
                    onClick={() => router.back()} 
                    className="mb-4 py-2 px-4 bg-gray-500 text-white rounded-md shadow-md hover:bg-gray-600 transition"
                >
                    Back
                </button>
            <div>
                <Form></Form>
            </div>
        </main>
  )
}


