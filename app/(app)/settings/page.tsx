'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  User,
  Building2,
  Bell,
  Puzzle,
  CreditCard,
  Mail,
  Phone,
  Globe,
  Instagram,
  MessageCircle,
  Facebook,
  Check,
  CheckCircle,
  Loader2,
  AlertTriangle,
  ExternalLink,
  X,
  Clock
} from 'lucide-react';
import { useAuthStore } from '@/stores/useAuthStore';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/stores/useToastStore';
import { cn } from '@/lib/utils';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

type TabId = 'profile' | 'workspace' | 'notifications' | 'integrations' | 'billing';

interface Tab {
  id: TabId;
  label: string;
  icon: React.ReactNode;
}

// Instagram integration status types (matches backend enums)
type IntegrationStatus = 'NOT_CONNECTED' | 'CONNECTED_READY' | 'BLOCKED' | 'PENDING';
type IntegrationReason =
  | 'NO_PAGES_FOUND'
  | 'IG_NOT_LINKED_TO_PAGE'
  | 'IG_NOT_BUSINESS'
  | 'OWNERSHIP_MISMATCH'
  | 'ADMIN_COOLDOWN'
  | 'MISSING_PERMISSIONS'
  | 'TOKEN_EXPIRED'
  | 'API_ERROR';

interface IntegrationStatusResponse {
  status: IntegrationStatus;
  reason?: IntegrationReason;
  message: string;
  retryAt?: string;
  details?: {
    instagramUsername?: string;
    facebookPageId?: string;
    businessName?: string;
  };
  nextActions?: Array<{
    type: string;
    label: string;
    url?: string;
  }>;
}

// Map reason codes to user-friendly messages
const getReasonMessage = (reason: IntegrationReason): string => {
  switch (reason) {
    case 'NO_PAGES_FOUND':
      return 'No business pages found. Create a page to connect Instagram.';
    case 'IG_NOT_LINKED_TO_PAGE':
      return 'Connect your Instagram account to a business page first.';
    case 'IG_NOT_BUSINESS':
      return 'Switch to an Instagram Business or Creator account to continue.';
    case 'OWNERSHIP_MISMATCH':
      return 'Check your Business Settings to fix account permissions.';
    case 'ADMIN_COOLDOWN':
      return 'Please wait before connecting. New page admins have a waiting period.';
    case 'MISSING_PERMISSIONS':
      return 'Some permissions are missing. Try connecting again.';
    case 'TOKEN_EXPIRED':
      return 'Your connection has expired. Please reconnect.';
    case 'API_ERROR':
      return 'Something went wrong. Please try again later.';
    default:
      return 'Unable to connect. Please try again.';
  }
};

// Format retry date for display
const formatRetryDate = (retryAt: string): string => {
  const date = new Date(retryAt);
  return date.toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  });
};

const tabs: Tab[] = [
  { id: 'profile', label: 'Profile', icon: <User className="w-5 h-5" /> },
  { id: 'workspace', label: 'Workspace', icon: <Building2 className="w-5 h-5" /> },
  { id: 'notifications', label: 'Notifications', icon: <Bell className="w-5 h-5" /> },
  { id: 'integrations', label: 'Integrations', icon: <Puzzle className="w-5 h-5" /> },
  { id: 'billing', label: 'Billing', icon: <CreditCard className="w-5 h-5" /> },
];

// Toggle Switch Component
function Toggle({ enabled, onChange }: { enabled: boolean; onChange: (value: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!enabled)}
      className={cn(
        'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
        enabled ? 'bg-[#2F5D3E]' : 'bg-gray-200'
      )}
    >
      <span
        className={cn(
          'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
          enabled ? 'translate-x-6' : 'translate-x-1'
        )}
      />
    </button>
  );
}

