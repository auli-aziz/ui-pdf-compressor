import { getServerSession } from 'next-auth';
import PricingCard from '@/components/fragments/pricing-card';
import { authConfig } from '@/lib/auth/config';

export default async function PricingPage() {
  const session = await getServerSession(authConfig);

  const basePrice = 100000;
  const plusPrice = 200000;
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
        <PricingCard
          name={'Base'}
          price={basePrice.toLocaleString('id-ID')}
          interval={'bulan'}
          description={"Layanan terjamin"}
          features={[
            'Penggunaan Tanpa Batas',
            'Dukungan via Email',
          ]}
          username={session?.user?.name}
          email={session?.user?.email}
        />
        <PricingCard
          name={'Plus'}
          price={plusPrice.toLocaleString('id-ID')}
          interval={'bulan'}
          description={"Layanan terjamin"}
          features={[
            'Semua yang ada dalam Base',
            'Early Access ke fitur baru',
            'Dukungan 24/7',
          ]}
          username={session?.user?.name}
          email={session?.user?.email}
        />
      </div>
    </main>
  );
}