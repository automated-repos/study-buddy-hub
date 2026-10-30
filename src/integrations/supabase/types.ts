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
    PostgrestVersion: "14.18"
  }
  public: {
    Tables: {
      books: {
        Row: {
          added_at: number
          file_name: string
          file_path: string | null
          id: string
          owner_username: string
          size_kb: number
          subject_id: string
          title: string
        }
        Insert: {
          added_at?: number
          file_name: string
          file_path?: string | null
          id: string
          owner_username: string
          size_kb?: number
          subject_id: string
          title: string
        }
        Update: {
          added_at?: number
          file_name?: string
          file_path?: string | null
          id?: string
          owner_username?: string
          size_kb?: number
          subject_id?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "books_owner_username_fkey"
            columns: ["owner_username"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["username"]
          },
          {
            foreignKeyName: "books_subject_id_fkey"
            columns: ["subject_id"]
            isOneToOne: false
            referencedRelation: "subjects"
            referencedColumns: ["id"]
          },
        ]
      }
      challenges: {
        Row: {
          created_at: number
          from_username: string
          id: string
          status: string
          subject_id: string | null
          title: string
          to_username: string
          winner: string | null
        }
        Insert: {
          created_at?: number
          from_username: string
          id: string
          status?: string
          subject_id?: string | null
          title: string
          to_username: string
          winner?: string | null
        }
        Update: {
          created_at?: number
          from_username?: string
          id?: string
          status?: string
          subject_id?: string | null
          title?: string
          to_username?: string
          winner?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "challenges_from_username_fkey"
            columns: ["from_username"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["username"]
          },
          {
            foreignKeyName: "challenges_to_username_fkey"
            columns: ["to_username"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["username"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar: string
          created_at: number
          display_name: string
          role: string
          username: string
        }
        Insert: {
          avatar?: string
          created_at?: number
          display_name: string
          role: string
          username: string
        }
        Update: {
          avatar?: string
          created_at?: number
          display_name?: string
          role?: string
          username?: string
        }
        Relationships: []
      }
      quiz_results: {
        Row: {
          id: string
          owner_username: string
          score: number
          subject_id: string
          taken_at: number
          total: number
        }
        Insert: {
          id: string
          owner_username: string
          score: number
          subject_id: string
          taken_at?: number
          total: number
        }
        Update: {
          id?: string
          owner_username?: string
          score?: number
          subject_id?: string
          taken_at?: number
          total?: number
        }
        Relationships: [
          {
            foreignKeyName: "quiz_results_owner_username_fkey"
            columns: ["owner_username"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["username"]
          },
          {
            foreignKeyName: "quiz_results_subject_id_fkey"
            columns: ["subject_id"]
            isOneToOne: false
            referencedRelation: "subjects"
            referencedColumns: ["id"]
          },
        ]
      }
      study_sessions: {
        Row: {
          date: string
          id: string
          minutes: number
          note: string | null
          owner_username: string
          subject_id: string
        }
        Insert: {
          date: string
          id: string
          minutes: number
          note?: string | null
          owner_username: string
          subject_id: string
        }
        Update: {
          date?: string
          id?: string
          minutes?: number
          note?: string | null
          owner_username?: string
          subject_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "study_sessions_owner_username_fkey"
            columns: ["owner_username"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["username"]
          },
          {
            foreignKeyName: "study_sessions_subject_id_fkey"
            columns: ["subject_id"]
            isOneToOne: false
            referencedRelation: "subjects"
            referencedColumns: ["id"]
          },
        ]
      }
      student_progress: {
        Row: {
          lesson: string
          owner_username: string
          subject: string
          unit: string
          updated_at: number
        }
        Insert: {
          lesson: string
          owner_username: string
          subject: string
          unit: string
          updated_at?: number
        }
        Update: {
          lesson?: string
          owner_username?: string
          subject?: string
          unit?: string
          updated_at?: number
        }
        Relationships: [
          {
            foreignKeyName: "student_progress_owner_username_fkey"
            columns: ["owner_username"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["username"]
          },
        ]
      }
      subjects: {
        Row: {
          book_path: string | null
          color: string
          done_chapters: number
          id: string
          name: string
          owner_username: string
          target_exam_date: string | null
          total_chapters: number
        }
        Insert: {
          book_path?: string | null
          color?: string
          done_chapters?: number
          id: string
          name: string
          owner_username: string
          target_exam_date?: string | null
          total_chapters?: number
        }
        Update: {
          book_path?: string | null
          color?: string
          done_chapters?: number
          id?: string
          name?: string
          owner_username?: string
          target_exam_date?: string | null
          total_chapters?: number
        }
        Relationships: [
          {
            foreignKeyName: "subjects_owner_username_fkey"
            columns: ["owner_username"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["username"]
          },
        ]
      }
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

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
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
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
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
