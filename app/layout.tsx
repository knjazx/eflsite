import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from '@/lib/providers';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

const inter = Inter({ subsets: ['latin', 'cyrillic'] });

export const metadata: Metadata = {
  title: 'EFL League — Counter-Strike 2 Турниры',
  description: 'Electronic Future League — профессиональные турниры по Counter-Strike 2. Регистрация команд, расписание матчей, статистика игроков.',
  keywords: 'CS2, Counter-Strike 2, турниры, киберспорт, EFL, league',
  openGraph: {
    title: 'EFL League — Counter-Strike 2 Турниры',
    description: 'Профессиональные турниры по Counter-Strike 2',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" data-theme="dark" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
