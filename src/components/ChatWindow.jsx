import { useEffect, useRef } from 'react'
import MessageBubble from './MessageBubble'
import TypingIndicator from './TypingIndicator'

export default function ChatWindow({ messages, isLoading, persona }) {
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  return (
    <div className="chat-window">
      {messages.length === 0 && (
        <div className="empty-state">
          <div className="empty-avatar-ring" style={{ '--p-accent': persona.accent }}>
            <div className="empty-avatar">{persona.avatar}</div>
          </div>
          <h2 className="empty-name">{persona.name}</h2>
          <p className="empty-tagline">{persona.tagline}</p>
          <div className="empty-divider" />
          <p className="empty-hint">Pick a question below or type your own</p>
        </div>
      )}
      {messages.map((msg, i) => (
        <MessageBubble key={i} message={msg} persona={persona} />
      ))}
      {isLoading && <TypingIndicator persona={persona} />}
      <div ref={bottomRef} />
    </div>
  )
}