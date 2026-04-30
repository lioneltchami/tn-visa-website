'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Profile, WorkHistory } from '@/types/database'
import Image from 'next/image'
import { Linkedin, Github, Globe, MapPin, Briefcase } from 'lucide-react'
import professions from '@/data/professions.json'
import { getVideoEmbed } from '@/lib/video'

export default function PublicProfilePage() {
  const { id } = useParams<{ id: string }>()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [history, setHistory] = useState<WorkHistory[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function load() {
      try {
        const supabase = createClient()
        const { data, error: fetchErr } = await supabase.from('profiles').select('*').eq('id', id).single()
        if (fetchErr) throw fetchErr
        if (data) setProfile(data)
        const { data: wh, error: whErr } = await supabase.from('work_history').select('*').eq('profile_id', id).order('start_date', { ascending: false })
        if (whErr) throw whErr
        if (wh) setHistory(wh)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load profile.')
      }
    }
    load()
  }, [id])

  if (error) return (
    <div className="flex justify-center py-20">
      <p className="text-fg-muted">{error}</p>
    </div>
  )

  if (!profile) return <div className="flex justify-center py-20"><div className="animate-pulse text-fg-muted">Loading...</div></div>

  const profession = professions.find(p => p.id === profile.tn_profession)
  const embedUrl = profile.video_url ? getVideoEmbed(profile.video_url) : null

  return (
    <div className="max-w-3xl mx-auto">
      <div className="card p-8 mb-6">
        <div className="flex items-start gap-5">
          {profile.avatar_url ? (
            <Image src={profile.avatar_url} alt="" width={80} height={80} className="w-20 h-20 rounded-full object-cover" />
          ) : (
            <div className="w-20 h-20 rounded-full gradient-bg flex items-center justify-center text-white text-2xl font-bold">
              {profile.full_name.charAt(0)}
            </div>
          )}
          <div className="flex-1">
            <h1 className="text-2xl font-bold">{profile.full_name}</h1>
            {profile.headline && <p className="text-fg-secondary mt-1">{profile.headline}</p>}
            <div className="flex flex-wrap gap-3 mt-3 text-sm text-fg-muted">
              {profession && <span className="badge"><Briefcase className="w-3 h-3" /> {profession.name}</span>}
              {profile.location && <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {profile.location}</span>}
            </div>
          </div>
        </div>
        <div className="flex gap-3 mt-5">
          {profile.linkedin_url && <a href={profile.linkedin_url} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg border border-border hover:bg-bg-secondary"><Linkedin className="w-4 h-4" /></a>}
          {profile.github_url && <a href={profile.github_url} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg border border-border hover:bg-bg-secondary"><Github className="w-4 h-4" /></a>}
          {profile.portfolio_url && <a href={profile.portfolio_url} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg border border-border hover:bg-bg-secondary"><Globe className="w-4 h-4" /></a>}
        </div>
      </div>

      {profile.bio && (
        <div className="card p-6 mb-6">
          <h2 className="font-semibold mb-2">About</h2>
          <p className="text-fg-secondary whitespace-pre-line">{profile.bio}</p>
        </div>
      )}

      {embedUrl && (
        <div className="card p-6 mb-6">
          <h2 className="font-semibold mb-3">Video Introduction</h2>
          <div className="aspect-video rounded-lg overflow-hidden">
            <iframe src={embedUrl} className="w-full h-full" allowFullScreen title="Video introduction" />
          </div>
        </div>
      )}

      {profile.skills.length > 0 && (
        <div className="card p-6 mb-6">
          <h2 className="font-semibold mb-3">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {profile.skills.map(skill => <span key={skill} className="badge">{skill}</span>)}
          </div>
        </div>
      )}

      {history.length > 0 && (
        <div className="card p-6 mb-6">
          <h2 className="font-semibold mb-4">Experience</h2>
          {history.map((job, i) => (
            <div key={job.id} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-accent-muted flex items-center justify-center shrink-0">
                  <Briefcase className="w-4 h-4 text-accent" />
                </div>
                {i < history.length - 1 && <div className="w-0.5 flex-1 bg-border" />}
              </div>
              <div className="pb-6">
                <p className="font-medium">{job.title}</p>
                <p className="text-fg-secondary text-sm">{job.company_name}</p>
                <p className="text-fg-muted text-xs mt-1">{job.start_date} — {job.is_current ? 'Present' : job.end_date}</p>
                {job.description && <p className="text-fg-secondary text-sm mt-2">{job.description}</p>}
              </div>
            </div>
          ))}
        </div>
      )}

      {(profile.education_level || profile.education_field) && (
        <div className="card p-6">
          <h2 className="font-semibold mb-2">Education</h2>
          <p className="text-fg-secondary">{[profile.education_level, profile.education_field].filter(Boolean).join(' in ')}</p>
        </div>
      )}
    </div>
  )
}


