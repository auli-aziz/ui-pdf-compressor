export default function ThankYouPage() {
  return (
    <main className="flex items-center justify-center h-screen bg-gray-50">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8 text-center">
        <h1 className="text-3xl font-semibold text-gray-900 mb-4">Thank You!</h1>
        <p className="text-lg text-gray-700 mb-6">
          Your payment has been successfully processed.
        </p>
        <p className="text-gray-500 mb-4">
          You will receive a confirmation email shortly.
        </p>
        <a 
          href="/dashboard"
          className="mt-6 inline-block bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition duration-200"
        >
          Go to Dashboard
        </a>
      </div>
    </main>
  );
}