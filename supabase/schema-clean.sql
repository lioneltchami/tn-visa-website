-- ============================================
-- TN Visa Guide — Complete Supabase Schema
-- Run this ONCE in Supabase SQL Editor
-- ============================================

-- ============================================
-- 1. UTILITY FUNCTIONS
-- ============================================

create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- ============================================
-- 2. CORE TABLES
-- ============================================

-- Profiles
create table public.profiles (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null unique,
  role text check (role in ('engineer', 'company')) not null,
  full_name text not null,
  email text not null,
  headline text,
  bio text,
  video_url text,
  avatar_url text,
  tn_profession text,
  skills text[] default '{}',
  location text,
  linkedin_url text,
  github_url text,
  portfolio_url text,
  years_experience integer,
  education_level text,
  education_field text,
  is_public boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create trigger on_profile_updated
  before update on public.profiles
  for each row execute function public.handle_updated_at();

-- Companies
create table public.companies (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete set null,
  name text not null,
  domain text,
  logo_url text,
  description text,
  industry text,
  size text,
  location text,
  tn_friendly boolean default true,
  tn_professions_hired text[] default '{}',
  careers_url text,
  is_verified boolean default false,
  created_at timestamptz default now()
);

-- Documents
create table public.documents (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  name text not null,
  type text check (type in ('employer_letter', 'degree', 'transcript', 'license', 'i94', 'passport', 'resume', 'credential_evaluation', 'support_letter', 'photo', 'other')) not null,
  storage_path text not null check (storage_path like user_id::text || '/%'),
  file_size integer not null,
  notes text,
  created_at timestamptz default now()
);

-- Work History
create table public.work_history (
  id uuid default gen_random_uuid() primary key,
  profile_id uuid references public.profiles(id) on delete cascade not null,
  company_name text not null,
  title text not null,
  start_date date not null,
  end_date date,
  is_current boolean default false,
  description text,
  skills text[] default '{}'
);

-- ============================================
-- 3. FEATURE TABLES
-- ============================================

-- Newsletter Subscribers
create table public.subscribers (
  id uuid default gen_random_uuid() primary key,
  email text not null unique,
  name text,
  interests text[] default '{}',
  subscribed_at timestamptz default now(),
  unsubscribed_at timestamptz
);

-- TN Status Tracker
create table public.tn_status (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  profession text not null,
  employer text not null,
  start_date date not null,
  end_date date not null,
  application_method text check (application_method in ('poe_land', 'poe_airport', 'i129', 'consular')),
  port_of_entry text,
  status text check (status in ('active', 'expired', 'pending_renewal')) default 'active',
  notes text,
  created_at timestamptz default now()
);

-- Community Experiences
create table public.experiences (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete set null,
  profession text not null,
  application_method text check (application_method in ('poe_land', 'poe_airport', 'i129', 'consular')) not null,
  port_of_entry text,
  outcome text check (outcome in ('approved', 'denied', 'withdrawn', 'rfe')) not null,
  date date not null,
  wait_time_minutes integer,
  questions_asked text[],
  tips text,
  story text,
  is_anonymous boolean default false,
  is_approved boolean default false,
  created_at timestamptz default now()
);

-- Jobs Board
create table public.jobs (
  id uuid default gen_random_uuid() primary key,
  company_id uuid references public.companies(id) on delete cascade,
  company_name text not null,
  title text not null,
  slug text not null unique,
  tn_profession text not null,
  description text not null,
  requirements text[] default '{}',
  salary_min integer,
  salary_max integer,
  location text not null,
  remote_policy text check (remote_policy in ('onsite', 'hybrid', 'remote')) default 'onsite',
  employment_type text check (employment_type in ('full_time', 'contract')) default 'full_time',
  application_url text not null,
  is_featured boolean default false,
  is_active boolean default true,
  posted_at timestamptz default now(),
  updated_at timestamptz default now(),
  expires_at timestamptz default (now() + interval '30 days')
);

create trigger on_job_updated
  before update on public.jobs
  for each row execute function public.handle_updated_at();

create or replace function public.deactivate_expired_jobs() returns void as $$
  update public.jobs set is_active = false where is_active = true and expires_at < now();
$$ language sql;

-- ============================================
-- 4. INDEXES
-- ============================================

create index idx_profiles_user_id on public.profiles(user_id);
create index idx_companies_user_id on public.companies(user_id);
create index idx_documents_user_id on public.documents(user_id);
create index idx_work_history_profile_id on public.work_history(profile_id);
create index idx_tn_status_user_id on public.tn_status(user_id);
create index idx_experiences_profession on public.experiences(profession);
create index idx_experiences_outcome on public.experiences(outcome);
create index idx_jobs_profession on public.jobs(tn_profession);
create index idx_jobs_active on public.jobs(is_active, posted_at desc);
create index idx_jobs_slug on public.jobs(slug);
create index idx_jobs_company on public.jobs(company_id);

-- ============================================
-- 5. ROW LEVEL SECURITY
-- ============================================

alter table public.profiles enable row level security;
alter table public.companies enable row level security;
alter table public.documents enable row level security;
alter table public.work_history enable row level security;
alter table public.subscribers enable row level security;
alter table public.tn_status enable row level security;
alter table public.experiences enable row level security;
alter table public.jobs enable row level security;

-- Profiles
create policy "Public profiles are viewable by everyone" on public.profiles for select using (is_public = true);
create policy "Users can view own profile" on public.profiles for select using (auth.uid() = user_id);
create policy "Users can insert own profile" on public.profiles for insert with check (auth.uid() = user_id);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = user_id);
create policy "Users can delete own profile" on public.profiles for delete using (auth.uid() = user_id);

