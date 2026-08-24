export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: Profile
        Insert: Omit<Profile, 'id' | 'created_at' | 'updated_at'> & { id?: string; created_at?: string; updated_at?: string }
        Update: Partial<Omit<Profile, 'id'>>
      }
      companies: {
        Row: Company
        Insert: Omit<Company, 'id' | 'created_at'> & { id?: string; created_at?: string }
        Update: Partial<Omit<Company, 'id'>>
      }
      documents: {
        Row: Document
        Insert: Omit<Document, 'id' | 'created_at'> & { id?: string; created_at?: string }
        Update: Partial<Omit<Document, 'id'>>
      }
      work_history: {
        Row: WorkHistory
        Insert: Omit<WorkHistory, 'id'> & { id?: string }
        Update: Partial<Omit<WorkHistory, 'id'>>
      }
      jobs: {
        Row: Job
        Insert: Omit<Job, 'id' | 'posted_at' | 'expires_at' | 'is_featured' | 'is_active' | 'source' | 'external_id' | 'last_synced_at' | 'raw_data'> & {
          id?: string
          posted_at?: string
          expires_at?: string | null
          is_featured?: boolean
          is_active?: boolean
          source?: 'user' | 'external'
          external_id?: string | null
          last_synced_at?: string | null
          raw_data?: Record<string, unknown> | null
        }
        Update: Partial<Omit<Job, 'id'>>
      }
      tn_status: {
        Row: TnStatus
        Insert: Omit<TnStatus, 'id' | 'created_at' | 'status'> & { id?: string; created_at?: string; status?: 'active' | 'expired' | 'pending_renewal' }
        Update: Partial<Omit<TnStatus, 'id'>>
      }
      subscribers: {
        Row: Subscriber
        Insert: Omit<Subscriber, 'id' | 'subscribed_at'> & { id?: string; subscribed_at?: string }
        Update: Partial<Omit<Subscriber, 'id'>>
      }
      experiences: {
        Row: Experience
        Insert: Omit<Experience, 'id' | 'created_at' | 'is_anonymous' | 'is_approved'> & { id?: string; created_at?: string; is_anonymous?: boolean; is_approved?: boolean }
        Update: Partial<Omit<Experience, 'id'>>
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
    CompositeTypes: Record<string, never>
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
  storage_path: string | null
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

export interface Job {
  id: string
  slug: string
  title: string
  company_id: string | null
  company_name: string
  tn_profession: string
  description: string
  requirements: string[]
  salary_min: number | null
  salary_max: number | null
  location: string
  remote_policy: 'onsite' | 'hybrid' | 'remote' | null
  employment_type: 'full_time' | 'contract' | 'part_time'
  application_url: string
  is_featured: boolean
  is_active: boolean
  posted_at: string
  expires_at: string | null
  source: 'user' | 'external'
  external_id: string | null
  last_synced_at: string | null
  raw_data: Record<string, unknown> | null
}

export interface TnStatus {
  id: string
  user_id: string
  profession: string
  employer: string
  start_date: string
  end_date: string
  application_method: 'poe_land' | 'poe_airport' | 'i129' | 'consular' | null
  port_of_entry: string | null
  status: 'active' | 'expired' | 'pending_renewal'
  notes: string | null
  created_at: string
}

export interface Subscriber {
  id: string
  email: string
  name: string | null
  interests: string[]
  subscribed_at: string
  unsubscribed_at: string | null
}

export interface Experience {
  id: string
  user_id: string | null
  profession: string
  application_method: 'poe_land' | 'poe_airport' | 'i129' | 'consular'
  port_of_entry: string | null
  outcome: 'approved' | 'denied' | 'withdrawn' | 'rfe'
  date: string
  wait_time_minutes: number | null
  questions_asked: string[] | null
  tips: string | null
  story: string | null
  is_anonymous: boolean
  is_approved: boolean
  created_at: string
}
