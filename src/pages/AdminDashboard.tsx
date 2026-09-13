import React, { useState, useEffect } from 'react';
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
    Newspaper, Trophy, ShoppingCart, Hammer, Rocket, Brain, PlaySquare, BookText,
    Download, FileText, CheckSquare, Zap, Edit, Trash2, FileUp, Check
} from 'lucide-react';
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

    // Books State
    const [books, setBooks] = useState<any[]>([]);
    const [loadingBooks, setLoadingBooks] = useState(true);
    const [selectedBook, setSelectedBook] = useState<any | null>(null);
    const [showEditBookModal, setShowEditBookModal] = useState(false);
    const [showDeleteBookModal, setShowDeleteBookModal] = useState(false);
    const [bookForm, setBookForm] = useState({
        title: '',
        author: '',
        category: 'Desenvolvimento Pessoal',
        coverImage: '',
        description: '',
        price: '12500',
        format: 'PHYSICAL',
        fileUrl: '',
        stock: '10'
    });

    // Resources & Files Management State
    const [resources, setResources] = useState<any[]>([]);
    const [loadingResources, setLoadingResources] = useState(true);
    const [selectedResourceKind, setSelectedResourceKind] = useState('Todos');
    const [showResourceModal, setShowResourceModal] = useState(false);
    const [showEditResourceModal, setShowEditResourceModal] = useState(false);
    const [showDeleteResourceModal, setShowDeleteResourceModal] = useState(false);
    const [selectedResource, setSelectedResource] = useState<any | null>(null);
    const [uploadingFile, setUploadingFile] = useState(false);

    const [resourceForm, setResourceForm] = useState({
        title: '',
        category: 'Apresentação & Pitch',
        resourceKind: 'FILE', // FILE, DICTIONARY, CHECKLIST, TOOL
        extension: 'PDF', // PDF, CSV, DOCX, ZIP, TXT
        description: '',
        content: '',
        fileUrl: '',
        size: '2.5 MB',
        accessType: 'Freemium', // Freemium, Premium
        coverImage: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=600',
        icon: '📄',
        externalUrl: '',
        termExample: '',
        checklistItems: ''
    });

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

    const fetchBooks = async () => {
        setLoadingBooks(true);
        try {
            const res = await fetch(`${API_URL}/api/products`);
            if (res.ok) {
                const data = await res.json();
                setBooks(data);
            }
        } catch (err) {
            console.error("Erro ao buscar livros:", err);
        } finally {
            setLoadingBooks(false);
        }
    };

    const fetchResources = async () => {
        setLoadingResources(true);
        try {
            const res = await fetch(`${API_URL}/api/resources`);
            if (res.ok) {
                const data = await res.json();
                setResources(data);
            }
        } catch (err) {
            console.error("Erro ao buscar recursos:", err);
        } finally {
            setLoadingResources(false);
        }
    };

    useEffect(() => {
        fetchBooks();
        fetchResources();
    }, []);

    // File Upload Handler (Converts file to server storage)
    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploadingFile(true);
        try {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = async () => {
                const base64 = reader.result as string;
                const res = await fetch(`${API_URL}/api/resources/upload`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        fileName: file.name,
                        fileData: base64
                    })
                });

                if (res.ok) {
                    const data = await res.json();
                    const ext = data.extension || file.name.split('.').pop()?.toUpperCase() || 'PDF';
                    setResourceForm(prev => ({
                        ...prev,
                        fileUrl: data.fileUrl,
                        extension: ext,
                        size: data.size || `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
                        title: prev.title || file.name.replace(/\.[^/.]+$/, "")
                    }));
                    alert("Ficheiro carregado com sucesso!");
                } else {
                    alert("Erro ao fazer upload do ficheiro.");
                }
                setUploadingFile(false);
            };
        } catch (err) {
            console.error("Erro no upload:", err);
            setUploadingFile(false);
        }
    };

    const handleCreateResource = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch(`${API_URL}/api/resources`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(resourceForm)
            });

            if (res.ok) {
                setShowResourceModal(false);
                setResourceForm({
                    title: '',
                    category: 'Apresentação & Pitch',
                    resourceKind: 'FILE',
                    extension: 'PDF',
                    description: '',
                    content: '',
                    fileUrl: '',
                    size: '2.5 MB',
                    accessType: 'Freemium',
                    coverImage: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=600',
                    icon: '📄',
                    externalUrl: '',
                    termExample: '',
                    checklistItems: ''
                });
                fetchResources();
                alert("Recurso / Ficheiro criado com sucesso!");
            } else {
                alert("Erro ao criar recurso.");
            }
        } catch (err) {
            console.error("Erro:", err);
        }
    };

    const handleEditResourceClick = (resource: any) => {
        setSelectedResource(resource);
        setResourceForm({
            title: resource.title || '',
            category: resource.category || 'Apresentação & Pitch',
            resourceKind: resource.resourceKind || 'FILE',
            extension: resource.extension || 'PDF',
            description: resource.description || '',
            content: resource.content || '',
            fileUrl: resource.fileUrl || '',
            size: resource.size || '2.5 MB',
            accessType: resource.accessType || 'Freemium',
            coverImage: resource.coverImage || 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=600',
            icon: resource.icon || '📄',
            externalUrl: resource.externalUrl || '',
            termExample: resource.termExample || '',
            checklistItems: resource.checklistItems || ''
        });
        setShowEditResourceModal(true);
    };

    const handleUpdateResource = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedResource) return;
        try {
            const res = await fetch(`${API_URL}/api/resources/${selectedResource.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(resourceForm)
            });
            if (res.ok) {
                setShowEditResourceModal(false);
                setSelectedResource(null);
                fetchResources();
                alert("Recurso atualizado com sucesso!");
            } else {
                alert("Erro ao atualizar recurso.");
            }
        } catch (err) {
            console.error("Erro:", err);
        }
    };

    const handleDeleteResource = async () => {
        if (!selectedResource) return;
        try {
            const res = await fetch(`${API_URL}/api/resources/${selectedResource.id}`, {
                method: 'DELETE'
            });
            if (res.ok) {
                setShowDeleteResourceModal(false);
                setSelectedResource(null);
                fetchResources();
                alert("Recurso eliminado com sucesso!");
            } else {
                alert("Erro ao eliminar recurso.");
            }
        } catch (err) {
            console.error("Erro:", err);
        }
    };

    const handleEditClick = (book: any) => {
        setSelectedBook(book);
        setBookForm({
            title: book.title || '',
            author: book.author || '',
            category: book.category || 'Desenvolvimento Pessoal',
            coverImage: book.coverImage || '',
            description: book.description || '',
            price: book.price ? book.price.toString() : '0',
            format: book.format || 'PHYSICAL',
            fileUrl: book.fileUrl || '',
            stock: book.stock ? book.stock.toString() : '0'
        });
        setShowEditBookModal(true);
    };

    const handleDeleteClick = (book: any) => {
        setSelectedBook(book);
        setShowDeleteBookModal(true);
    };

    const handleCreateBook = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch(`${API_URL}/api/products`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: bookForm.title,
                    author: bookForm.author,
                    category: bookForm.category,
                    coverImage: bookForm.coverImage,
                    description: bookForm.description,
                    price: parseFloat(bookForm.price) || 0,
                    format: bookForm.format,
                    fileUrl: bookForm.fileUrl || null,
                    stock: bookForm.format === 'PHYSICAL' ? parseInt(bookForm.stock) || 0 : null
                })
            });
            if (res.ok) {
                setShowBookModal(false);
                setBookForm({
                    title: '',
                    author: '',
                    category: 'Desenvolvimento Pessoal',
                    coverImage: '',
                    description: '',
                    price: '12500',
                    format: 'PHYSICAL',
                    fileUrl: '',
                    stock: '10'
                });
                fetchBooks();
            } else {
                alert("Erro ao criar livro.");
            }
        } catch (err) {
            console.error("Erro:", err);
        }
    };

    const handleUpdateBook = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedBook) return;
        try {
            const res = await fetch(`${API_URL}/api/products/${selectedBook.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: bookForm.title,
                    author: bookForm.author,
                    category: bookForm.category,
                    coverImage: bookForm.coverImage,
                    description: bookForm.description,
                    price: parseFloat(bookForm.price) || 0,
                    format: bookForm.format,
                    fileUrl: bookForm.fileUrl || null,
                    stock: bookForm.format === 'PHYSICAL' ? parseInt(bookForm.stock) || 0 : null
                })
            });
            if (res.ok) {
                setShowEditBookModal(false);
                setSelectedBook(null);
                fetchBooks();
            } else {
                alert("Erro ao atualizar livro.");
            }
        } catch (err) {
            console.error("Erro:", err);
        }
    };

    const handleDeleteBook = async () => {
        if (!selectedBook) return;
        try {
            const res = await fetch(`${API_URL}/api/products/${selectedBook.id}`, {
                method: 'DELETE'
            });
            if (res.ok) {
                setShowDeleteBookModal(false);
                setSelectedBook(null);
                fetchBooks();
            } else {
                alert("Erro ao excluir livro.");
            }
        } catch (err) {
            console.error("Erro:", err);
        }
    };

    const isSidebarCollapsed = false;

    // Standardized styles with 12px border radius
    const modalBaseStyle = { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15,23,42,0.8)', backdropFilter: 'blur(10px)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' } as const;
    const modalContainerStyle = { backgroundColor: '#fff', borderRadius: '12px', width: '100%', maxWidth: '650px', maxHeight: '90vh', overflowY: 'auto' } as const;
    const modalHeaderStyle = { padding: '25px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' } as const;
    const modalBodyStyle = { padding: '25px', display: 'flex', flexDirection: 'column', gap: '20px' } as const;
    const inputGroupStyle = { display: 'flex', flexDirection: 'column', gap: '8px' } as const;
    const labelStyle = { fontSize: '12px', fontWeight: 900, color: '#64748b' } as const;
    const inputStyle = { backgroundColor: '#f8fafc', border: '1px solid #cbd5e1', padding: '14px', borderRadius: '12px', color: '#0f172a', fontSize: '14px', outline: 'none' } as const;
    const submitButtonStyle = { backgroundColor: '#10171f', color: '#fff', border: 'none', padding: '16px', borderRadius: '12px', fontWeight: 900, fontSize: '15px', cursor: 'pointer', transition: 'all 0.25s' } as const;

    const stats = [
        { label: 'Vendas Totais', value: '124,500 KZ', change: '+12.5%', icon: <TrendingUp size={20} />, color: '#0011fd' },
        { label: 'Novos Alunos', value: '1,240', change: '+5.2%', icon: <Users size={20} />, color: '#0011fd' },
        { label: 'Ficheiros & Recursos', value: `${resources.length}`, change: '+18%', icon: <Download size={20} />, color: '#00c853' },
        { label: 'Taxa de Retenção', value: '88%', change: '+2.4%', icon: <Flame size={20} />, color: '#f83821' },
    ];

    const sidebarItems = [
        { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
        { id: 'resources', label: 'Recursos & Ficheiros', icon: <Download size={20} /> },
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

    const filteredResourcesList = selectedResourceKind === 'Todos' 
        ? resources 
        : resources.filter(r => r.resourceKind === selectedResourceKind);

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
                    <div style={{ width: '35px', height: '35px', backgroundColor: '#10171f', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Folder fill="#fff" size={20} />
                    </div>
                    {!isSidebarCollapsed && <span style={{ fontWeight: 900, fontSize: '18px', letterSpacing: '-1px' }}>ADMIN CENTER</span>}
                </div>

                <nav style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
                    {sidebarItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            style={{
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '15px',
                                padding: '14px',
                                borderRadius: '12px',
                                border: 'none',
                                backgroundColor: activeTab === item.id ? '#10171f' : 'transparent',
                                color: activeTab === item.id ? '#ffffff' : '#64748b',
                                cursor: 'pointer',
                                transition: 'all 0.25s',
                                marginBottom: '6px',
                                fontWeight: activeTab === item.id ? 800 : 500
                            }}
                        >
                            {item.icon}
                            {!isSidebarCollapsed && item.label}
                        </button>
                    ))}
                </nav>

                <div style={{ padding: '20px', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
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
                        <p style={{ color: '#666', fontSize: '14px' }}>Gerencie os ativos digitais e recursos da sua plataforma Bisnoteka.</p>
                    </div>
                    <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                        <div style={{ position: 'relative' }}>
                            <Search style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#666' }} size={18} />
                            <input
                                type="text"
                                placeholder="Buscar ativos..."
                                style={{ backgroundColor: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '12px 15px 12px 45px', color: '#1e293b', width: '300px' }}
                            />
                        </div>
                        <div style={{ width: '45px', height: '45px', backgroundColor: '#f1f5f9', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b' }}>
                            <Bell size={20} />
                        </div>
                        <div style={{ width: '45px', height: '45px', backgroundColor: '#10171f', borderRadius: '12px', overflow: 'hidden', border: '2px solid #fff', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
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
                                    style={{ backgroundColor: '#ffffff', padding: '28px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}
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
                    </div>
                )}

                {/* TAB DE GESTÃO DE RECURSOS E FICHEIROS */}
                {activeTab === 'resources' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                        
                        {/* Top Action Bar */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                            {/* Kind Filters */}
                            <div style={{ display: 'flex', gap: '8px', backgroundColor: '#ffffff', padding: '6px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                                {[
                                    { id: 'Todos', label: 'Todos os Recursos' },
                                    { id: 'FILE', label: 'Ficheiros' },
                                    { id: 'DICTIONARY', label: 'Dicionários' },
                                    { id: 'CHECKLIST', label: 'Checklists' },
                                    { id: 'TOOL', label: 'Ferramentas' }
                                ].map(filter => (
                                    <button
                                        key={filter.id}
                                        onClick={() => setSelectedResourceKind(filter.id)}
                                        style={{
                                            padding: '8px 16px',
                                            borderRadius: '12px',
                                            fontSize: '12px',
                                            fontWeight: 800,
                                            border: 'none',
                                            backgroundColor: selectedResourceKind === filter.id ? '#10171f' : 'transparent',
                                            color: selectedResourceKind === filter.id ? '#ffffff' : '#64748b',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s'
                                        }}
                                    >
                                        {filter.label}
                                    </button>
                                ))}
                            </div>

                            {/* Add Resource Button (Black with Red Hover) */}
                            <button
                                onClick={() => setShowResourceModal(true)}
                                style={{
                                    backgroundColor: '#10171f',
                                    color: '#ffffff',
                                    border: 'none',
                                    padding: '14px 24px',
                                    borderRadius: '12px',
                                    fontWeight: 900,
                                    fontSize: '13px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    cursor: 'pointer',
                                    textTransform: 'uppercase',
                                    boxShadow: '0 4px 14px rgba(16,23,31,0.2)',
                                    transition: 'all 0.25s'
                                }}
                                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#f83821'; }}
                                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#10171f'; }}
                            >
                                <Plus size={18} /> ADICIONAR NOVO FICHEIRO / RECURSO
                            </button>
                        </div>

                        {/* Resource Cards Grid */}
                        {loadingResources ? (
                            <div style={{ textAlign: 'center', padding: '60px', color: '#64748b' }}>Carregando ficheiros e recursos...</div>
                        ) : filteredResourcesList.length === 0 ? (
                            <div style={{ textAlign: 'center', padding: '60px', backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', color: '#64748b' }}>
                                Nenhum recurso cadastrado nesta categoria. Clique em "+ ADICIONAR NOVO FICHEIRO / RECURSO" para criar o primeiro!
                            </div>
                        ) : (
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
                                {filteredResourcesList.map(resource => (
                                    <div
                                        key={resource.id}
                                        style={{
                                            backgroundColor: '#ffffff',
                                            borderRadius: '12px',
                                            border: '1px solid #e2e8f0',
                                            overflow: 'hidden',
                                            boxShadow: '0 4px 14px rgba(0,0,0,0.03)',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'space-between'
                                        }}
                                    >
                                        <div>
                                            {/* Preview Image Container */}
                                            <div style={{
                                                width: '100%',
                                                height: '160px',
                                                backgroundColor: '#10171f',
                                                position: 'relative',
                                                overflow: 'hidden'
                                            }}>
                                                {resource.coverImage ? (
                                                    <img src={resource.coverImage} alt={resource.title} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }} />
                                                ) : (
                                                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', fontSize: '32px' }}>
                                                        {resource.icon || '📄'}
                                                    </div>
                                                )}

                                                <div style={{
                                                    position: 'absolute',
                                                    top: '12px',
                                                    left: '12px',
                                                    right: '12px',
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center'
                                                }}>
                                                    <span style={{
                                                        fontSize: '10px',
                                                        fontWeight: 900,
                                                        color: '#ffffff',
                                                        backgroundColor: 'rgba(16, 23, 31, 0.85)',
                                                        backdropFilter: 'blur(8px)',
                                                        padding: '4px 10px',
                                                        borderRadius: '12px'
                                                    }}>
                                                        .{resource.extension || 'PDF'}
                                                    </span>

                                                    <span style={{
                                                        fontSize: '10px',
                                                        fontWeight: 900,
                                                        padding: '4px 12px',
                                                        borderRadius: '12px',
                                                        backgroundColor: resource.accessType === 'Freemium' ? '#00c853' : '#f83821',
                                                        color: '#ffffff',
                                                        textTransform: 'uppercase'
                                                    }}>
                                                        {resource.accessType || 'Freemium'}
                                                    </span>
                                                </div>
                                            </div>

                                            <div style={{ padding: '20px' }}>
                                                <div style={{ fontSize: '10px', fontWeight: 900, color: '#f83821', textTransform: 'uppercase', marginBottom: '6px' }}>
                                                    {resource.category} • {resource.resourceKind}
                                                </div>
                                                <h3 style={{ fontSize: '17px', fontWeight: 900, color: '#10171f', marginBottom: '8px', lineHeight: 1.3 }}>
                                                    {resource.title}
                                                </h3>
                                                <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.5, marginBottom: '16px' }}>
                                                    {resource.description}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Action Bar */}
                                        <div style={{ padding: '16px 20px', borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <span style={{ fontSize: '11px', fontWeight: 700, color: '#94a3b8' }}>
                                                {resource.size || '2.5 MB'}
                                            </span>

                                            <div style={{ display: 'flex', gap: '8px' }}>
                                                <button
                                                    onClick={() => handleEditResourceClick(resource)}
                                                    style={{
                                                        backgroundColor: '#10171f',
                                                        color: '#ffffff',
                                                        border: 'none',
                                                        padding: '8px 14px',
                                                        borderRadius: '12px',
                                                        fontSize: '12px',
                                                        fontWeight: 800,
                                                        cursor: 'pointer',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '6px',
                                                        transition: 'all 0.25s'
                                                    }}
                                                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#f83821'; }}
                                                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#10171f'; }}
                                                >
                                                    <Edit size={14} /> Editar
                                                </button>

                                                <button
                                                    onClick={() => { setSelectedResource(resource); setShowDeleteResourceModal(true); }}
                                                    style={{
                                                        backgroundColor: '#fee2e2',
                                                        color: '#ef4444',
                                                        border: 'none',
                                                        padding: '8px 12px',
                                                        borderRadius: '12px',
                                                        fontSize: '12px',
                                                        fontWeight: 800,
                                                        cursor: 'pointer',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '4px'
                                                    }}
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

            </main>

            {/* MODAIS DE GERENCIAMENTO DE RECURSOS E FICHEIROS */}
            <AnimatePresence>
                
                {/* 1. MODAL CRIAR FICHEIRO / RECURSO */}
                {showResourceModal && (
                    <div style={modalBaseStyle}>
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} style={modalContainerStyle}>
                            <div style={modalHeaderStyle}>
                                <h2 style={{ fontSize: '20px', fontWeight: 900, color: '#0f172a' }}>ADICIONAR NOVO FICHEIRO / RECURSO</h2>
                                <button onClick={() => setShowResourceModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}><X size={24} /></button>
                            </div>

                            <form onSubmit={handleCreateResource} style={modalBodyStyle}>
                                
                                {/* Upload de Ficheiro Direto */}
                                <div style={{ padding: '20px', backgroundColor: '#f8fafc', border: '2px dashed #cbd5e1', borderRadius: '12px', textAlign: 'center' }}>
                                    <FileUp size={32} color="#f83821" style={{ marginBottom: '8px' }} />
                                    <div style={{ fontSize: '13px', fontWeight: 800, color: '#1e293b', marginBottom: '4px' }}>
                                        {uploadingFile ? "Carregando Ficheiro..." : "Carregar Ficheiro para Download (.PDF, .CSV, .DOCX, .ZIP)"}
                                    </div>
                                    <input
                                        type="file"
                                        onChange={handleFileUpload}
                                        disabled={uploadingFile}
                                        style={{ fontSize: '12px', color: '#64748b', cursor: 'pointer' }}
                                    />
                                    {resourceForm.fileUrl && (
                                        <div style={{ marginTop: '10px', fontSize: '12px', fontWeight: 800, color: '#00c853' }}>
                                            ✓ Ficheiro anexado: {resourceForm.fileUrl} ({resourceForm.extension} - {resourceForm.size})
                                        </div>
                                    )}
                                </div>

                                <div style={inputGroupStyle}>
                                    <label style={labelStyle}>TÍTULO DO RECURSO</label>
                                    <input
                                        type="text"
                                        required
                                        value={resourceForm.title}
                                        onChange={e => setResourceForm({ ...resourceForm, title: e.target.value })}
                                        placeholder="Ex: Modelo Oficial de Pitch Deck para Captação"
                                        style={inputStyle}
                                    />
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                                    <div style={inputGroupStyle}>
                                        <label style={labelStyle}>CATEGORIA</label>
                                        <input
                                            type="text"
                                            required
                                            value={resourceForm.category}
                                            onChange={e => setResourceForm({ ...resourceForm, category: e.target.value })}
                                            placeholder="Ex: Finanças & Modelagem"
                                            style={inputStyle}
                                        />
                                    </div>

                                    <div style={inputGroupStyle}>
                                        <label style={labelStyle}>TIPO DE RECURSO</label>
                                        <select
                                            value={resourceForm.resourceKind}
                                            onChange={e => setResourceForm({ ...resourceForm, resourceKind: e.target.value })}
                                            style={inputStyle}
                                        >
                                            <option value="FILE">Ficheiro para Download</option>
                                            <option value="DICTIONARY">Dicionário em Ficheiro</option>
                                            <option value="CHECKLIST">Checklist em Ficheiro</option>
                                            <option value="TOOL">Ferramenta / App</option>
                                        </select>
                                    </div>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px' }}>
                                    <div style={inputGroupStyle}>
                                        <label style={labelStyle}>EXTENSÃO</label>
                                        <select
                                            value={resourceForm.extension}
                                            onChange={e => setResourceForm({ ...resourceForm, extension: e.target.value })}
                                            style={inputStyle}
                                        >
                                            <option value="PDF">PDF</option>
                                            <option value="CSV">CSV / Excel</option>
                                            <option value="DOCX">DOCX / Word</option>
                                            <option value="ZIP">ZIP</option>
                                            <option value="TXT">TXT</option>
                                        </select>
                                    </div>

                                    <div style={inputGroupStyle}>
                                        <label style={labelStyle}>TAMANHO</label>
                                        <input
                                            type="text"
                                            value={resourceForm.size}
                                            onChange={e => setResourceForm({ ...resourceForm, size: e.target.value })}
                                            placeholder="Ex: 4.2 MB"
                                            style={inputStyle}
                                        />
                                    </div>

                                    <div style={inputGroupStyle}>
                                        <label style={labelStyle}>ACESSO</label>
                                        <select
                                            value={resourceForm.accessType}
                                            onChange={e => setResourceForm({ ...resourceForm, accessType: e.target.value })}
                                            style={inputStyle}
                                        >
                                            <option value="Freemium">Freemium</option>
                                            <option value="Premium">Premium</option>
                                        </select>
                                    </div>
                                </div>

                                <div style={inputGroupStyle}>
                                    <label style={labelStyle}>URL DA IMAGEM DE CAPA</label>
                                    <input
                                        type="text"
                                        value={resourceForm.coverImage}
                                        onChange={e => setResourceForm({ ...resourceForm, coverImage: e.target.value })}
                                        placeholder="https://images.unsplash.com/..."
                                        style={inputStyle}
                                    />
                                </div>

                                <div style={inputGroupStyle}>
                                    <label style={labelStyle}>DESCRIÇÃO</label>
                                    <textarea
                                        rows={3}
                                        value={resourceForm.description}
                                        onChange={e => setResourceForm({ ...resourceForm, description: e.target.value })}
                                        placeholder="Breve descrição dos entregáveis e utilidade deste recurso..."
                                        style={{ ...inputStyle, resize: 'none' }}
                                    ></textarea>
                                </div>

                                <div style={inputGroupStyle}>
                                    <label style={labelStyle}>CONTEÚDO DO FICHEIRO (TEXTO/MARKDOWN)</label>
                                    <textarea
                                        rows={4}
                                        value={resourceForm.content}
                                        onChange={e => setResourceForm({ ...resourceForm, content: e.target.value })}
                                        placeholder="Conteúdo editável que será descarregado quando o utilizador clicar..."
                                        style={{ ...inputStyle, resize: 'none' }}
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    style={submitButtonStyle}
                                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#f83821'; }}
                                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#10171f'; }}
                                >
                                    CRIAR FICHEIRO / RECURSO
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}

                {/* 2. MODAL EDITAR FICHEIRO / RECURSO */}
                {showEditResourceModal && selectedResource && (
                    <div style={modalBaseStyle}>
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} style={modalContainerStyle}>
                            <div style={modalHeaderStyle}>
                                <h2 style={{ fontSize: '20px', fontWeight: 900, color: '#0f172a' }}>EDITAR FICHEIRO / RECURSO</h2>
                                <button onClick={() => setShowEditResourceModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}><X size={24} /></button>
                            </div>

                            <form onSubmit={handleUpdateResource} style={modalBodyStyle}>
                                
                                <div style={inputGroupStyle}>
                                    <label style={labelStyle}>TÍTULO DO RECURSO</label>
                                    <input
                                        type="text"
                                        required
                                        value={resourceForm.title}
                                        onChange={e => setResourceForm({ ...resourceForm, title: e.target.value })}
                                        style={inputStyle}
                                    />
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                                    <div style={inputGroupStyle}>
                                        <label style={labelStyle}>CATEGORIA</label>
                                        <input
                                            type="text"
                                            required
                                            value={resourceForm.category}
                                            onChange={e => setResourceForm({ ...resourceForm, category: e.target.value })}
                                            style={inputStyle}
                                        />
                                    </div>

                                    <div style={inputGroupStyle}>
                                        <label style={labelStyle}>TIPO DE RECURSO</label>
                                        <select
                                            value={resourceForm.resourceKind}
                                            onChange={e => setResourceForm({ ...resourceForm, resourceKind: e.target.value })}
                                            style={inputStyle}
                                        >
                                            <option value="FILE">Ficheiro para Download</option>
                                            <option value="DICTIONARY">Dicionário em Ficheiro</option>
                                            <option value="CHECKLIST">Checklist em Ficheiro</option>
                                            <option value="TOOL">Ferramenta / App</option>
                                        </select>
                                    </div>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px' }}>
                                    <div style={inputGroupStyle}>
                                        <label style={labelStyle}>EXTENSÃO</label>
                                        <select
                                            value={resourceForm.extension}
                                            onChange={e => setResourceForm({ ...resourceForm, extension: e.target.value })}
                                            style={inputStyle}
                                        >
                                            <option value="PDF">PDF</option>
                                            <option value="CSV">CSV / Excel</option>
                                            <option value="DOCX">DOCX / Word</option>
                                            <option value="ZIP">ZIP</option>
                                            <option value="TXT">TXT</option>
                                        </select>
                                    </div>

                                    <div style={inputGroupStyle}>
                                        <label style={labelStyle}>TAMANHO</label>
                                        <input
                                            type="text"
                                            value={resourceForm.size}
                                            onChange={e => setResourceForm({ ...resourceForm, size: e.target.value })}
                                            style={inputStyle}
                                        />
                                    </div>

                                    <div style={inputGroupStyle}>
                                        <label style={labelStyle}>ACESSO</label>
                                        <select
                                            value={resourceForm.accessType}
                                            onChange={e => setResourceForm({ ...resourceForm, accessType: e.target.value })}
                                            style={inputStyle}
                                        >
                                            <option value="Freemium">Freemium</option>
                                            <option value="Premium">Premium</option>
                                        </select>
                                    </div>
                                </div>

                                <div style={inputGroupStyle}>
                                    <label style={labelStyle}>URL DA IMAGEM DE CAPA</label>
                                    <input
                                        type="text"
                                        value={resourceForm.coverImage}
                                        onChange={e => setResourceForm({ ...resourceForm, coverImage: e.target.value })}
                                        style={inputStyle}
                                    />
                                </div>

                                <div style={inputGroupStyle}>
                                    <label style={labelStyle}>DESCRIÇÃO</label>
                                    <textarea
                                        rows={3}
                                        value={resourceForm.description}
                                        onChange={e => setResourceForm({ ...resourceForm, description: e.target.value })}
                                        style={{ ...inputStyle, resize: 'none' }}
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    style={submitButtonStyle}
                                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#f83821'; }}
                                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#10171f'; }}
                                >
                                    GUARDAR ALTERAÇÕES
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}

                {/* 3. MODAL ELIMINAR RECURSO */}
                {showDeleteResourceModal && selectedResource && (
                    <div style={modalBaseStyle}>
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} style={modalContainerStyle}>
                            <div style={modalHeaderStyle}>
                                <h2 style={{ fontSize: '20px', fontWeight: 900, color: '#ef4444' }}>ELIMINAR RECURSO</h2>
                                <button onClick={() => setShowDeleteResourceModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}><X size={24} /></button>
                            </div>
                            <div style={modalBodyStyle}>
                                <p style={{ fontSize: '14px', color: '#475569' }}>
                                    Tem certeza de que pretende eliminar o recurso <strong>"{selectedResource.title}"</strong>? Esta ação é irreversível.
                                </p>
                                <div style={{ display: 'flex', gap: '12px' }}>
                                    <button
                                        onClick={() => setShowDeleteResourceModal(false)}
                                        style={{ flex: 1, padding: '14px', borderRadius: '12px', border: '1px solid #cbd5e1', backgroundColor: '#ffffff', color: '#475569', fontWeight: 800, cursor: 'pointer' }}
                                    >
                                        CANCELAR
                                    </button>
                                    <button
                                        onClick={handleDeleteResource}
                                        style={{ flex: 1, padding: '14px', borderRadius: '12px', border: 'none', backgroundColor: '#ef4444', color: '#ffffff', fontWeight: 900, cursor: 'pointer' }}
                                    >
                                        SIM, ELIMINAR
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}

            </AnimatePresence>
        </div>
    );
};

export default AdminDashboard;
