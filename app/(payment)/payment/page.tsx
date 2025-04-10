import { checkoutAction } from '@/lib/payments/actions';
import { SubmitButton } from './submit-button';

export default function PaymentPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-semibold text-gray-900 mb-8 text-center">Complete Your Payment</h1>
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg mx-auto">
        <form action={checkoutAction} method="POST" className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name on Card</label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full h-8 border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              className="w-full h-8 border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
              <input
                type="text"
                id="expiryDate"
                name="expiryDate"
                placeholder="MM/YY"
                className="w-full h-8 border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                required
              />
            </div>
            <div>
              <label htmlFor="cvc" className="block text-sm font-medium text-gray-700 mb-1">CVC</label>
              <input
                type="text"
                id="cvc"
                name="cvc"
                className="w-full h-8 border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                required
              />
            </div>
          </div>
          <div className="pt-6">
            <SubmitButton />
          </div>
        </form>
      </div>
    </main>
  );
}
