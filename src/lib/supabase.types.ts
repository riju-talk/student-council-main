import { Database } from './database.types';

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row'];
export type Enums<T extends keyof Database['public']['Enums']> = Database['public']['Enums'][T];

export type ClubProposal = Tables<'club_proposals'>;
export type Approval = Tables<'approvals'>;

// Re-export the database types for convenience
export type { Database };

// This file will be used to define custom types and helpers for the Supabase client
