import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { BookOpen, User, Settings, LogOut, Menu, X, PlayCircle, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import '../members.css'; // Import the dedicated CSS

import { useAuth } from '../context/AuthContext';

const MembersLayout: React.FC = () => {
    const { token, logout } = useAuth();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [activeCourses, setActiveCourses] = useState<any[]>([]);
    const location = useLocation();

    useEffect(() => {
        if (token) {
            fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/api/user/courses`, {
                headers: { 'Authorization': `Bearer ${token}` }
            })
                .then(res => res.json())
                .then(data => {
                    setActiveCourses(Array.isArray(data) ? data : []);
                })
                .catch(err => console.error("Failed to fetch sidebar courses", err));
        }
    }, [token]);

    const navItems = [
        { path: '/membros', label: 'Meus Cursos', icon: <BookOpen size={20} /> },
        { path: '/membros/comunidade', label: 'Comunidade', icon: <Users size={20} /> },
        { path: '/membros/perfil', label: 'Meu Perfil', icon: <User size={20} /> },
        { path: '/membros/configuracoes', label: 'Configurações', icon: <Settings size={20} /> },
    ];

    const isActive = (path: string) => location.pathname === path || (path !== '/membros' && location.pathname.startsWith(path));

    return (
        <div className="members-layout">
            
            {/* Mobile Header */}
            <div className="members-mobile-header">
                <Link to="/disruptivo" style={{ height: '24px' }}>
                    <img src="/LOGO H.svg" alt="Bisnoteka" style={{ height: '100%', objectFit: 'contain' }} />
                </Link>
                <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                    <button onClick={() => setSidebarOpen(true)} style={{ background: 'transparent', border: 'none', color: 'var(--text-color)', display: 'flex', alignItems: 'center' }}>
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
                        className="lg:hidden"
                    />
                )}
            </AnimatePresence>

            {/* Sidebar */}
            <div className={`members-sidebar ${sidebarOpen ? 'open-mobile' : 'closed-mobile'}`}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                    <Link to="/disruptivo" style={{ height: '24px', display: 'block' }}>
                        <img src="/LOGO H.svg" alt="Bisnoteka" style={{ height: '100%', objectFit: 'contain' }} />
                    </Link>
                    <button onClick={() => setSidebarOpen(false)} className="hide-desktop" style={{ background: 'transparent', border: 'none', color: 'var(--text-color)' }}>
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
                    
                    {activeCourses.length > 0 && (
                        <>
                            <div style={{ fontSize: '12px', color: '#666', fontWeight: 900, textTransform: 'uppercase', marginBottom: '0.5rem', marginTop: '2rem', letterSpacing: '0.1em' }}>
                                CURSOS ATIVOS
                            </div>
                            {activeCourses.map((course) => (
                                <Link key={course.id} to={`/membros/curso/${course.id}`} onClick={() => setSidebarOpen(false)} style={{ textDecoration: 'none' }}>
                                    <div className="sidebar-nav-item">
                                        <PlayCircle size={18} color="#0011fd" style={{ flexShrink: 0 }} />
                                        <span style={{ fontSize: '14px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{course.title}</span>
                                    </div>
                                </Link>
                            ))}
                        </>
                    )}

                </div>
                <div style={{ borderTop: '1px solid var(--sidebar-border)', marginTop: '1rem' }}></div>
                <button 
                    onClick={() => {
                        logout();
                        setSidebarOpen(false);
                    }} 
                    style={{ background: 'transparent', border: 'none', padding: 0, textAlign: 'left', width: '100%', cursor: 'pointer' }}
                >
                    <div className="sidebar-nav-item" style={{ color: '#f83821', fontWeight: 'bold' }}>
                        <LogOut size={20} />
                        Sair
                    </div>
                </button>
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
