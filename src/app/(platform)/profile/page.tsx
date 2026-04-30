'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Profile } from '@/types/database'
import { X, Save, Loader2, AlertCircle } from 'lucide-react'
import professions from '@/data/professions.json'
import { getVideoEmbed } from '@/lib/video'

export default function ProfileEditPage() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [saving, setSaving] = useState(false)
  const [skillInput, setSkillInput] = useState('')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function load() {
      try {
        const supabase = createClient()
        const { data: { user }, error: authErr } = await supabase.auth.getUser()
        if (authErr || !user) { setError('Please sign in to edit your profile.'); return }
        const { data, error: fetchErr } = await supabase.from('profiles').select('*').eq('user_id', user.id).single()
        if (fetchErr) throw fetchErr
        if (data) setProfile(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load profile.')
      }
    }
    load()
  }, [])

  async function handleSave() {
    if (!profile) return
    setSaving(true)
    setError(null)
    try {
      const supabase = createClient()
      const { id } = profile
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id: _, created_at: _1, updated_at: _2, user_id: _3, ...updates } = profile
      const { error: saveErr } = await supabase.from('profiles').update(updates).eq('id', id)
      if (saveErr) throw saveErr
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save profile.')
    } finally {
      setSaving(false)
    }
  }

  function addSkill(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && skillInput.trim() && profile) {
      e.preventDefault()
      if (!profile.skills.includes(skillInput.trim())) {
        setProfile({ ...profile, skills: [...profile.skills, skillInput.trim()] })
      }
      setSkillInput('')
    }
  }

  function removeSkill(skill: string) {
    if (!profile) return
    setProfile({ ...profile, skills: profile.skills.filter(s => s !== skill) })
  }



  if (!profile) return <div className="flex justify-center py-20"><div className="animate-pulse text-fg-muted">Loading...</div></div>

  const embedUrl = profile.video_url ? getVideoEmbed(profile.video_url) : null

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>
      {error && (
        <div className="flex items-center gap-2 p-4 mb-6 rounded-lg bg-danger/10 text-danger border border-danger/20">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <p className="text-sm">{error}</p>
        </div>
      )}
      <div className="space-y-4">
        <Field label="Full Name" value={profile.full_name} onChange={v => setProfile({ ...profile, full_name: v })} />
        <Field label="Headline" value={profile.headline || ''} onChange={v => setProfile({ ...profile, headline: v })} />
        <div>
          <label className="block text-sm font-medium mb-1">Bio</label>
          <textarea value={profile.bio || ''} onChange={e => setProfile({ ...profile, bio: e.target.value })}
            className="w-full rounded-lg border border-border bg-bg px-3 py-2 text-fg min-h-[100px]" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">TN Profession</label>
          <select value={profile.tn_profession || ''} onChange={e => setProfile({ ...profile, tn_profession: e.target.value })}
            className="w-full rounded-lg border border-border bg-bg px-3 py-2 text-fg">
            <option value="">Select...</option>
            {professions.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Skills</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {profile.skills.map(skill => (
              <span key={skill} className="badge">
                {skill}
                <button onClick={() => removeSkill(skill)} className="ml-1"><X className="w-3 h-3" /></button>
              </span>
            ))}
          </div>
          <input value={skillInput} onChange={e => setSkillInput(e.target.value)} onKeyDown={addSkill}
            placeholder="Type a skill and press Enter" className="w-full rounded-lg border border-border bg-bg px-3 py-2 text-fg" />
        </div>
        <Field label="Video URL" value={profile.video_url || ''} onChange={v => setProfile({ ...profile, video_url: v })} placeholder="YouTube or Vimeo URL" />
        {embedUrl && (
          <div className="aspect-video rounded-lg overflow-hidden border border-border">
            <iframe src={embedUrl} className="w-full h-full" allowFullScreen title="Video introduction" />
          </div>
        )}
        <Field label="LinkedIn" value={profile.linkedin_url || ''} onChange={v => setProfile({ ...profile, linkedin_url: v })} />
        <Field label="GitHub / Website" value={profile.github_url || ''} onChange={v => setProfile({ ...profile, github_url: v })} />
        <Field label="Portfolio" value={profile.portfolio_url || ''} onChange={v => setProfile({ ...profile, portfolio_url: v })} />
      </div>
      <button onClick={handleSave} disabled={saving}
        className="mt-6 flex items-center gap-2 px-6 py-2 rounded-lg gradient-bg text-white disabled:opacity-50">
        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Save
      </button>
    </div>
  )
}

function Field({ label, value, onChange, placeholder }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string
}) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        className="w-full rounded-lg border border-border bg-bg px-3 py-2 text-fg" />
    </div>
  )
}
