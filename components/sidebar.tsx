'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Rainbow, PlusIcon, PanelRightClose, PanelRightOpen, SquareUserRound, SettingsIcon, BellIcon } from 'lucide-react';

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter(); // Next.js router for navigation

  const bottomItems = [
    { icon: BellIcon, label: 'Notifications' },
    { icon: SettingsIcon, label: 'Settings' },
    { icon: SquareUserRound, label: 'My Account' },
  ];

  const threads = [
    {
      date: 'Today',
      items: [
        { title: 'Web accessibility', id: 'chat1' },
        { title: 'Design inspiration', id: 'chat2' },
        { title: 'What is machine learning', id: 'chat3' },
      ],
    },
    {
      date: 'Yesterday',
      items: [
        { title: 'How to optimize your workflow', id: 'chat4' },
        { title: 'Understanding web', id: 'chat5' },
      ],
    },
  ];

  return (
    <>
      {/* Backdrop */}
      {!collapsed && (
        <div
          className="fixed inset-0 bg-black/50 transition-all md:hidden z-40"
          onClick={() => setCollapsed(true)}
        />
      )}

      {/* Sidebar */}
      
      <div
        className={cn(
          'h-full bg-color2 transition-all duration-300 flex flex-col fixed md:relative z-50',
          collapsed ? 'w-[60px]' : 'w-[240px]'
        )}
      >

        {!collapsed && (
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-2">
              <Rainbow strokeWidth={1.5} size={30} />
              <div className="text-xl font-semibold">ChatGST</div>
            </div>

            <button
              className="p-2 rounded-md hover:bg-color3 "
              onClick={() => setCollapsed(!collapsed)}
            >
              <PanelRightOpen strokeWidth={1.5} className="h-6 w-6" />
            </button>
          </div>
        )}

        {collapsed && (
          <div className="mx-2 my-4">
            <button
              className="p-2 rounded-md hover:bg-color3"
              onClick={() => setCollapsed(!collapsed)}
            >
              <PanelRightClose strokeWidth={1.5} className="h-6 w-6" />
            </button>
          </div>
        )}

        {!collapsed && (
          <button 
            className="mx-4 mb-4 bg-color3 flex items-center border-2 hover:bg-color2 border-color4 py-2 rounded-md px-4 justify-between"
            onClick={() => router.push(`/chat/`)}
          >
            Add new Thread
            <PlusIcon strokeWidth={1.5} className="h-6 w-6" />
          </button>
        )}

        {collapsed && (
          <div className="mx-2 mb-4">
            <button className="p-2 rounded-lg text-orange-800 hover:bg-orange-500/20 bg-orange-300/20 border border-orange-700/50 box-border">
              <PlusIcon className="h-6 w-6" />
            </button>
          </div>
        )}

        {/* Threads Section */}
        <div className="flex flex-col space-y-2 mx-2">
          {threads.map((section, index) => (
            <div key={index} className="m-2">
              {!collapsed && <div className="font-semibold text-sm mb-1">{section.date}</div>}
              {section.items.map((thread) => (
                <button
                  key={thread.id}
                  className="relative w-full hover:bg-color3 px-2 py-1.5 text-left rounded-md text-color6 flex items-center"
                  onClick={() => router.push(`/chat/${thread.id}`)}
                >
                  {!collapsed && (
                    <div className="relative w-full flex items-center">
                      <span className="overflow-hidden whitespace-nowrap text-ellipsis">{thread.title}</span>
                    </div>
                  )}
                </button>
              ))}
            </div>
          ))}
        </div>

        {/* Bottom Menu */}
        <div className="mt-auto space-y-2 mb-4 mx-2">
          {bottomItems.map((item, index) => (
            <button key={index} className="p-2 rounded-md hover:bg-color3 w-full text-color6">
              <div className="flex space-x-2 items-center">
                <item.icon size={24} strokeWidth={1.5} />
                {!collapsed && <span>{item.label}</span>}
              </div>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
