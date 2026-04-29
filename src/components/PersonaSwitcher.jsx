import { personas } from '../data/personas'

export default function PersonaSwitcher({ activeId, onSwitch }) {
  return (
    <div className="persona-switcher">
      {Object.values(personas).map((p) => (
        <button
          key={p.id}
          className={`persona-btn ${activeId === p.id ? 'active' : ''}`}
          style={{ '--p-accent': p.accent }}
          onClick={() => onSwitch(p.id)}
        >
          <span className="persona-avatar">{p.avatar}</span>
          <span className="persona-btn-info">
            <span className="persona-btn-name">{p.shortName}</span>
            <span className="persona-btn-title">{p.title.split(',')[0]}</span>
          </span>
        </button>
      ))}
    </div>
  )
}