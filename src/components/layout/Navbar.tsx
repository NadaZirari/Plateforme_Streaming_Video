import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, Bell, User, LogOut, Menu, X, Play } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { cn } from '../../lib/utils';

const Navbar: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Films', path: '/content/film' },
    { name: 'Séries', path: '/content/serie' },
    { name: 'Ma Liste', path: '/watchlist' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav
      className={cn(
        'fixed top-0 z-50 w-full transition-all duration-300',
        isScrolled ? 'glass py-3 shadow-2xl' : 'bg-gradient-to-b from-black/80 to-transparent py-5'
      )}
    >
      <div className="container mx-auto flex items-center justify-between px-4 lg:px-8">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-[0_0_20px_rgba(229,9,20,0.4)] transition-transform group-hover:scale-110">
              <Play className="fill-white text-white" size={24} />
            </div>
            <span className="font-outfit text-2xl font-extrabold tracking-tight text-white transition-colors group-hover:text-primary">
              STREAM<span className="text-primary font-light">HUB</span>
            </span>
          </Link>

          {isAuthenticated && (
            <div className="hidden items-center gap-6 md:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    'text-sm font-medium transition-colors hover:text-white',
                    location.pathname === link.path ? 'text-white' : 'text-gray-400'
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-4 md:gap-6">
          {isAuthenticated ? (
            <>
              <div className="relative group hidden sm:block">
                <Search className="cursor-pointer text-gray-400 transition-colors hover:text-white" size={20} />
              </div>
              <Bell className="cursor-pointer text-gray-400 transition-colors hover:text-white" size={20} />
              
              <div className="relative group">
                <button className="flex items-center gap-2 rounded-full p-1 transition-all hover:bg-white/10">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/20 text-accent ring-1 ring-accent/30">
                    <User size={18} />
                  </div>
                </button>
                
                <div className="absolute right-0 top-full mt-2 hidden w-48 origin-top-right flex-col rounded-xl glass p-2 shadow-2xl animate-in fade-in zoom-in group-hover:flex">
                  <div className="px-4 py-2 border-b border-white/10 mb-2">
                    <p className="text-sm font-semibold truncate">{user?.username}</p>
                    <p className="text-xs text-gray-400 truncate">{user?.email}</p>
                  </div>
                  <Link to="/profile" className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm transition-colors hover:bg-white/10">
                    <User size={16} /> Profil
                  </Link>
                  <button onClick={handleLogout} className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm text-primary transition-colors hover:bg-white/10 w-full text-left">
                    <LogOut size={16} /> Déconnexion
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/login" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
                Connexion
              </Link>
              <Link
                to="/register"
                className="rounded-full bg-primary px-5 py-2 text-sm font-bold text-white shadow-[0_4px_15px_rgba(229,9,20,0.3)] hover:bg-primary-hover transition-all hover:scale-105 active:scale-95"
              >
                S'inscrire
              </Link>
            </div>
          )}

          <button
            className="md:hidden text-gray-400 hover:text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && isAuthenticated && (
        <div className="absolute top-full left-0 w-full glass md:hidden animate-in slide-in-from-top-4">
          <div className="flex flex-col p-4 gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  'text-lg font-medium p-2 rounded-lg transition-colors',
                  location.pathname === link.path ? 'bg-primary/20 text-white' : 'text-gray-400'
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
