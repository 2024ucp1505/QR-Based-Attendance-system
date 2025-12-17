import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { checkHealth } from '../services/api';
import './Home.css';

const Home = () => {
  const [apiStatus, setApiStatus] = useState('checking');

  useEffect(() => {
    checkApiHealth();
  }, []);

  const checkApiHealth = async () => {
    try {
      await checkHealth();
      setApiStatus('online');
    } catch {
      setApiStatus('offline');
    }
  };

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content animate-fade-in">
          <div className="hero-badge">
            <span className="badge-dot"></span>
            Phase 1 • Development
          </div>
          
          <h1 className="hero-title">
            QR-Based
            <span className="gradient-text"> Attendance</span>
            <br />System
          </h1>
          
          <p className="hero-description">
            A modern, location-aware attendance system. Faculty generate QR codes, 
            students scan to mark attendance with GPS validation.
          </p>

          <div className="hero-actions">
            <Link to="/faculty" className="btn-primary btn-large">
              <span>◇</span> I'm Faculty
            </Link>
            <Link to="/student" className="btn-secondary btn-large">
              <span>○</span> I'm Student
            </Link>
          </div>

          <div className="api-status">
            <span className={`status-dot ${apiStatus}`}></span>
            <span>
              API Status: {apiStatus === 'checking' ? 'Checking...' : apiStatus === 'online' ? 'Online' : 'Offline'}
            </span>
          </div>
        </div>

        <div className="hero-visual animate-fade-in">
          <div className="visual-card">
            <div className="qr-placeholder">
              <div className="qr-pattern">
                <div className="qr-row">
                  <span></span><span></span><span></span><span></span><span></span>
                </div>
                <div className="qr-row">
                  <span></span><span></span><span></span><span></span><span></span>
                </div>
                <div className="qr-row">
                  <span></span><span></span><span></span><span></span><span></span>
                </div>
                <div className="qr-row">
                  <span></span><span></span><span></span><span></span><span></span>
                </div>
                <div className="qr-row">
                  <span></span><span></span><span></span><span></span><span></span>
                </div>
              </div>
            </div>
            <p>Scan to mark attendance</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>How It Works</h2>
        
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📍</div>
            <h3>Location Verified</h3>
            <p>Students must be physically present within the specified radius to mark attendance</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Instant QR Codes</h3>
            <p>Faculty generate unique QR codes for each session in seconds</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>Duplicate Prevention</h3>
            <p>System prevents multiple attendance entries from the same student</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Export Reports</h3>
            <p>Download attendance records as CSV for easy record keeping</p>
          </div>
        </div>
      </section>

      {/* Quick Access */}
      <section className="quick-access">
        <div className="access-card faculty">
          <div className="access-content">
            <span className="access-icon">◇</span>
            <h3>For Faculty</h3>
            <p>Create sessions, generate QR codes, and manage attendance records</p>
            <Link to="/faculty" className="btn-secondary">
              Go to Faculty Panel →
            </Link>
          </div>
        </div>
        
        <div className="access-card student">
          <div className="access-content">
            <span className="access-icon">○</span>
            <h3>For Students</h3>
            <p>Scan QR codes and mark your attendance with location verification</p>
            <Link to="/student" className="btn-secondary">
              Scan QR Code →
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <p>Phase 1 • QR Attendance System</p>
        <p className="footer-note">Phase 2 coming soon: Authentication, Roles, MongoDB</p>
      </footer>
    </div>
  );
};

export default Home;

