import { create } from 'zustand';
import { Lead } from '@/types';
import { mockLeads as initialLeads } from '@/lib/mockData';

interface LeadState {
  leads: Lead[];
  deleteLead: (id: string) => void;
  addLead: (lead: Lead) => void;
  updateLead: (id: string, updates: Partial<Lead>) => void;
  getLead: (id: string) => Lead | undefined;
}

export const useLeadStore = create<LeadState>((set, get) => ({
  leads: initialLeads,
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
}));