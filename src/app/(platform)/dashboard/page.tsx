'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Profile } from '@/types/database'
import { Eye, FileText, UserCheck, Pencil, Upload, Building2, Search, Clock, AlertCircle } from 'lucide-react'
import Link from 'next/link'

export default function DashboardPage() {
  const router = useRouter()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function load() {
      try {
        const supabase = createClient()
        const { data: { user }, error: authErr } = await supabase.auth.getUser()
        if (authErr || !user) { router.push('/onboarding'); return }
        const { data, error: fetchErr } = await supabase.from('profiles').select('*').eq('user_id', user.id).single()
        if (fetchErr && fetchErr.code !== 'PGRST116') throw fetchErr
        if (!data) { router.push('/onboarding'); return }
        setProfile(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load dashboard.')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [router])

  if (loading || !profile) return <div className="flex justify-center py-20"><div className="animate-pulse text-fg-muted">Loading...</div></div>

  if (error) return (
    <div className="flex justify-center py-20">
      <div className="flex items-center gap-2 p-4 rounded-lg bg-danger/10 text-danger border border-danger/20">
        <AlertCircle className="w-5 h-5 shrink-0" />
        <p className="text-sm">{error}</p>
      </div>
    </div>
  )

  const completeness = Math.round(
    [profile.full_name, profile.headline, profile.bio, profile.tn_profession, profile.skills?.length, profile.linkedin_url]
      .filter(Boolean).length / 6 * 100
  )

  const stats = [
    { icon: Eye, label: 'Profile Views', value: '—' },
    { icon: FileText, label: 'Documents', value: '—' },
    { icon: UserCheck, label: 'Completeness', value: `${completeness}%` },
  ]

  const actions = [
    { icon: Pencil, title: 'Edit Profile', desc: 'Update your info and skills', href: '/profile' },
    { icon: Upload, title: 'Upload Document', desc: 'Add supporting documents', href: '/my-documents' },
    { icon: Building2, title: 'Browse Companies', desc: 'Find TN-friendly employers', href: '/companies' },
    { icon: Search, title: 'Analyze Job Posting', desc: 'Check TN eligibility for a role', href: '/analyzer' },
    { icon: Clock, title: 'TN Status Tracker', desc: 'Track expiration and get renewal reminders', href: '/status' },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Welcome back, {profile.full_name.split(' ')[0]}</h1>

      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        {stats.map(({ icon: Icon, label, value }) => (
          <div key={label} className="card p-5">
            <Icon className="w-5 h-5 text-accent mb-2" />
            <p className="text-2xl font-bold">{value}</p>
            <p className="text-fg-muted text-sm">{label}</p>
          </div>
        ))}
      </div>

      <h2 className="font-semibold text-lg mb-4">Quick Actions</h2>
      <div className="grid sm:grid-cols-2 gap-4">
        {actions.map(({ icon: Icon, title, desc, href }) => (
          <Link key={title} href={href} className="card card-interactive p-5 flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-accent-muted flex items-center justify-center shrink-0">
              <Icon className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="font-medium">{title}</p>
              <p className="text-fg-muted text-sm">{desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
