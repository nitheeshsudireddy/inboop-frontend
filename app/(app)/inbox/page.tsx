'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import ConversationList from '@/components/inbox/ConversationList';
import { ChatView } from '@/components/inbox/ChatView';
import { LeadSnapshot } from '@/components/inbox/LeadSnapshot';
import { mockMessages } from '@/lib/mockData';
import { useUIStore } from '@/stores/useUIStore';
import { useConversationStore } from '@/stores/useConversationStore';
import { ConversationStatus, LeadStatus } from '@/types';
import { SkeletonConversation, SkeletonMessage, SkeletonDetailPanel, Skeleton } from '@/components/ui/skeleton';

export default function InboxPage() {
  const searchParams = useSearchParams();
  const { selectedConversationId, setSelectedConversationId } = useUIStore();
  const { conversations, setConversationVIP, setConversationStatus, isLoading, fetchConversations } = useConversationStore();

  // Fetch conversations on mount
  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  // Check for conversation from URL query params (when coming from leads page)
  useEffect(() => {
    const conversationFromUrl = searchParams.get('conversation');
    if (conversationFromUrl) {
      const conversationExists = conversations.some(c => c.id === conversationFromUrl);
      if (conversationExists) {
        setSelectedConversationId(conversationFromUrl);
      }
    }
  }, [searchParams, conversations, setSelectedConversationId]);

  const selectedConversation = selectedConversationId
    ? conversations.find((c) => c.id === selectedConversationId) || null
    : null;

  const messages = selectedConversationId ? mockMessages[selectedConversationId] || [] : [];

  const handleVIPChange = (isVIP: boolean) => {
    if (selectedConversationId) {
      setConversationVIP(selectedConversationId, isVIP);
    }
  };

  const handleStatusChange = (status: LeadStatus) => {
    if (selectedConversationId) {
      // TODO: Update lead status via API
      console.log('Lead status changed:', selectedConversationId, status);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex h-full overflow-hidden">
        {/* Conversation list skeleton */}
        <div className="w-[320px] flex-shrink-0 border-r bg-gray-50 overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <Skeleton className="w-full h-10 rounded-xl" />
          </div>
          <div className="p-2 space-y-1">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonConversation key={i} />
            ))}
          </div>
        </div>

        {/* Chat area skeleton */}
        <div className="flex-1 min-w-0 bg-background flex flex-col">
          <div className="p-4 border-b border-gray-200 flex items-center gap-3">
            <Skeleton className="w-10 h-10 rounded-full" />
            <div>
              <Skeleton className="w-24 h-4 mb-1" />
              <Skeleton className="w-16 h-3" />
            </div>
          </div>
          <div className="flex-1 p-4 space-y-4">
            <SkeletonMessage />
            <SkeletonMessage isOwn />
            <SkeletonMessage />
            <SkeletonMessage />
            <SkeletonMessage isOwn />
          </div>
          <div className="p-4 border-t border-gray-200">
            <Skeleton className="w-full h-12 rounded-xl" />
          </div>
        </div>

        {/* Lead snapshot skeleton */}
        <div className="w-[320px] flex-shrink-0 border-l bg-white overflow-hidden">
          <SkeletonDetailPanel />
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full overflow-hidden">
      <div className="w-[320px] flex-shrink-0 border-r bg-gray-50 overflow-hidden">
        <ConversationList
          conversations={conversations}
          selectedId={selectedConversationId}
          onSelect={setSelectedConversationId}
        />
      </div>

      <div className="flex-1 min-w-0 bg-background">
        <ChatView
          messages={messages}
          conversation={selectedConversation}
        />
      </div>

      <div className="w-[320px] flex-shrink-0 border-l bg-white overflow-hidden">
        <LeadSnapshot
          conversation={selectedConversation}
          onVIPChange={handleVIPChange}
          onStatusChange={handleStatusChange}
        />
      </div>
    </div>
  );
}
