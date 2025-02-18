"use client" ;

import { ChatInput } from '@/components/ChatInput';
import { HomeCard } from '@/components/HomeCard';

export default function Home() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center h-screen">
      <div className="w-full max-w-3xl px-4 mb-32">
        <h1 className="text-4xl font-medium text-center mb-8">
          Start a legel conversation.
        </h1>
        <ChatInput onSendMessage={(message) => console.log(message)} />
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <HomeCard
            imageUrl="https://images.unsplash.com/photo-1481487196290-c152efe083f5?auto=format&fit=crop&q=80&w=100&h=100"
            title="Case discussion"
            subtitle="previous chat"
          />
          <HomeCard
            title="New SEBI rules ..."
            subtitle="News"
          />
          <div className='hidden sm:block'>
          <HomeCard
            imageUrl="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=100&h=100"
            title="Research about..."
            subtitle="previous chat"
          />
          </div>
        </div>
      </div>
    </div>
  );
}
