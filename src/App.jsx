import { useState, useCallback } from 'react'
import { personas } from './data/personas'
import { sendMessage } from './api/groq'
import PersonaSwitcher from './components/PersonaSwitcher'
import ChatWindow from './components/ChatWindow'
import SuggestionChips from './components/SuggestionChips'

export default function App() {
  const [activePersonaId, setActivePersonaId] = useState('anshuman')
  const [conversations, setConversations] = useState({
    anshuman: [],
    abhimanyu: [],
    kshitij: [],
  })
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const persona = personas[activePersonaId]
  const messages = conversations[activePersonaId]

  const handleSwitch = useCallback((id) => {
    setActivePersonaId(id)
    setError(null)
    setInput('')
  }, [])

  const handleSend = useCallback(async (text) => {
    const content = (text || input).trim()
    if (!content || isLoading) return

    const userMsg = { role: 'user', content }
    const updatedMessages = [...messages, userMsg]

    setConversations((prev) => ({
      ...prev,
      [activePersonaId]: updatedMessages,
    }))
    setInput('')
    setIsLoading(true)
    setError(null)

    try {
      const reply = await sendMessage(persona.systemPrompt, updatedMessages)
      setConversations((prev) => ({
        ...prev,
        [activePersonaId]: [
          ...prev[activePersonaId],
          { role: 'assistant', content: reply },
        ],
      }))
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }, [input, isLoading, messages, activePersonaId, persona])

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="app-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="logo">
            <span className="logo-mark">S</span>
            <span className="logo-text">Scaler Chat</span>
          </div>
          <p className="sidebar-sub">Talk to the people who built it</p>
        </div>
        <PersonaSwitcher activeId={activePersonaId} onSwitch={handleSwitch} />
        <div className="sidebar-footer">
          <p>Built for Scaler Academy</p>
          <p>Prompt Engineering Assignment</p>
        </div>
      </aside>

      {/* Main */}
      <main className="main-area">
        {/* Top bar */}
        <header className="topbar" style={{ '--p-accent': persona.accent }}>
          <div className="topbar-persona">
            <div className="topbar-avatar">{persona.avatar}</div>
            <div>
              <div className="topbar-name">{persona.name}</div>
              <div className="topbar-title">{persona.title}</div>
            </div>
          </div>
          <div className="active-badge" style={{ background: persona.accent + '22', color: persona.accent, border: `1px solid ${persona.accent}44` }}>
            ● Active
          </div>
        </header>

        {/* Chat */}
        <ChatWindow messages={messages} isLoading={isLoading} persona={persona} />

        {/* Error */}
        {error && (
          <div className="error-banner">
            ⚠ {error}
          </div>
        )}

        {/* Suggestion chips */}
        {messages.length === 0 && (
          <SuggestionChips
            suggestions={persona.suggestions}
            onSelect={handleSend}
            disabled={isLoading}
          />
        )}

        {/* Input */}
        <div className="input-area">
          <div className="input-box" style={{ '--p-accent': persona.accent }}>
            <textarea
              className="input-field"
              placeholder={`Ask ${persona.shortName} anything...`}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={1}
              disabled={isLoading}
            />
            <button
              className="send-btn"
              onClick={() => handleSend()}
              disabled={!input.trim() || isLoading}
              style={{ background: persona.accent }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M22 2L11 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
          <p className="input-hint">Press Enter to send · Shift+Enter for new line</p>
        </div>
      </main>
    </div>
  )
}
