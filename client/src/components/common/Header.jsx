import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: '◈' },
    { path: '/faculty', label: 'Faculty', icon: '◇' },
    { path: '/student', label: 'Student', icon: '○' },
    { path: '/dashboard', label: 'Dashboard', icon: '▣' },
  ];

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <span className="logo-icon">⬡</span>
          <span className="logo-text">QR Attendance</span>
        </Link>

        <nav className="nav">
          {navItems.map(({ path, label, icon }) => (
            <Link
              key={path}
              to={path}
              className={`nav-link ${location.pathname === path ? 'active' : ''}`}
            >
              <span className="nav-icon">{icon}</span>
              <span className="nav-label">{label}</span>
            </Link>
          ))}
        </nav>

        <div className="header-badge">
          <span>Phase 1</span>
        </div>
      </div>
    </header>
  );
};

export default Header;

