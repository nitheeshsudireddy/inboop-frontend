import { create } from 'zustand';
import { Lead } from '@/types';

interface LeadState {
  leads: Lead[];
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
  deleteLead: (id: string) => void;
  addLead: (lead: Lead) => void;
  updateLead: (id: string, updates: Partial<Lead>) => void;
  getLead: (id: string) => Lead | undefined;
  fetchLeads: () => Promise<void>;
}

export const useLeadStore = create<LeadState>((set, get) => ({
  leads: [],
  isLoading: true,
  setLoading: (loading) => set({ isLoading: loading }),
  deleteLead: (id) =>
    set((state) => ({
      leads: state.leads.filter((lead) => lead.id !== id),
    })),
  addLead: (lead) =>
    set((state) => ({
      leads: [lead, ...state.leads],
    })),
  updateLead: (id, updates) =>
    set((state) => ({
      leads: state.leads.map((lead) =>
        lead.id === id ? { ...lead, ...updates } : lead
      ),
    })),
  getLead: (id) => get().leads.find((lead) => lead.id === id),
  fetchLeads: async () => {
    set({ isLoading: true });
    // TODO: Replace with actual API call
    // const response = await fetch('/api/leads');
    // const data = await response.json();
    await new Promise((resolve) => setTimeout(resolve, 500));
    set({ leads: [], isLoading: false });
  },
}));