export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      authorized_admins: {
        Row: {
          id: string
          email: string
          name: string
          role: string
          approval_order: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          name: string
          role: string
          approval_order: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string
          role?: string
          approval_order?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      club_proposals: {
        Row: {
          id: string
          created_at: string
          club_name: string
          founders: string
          proposal_link: string | null
          description: string
          objectives: string
          activities: string
          status: 'pending' | 'approved' | 'rejected'
          updated_at: string
        }
        Insert: {
          id?: string
          created_at?: string
          club_name: string
          founders: string
          proposal_link?: string | null
          description: string
          objectives: string
          activities: string
          status?: 'pending' | 'approved' | 'rejected'
          updated_at?: string
        }
        Update: {
          id?: string
          created_at?: string
          club_name?: string
          founders?: string
          proposal_link?: string | null
          description?: string
          objectives?: string
          activities?: string
          status?: 'pending' | 'approved' | 'rejected'
          updated_at?: string
        }
      }
      approvals: {
        Row: {
          id: string
          proposal_id: string
          admin_email: string
          approved_at: string | null
          comments: string | null
          status: 'pending' | 'approved' | 'rejected'
          created_at: string
          updated_at: string
          type: 'club_proposal' | 'event_proposal'
        }
        Insert: {
          id?: string
          proposal_id: string
          admin_email: string
          approved_at?: string | null
          comments?: string | null
          status?: 'pending' | 'approved' | 'rejected'
          created_at?: string
          updated_at?: string
          type: 'club_proposal' | 'event_proposal'
        }
        Update: {
          id?: string
          proposal_id?: string
          admin_email?: string
          approved_at?: string | null
          comments?: string | null
          status?: 'pending' | 'approved' | 'rejected'
          created_at?: string
          updated_at?: string
          type?: 'club_proposal' | 'event_proposal'
        }
      }
      // Add other tables as needed
      [key: string]: any
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
