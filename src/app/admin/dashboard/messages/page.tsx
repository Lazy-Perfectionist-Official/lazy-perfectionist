import { db } from '@/lib/db'
import { Mail, Users, ExternalLink, CheckCircle2, Circle } from 'lucide-react'
import { formatDate } from './format'

async function getData() {
  try {
    const [messages, subscribers] = await Promise.all([
      db.contactMessage.findMany({ orderBy: { createdAt: 'desc' }, take: 100 }),
      db.subscriber.findMany({ orderBy: { subscribedAt: 'desc' }, take: 100 }),
    ])
    return { messages, subscribers }
  } catch {
    return { messages: [], subscribers: [] }
  }
}

export default async function AdminMessagesPage() {
  const { messages, subscribers } = await getData()

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-px bg-oryzo-border" />
          <span className="text-xs text-oryzo-muted uppercase tracking-[0.3em] font-medium">
            Inbox
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-display italic text-oryzo-cream">Messages</h1>
        <p className="text-oryzo-muted mt-2 text-sm">
          Contact form submissions and newsletter subscribers.
        </p>
      </div>

      {/* Messages */}
      <section className="mb-10">
        <div className="flex items-center gap-2 mb-4">
          <Mail className="w-4 h-4 text-oryzo-ember" />
          <h2 className="text-sm font-medium text-oryzo-cream uppercase tracking-[0.2em]">
            Contact messages
          </h2>
          <span className="text-xs text-oryzo-muted">({messages.length})</span>
        </div>

        {messages.length === 0 ? (
          <div className="bg-oryzo-surface/30 border border-oryzo-border rounded-3xl p-8 text-center text-oryzo-muted text-sm">
            No messages yet.
          </div>
        ) : (
          <div className="space-y-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className="bg-oryzo-surface/40 border border-oryzo-border rounded-2xl p-4 md:p-5"
              >
                <div className="flex items-start justify-between gap-3 mb-2 flex-wrap">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium uppercase text-oryzo-cream">{msg.name}</h3>
                      {msg.responded ? (
                        <span className="inline-flex items-center gap-1 text-xs text-oryzo-ember">
                          <CheckCircle2 className="w-3 h-3" /> responded
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs text-oryzo-muted">
                          <Circle className="w-3 h-3" /> new
                        </span>
                      )}
                    </div>
                    <a
                      href={`mailto:${msg.email}`}
                      className="text-xs text-oryzo-muted hover:text-oryzo-cream transition-colors"
                    >
                      {msg.email}
                    </a>
                  </div>
                  <span className="text-xs text-oryzo-muted">{formatDate(msg.createdAt)}</span>
                </div>
                {msg.subject && (
                  <div className="text-xs uppercase tracking-wider text-oryzo-muted mb-1">
                    {msg.subject}
                  </div>
                )}
                <p className="text-sm text-oryzo-cream/90 whitespace-pre-wrap leading-relaxed">
                  {msg.message}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Subscribers */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <Users className="w-4 h-4 text-oryzo-ember" />
          <h2 className="text-sm font-medium text-oryzo-cream uppercase tracking-[0.2em]">
            Newsletter subscribers
          </h2>
          <span className="text-xs text-oryzo-muted">({subscribers.length})</span>
        </div>

        {subscribers.length === 0 ? (
          <div className="bg-oryzo-surface/30 border border-oryzo-border rounded-3xl p-8 text-center text-oryzo-muted text-sm">
            No subscribers yet.
          </div>
        ) : (
          <div className="bg-oryzo-surface/40 border border-oryzo-border rounded-2xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-oryzo-border text-left">
                  <th className="px-4 py-3 font-medium text-xs uppercase tracking-wider text-oryzo-muted">
                    Email
                  </th>
                  <th className="px-4 py-3 font-medium text-xs uppercase tracking-wider text-oryzo-muted hidden sm:table-cell">
                    Status
                  </th>
                  <th className="px-4 py-3 font-medium text-xs uppercase tracking-wider text-oryzo-muted hidden md:table-cell">
                    Subscribed
                  </th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody>
                {subscribers.map((sub) => (
                  <tr key={sub.id} className="border-b border-oryzo-border/60 last:border-0">
                    <td className="px-4 py-3 text-oryzo-cream">{sub.email}</td>
                    <td className="px-4 py-3 hidden sm:table-cell">
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${
                          sub.status === 'ACTIVE'
                            ? 'bg-oryzo-ember/15 text-oryzo-ember'
                            : 'bg-oryzo-border/30 text-oryzo-muted'
                        }`}
                      >
                        {sub.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-oryzo-muted hidden md:table-cell">
                      {formatDate(sub.subscribedAt)}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <a
                        href={`mailto:${sub.email}`}
                        className="text-oryzo-muted hover:text-oryzo-cream transition-colors inline-flex items-center gap-1 text-xs"
                      >
                        Email <ExternalLink className="w-3 h-3" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  )
}
