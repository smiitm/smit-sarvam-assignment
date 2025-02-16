import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Sidebar } from '@/components/sidebar';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: ' Law | Sarvam AI',
  description: 'Conversational AI for Legal Work',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <div className="flex bg-color2 text-color5 w-full h-full">
          <div className="hidden md:block">
            <Sidebar />
          </div>
          <main className="min-h-screen w-full md:flex-1 md:flex md:flex-col bg-color1">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}