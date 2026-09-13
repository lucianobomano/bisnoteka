import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
    MessageSquare, Heart, Share2, Briefcase, Users, Radio, 
    Calendar, Send, Plus, Filter, Search, MapPin, DollarSign, 
    ChevronRight, Sparkles, Award, UserPlus, Volume2, HelpCircle 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Post {
    id: string;
    content: string;
    category: string;
    createdAt: string;
    likesCount: number;
    likedByUser: boolean;
    commentsCount: number;
    user: {
        name: string;
        avatarUrl: string | null;
        subscriptionTier: string;
    };
    comments: Comment[];
}

interface Comment {
    id: string;
    content: string;
    createdAt: string;
    user: {
        name: string;
        avatarUrl: string | null;
        subscriptionTier: string;
    };
}

interface Job {
    id: string;
    title: string;
    company: string;
    location: string;
    type: string; // FULL_TIME, PART_TIME, REMOTE, FREELANCE
    salary?: string;
    description: string;
    requirements?: string;
    applyUrlOrEmail: string;
    createdAt: string;
    user: {
        name: string;
        avatarUrl: string | null;
    };
}

const CommunityPage: React.FC = () => {
    const { token, user } = useAuth();
    const [activeTab, setActiveTab] = useState<'discussions' | 'jobs' | 'members' | 'live'>('discussions');
    
    // Discussion States
    const [posts, setPosts] = useState<Post[]>([]);
    const [postsLoading, setPostsLoading] = useState(true);
    const [categoryFilter, setCategoryFilter] = useState<string>('ALL');
    const [newPostContent, setNewPostContent] = useState('');
    const [newPostCategory, setNewPostCategory] = useState('GERAL');
    const [showNewPostModal, setShowNewPostModal] = useState(false);
    const [expandedCommentsPostId, setExpandedCommentsPostId] = useState<string | null>(null);
    const [newCommentText, setNewCommentText] = useState('');

    // Jobs States
    const [jobs, setJobs] = useState<Job[]>([]);
    const [jobsLoading, setJobsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [jobTypeFilter, setJobTypeFilter] = useState('ALL');
    const [showNewJobModal, setShowNewJobModal] = useState(false);
    const [newJobData, setNewJobData] = useState({
        title: '',
        company: '',
        location: '',
        type: 'FULL_TIME',
        salary: '',
        description: '',
        requirements: '',
        applyUrlOrEmail: ''
    });

    // AI Matchmaking & Live stage states
    const [matchingInProgress, setMatchingInProgress] = useState(false);
    const [matchedPartners, setMatchedPartners] = useState<any[]>([]);
    const [insideAudioRoom, setInsideAudioRoom] = useState<string | null>(null);
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    const categories = [
        { value: 'ALL', label: 'Todos os Tópicos' },
        { value: 'GERAL', label: 'Geral' },
        { value: 'IDEIAS', label: 'Ideias de Negócio' },
        { value: 'MARKETING', label: 'Marketing & Vendas' },
        { value: 'ESTRATEGIA', label: 'Estratégia' }
    ];

    const jobTypes = [
        { value: 'FULL_TIME', label: 'Tempo Inteiro' },
        { value: 'PART_TIME', label: 'Part-Time' },
        { value: 'REMOTE', label: 'Remoto' },
        { value: 'FREELANCE', label: 'Freelance' }
    ];

    const showToast = (msg: string) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(null), 3000);
    };

    // Load posts
    const loadPosts = async () => {
        if (!token) return;
        try {
            setPostsLoading(true);
            const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/api/community/posts`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                const data = await res.json();
                setPosts(data);
            }
        } catch (error) {
            console.error("Error loading posts:", error);
        } finally {
            setPostsLoading(false);
        }
    };

    // Load jobs
    const loadJobs = async () => {
        if (!token) return;
        try {
            setJobsLoading(true);
            const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/api/community/jobs`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                const data = await res.json();
                setJobs(data);
            }
        } catch (error) {
            console.error("Error loading jobs:", error);
        } finally {
            setJobsLoading(false);
        }
    };

    useEffect(() => {
        if (activeTab === 'discussions') {
            loadPosts();
        } else if (activeTab === 'jobs') {
            loadJobs();
        }
    }, [activeTab, token]);

    // Handle like toggle
    const handleLike = async (postId: string) => {
        if (!token) return;
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/api/community/posts/${postId}/like`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                const data = await res.json();
                setPosts(prev => prev.map(p => {
                    if (p.id === postId) {
                        return {
                            ...p,
                            likedByUser: data.liked,
                            likesCount: data.liked ? p.likesCount + 1 : p.likesCount - 1
                        };
                    }
                    return p;
                }));
            }
        } catch (error) {
            console.error("Error toggling like:", error);
        }
    };

    // Handle new post submit
    const handleCreatePost = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newPostContent.trim() || !token) return;

        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/api/community/posts`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    content: newPostContent,
                    category: newPostCategory
                })
            });

            if (res.ok) {
                const createdPost = await res.json();
                setPosts(prev => [createdPost, ...prev]);
                setNewPostContent('');
                setShowNewPostModal(false);
                showToast("Publicação criada com sucesso!");
            }
        } catch (error) {
            console.error("Error creating post:", error);
        }
    };

    // Handle submit comment
    const handleCreateComment = async (postId: string) => {
        if (!newCommentText.trim() || !token) return;
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/api/community/posts/${postId}/comments`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ content: newCommentText })
            });

            if (res.ok) {
                const createdComment = await res.json();
                setPosts(prev => prev.map(p => {
                    if (p.id === postId) {
                        return {
                            ...p,
                            commentsCount: p.commentsCount + 1,
                            comments: [...p.comments, createdComment]
                        };
                    }
                    return p;
                }));
                setNewCommentText('');
            }
        } catch (error) {
            console.error("Error adding comment:", error);
        }
    };

    // Handle create job
    const handleCreateJob = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newJobData.title || !newJobData.company || !newJobData.location || !newJobData.applyUrlOrEmail || !token) {
            alert("Preencha todos os campos obrigatórios");
            return;
        }

        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/api/community/jobs`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(newJobData)
            });

            if (res.ok) {
                const createdJob = await res.json();
                setJobs(prev => [createdJob, ...prev]);
                setShowNewJobModal(false);
                setNewJobData({
                    title: '',
                    company: '',
                    location: '',
                    type: 'FULL_TIME',
                    salary: '',
                    description: '',
                    requirements: '',
                    applyUrlOrEmail: ''
                });
                showToast("Oportunidade publicada com sucesso!");
            }
        } catch (error) {
            console.error("Error publishing job:", error);
        }
    };

    // Simulate AI Matchmaker
    const triggerMatchmaker = () => {
        setMatchingInProgress(true);
        setMatchedPartners([]);
        setTimeout(() => {
            setMatchingInProgress(false);
            setMatchedPartners([
                {
                    name: "Sara Pinto",
                    role: "Tech Co-Founder",
                    specialty: "Desenvolvimento Fullstack / Inteligência Artificial",
                    compatibility: "96%",
                    bio: "Desenvolvedora com 6 anos de experiência. Procuro parceiro focado em marketing e vendas para lançar um SaaS na área de EdTech.",
                    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150"
                },
                {
                    name: "Mateus Pedro",
                    role: "Growth Marketer",
                    specialty: "Tráfego Pago & Copywriting Comercial",
                    compatibility: "89%",
                    bio: "Especialista em funis de venda e captação de leads. Ajudei 3 e-commerces locais a faturar mais de 5 milhões de Kz. Procuro projetos inovadores.",
                    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150"
                }
            ]);
            showToast("Matchmaking concluído com sucesso!");
        }, 2000);
    };

    const getTierBadgeColor = (tier: string) => {
        switch (tier) {
            case 'ELITE': return 'from-amber-400 to-yellow-600 text-yellow-950';
            case 'PRO': return 'from-blue-500 to-indigo-700 text-white';
            default: return 'from-gray-600 to-gray-700 text-gray-200';
        }
    };

    const getJobTypeLabel = (type: string) => {
        const found = jobTypes.find(t => t.value === type);
        return found ? found.label : type;
    };

    const getInitials = (name: string) => {
        return name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
    };

    const formatDate = (dateStr: string) => {
        try {
            return new Date(dateStr).toLocaleDateString('pt-BR', {
                day: 'numeric',
                month: 'short',
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch {
            return dateStr;
        }
    };

    const filteredPosts = posts.filter(p => categoryFilter === 'ALL' || p.category === categoryFilter);
    const filteredJobs = jobs.filter(j => {
        const matchesSearch = j.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              j.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              j.location.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesType = jobTypeFilter === 'ALL' || j.type === jobTypeFilter;
        return matchesSearch && matchesType;
    });

    return (
        <div style={{ padding: '1.5rem', minHeight: 'calc(100vh - 100px)', color: 'var(--text-color)' }}>
            
            {/* Header section with glassmorphism */}
            <div style={{
                background: 'var(--card-bg)',
                border: '1px solid var(--card-border)',
                padding: '2rem',
                borderRadius: '16px',
                marginBottom: '2rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '1.5rem'
            }}>
                <div>
                    <h1 style={{ fontSize: '1.8rem', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--text-color)', marginBottom: '0.25rem' }}>
                        Comunidade Bisnoteka
                    </h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                        Conecte-se com fundadores, compartilhe estratégias e descubra novas oportunidades de colaboração.
                    </p>
                </div>
                
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                    {activeTab === 'discussions' && (
                        <button 
                            onClick={() => setShowNewPostModal(true)}
                            className="btn-primary"
                            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#0022ff', border: 'none', color: '#fff', padding: '0.75rem 1.25rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}
                        >
                            <Plus size={18} /> Nova Publicação
                        </button>
                    )}
                    {activeTab === 'jobs' && (
                        <button 
                            onClick={() => setShowNewJobModal(true)}
                            className="btn-primary"
                            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#0022ff', border: 'none', color: '#fff', padding: '0.75rem 1.25rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}
                        >
                            <Plus size={18} /> Publicar Vaga
                        </button>
                    )}
                </div>
            </div>

            {/* Custom Nav Tabs */}
            <div style={{ display: 'flex', borderBottom: '1px solid var(--card-border)', marginBottom: '2rem', overflowX: 'auto', gap: '1.5rem' }}>
                <button 
                    onClick={() => setActiveTab('discussions')}
                    style={{
                        background: 'transparent',
                        border: 'none',
                        color: activeTab === 'discussions' ? '#0022ff' : 'var(--text-muted)',
                        borderBottom: activeTab === 'discussions' ? '3px solid #0022ff' : '3px solid transparent',
                        padding: '0.75rem 0.5rem',
                        fontSize: '1rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        whiteSpace: 'nowrap'
                    }}
                >
                    <MessageSquare size={18} /> Discussões
                </button>
                <button 
                    onClick={() => setActiveTab('jobs')}
                    style={{
                        background: 'transparent',
                        border: 'none',
                        color: activeTab === 'jobs' ? '#0022ff' : 'var(--text-muted)',
                        borderBottom: activeTab === 'jobs' ? '3px solid #0022ff' : '3px solid transparent',
                        padding: '0.75rem 0.5rem',
                        fontSize: '1rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        whiteSpace: 'nowrap'
                    }}
                >
                    <Briefcase size={18} /> Oportunidades & Vagas
                </button>
                <button 
                    onClick={() => setActiveTab('members')}
                    style={{
                        background: 'transparent',
                        border: 'none',
                        color: activeTab === 'members' ? '#0022ff' : 'var(--text-muted)',
                        borderBottom: activeTab === 'members' ? '3px solid #0022ff' : '3px solid transparent',
                        padding: '0.75rem 0.5rem',
                        fontSize: '1rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        whiteSpace: 'nowrap'
                    }}
                >
                    <Users size={18} /> Encontrar Sócios (IA)
                </button>
                <button 
                    onClick={() => setActiveTab('live')}
                    style={{
                        background: 'transparent',
                        border: 'none',
                        color: activeTab === 'live' ? '#0022ff' : 'var(--text-muted)',
                        borderBottom: activeTab === 'live' ? '3px solid #0022ff' : '3px solid transparent',
                        padding: '0.75rem 0.5rem',
                        fontSize: '1rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        whiteSpace: 'nowrap'
                    }}
                >
                    <Radio size={18} /> Salas Live & Stages
                </button>
            </div>

            {/* MAIN TAB CONTENT */}
            <div>
                {/* 1. DISCUSSIONS TAB */}
                {activeTab === 'discussions' && (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '2rem' }} className="db-layout-grid">
                        
                        {/* Feed column */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                            {/* Filter bar */}
                            <div style={{ display: 'flex', overflowX: 'auto', gap: '0.5rem', paddingBottom: '0.5rem' }}>
                                {categories.map(cat => (
                                    <button
                                        key={cat.value}
                                        onClick={() => setCategoryFilter(cat.value)}
                                        style={{
                                            background: categoryFilter === cat.value ? 'rgba(0, 34, 255, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                                            border: `1px solid ${categoryFilter === cat.value ? '#0022ff' : 'rgba(255, 255, 255, 0.05)'}`,
                                            color: categoryFilter === cat.value ? '#6366f1' : '#94a3b8',
                                            padding: '0.5rem 1rem',
                                            borderRadius: '20px',
                                            cursor: 'pointer',
                                            fontSize: '0.85rem',
                                            fontWeight: 500,
                                            whiteSpace: 'nowrap'
                                        }}
                                    >
                                        {cat.label}
                                    </button>
                                ))}
                            </div>

                            {postsLoading ? (
                                <div style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8' }}>Carregando discussões...</div>
                            ) : filteredPosts.length === 0 ? (
                                <div style={{ textAlign: 'center', padding: '4rem', background: '#10171f', border: '1px solid rgba(255, 255, 255, 0.05)', borderRadius: '12px', color: '#94a3b8' }}>
                                    <MessageSquare size={32} style={{ marginBottom: '1rem', opacity: 0.5 }} />
                                    <p>Nenhuma publicação encontrada neste tópico.</p>
                                </div>
                            ) : (
                                filteredPosts.map(post => (
                                    <div key={post.id} style={{
                                        background: '#10171f',
                                        border: '1px solid rgba(255, 255, 255, 0.04)',
                                        borderRadius: '12px',
                                        padding: '1.5rem',
                                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)'
                                    }}>
                                        {/* Card Header */}
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                                                {post.user.avatarUrl ? (
                                                    <img src={post.user.avatarUrl} alt={post.user.name} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
                                                ) : (
                                                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #0022ff 0%, #4f46e5 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '0.85rem', color: '#fff' }}>
                                                        {getInitials(post.user.name)}
                                                    </div>
                                                )}
                                                <div>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                        <span style={{ fontWeight: 600, color: '#f1f5f9' }}>{post.user.name}</span>
                                                        <span style={{
                                                            fontSize: '10px',
                                                            fontWeight: 800,
                                                            padding: '0.1rem 0.4rem',
                                                            borderRadius: '4px',
                                                            background: `linear-gradient(135deg, ${post.user.subscriptionTier === 'ELITE' ? '#f59e0b' : '#3b82f6'}, #1d4ed8)`
                                                        }}>
                                                            {post.user.subscriptionTier}
                                                        </span>
                                                    </div>
                                                    <span style={{ fontSize: '0.75rem', color: '#64748b' }}>{formatDate(post.createdAt)}</span>
                                                </div>
                                            </div>
                                            
                                            <span style={{
                                                background: 'rgba(255,255,255,0.03)',
                                                border: '1px solid rgba(255,255,255,0.05)',
                                                color: '#818cf8',
                                                padding: '0.2rem 0.6rem',
                                                borderRadius: '4px',
                                                fontSize: '0.75rem',
                                                fontWeight: 600
                                            }}>{post.category}</span>
                                        </div>

                                        {/* Card Body */}
                                        <p style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6', color: '#cbd5e1', marginBottom: '1.25rem' }}>{post.content}</p>

                                        {/* Actions */}
                                        <div style={{ display: 'flex', borderTop: '1px solid rgba(255,255,255,0.03)', paddingTops: '0.75rem', gap: '1.5rem' }}>
                                            <button 
                                                onClick={() => handleLike(post.id)}
                                                style={{ background: 'transparent', border: 'none', color: post.likedByUser ? '#ef4444' : '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer', fontWeight: 500 }}
                                            >
                                                <Heart size={18} fill={post.likedByUser ? "#ef4444" : "none"} />
                                                <span>{post.likesCount}</span>
                                            </button>
                                            <button 
                                                onClick={() => setExpandedCommentsPostId(expandedCommentsPostId === post.id ? null : post.id)}
                                                style={{ background: 'transparent', border: 'none', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer', fontWeight: 500 }}
                                            >
                                                <MessageSquare size={18} />
                                                <span>{post.commentsCount}</span>
                                            </button>
                                        </div>

                                        {/* Expanded Comments Section */}
                                        {expandedCommentsPostId === post.id && (
                                            <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                                                {/* Comments List */}
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1rem' }}>
                                                    {post.comments && post.comments.map(comment => (
                                                        <div key={comment.id} style={{ display: 'flex', gap: '0.5rem', background: 'rgba(255,255,255,0.01)', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.02)' }}>
                                                            {comment.user.avatarUrl ? (
                                                                <img src={comment.user.avatarUrl} alt={comment.user.name} style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }} />
                                                            ) : (
                                                                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '0.7rem', color: '#fff' }}>
                                                                    {getInitials(comment.user.name)}
                                                                </div>
                                                            )}
                                                            <div style={{ flex: 1 }}>
                                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.15rem' }}>
                                                                    <span style={{ fontWeight: 600, fontSize: '0.85rem', color: '#f1f5f9' }}>{comment.user.name}</span>
                                                                    <span style={{ fontSize: '0.7rem', color: '#64748b' }}>{formatDate(comment.createdAt)}</span>
                                                                </div>
                                                                <p style={{ fontSize: '0.85rem', color: '#cbd5e1', lineHeight: '1.4' }}>{comment.content}</p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>

                                                {/* Add Comment Input */}
                                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                    <input 
                                                        type="text" 
                                                        value={newCommentText} 
                                                        onChange={(e) => setNewCommentText(e.target.value)}
                                                        placeholder="Escreva um comentário..."
                                                        style={{ flex: 1, background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '6px', padding: '0.5rem 0.75rem', color: '#fff', fontSize: '0.85rem' }}
                                                    />
                                                    <button 
                                                        onClick={() => handleCreateComment(post.id)}
                                                        style={{ background: '#0022ff', border: 'none', borderRadius: '6px', padding: '0.5rem', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                                    >
                                                        <Send size={16} />
                                                    </button>
                                                </div>
                                            </div>
                                        )}

                                    </div>
                                ))
                            )}
                        </div>

                        {/* Sidebar info widgets */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }} className="hide-tablet">
                            {/* Stats box */}
                            <div style={{ background: '#10171f', border: '1px solid rgba(255, 255, 255, 0.04)', padding: '1.5rem', borderRadius: '12px' }}>
                                <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem', color: '#fff' }}>Métricas do Dia</h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Membros Online</span>
                                        <span style={{ color: '#10b981', fontWeight: 'bold', fontSize: '0.85rem' }}>142 ativos</span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Publicações hoje</span>
                                        <span style={{ color: '#f1f5f9', fontWeight: 'bold', fontSize: '0.85rem' }}>38 posts</span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Salas de Estudo</span>
                                        <span style={{ color: '#3b82f6', fontWeight: 'bold', fontSize: '0.85rem' }}>2 ativas</span>
                                    </div>
                                </div>
                            </div>

                            {/* Rules widget */}
                            <div style={{ background: '#10171f', border: '1px solid rgba(255, 255, 255, 0.04)', padding: '1.5rem', borderRadius: '12px' }}>
                                <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.75rem', color: '#fff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Award size={18} color="#f59e0b" /> Boas Práticas
                                </h3>
                                <ul style={{ paddingLeft: '1.2rem', margin: 0, color: '#94a3b8', fontSize: '0.8rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', lineHeight: '1.4' }}>
                                    <li>Partilhe conhecimentos acionáveis e insights reais.</li>
                                    <li>Respeite os restantes fundadores e mentores.</li>
                                    <li>Evite publicidade excessiva sem valor agregado.</li>
                                    <li>Use as tags apropriadas para organizar as discussões.</li>
                                </ul>
                            </div>
                        </div>

                    </div>
                )}

                {/* 2. JOBS TAB */}
                {activeTab === 'jobs' && (
                    <div>
                        {/* Search and Filter */}
                        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
                            <div style={{ flex: 1, minWidth: '260px', position: 'relative' }}>
                                <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
                                <input 
                                    type="text" 
                                    placeholder="Pesquise por cargo, empresa ou localização..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    style={{ width: '100%', background: '#10171f', border: '1px solid rgba(255, 255, 255, 0.05)', borderRadius: '8px', padding: '0.75rem 1rem 0.75rem 2.5rem', color: '#fff', outline: 'none' }}
                                />
                            </div>
                            
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <button
                                    onClick={() => setJobTypeFilter('ALL')}
                                    style={{
                                        background: jobTypeFilter === 'ALL' ? 'rgba(0, 34, 255, 0.15)' : '#10171f',
                                        border: '1px solid rgba(255, 255, 255, 0.05)',
                                        color: jobTypeFilter === 'ALL' ? '#6366f1' : '#cbd5e1',
                                        padding: '0.75rem 1.25rem',
                                        borderRadius: '8px',
                                        cursor: 'pointer',
                                        fontWeight: 500,
                                        fontSize: '0.9rem'
                                    }}
                                >
                                    Todos
                                </button>
                                {jobTypes.map(t => (
                                    <button
                                        key={t.value}
                                        onClick={() => setJobTypeFilter(t.value)}
                                        style={{
                                            background: jobTypeFilter === t.value ? 'rgba(0, 34, 255, 0.15)' : '#10171f',
                                            border: '1px solid rgba(255, 255, 255, 0.05)',
                                            color: jobTypeFilter === t.value ? '#6366f1' : '#cbd5e1',
                                            padding: '0.75rem 1.25rem',
                                            borderRadius: '8px',
                                            cursor: 'pointer',
                                            fontWeight: 500,
                                            fontSize: '0.9rem'
                                        }}
                                    >
                                        {t.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Jobs List */}
                        {jobsLoading ? (
                            <div style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8' }}>Carregando quadro de vagas...</div>
                        ) : filteredJobs.length === 0 ? (
                            <div style={{ textAlign: 'center', padding: '4rem', background: '#10171f', border: '1px solid rgba(255, 255, 255, 0.05)', borderRadius: '12px', color: '#94a3b8' }}>
                                <Briefcase size={32} style={{ marginBottom: '1rem', opacity: 0.5 }} />
                                <p>Nenhuma oportunidade de emprego encontrada.</p>
                            </div>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {filteredJobs.map(job => (
                                    <div key={job.id} style={{
                                        background: '#10171f',
                                        border: '1px solid rgba(255, 255, 255, 0.04)',
                                        borderRadius: '12px',
                                        padding: '1.5rem',
                                        display: 'grid',
                                        gridTemplateColumns: '1fr auto',
                                        alignItems: 'center',
                                        gap: '1.5rem',
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                                    }}>
                                        <div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                                                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#f8fafc' }}>{job.title}</h3>
                                                <span style={{
                                                    background: 'rgba(59, 130, 246, 0.1)',
                                                    border: '1px solid rgba(59, 130, 246, 0.2)',
                                                    color: '#60a5fa',
                                                    padding: '0.15rem 0.5rem',
                                                    borderRadius: '4px',
                                                    fontSize: '0.75rem',
                                                    fontWeight: 600
                                                }}>{getJobTypeLabel(job.type)}</span>
                                            </div>

                                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', color: '#94a3b8', fontSize: '0.85rem', marginBottom: '1rem' }}>
                                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontWeight: 600, color: '#e2e8f0' }}>{job.company}</span>
                                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><MapPin size={14} />{job.location}</span>
                                                {job.salary && <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><DollarSign size={14} />{job.salary}</span>}
                                            </div>

                                            <p style={{ color: '#cbd5e1', fontSize: '0.9rem', lineHeight: '1.5', marginBottom: '1rem', display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                                {job.description}
                                            </p>

                                            {job.requirements && (
                                                <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                                                    <strong>Requisitos:</strong> {job.requirements}
                                                </div>
                                            )}
                                        </div>

                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
                                            <a 
                                                href={job.applyUrlOrEmail.includes('@') ? `mailto:${job.applyUrlOrEmail}` : job.applyUrlOrEmail}
                                                target="_blank" 
                                                rel="noreferrer"
                                                style={{
                                                    background: '#0022ff',
                                                    color: '#fff',
                                                    padding: '0.6rem 1.25rem',
                                                    borderRadius: '6px',
                                                    fontWeight: 600,
                                                    fontSize: '0.85rem',
                                                    textDecoration: 'none',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '0.25rem'
                                                }}
                                            >
                                                Candidatar-se <ChevronRight size={16} />
                                            </a>
                                            <span style={{ fontSize: '0.7rem', color: '#64748b' }}>Publicado por {job.user.name}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* 3. MEMBERS / MATCHMAKING TAB */}
                {activeTab === 'members' && (
                    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                        {/* Premium AI Banner */}
                        <div style={{
                            background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.15) 0%, rgba(99, 102, 241, 0.05) 100%)',
                            border: '1px solid rgba(99, 102, 241, 0.2)',
                            borderRadius: '16px',
                            padding: '2rem',
                            textAlign: 'center',
                            marginBottom: '2.5rem',
                            position: 'relative',
                            overflow: 'hidden'
                        }}>
                            <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '100px', height: '100px', background: 'radial-gradient(circle, rgba(99,102,241,0.2) 0%, transparent 70%)' }} />
                            
                            <Sparkles size={32} color="#818cf8" style={{ margin: '0 auto 1rem', display: 'block' }} />
                            
                            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#f8fafc', marginBottom: '0.5rem' }}>
                                IA Co-Founder Matchmaker
                            </h2>
                            <p style={{ color: '#cbd5e1', fontSize: '0.9rem', maxWidth: '600px', margin: '0 auto 1.5rem', lineHeight: '1.5' }}>
                                Use a nossa inteligência artificial para cruzar os dados dos seus projetos, competências e objetivos estratégicos com outros fundadores e encontrar parceiros de negócios compatíveis.
                            </p>

                            <button
                                onClick={triggerMatchmaker}
                                disabled={matchingInProgress}
                                style={{
                                    background: 'linear-gradient(90deg, #0022ff, #4f46e5)',
                                    border: 'none',
                                    color: '#fff',
                                    padding: '0.75rem 1.75rem',
                                    borderRadius: '8px',
                                    fontWeight: 700,
                                    fontSize: '0.95rem',
                                    cursor: 'pointer',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    boxShadow: '0 4px 15px rgba(99, 102, 241, 0.3)'
                                }}
                            >
                                {matchingInProgress ? 'Analisando perfis...' : 'Encontrar Sócios Compatíveis'}
                            </button>
                        </div>

                        {/* Matchmaking Results */}
                        <AnimatePresence>
                            {matchedPartners.length > 0 && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
                                >
                                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f1f5f9', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <Sparkles size={18} color="#f59e0b" /> Parceiros Recomendados
                                    </h3>
                                    
                                    {matchedPartners.map((partner, index) => (
                                        <div key={index} style={{
                                            background: '#10171f',
                                            border: '1px solid rgba(99, 102, 241, 0.15)',
                                            borderRadius: '12px',
                                            padding: '1.5rem',
                                            display: 'grid',
                                            gridTemplateColumns: 'auto 1fr auto',
                                            alignItems: 'center',
                                            gap: '1.5rem'
                                        }} className="db-layout-grid">
                                            <img src={partner.avatar} alt={partner.name} style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #6366f1' }} />
                                            
                                            <div>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.25rem' }}>
                                                    <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff' }}>{partner.name}</h4>
                                                    <span style={{ fontSize: '0.75rem', color: '#6366f1', fontWeight: 600 }}>{partner.role}</span>
                                                </div>
                                                <div style={{ fontSize: '0.8rem', color: '#f59e0b', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                                                    Especialidade: {partner.specialty}
                                                </div>
                                                <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: '1.4' }}>{partner.bio}</p>
                                            </div>

                                            <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.75rem' }}>
                                                <div>
                                                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Compatibilidade</div>
                                                    <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#10b981' }}>{partner.compatibility}</div>
                                                </div>
                                                <button
                                                    onClick={() => showToast(`Solicitação de conexão enviada para ${partner.name}!`)}
                                                    style={{
                                                        background: 'rgba(255,255,255,0.03)',
                                                        border: '1px solid rgba(255,255,255,0.08)',
                                                        color: '#f8fafc',
                                                        padding: '0.5rem 1rem',
                                                        borderRadius: '6px',
                                                        fontSize: '0.8rem',
                                                        fontWeight: 600,
                                                        cursor: 'pointer',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '0.25rem'
                                                    }}
                                                >
                                                    <UserPlus size={14} /> Ligar
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                )}

                {/* 4. LIVE & EVENTS TAB */}
                {activeTab === 'live' && (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '2rem' }} className="db-layout-grid">
                        
                        {/* Left column: Study rooms */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#f1f5f9' }}>Salas de Estúdio Ao Vivo</h3>
                            
                            <div style={{
                                background: '#10171f',
                                border: '1px solid rgba(255, 255, 255, 0.04)',
                                borderRadius: '12px',
                                padding: '1.5rem',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}>
                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                    <div style={{
                                        width: '48px',
                                        height: '48px',
                                        borderRadius: '12px',
                                        background: 'rgba(16, 185, 129, 0.1)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: '#10b981'
                                    }}>
                                        <Volume2 size={24} />
                                    </div>
                                    <div>
                                        <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff' }}>Sessão Co-Working Silencioso (Bisnoteka)</h4>
                                        <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Estude e construa em conjunto. Microfones desativados.</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setInsideAudioRoom(insideAudioRoom === 'cowork' ? null : 'cowork')}
                                    style={{
                                        background: insideAudioRoom === 'cowork' ? '#ef4444' : '#10b981',
                                        border: 'none',
                                        color: '#fff',
                                        padding: '0.6rem 1.25rem',
                                        borderRadius: '8px',
                                        fontWeight: 600,
                                        cursor: 'pointer'
                                    }}
                                >
                                    {insideAudioRoom === 'cowork' ? 'Sair da Sala' : 'Entrar na Sala'}
                                </button>
                            </div>

                            <div style={{
                                background: '#10171f',
                                border: '1px solid rgba(255, 255, 255, 0.04)',
                                borderRadius: '12px',
                                padding: '1.5rem',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}>
                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                    <div style={{
                                        width: '48px',
                                        height: '48px',
                                        borderRadius: '12px',
                                        background: 'rgba(59, 130, 246, 0.1)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: '#3b82f6'
                                    }}>
                                        <Volume2 size={24} />
                                    </div>
                                    <div>
                                        <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff' }}>Feedback de Pitch Decks & Ideias</h4>
                                        <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Partilhe o seu ecossistema gerado por IA para revisão.</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setInsideAudioRoom(insideAudioRoom === 'pitch' ? null : 'pitch')}
                                    style={{
                                        background: insideAudioRoom === 'pitch' ? '#ef4444' : '#3b82f6',
                                        border: 'none',
                                        color: '#fff',
                                        padding: '0.6rem 1.25rem',
                                        borderRadius: '8px',
                                        fontWeight: 600,
                                        cursor: 'pointer'
                                    }}
                                >
                                    {insideAudioRoom === 'pitch' ? 'Sair da Sala' : 'Entrar na Sala'}
                                </button>
                            </div>

                            {insideAudioRoom && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    style={{
                                        background: 'linear-gradient(135deg, #090d16 0%, #10171f 100%)',
                                        border: '1px solid #0022ff',
                                        borderRadius: '12px',
                                        padding: '1.5rem',
                                        textAlign: 'center'
                                    }}
                                >
                                    <div style={{ display: 'inline-flex', padding: '0.25rem 0.75rem', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', color: '#ef4444', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 800, marginBottom: '1rem', alignItems: 'center', gap: '0.25rem' }}>
                                        <span style={{ width: '6px', height: '6px', background: '#ef4444', borderRadius: '50%', display: 'inline-block' }} /> EM DIRECTO
                                    </div>
                                    <h4 style={{ color: '#fff', fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' }}>Está conectado ao canal de voz</h4>
                                    <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '1.5rem' }}>Desfrute da co-criação! Ligue e desligue auscultadores se necessário.</p>
                                    <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                                        <div style={{ textAlign: 'center' }}>
                                            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#0022ff', margin: '0 auto 0.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                                                {user ? getInitials(user.name) : 'ME'}
                                            </div>
                                            <span style={{ fontSize: '0.75rem', color: '#cbd5e1' }}>Tu</span>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                        </div>

                        {/* Right column: Events */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#f1f5f9' }}>Próximas Masterclasses</h3>
                            
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <div style={{ background: '#10171f', border: '1px solid rgba(255,255,255,0.03)', padding: '1.25rem', borderRadius: '12px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#f59e0b', fontSize: '0.75rem', fontWeight: 'bold' }}><Calendar size={14} /> 15 Junho</span>
                                        <span style={{ color: '#64748b', fontSize: '0.75rem' }}>19:00 (GMT+1)</span>
                                    </div>
                                    <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fff', marginBottom: '0.25rem' }}>Lançando Projetos de IA em Angola</h4>
                                    <p style={{ color: '#94a3b8', fontSize: '0.8rem', marginBottom: '1rem' }}>Orador convidado de EdTech e inteligência operacional.</p>
                                    <button 
                                        onClick={() => showToast("RSVP confirmado para a Masterclass!")}
                                        style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', color: '#fff', padding: '0.5rem', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}
                                    >
                                        Reservar Lugar
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                )}
            </div>

            {/* NEW POST MODAL */}
            {showNewPostModal && (
                <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0, 0, 0, 0.7)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
                    <div style={{ background: '#10171f', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '16px', maxWidth: '600px', width: '100%', padding: '2rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff' }}>Criar Publicação</h2>
                            <button onClick={() => setShowNewPostModal(false)} style={{ background: 'transparent', border: 'none', color: '#94a3b8', fontSize: '1.5rem', cursor: 'pointer' }}>&times;</button>
                        </div>

                        <form onSubmit={handleCreatePost} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.5rem', fontWeight: 600 }}>Tópico / Categoria</label>
                                <select 
                                    value={newPostCategory} 
                                    onChange={(e) => setNewPostCategory(e.target.value)}
                                    style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255, 255, 255, 0.08)', padding: '0.75rem', borderRadius: '8px', color: '#fff' }}
                                >
                                    <option value="GERAL">Geral</option>
                                    <option value="IDEIAS">Ideias de Negócio</option>
                                    <option value="MARKETING">Marketing & Vendas</option>
                                    <option value="ESTRATEGIA">Estratégia</option>
                                </select>
                            </div>

                            <div>
                                <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.5rem', fontWeight: 600 }}>O que está a pensar construir hoje?</label>
                                <textarea 
                                    rows={5}
                                    value={newPostContent}
                                    onChange={(e) => setNewPostContent(e.target.value)}
                                    placeholder="Partilhe a sua jornada, insights ou peça feedback ao ecossistema..."
                                    style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255, 255, 255, 0.08)', padding: '0.75rem', borderRadius: '8px', color: '#fff', resize: 'vertical', fontFamily: 'inherit' }}
                                    required
                                />
                            </div>

                            <button 
                                type="submit"
                                style={{ background: '#0022ff', border: 'none', color: '#fff', padding: '0.75rem 1.5rem', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}
                            >
                                Publicar
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* NEW JOB OPPORTUNITY MODAL */}
            {showNewJobModal && (
                <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0, 0, 0, 0.7)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', overflowY: 'auto' }}>
                    <div style={{ background: '#10171f', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '16px', maxWidth: '600px', width: '100%', padding: '2rem', margin: 'auto' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff' }}>Publicar Oportunidade / Vaga</h2>
                            <button onClick={() => setShowNewJobModal(false)} style={{ background: 'transparent', border: 'none', color: '#94a3b8', fontSize: '1.5rem', cursor: 'pointer' }}>&times;</button>
                        </div>

                        <form onSubmit={handleCreateJob} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="db-layout-grid">
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.25rem', fontWeight: 600 }}>Cargo / Função *</label>
                                    <input 
                                        type="text" 
                                        value={newJobData.title}
                                        onChange={(e) => setNewJobData({...newJobData, title: e.target.value})}
                                        placeholder="Ex: Designer UX/UI"
                                        style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255, 255, 255, 0.08)', padding: '0.6rem', borderRadius: '8px', color: '#fff' }}
                                        required
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.25rem', fontWeight: 600 }}>Empresa / Organização *</label>
                                    <input 
                                        type="text" 
                                        value={newJobData.company}
                                        onChange={(e) => setNewJobData({...newJobData, company: e.target.value})}
                                        placeholder="Ex: Bisnoteka Lda"
                                        style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255, 255, 255, 0.08)', padding: '0.6rem', borderRadius: '8px', color: '#fff' }}
                                        required
                                    />
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="db-layout-grid">
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.25rem', fontWeight: 600 }}>Localização *</label>
                                    <input 
                                        type="text" 
                                        value={newJobData.location}
                                        onChange={(e) => setNewJobData({...newJobData, location: e.target.value})}
                                        placeholder="Ex: Luanda, AO ou Remoto"
                                        style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255, 255, 255, 0.08)', padding: '0.6rem', borderRadius: '8px', color: '#fff' }}
                                        required
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.25rem', fontWeight: 600 }}>Tipo de Vaga *</label>
                                    <select 
                                        value={newJobData.type}
                                        onChange={(e) => setNewJobData({...newJobData, type: e.target.value})}
                                        style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255, 255, 255, 0.08)', padding: '0.6rem', borderRadius: '8px', color: '#fff' }}
                                    >
                                        <option value="FULL_TIME">Tempo Inteiro</option>
                                        <option value="PART_TIME">Part-Time</option>
                                        <option value="REMOTE">Remoto</option>
                                        <option value="FREELANCE">Freelance</option>
                                    </select>
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="db-layout-grid">
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.25rem', fontWeight: 600 }}>Salário / Compensação (Opcional)</label>
                                    <input 
                                        type="text" 
                                        value={newJobData.salary}
                                        onChange={(e) => setNewJobData({...newJobData, salary: e.target.value})}
                                        placeholder="Ex: 350.000 Kz/mês"
                                        style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255, 255, 255, 0.08)', padding: '0.6rem', borderRadius: '8px', color: '#fff' }}
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.25rem', fontWeight: 600 }}>Link ou Email para Candidatura *</label>
                                    <input 
                                        type="text" 
                                        value={newJobData.applyUrlOrEmail}
                                        onChange={(e) => setNewJobData({...newJobData, applyUrlOrEmail: e.target.value})}
                                        placeholder="Ex: recrutamento@empresa.com ou URL"
                                        style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255, 255, 255, 0.08)', padding: '0.6rem', borderRadius: '8px', color: '#fff' }}
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.25rem', fontWeight: 600 }}>Descrição da Função *</label>
                                <textarea 
                                    rows={4}
                                    value={newJobData.description}
                                    onChange={(e) => setNewJobData({...newJobData, description: e.target.value})}
                                    placeholder="Descreva as principais tarefas e atribuições desta vaga..."
                                    style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255, 255, 255, 0.08)', padding: '0.6rem', borderRadius: '8px', color: '#fff', resize: 'vertical', fontFamily: 'inherit' }}
                                    required
                                />
                            </div>

                            <div>
                                <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.25rem', fontWeight: 600 }}>Requisitos Mínimos (Opcional)</label>
                                <input 
                                    type="text" 
                                    value={newJobData.requirements}
                                    onChange={(e) => setNewJobData({...newJobData, requirements: e.target.value})}
                                    placeholder="Ex: 2 anos de exp, inglês intermédio"
                                    style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255, 255, 255, 0.08)', padding: '0.6rem', borderRadius: '8px', color: '#fff' }}
                                />
                            </div>

                            <button 
                                type="submit"
                                style={{ background: '#0022ff', border: 'none', color: '#fff', padding: '0.75rem 1.5rem', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', marginTop: '0.5rem' }}
                            >
                                Publicar Vaga
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* TOAST SYSTEM */}
            {toastMessage && (
                <div style={{
                    position: 'fixed',
                    bottom: '2rem',
                    right: '2rem',
                    background: '#10b981',
                    color: '#fff',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    fontWeight: 600,
                    zIndex: 200
                }}>
                    {toastMessage}
                </div>
            )}

        </div>
    );
};

export default CommunityPage;
