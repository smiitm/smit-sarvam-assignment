import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Sidebar } from '@/components/Sidebar';
import { SidebarProvider } from '@/context/SidebarContext';
import { MobileHeader } from '@/components/MobileHeader';

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
      <head>
      <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      <link rel="icon" href="/sarvam.png" type="image/png" />
      </head>
      <body className={inter.className}>
        <SidebarProvider>
          <div className="flex bg-color2 text-color5 w-full h-full">
            <Sidebar />
            <main className="min-h-screen w-full md:flex-1 md:flex md:flex-col bg-color1 overflow-hidden">
              <MobileHeader />
              {children}
            </main>
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}