'use client';

import { useEffect, useCallback, useState } from 'react';
import {
  X,
  Copy,
  Check,
  MessageSquare,
  MapPin,
  Truck,
  Package,
  Clock,
  CreditCard,
  ExternalLink,
  Link2,
  AlertCircle,
  RefreshCw,
  User,
  Users,
  ChevronDown,
  XCircle,
  CheckCircle,
  Circle,
  Loader2,
  Ban,
  DollarSign,
  UserCheck,
  UserMinus,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import * as ordersApi from '@/lib/ordersApi';
import {
  OrderStatus,
  OrderStatusBadge,
  ORDER_STATUS_CONFIG,
  getAllowedNextStatuses,
  getStatusLabel,
} from './OrderStatusBadge';
import { getChannelIcon, getChannelName } from '@/components/shared/ChannelIcons';
import { ChannelType } from '@/types';

interface OrderDetailsDrawerProps {
  orderId: number | null;
  isOpen: boolean;
  onClose: () => void;
  onOrderUpdated?: () => void;
}

// Copy toast state
interface CopyState {
  copied: boolean;
  label: string;
}

// Copy to clipboard hook with toast message
function useCopyToClipboard() {
  const [state, setState] = useState<CopyState>({ copied: false, label: '' });

  const copy = useCallback((text: string, label: string = 'Copied') => {
    navigator.clipboard.writeText(text);
    setState({ copied: true, label });
    setTimeout(() => setState({ copied: false, label: '' }), 2000);
  }, []);

  return { ...state, copy };
}

// Format currency
function formatCurrency(amount: number, currency?: string | null): string {
  const symbol = currency === 'INR' ? '₹' : '$';
  return `${symbol}${amount.toLocaleString()}`;
}

// Format date
function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

// Format relative time
function formatRelativeTime(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString();
}

// Format full timestamp for tooltip
function formatFullTimestamp(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

// Payment status config
const PAYMENT_STATUS_CONFIG: Record<
  ordersApi.PaymentStatus,
  { label: string; bgColor: string; textColor: string }
> = {
  UNPAID: { label: 'Unpaid', bgColor: 'bg-amber-50', textColor: 'text-amber-700' },
  PAID: { label: 'Paid', bgColor: 'bg-emerald-50', textColor: 'text-emerald-700' },
  REFUNDED: { label: 'Refunded', bgColor: 'bg-purple-50', textColor: 'text-purple-700' },
};

// Timeline icon mapping
function getTimelineIcon(type: string, status?: string) {
  if (status === 'CANCELLED') return <XCircle className="w-4 h-4" />;
  if (status === 'DELIVERED') return <CheckCircle className="w-4 h-4" />;
  if (status === 'SHIPPED') return <Truck className="w-4 h-4" />;
  if (status === 'CONFIRMED') return <Check className="w-4 h-4" />;
  if (type === 'PAYMENT_STATUS_CHANGED') return <CreditCard className="w-4 h-4" />;
  if (type === 'ASSIGNED') return <UserCheck className="w-4 h-4" />;
  if (type === 'UNASSIGNED') return <UserMinus className="w-4 h-4" />;
  return <Circle className="w-4 h-4" />;
}

// Section Header Component
function SectionHeader({
  title,
  icon: Icon,
}: {
  title: string;
  icon?: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div className="flex items-center gap-2 mb-3">
      {Icon && <Icon className="w-4 h-4 text-gray-400" />}
      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{title}</h3>
    </div>
  );
}

// Copy Toast Component
function CopyToast({ visible, label }: { visible: boolean; label: string }) {
  return (
    <div
      className={cn(
        'fixed top-6 left-1/2 -translate-x-1/2 z-[60] px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg shadow-lg transition-all duration-300',
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
      )}
    >
      <span className="flex items-center gap-2">
        <Check className="w-4 h-4 text-emerald-400" />
        {label}
      </span>
    </div>
  );
}

// Payment Status Badge Component
function PaymentStatusBadge({ status }: { status: ordersApi.PaymentStatus }) {
  const config = PAYMENT_STATUS_CONFIG[status];
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold',
        config.bgColor,
        config.textColor
      )}
    >
      {config.label}
    </span>
  );
}

