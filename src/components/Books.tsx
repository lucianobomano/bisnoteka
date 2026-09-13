import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ShoppingCart, BookOpen, Star, Sparkles, ArrowRight, ExternalLink,
    Search, Download, X, FileText, CheckCircle2, Layers
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { BOOKS_CATALOG, type BookItem } from '../data/booksCatalog';

interface BooksProps {
    onNavigate?: (page: 'home' | 'books') => void;
}

const Books: React.FC<BooksProps> = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [activeCategory, setActiveCategory] = useState('Todos');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedBook, setSelectedBook] = useState<BookItem | null>(null);
    const [books, setBooks] = useState<BookItem[]>(BOOKS_CATALOG);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    const categories = [
        'Todos',
        'Ebooks',
        'Estratégia & Negócios',
        'Marketing',
        'Vendas & E-commerce',
        'Liderança & Mindset',
        'Checklists & Frameworks'
    ];

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/api/products`);
                if (res.ok) {
                    const data = await res.json();
                    if (Array.isArray(data) && data.length > 0) {
                        // Merge API data with local catalogue to preserve fileUrl and full descriptions
                        const merged = data.map((b: any) => {
                            const local = BOOKS_CATALOG.find(x => x.id === b.id);
                            return {
                                id: b.id,
                                title: b.title || local?.title || '',
                                author: b.author || local?.author || 'Luciano Bom-Ano',
                                description: b.description || local?.description || '',
                                price: typeof b.price === 'number' ? b.price : (local?.price || 15000),
                                oldPrice: b.oldPrice || local?.oldPrice || (b.price ? b.price * 1.5 : 25000),
                                rating: b.rating || local?.rating || 5.0,
                                format: (b.format === 'PHYSICAL' ? 'PHYSICAL' : 'DIGITAL') as 'PHYSICAL' | 'DIGITAL',
                                category: b.category || local?.category || 'Ebooks',
                                coverImage: b.coverImage || local?.coverImage || '/media/books.png',
                                fileUrl: b.fileUrl || local?.fileUrl,
                                landingUrl: b.landingUrl || local?.landingUrl,
                                stock: b.stock || local?.stock || 999,
                                featured: b.featured ?? local?.featured,
                                pages: b.pages || local?.pages
                            };
                        });
                        setBooks(merged);
                    }
                }
            } catch (error) {
                console.warn('Utilizando catálogo local de livros:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchBooks();
    }, []);

    const filteredBooks = useMemo(() => {
        return books.filter(b => {
            const matchesCat = (() => {
                if (activeCategory === 'Todos') return true;
                if (activeCategory === 'Ebooks') return b.format === 'DIGITAL';
                if (activeCategory === 'Físicos') return b.format === 'PHYSICAL';
                return (b.category || '').toLowerCase() === activeCategory.toLowerCase();
            })();

            const q = searchQuery.toLowerCase().trim();
            const matchesQuery = !q ||
                b.title.toLowerCase().includes(q) ||
                (b.author || '').toLowerCase().includes(q) ||
                (b.description || '').toLowerCase().includes(q) ||
                (b.category || '').toLowerCase().includes(q);

            return matchesCat && matchesQuery;
        });
    }, [books, activeCategory, searchQuery]);

    return (
        <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', paddingTop: isMobile ? '30px' : '60px' }}>

            {/* Header & Hero Section */}
            <section style={{ padding: isMobile ? '0 20px' : '0 80px', marginBottom: '40px' }}>
                <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        backgroundColor: '#f1f5f9',
                        padding: '6px 14px',
                        borderRadius: '9999px',
                        fontSize: '11px',
                        fontWeight: 800,
                        color: '#f83821',
                        letterSpacing: '1px',
                        textTransform: 'uppercase',
                        marginBottom: '16px'
                    }}>
                        <Sparkles size={13} color="#f83821" />
                        <span>ACERVO EXECUTIVO & LITERACIA DE NEGÓCIOS</span>
                    </div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{
                            fontSize: isMobile ? '34px' : '64px',
                            fontWeight: 900,
                            color: '#10171f',
                            lineHeight: 1.05,
                            letterSpacing: isMobile ? '-1px' : '-2.5px',
                            textTransform: 'uppercase',
                            marginBottom: '16px'
                        }}
                    >
                        BIBLIOTECA <span style={{ color: '#f83821' }}>FAUNDR</span> & BISNOTEKA
                    </motion.h1>
                    <p style={{ fontSize: isMobile ? '15px' : '20px', color: '#666', maxWidth: '820px', lineHeight: 1.45, margin: '0 0 30px' }}>
                        Acesso completo ao acervo oficial de manuais, masterminds, livros digitais e frameworks estratégicos de Luciano Bom-Ano e Bisnoteka para acelerar o seu faturamento em Angola.
                    </p>

                    {/* Live Search Bar */}
                    <div style={{
                        position: 'relative',
                        maxWidth: '650px',
                        display: 'flex',
                        alignItems: 'center'
                    }}>
                        <Search size={20} color="#94a3b8" style={{ position: 'absolute', left: '20px', pointerEvents: 'none' }} />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Pesquisar por título, autor, assunto ou palavra-chave..."
                            style={{
                                width: '100%',
                                height: '54px',
                                padding: '0 45px 0 52px',
                                borderRadius: '9999px',
                                border: '1px solid #cbd5e1',
                                fontSize: '15px',
                                color: '#0f172a',
                                outline: 'none',
                                backgroundColor: '#f8fafc',
                                boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
                                transition: 'all 0.2s'
                            }}
                            onFocus={(e) => { e.currentTarget.style.borderColor = '#f83821'; e.currentTarget.style.backgroundColor = '#ffffff'; }}
                            onBlur={(e) => { e.currentTarget.style.borderColor = '#cbd5e1'; e.currentTarget.style.backgroundColor = '#f8fafc'; }}
                        />
                        {searchQuery && (
                            <button
                                type="button"
                                onClick={() => setSearchQuery('')}
                                style={{
                                    position: 'absolute',
                                    right: '18px',
                                    background: 'none',
                                    border: 'none',
                                    color: '#94a3b8',
                                    cursor: 'pointer',
                                    padding: '4px'
                                }}
                            >
                                <X size={16} />
                            </button>
                        )}
                    </div>
                </div>
            </section>

            {/* Categories & Filter Bar */}
            <section style={{ padding: isMobile ? '0 20px' : '0 80px', marginBottom: '35px', overflowX: 'auto', whiteSpace: 'nowrap' }} className="no-scrollbar">
                <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', gap: '12px', alignItems: 'center' }}>
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            style={{
                                padding: isMobile ? '10px 18px' : '12px 24px',
                                borderRadius: '9999px',
                                border: activeCategory === cat ? 'none' : '1px solid #e2e8f0',
                                backgroundColor: activeCategory === cat ? '#10171f' : '#f8fafc',
                                color: activeCategory === cat ? '#fff' : '#475569',
                                fontSize: '13px',
                                fontWeight: 700,
                                textTransform: 'uppercase',
                                letterSpacing: '0.5px',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                flexShrink: 0
                            }}
                        >
                            {cat}
                        </button>
                    ))}
                    <div style={{ marginLeft: 'auto', fontSize: '13px', color: '#64748b', fontWeight: 600, flexShrink: 0 }}>
                        {filteredBooks.length} obras encontradas
                    </div>
                </div>
            </section>

            {/* Featured Book Spotlight: +114 Ideias */}
            {activeCategory === 'Todos' && !searchQuery && (
                <section style={{ padding: isMobile ? '0 15px' : '0 80px', marginBottom: '50px' }}>
                    <div style={{
                        maxWidth: '1400px',
                        margin: '0 auto',
                        borderRadius: isMobile ? '20px' : '28px',
                        background: 'linear-gradient(135deg, #070c0a 0%, #0d1a14 50%, #052e16 100%)',
                        border: '1px solid rgba(34, 197, 94, 0.4)',
                        padding: isMobile ? '24px 20px' : '44px 50px',
                        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.25), 0 0 40px rgba(34, 197, 94, 0.15)',
                        display: 'flex',
                        flexDirection: isMobile ? 'column' : 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: isMobile ? '24px' : '48px'
                    }}>
                        <div style={{ flex: 1 }}>
                            <div style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px',
                                backgroundColor: 'rgba(34, 197, 94, 0.15)',
                                border: '1px solid rgba(34, 197, 94, 0.4)',
                                padding: '6px 14px',
                                borderRadius: '9999px',
                                color: '#4ade80',
                                fontSize: '11px',
                                fontWeight: 800,
                                textTransform: 'uppercase',
                                letterSpacing: '1px',
                                marginBottom: '16px'
                            }}>
                                <Sparkles size={13} color="#22c55e" />
                                <span>EDIÇÃO OFICIAL DEFINITIVA • 581 PÁGINAS • LUCIANO BOM-ANO</span>
                            </div>

                            <h2 style={{
                                fontSize: isMobile ? '26px' : '42px',
                                fontWeight: 900,
                                color: '#ffffff',
                                lineHeight: 1.15,
                                marginBottom: '14px',
                                letterSpacing: '-0.5px'
                            }}>
                                +114 Ideias Lucrativas de Renda Extra para Começar Hoje
                            </h2>

                            <p style={{
                                fontSize: isMobile ? '14px' : '16px',
                                color: 'rgba(255, 255, 255, 0.8)',
                                lineHeight: 1.6,
                                marginBottom: '24px',
                                maxWidth: '700px'
                            }}>
                                O maior arsenal tático com +70 ideias B2B e 40 B2C estruturadas para o mercado angolano. Acompanha 6 E-books Bónus de estratégia e o Pack de 16 POPs operacionais editáveis em Word.
                            </p>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                                <Link
                                    to="/livro-114-ideias"
                                    style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        backgroundColor: '#22c55e',
                                        color: '#000000',
                                        fontWeight: 900,
                                        fontSize: '13px',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.5px',
                                        padding: '14px 30px',
                                        borderRadius: '9999px',
                                        textDecoration: 'none',
                                        boxShadow: '0 8px 25px rgba(34, 197, 94, 0.4)',
                                        transition: 'transform 0.2s ease'
                                    }}
                                >
                                    <span>Ver Landing Page Completa</span>
                                    <ArrowRight size={16} />
                                </Link>
                                <span style={{ fontSize: '15px', color: '#86efac', fontWeight: 800 }}>
                                    15.000 AOA <span style={{ textDecoration: 'line-through', color: 'rgba(255,255,255,0.4)', fontSize: '12px', marginLeft: '6px' }}>120.000 AOA</span>
                                </span>
                            </div>
                        </div>

                        <div style={{
                            width: isMobile ? '180px' : '230px',
                            flexShrink: 0,
                            boxShadow: '0 20px 45px rgba(0,0,0,0.7)',
                            borderRadius: '14px',
                            overflow: 'hidden',
                            border: '2px solid rgba(34,197,94,0.3)'
                        }}>
                            <Link to="/livro-114-ideias">
                                <img
                                    src="/media/livros/+114 IDEIAS DE NEGÓCIO/114 IDEIAS BOOK.png"
                                    alt="+114 Ideias Lucrativas"
                                    style={{ width: '100%', height: 'auto', display: 'block' }}
                                    onError={(e) => { e.currentTarget.src = "/media/capa-114-ideias.jpg"; }}
                                />
                            </Link>
                        </div>
                    </div>
                </section>
            )}

            {/* Books Grid */}
            <section style={{ padding: isMobile ? '0 15px' : '0 80px', paddingBottom: '100px' }}>
                <div style={{
                    maxWidth: '1400px',
                    margin: '0 auto',
                    display: 'grid',
                    gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(auto-fill, minmax(280px, 1fr))',
                    gap: isMobile ? '16px' : '36px'
                }}>
                    {filteredBooks.map((book, idx) => (
                        <motion.div
                            key={book.id}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: Math.min(idx * 0.03, 0.4) }}
                            style={{
                                backgroundColor: '#ffffff',
                                borderRadius: isMobile ? '16px' : '20px',
                                padding: isMobile ? '12px' : '20px',
                                display: 'flex',
                                flexDirection: 'column',
                                position: 'relative',
                                border: '1px solid #e2e8f0',
                                boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
                                transition: 'all 0.25s ease'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = '#cbd5e1';
                                e.currentTarget.style.transform = 'translateY(-4px)';
                                e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.09)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = '#e2e8f0';
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.04)';
                            }}
                        >
                            {/* Badges: Page count & Format */}
                            <div style={{
                                position: 'absolute',
                                top: isMobile ? '10px' : '16px',
                                right: isMobile ? '10px' : '16px',
                                display: 'flex',
                                gap: '6px',
                                zIndex: 2
                            }}>
                                {book.pages && (
                                    <span style={{
                                        backgroundColor: 'rgba(15, 23, 42, 0.85)',
                                        color: '#fff',
                                        padding: isMobile ? '2px 6px' : '4px 8px',
                                        borderRadius: '6px',
                                        fontSize: isMobile ? '8px' : '10px',
                                        fontWeight: 800,
                                        backdropFilter: 'blur(4px)'
                                    }}>
                                        {book.pages} Pág.
                                    </span>
                                )}
                                <span style={{
                                    backgroundColor: book.id === 'prod-114-ideias' ? '#16a34a' : (book.format === 'PHYSICAL' ? '#0f172a' : '#0284c7'),
                                    color: '#fff',
                                    padding: isMobile ? '2px 6px' : '4px 8px',
                                    borderRadius: '6px',
                                    fontSize: isMobile ? '8px' : '10px',
                                    fontWeight: 800,
                                    textTransform: 'uppercase'
                                }}>
                                    {book.id === 'prod-114-ideias' ? 'DESTAQUE' : (book.format === 'PHYSICAL' ? 'FÍSICO' : 'EBOOK')}
                                </span>
                            </div>

                            {/* Book Cover Container */}
                            <div
                                onClick={() => {
                                    if (book.landingUrl) {
                                        window.location.href = book.landingUrl;
                                    } else {
                                        setSelectedBook(book);
                                    }
                                }}
                                style={{
                                    width: '100%',
                                    aspectRatio: '3/4',
                                    backgroundColor: '#0a0f0d',
                                    borderRadius: isMobile ? '10px' : '14px',
                                    marginBottom: isMobile ? '12px' : '16px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    overflow: 'hidden',
                                    boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                                    position: 'relative',
                                    cursor: 'pointer'
                                }}
                            >
                                <img
                                    src={book.coverImage}
                                    alt={book.title}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease' }}
                                    onError={(e) => {
                                        e.currentTarget.src = "/media/books.png";
                                    }}
                                />
                            </div>

                            {/* Category Tag */}
                            <div style={{ fontSize: '10px', fontWeight: 800, color: '#f83821', textTransform: 'uppercase', marginBottom: '4px', letterSpacing: '0.5px' }}>
                                {book.category}
                            </div>

                            {/* Title */}
                            <h3
                                onClick={() => {
                                    if (book.landingUrl) {
                                        window.location.href = book.landingUrl;
                                    } else {
                                        setSelectedBook(book);
                                    }
                                }}
                                style={{
                                    fontSize: isMobile ? '13px' : '16px',
                                    fontWeight: 800,
                                    color: '#10171f',
                                    marginBottom: '4px',
                                    lineHeight: 1.25,
                                    cursor: 'pointer',
                                    display: '-webkit-box',
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden',
                                    minHeight: isMobile ? '32px' : '40px'
                                }}
                            >
                                {book.title}
                            </h3>

                            <p style={{ fontSize: isMobile ? '11px' : '13px', color: '#64748b', marginBottom: '8px', fontWeight: 500 }}>
                                {book.author}
                            </p>

                            {/* Rating Stars */}
                            <div style={{ display: 'flex', gap: '2px', marginBottom: '14px', alignItems: 'center' }}>
                                {[1, 2, 3, 4, 5].map((s) => (
                                    <Star key={s} size={isMobile ? 10 : 12} fill="#f59e0b" color="#f59e0b" />
                                ))}
                                <span style={{ fontSize: '11px', fontWeight: 700, marginLeft: '5px', color: '#334155' }}>
                                    {book.rating.toFixed(1)}
                                </span>
                            </div>

                            {/* Price & Action Button */}
                            <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                                    <div>
                                        {book.oldPrice && (
                                            <p style={{ fontSize: isMobile ? '9px' : '11px', color: '#94a3b8', textDecoration: 'line-through', margin: 0, lineHeight: 1 }}>
                                                AKZ {book.oldPrice.toLocaleString('pt-AO')}
                                            </p>
                                        )}
                                        <p style={{ fontSize: isMobile ? '13px' : '18px', fontWeight: 900, color: '#10171f', margin: 0, marginTop: '2px' }}>
                                            AKZ {book.price.toLocaleString('pt-AO')}
                                        </p>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => {
                                            if (book.landingUrl) {
                                                window.location.href = book.landingUrl;
                                            } else {
                                                setSelectedBook(book);
                                            }
                                        }}
                                        style={{
                                            padding: isMobile ? '6px 10px' : '7px 14px',
                                            borderRadius: '8px',
                                            backgroundColor: book.landingUrl ? '#22c55e' : '#10171f',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '4px',
                                            color: book.landingUrl ? '#000000' : '#ffffff',
                                            border: 'none',
                                            cursor: 'pointer',
                                            fontSize: isMobile ? '10px' : '12px',
                                            fontWeight: 800,
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.4px',
                                            transition: 'opacity 0.2s'
                                        }}
                                    >
                                        {book.landingUrl ? (
                                            <>
                                                <span>Página</span>
                                                <ExternalLink size={12} />
                                            </>
                                        ) : (
                                            <>
                                                <span>Aceder</span>
                                                <ArrowRight size={12} />
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Book Details & Direct Download Modal */}
            <AnimatePresence>
                {selectedBook && (
                    <div
                        onClick={() => setSelectedBook(null)}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            backgroundColor: 'rgba(0, 0, 0, 0.85)',
                            backdropFilter: 'blur(8px)',
                            zIndex: 9999,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '16px'
                        }}
                    >
                        <motion.div
                            onClick={(e) => e.stopPropagation()}
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            style={{
                                backgroundColor: '#111613',
                                border: '1px solid #1a231d',
                                borderRadius: '20px',
                                maxWidth: '780px',
                                width: '100%',
                                maxHeight: '90vh',
                                overflowY: 'auto',
                                position: 'relative',
                                boxShadow: '0 25px 60px rgba(0,0,0,0.7), 0 0 30px rgba(34,197,94,0.15)',
                                padding: isMobile ? '24px 18px' : '36px 32px'
                            }}
                        >
                            {/* Close Button */}
                            <button
                                type="button"
                                onClick={() => setSelectedBook(null)}
                                style={{
                                    position: 'absolute',
                                    top: '20px',
                                    right: '20px',
                                    backgroundColor: 'rgba(255,255,255,0.08)',
                                    border: 'none',
                                    color: '#ffffff',
                                    width: '36px',
                                    height: '36px',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer'
                                }}
                            >
                                <X size={18} />
                            </button>

                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: isMobile ? '1fr' : '260px 1fr',
                                gap: '28px',
                                alignItems: 'flex-start'
                            }}>
                                {/* Book Cover */}
                                <div style={{
                                    borderRadius: '12px',
                                    overflow: 'hidden',
                                    border: '1px solid rgba(255,255,255,0.15)',
                                    boxShadow: '0 15px 35px rgba(0,0,0,0.6)',
                                    aspectRatio: '3/4',
                                    backgroundColor: '#000'
                                }}>
                                    <img
                                        src={selectedBook.coverImage}
                                        alt={selectedBook.title}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                </div>

                                {/* Content */}
                                <div>
                                    <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
                                        <span style={{ fontSize: '10px', fontWeight: 800, color: '#22c55e', backgroundColor: '#18271e', padding: '3px 10px', borderRadius: '4px', textTransform: 'uppercase' }}>
                                            {selectedBook.category}
                                        </span>
                                        {selectedBook.pages && (
                                            <span style={{ fontSize: '10px', fontWeight: 800, color: '#38bdf8', backgroundColor: 'rgba(56,189,248,0.1)', padding: '3px 10px', borderRadius: '4px' }}>
                                                {selectedBook.pages} PÁGINAS EM PDF
                                            </span>
                                        )}
                                    </div>

                                    <h2 style={{ fontSize: isMobile ? '20px' : '26px', fontWeight: 800, color: '#ffffff', lineHeight: 1.2, marginBottom: '8px' }}>
                                        {selectedBook.title}
                                    </h2>

                                    <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', marginBottom: '16px', fontWeight: 600 }}>
                                        Por {selectedBook.author}
                                    </p>

                                    <div style={{
                                        backgroundColor: '#0a0e0b',
                                        border: '1px solid #1a231d',
                                        borderRadius: '10px',
                                        padding: '16px',
                                        marginBottom: '20px'
                                    }}>
                                        <h4 style={{ fontSize: '12px', fontWeight: 700, color: '#22c55e', textTransform: 'uppercase', marginBottom: '6px', letterSpacing: '0.5px' }}>
                                            Visão Geral da Obra
                                        </h4>
                                        <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.8)', lineHeight: 1.6, margin: 0 }}>
                                            {selectedBook.description || 'Material executivo de alto impacto da coleção Bisnoteka.'}
                                        </p>
                                    </div>

                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'baseline',
                                        gap: '12px',
                                        marginBottom: '24px'
                                    }}>
                                        <span style={{ fontSize: '26px', fontWeight: 900, color: '#ffffff' }}>
                                            AKZ {selectedBook.price.toLocaleString('pt-AO')}
                                        </span>
                                        {selectedBook.oldPrice && (
                                            <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.4)', textDecoration: 'line-through' }}>
                                                AKZ {selectedBook.oldPrice.toLocaleString('pt-AO')}
                                            </span>
                                        )}
                                    </div>

                                    {/* Action Buttons */}
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                        {selectedBook.fileUrl ? (
                                            <a
                                                href={selectedBook.fileUrl}
                                                download
                                                target="_blank"
                                                rel="noreferrer"
                                                style={{
                                                    backgroundColor: '#22c55e',
                                                    color: '#000000',
                                                    padding: '14px 20px',
                                                    borderRadius: '10px',
                                                    fontWeight: 900,
                                                    fontSize: '14px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    gap: '8px',
                                                    textDecoration: 'none',
                                                    textTransform: 'uppercase',
                                                    letterSpacing: '0.5px',
                                                    boxShadow: '0 6px 20px rgba(34,197,94,0.3)',
                                                    transition: 'transform 0.2s'
                                                }}
                                            >
                                                <Download size={18} />
                                                <span>Descarregar Livro em PDF Agora</span>
                                            </a>
                                        ) : selectedBook.landingUrl ? (
                                            <Link
                                                to={selectedBook.landingUrl}
                                                style={{
                                                    backgroundColor: '#22c55e',
                                                    color: '#000000',
                                                    padding: '14px 20px',
                                                    borderRadius: '10px',
                                                    fontWeight: 900,
                                                    fontSize: '14px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    gap: '8px',
                                                    textDecoration: 'none',
                                                    textTransform: 'uppercase'
                                                }}
                                            >
                                                <span>Aceder à Página Oficial da Obra</span>
                                                <ArrowRight size={18} />
                                            </Link>
                                        ) : (
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    alert('Acedendo à área de aquisição do livro!');
                                                }}
                                                style={{
                                                    backgroundColor: '#22c55e',
                                                    color: '#000000',
                                                    padding: '14px 20px',
                                                    borderRadius: '10px',
                                                    fontWeight: 900,
                                                    fontSize: '14px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    gap: '8px',
                                                    border: 'none',
                                                    cursor: 'pointer',
                                                    textTransform: 'uppercase'
                                                }}
                                            >
                                                <ShoppingCart size={18} />
                                                <span>Adquirir Edição Oficial</span>
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Newsletter / CTA */}
            <section style={{ backgroundColor: '#10171f', padding: isMobile ? '60px 20px' : '100px 80px', textAlign: 'center' }}>
                <h2 style={{ fontSize: isMobile ? '28px' : '48px', color: '#fff', fontWeight: 900, textTransform: 'uppercase', marginBottom: '24px', letterSpacing: '-1.5px' }}>
                    QUER MAIS CONHECIMENTO? <br /> <span style={{ color: '#f83821' }}>ASSINE A NOSSA NEWSLETTER</span>
                </h2>
                <div style={{
                    maxWidth: '600px',
                    margin: '0 auto',
                    display: 'flex',
                    flexDirection: isMobile ? 'column' : 'row',
                    gap: '15px'
                }}>
                    <input
                        type="email"
                        placeholder="SEU MELHOR E-MAIL"
                        style={{
                            flex: 1,
                            height: '60px',
                            borderRadius: '9999px',
                            border: 'none',
                            padding: '0 30px',
                            fontSize: '16px',
                            fontWeight: 600,
                            outline: 'none'
                        }}
                    />
                    <button style={{
                        height: '60px',
                        padding: '0 40px',
                        borderRadius: '9999px',
                        backgroundColor: '#f83821',
                        color: '#fff',
                        fontWeight: 900,
                        border: 'none',
                        textTransform: 'uppercase',
                        cursor: 'pointer'
                    }}>
                        INSCREVER
                    </button>
                </div>
            </section>

            <style>{`
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
        </div>
    );
};

export default Books;
