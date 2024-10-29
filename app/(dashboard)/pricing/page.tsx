import { Check } from 'lucide-react';
import { checkoutAction } from '@/lib/payments/actions';
import { SubmitButton } from './submit-button';

// Prices are fresh for one hour max
export const revalidate = 3600;

export default async function PricingPage() {
  const basePrice = 100000;
  const plusPrice = 200000;
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid md:grid-cols-2 gap-8 max-w-xl mx-auto">
        <PricingCard
          name={'Base'}
          price={basePrice.toLocaleString('de-DE')}
          interval={'bulan'}
          trialDays={7}
          features={[
            'Penggunaan Tanpa Batas',
            'Dukungan via Email',
          ]}
        />
        <PricingCard
          name={'Plus'}
          price={plusPrice.toLocaleString('de-DE')}
          interval={'bulan'}
          trialDays={7}
          features={[
            'Semua yang ada dalam Base, dan',
            'Early Access ke fitur baru',
            'Dukungan 24/7',
          ]}
        />
      </div>
    </main>
  );
}

function PricingCard({
  name,
  price,
  interval,
  trialDays = 7,
  features,
  priceId,
}: {
  name: string;
  price: string;
  interval: string;
  trialDays: number;
  features: string[];
  priceId?: string;
}) {
  return (
    <div className="pt-6">
      <h2 className="text-2xl font-medium text-gray-900 mb-2">{name}</h2>
      <p className="text-sm text-gray-600 mb-4">
      dengan free trial selama {trialDays} hari
      </p>
      <p className="text-4xl font-medium text-gray-900 mb-6">
        Rp{price}{' '}
        <span className="text-xl font-normal text-gray-600">
          / {interval}
        </span>
      </p>
      <ul className="space-y-4 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <Check className="h-5 w-5 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
            <span className="text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>
      <form action={checkoutAction}>
        <input type="hidden" name="priceId" value={priceId} />
        <SubmitButton />
      </form>
    </div>
  );
}
