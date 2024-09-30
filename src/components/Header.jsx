import RessetB from './RessetB';
import './Header.css';

export default function Header({ theme, toggleTheme }) {
  return (
    <header className="app-header">

      <RessetB />
      <div className="theme-toggle">
        <label className="switch">
          <input
            type="checkbox"
            onChange={toggleTheme}
            checked={theme === 'dark'}
          />
          <span className="slider round"></span>
        </label>
        <span>{theme === 'dark' ? '🌙' : '☀️'}</span>
      </div>
    </header>
  );
}