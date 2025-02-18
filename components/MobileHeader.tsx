'use client';

import { useSidebar } from '../context/SidebarContext';
import { Menu } from 'lucide-react';

export function MobileHeader() {
  const { setCollapsed } = useSidebar();

  return (
    <div className="md:hidden p-2 border-b border-color3 flex items-center justify-end">
      <button
        onClick={() => setCollapsed(false)}
        className="p-2 hover:bg-color3 rounded-md"
      >
        <Menu className="h-4 w-4" />
      </button>
    </div>
  );
}