export default function SettingsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Get initial tab from URL or default to 'profile'
  const getInitialTab = (): TabId => {
    const tabParam = searchParams.get('tab');
    if (tabParam && ['profile', 'workspace', 'notifications', 'integrations', 'billing'].includes(tabParam)) {
      return tabParam as TabId;
    }
    return 'profile';
  };

  const [activeTab, setActiveTab] = useState<TabId>(getInitialTab);
  const { instagramConnection, setInstagramConnection } = useAuthStore();
  const { user } = useAuth();

  // Profile state
  const [profileName, setProfileName] = useState('');
  const [profileEmail, setProfileEmail] = useState('');
  const [profilePhone, setProfilePhone] = useState('');
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileSaved, setProfileSaved] = useState(false);

  // Initialize profile from user data
  useEffect(() => {
    if (user) {
      setProfileName(user.name || '');
      setProfileEmail(user.email || '');
    }
  }, [user]);

  // Workspace state
  const [brandName, setBrandName] = useState('');
  const [timezone, setTimezone] = useState('Asia/Kolkata');
  const [businessCategory, setBusinessCategory] = useState('');
  const [workspaceSaving, setWorkspaceSaving] = useState(false);
  const [workspaceSaved, setWorkspaceSaved] = useState(false);

  // Notifications state
  const [notifNewMessages, setNotifNewMessages] = useState(true);
  const [notifLeadUpdates, setNotifLeadUpdates] = useState(true);
  const [notifOrders, setNotifOrders] = useState(false);
  const [notifEmail, setNotifEmail] = useState(true);

  // Integrations state
  const [isConnectingInstagram, setIsConnectingInstagram] = useState(false);
  const [instagramStatus, setInstagramStatus] = useState<IntegrationStatusResponse | null>(null);
  const [isLoadingStatus, setIsLoadingStatus] = useState(false);
  const [statusError, setStatusError] = useState(false);
  const [showSetupModal, setShowSetupModal] = useState(false);
  const [whatsappConnected, setWhatsappConnected] = useState(false);
  const [whatsappPhone, setWhatsappPhone] = useState('+1 555 123 4567');
  const [facebookConnected, setFacebookConnected] = useState(false);
  const [facebookPage, setFacebookPage] = useState('Inboop Official');

  // Handle tab from URL param
  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam && ['profile', 'workspace', 'notifications', 'integrations', 'billing'].includes(tabParam)) {
      setActiveTab(tabParam as TabId);
    }
  }, [searchParams]);

  // Handle OAuth callback
  useEffect(() => {
    const instagramConnected = searchParams.get('instagram_connected');
    const instagramError = searchParams.get('instagram_error');

    if (instagramConnected === 'true') {
      handleOAuthSuccess();
      router.replace('/settings?tab=integrations', { scroll: false });
    } else if (instagramError) {
      toast.error('Connection Failed', decodeURIComponent(instagramError));
      router.replace('/settings?tab=integrations', { scroll: false });
      setActiveTab('integrations');
      setIsConnectingInstagram(false);
    }
  }, [searchParams, router]);

  const fetchInstagramStatus = async () => {
    setIsLoadingStatus(true);
    setStatusError(false);
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch(`${API_URL}/api/v1/integrations/instagram/status`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch status');
      }

      const data: IntegrationStatusResponse = await response.json();
      setInstagramStatus(data);

      if (data.status === 'CONNECTED_READY') {
        setInstagramConnection({
          isConnected: true,
          username: data.details?.instagramUsername || data.details?.businessName || 'your_business',
          lastSync: new Date(),
        });
      } else if (data.status === 'BLOCKED' || data.status === 'NOT_CONNECTED') {
        setInstagramConnection({ isConnected: false });
      }

      return data;
    } catch (error) {
      console.error('Failed to fetch Instagram status:', error);
      setStatusError(true);
      return null;
    } finally {
      setIsLoadingStatus(false);
    }
  };

  const handleOAuthSuccess = async () => {
    const data = await fetchInstagramStatus();

    if (data?.status === 'CONNECTED_READY') {
      toast.success('Instagram Connected', 'Your Instagram Business account has been successfully connected.');
    } else if (data?.status === 'BLOCKED' && data.reason) {
      toast.error('Connection Issue', getReasonMessage(data.reason));
    }

    setActiveTab('integrations');
    setIsConnectingInstagram(false);
  };

  // Fetch status on mount and when tab changes to integrations
  useEffect(() => {
    if (activeTab === 'integrations') {
      fetchInstagramStatus();
    }
  }, [activeTab]);

  const handleConnectInstagram = async () => {
    setIsConnectingInstagram(true);
    try {
      const token = localStorage.getItem('accessToken');

      // Step 1: Get connection token from backend
      const response = await fetch(`${API_URL}/api/v1/integrations/instagram/connect`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!response.ok) {
        throw new Error('Failed to initialize connection');
      }

      const data = await response.json();

      // Step 2: Redirect to OAuth start endpoint
      window.location.href = `${API_URL}${data.redirectUrl}`;
    } catch (error) {
      console.error('Failed to connect Instagram:', error);
      toast.error('Connection Failed', 'Failed to initialize Instagram connection.');
      setIsConnectingInstagram(false);
    }
  };

  const handleDisconnectInstagram = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      await fetch(`${API_URL}/api/v1/integrations/instagram/disconnect`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setInstagramConnection({ isConnected: false });
      toast.success('Disconnected', 'Instagram account has been disconnected.');
    } catch (error) {
      console.error('Failed to disconnect:', error);
      toast.error('Error', 'Failed to disconnect Instagram account.');
    }
  };

  const handleSaveProfile = async () => {
    setProfileSaving(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    setProfileSaving(false);
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 2000);
  };

  const handleSaveWorkspace = async () => {
    setWorkspaceSaving(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    setWorkspaceSaving(false);
    setWorkspaceSaved(true);
    setTimeout(() => setWorkspaceSaved(false), 2000);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div style={{ fontSize: '18px', fontWeight: 600, color: '#111' }}>Profile Information</div>
            <div style={{ fontSize: '14px', color: '#6B7280', marginTop: '4px' }}>Update your personal details</div>

            <div className="mt-6 flex items-center gap-6">
              <div className="w-20 h-20 rounded-full bg-[#2F5D3E] flex items-center justify-center">
                <span style={{ fontSize: '24px', fontWeight: 600, color: 'white' }}>
                  {user?.name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || '?'}
                </span>
              </div>
              <div>
                <button className="px-4 py-2 bg-gray-100 rounded-xl" style={{ fontSize: '14px', fontWeight: 500, color: '#374151' }}>
                  Change Photo
                </button>
                <div style={{ fontSize: '12px', color: '#9CA3AF', marginTop: '4px' }}>JPG, PNG. Max 2MB</div>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div>
                <label style={{ fontSize: '14px', fontWeight: 500, color: '#374151', display: 'block', marginBottom: '8px' }}>Full Name</label>
                <input
                  type="text"
                  value={profileName}
                  onChange={(e) => setProfileName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900"
                  style={{ fontSize: '14px' }}
                />
              </div>
              <div>
                <label style={{ fontSize: '14px', fontWeight: 500, color: '#374151', display: 'block', marginBottom: '8px' }}>Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={profileEmail}
                    onChange={(e) => setProfileEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900"
                    style={{ fontSize: '14px' }}
                  />
                </div>
              </div>
              <div>
                <label style={{ fontSize: '14px', fontWeight: 500, color: '#374151', display: 'block', marginBottom: '8px' }}>Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    value={profilePhone}
                    onChange={(e) => setProfilePhone(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900"
                    style={{ fontSize: '14px' }}
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <button
                onClick={handleSaveProfile}
                disabled={profileSaving}
                className="px-6 py-3 bg-[#2F5D3E] rounded-xl flex items-center gap-2 hover:bg-[#264a32] transition-colors disabled:opacity-50"
                style={{ fontSize: '14px', fontWeight: 500, color: 'white' }}
              >
                {profileSaving ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : profileSaved ? (
                  <Check className="w-4 h-4" />
                ) : null}
                {profileSaved ? 'Saved' : 'Save Changes'}
              </button>
              <button className="px-6 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors" style={{ fontSize: '14px', fontWeight: 500, color: '#374151' }}>
                Cancel
              </button>
            </div>
          </div>
        );

      case 'workspace':
        return (
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div style={{ fontSize: '18px', fontWeight: 600, color: '#111' }}>Workspace Settings</div>
            <div style={{ fontSize: '14px', color: '#6B7280', marginTop: '4px' }}>Configure your workspace preferences</div>

            <div className="mt-6 space-y-4">
              <div>
                <label style={{ fontSize: '14px', fontWeight: 500, color: '#374151', display: 'block', marginBottom: '8px' }}>Brand Name</label>
                <input
                  type="text"
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  placeholder="Enter your brand name"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900"
                  style={{ fontSize: '14px' }}
                />
              </div>
              <div>
                <label style={{ fontSize: '14px', fontWeight: 500, color: '#374151', display: 'block', marginBottom: '8px' }}>Timezone</label>
                <div className="relative">
                  <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <select
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 appearance-none bg-white"
                    style={{ fontSize: '14px' }}
                  >
                    <option value="Asia/Kolkata">India (IST)</option>
                    <option value="America/New_York">Eastern Time (ET)</option>
                    <option value="America/Los_Angeles">Pacific Time (PT)</option>
                    <option value="Europe/London">London (GMT)</option>
                    <option value="Asia/Dubai">Dubai (GST)</option>
                  </select>
                </div>
              </div>
              <div>
                <label style={{ fontSize: '14px', fontWeight: 500, color: '#374151', display: 'block', marginBottom: '8px' }}>Business Category</label>
                <select
                  value={businessCategory}
                  onChange={(e) => setBusinessCategory(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 appearance-none bg-white"
                  style={{ fontSize: '14px' }}
                >
                  <option value="">Select a category</option>
                  <option value="ecommerce">E-commerce</option>
                  <option value="retail">Retail</option>
                  <option value="services">Services</option>
                  <option value="saas">SaaS</option>
                  <option value="agency">Agency</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <button
                onClick={handleSaveWorkspace}
                disabled={workspaceSaving}
                className="px-6 py-3 bg-[#2F5D3E] rounded-xl flex items-center gap-2 hover:bg-[#264a32] transition-colors disabled:opacity-50"
                style={{ fontSize: '14px', fontWeight: 500, color: 'white' }}
              >
                {workspaceSaving ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : workspaceSaved ? (
                  <Check className="w-4 h-4" />
                ) : null}
                {workspaceSaved ? 'Saved' : 'Save Changes'}
              </button>
              <button className="px-6 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors" style={{ fontSize: '14px', fontWeight: 500, color: '#374151' }}>
                Cancel
              </button>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div style={{ fontSize: '18px', fontWeight: 600, color: '#111' }}>Notification Preferences</div>
            <div style={{ fontSize: '14px', color: '#6B7280', marginTop: '4px' }}>Manage how you receive notifications</div>

            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between py-4 border-b border-gray-100">
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 500, color: '#111' }}>New Messages</div>
                  <div style={{ fontSize: '13px', color: '#6B7280', marginTop: '2px' }}>Get notified when you receive new messages</div>
                </div>
                <Toggle enabled={notifNewMessages} onChange={setNotifNewMessages} />
              </div>
              <div className="flex items-center justify-between py-4 border-b border-gray-100">
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 500, color: '#111' }}>Lead Updates</div>
                  <div style={{ fontSize: '13px', color: '#6B7280', marginTop: '2px' }}>Notifications for lead status changes</div>
                </div>
                <Toggle enabled={notifLeadUpdates} onChange={setNotifLeadUpdates} />
              </div>
              <div className="flex items-center justify-between py-4 border-b border-gray-100">
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 500, color: '#111' }}>Orders</div>
                  <div style={{ fontSize: '13px', color: '#6B7280', marginTop: '2px' }}>Get notified about new orders and updates</div>
                </div>
                <Toggle enabled={notifOrders} onChange={setNotifOrders} />
              </div>
              <div className="flex items-center justify-between py-4">
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 500, color: '#111' }}>Email Notifications</div>
                  <div style={{ fontSize: '13px', color: '#6B7280', marginTop: '2px' }}>Receive daily summary via email</div>
                </div>
                <Toggle enabled={notifEmail} onChange={setNotifEmail} />
              </div>
            </div>
          </div>
        );

      case 'integrations':
        return (
          <div className="space-y-4">
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div style={{ fontSize: '18px', fontWeight: 600, color: '#111' }}>Connected Platforms</div>
              <div style={{ fontSize: '14px', color: '#6B7280', marginTop: '4px' }}>Manage your social media integrations</div>
            </div>

            {/* Instagram Card */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              {/* Loading State */}
              {isLoadingStatus && (
                <div className="flex items-center gap-3">
                  <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
                  <span style={{ fontSize: '14px', color: '#6B7280' }}>Checking Instagram status...</span>
                </div>
              )}

              {/* Error State */}
              {statusError && !isLoadingStatus && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 flex items-center justify-center">
                      <Instagram className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div style={{ fontSize: '16px', fontWeight: 600, color: '#111' }}>Instagram</div>
                      <div style={{ fontSize: '13px', color: '#EF4444', marginTop: '2px' }}>
                        Couldn't check Instagram status. Try again.
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={fetchInstagramStatus}
                    className="px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                    style={{ fontSize: '14px', fontWeight: 500, color: '#374151' }}
                  >
                    Retry
                  </button>
                </div>
              )}

              {/* Main Content - only show when not loading and no error */}
              {!isLoadingStatus && !statusError && (
                <>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 flex items-center justify-center">
                        <Instagram className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span style={{ fontSize: '16px', fontWeight: 600, color: '#111' }}>Instagram</span>
                          {instagramStatus?.status === 'CONNECTED_READY' && (
                            <span className="px-2 py-0.5 bg-[#2F5D3E]/10 rounded-full flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#2F5D3E]" />
                              <span style={{ fontSize: '11px', fontWeight: 500, color: '#2F5D3E' }}>Connected</span>
                            </span>
                          )}
                          {instagramStatus?.status === 'PENDING' && (
                            <span className="px-2 py-0.5 bg-amber-100 rounded-full flex items-center gap-1">
                              <Loader2 className="w-3 h-3 animate-spin text-amber-600" />
                              <span style={{ fontSize: '11px', fontWeight: 500, color: '#D97706' }}>Connecting...</span>
                            </span>
                          )}
                          {instagramStatus?.status === 'BLOCKED' && (
                            <span className="px-2 py-0.5 bg-amber-100 rounded-full flex items-center gap-1">
                              <AlertTriangle className="w-3 h-3 text-amber-600" />
                              <span style={{ fontSize: '11px', fontWeight: 500, color: '#D97706' }}>Action Required</span>
                            </span>
                          )}
                        </div>
                        <div style={{ fontSize: '13px', color: '#6B7280', marginTop: '2px' }}>
                          {instagramStatus?.status === 'CONNECTED_READY' && instagramStatus.details?.instagramUsername
                            ? `@${instagramStatus.details.instagramUsername}`
                            : instagramStatus?.status === 'CONNECTED_READY' && instagramStatus.details?.businessName
                              ? instagramStatus.details.businessName
                              : instagramStatus?.status === 'NOT_CONNECTED'
                                ? 'Connect your Instagram Business account to receive DMs'
                                : instagramStatus?.status === 'BLOCKED' && instagramStatus.reason
                                  ? getReasonMessage(instagramStatus.reason)
                                  : instagramStatus?.status === 'PENDING'
                                    ? 'Setting up your connection...'
                                    : 'Connect your Instagram Business account to receive DMs'
                          }
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons based on status */}
                    <div className="flex items-center gap-2">
                      {/* NOT_CONNECTED: Show Connect button */}
                      {(!instagramStatus || instagramStatus.status === 'NOT_CONNECTED') && (
                        <button
                          onClick={handleConnectInstagram}
                          disabled={isConnectingInstagram}
                          className="px-4 py-2 bg-[#2F5D3E] rounded-xl hover:bg-[#264a32] transition-colors disabled:opacity-50 flex items-center gap-2"
                          style={{ fontSize: '14px', fontWeight: 500, color: 'white' }}
                        >
                          {isConnectingInstagram && <Loader2 className="w-4 h-4 animate-spin" />}
                          Connect
                        </button>
                      )}

                      {/* CONNECTED_READY: Show Disconnect button */}
                      {instagramStatus?.status === 'CONNECTED_READY' && (
                        <button
                          onClick={handleDisconnectInstagram}
                          className="px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                          style={{ fontSize: '14px', fontWeight: 500, color: '#374151' }}
                        >
                          Disconnect
                        </button>
                      )}

                      {/* PENDING: Show disabled loading button */}
                      {instagramStatus?.status === 'PENDING' && (
                        <button
                          disabled
                          className="px-4 py-2 bg-gray-100 rounded-xl flex items-center gap-2 cursor-not-allowed"
                          style={{ fontSize: '14px', fontWeight: 500, color: '#9CA3AF' }}
                        >
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Please wait...
                        </button>
                      )}

                      {/* BLOCKED with ADMIN_COOLDOWN: Show disabled button with retry time */}
                      {instagramStatus?.status === 'BLOCKED' && instagramStatus.reason === 'ADMIN_COOLDOWN' && (
                        <button
                          disabled
                          className="px-4 py-2 bg-gray-100 rounded-xl flex items-center gap-2 cursor-not-allowed"
                          style={{ fontSize: '14px', fontWeight: 500, color: '#9CA3AF' }}
                        >
                          <Clock className="w-4 h-4" />
                          Wait Required
                        </button>
                      )}

                      {/* BLOCKED with TOKEN_EXPIRED or MISSING_PERMISSIONS: Show Reconnect button */}
                      {instagramStatus?.status === 'BLOCKED' &&
                       (instagramStatus.reason === 'TOKEN_EXPIRED' || instagramStatus.reason === 'MISSING_PERMISSIONS') && (
                        <button
                          onClick={handleConnectInstagram}
                          disabled={isConnectingInstagram}
                          className="px-4 py-2 bg-[#2F5D3E] rounded-xl hover:bg-[#264a32] transition-colors disabled:opacity-50 flex items-center gap-2"
                          style={{ fontSize: '14px', fontWeight: 500, color: 'white' }}
                        >
                          {isConnectingInstagram && <Loader2 className="w-4 h-4 animate-spin" />}
                          Reconnect
                        </button>
                      )}

                      {/* BLOCKED with OWNERSHIP_MISMATCH: Show Business Settings button */}
                      {instagramStatus?.status === 'BLOCKED' && instagramStatus.reason === 'OWNERSHIP_MISMATCH' && (
                        <a
                          href="https://business.facebook.com/settings"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 bg-[#2F5D3E] rounded-xl hover:bg-[#264a32] transition-colors flex items-center gap-2"
                          style={{ fontSize: '14px', fontWeight: 500, color: 'white' }}
                        >
                          Open Business Settings
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}

                      {/* BLOCKED with IG_NOT_LINKED_TO_PAGE or NO_PAGES_FOUND: Show Setup Steps button */}
                      {instagramStatus?.status === 'BLOCKED' &&
                       (instagramStatus.reason === 'IG_NOT_LINKED_TO_PAGE' || instagramStatus.reason === 'NO_PAGES_FOUND') && (
                        <button
                          onClick={() => setShowSetupModal(true)}
                          className="px-4 py-2 bg-[#2F5D3E] rounded-xl hover:bg-[#264a32] transition-colors flex items-center gap-2"
                          style={{ fontSize: '14px', fontWeight: 500, color: 'white' }}
                        >
                          Show Setup Steps
                        </button>
                      )}
                    </div>
                  </div>

                  {/* ADMIN_COOLDOWN: Show retry date */}
                  {instagramStatus?.status === 'BLOCKED' && instagramStatus.reason === 'ADMIN_COOLDOWN' && instagramStatus.retryAt && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-2 text-amber-600">
                        <Clock className="w-4 h-4" />
                        <span style={{ fontSize: '13px' }}>
                          You can reconnect on {formatRetryDate(instagramStatus.retryAt)}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* CONNECTED_READY: Show connection date */}
                  {instagramStatus?.status === 'CONNECTED_READY' && instagramConnection.lastSync && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <div style={{ fontSize: '12px', color: '#9CA3AF' }}>
                        Connected on {new Date(instagramConnection.lastSync).toLocaleDateString()}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Setup Steps Modal */}
            {showSetupModal && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 shadow-xl">
                  <div className="flex items-center justify-between mb-4">
                    <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#111' }}>Setup Steps</h3>
                    <button
                      onClick={() => setShowSetupModal(false)}
                      className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <X className="w-5 h-5 text-gray-500" />
                    </button>
                  </div>
                  <p style={{ fontSize: '14px', color: '#6B7280', marginBottom: '16px' }}>
                    Complete these steps to connect your Instagram account:
                  </p>
                  <ol className="space-y-4">
                    <li className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#2F5D3E] text-white flex items-center justify-center" style={{ fontSize: '12px', fontWeight: 600 }}>1</span>
                      <div>
                        <div style={{ fontSize: '14px', fontWeight: 500, color: '#111' }}>Create a Business Page</div>
                        <div style={{ fontSize: '13px', color: '#6B7280', marginTop: '2px' }}>
                          Go to Meta and create a Business Page if you haven't already.
                        </div>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#2F5D3E] text-white flex items-center justify-center" style={{ fontSize: '12px', fontWeight: 600 }}>2</span>
                      <div>
                        <div style={{ fontSize: '14px', fontWeight: 500, color: '#111' }}>Switch to Business Account</div>
                        <div style={{ fontSize: '13px', color: '#6B7280', marginTop: '2px' }}>
                          In Instagram, go to Settings → Account → Switch to Professional Account.
                        </div>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#2F5D3E] text-white flex items-center justify-center" style={{ fontSize: '12px', fontWeight: 600 }}>3</span>
                      <div>
                        <div style={{ fontSize: '14px', fontWeight: 500, color: '#111' }}>Link to Your Page</div>
                        <div style={{ fontSize: '13px', color: '#6B7280', marginTop: '2px' }}>
                          Connect your Instagram account to your Business Page in Instagram settings.
                        </div>
                      </div>
                    </li>
                  </ol>
                  <div className="mt-6 flex gap-3">
                    <button
                      onClick={() => setShowSetupModal(false)}
                      className="flex-1 px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                      style={{ fontSize: '14px', fontWeight: 500, color: '#374151' }}
                    >
                      Close
                    </button>
                    <button
                      onClick={() => {
                        setShowSetupModal(false);
                        handleConnectInstagram();
                      }}
                      className="flex-1 px-4 py-3 bg-[#2F5D3E] rounded-xl hover:bg-[#264a32] transition-colors"
                      style={{ fontSize: '14px', fontWeight: 500, color: 'white' }}
                    >
                      Try Connecting
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* WhatsApp Card */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#25D366] flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span style={{ fontSize: '16px', fontWeight: 600, color: '#111' }}>WhatsApp</span>
                      {whatsappConnected && (
                        <span className="w-2 h-2 rounded-full bg-[#2F5D3E]" />
                      )}
                    </div>
                    <div style={{ fontSize: '13px', color: '#6B7280', marginTop: '2px' }}>
                      {whatsappConnected
                        ? whatsappPhone
                        : 'Connect WhatsApp Business to manage conversations'
                      }
                    </div>
                  </div>
                </div>
                {whatsappConnected ? (
                  <button
                    onClick={() => setWhatsappConnected(false)}
                    className="px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                    style={{ fontSize: '14px', fontWeight: 500, color: '#374151' }}
                  >
                    Disconnect
                  </button>
                ) : (
                  <button
                    onClick={() => setWhatsappConnected(true)}
                    className="px-4 py-2 bg-[#2F5D3E] rounded-xl hover:bg-[#264a32] transition-colors"
                    style={{ fontSize: '14px', fontWeight: 500, color: 'white' }}
                  >
                    Connect
                  </button>
                )}
              </div>
              {whatsappConnected && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div style={{ fontSize: '12px', color: '#9CA3AF' }}>
                    Connected on Dec 10, 2024
                  </div>
                </div>
              )}
            </div>

            {/* Facebook Card */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#1877F2] flex items-center justify-center">
                    <Facebook className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span style={{ fontSize: '16px', fontWeight: 600, color: '#111' }}>Facebook</span>
                      {facebookConnected && (
                        <span className="w-2 h-2 rounded-full bg-[#2F5D3E]" />
                      )}
                    </div>
                    <div style={{ fontSize: '13px', color: '#6B7280', marginTop: '2px' }}>
                      {facebookConnected
                        ? facebookPage
                        : 'Connect your Facebook Page to manage Messenger'
                      }
                    </div>
                  </div>
                </div>
                {facebookConnected ? (
                  <button
                    onClick={() => setFacebookConnected(false)}
                    className="px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                    style={{ fontSize: '14px', fontWeight: 500, color: '#374151' }}
                  >
                    Disconnect
                  </button>
                ) : (
                  <button
                    onClick={() => setFacebookConnected(true)}
                    className="px-4 py-2 bg-[#2F5D3E] rounded-xl hover:bg-[#264a32] transition-colors"
                    style={{ fontSize: '14px', fontWeight: 500, color: 'white' }}
                  >
                    Connect
                  </button>
                )}
              </div>
              {facebookConnected && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div style={{ fontSize: '12px', color: '#9CA3AF' }}>
                    Connected on Dec 8, 2024
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case 'billing':
        return (
          <div className="space-y-4">
            {/* Current Plan */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <span style={{ fontSize: '18px', fontWeight: 600, color: '#111' }}>Professional Plan</span>
                    <span className="px-2.5 py-1 bg-[#2F5D3E]/10 rounded-lg" style={{ fontSize: '12px', fontWeight: 500, color: '#2F5D3E' }}>Active</span>
                  </div>
                  <div style={{ fontSize: '28px', fontWeight: 700, color: '#111', marginTop: '8px' }}>
                    $7.99<span style={{ fontSize: '14px', fontWeight: 400, color: '#6B7280' }}>/month</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-[#2F5D3E]" />
                  <span style={{ fontSize: '14px', color: '#374151' }}>Unlimited conversations</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-[#2F5D3E]" />
                  <span style={{ fontSize: '14px', color: '#374151' }}>Up to 5 team members</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-[#2F5D3E]" />
                  <span style={{ fontSize: '14px', color: '#374151' }}>Advanced analytics</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-[#2F5D3E]" />
                  <span style={{ fontSize: '14px', color: '#374151' }}>Priority support</span>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-3">
                <button className="px-6 py-3 bg-[#2F5D3E] rounded-xl hover:bg-[#264a32] transition-colors" style={{ fontSize: '14px', fontWeight: 500, color: 'white' }}>
                  Change Plan
                </button>
                <button className="px-6 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors" style={{ fontSize: '14px', fontWeight: 500, color: '#374151' }}>
                  Cancel Subscription
                </button>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div style={{ fontSize: '16px', fontWeight: 600, color: '#111' }}>Payment Method</div>
              <div className="mt-4 flex items-center justify-between p-4 border border-gray-200 rounded-xl">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-8 bg-gray-900 rounded-md flex items-center justify-center">
                    <span style={{ fontSize: '10px', fontWeight: 600, color: 'white', letterSpacing: '1px' }}>VISA</span>
                  </div>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 500, color: '#111' }}>•••• •••• •••• 4242</div>
                    <div style={{ fontSize: '13px', color: '#6B7280' }}>Expires 12/26</div>
                  </div>
                </div>
                <button className="px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors" style={{ fontSize: '14px', fontWeight: 500, color: '#374151' }}>
                  Update
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="h-full overflow-auto bg-[#F8F9FA]">
      <div className="p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 style={{ fontSize: '24px', fontWeight: 600, color: '#111' }}>Settings</h1>
          <p style={{ fontSize: '14px', color: '#6B7280', marginTop: '4px' }}>Manage your account and preferences</p>
        </div>

        {/* Main Layout */}
        <div className="flex gap-6">
          {/* Sidebar */}
          <div className="w-64 flex-shrink-0">
            <nav className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    'w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors',
                    activeTab === tab.id
                      ? 'bg-[#2F5D3E]/5 text-[#2F5D3E]'
                      : 'text-gray-600 hover:bg-gray-100'
                  )}
                  style={{ fontSize: '14px', fontWeight: activeTab === tab.id ? 500 : 400 }}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1 max-w-[1024px]">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}
