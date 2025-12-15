'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { LogOut, Settings } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface UserMenuProps {
  position?: 'header' | 'sidebar';
}

export function UserMenu({ position = 'header' }: UserMenuProps) {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const getInitials = (name?: string) => {
    if (!name) return '?';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const handleLogout = () => {
    setIsOpen(false);
    logout();
  };

  const isSidebar = position === 'sidebar';

  return (
    <div className="relative" ref={menuRef}>
      {/* Avatar Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`rounded-full bg-[#2F5D3E] hover:bg-[#234430] transition-colors flex items-center justify-center ${
          isSidebar ? 'w-10 h-10' : 'w-9 h-9'
        }`}
      >
        <span className={`text-white ${isSidebar ? 'text-sm font-medium' : 'text-sm'}`}>
          {getInitials(user?.name)}
        </span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className={`absolute z-50 bg-[#2d2d2d] rounded-lg shadow-lg border border-[#3d3d3d] py-1 min-w-[200px] ${
            isSidebar
              ? 'left-full ml-2 bottom-0'
              : 'right-0 top-full mt-2'
          }`}
        >
          {/* User Info */}
          <div className="px-4 py-3 border-b border-[#3d3d3d]">
            <p className="text-white text-sm font-medium">{user?.name || 'Guest'}</p>
            <p className="text-[#CCCCCC] text-xs truncate">{user?.email}</p>
          </div>

          {/* Menu Items */}
          <div className="py-1">
            <Link
              href="/settings"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-2 text-sm text-[#CCCCCC] hover:bg-[#3d3d3d] hover:text-white transition-colors"
            >
              <Settings className="w-4 h-4" />
              Settings
            </Link>
          </div>

          {/* Logout */}
          <div className="border-t border-[#3d3d3d] py-1">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-2 text-sm text-red-400 hover:bg-[#3d3d3d] hover:text-red-300 transition-colors w-full"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
