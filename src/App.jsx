import { useState, useCallback } from 'react'
import { personas } from './data/personas'
import { sendMessage } from './api/groq'
import PersonaSwitcher from './components/PersonaSwitcher'
import ChatWindow from './components/ChatWindow'
import SuggestionChips from './components/SuggestionChips'

export default function App() {
  const [activePersonaId, setActivePersonaId] = useState('anshuman')
  const [conversations, setConversations] = useState({ anshuman: [], abhimanyu: [], kshitij: [] })
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

  const handleClear = useCallback(() => {
    setConversations(prev => ({ ...prev, [activePersonaId]: [] }))
    setError(null)
  }, [activePersonaId])

  const handleSend = useCallback(async (text) => {
    const content = (text || input).trim()
    if (!content || isLoading) return

    const userMsg = { role: 'user', content }
    const updatedMessages = [...messages, userMsg]

    setConversations(prev => ({ ...prev, [activePersonaId]: updatedMessages }))
    setInput('')
    setIsLoading(true)
    setError(null)

    try {
      const reply = await sendMessage(persona.systemPrompt, updatedMessages)
      setConversations(prev => ({
        ...prev,
        [activePersonaId]: [...prev[activePersonaId], { role: 'assistant', content: reply }],
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
      <aside className="sidebar">
        <div className="sidebar-top">
          <div className="logo">
            <div className="logo-mark">S</div>
            <span className="logo-text">Scaler Chat</span>
          </div>
          <p className="sidebar-sub">Talk to the people who built it</p>
        </div>
        <nav className="sidebar-nav">
          <p className="nav-label">Personas</p>
          <PersonaSwitcher activeId={activePersonaId} onSwitch={handleSwitch} />
        </nav>
        <div className="sidebar-bottom">
          <p>Scaler Academy</p>
          <p>Prompt Engineering · Assignment 01</p>
        </div>
      </aside>

      <main className="main-area" style={{ '--p-accent': persona.accent }}>
        <header className="topbar">
          <div className="topbar-left">
            <div className="topbar-avatar">{persona.avatar}</div>
            <div className="topbar-info">
              <div className="topbar-name">{persona.name}</div>
              <div className="topbar-meta">
                <span className="topbar-title">{persona.title}</span>
              </div>
            </div>
          </div>
          <div className="topbar-right">
            <div className="status-dot"></div>
            <span className="status-label">Online</span>
            {messages.length > 0 && (
              <button className="clear-btn" onClick={handleClear}>Clear chat</button>
            )}
          </div>
        </header>

        <ChatWindow messages={messages} isLoading={isLoading} persona={persona} />

        {error && <div className="error-banner">⚠ {error}</div>}

        {messages.length === 0 && (
          <div className="chips-wrap" style={{ '--p-accent': persona.accent }}>
            <p className="chips-label">Try asking</p>
            <SuggestionChips suggestions={persona.suggestions} onSelect={handleSend} disabled={isLoading} />
          </div>
        )}

        <div className="input-area">
          <div className="input-box">
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
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M22 2L11 13" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
          <p className="input-hint">Enter to send · Shift+Enter for new line</p>
        </div>
      </main>
    </div>
  )
}