// Action Button Component
function ActionButton({
  onClick,
  disabled,
  loading,
  variant = 'default',
  children,
  className,
}: {
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: 'default' | 'danger' | 'primary';
  children: React.ReactNode;
  className?: string;
}) {
  const baseStyles =
    'flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed';
  const variantStyles = {
    default: 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50',
    danger: 'bg-red-50 border border-red-200 text-red-700 hover:bg-red-100',
    primary:
      'bg-gradient-to-b from-[#2F5D3E] to-[#285239] text-white hover:brightness-110 shadow-sm',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={cn(baseStyles, variantStyles[variant], className)}
    >
      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
      {children}
    </button>
  );
}

export function OrderDetailsDrawer({
  orderId,
  isOpen,
  onClose,
  onOrderUpdated,
}: OrderDetailsDrawerProps) {
  const { copied, label, copy } = useCopyToClipboard();
  const [isAnimating, setIsAnimating] = useState(false);

  // Data states
  const [order, setOrder] = useState<ordersApi.OrderDetail | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Action loading states
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  // Dropdown states
  const [showPaymentDropdown, setShowPaymentDropdown] = useState(false);
  const [showAssignDropdown, setShowAssignDropdown] = useState(false);

  // Fetch order detail
  const fetchOrder = useCallback(async () => {
    if (!orderId) return;

    setIsLoading(true);
    setError(null);

    try {
      const data = await ordersApi.getOrder(orderId);
      setOrder(data);
    } catch (err) {
      console.error('Failed to fetch order:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch order');
    } finally {
      setIsLoading(false);
    }
  }, [orderId]);

  // Fetch on open
  useEffect(() => {
    if (isOpen && orderId) {
      fetchOrder();
    }
  }, [isOpen, orderId, fetchOrder]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Handle animation states
  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
    }
  }, [isOpen]);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close dropdowns on click outside
  useEffect(() => {
    function handleClickOutside() {
      setShowPaymentDropdown(false);
      setShowAssignDropdown(false);
    }
    if (showPaymentDropdown || showAssignDropdown) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [showPaymentDropdown, showAssignDropdown]);

  // Reset on close
  useEffect(() => {
    if (!isOpen) {
      // Delay reset to allow animation
      const timer = setTimeout(() => {
        setOrder(null);
        setError(null);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen && !isAnimating) return null;

  const handleTransitionEnd = () => {
    if (!isOpen) {
      setIsAnimating(false);
    }
  };

  // Action handlers
  const handleAction = async (
    actionName: string,
    actionFn: () => Promise<ordersApi.OrderDetail>
  ) => {
    if (!order) return;

    setActionLoading(actionName);
    try {
      const updatedOrder = await actionFn();
      setOrder(updatedOrder);
      onOrderUpdated?.();
    } catch (err) {
      console.error(`Failed to ${actionName}:`, err);
      setError(err instanceof Error ? err.message : `Failed to ${actionName}`);
    } finally {
      setActionLoading(null);
    }
  };

  const handleConfirm = () =>
    handleAction('confirm', () => ordersApi.confirmOrder(order!.id));

  const handleShip = () =>
    handleAction('ship', () => ordersApi.shipOrder(order!.id));

  const handleDeliver = () =>
    handleAction('deliver', () => ordersApi.deliverOrder(order!.id));

  const handleCancel = () =>
    handleAction('cancel', () => ordersApi.cancelOrder(order!.id));

  const handleRefund = () =>
    handleAction('refund', () => ordersApi.refundOrder(order!.id));

  const handlePaymentStatus = async (status: ordersApi.PaymentStatus) => {
    setShowPaymentDropdown(false);
    await handleAction('payment', () =>
      ordersApi.updatePaymentStatus(order!.id, { paymentStatus: status })
    );
  };

  const handleAssign = async (userId: number | null) => {
    setShowAssignDropdown(false);
    await handleAction('assign', () =>
      ordersApi.assignOrder(order!.id, { assignedToUserId: userId })
    );
  };

  // Determine allowed actions based on status
  const allowedNextStatuses = order ? getAllowedNextStatuses(order.orderStatus as OrderStatus) : [];
  const canConfirm = allowedNextStatuses.includes('CONFIRMED');
  const canShip = allowedNextStatuses.includes('SHIPPED');
  const canDeliver = allowedNextStatuses.includes('DELIVERED');
  const canCancel = allowedNextStatuses.includes('CANCELLED');
  const canRefund = order?.paymentStatus === 'PAID';
  const isTerminal = order?.orderStatus === 'DELIVERED' || order?.orderStatus === 'CANCELLED';

  return (
    <>
      {/* Overlay */}
      <div
        className={cn(
          'fixed inset-0 bg-black/40 z-40 transition-opacity duration-300',
          isOpen ? 'opacity-100' : 'opacity-0'
        )}
        onClick={onClose}
        onTransitionEnd={handleTransitionEnd}
      />

      {/* Drawer */}
      <div
        className={cn(
          'fixed inset-y-0 right-0 z-50 w-full sm:w-[560px] bg-white shadow-2xl flex flex-col',
          'transition-transform duration-300 ease-out',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
        onTransitionEnd={handleTransitionEnd}
      >
        {/* Copy Toast */}
        <CopyToast visible={copied} label={label} />

        {/* Loading State */}
        {isLoading && (
          <div className="flex-1 p-6 space-y-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <Skeleton className="w-32 h-8" />
                <Skeleton className="w-24 h-5" />
              </div>
              <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="flex gap-2">
              <Skeleton className="w-20 h-7 rounded-md" />
              <Skeleton className="w-16 h-7 rounded-md" />
            </div>
            <div className="space-y-4">
              <Skeleton className="w-full h-24 rounded-xl" />
              <Skeleton className="w-full h-32 rounded-xl" />
              <Skeleton className="w-full h-24 rounded-xl" />
            </div>
          </div>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <div className="flex-1 flex flex-col items-center justify-center p-6">
            <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center mb-4">
              <AlertCircle className="w-8 h-8 text-red-500" />
            </div>
            <p className="text-gray-900 font-medium mb-2">Failed to load order</p>
            <p className="text-sm text-gray-500 mb-4 text-center max-w-sm">{error}</p>
            <div className="flex gap-3">
              <button
                onClick={fetchOrder}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white bg-gray-900 hover:bg-gray-800"
              >
                <RefreshCw className="w-4 h-4" />
                Retry
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Order Content */}
        {order && !isLoading && !error && (
          <>
            {/* Header */}
            <div className="px-6 py-5 border-b border-gray-100 bg-gradient-to-br from-gray-50 to-white">
              {/* Top row: Order ID + Close */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                    {order.orderNumber}
                  </h2>
                  <button
                    onClick={() => copy(order.orderNumber, 'Order ID copied')}
                    className="p-1.5 rounded-lg hover:bg-gray-200/80 transition-colors group"
                    title="Copy order number"
                  >
                    <Copy className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
                  </button>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-gray-200/80 transition-colors -mr-2 -mt-1"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* Status Badges */}
              <div className="flex items-center gap-2 mb-3">
                <OrderStatusBadge status={order.orderStatus as OrderStatus} />
                {order.paymentStatus && <PaymentStatusBadge status={order.paymentStatus} />}
              </div>

              {/* Meta Row */}
              <div className="flex items-center gap-2 text-xs text-gray-500">
                {order.channel && (
                  <>
                    <span className="flex items-center gap-1.5">
                      {getChannelIcon(order.channel.toLowerCase() as ChannelType, 12)}
                      <span>{getChannelName(order.channel.toLowerCase() as ChannelType)}</span>
                    </span>
                    <span className="text-gray-300">•</span>
                  </>
                )}
                {order.paymentMethod && (
                  <>
                    <span className="flex items-center gap-1">
                      <CreditCard className="w-3 h-3" />
                      {order.paymentMethod}
                    </span>
                    <span className="text-gray-300">•</span>
                  </>
                )}
                <span>{formatDate(order.createdAt)}</span>
              </div>
            </div>

            {/* Main Content - Two Column Layout */}
            <div className="flex-1 overflow-hidden flex">
              {/* Left Column - Scrollable Content */}
              <div className="flex-1 overflow-y-auto">
                {/* Customer/Order Summary Section */}
                <div className="px-6 py-5 border-b border-gray-100">
                  <SectionHeader title="Customer" />
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-semibold text-gray-600">
                        {(order.customerName || order.customerHandle || 'U')
                          .split(' ')
                          .map((n) => n[0])
                          .join('')
                          .toUpperCase()
                          .slice(0, 2)}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-gray-900">
                          {order.customerName || 'Unknown'}
                        </p>
                        {order.channel && (
                          <span className="flex-shrink-0">
                            {getChannelIcon(order.channel.toLowerCase() as ChannelType, 14)}
                          </span>
                        )}
                      </div>
                      {order.customerHandle && (
                        <p className="text-sm text-gray-500">@{order.customerHandle}</p>
                      )}
                    </div>
                  </div>

                  {/* Quick Links */}
                  <div className="flex gap-2 mt-4">
                    {order.conversationId ? (
                      <a
                        href={`/inbox?conversation=${order.conversationId}`}
                        className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        View conversation
                      </a>
                    ) : (
                      <button
                        disabled
                        className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-gray-100 text-gray-400 rounded-lg text-sm font-medium cursor-not-allowed"
                        title="Not linked to a conversation"
                      >
                        <MessageSquare className="w-4 h-4" />
                        No conversation
                      </button>
                    )}
                    {order.leadId && (
                      <a
                        href={`/leads?lead=${order.leadId}`}
                        className="flex items-center justify-center gap-2 py-2 px-3 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                      >
                        <Link2 className="w-4 h-4" />
                        Lead
                      </a>
                    )}
                  </div>

                  {/* Total Amount */}
                  <div className="mt-4 p-3 bg-gray-50 rounded-xl flex items-center justify-between">
                    <span className="text-sm text-gray-600">Total Amount</span>
                    <span className="text-lg font-bold text-gray-900">
                      {formatCurrency(order.totalAmount || 0, order.currency)}
                    </span>
                  </div>
                </div>

                {/* Items Section */}
                <div className="px-6 py-5 border-b border-gray-100">
                  <SectionHeader title="Items" icon={Package} />

                  {order.items.length > 0 ? (
                    <div className="bg-gray-50 rounded-xl overflow-hidden">
                      <div className="divide-y divide-gray-100">
                        {order.items.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center justify-between px-4 py-3 bg-white"
                          >
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900">{item.name}</p>
                              <p className="text-xs text-gray-500">
                                {item.quantity} × {formatCurrency(item.unitPrice, order.currency)}
                              </p>
                            </div>
                            <p className="text-sm font-medium text-gray-900 ml-4">
                              {formatCurrency(item.lineTotal, order.currency)}
                            </p>
                          </div>
                        ))}
                      </div>

                      {/* Subtotal */}
                      <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
                        <div className="flex justify-between text-sm font-semibold">
                          <span className="text-gray-700">Subtotal</span>
                          <span className="text-gray-900">
                            {formatCurrency(
                              order.items.reduce((sum, i) => sum + i.lineTotal, 0),
                              order.currency
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-6 text-sm text-gray-500">
                      No items in this order
                    </div>
                  )}
                </div>

                {/* Shipping Section */}
                <div className="px-6 py-5 border-b border-gray-100">
                  <SectionHeader title="Shipping" icon={MapPin} />

                  {order.shippingAddress &&
                  (order.shippingAddress.line1 || order.shippingAddress.city) ? (
                    <div className="bg-gray-50 rounded-xl p-4">
                      {order.shippingAddress.line1 && (
                        <p className="text-sm text-gray-900">{order.shippingAddress.line1}</p>
                      )}
                      {order.shippingAddress.line2 && (
                        <p className="text-sm text-gray-700">{order.shippingAddress.line2}</p>
                      )}
                      <p className="text-sm text-gray-700">
                        {[
                          order.shippingAddress.city,
                          order.shippingAddress.state,
                          order.shippingAddress.postalCode,
                        ]
                          .filter(Boolean)
                          .join(', ')}
                      </p>
                      {order.shippingAddress.country && (
                        <p className="text-sm text-gray-500">{order.shippingAddress.country}</p>
                      )}
                    </div>
                  ) : (
                    <div className="bg-gray-50 rounded-xl p-4 text-center">
                      <p className="text-sm text-gray-500">No shipping address added yet</p>
                    </div>
                  )}

                  {/* Tracking Info */}
                  {order.tracking && (order.tracking.carrier || order.tracking.trackingId) ? (
                    <div className="mt-4 flex items-center gap-3 p-3 bg-purple-50 rounded-xl">
                      <Truck className="w-5 h-5 text-purple-600 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        {order.tracking.carrier && (
                          <p className="text-sm font-medium text-gray-900">
                            {order.tracking.carrier}
                          </p>
                        )}
                        {order.tracking.trackingId && (
                          <p className="text-xs text-gray-600 font-mono">
                            {order.tracking.trackingId}
                          </p>
                        )}
                      </div>
                      {order.tracking.trackingUrl ? (
                        <a
                          href={order.tracking.trackingUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg hover:bg-purple-100 transition-colors"
                        >
                          <ExternalLink className="w-4 h-4 text-purple-600" />
                        </a>
                      ) : order.tracking.trackingId ? (
                        <button
                          onClick={() => copy(order.tracking!.trackingId!, 'Tracking ID copied')}
                          className="p-1.5 rounded-lg hover:bg-purple-100 transition-colors"
                        >
                          <Copy className="w-4 h-4 text-purple-600" />
                        </button>
                      ) : null}
                    </div>
                  ) : (
                    order.orderStatus === 'SHIPPED' && (
                      <div className="mt-4 p-3 bg-amber-50 rounded-xl text-center">
                        <p className="text-sm text-amber-700">No tracking info added</p>
                      </div>
                    )
                  )}
                </div>

                {/* Timeline Section */}
                <div className="px-6 py-5">
                  <SectionHeader title="Timeline" icon={Clock} />

                  {order.timeline.length > 0 ? (
                    <div className="space-y-0">
                      {order.timeline
                        .slice()
                        .reverse()
                        .map((event, index, arr) => (
                          <div key={event.id} className="flex gap-3">
                            {/* Timeline line and dot */}
                            <div className="flex flex-col items-center">
                              <div
                                className={cn(
                                  'w-8 h-8 rounded-full flex items-center justify-center',
                                  event.actorType === 'SYSTEM'
                                    ? 'bg-gray-100 text-gray-500'
                                    : 'bg-blue-50 text-blue-600'
                                )}
                              >
                                {getTimelineIcon(event.type, event.type)}
                              </div>
                              {index < arr.length - 1 && (
                                <div className="w-0.5 flex-1 bg-gray-200 my-1" />
                              )}
                            </div>
                            {/* Content */}
                            <div className={cn('pb-4', index === arr.length - 1 && 'pb-0')}>
                              <p className="text-sm font-medium text-gray-900">
                                {event.description}
                              </p>
                              <div className="flex items-center gap-2 mt-0.5">
                                <span className="text-xs text-gray-400">
                                  {event.actorType === 'USER' && event.actorUserName
                                    ? event.actorUserName
                                    : event.actorType === 'SYSTEM'
                                      ? 'System'
                                      : 'Unknown'}
                                </span>
                                <span className="text-gray-300">•</span>
                                <span
                                  className="text-xs text-gray-400"
                                  title={formatFullTimestamp(event.createdAt)}
                                >
                                  {formatRelativeTime(event.createdAt)}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  ) : (
                    <div className="text-center py-6 text-sm text-gray-500">No timeline events</div>
                  )}
                </div>
              </div>

              {/* Right Sidebar - Actions */}
              <div className="w-64 border-l border-gray-100 bg-gray-50/50 flex flex-col">
                <div className="flex-1 overflow-y-auto p-4 space-y-6">
                  {/* Assignment */}
                  <div>
                    <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                      Assigned To
                    </h4>
                    <div className="relative">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowAssignDropdown(!showAssignDropdown);
                        }}
                        disabled={!!actionLoading}
                        className="w-full flex items-center justify-between gap-2 px-3 py-2.5 bg-white border border-gray-200 rounded-xl text-sm hover:bg-gray-50 disabled:opacity-50"
                      >
                        <span className="flex items-center gap-2">
                          {order.assignedToUserName ? (
                            <>
                              <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium text-gray-600">
                                {order.assignedToUserName
                                  .split(' ')
                                  .map((n) => n[0])
                                  .join('')
                                  .toUpperCase()
                                  .slice(0, 2)}
                              </div>
                              <span className="text-gray-900">{order.assignedToUserName}</span>
                            </>
                          ) : (
                            <>
                              <User className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-500">Unassigned</span>
                            </>
                          )}
                        </span>
                        {actionLoading === 'assign' ? (
                          <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-gray-400" />
                        )}
                      </button>

                      {showAssignDropdown && (
                        <div className="absolute left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden">
                          <button
                            onClick={() => handleAssign(null)}
                            className="w-full px-4 py-2.5 text-sm text-left flex items-center gap-2 hover:bg-gray-50"
                          >
                            <UserMinus className="w-4 h-4 text-gray-400" />
                            Unassign
                          </button>
                          {/* TODO: Add team members list from API */}
                          <button
                            onClick={() => handleAssign(1)}
                            className="w-full px-4 py-2.5 text-sm text-left flex items-center gap-2 hover:bg-gray-50"
                          >
                            <User className="w-4 h-4 text-gray-400" />
                            Assign to me
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Order Actions */}
                  <div>
                    <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                      Actions
                    </h4>
                    <div className="space-y-2">
                      {canConfirm && (
                        <ActionButton
                          onClick={handleConfirm}
                          loading={actionLoading === 'confirm'}
                          disabled={!!actionLoading}
                          variant="primary"
                          className="w-full"
                        >
                          <Check className="w-4 h-4" />
                          Confirm Order
                        </ActionButton>
                      )}

                      {canShip && (
                        <ActionButton
                          onClick={handleShip}
                          loading={actionLoading === 'ship'}
                          disabled={!!actionLoading}
                          variant="primary"
                          className="w-full"
                        >
                          <Truck className="w-4 h-4" />
                          Mark Shipped
                        </ActionButton>
                      )}

                      {canDeliver && (
                        <ActionButton
                          onClick={handleDeliver}
                          loading={actionLoading === 'deliver'}
                          disabled={!!actionLoading}
                          variant="primary"
                          className="w-full"
                        >
                          <CheckCircle className="w-4 h-4" />
                          Mark Delivered
                        </ActionButton>
                      )}

                      {canCancel && (
                        <ActionButton
                          onClick={handleCancel}
                          loading={actionLoading === 'cancel'}
                          disabled={!!actionLoading}
                          variant="danger"
                          className="w-full"
                        >
                          <Ban className="w-4 h-4" />
                          Cancel Order
                        </ActionButton>
                      )}

                      {isTerminal && (
                        <div className="text-center py-2">
                          <p className="text-xs text-gray-500">No actions available</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Payment Status Control */}
                  <div>
                    <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                      Payment
                    </h4>
                    <div className="relative">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowPaymentDropdown(!showPaymentDropdown);
                        }}
                        disabled={!!actionLoading}
                        className="w-full flex items-center justify-between gap-2 px-3 py-2.5 bg-white border border-gray-200 rounded-xl text-sm hover:bg-gray-50 disabled:opacity-50"
                      >
                        <span className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4 text-gray-400" />
                          {order.paymentStatus ? (
                            <PaymentStatusBadge status={order.paymentStatus} />
                          ) : (
                            <span className="text-gray-500">Unknown</span>
                          )}
                        </span>
                        {actionLoading === 'payment' ? (
                          <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-gray-400" />
                        )}
                      </button>

                      {showPaymentDropdown && (
                        <div className="absolute left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden">
                          {(['UNPAID', 'PAID', 'REFUNDED'] as ordersApi.PaymentStatus[]).map(
                            (status) => (
                              <button
                                key={status}
                                onClick={() => handlePaymentStatus(status)}
                                disabled={order.paymentStatus === status}
                                className={cn(
                                  'w-full px-4 py-2.5 text-sm text-left flex items-center gap-2 hover:bg-gray-50',
                                  order.paymentStatus === status &&
                                    'bg-gray-50 font-medium cursor-default'
                                )}
                              >
                                <span
                                  className={cn(
                                    'w-2 h-2 rounded-full',
                                    PAYMENT_STATUS_CONFIG[status].bgColor
                                  )}
                                />
                                {PAYMENT_STATUS_CONFIG[status].label}
                                {order.paymentStatus === status && (
                                  <Check className="w-4 h-4 text-gray-400 ml-auto" />
                                )}
                              </button>
                            )
                          )}
                        </div>
                      )}
                    </div>

                    {/* Refund Button */}
                    {canRefund && (
                      <ActionButton
                        onClick={handleRefund}
                        loading={actionLoading === 'refund'}
                        disabled={!!actionLoading}
                        variant="default"
                        className="w-full mt-2"
                      >
                        <DollarSign className="w-4 h-4" />
                        Issue Refund
                      </ActionButton>
                    )}
                  </div>
                </div>

                {/* Notes (if present) */}
                {order.notes && (
                  <div className="p-4 border-t border-gray-200">
                    <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                      Notes
                    </h4>
                    <p className="text-sm text-gray-600">{order.notes}</p>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
