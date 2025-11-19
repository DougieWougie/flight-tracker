import './DarkModeToggle.css';

export default function DarkModeToggle({ isDark, onToggle }) {
  return (
    <button
      className="dark-mode-toggle"
      onClick={onToggle}
      aria-label="Toggle dark mode"
    >
      {isDark ? '☀️' : '🌙'}
    </button>
  );
}
