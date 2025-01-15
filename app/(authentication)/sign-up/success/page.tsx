import React from 'react'

export default function SignUpSuccessPage() {
  return (
    <main className="flex items-center justify-center h-screen bg-gray-50">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8 text-center">
        <h1 className="text-3xl font-semibold text-gray-900 mb-4">Thank You!</h1>
        <p className="text-lg text-gray-700 mb-6">
          You have successfully Signed Up.
        </p>
        <p className="text-gray-500 mb-4">
          Please check your email to verify.
        </p>
        <a 
          href="/sign-in"
          className="mt-6 inline-block bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition duration-200"
        >
          Go to Sign In
        </a>
      </div>
    </main>
  );
}