-- Companies
create policy "Companies are viewable by everyone" on public.companies for select using (true);
create policy "Users can insert companies" on public.companies for insert with check (auth.uid() = user_id);
create policy "Users can update own companies" on public.companies for update using (auth.uid() = user_id);

-- Documents
create policy "Users can view own documents" on public.documents for select using (auth.uid() = user_id);
create policy "Users can insert own documents" on public.documents for insert with check (auth.uid() = user_id);
create policy "Users can delete own documents" on public.documents for delete using (auth.uid() = user_id);

-- Work History
create policy "Work history viewable via public profiles" on public.work_history for select using (
  exists (select 1 from public.profiles where profiles.id = work_history.profile_id and profiles.is_public = true)
);
create policy "Users can manage own work history" on public.work_history for all using (
  exists (select 1 from public.profiles where profiles.id = work_history.profile_id and profiles.user_id = auth.uid())
);

-- Subscribers are managed only by server routes using the service role.
revoke all on table public.subscribers from anon, authenticated;
grant all on table public.subscribers to service_role;
create policy "Service role manages subscribers" on public.subscribers for all to service_role using (true) with check (true);

-- TN Status
create policy "Users can manage own status" on public.tn_status for all using (auth.uid() = user_id);

-- Experiences
create policy "Approved experiences are viewable by everyone" on public.experiences for select using (is_approved = true);
create policy "Authenticated users can submit" on public.experiences for insert with check (auth.uid() = user_id);

-- Jobs
create policy "Active jobs are viewable by everyone" on public.jobs for select using (is_active = true and expires_at > now());
create policy "Company owners can manage jobs" on public.jobs for all using (
  exists (select 1 from public.companies where companies.id = jobs.company_id and companies.user_id = auth.uid())
);

-- ============================================
-- 6. STORAGE
-- ============================================

insert into storage.buckets (id, name, public) values ('documents', 'documents', false)
on conflict (id) do nothing;

create policy "Users can upload own documents" on storage.objects for insert with check (auth.uid()::text = (storage.foldername(name))[1]);
create policy "Users can view own documents" on storage.objects for select using (auth.uid()::text = (storage.foldername(name))[1]);
create policy "Users can delete own documents" on storage.objects for delete using (auth.uid()::text = (storage.foldername(name))[1]);
