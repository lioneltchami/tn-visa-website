export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: Profile
        Insert: Omit<Profile, 'id' | 'created_at' | 'updated_at'> & { id?: string; created_at?: string; updated_at?: string }
        Update: Partial<Omit<Profile, 'id' | 'created_at' | 'updated_at'>>
      }
      companies: {
        Row: Company
        Insert: Omit<Company, 'id' | 'created_at'> & { id?: string; created_at?: string }
        Update: Partial<Omit<Company, 'id' | 'created_at'>>
      }
      documents: {
        Row: Document
        Insert: Omit<Document, 'id' | 'created_at'> & { id?: string; created_at?: string }
        Update: Partial<Omit<Document, 'id' | 'created_at'>>
      }
      work_history: {
        Row: WorkHistory
        Insert: Omit<WorkHistory, 'id'> & { id?: string }
        Update: Partial<Omit<WorkHistory, 'id'>>
      }
    }
  }
}

export interface Profile {
  id: string
  user_id: string
  role: 'engineer' | 'company'
  full_name: string
  email: string
  headline?: string
  bio?: string
  video_url?: string
  avatar_url?: string
  tn_profession?: string
  skills: string[]
  location?: string
  linkedin_url?: string
  github_url?: string
  portfolio_url?: string
  years_experience?: number
  education_level?: string
  education_field?: string
  is_public: boolean
  created_at: string
  updated_at: string
}

export interface Company {
  id: string
  user_id?: string
  name: string
  domain?: string
  logo_url?: string
  description?: string
  industry?: string
  size?: string
  location?: string
  tn_friendly: boolean
  tn_professions_hired: string[]
  careers_url?: string
  is_verified: boolean
  created_at: string
}

export interface Document {
  id: string
  user_id: string
  name: string
  type: 'employer_letter' | 'degree' | 'transcript' | 'license' | 'i94' | 'passport' | 'other'
  file_url: string
  file_size: number
  notes?: string
  created_at: string
}

export interface WorkHistory {
  id: string
  profile_id: string
  company_name: string
  title: string
  start_date: string
  end_date?: string
  is_current: boolean
  description?: string
  skills: string[]
}
