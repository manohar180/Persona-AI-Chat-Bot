export default function TypingIndicator({ persona }) {
  return (
    <div className="typing-row" style={{ '--p-accent': persona.accent }}>
      <div className="msg-avatar">{persona.avatar}</div>
      <div className="typing-bubble">
        <span /><span /><span />
      </div>
    </div>
  )
}