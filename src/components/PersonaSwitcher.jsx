import { personas } from '../data/personas'

export default function PersonaSwitcher({ activeId, onSwitch }) {
  return (
    <>
      {Object.values(personas).map((p) => (
        <button
          key={p.id}
          className={`persona-btn ${activeId === p.id ? 'active' : ''}`}
          style={{ '--p-accent': p.accent }}
          onClick={() => onSwitch(p.id)}
        >
          <div className="p-avatar">{p.avatar}</div>
          <div className="p-info">
            <span className="p-name">{p.shortName}</span>
            <span className="p-role">{p.title.split(',')[0]}</span>
          </div>
        </button>
      ))}
    </>
  )
}