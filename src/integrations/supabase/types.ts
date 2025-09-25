export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      authorized_admins: {
        Row: {
          approval_order: number
          created_at: string
          email: string
          id: string
          is_active: boolean
          name: string
          role: string
          updated_at: string
        }
        Insert: {
          approval_order: number
          created_at?: string
          email: string
          id?: string
          is_active?: boolean
          name: string
          role: string
          updated_at?: string
        }
        Update: {
          approval_order?: number
          created_at?: string
          email?: string
          id?: string
          is_active?: boolean
          name?: string
          role?: string
          updated_at?: string
        }
        Relationships: []
      }
      club_proposals: {
        Row: {
          id: string
          created_at: string
          club_name: string | null
          founders: string | null
          proposal_link: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          club_name?: string | null
          founders?: string | null
          proposal_link?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          club_name?: string | null
          founders?: string | null
          proposal_link?: string | null
        }
        Relationships: []
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
          type: 'club' | 'event'
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
          type?: string | null
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
          type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "approvals_proposal_id_fkey"
            columns: ["proposal_id"]
            isOneToOne: false
            referencedRelation: "club_proposals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "approvals_admin_email_fkey"
            columns: ["admin_email"]
            isOneToOne: false
            referencedRelation: "authorized_admins"
            referencedColumns: ["email"]
          }
        ]
      }
      club_formation_requests: {
        Row: {
          charter_document_url: string | null
          club_description: string
          club_name: string
          club_objectives: string
          created_at: string
          faculty_advisor: string | null
          id: string
          initial_members: string[] | null
          proposed_activities: string | null
          proposed_by_email: string
          proposed_by_name: string
          proposed_by_phone: string | null
          status: string | null
          updated_at: string
        }
        Insert: {
          charter_document_url?: string | null
          club_description: string
          club_name: string
          club_objectives: string
          created_at?: string
          faculty_advisor?: string | null
          id?: string
          initial_members?: string[] | null
          proposed_activities?: string | null
          proposed_by_email: string
          proposed_by_name: string
          proposed_by_phone?: string | null
          status?: string | null
          updated_at?: string
        }
        Update: {
          charter_document_url?: string | null
          club_description?: string
          club_name?: string
          club_objectives?: string
          created_at?: string
          faculty_advisor?: string | null
          id?: string
          initial_members?: string[] | null
          proposed_activities?: string | null
          proposed_by_email?: string
          proposed_by_name?: string
          proposed_by_phone?: string | null
          status?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      clubs: {
        Row: {
          avatar_url: string
          channel_links: string | null
          coordinator_emails: string
          coordinator_names: string
          created_at: string
          description: string | null
          id: string
          is_active: boolean | null
          name: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string
          channel_links?: string | null
          coordinator_emails: string
          coordinator_names: string
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string
          channel_links?: string | null
          coordinator_emails?: string
          coordinator_names?: string
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      event_approvals: {
        Row: {
          admin_email: string
          approved_at: string | null
          comments: string | null
          created_at: string
          event_proposal_id: string
          id: string
          status: string
          updated_at: string
        }
        Insert: {
          admin_email: string
          approved_at?: string | null
          comments?: string | null
          created_at?: string
          event_proposal_id: string
          id?: string
          status?: string
          updated_at?: string
        }
        Update: {
          admin_email?: string
          approved_at?: string | null
          comments?: string | null
          created_at?: string
          event_proposal_id?: string
          id?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "event_approvals_admin_email_fkey"
            columns: ["admin_email"]
            isOneToOne: false
            referencedRelation: "authorized_admins"
            referencedColumns: ["email"]
          },
          {
            foreignKeyName: "event_approvals_event_proposal_id_fkey"
            columns: ["event_proposal_id"]
            isOneToOne: false
            referencedRelation: "event_proposals"
            referencedColumns: ["id"]
          },
        ]
      }
      event_proposals: {
        Row: {
          id: string
          event_name: string
          organizer_email: string
          organizer_phone: string | null
          event_type: string
          description: string
          pdf_document_url: string | null
          status: 'pending' | 'approved' | 'rejected' | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          event_name: string
          organizer_email: string
          organizer_phone?: string | null
          event_type: string
          description: string
          pdf_document_url?: string | null
          status?: 'pending' | 'approved' | 'rejected' | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          event_name?: string
          organizer_email?: string
          organizer_phone?: string | null
          event_type?: string
          description?: string
          pdf_document_url?: string | null
          status?: 'pending' | 'approved' | 'rejected' | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      hostel_info: {
        Row: {
          capacity: number | null
          created_at: string
          emergency_contact: string | null
          facilities: string[] | null
          hostel_name: string
          id: string
          rules: string[] | null
          timings: Json | null
          updated_at: string
          warden_contact: string | null
          warden_name: string | null
        }
        Insert: {
          capacity?: number | null
          created_at?: string
          emergency_contact?: string | null
          facilities?: string[] | null
          hostel_name: string
          id?: string
          rules?: string[] | null
          timings?: Json | null
          updated_at?: string
          warden_contact?: string | null
          warden_name?: string | null
        }
        Update: {
          capacity?: number | null
          created_at?: string
          emergency_contact?: string | null
          facilities?: string[] | null
          hostel_name?: string
          id?: string
          rules?: string[] | null
          timings?: Json | null
          updated_at?: string
          warden_contact?: string | null
          warden_name?: string | null
        }
        Relationships: []
      }
      important_contacts: {
        Row: {
          created_at: string
          department: string | null
          designation: string | null
          display_order: number | null
          email: string | null
          id: string
          is_emergency: boolean | null
          name: string
          phone_number: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          department?: string | null
          designation?: string | null
          display_order?: number | null
          email?: string | null
          id?: string
          is_emergency?: boolean | null
          name: string
          phone_number: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          department?: string | null
          designation?: string | null
          display_order?: number | null
          email?: string | null
          id?: string
          is_emergency?: boolean | null
          name?: string
          phone_number?: string
          updated_at?: string
        }
        Relationships: []
      }
      mess_hostel_committee: {
        Row: {
          created_at: string
          email: string
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      otp_verifications: {
        Row: {
          created_at: string
          email: string
          expires_at: string
          id: string
          otp: string
          used: boolean
        }
        Insert: {
          created_at?: string
          email: string
          expires_at: string
          id?: string
          otp: string
          used?: boolean
        }
        Update: {
          created_at?: string
          email?: string
          expires_at?: string
          id?: string
          otp?: string
          used?: boolean
        }
        Relationships: []
      }
      student_representatives: {
        Row: {
          branch: string
          created_at: string
          email: string
          id: string
          name: string
          official_email: string | null
          position: string
          program: string
          updated_at: string
          year: number
        }
        Insert: {
          branch: string
          created_at?: string
          email: string
          id?: string
          name: string
          official_email?: string | null
          position: string
          program: string
          updated_at?: string
          year: number
        }
        Update: {
          branch?: string
          created_at?: string
          email?: string
          id?: string
          name?: string
          official_email?: string | null
          position?: string
          program?: string
          updated_at?: string
          year?: number
        }
        Relationships: []
      },
      minutes: {
        Row: {
          meeting_id: number;
          created_at: string;
          title: string;
          description: string;
          date: string;
          link: string | null;
        };
        Insert: {
          meeting_id?: number;
          created_at?: string;
          title: string;
          description: string;
          date: string;
          link?: string | null;
        };
        Update: {
          meeting_id?: number;
          created_at?: string;
          title?: string;
          description?: string;
          date?: string;
          link?: string | null;
        };
        Relationships: [];
      };      
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_event_approval_status: {
        Args: { event_id: string }
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
