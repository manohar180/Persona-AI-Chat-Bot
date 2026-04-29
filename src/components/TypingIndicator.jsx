export default function TypingIndicator({ persona }) {
  return (
    <div className="typing-indicator">
      <div className="typing-avatar" style={{ '--p-accent': persona.accent }}>
        {persona.avatar}
      </div>
      <div className="typing-dots">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  )
}