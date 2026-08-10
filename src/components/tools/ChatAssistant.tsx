'use client'

import { useChat } from 'ai/react'
import clsx from 'clsx'
import { Loader2, MessageCircle, Send, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { trackEvent } from '@/hooks/useAnalytics'

const STARTERS = [
  'Am I eligible for a TN visa?',
  'What documents do I need?',
  'Can I get a TN visa with a CS degree?',
]

const MAX_MESSAGE_CHARS = 1500

/** The API answers with `{ error }` JSON for rate limits and validation. */
function friendlyError(error: Error | undefined): string | null {
  if (!error) return null
  try {
    const parsed = JSON.parse(error.message)
    if (parsed?.error) return String(parsed.error)
  } catch {
    // Non-JSON error (network/stream failure) — fall through to generic copy.
  }
  return 'Something went wrong. Please try again in a moment.'
}

export default function ChatAssistant() {
  const [open, setOpen] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const { messages, input, handleInputChange, handleSubmit, isLoading, setInput, error } = useChat()
  const errorMessage = friendlyError(error)

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [messages])

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(!open)}
        className={clsx(
          'fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all',
          open ? 'bg-fg text-bg' : 'gradient-bg text-white'
        )}
        aria-label={open ? 'Close chat' : 'Open TN visa assistant'}
      >
        {open ? <X className="w-5 h-5" /> : <MessageCircle className="w-6 h-6" />}
      </button>

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[360px] max-h-[500px] rounded-2xl shadow-2xl border border-border bg-bg flex flex-col overflow-hidden">
          {/* Header */}
          <div className="gradient-bg px-4 py-3 text-white">
            <p className="font-semibold text-sm">TN Visa Assistant</p>
            <p className="text-xs opacity-80">Powered by AI — Not legal advice</p>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[200px] max-h-[340px]"
          >
            {messages.length === 0 && (
              <div className="space-y-2">
                <p className="text-sm text-fg-muted">Ask me anything about TN visas:</p>
                {STARTERS.map((q) => (
                  <button
                    key={q}
                    onClick={() => {
                      setInput(q)
                    }}
                    className="block w-full text-left text-sm px-3 py-2 rounded-lg border border-border hover:bg-bg-secondary transition-colors text-fg-secondary"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}
            {messages.map((m) => (
              <div
                key={m.id}
                className={clsx('flex', m.role === 'user' ? 'justify-end' : 'justify-start')}
              >
                <div
                  className={clsx(
                    'max-w-[85%] rounded-xl px-3 py-2 text-sm',
                    m.role === 'user' ? 'gradient-bg text-white' : 'bg-bg-secondary text-fg'
                  )}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-bg-secondary rounded-xl px-3 py-2">
                  <Loader2 className="w-4 h-4 animate-spin text-fg-muted" />
                </div>
              </div>
            )}
            {errorMessage && (
              <p role="alert" className="text-sm text-danger">
                {errorMessage}
              </p>
            )}
          </div>

          {/* Input */}
          <form
            onSubmit={(e) => {
              trackEvent('chat_message')
              handleSubmit(e)
            }}
            className="border-t border-border p-3 flex gap-2"
          >
            <input
              value={input}
              onChange={handleInputChange}
              maxLength={MAX_MESSAGE_CHARS}
              placeholder="Ask about TN visas..."
              className="flex-1 text-sm px-3 py-2 rounded-lg border border-border bg-bg text-fg focus:outline-none focus:ring-1 focus:ring-accent"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="p-2 rounded-lg gradient-bg text-white disabled:opacity-50"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  )
}
