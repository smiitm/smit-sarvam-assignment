'use client';

import { useState } from 'react';
import { Paperclip, ArrowBigRight } from 'lucide-react';

export function ChatInput() {
  const [query, setQuery] = useState('');

  return (
    <div className="flex items-center justify-center">
      <div className="w-full h-32 max-w-3xl bg-color2 rounded-lg flex flex-col items-start justify-between border-2 border-color4 px-4 py-3">
        <input
          type="text"
          placeholder="Ask anything..."
          className="block bg-transparent text-lg text-white placeholder-color7 outline-none "
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        /> 
        <div className='flex items-center space-x-2 justify-end w-full'>
        <Paperclip className="text-color7 mx-2" size={20} />
        <button className="w-8 h-8 flex items-center justify-center bg-color3 rounded-full text-color7">
          <ArrowBigRight size={20} />
        </button>
        </div>
      </div>
    </div>
  );
};
