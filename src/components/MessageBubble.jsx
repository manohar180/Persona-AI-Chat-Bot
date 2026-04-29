export default function MessageBubble({ message, persona }) {
  const isUser = message.role === 'user'

  return (
    <div className={`message-row ${isUser ? 'user-row' : 'ai-row'}`}>
      {!isUser && (
        <div className="msg-avatar" style={{ '--p-accent': persona.accent }}>
          {persona.avatar}
        </div>
      )}
      <div className={`message-bubble ${isUser ? 'user-bubble' : 'ai-bubble'}`}
        style={!isUser ? { '--p-accent': persona.accent } : {}}>
        <p>{message.content}</p>
      </div>
    </div>
  )
}