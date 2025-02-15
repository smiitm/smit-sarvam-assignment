'use client';

import { useState } from 'react';
import { Paperclip, ArrowBigRight } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

export function ChatInput({ onSendMessage }: ChatInputProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = () => {
    if (query.trim()) {
      onSendMessage(query);
      setQuery('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="flex items-center justify-center bg-transparent">
      <div className="w-full h-24 max-w-3xl bg-color2 rounded-lg flex flex-col items-start justify-between border-2 border-color4 px-4 py-3">
        <input
          type="text"
          placeholder="Ask anything..."
          className="block bg-transparent text-lg text-color6 placeholder-color7 outline-none"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
        /> 
        <div className='flex items-center space-x-2 justify-end w-full'>
          <Paperclip className="text-color7 mx-2" size={20} />
          <button 
            className="w-8 h-8 flex items-center justify-center bg-color3 rounded-full text-color7"
            onClick={handleSubmit}
          >
            <ArrowBigRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}