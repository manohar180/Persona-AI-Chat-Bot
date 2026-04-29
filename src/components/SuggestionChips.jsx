export default function SuggestionChips({ suggestions, onSelect, disabled }) {
  return (
    <div className="suggestion-chips">
      {suggestions.map((s, i) => (
        <button
          key={i}
          className="chip"
          onClick={() => onSelect(s)}
          disabled={disabled}
        >
          {s}
        </button>
      ))}
    </div>
  )
}