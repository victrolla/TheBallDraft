// Mock Supabase Client for Development
// In a real app, you would import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL || 'https://mock.supabase.co';
const SUPABASE_ANON_KEY = process.env.REACT_APP_SUPABASE_ANON_KEY || 'mock-key';

// Mock implementation of the client
export const supabase = {
  auth: {
    signInWithPassword: async ({ email, password }: any) => {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      if (email && password) return { data: { user: { email } }, error: null };
      return { data: null, error: { message: "Invalid credentials" } };
    },
    signOut: async () => {
      return { error: null };
    },
    getUser: async () => {
      return { data: { user: { email: 'mock@fleetcmd.co.nz' } }, error: null };
    }
  },
  from: (table: string) => ({
    select: async () => ({ data: [], error: null }),
    insert: async (data: any) => ({ data, error: null }),
    update: async (data: any) => ({ data, error: null }),
    delete: async () => ({ error: null }),
    eq: function() { return this; },
    order: function() { return this; }
  })
};