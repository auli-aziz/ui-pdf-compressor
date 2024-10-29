"use client";

import { redirect } from 'next/navigation';
import { useState } from 'react';

export default function PinVerificationPage() {
  const [pin, setPin] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verify PIN against the backend here
    const isValid = true;
    if (isValid) {
      console.log('PIN is valid');
      redirect('/payment/success'); // Adjust this route as necessary
    } else {
      alert('Invalid PIN. Please try again.');
    }
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-semibold text-gray-900 mb-8 text-center">Enter Your Payment PIN</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-6">
        <div>
          <label htmlFor="pin" className="block text-sm font-medium text-gray-700 mb-1">
            Payment PIN
          </label>
          <input
            type="password"
            id="pin"
            name="pin"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            className="w-full h-8 border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition duration-200"
        >
          Submit
        </button>
      </form>
    </main>
  );
}