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

export default function InboxPage() {
  const searchParams = useSearchParams();
  const { selectedConversationId, setSelectedConversationId } = useUIStore();
  const { conversations, setConversationVIP, setConversationStatus } = useConversationStore();

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
