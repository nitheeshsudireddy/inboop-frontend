import { create } from 'zustand';
import { ExtendedOrder } from '@/lib/orders.mock';
import { OrderStatus } from '@/components/orders/OrderStatusBadge';
import { isNotArchived } from '@/types';
import * as ordersApi from '@/lib/ordersApi';

// Deep clone helper for orders
const cloneOrder = (order: ExtendedOrder): ExtendedOrder => ({
  ...order,
  customer: { ...order.customer },
  items: order.items.map((i) => ({ ...i })),
  totals: { ...order.totals },
  address: { ...order.address },
  timeline: order.timeline.map((t) => ({ ...t })),
});

interface OrderState {
  orders: ExtendedOrder[];
  isLoading: boolean;
  includeArchived: boolean;
  error: string | null;
  useApi: boolean; // Toggle between API and mock data
  setIncludeArchived: (include: boolean) => void;
  setUseApi: (useApi: boolean) => void;
  fetchOrders: (mockOrders: ExtendedOrder[]) => void;
  fetchOrdersFromApi: (params?: ordersApi.ListOrdersParams) => Promise<void>;
  addOrder: (order: ExtendedOrder) => void;
  updateOrder: (id: string, updates: Partial<ExtendedOrder>) => void;
  updateOrderStatus: (orderId: string, newStatus: OrderStatus, statusLabel: string) => void;
  archiveOrder: (id: string) => void;
  unarchiveOrder: (id: string) => void;
  softDeleteOrder: (id: string) => void;
  getOrder: (id: string) => ExtendedOrder | undefined;
  getActiveOrders: () => ExtendedOrder[];
  getOrdersByConversationId: (conversationId: string) => ExtendedOrder[];
  getOrderByNumber: (orderNumber: string) => ExtendedOrder | undefined;
}

export const useOrderStore = create<OrderState>((set, get) => ({
  orders: [],
  isLoading: true,
  includeArchived: false,
  error: null,
  useApi: false, // Default to mock data for backward compatibility

  setIncludeArchived: (include) => set({ includeArchived: include }),

  setUseApi: (useApi) => set({ useApi }),

  // Fetch orders using mock data (original behavior)
  fetchOrders: (mockOrders) => {
    set({
      orders: mockOrders.map(cloneOrder),
      isLoading: false,
      error: null,
    });
  },

  // Fetch orders from API
  fetchOrdersFromApi: async (params = {}) => {
    set({ isLoading: true, error: null });
    try {
      const response = await ordersApi.listOrders(params);

      // Transform API response to ExtendedOrder format
      const orders: ExtendedOrder[] = response.items.map((item) => ({
        id: item.id.toString(),
        orderNumber: item.orderNumber,
        status: item.orderStatus as OrderStatus,
        customer: {
          name: item.customerName || 'Unknown',
          handle: item.customerHandle || '',
          channel: (item.channel?.toLowerCase() || 'instagram') as 'instagram' | 'whatsapp' | 'messenger',
        },
        items: [], // Will be loaded in detail view
        totals: {
          subtotal: item.totalAmount || 0,
          shipping: 0,
          discount: 0,
          total: item.totalAmount || 0,
        },
        address: {
          street: '',
          city: '',
          state: '',
          postalCode: '',
          country: '',
        },
        timeline: [],
        paymentMethod: (item.paymentMethod?.toLowerCase() || 'Pending') as any,
        paymentStatus: (item.paymentStatus?.toLowerCase() || 'unpaid') as any,
        createdAt: new Date(item.createdAt),
        updatedAt: new Date(item.lastUpdatedAt),
      }));

      set({
        orders,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      console.error('Failed to fetch orders from API:', error);
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch orders',
      });
    }
  },

  addOrder: (order) => {
    set((state) => ({
      orders: [cloneOrder(order), ...state.orders],
    }));
  },

  updateOrder: (id, updates) =>
    set((state) => ({
      orders: state.orders.map((order) =>
        order.id === id ? { ...order, ...updates, updatedAt: new Date() } : order
      ),
    })),

  updateOrderStatus: (orderId, newStatus, statusLabel) => {
    set((state) => ({
      orders: state.orders.map((order) => {
        if (order.id !== orderId) return order;

        const now = new Date();
        const newTimelineEvent = {
          id: `t${Date.now()}`,
          status: newStatus,
          label: `Status changed to ${statusLabel}`,
          description: 'Updated by you',
          timestamp: now,
        };

        return {
          ...order,
          status: newStatus,
          updatedAt: now,
          timeline: [...order.timeline, newTimelineEvent],
        };
      }),
    }));
  },

  archiveOrder: (id) =>
    set((state) => ({
      orders: state.orders.map((order) =>
        order.id === id ? { ...order, archivedAt: new Date(), updatedAt: new Date() } : order
      ),
    })),

  unarchiveOrder: (id) =>
    set((state) => ({
      orders: state.orders.map((order) =>
        order.id === id ? { ...order, archivedAt: null, updatedAt: new Date() } : order
      ),
    })),

  softDeleteOrder: (id) =>
    set((state) => ({
      orders: state.orders.map((order) =>
        order.id === id ? { ...order, deletedAt: new Date(), updatedAt: new Date() } : order
      ),
    })),

  getOrder: (id) => get().orders.find((o) => o.id === id),

  // Get active (non-archived, non-deleted) orders
  getActiveOrders: () => {
    const { orders, includeArchived } = get();
    if (includeArchived) {
      // Filter out deleted only
      return orders.filter((order) => order.deletedAt === null || order.deletedAt === undefined);
    }
    // Filter out both archived and deleted
    return orders.filter(isNotArchived);
  },

  getOrdersByConversationId: (conversationId) => {
    const activeOrders = get().getActiveOrders();
    return activeOrders.filter((o) => o.conversationId === conversationId);
  },

  getOrderByNumber: (orderNumber) => {
    return get().orders.find((o) => o.orderNumber === orderNumber);
  },
}));
