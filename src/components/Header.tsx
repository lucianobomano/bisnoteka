import React, { useState } from 'react';
import { Menu, X, ChevronDown, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header: React.FC = () => {
  const { user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 text-white shadow-xl font-['Roboto'] select-none" style={{ height: '75px', backgroundColor: '#10171f' }}>
      <div className="h-full flex items-center justify-between w-full px-4 lg:px-[100px]">

        {/* Left Side: Logo only */}
        <Link
          to="/"
          className="flex items-center cursor-pointer flex-shrink-0"
          style={{ textDecoration: 'none' }}
        >
          <img src="/LOGO H.svg" alt="Bisnoteka Logo" style={{ height: '28px', width: 'auto' }} />
        </Link>

        {/* Right Side: Navigation, CTAs and Avatar */}
        <div className="hidden lg:flex items-center h-full" style={{ gap: '40px' }}>

          {/* Navigation Menu */}
          <nav className="flex items-center" style={{ gap: '30px' }}>
            <Link
              to="/"
              className="hover:text-white transition-all duration-300 relative group py-2 font-normal tracking-widest text-white/70"
              style={{ fontSize: '15px', textDecoration: 'none' }}
            >
              Home
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#f83821] transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              to="/livros"
              className="hover:text-white transition-all duration-300 relative group py-2 font-normal tracking-widest text-white/70"
              style={{ fontSize: '15px', textDecoration: 'none' }}
            >
              Livros
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#f83821] transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              to="/sucesso"
              className="hover:text-white transition-all duration-300 relative group py-2 whitespace-nowrap font-normal tracking-widest text-white/70"
              style={{ fontSize: '15px', textDecoration: 'none' }}
            >
              Histórias de Sucesso
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#f83821] transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              to="/faundr-magazine"
              className="hover:text-white transition-all duration-300 relative group py-2 font-normal tracking-widest text-white/70"
              style={{ fontSize: '15px', textDecoration: 'none' }}
            >
              Revista
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#f83821] transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              to="/podcasts"
              className="hover:text-white transition-all duration-300 relative group py-2 whitespace-nowrap font-normal tracking-widest text-white/70"
              style={{ fontSize: '15px', textDecoration: 'none' }}
            >
              Podcasts
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#f83821] transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              to="/bisnoteka"
              className="hover:text-white transition-all duration-300 relative group py-2 font-normal tracking-widest text-[#f83821]"
              style={{ fontSize: '15px', textDecoration: 'none' }}
            >
              Bisnoteka
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#f83821] transition-all duration-300 group-hover:w-full"></span>
            </Link>

            {/* Ver Mais */}
            <div className="relative group">
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); setIsDropdownOpen(!isDropdownOpen); }}
                className="flex items-center gap-2 hover:text-white transition-all py-2 font-normal tracking-widest text-white/70 relative cursor-pointer"
                style={{ fontSize: '15px', textDecoration: 'none', background: 'none', border: 'none', padding: 0, outline: 'none' }}
              >
                Ver Mais
                <ChevronDown size={18} className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#f83821] transition-all duration-300 group-hover:w-full"></span>
              </a>

              {isDropdownOpen && (
                <div
                  className="absolute top-full left-0 mt-3 rounded-xl shadow-2xl z-50 transition-all border border-white/10"
                  style={{
                    backgroundColor: '#10171f',
                    width: '320px',
                    padding: '30px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px'
                  }}
                >
                  {[
                    { name: 'Loja', path: '/loja' },
                    { name: 'Cursos', path: '/cursos' },
                    { name: 'Faundr Forge', path: '/forge' },
                    { name: 'Faundr Experience', path: '/experience' },
                    { name: 'Mindset Disruptivo', path: '/disruptivo' },
                    { name: 'Recursos', path: '/' }
                  ].map((item, idx) => (
                    <Link
                      key={idx}
                      to={item.path}
                      onClick={() => setIsDropdownOpen(false)}
                      className="hover:text-[#f83821] transition-colors text-white/80"
                      style={{ fontSize: '18px', fontWeight: 400, textDecoration: 'none' }}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Separator */}
          <div style={{ width: '1px', height: '30px', backgroundColor: 'rgba(255,255,255,0.1)' }}></div>

          {/* CTAs */}
          <div className="flex items-center" style={{ gap: '12px' }}>
            <Link to="/forge" style={{ width: '170px', height: '42px', backgroundColor: '#e5e0e7', color: '#000000', fontSize: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }} className="font-normal rounded-full hover:brightness-95 transition-all flex-shrink-0 tracking-tight">
              Faundr Forge
            </Link>
            <Link to="/experience" style={{ width: '170px', height: '42px', backgroundColor: '#0011fd', fontSize: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }} className="text-white font-normal rounded-full hover:brightness-110 transition-all shadow-[0_8px_20px_rgba(0,17,253,0.25)] flex-shrink-0 tracking-tight">
              Faundr Xperience
            </Link>
            <Link to="/cursos" style={{ width: '108px', height: '42px', backgroundColor: '#f93821', fontSize: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }} className="text-white font-normal rounded-full hover:brightness-110 transition-all flex-shrink-0 tracking-tight">
              Cursos
            </Link>
            
            {user ? (
              <Link to="/disruptivo" style={{ width: '186px', height: '42px', border: '2px solid #f83821', backgroundColor: 'transparent', fontSize: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }} className="text-white font-normal rounded-full hover:bg-[#f83821]/10 transition-all flex-shrink-0 tracking-tight">
                Mindset Disruptivo
              </Link>
            ) : (
              <>
                <Link to="/login" style={{ width: '100px', height: '42px', backgroundColor: 'transparent', border: '1px solid rgba(255,255,255,0.2)', fontSize: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }} className="text-white font-normal rounded-full hover:bg-white/5 transition-all flex-shrink-0 tracking-tight">
                  Login
                </Link>
                <Link to="/cadastro" style={{ width: '120px', height: '42px', backgroundColor: '#f83821', fontSize: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }} className="text-white font-normal rounded-full hover:brightness-110 transition-all flex-shrink-0 tracking-tight">
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Avatar / User Name */}
          {user && (
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-white/80 hidden xl:inline">
                Olá, {user.name.split(' ')[0]}
              </span>
              <Link to="/membros" style={{ width: '42px', height: '42px', backgroundColor: 'rgba(255,255,255,0.1)' }} title="Área de Membros" className="rounded-full hover:bg-[#f83821] hover:text-white flex items-center justify-center text-white/90 border border-white/10 transition-all flex-shrink-0 shadow-lg group">
                <User size={24} className="group-hover:scale-110 transition-transform" />
              </Link>
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          style={{ background: 'none', border: 'none', padding: 0, color: 'white', cursor: 'pointer' }}
          className="lg:hidden transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      {isMenuOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            backdropFilter: 'blur(8px)',
            zIndex: 40
          }}
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Mobile Nav Menu Container */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '100vh',
          backgroundColor: '#10171f',
          zIndex: 50,
          transform: isMenuOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.5s ease-in-out',
          display: 'flex',
          flexDirection: 'column',
          padding: '30px 20px',
          boxSizing: 'border-box',
          overflowY: 'auto'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', flexShrink: 0 }}>
          <Link
            to="/"
            style={{ display: 'flex', alignItems: 'center', height: '24px', textDecoration: 'none' }}
            onClick={() => setIsMenuOpen(false)}
          >
            <img src="/LOGO H.svg" alt="Bisnoteka Logo" style={{ height: '100%', width: 'auto' }} />
          </Link>
          <button
            style={{
              backgroundColor: 'rgba(255,255,255,0.1)',
              border: 'none',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
            onClick={() => setIsMenuOpen(false)}
          >
            <X size={20} color="white" />
          </button>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '30px' }}>
          {[
            { name: 'Home', path: '/' },
            { name: 'Livros', path: '/livros' },
            { name: 'Histórias de Sucesso', path: '/sucesso' },
            { name: 'Revista', path: '/faundr-magazine' },
            { name: 'Podcasts', path: '/podcasts' },
            { name: 'Bisnoteka', path: '/bisnoteka' },
            ...(user ? [{ name: 'Área de Membros', path: '/membros' }] : [])
          ].map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsMenuOpen(false)}
              style={{
                fontSize: '15px',
                fontWeight: 400,
                color: 'white',
                textDecoration: 'none',
                padding: '18px 0',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
                letterSpacing: '0',
                textAlign: 'left'
              }}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: 'auto', paddingBottom: '20px' }}>
          <Link to="/forge" onClick={() => setIsMenuOpen(false)} style={{ width: '100%', height: '52px', backgroundColor: '#e5e0e7', color: '#000000', border: 'none', borderRadius: '10px', fontWeight: 400, fontSize: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}>
            Faundr Forge
          </Link>
          <Link to="/experience" onClick={() => setIsMenuOpen(false)} style={{ width: '100%', height: '52px', backgroundColor: '#0011fd', color: 'white', border: 'none', borderRadius: '10px', fontWeight: 400, fontSize: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}>
            Faundr Xperience
          </Link>
          <Link to="/cursos" onClick={() => setIsMenuOpen(false)} style={{ width: '100%', height: '52px', backgroundColor: '#f93821', color: 'white', border: 'none', borderRadius: '10px', fontWeight: 400, fontSize: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}>
            Cursos
          </Link>
          {user ? (
            <Link to="/disruptivo" onClick={() => setIsMenuOpen(false)} style={{ width: '100%', height: '52px', backgroundColor: 'transparent', color: 'white', border: '2px solid #f83821', borderRadius: '10px', fontWeight: 400, fontSize: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}>
              Mindset Disruptivo
            </Link>
          ) : (
            <div style={{ display: 'flex', gap: '10px' }}>
              <Link to="/login" onClick={() => setIsMenuOpen(false)} style={{ flex: 1, height: '52px', backgroundColor: 'transparent', color: 'white', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '10px', fontWeight: 400, fontSize: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}>
                Login
              </Link>
              <Link to="/cadastro" onClick={() => setIsMenuOpen(false)} style={{ flex: 1, height: '52px', backgroundColor: '#f83821', color: 'white', border: 'none', borderRadius: '10px', fontWeight: 400, fontSize: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}>
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .animate-in {
          animation: slideDownIn 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes slideDownIn {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </header>
  );
};

export default Header;
