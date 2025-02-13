import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';


import { Sidebar } from '@/components/sidebar';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '700'], // Adjust weights as needed
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'SarvamAI Law',
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
          <div className="flex h-screen bg-color2 text-color5">
            <Sidebar />
            <main className="flex-1 flex flex-col relative mr-2 my-2 bg-color1 border rounded-md ">
              {children}
            </main>
          </div>
      </body>
    </html>
  );
}