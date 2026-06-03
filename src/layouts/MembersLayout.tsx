import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { BookOpen, User, Settings, LogOut, Menu, X, PlayCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import '../members.css'; // Import the dedicated CSS

const MembersLayout: React.FC = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const location = useLocation();

    const navItems = [
        { path: '/membros', label: 'Meus Cursos', icon: <BookOpen size={20} /> },
        { path: '/membros/perfil', label: 'Meu Perfil', icon: <User size={20} /> },
        { path: '/membros/configuracoes', label: 'Configurações', icon: <Settings size={20} /> },
    ];

    const isActive = (path: string) => location.pathname === path || (path !== '/membros' && location.pathname.startsWith(path));

    return (
        <div className="members-layout">
            
            {/* Mobile Header */}
            <div className="members-mobile-header">
                <Link to="/" style={{ height: '32px' }}>
                    <img src="/media/BISNOTEKA_LOGO.png" alt="Bisnoteka" style={{ height: '100%', objectFit: 'contain' }} />
                </Link>
                <div>
                    <button onClick={() => setSidebarOpen(true)} style={{ background: 'transparent', border: 'none', color: '#fff' }}>
                        <Menu size={24} />
                    </button>
                </div>
            </div>

            {/* Sidebar Overlay (Mobile) */}
            <AnimatePresence>
                {sidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSidebarOpen(false)}
                        style={{
                            position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 90
                        }}
                        className="lg:hidden" /* Keeping standard index.css helper if any, or just inline */
                    />
                )}
            </AnimatePresence>

            {/* Sidebar */}
            <div className={`members-sidebar ${sidebarOpen ? 'open-mobile' : 'closed-mobile'}`}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                    <Link to="/membros" style={{ height: '32px', display: 'block' }}>
                        <img src="/media/BISNOTEKA_LOGO.png" alt="Bisnoteka" style={{ height: '100%', objectFit: 'contain' }} />
                    </Link>
                    <button onClick={() => setSidebarOpen(false)} className="hide-desktop" style={{ background: 'transparent', border: 'none', color: '#fff' }}>
                        <X size={24} />
                    </button>
                </div>

                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <div style={{ fontSize: '12px', color: '#666', fontWeight: 900, textTransform: 'uppercase', marginBottom: '0.5rem', letterSpacing: '0.1em' }}>
                        MENU PRINCIPAL
                    </div>
                    {navItems.map((item) => (
                        <Link key={item.path} to={item.path} onClick={() => setSidebarOpen(false)} style={{ textDecoration: 'none' }}>
                            <div className={`sidebar-nav-item ${isActive(item.path) ? 'active' : ''}`}>
                                {item.icon}
                                {item.label}
                            </div>
                        </Link>
                    ))}
                    
                    <div style={{ fontSize: '12px', color: '#666', fontWeight: 900, textTransform: 'uppercase', marginBottom: '0.5rem', marginTop: '2rem', letterSpacing: '0.1em' }}>
                        CURSOS ATIVOS
                    </div>
                    <Link to="/membros/curso/1" onClick={() => setSidebarOpen(false)} style={{ textDecoration: 'none' }}>
                        <div className="sidebar-nav-item">
                            <PlayCircle size={18} color="#0011fd" style={{ flexShrink: 0 }} />
                            <span style={{ fontSize: '14px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Liderança Extrema</span>
                        </div>
                    </Link>
                    <Link to="/membros/curso/2" onClick={() => setSidebarOpen(false)} style={{ textDecoration: 'none' }}>
                        <div className="sidebar-nav-item">
                            <PlayCircle size={18} color="#0011fd" style={{ flexShrink: 0 }} />
                            <span style={{ fontSize: '14px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Escala Angolana</span>
                        </div>
                    </Link>

                </div>

                <Link to="/" style={{ textDecoration: 'none', marginTop: '1rem' }}>
                    <div className="sidebar-nav-item" style={{ color: '#f83821', fontWeight: 'bold' }}>
                        <LogOut size={20} />
                        Sair
                    </div>
                </Link>
            </div>

            {/* Main Content Area */}
            <div className="members-content">
                <div className="members-container">
                    <Outlet />
                </div>
            </div>

        </div>
    );
};

export default MembersLayout;
