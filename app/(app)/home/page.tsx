'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import {
  Inbox,
  Users,
  ShoppingBag,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export default function HomePage() {
  const router = useRouter();
  const { user } = useAuth();

  // Get first name from user
  const firstName = user?.name?.split(' ')[0] || 'there';

  // Get time-based greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const actionCards = [
    {
      id: 'inbox',
      title: 'Inbox',
      description: 'View and respond to customer messages from Instagram, WhatsApp & Facebook.',
      icon: Inbox,
      href: '/inbox',
      iconBg: 'bg-blue-50',
      iconColor: 'text-blue-600',
      cta: 'Open Inbox',
    },
    {
      id: 'leads',
      title: 'Leads',
      description: 'Track, qualify, and convert your leads through the sales pipeline.',
      icon: Users,
      href: '/leads',
      iconBg: 'bg-emerald-50',
      iconColor: 'text-emerald-600',
      cta: 'Manage Leads',
    },
    {
      id: 'orders',
      title: 'Orders',
      description: 'Monitor order status, track deliveries, and manage fulfillment.',
      icon: ShoppingBag,
      href: '/orders',
      iconBg: 'bg-purple-50',
      iconColor: 'text-purple-600',
      cta: 'View Orders',
    },
  ];

  return (
    <div className="flex h-full flex-col bg-[#F8F9FA]">
      {/* Main Content - Centered */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 py-12">
        <div className="w-full max-w-4xl">
          {/* Welcome Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-50 rounded-full mb-4">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span className="text-sm font-medium text-emerald-700">AI-Powered CRM</span>
            </div>
            <h1 className="text-3xl font-semibold text-gray-900 mb-3">
              {getGreeting()}, {firstName}
            </h1>
            <p className="text-gray-500 text-lg">
              Manage your social commerce conversations, leads, and orders in one place.
            </p>
          </div>

          {/* Action Cards */}
          <div className="grid grid-cols-3 gap-6">
            {actionCards.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.id}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 transition-all duration-150 ease-out hover:shadow-lg hover:-translate-y-[3px] cursor-pointer group"
                  onClick={() => router.push(card.href)}
                >
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-xl ${card.iconBg} flex items-center justify-center mb-5`}>
                    <Icon className={`w-6 h-6 ${card.iconColor}`} />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {card.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-500 leading-relaxed mb-5">
                    {card.description}
                  </p>

                  {/* CTA Button */}
                  <button
                    className="inline-flex items-center gap-2 text-sm font-medium text-[#2F5D3E] group-hover:text-[#234430] transition-colors"
                  >
                    {card.cta}
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Subtle Footer Hint */}
          <p className="text-center text-sm text-gray-400 mt-10">
            Use the sidebar to navigate between sections
          </p>
        </div>
      </div>
    </div>
  );
}