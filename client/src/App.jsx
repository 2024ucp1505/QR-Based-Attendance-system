import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/common/Header';
import Home from './components/Home';
import CreateSession from './components/Faculty/CreateSession';
import QRCodeDisplay from './components/Faculty/QRCodeDisplay';
import QRScanner from './components/Student/QRScanner';
import Dashboard from './components/Dashboard/Dashboard';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main className="main-content">
          <Routes>
            {/* Home */}
            <Route path="/" element={<Home />} />
            
            {/* Faculty Routes */}
            <Route path="/faculty" element={<CreateSession />} />
            <Route path="/faculty/session/:sessionId" element={<QRCodeDisplay />} />
            
            {/* Student Routes */}
            <Route path="/student" element={<QRScanner />} />
            <Route path="/scan/:sessionId" element={<QRScanner />} />
            
            {/* Dashboard */}
            <Route path="/dashboard" element={<Dashboard />} />
            
            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

// 404 Component
function NotFound() {
  return (
    <div className="not-found">
      <h1>404</h1>
      <p>Page not found</p>
      <a href="/" className="btn-primary">Go Home</a>
    </div>
  );
}

export default App;
