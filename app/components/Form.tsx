'use client';

import { useEffect } from 'react';
import { useFormState } from 'react-dom';
import { sendEmail } from '../actions';

export default function Form() {
  const [sendEmailState, sendEmailAction] = useFormState(sendEmail, {
    error: null,
    success: false,
  });

  useEffect(() => {
    if (sendEmailState.success) {
      alert('Email sent!');
    }
    if (sendEmailState.error) {
      alert('Error sending email!');
    }
  }, [sendEmailState]);

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold text-black dark:text-white mb-8">
        Email Updates
        </h1>

        <section className="bg-gray-100 dark:bg-gray-800 p-8 rounded-md shadow-md">
          <form action={sendEmailAction} className="space-y-6">
            <div className="form-group">
              <label
                htmlFor="name"
                className="block text-lg font-medium text-gray-700 dark:text-gray-300"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-900 dark:text-gray-300"
              />
            </div>
            <div className="form-group">
              <label
                htmlFor="email"
                className="block text-lg font-medium text-gray-700 dark:text-gray-300"
              >
                Email List
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-900 dark:text-gray-300"
              />
            </div>
            <div className="form-group">
              <label
                htmlFor="message"
                className="block text-lg font-medium text-gray-700 dark:text-gray-300"
              >
                Message
              </label>
              <textarea
                name="message"
                id="message"
                cols={30}
                rows={10}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-900 dark:text-gray-300"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-gray-500 text-white rounded-md shadow-md hover:bg-gray-600 transition"
            >
              Send
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
