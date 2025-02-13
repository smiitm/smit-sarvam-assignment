'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Rainbow, PlusIcon, PanelRightClose, PanelRightOpen, SquareUserRound, SettingsIcon, BellIcon } from 'lucide-react';

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  const bottomItems = [
    { icon: BellIcon, label: 'Notifications' },
    { icon: SettingsIcon, label: 'Settings' },
    { icon: SquareUserRound, label: 'My Account' },
  ];

  const threads = [
    {
      date: 'Today',
      items: [
        { title: 'How to write an impact...', id: 1 },
        { title: 'Web accessibility', id: 2 },
        { title: 'Design inspiration', id: 3 },
        { title: 'What is machine learning', id: 4 },
      ],
    },
    {
      date: 'Yesterday',
      items: [
        { title: 'How to write andsd ..', id: 5 },
        { title: 'Web accessibility', id: 6 },
      ],
    },
  ];

  return (
    <>
      <div
        className={cn(
          'h-screen bg-color2 transition-all duration-300 flex flex-col',
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

        {collapsed && <div className="mx-2 my-4">
          <button
            className="p-2 rounded-md hover:bg-color3"
            onClick={() => setCollapsed(!collapsed)}
          >
            <PanelRightClose strokeWidth={1.5} className="h-6 w-6" />
          </button>
        </div>}


        {!collapsed &&
          <div className="mx-4 mb-4 bg-color3 flex items-center border-2 border-color4 py-2 rounded-md px-4  justify-between">
            Add new Thread
            <PlusIcon strokeWidth={1.5} className="h-6 w-6" />
          </div>}

        {collapsed && <div className="mx-2 mb-4">
          <button
            className="p-2 rounded-lg text-orange-800 hover:bg--orange-500/20 bg-orange-300/20 border border-orange-700/50 box-border"
          >
            <PlusIcon className="h-6 w-6" />
          </button>
        </div>}

        <div className="flex flex-col space-y-2 mx-2">
          {threads.map((section, index) => (
            <div key={index} className="m-2">
              {!collapsed && <div className="font-semibold text-sm mb-1">{section.date}</div>}
              {section.items.map((thread) => (
                <button key={thread.id} className="w-full hover:bg-color3 px-2 py-1.5 text-left rounded-md">
                  {!collapsed && <div>{thread.title}</div>}
                </button>
              ))}
            </div>
          ))}
        </div>


        <div className="mt-auto space-y-2 mb-4 mx-2 ">
          {bottomItems.map((item, index) => (
              <button
                key={index}
                className="p-2 rounded-md hover:bg-color3 w-full"
                onClick={() => setCollapsed(!collapsed)}
              >
                <div className='flex space-x-2 items-center'>
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
