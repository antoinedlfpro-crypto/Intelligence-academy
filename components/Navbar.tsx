import React, { useState, useEffect } from 'react';
import { Menu, X, Globe, User, LogOut } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fermer le menu profil au clic à l'extérieur
  useEffect(() => {
    const closeMenu = () => setShowProfileMenu(false);
    if (showProfileMenu) {
      window.addEventListener('click', closeMenu);
    }
    return () => window.removeEventListener('click', closeMenu);
  }, [showProfileMenu]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path: string) => location.pathname === path ? 'text-white' : 'text-gray-400 hover:text-white';

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/50 backdrop-blur-lg border-b border-white/5 py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group cursor-pointer z-50">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-white to-gray-400 flex items-center justify-center text-black font-bold text-sm shadow-[0_0_15px_rgba(255,255,255,0.3)]">
            IA
          </div>
          <span className="text-lg font-bold tracking-wide group-hover:text-gray-200 transition-colors hidden sm:inline-block">Intelligence Academy</span>
          <span className="text-lg font-bold tracking-wide group-hover:text-gray-200 transition-colors sm:hidden">IA</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link to="/" className={`transition-colors ${isActive('/')}`}>Accueil</Link>
          <Link to="/bibliotheque" className={`transition-colors ${isActive('/bibliotheque')}`}>Bibliothèque</Link>
          <Link to="/tarifs" className={`transition-colors ${isActive('/tarifs')}`}>Tarifs</Link>
          <Link to="/audit" className={`transition-colors ${isActive('/audit')}`}>Audit Gratuit</Link>
        </div>

        {/* Right Actions */}
        <div className="hidden md:flex items-center gap-6">
          <div className="flex items-center gap-4 text-gray-400">
            <button className="flex items-center gap-1 hover:text-white transition-colors text-sm font-medium">
              <Globe size={16} />
              <span>FR</span>
            </button>
          </div>
          
          {isAuthenticated ? (
            <div className="relative" onClick={(e) => e.stopPropagation()}>
              <button 
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-3 pl-4 border-l border-white/10 group focus:outline-none"
              >
                 <div className="text-right hidden lg:block">
                   <div className="text-sm font-medium text-white">{user?.name || 'Membre'}</div>
                   <div className="text-xs text-gray-500">Compte Pro</div>
                 </div>
                 <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-purple to-pink-600 flex items-center justify-center text-white border border-white/10 shadow-lg shadow-brand-purple/20">
                   <User size={16} />
                 </div>
              </button>

              {/* Profile Dropdown */}
              {showProfileMenu && (
                <div className="absolute right-0 top-full mt-4 w-48 bg-neutral-900 border border-white/10 rounded-xl shadow-2xl py-1 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="px-4 py-3 border-b border-white/5 lg:hidden">
                    <p className="text-sm font-medium text-white">{user?.name || 'Membre'}</p>
                    <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                  </div>
                  <Link to="/bibliotheque" className="block px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5">
                    Mes Workflows
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 flex items-center gap-2"
                  >
                    <LogOut size={14} />
                    Déconnexion
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/auth" className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-purple to-pink-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-200"></div>
              <div className="relative px-6 py-2.5 bg-black rounded-full leading-none flex items-center">
                <span className="text-sm font-semibold text-gray-100 group-hover:text-white transition duration-200">
                  Connexion
                </span>
              </div>
            </Link>
          )}
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white z-50"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-0 left-0 w-full h-screen bg-neutral-900 flex flex-col items-center justify-center gap-8 md:hidden z-40">
           <Link to="/" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-medium text-gray-300 hover:text-white">Accueil</Link>
           <Link to="/bibliotheque" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-medium text-gray-300 hover:text-white">Bibliothèque</Link>
           <Link to="/tarifs" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-medium text-gray-300 hover:text-white">Tarifs</Link>
           <Link to="/audit" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-medium text-gray-300 hover:text-white">Audit Gratuit</Link>
           
           {isAuthenticated ? (
             <button onClick={() => { handleLogout(); setMobileMenuOpen(false); }} className="mt-8 text-red-400 font-medium flex items-center gap-2">
               <LogOut size={20} />
               Déconnexion
             </button>
           ) : (
             <Link to="/auth" onClick={() => setMobileMenuOpen(false)} className="mt-8 bg-brand-purple text-white px-8 py-3 rounded-full font-medium">
               Connexion
             </Link>
           )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;