import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Library from './pages/Library';
import Pricing from './pages/Pricing';
import Audit from './pages/Audit';
import WorkflowDetail from './pages/WorkflowDetail';
import Auth from './pages/Auth';
import { AuthProvider } from './context/AuthContext';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/auth';
  
  return (
    <div className="min-h-screen bg-brand-dark overflow-x-hidden selection:bg-brand-purple/30 selection:text-white font-sans text-white">
       {!isAuthPage && <Navbar />}
       {children}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/bibliotheque" element={<Library />} />
            <Route path="/workflow/:id" element={<WorkflowDetail />} />
            <Route path="/tarifs" element={<Pricing />} />
            <Route path="/audit" element={<Audit />} />
            <Route path="/auth" element={<Auth />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
};

export default App;