import React from 'react';
import { Rainbow, Menu } from 'lucide-react';

export function Header({ onOpenSidebar }: { onOpenSidebar: () => void }) {
  return (
    <div className="flex items-center justify-between p-4 md:hidden bg-color2 border-b border-color4">
      <div className="flex items-center gap-2">
        <Rainbow strokeWidth={1.5} size={24} />
        <div className="text-lg font-semibold">ChatGST</div>
      </div>
      <button
        className="p-2 rounded-md hover:bg-color3"
        onClick={onOpenSidebar}
      >
        <Menu strokeWidth={1.5} className="h-6 w-6" />
      </button>
    </div>
  );
}