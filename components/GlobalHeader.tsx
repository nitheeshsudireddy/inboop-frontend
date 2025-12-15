'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Search, Bell, Menu } from 'lucide-react';
import { UserMenu } from './UserMenu';
import { useSidebar } from '@/contexts/SidebarContext';

export function GlobalHeader() {
  const { toggle, isMobile } = useSidebar();

  return (
    <header className="h-14 md:h-16 bg-[#212121] flex items-center justify-between px-4 md:pr-8">
      {/* Left: Hamburger + Brand */}
      <div className="flex items-center">
        {/* Hamburger menu - mobile only */}
        {isMobile && (
          <button
            onClick={toggle}
            className="w-9 h-9 rounded-lg hover:bg-[#2d2d2d] transition-colors flex items-center justify-center text-[#CCCCCC] mr-2"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        <Link href="/home" className="flex items-center hover:opacity-90 transition-opacity">
          <div className="w-10 md:w-20 flex items-center justify-center">
            <Image
              src="/images/SimpleLogo.png"
              alt="Inboop"
              width={32}
              height={32}
              className="rounded-lg"
            />
          </div>
          <span className="text-[#2F5D3E] font-semibold text-lg md:text-xl md:-ml-4">Inboop</span>
        </Link>
      </div>

      {/* Right: Icon buttons */}
      <div className="flex items-center gap-1 md:gap-2">
        <button className="w-9 h-9 rounded-lg hover:bg-[#2d2d2d] transition-colors flex items-center justify-center text-[#CCCCCC]">
          <Search className="w-4 h-4" />
        </button>
        <button className="w-9 h-9 rounded-lg hover:bg-[#2d2d2d] transition-colors flex items-center justify-center text-[#CCCCCC] relative">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <UserMenu position="header" />
      </div>
    </header>
  );
}
