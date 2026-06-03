import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LayoutDashboard,
    BookOpen,
    GraduationCap,
    Image as ImageIcon,
    Settings,
    Plus,
    Search,
    MoreVertical,
    TrendingUp,
    Users,
    Bell,
    LogOut,
    CheckCircle2,
    Clock,
    Flame,
    X,
    Folder,
    ExternalLink,
    Upload,
    Book,
    Lightbulb,
    Mic,
    Newspaper, Trophy, ShoppingCart, Hammer, Rocket, Brain, PlaySquare, BookText } from 'lucide-react';
import AdvancedCourseModal from '../components/AdvancedCourseModal';
import AdvancedIdeaModal from '../components/AdvancedIdeaModal';
import AdminMagazineTab from '../components/AdminMagazineTab';

const AdminDashboard: React.FC = () => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [showCourseModal, setShowCourseModal] = useState(false);
    const [showReadingModal, setShowReadingModal] = useState(false);
    const [showMediaModal, setShowMediaModal] = useState(false);
    const [showBookModal, setShowBookModal] = useState(false);
    const [showIdeaModal, setShowIdeaModal] = useState(false);
    const [showPodcastModal, setShowPodcastModal] = useState(false);
    const [showMagazineModal, setShowMagazineModal] = useState(false);
    const [showStoryModal, setShowStoryModal] = useState(false);
    const [showEbookModal, setShowEbookModal] = useState(false);
    const [showLessonModal, setShowLessonModal] = useState(false);
    const [showShopModal, setShowShopModal] = useState(false);
    const [showForgeModal, setShowForgeModal] = useState(false);
    const [showXperienceModal, setShowXperienceModal] = useState(false);
    const [showMindsetModal, setShowMindsetModal] = useState(false);

    const isSidebarCollapsed = false;

    
    const modalBaseStyle = { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15,23,42,0.8)', backdropFilter: 'blur(10px)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' } as const;
    const modalContainerStyle = { backgroundColor: '#fff', borderRadius: '35px', width: '100%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto' } as const;
    const modalHeaderStyle = { padding: '30px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' } as const;
    const modalBodyStyle = { padding: '30px', display: 'flex', flexDirection: 'column', gap: '25px' } as const;
    const inputGroupStyle = { display: 'flex', flexDirection: 'column', gap: '10px' } as const;
    const labelStyle = { fontSize: '12px', fontWeight: 900, color: '#64748b' } as const;
    const inputStyle = { backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', padding: '15px', borderRadius: '15px', color: '#0f172a' } as const;
    const submitButtonStyle = { backgroundColor: '#0011fd', color: '#fff', border: 'none', padding: '18px', borderRadius: '15px', fontWeight: 900, fontSize: '16px', cursor: 'pointer' } as const;

    const stats = [

        { label: 'Vendas Totais', value: '124,500 KZ', change: '+12.5%', icon: <TrendingUp size={20} />, color: '#0011fd' },
        { label: 'Novos Alunos', value: '1,240', change: '+5.2%', icon: <Users size={20} />, color: '#0011fd' },
        { label: 'Cursos Ativos', value: '24', change: '0%', icon: <GraduationCap size={20} />, color: '#0011fd' },
        { label: 'Taxa de Retenção', value: '88%', change: '+2.4%', icon: <Flame size={20} />, color: '#f83821' },
    ];

    const sidebarItems = [
        { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
        { id: 'courses', label: 'Cursos', icon: <GraduationCap size={20} /> },
        { id: 'books', label: 'Livros', icon: <Book size={20} /> },
        { id: 'reading', label: 'Progr. Leitura', icon: <BookOpen size={20} /> },
        { id: 'ideas', label: 'Ideias de Negócio', icon: <Lightbulb size={20} /> },
        { id: 'podcast', label: 'Podcast', icon: <Mic size={20} /> },
        { id: 'magazine', label: 'Revista', icon: <Newspaper size={20} /> },
        { id: 'stories', label: 'Sucesso', icon: <Trophy size={20} /> },
        { id: 'ebooks', label: 'E-books', icon: <BookText size={20} /> },
        { id: 'lessons', label: 'Aulas', icon: <PlaySquare size={20} /> },
        { id: 'shop', label: 'Loja', icon: <ShoppingCart size={20} /> },
        { id: 'forge', label: 'Faundr Forge', icon: <Hammer size={20} /> },
        { id: 'xperience', label: 'Faundr Xperience', icon: <Rocket size={20} /> },
        { id: 'mindset', label: 'Mindset Disruptivo', icon: <Brain size={20} /> },
        { id: 'media', label: 'Media', icon: <ImageIcon size={20} /> },
        { id: 'users', label: 'Usuários', icon: <Users size={20} /> },
        { id: 'settings', label: 'Configurações', icon: <Settings size={20} /> },
    ];

    return (
        <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', color: '#1e293b', display: 'flex', fontFamily: 'Inter, sans-serif' }}>

            {/* 1. SIDEBAR */}
            <motion.aside
                initial={false}
                animate={{ width: isSidebarCollapsed ? 80 : 280 }}
                style={{
                    backgroundColor: '#ffffff',
                    borderRight: '1px solid #e2e8f0',
                    height: '100vh',
                    position: 'sticky',
                    top: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    zIndex: 100
                }}
            >
                <div style={{ padding: '30px', display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <div style={{ width: '35px', height: '35px', backgroundColor: '#0011fd', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Folder fill="#fff" size={20} />
                    </div>
                    {!isSidebarCollapsed && <span style={{ fontWeight: 900, fontSize: '18px', letterSpacing: '-1px' }}>ADMIN CENTER</span>}
                </div>

                <nav style={{ flex: 1, padding: '20px' }}>
                    {sidebarItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            style={{
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '15px',
                                padding: '15px',
                                borderRadius: '15px',
                                border: 'none',
                                backgroundColor: activeTab === item.id ? 'rgba(0,17,253,0.05)' : 'transparent',
                                color: activeTab === item.id ? '#0011fd' : '#64748b',
                                cursor: 'pointer',
                                transition: 'all 0.3s',
                                marginBottom: '5px',
                                fontWeight: activeTab === item.id ? 700 : 500
                            }}
                        >
                            {item.icon}
                            {!isSidebarCollapsed && item.label}
                        </button>
                    ))}
                </nav>

                <div style={{ padding: '20px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                    <button style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '15px', padding: '15px', color: '#666', border: 'none', backgroundColor: 'transparent', cursor: 'pointer' }}>
                        <LogOut size={20} />
                        {!isSidebarCollapsed && <span>Sair</span>}
                    </button>
                </div>
            </motion.aside>

            {/* 2. MAIN CONTENT */}
            <main style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>

                {/* Header */}
                <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                    <div>
                        <h1 style={{ fontSize: '32px', fontWeight: 900, textTransform: 'uppercase' }}>{sidebarItems.find(i => i.id === activeTab)?.label}</h1>
                        <p style={{ color: '#666', fontSize: '14px' }}>Gerencie os ativos digitais da sua plataforma Bisnoteka.</p>
                    </div>
                    <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                        <div style={{ position: 'relative' }}>
                            <Search style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#666' }} size={18} />
                            <input
                                type="text"
                                placeholder="Buscar recursos..."
                                style={{ backgroundColor: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '12px 15px 12px 45px', color: '#1e293b', width: '300px' }}
                            />
                        </div>
                        <div style={{ width: '45px', height: '45px', backgroundColor: '#f1f5f9', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b' }}>
                            <Bell size={20} />
                        </div>
                        <div style={{ width: '45px', height: '45px', backgroundColor: '#0011fd', borderRadius: '12px', overflow: 'hidden', border: '2px solid #fff', boxShadow: '0 4px 12px rgba(0,17,253,0.2)' }}>
                            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin" alt="Admin" style={{ width: '100%', height: '100%' }} />
                        </div>
                    </div>
                </header>

                {/* Dashboard Overview */}
                {activeTab === 'dashboard' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
                            {stats.map((stat, i) => (
                                <motion.div
                                    key={i}
                                    whileHover={{ y: -5, boxShadow: '0 10px 25px rgba(0,0,0,0.05)' }}
                                    style={{ backgroundColor: '#ffffff', padding: '30px', borderRadius: '25px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                                        <div style={{ color: stat.color, backgroundColor: 'rgba(0,17,253,0.05)', width: '40px', height: '40px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{stat.icon}</div>
                                        <span style={{ color: '#059669', fontSize: '12px', fontWeight: 700, backgroundColor: '#dcfce7', padding: '4px 8px', borderRadius: '6px' }}>{stat.change}</span>
                                    </div>
                                    <div style={{ fontSize: '28px', fontWeight: 900, color: '#0f172a' }}>{stat.value}</div>
                                    <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 500, textTransform: 'uppercase', marginTop: '5px' }}>{stat.label}</div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Recent Activity */}
                        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px' }}>
                            <div style={{ backgroundColor: '#ffffff', padding: '40px', borderRadius: '35px', border: '1px solid #e2e8f0' }}>
                                <h3 style={{ fontSize: '20px', fontWeight: 900, marginBottom: '30px', color: '#0f172a' }}>UPLOADS RECENTES</h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                    {[1, 2, 3].map(i => (
                                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '15px', backgroundColor: '#f8fafc', borderRadius: '15px', border: '1px solid #f1f5f9' }}>
                                            <div style={{ width: '50px', height: '50px', backgroundColor: '#e2e8f0', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <ImageIcon size={20} color="#94a3b8" />
                                            </div>
                                            <div style={{ flex: 1 }}>
                                                <div style={{ fontWeight: 700, color: '#0f172a' }}>A Única Coisa - Capa Original</div>
                                                <div style={{ fontSize: '12px', color: '#64748b' }}>Upload realizado por Admin • Há 2 horas</div>
                                            </div>
                                            <div style={{ color: '#059669', fontWeight: 700, fontSize: '12px', backgroundColor: '#dcfce7', padding: '5px 10px', borderRadius: '8px' }}>CONCLUÍDO</div>
                                            <MoreVertical size={18} color="#94a3b8" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div style={{ backgroundColor: '#ffffff', padding: '40px', borderRadius: '35px', border: '1px solid #e2e8f0' }}>
                                <h3 style={{ fontSize: '20px', fontWeight: 900, marginBottom: '30px', color: '#0f172a' }}>ESTADO DO SISTEMA</h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <CheckCircle2 size={16} color="#10b981" />
                                            <span style={{ fontSize: '14px', fontWeight: 500 }}>Servidor Principal</span>
                                        </div>
                                        <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 700 }}>99.9%</span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <CheckCircle2 size={16} color="#10b981" />
                                            <span style={{ fontSize: '14px', fontWeight: 500 }}>Base de Dados</span>
                                        </div>
                                        <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 700 }}>ONLINE</span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <Clock size={16} color="#ef4444" />
                                            <span style={{ fontSize: '14px', fontWeight: 500 }}>Backups Diários</span>
                                        </div>
                                        <span style={{ fontSize: '12px', color: '#ef4444', fontWeight: 700 }}>PENDENTE</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Courses Management */}
                {activeTab === 'courses' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', gap: '15px' }}>
                                <button
                                    onClick={() => setShowCourseModal(true)}
                                    style={{ backgroundColor: '#0011fd', color: '#fff', border: 'none', padding: '12px 25px', borderRadius: '12px', fontWeight: 900, fontSize: '14px', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,17,253,0.2)' }}
                                >
                                    <Plus size={18} /> CADASTRAR CURSO
                                </button>
                                <button style={{ backgroundColor: '#fff', color: '#1e293b', border: '1px solid #e2e8f0', padding: '12px 25px', borderRadius: '12px', fontWeight: 700, fontSize: '14px', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                                    <Upload size={18} /> IMPORTAÇÃO EM MASSA
                                </button>
                            </div>
                            <div style={{ color: '#64748b', fontSize: '14px', fontWeight: 600 }}>Total: 24 cursos registrados</div>
                        </div>

                        <div style={{ backgroundColor: '#ffffff', borderRadius: '30px', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                                <thead>
                                    <tr style={{ borderBottom: '1px solid #f1f5f9', backgroundColor: '#f8fafc' }}>
                                        <th style={{ padding: '25px', color: '#64748b', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>Título do Curso</th>
                                        <th style={{ padding: '25px', color: '#64748b', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>Categoria</th>
                                        <th style={{ padding: '25px', color: '#64748b', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>Inscritos</th>
                                        <th style={{ padding: '25px', color: '#64748b', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>Preço</th>
                                        <th style={{ padding: '25px', color: '#64748b', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>Status</th>
                                        <th style={{ padding: '25px', color: '#64748b', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        { title: 'Branding para Empreendedores', category: 'Marketing', students: 450, price: '45,000 KZ', status: 'Publicado' },
                                        { title: 'Copywriting de Impacto', category: 'Escrita', students: 320, price: '38,000 KZ', status: 'Rascunho' },
                                        { title: 'Gestão Financeira Pessoal', category: 'Finanças', students: 890, price: '12,000 KZ', status: 'Publicado' },
                                        { title: 'Mindset Disruptivo PRO', category: 'Estratégia', students: 1200, price: '85,000 KZ', status: 'Publicado' }
                                    ].map((course, i) => (
                                        <tr key={i} style={{ borderBottom: '1px solid #f1f5f9', transition: 'all 0.3s' }}>
                                            <td style={{ padding: '25px' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                                    <div style={{ width: '40px', height: '40px', backgroundColor: '#f1f5f9', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <GraduationCap size={20} color="#0011fd" />
                                                    </div>
                                                    <span style={{ fontWeight: 700, color: '#0f172a' }}>{course.title}</span>
                                                </div>
                                            </td>
                                            <td style={{ padding: '25px', color: '#64748b', fontWeight: 500 }}>{course.category}</td>
                                            <td style={{ padding: '25px', fontWeight: 800, color: '#0f172a' }}>{course.students}</td>
                                            <td style={{ padding: '25px', fontWeight: 700, color: '#0011fd' }}>{course.price}</td>
                                            <td style={{ padding: '25px' }}>
                                                <span style={{
                                                    padding: '6px 12px',
                                                    borderRadius: '8px',
                                                    fontSize: '10px',
                                                    fontWeight: 900,
                                                    backgroundColor: course.status === 'Publicado' ? '#dcfce7' : '#f1f5f9',
                                                    color: course.status === 'Publicado' ? '#059669' : '#64748b'
                                                }}>
                                                    {course.status.toUpperCase()}
                                                </span>
                                            </td>
                                            <td style={{ padding: '25px' }}>
                                                <div style={{ display: 'flex', gap: '10px' }}>
                                                    <button style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', color: '#64748b', width: '35px', height: '35px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                                        <ExternalLink size={16} />
                                                    </button>
                                                    <button style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', color: '#64748b', width: '35px', height: '35px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                                        <MoreVertical size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Books Management */}
                {activeTab === 'books' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', gap: '15px' }}>
                                <button
                                    onClick={() => setShowBookModal(true)}
                                    style={{ backgroundColor: '#0011fd', color: '#fff', border: 'none', padding: '12px 25px', borderRadius: '12px', fontWeight: 900, fontSize: '14px', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
                                >
                                    <Plus size={18} /> ADICIONAR LIVRO
                                </button>
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '25px' }}>
                            {[1, 2, 3].map(i => (
                                <motion.div
                                    key={i}
                                    whileHover={{ y: -10 }}
                                    style={{ backgroundColor: '#fff', borderRadius: '25px', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}
                                >
                                    <div style={{ aspectRatio: '3/4', backgroundColor: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Book size={40} color="#cbd5e1" />
                                    </div>
                                    <div style={{ padding: '20px' }}>
                                        <div style={{ fontSize: '10px', fontWeight: 900, color: '#0011fd', textTransform: 'uppercase', marginBottom: '5px' }}>Desenvolvimento</div>
                                        <div style={{ fontWeight: 800, fontSize: '15px', color: '#0f172a', marginBottom: '5px' }}>A Única Coisa</div>
                                        <div style={{ fontSize: '12px', color: '#64748b' }}>Gary Keller</div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Ideas Management */}
                {activeTab === 'ideas' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <button
                                onClick={() => setShowIdeaModal(true)}
                                style={{ backgroundColor: '#0011fd', color: '#fff', border: 'none', padding: '12px 25px', borderRadius: '12px', fontWeight: 900, fontSize: '14px', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
                            >
                                <Plus size={18} /> NOVA IDEIA DE NEGÓCIO
                            </button>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px' }}>
                            {[1, 2].map(i => (
                                <div key={i} style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '30px', border: '1px solid #e2e8f0' }}>
                                    <div style={{ width: '50px', height: '50px', backgroundColor: 'rgba(251, 191, 36, 0.1)', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                                        <Lightbulb color="#f59e0b" size={24} />
                                    </div>
                                    <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#0f172a', marginBottom: '10px' }}>Agência de IA Customizada</h3>
                                    <p style={{ color: '#64748b', fontSize: '14px', lineHeight: '1.6', marginBottom: '20px' }}>Implementação de soluções de automação para pequenas e médias empresas angolanas.</p>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span style={{ fontSize: '12px', fontWeight: 700, color: '#0011fd' }}>ALTO POTENCIAL</span>
                                        <button style={{ color: '#64748b', background: 'none', border: 'none', cursor: 'pointer' }}><ExternalLink size={16} /></button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Podcast Management */}
                {activeTab === 'podcast' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <button
                                onClick={() => setShowPodcastModal(true)}
                                style={{ backgroundColor: '#0011fd', color: '#fff', border: 'none', padding: '12px 25px', borderRadius: '12px', fontWeight: 900, fontSize: '14px', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
                            >
                                <Plus size={18} /> NOVO EPISÓDIO
                            </button>
                        </div>
                        <div style={{ backgroundColor: '#fff', borderRadius: '30px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                                <tr style={{ borderBottom: '1px solid #f1f5f9', backgroundColor: '#f8fafc' }}>
                                    <th style={{ padding: '25px', color: '#64748b', fontSize: '12px', textTransform: 'uppercase' }}>Episódio</th>
                                    <th style={{ padding: '25px', color: '#64748b', fontSize: '12px', textTransform: 'uppercase' }}>Convidado</th>
                                    <th style={{ padding: '25px', color: '#64748b', fontSize: '12px', textTransform: 'uppercase' }}>Duração</th>
                                    <th style={{ padding: '25px', color: '#64748b', fontSize: '12px', textTransform: 'uppercase' }}>Ações</th>
                                </tr>
                                {[1, 2].map(i => (
                                    <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                        <td style={{ padding: '25px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                                <div style={{ width: '45px', height: '45px', backgroundColor: '#f1f5f9', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    <Mic size={20} color="#0011fd" />
                                                </div>
                                                <span style={{ fontWeight: 700 }}>Ep. {i}: O Futuro do E-commerce</span>
                                            </div>
                                        </td>
                                        <td style={{ padding: '25px', color: '#64748b' }}>Edgar Gomes</td>
                                        <td style={{ padding: '25px', fontWeight: 700 }}>45 min</td>
                                        <td style={{ padding: '25px' }}><MoreVertical size={16} color="#94a3b8" /></td>
                                    </tr>
                                ))}
                            </table>
                        </div>
                    </div>
                )}

                {/* Magazine Management */}
                {activeTab === "magazine" && <AdminMagazineTab />}

                {/* Success Stories Management */}
                {activeTab === 'stories' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <button
                                onClick={() => setShowStoryModal(true)}
                                style={{ backgroundColor: '#0011fd', color: '#fff', border: 'none', padding: '12px 25px', borderRadius: '12px', fontWeight: 900, fontSize: '14px', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
                            >
                                <Plus size={18} /> NOVA HISTÓRIA
                            </button>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '30px' }}>
                            {[1].map(i => (
                                <div key={i} style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '35px', border: '1px solid #e2e8f0', display: 'flex', gap: '25px' }}>
                                    <div style={{ width: '120px', height: '120px', borderRadius: '25px', backgroundColor: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Trophy size={40} color="#0011fd" />
                                    </div>
                                    <div>
                                        <h3 style={{ fontSize: '20px', fontWeight: 900, color: '#0f172a', marginBottom: '5px' }}>Mateus André</h3>
                                        <div style={{ color: '#0011fd', fontSize: '12px', fontWeight: 900, textTransform: 'uppercase', marginBottom: '15px' }}>Fundador da TechHuila</div>
                                        <p style={{ color: '#64748b', fontSize: '14px', lineHeight: '1.6' }}>"A Bisnoteka mudou a forma como eu vejo negócios digitais em Angola..."</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Reading Program Management */}
                {activeTab === 'reading' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', gap: '15px' }}>
                                <button
                                    onClick={() => setShowReadingModal(true)}
                                    style={{ backgroundColor: '#0011fd', color: '#fff', border: 'none', padding: '12px 25px', borderRadius: '12px', fontWeight: 900, fontSize: '14px', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
                                >
                                    <Plus size={18} /> NOVO PROGRAMA
                                </button>
                            </div>
                        </div>

                        <div style={{ backgroundColor: '#fff', padding: '60px', borderRadius: '35px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
                            <BookOpen size={48} color="#cbd5e1" style={{ marginBottom: '20px' }} />
                            <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '10px', color: '#0f172a' }}>NENHUM PROGRAMA ATIVO</h3>
                            <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '30px' }}>Comece criando o desafio de leitura para o próximo mês.</p>
                            <button
                                onClick={() => setShowReadingModal(true)}
                                style={{ backgroundColor: '#f1f5f9', color: '#0011fd', border: 'none', padding: '12px 30px', borderRadius: '12px', fontWeight: 900, cursor: 'pointer' }}
                            >
                                CRIAR DESAFIO
                            </button>
                        </div>
                    </div>
                )}

                {/* Media Library */}
                {activeTab === 'media' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                        <div style={{ backgroundColor: '#0011fd', padding: '60px', borderRadius: '40px', textAlign: 'center', border: '2px dashed rgba(255,255,255,0.3)', boxShadow: '0 20px 40px rgba(0,17,253,0.1)' }}>
                            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                                <Upload size={48} color="#fff" />
                            </div>
                            <h2 style={{ fontSize: '28px', fontWeight: 900, marginBottom: '10px', color: '#fff' }}>ARRASTE E SOLTE OS ARQUIVOS</h2>
                            <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '30px' }}>PNG, JPG, MP4 ou PDF (Máx. 500MB)</p>
                            <button
                                onClick={() => setShowMediaModal(true)}
                                style={{ backgroundColor: '#fff', color: '#0011fd', border: 'none', padding: '15px 40px', borderRadius: '15px', fontWeight: 900, fontSize: '16px', cursor: 'pointer' }}
                            >
                                SELECIONAR DO COMPUTADOR
                            </button>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
                            {[1, 2, 3, 4].map(i => (
                                <motion.div
                                    key={i}
                                    whileHover={{ scale: 1.02 }}
                                    style={{ backgroundColor: '#fff', borderRadius: '20px', border: '1px solid #e2e8f0', overflow: 'hidden' }}
                                >
                                    <div style={{ width: '100%', height: '160px', backgroundColor: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <ImageIcon size={32} color="#cbd5e1" />
                                    </div>
                                    <div style={{ padding: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div>
                                            <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>asset_media_{i}.png</div>
                                            <div style={{ fontSize: '11px', color: '#64748b' }}>1.2 MB • {i} Mar 2024</div>
                                        </div>
                                        <button style={{ color: '#94a3b8', background: 'none', border: 'none', cursor: 'pointer' }}><MoreVertical size={16} /></button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                )}

            
                {activeTab === 'ebooks' && (
                    <div style={{ backgroundColor: '#ffffff', padding: '40px', borderRadius: '35px', border: '1px solid #e2e8f0' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                            <h2 style={{ fontSize: '24px', fontWeight: 900, color: '#0f172a' }}>Gestão de E-books</h2>
                            <button onClick={() => setShowEbookModal(true)} style={{ backgroundColor: '#0011fd', color: '#fff', border: 'none', padding: '12px 25px', borderRadius: '12px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                                <Plus size={18} /> NOVO E-BOOK
                            </button>
                        </div>
                        {/* Lista de e-books aqui */}
                        <p style={{ color: '#64748b' }}>Nenhum e-book cadastrado no momento.</p>
                    </div>
                )}
                {activeTab === 'lessons' && (
                    <div style={{ backgroundColor: '#ffffff', padding: '40px', borderRadius: '35px', border: '1px solid #e2e8f0' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                            <h2 style={{ fontSize: '24px', fontWeight: 900, color: '#0f172a' }}>Gestão de Aulas Isoladas</h2>
                            <button onClick={() => setShowLessonModal(true)} style={{ backgroundColor: '#0011fd', color: '#fff', border: 'none', padding: '12px 25px', borderRadius: '12px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                                <Plus size={18} /> NOVA AULA
                            </button>
                        </div>
                        <p style={{ color: '#64748b' }}>Nenhuma aula cadastrada no momento.</p>
                    </div>
                )}
                {activeTab === 'shop' && (
                    <div style={{ backgroundColor: '#ffffff', padding: '40px', borderRadius: '35px', border: '1px solid #e2e8f0' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                            <h2 style={{ fontSize: '24px', fontWeight: 900, color: '#0f172a' }}>Gestão da Loja</h2>
                            <button onClick={() => setShowShopModal(true)} style={{ backgroundColor: '#0011fd', color: '#fff', border: 'none', padding: '12px 25px', borderRadius: '12px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                                <Plus size={18} /> NOVO PRODUTO
                            </button>
                        </div>
                        <p style={{ color: '#64748b' }}>Nenhum produto cadastrado no momento.</p>
                    </div>
                )}
                {activeTab === 'forge' && (
                    <div style={{ backgroundColor: '#ffffff', padding: '40px', borderRadius: '35px', border: '1px solid #e2e8f0' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                            <h2 style={{ fontSize: '24px', fontWeight: 900, color: '#0f172a' }}>Faundr Forge</h2>
                            <button onClick={() => setShowForgeModal(true)} style={{ backgroundColor: '#0011fd', color: '#fff', border: 'none', padding: '12px 25px', borderRadius: '12px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                                <Plus size={18} /> NOVA SESSÃO FORGE
                            </button>
                        </div>
                        <p style={{ color: '#64748b' }}>Nenhum item Forge cadastrado no momento.</p>
                    </div>
                )}
                {activeTab === 'xperience' && (
                    <div style={{ backgroundColor: '#ffffff', padding: '40px', borderRadius: '35px', border: '1px solid #e2e8f0' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                            <h2 style={{ fontSize: '24px', fontWeight: 900, color: '#0f172a' }}>Faundr Xperience</h2>
                            <button onClick={() => setShowXperienceModal(true)} style={{ backgroundColor: '#0011fd', color: '#fff', border: 'none', padding: '12px 25px', borderRadius: '12px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                                <Plus size={18} /> NOVO EVENTO XPERIENCE
                            </button>
                        </div>
                        <p style={{ color: '#64748b' }}>Nenhum evento Xperience cadastrado no momento.</p>
                    </div>
                )}
                {activeTab === 'mindset' && (
                    <div style={{ backgroundColor: '#ffffff', padding: '40px', borderRadius: '35px', border: '1px solid #e2e8f0' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                            <h2 style={{ fontSize: '24px', fontWeight: 900, color: '#0f172a' }}>Mindset Disruptivo</h2>
                            <button onClick={() => setShowMindsetModal(true)} style={{ backgroundColor: '#0011fd', color: '#fff', border: 'none', padding: '12px 25px', borderRadius: '12px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                                <Plus size={18} /> NOVO CONTEÚDO MINDSET
                            </button>
                        </div>
                        <p style={{ color: '#64748b' }}>Nenhum conteúdo Mindset cadastrado no momento.</p>
                    </div>
                )}

            </main>

            {/* MODALS */}
            <AnimatePresence>
                {/* Advanced Course Creation Modal */}
                <AdvancedCourseModal isOpen={showCourseModal} onClose={() => setShowCourseModal(false)} />

                {/* Media Upload Modal */}
                {showMediaModal && (
                    <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            style={{ backgroundColor: '#ffffff', width: '100%', maxWidth: '600px', borderRadius: '40px', border: '1px solid #e2e8f0', overflow: 'hidden' }}
                        >
                            <div style={{ padding: '40px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <h2 style={{ fontSize: '24px', fontWeight: 900, color: '#0f172a' }}>UPLOAD DE RECURSO</h2>
                                <button onClick={() => setShowMediaModal(false)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}><X size={24} /></button>
                            </div>
                            <div style={{ padding: '40px', textAlign: 'center' }}>
                                <div style={{ border: '2px dashed #e2e8f0', backgroundColor: '#f8fafc', borderRadius: '30px', padding: '60px 40px', cursor: 'pointer' }}>
                                    <Upload size={48} color="#0011fd" style={{ marginBottom: '20px' }} />
                                    <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '10px', color: '#0f172a' }}>Arraste seu arquivo para cá</h3>
                                    <p style={{ color: '#64748b', fontSize: '14px' }}>ou clique para selecionar do dispositivo</p>
                                </div>
                                <div style={{ marginTop: '30px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                    <input type="text" placeholder="Nome do arquivo..." style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', padding: '15px', borderRadius: '15px', color: '#0f172a' }} />
                                    <button style={{ backgroundColor: '#0011fd', color: '#fff', border: 'none', padding: '18px', borderRadius: '15px', fontWeight: 900, fontSize: '16px', cursor: 'pointer' }}>
                                        INICIAR UPLOAD
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}

                {/* Book Modal */}
                {showBookModal && (
                    <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            style={{ backgroundColor: '#ffffff', width: '100%', maxWidth: '700px', borderRadius: '40px', border: '1px solid #e2e8f0', overflow: 'hidden' }}
                        >
                            <div style={{ padding: '40px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <h2 style={{ fontSize: '24px', fontWeight: 900, color: '#0f172a' }}>NOVO LIVRO</h2>
                                <button onClick={() => setShowBookModal(false)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}><X size={24} /></button>
                            </div>
                            <div style={{ padding: '40px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                        <label style={{ fontSize: '12px', fontWeight: 900, color: '#64748b' }}>TÍTULO DO LIVRO</label>
                                        <input type="text" placeholder="Título completo..." style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', padding: '15px', borderRadius: '15px', color: '#0f172a' }} />
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                        <label style={{ fontSize: '12px', fontWeight: 900, color: '#64748b' }}>AUTOR</label>
                                        <input type="text" placeholder="Nome do autor..." style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', padding: '15px', borderRadius: '15px', color: '#0f172a' }} />
                                    </div>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                        <label style={{ fontSize: '12px', fontWeight: 900, color: '#64748b' }}>CATEGORIA</label>
                                        <select style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', padding: '15px', borderRadius: '15px', color: '#0f172a' }}>
                                            <option>Desenvolvimento Pessoal</option>
                                            <option>Finanças</option>
                                            <option>Marketing</option>
                                            <option>Empreendedorismo</option>
                                        </select>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                        <label style={{ fontSize: '12px', fontWeight: 900, color: '#64748b' }}>CAPA (URL)</label>
                                        <input type="text" placeholder="https://..." style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', padding: '15px', borderRadius: '15px', color: '#0f172a' }} />
                                    </div>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                    <label style={{ fontSize: '12px', fontWeight: 900, color: '#64748b' }}>SINOPSE</label>
                                    <textarea placeholder="Resumo do livro..." style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', padding: '15px', borderRadius: '15px', color: '#0f172a', height: '100px', resize: 'none' }}></textarea>
                                </div>
                                <button style={{ backgroundColor: '#0011fd', color: '#fff', border: 'none', padding: '18px', borderRadius: '15px', fontWeight: 900, fontSize: '16px', cursor: 'pointer' }}>
                                    SALVAR NO ACERVO
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}

                {/* Advanced Idea Modal */}
                <AdvancedIdeaModal isOpen={showIdeaModal} onClose={() => setShowIdeaModal(false)} />

                {/* Reading Program Modal */}
                {showReadingModal && (
                    <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            style={{ backgroundColor: '#ffffff', width: '100%', maxWidth: '700px', borderRadius: '40px', border: '1px solid #e2e8f0', overflow: 'hidden' }}
                        >
                            <div style={{ padding: '40px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <h2 style={{ fontSize: '24px', fontWeight: 900, color: '#0f172a' }}>NOVO PROGRAMA DE LEITURA</h2>
                                <button onClick={() => setShowReadingModal(false)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}><X size={24} /></button>
                            </div>
                            <div style={{ padding: '40px', display: 'flex', flexDirection: 'column', gap: '25px' }}>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                        <label style={{ fontSize: '12px', fontWeight: 900, color: '#64748b' }}>LIVRO DO MÊS</label>
                                        <select style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', padding: '15px', borderRadius: '15px', color: '#0f172a' }}>
                                            <option>Selecione um livro...</option>
                                            <option>A Única Coisa</option>
                                            <option>Hábitos Atômicos</option>
                                            <option>Pai Rico Pai Pobre</option>
                                        </select>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                        <label style={{ fontSize: '12px', fontWeight: 900, color: '#64748b' }}>MÊS DO DESAFIO</label>
                                        <select style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', padding: '15px', borderRadius: '15px', color: '#0f172a' }}>
                                            <option>Abril 2024</option>
                                            <option>Maio 2024</option>
                                            <option>Junho 2024</option>
                                        </select>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                    <label style={{ fontSize: '12px', fontWeight: 900, color: '#64748b' }}>TEMA CENTRAL</label>
                                    <input type="text" placeholder="Ex: Produtividade Extrema" style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', padding: '15px', borderRadius: '15px', color: '#0f172a' }} />
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                        <label style={{ fontSize: '12px', fontWeight: 900, color: '#64748b' }}>TOTAL DE PÁGINAS</label>
                                        <input type="number" placeholder="0" style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', padding: '15px', borderRadius: '15px', color: '#0f172a' }} />
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                        <label style={{ fontSize: '12px', fontWeight: 900, color: '#64748b' }}>DURAÇÃO (DIAS)</label>
                                        <input type="number" defaultValue="30" style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', padding: '15px', borderRadius: '15px', color: '#0f172a' }} />
                                    </div>
                                </div>
                                <button style={{ backgroundColor: '#ef4444', color: '#fff', border: 'none', padding: '18px', borderRadius: '15px', fontWeight: 900, fontSize: '16px', marginTop: '10px', cursor: 'pointer' }}>
                                    CRIAR PROGRAMA DISRUPTIVO
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}

                {/* Podcast Modal */}
                {showPodcastModal && (
                    <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            style={{ backgroundColor: '#ffffff', width: '100%', maxWidth: '700px', borderRadius: '40px', border: '1px solid #e2e8f0', overflow: 'hidden' }}
                        >
                            <div style={{ padding: '40px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <h2 style={{ fontSize: '24px', fontWeight: 900, color: '#0f172a' }}>LANÇAR EPISÓDIO</h2>
                                <button onClick={() => setShowPodcastModal(false)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}><X size={24} /></button>
                            </div>
                            <div style={{ padding: '40px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                    <label style={{ fontSize: '12px', fontWeight: 900, color: '#64748b' }}>TÍTULO DO EPISÓDIO</label>
                                    <input type="text" placeholder="Ex: Transforma sua mentalidade financeira" style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', padding: '15px', borderRadius: '15px', color: '#0f172a' }} />
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                        <label style={{ fontSize: '12px', fontWeight: 900, color: '#64748b' }}>HOST</label>
                                        <input type="text" defaultValue="Administrador" style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', padding: '15px', borderRadius: '15px', color: '#0f172a' }} />
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                        <label style={{ fontSize: '12px', fontWeight: 900, color: '#64748b' }}>CONVIDADO</label>
                                        <input type="text" placeholder="Nome do convidado..." style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', padding: '15px', borderRadius: '15px', color: '#0f172a' }} />
                                    </div>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                        <label style={{ fontSize: '12px', fontWeight: 900, color: '#64748b' }}>ARQUIVO ÁUDIO</label>
                                        <div style={{ border: '1px dashed #e2e8f0', padding: '10px', borderRadius: '12px', textAlign: 'center', fontSize: '12px', color: '#64748b' }}>Selecionar arquivo MP3</div>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                        <label style={{ fontSize: '12px', fontWeight: 900, color: '#64748b' }}>DURAÇÃO (MIN)</label>
                                        <input type="number" placeholder="45" style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', padding: '15px', borderRadius: '15px', color: '#0f172a' }} />
                                    </div>
                                </div>
                                <button style={{ backgroundColor: '#0011fd', color: '#fff', border: 'none', padding: '18px', borderRadius: '15px', fontWeight: 900, fontSize: '16px', cursor: 'pointer' }}>
                                    PUBLICAR EPISÓDIO
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}

                {/* Magazine Modal */}
                {showMagazineModal && (
                    <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            style={{ backgroundColor: '#ffffff', width: '100%', maxWidth: '700px', borderRadius: '40px', border: '1px solid #e2e8f0', overflow: 'hidden' }}
                        >
                            <div style={{ padding: '40px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <h2 style={{ fontSize: '24px', fontWeight: 900, color: '#0f172a' }}>LANÇAR REVISTA</h2>
                                <button onClick={() => setShowMagazineModal(false)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}><X size={24} /></button>
                            </div>
                            <div style={{ padding: '40px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                    <label style={{ fontSize: '12px', fontWeight: 900, color: '#64748b' }}>NOME DA EDIÇÃO</label>
                                    <input type="text" placeholder="Ex: Edição Especial de Inverno" style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', padding: '15px', borderRadius: '15px', color: '#0f172a' }} />
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                        <label style={{ fontSize: '12px', fontWeight: 900, color: '#64748b' }}>MÊS/ANO</label>
                                        <input type="text" placeholder="Março 2024" style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', padding: '15px', borderRadius: '15px', color: '#0f172a' }} />
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                        <label style={{ fontSize: '12px', fontWeight: 900, color: '#64748b' }}>VOLUME</label>
                                        <input type="number" placeholder="1" style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', padding: '15px', borderRadius: '15px', color: '#0f172a' }} />
                                    </div>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                    <label style={{ fontSize: '12px', fontWeight: 900, color: '#64748b' }}>ARQUIVO PDF</label>
                                    <div style={{ border: '1px dashed #e2e8f0', padding: '20px', borderRadius: '15px', textAlign: 'center', backgroundColor: '#f8fafc' }}>
                                        <Upload size={24} color="#94a3b8" style={{ marginBottom: '10px' }} />
                                        <div style={{ fontSize: '12px', color: '#64748b' }}>Clique para fazer upload da revista</div>
                                    </div>
                                </div>
                                <button style={{ backgroundColor: '#0011fd', color: '#fff', border: 'none', padding: '18px', borderRadius: '15px', fontWeight: 900, fontSize: '16px', cursor: 'pointer' }}>
                                    PUBLICAR EDIÇÃO
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}

                {/* Success Story Modal */}
                {showStoryModal && (
                    <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            style={{ backgroundColor: '#ffffff', width: '100%', maxWidth: '750px', borderRadius: '40px', border: '1px solid #e2e8f0', overflow: 'hidden' }}
                        >
                            <div style={{ padding: '40px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <h2 style={{ fontSize: '24px', fontWeight: 900, color: '#0f172a' }}>NOVA HISTÓRIA DE SUCESSO</h2>
                                <button onClick={() => setShowStoryModal(false)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}><X size={24} /></button>
                            </div>
                            <div style={{ padding: '40px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                        <label style={{ fontSize: '12px', fontWeight: 900, color: '#64748b' }}>NOME DO PROTAGONISTA</label>
                                        <input type="text" placeholder="Nome completo..." style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', padding: '15px', borderRadius: '15px', color: '#0f172a' }} />
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                        <label style={{ fontSize: '12px', fontWeight: 900, color: '#64748b' }}>SOLUÇÃO / CONQUISTA</label>
                                        <input type="text" placeholder="Ex: Faturou 10M em 3 meses" style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', padding: '15px', borderRadius: '15px', color: '#0f172a' }} />
                                    </div>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                    <label style={{ fontSize: '12px', fontWeight: 900, color: '#64748b' }}>CARGO / EMPRESA</label>
                                    <input type="text" placeholder="Ex: Fundador da Startup X" style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', padding: '15px', borderRadius: '15px', color: '#0f172a' }} />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                    <label style={{ fontSize: '12px', fontWeight: 900, color: '#64748b' }}>HISTÓRIA DETALHADA</label>
                                    <textarea placeholder="Conte como a Bisnoteka ajudou nesta jornada..." style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', padding: '15px', borderRadius: '15px', color: '#0f172a', height: '150px', resize: 'none' }}></textarea>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                    <label style={{ fontSize: '12px', fontWeight: 900, color: '#64748b' }}>FOTO DE PERFIL (URL)</label>
                                    <input type="text" placeholder="https://..." style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', padding: '15px', borderRadius: '15px', color: '#0f172a' }} />
                                </div>
                                <button style={{ backgroundColor: '#0011fd', color: '#fff', border: 'none', padding: '18px', borderRadius: '15px', fontWeight: 900, fontSize: '16px', cursor: 'pointer' }}>
                                    LANÇAR HISTÓRIA INSPIRADORA
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            
                {/* MODAL NOVO E-BOOK */}
                {showEbookModal && (
                    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15,23,42,0.8)', backdropFilter: 'blur(10px)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} style={{ backgroundColor: '#fff', borderRadius: '35px', width: '100%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto' }}>
                            <div style={{ padding: '30px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <h2 style={{ fontSize: '20px', fontWeight: 900, color: '#0f172a' }}>NOVO E-BOOK</h2>
                                <button onClick={() => setShowEbookModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}><X size={24} /></button>
                            </div>
                            <div style={{ padding: '30px', display: 'flex', flexDirection: 'column', gap: '25px' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                    <label style={{ fontSize: '12px', fontWeight: 900, color: '#64748b' }}>TÍTULO DO E-BOOK</label>
                                    <input type="text" placeholder="Ex: O Código da Riqueza" style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', padding: '15px', borderRadius: '15px', color: '#0f172a' }} />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                    <label style={{ fontSize: '12px', fontWeight: 900, color: '#64748b' }}>DESCRIÇÃO</label>
                                    <textarea placeholder="Descrição do e-book..." style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', padding: '15px', borderRadius: '15px', color: '#0f172a', height: '100px', resize: 'none' }}></textarea>
                                </div>
                                <button style={{ backgroundColor: '#0011fd', color: '#fff', border: 'none', padding: '18px', borderRadius: '15px', fontWeight: 900, fontSize: '16px', cursor: 'pointer' }}>PUBLICAR E-BOOK</button>
                            </div>
                        </motion.div>
                    </div>
                )}

                {/* MODAL NOVA AULA (Isolada) */}
                {showLessonModal && (
                    <div style={modalBaseStyle}>
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} style={modalContainerStyle}>
                            <div style={modalHeaderStyle}>
                                <h2 style={{ fontSize: '20px', fontWeight: 900, color: '#0f172a' }}>NOVA AULA (ISOLADA)</h2>
                                <button onClick={() => setShowLessonModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}><X size={24} /></button>
                            </div>
                            <div style={modalBodyStyle}>
                                <div style={inputGroupStyle}>
                                    <label style={labelStyle}>TÍTULO DA AULA</label>
                                    <input type="text" placeholder="Ex: Dominando Algoritmos..." style={inputStyle} />
                                </div>
                                <button style={submitButtonStyle}>PUBLICAR AULA</button>
                            </div>
                        </motion.div>
                    </div>
                )}

                {/* MODAL NOVO PRODUTO */}
                {showShopModal && (
                    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15,23,42,0.8)', backdropFilter: 'blur(10px)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} style={{ backgroundColor: '#fff', borderRadius: '35px', width: '100%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto' }}>
                            <div style={{ padding: '30px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <h2 style={{ fontSize: '20px', fontWeight: 900, color: '#0f172a' }}>NOVO PRODUTO DA LOJA</h2>
                                <button onClick={() => setShowShopModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}><X size={24} /></button>
                            </div>
                            <div style={{ padding: '30px', display: 'flex', flexDirection: 'column', gap: '25px' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                    <label style={{ fontSize: '12px', fontWeight: 900, color: '#64748b' }}>NOME DO PRODUTO (T-Shirt, Kit, Ferramenta)</label>
                                    <input type="text" placeholder="Ex: T-Shirt Bisnoteka..." style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', padding: '15px', borderRadius: '15px', color: '#0f172a' }} />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                    <label style={{ fontSize: '12px', fontWeight: 900, color: '#64748b' }}>PREÇO</label>
                                    <input type="number" placeholder="Ex: 5000" style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', padding: '15px', borderRadius: '15px', color: '#0f172a' }} />
                                </div>
                                <button style={{ backgroundColor: '#0011fd', color: '#fff', border: 'none', padding: '18px', borderRadius: '15px', fontWeight: 900, fontSize: '16px', cursor: 'pointer' }}>ADICIONAR PRODUTO</button>
                            </div>
                        </motion.div>
                    </div>
                )}

                {/* MODAL FAUNDR FORGE */}
                {showForgeModal && (
                    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15,23,42,0.8)', backdropFilter: 'blur(10px)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} style={{ backgroundColor: '#fff', borderRadius: '35px', width: '100%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto' }}>
                            <div style={{ padding: '30px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <h2 style={{ fontSize: '20px', fontWeight: 900, color: '#0f172a' }}>NOVA SESSÃO FORGE</h2>
                                <button onClick={() => setShowForgeModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}><X size={24} /></button>
                            </div>
                            <div style={{ padding: '30px', display: 'flex', flexDirection: 'column', gap: '25px' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                    <label style={{ fontSize: '12px', fontWeight: 900, color: '#64748b' }}>TÍTULO DA SESSÃO</label>
                                    <input type="text" placeholder="Ex: Construindo SaaS..." style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', padding: '15px', borderRadius: '15px', color: '#0f172a' }} />
                                </div>
                                <button style={{ backgroundColor: '#0011fd', color: '#fff', border: 'none', padding: '18px', borderRadius: '15px', fontWeight: 900, fontSize: '16px', cursor: 'pointer' }}>CRIAR SESSÃO FORGE</button>
                            </div>
                        </motion.div>
                    </div>
                )}

                {/* MODAL FAUNDR XPERIENCE */}
                {showXperienceModal && (
                    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15,23,42,0.8)', backdropFilter: 'blur(10px)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} style={{ backgroundColor: '#fff', borderRadius: '35px', width: '100%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto' }}>
                            <div style={{ padding: '30px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <h2 style={{ fontSize: '20px', fontWeight: 900, color: '#0f172a' }}>NOVO EVENTO XPERIENCE</h2>
                                <button onClick={() => setShowXperienceModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}><X size={24} /></button>
                            </div>
                            <div style={{ padding: '30px', display: 'flex', flexDirection: 'column', gap: '25px' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                    <label style={{ fontSize: '12px', fontWeight: 900, color: '#64748b' }}>NOME DO EVENTO</label>
                                    <input type="text" placeholder="Ex: Edição Especial Bootcamp..." style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', padding: '15px', borderRadius: '15px', color: '#0f172a' }} />
                                </div>
                                <button style={{ backgroundColor: '#0011fd', color: '#fff', border: 'none', padding: '18px', borderRadius: '15px', fontWeight: 900, fontSize: '16px', cursor: 'pointer' }}>CRIAR EVENTO XPERIENCE</button>
                            </div>
                        </motion.div>
                    </div>
                )}

                {/* MODAL MINDSET DISRUPTIVO */}
                {showMindsetModal && (
                    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15,23,42,0.8)', backdropFilter: 'blur(10px)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} style={{ backgroundColor: '#fff', borderRadius: '35px', width: '100%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto' }}>
                            <div style={{ padding: '30px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <h2 style={{ fontSize: '20px', fontWeight: 900, color: '#0f172a' }}>NOVO CONTEÚDO MINDSET</h2>
                                <button onClick={() => setShowMindsetModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}><X size={24} /></button>
                            </div>
                            <div style={{ padding: '30px', display: 'flex', flexDirection: 'column', gap: '25px' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                    <label style={{ fontSize: '12px', fontWeight: 900, color: '#64748b' }}>TÍTULO DA REFLEXÃO</label>
                                    <input type="text" placeholder="Ex: Rompendo Crenças..." style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', padding: '15px', borderRadius: '15px', color: '#0f172a' }} />
                                </div>
                                <button style={{ backgroundColor: '#0011fd', color: '#fff', border: 'none', padding: '18px', borderRadius: '15px', fontWeight: 900, fontSize: '16px', cursor: 'pointer' }}>PUBLICAR MINDSET</button>
                            </div>
                        </motion.div>
                    </div>
                )}

            </AnimatePresence>
        </div>
    );
};

export default AdminDashboard;
