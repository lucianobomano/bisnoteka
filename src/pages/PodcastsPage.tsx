import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Search, Mic, Calendar, Clock, Headphones, Volume2, Monitor } from 'lucide-react';

interface PodcastEpisode {
    id: number;
    title: string;
    description: string;
    duration: string;
    date: string;
    category: string;
    img: string;
    host: string;
    format: 'audio' | 'video';
}

const PodcastsPage: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isMobile, setIsMobile] = useState(false);
    const [activeCategory, setActiveCategory] = useState('Todos');
    const [activeFormat, setActiveFormat] = useState<'all' | 'audio' | 'video'>('all');

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 1024);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const [episodes, setEpisodes] = useState<PodcastEpisode[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPodcasts = async () => {
            try {
                const res = await fetch(`\${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/api/podcasts`);
                if (res.ok) {
                    const data = await res.json();
                    const formatted = data.map((p: any) => ({
                        id: p.id,
                        title: p.title,
                        description: p.description,
                        duration: p.duration,
                        date: new Date(p.releaseDate).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }),
                        host: p.host,
                        category: p.category,
                        img: p.coverImage || "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=2070&auto=format&fit=crop",
                        format: p.format.toLowerCase() === 'video' ? 'video' : 'audio'
                    }));
                    setEpisodes(formatted);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchPodcasts();
    }, []);

    const filteredEpisodes = episodes.filter(ep => {
        const matchesSearch = ep.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            ep.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = activeCategory === 'Todos' || ep.category === activeCategory;
        const matchesFormat = activeFormat === 'all' || ep.format === activeFormat;
        return matchesSearch && matchesCategory && matchesFormat;
    });

    const categories = ['Todos', 'Psicologia', 'Estratégia', 'Varejo', 'Mentalidade', 'Finanças', 'Sustentabilidade'];

    return (
        <div style={{ backgroundColor: '#10171f', minHeight: '100vh', color: '#fff', fontFamily: 'Inter, sans-serif' }}>

            {/* Ambient Background Elements */}
            <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
                <div style={{ position: 'absolute', top: '-10%', right: '-10%', width: '50vw', height: '50vw', backgroundColor: '#0011fd', opacity: 0.1, filter: 'blur(150px)', borderRadius: '50%' }}></div>
                <div style={{ position: 'absolute', bottom: '-10%', left: '-10%', width: '40vw', height: '40vw', backgroundColor: '#f83821', opacity: 0.08, filter: 'blur(150px)', borderRadius: '50%' }}></div>
            </div>

            {/* Hero Section */}
            <section style={{
                padding: isMobile ? '120px 20px 60px' : '180px 60px 100px',
                textAlign: 'center',
                position: 'relative',
                zIndex: 1
            }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', backgroundColor: 'rgba(255,255,255,0.05)', padding: '8px 20px', borderRadius: '99px', marginBottom: '30px', border: '1px solid rgba(255,255,255,0.1)' }}>
                            <Mic size={14} color="#f83821" />
                            <span style={{ fontSize: '11px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '2px' }}>Voz da Experiência</span>
                        </div>
                        <h1 style={{
                            fontSize: isMobile ? '48px' : '100px',
                            fontWeight: 900,
                            letterSpacing: '-4px',
                            lineHeight: 0.85,
                            marginBottom: '30px',
                            textTransform: 'uppercase'
                        }}>
                            PODCAST <br /> <span style={{ color: '#0011fd' }}>MODO FUNDADOR</span>
                        </h1>
                        <p style={{ color: '#888', fontSize: isMobile ? '18px' : '22px', maxWidth: '700px', margin: '0 auto 50px', lineHeight: 1.4 }}>
                            Conversas profundas com quem está a construir o futuro do mercado em África. Sem filtros, apenas estratégia pura.
                        </p>

                        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
                            <button style={{ padding: '20px 40px', backgroundColor: '#0011fd', color: '#fff', borderRadius: '99px', border: 'none', fontSize: '14px', fontWeight: 900, textTransform: 'uppercase', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px', boxShadow: '0 20px 40px rgba(0,17,253,0.3)' }}>
                                Ouvir Último Episódio <Play size={18} fill="currentColor" />
                            </button>
                            <button style={{ padding: '20px 40px', backgroundColor: 'transparent', color: '#fff', borderRadius: '99px', border: '1px solid rgba(255,255,255,0.1)', fontSize: '14px', fontWeight: 900, textTransform: 'uppercase', cursor: 'pointer' }}>
                                Seguir no Spotify
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Separator Line */}
            <div style={{ width: '100%', height: '1px', backgroundColor: 'rgba(255,255,255,0.05)', position: 'sticky', top: '75px', zIndex: 40 }}></div>

            {/* Content Section */}
            <section style={{ padding: '80px 0', position: 'relative', zIndex: 1 }}>
                <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 20px' }}>

                    {/* Format Toggle & Search */}
                    <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', alignItems: isMobile ? 'stretch' : 'center', gap: '40px', marginBottom: '30px' }}>
                        <div style={{ display: 'flex', backgroundColor: '#1a222c', padding: '6px', borderRadius: '99px', border: '1px solid rgba(255,255,255,0.05)' }}>
                            {[
                                { id: 'all', label: 'Todos', icon: null },
                                { id: 'audio', label: 'Áudio', icon: <Volume2 size={16} /> },
                                { id: 'video', label: 'Vídeo (YouTube)', icon: <Monitor size={16} /> }
                            ].map(format => (
                                <button
                                    key={format.id}
                                    onClick={() => setActiveFormat(format.id as any)}
                                    style={{
                                        padding: '12px 24px',
                                        borderRadius: '99px',
                                        backgroundColor: activeFormat === format.id ? '#0011fd' : 'transparent',
                                        color: activeFormat === format.id ? '#fff' : '#888',
                                        border: 'none',
                                        fontSize: '13px',
                                        fontWeight: 800,
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        transition: 'all 0.3s'
                                    }}
                                >
                                    {format.icon} {format.label}
                                </button>
                            ))}
                        </div>

                        <div style={{ position: 'relative', width: isMobile ? '100%' : '350px' }}>
                            <Search size={18} color="#555" style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)' }} />
                            <input
                                type="text"
                                placeholder="Pesquisar episódios..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '16px 16px 16px 50px',
                                    borderRadius: '99px',
                                    backgroundColor: '#1a222c',
                                    border: '1px solid rgba(255,255,255,0.05)',
                                    color: '#fff',
                                    fontSize: '15px',
                                    outline: 'none'
                                }}
                            />
                        </div>
                    </div>

                    {/* Category Tabs */}
                    <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '10px', scrollbarWidth: 'none', marginBottom: '60px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                style={{
                                    padding: '15px 0',
                                    backgroundColor: 'transparent',
                                    border: 'none',
                                    borderBottom: activeCategory === cat ? '2px solid #f83821' : '2px solid transparent',
                                    color: activeCategory === cat ? '#fff' : '#555',
                                    fontSize: '13px',
                                    fontWeight: 800,
                                    textTransform: 'uppercase',
                                    cursor: 'pointer',
                                    whiteSpace: 'nowrap',
                                    marginRight: '30px',
                                    transition: 'all 0.3s'
                                }}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Episodes Grid */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
                        gap: '40px'
                    }}>
                        <AnimatePresence mode='popLayout'>
                            {filteredEpisodes.map((ep, idx) => (
                                <motion.div
                                    key={ep.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                                    style={{
                                        backgroundColor: '#1a222c',
                                        borderRadius: '32px',
                                        overflow: 'hidden',
                                        border: '1px solid rgba(255,255,255,0.05)',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        transition: 'all 0.3s'
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.borderColor = '#0011fd'}
                                    onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'}
                                >
                                    <div style={{ position: 'relative', height: '300px', width: '100%' }}>
                                        <img src={ep.img} alt={ep.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #1a222c, transparent)' }}></div>
                                        <div style={{ position: 'absolute', bottom: '20px', left: '20px', display: 'flex', gap: '8px' }}>
                                            <div style={{ backgroundColor: ep.format === 'video' ? '#f83821' : '#0011fd', color: '#fff', padding: '4px 12px', borderRadius: '99px', fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                {ep.format === 'video' ? <Monitor size={10} /> : <Volume2 size={10} />}
                                                {ep.format === 'video' ? 'YouTube' : 'Áudio'}
                                            </div>
                                            <div style={{ backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(10px)', color: '#fff', padding: '4px 12px', borderRadius: '99px', fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                                <Clock size={10} /> {ep.duration}
                                            </div>
                                        </div>
                                        <button style={{
                                            position: 'absolute',
                                            right: '25px',
                                            bottom: '-25px',
                                            width: '60px',
                                            height: '60px',
                                            borderRadius: '50%',
                                            backgroundColor: '#f83821',
                                            border: 'none',
                                            color: '#fff',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            cursor: 'pointer',
                                            boxShadow: '0 10px 20px rgba(248, 56, 33, 0.3)',
                                            zIndex: 2
                                        }}>
                                            <Play size={24} fill="currentColor" />
                                        </button>
                                    </div>

                                    <div style={{ padding: '40px 30px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '15px' }}>
                                            <Calendar size={12} color="#555" />
                                            <span style={{ fontSize: '12px', color: '#555', fontWeight: 700 }}>{ep.date}</span>
                                        </div>
                                        <h3 style={{ fontSize: '24px', fontWeight: 900, textTransform: 'uppercase', lineHeight: 1.1, marginBottom: '15px', color: '#fff' }}>{ep.title}</h3>
                                        <p style={{ fontSize: '14px', color: '#888', lineHeight: 1.6, marginBottom: '25px', minHeight: '67px' }}>{ep.description}</p>

                                        <div style={{ paddingTop: '25px', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', gap: '15px' }}>
                                            <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#10171f', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <Mic size={18} color="#0011fd" />
                                            </div>
                                            <div>
                                                <p style={{ fontSize: '10px', color: '#555', fontWeight: 800, textTransform: 'uppercase', marginBottom: '2px' }}>Anfitrião</p>
                                                <p style={{ fontSize: '14px', fontWeight: 800, color: '#fff' }}>{ep.host}</p>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {filteredEpisodes.length === 0 && (
                        <div style={{ textAlign: 'center', padding: '100px 0' }}>
                            <Headphones size={60} color="#333" style={{ marginBottom: '20px' }} />
                            <h3 style={{ fontSize: '24px', fontWeight: 800, textTransform: 'uppercase' }}>Nenhum episódio encontrado</h3>
                            <p style={{ color: '#555' }}>Tente ajustar os seus termos de pesquisa.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Newsletter Section */}
            <section style={{ padding: '120px 20px', borderTop: '1px solid rgba(255,255,255,0.05)', backgroundColor: 'rgba(0,17,253,0.02)' }}>
                <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                    <div style={{ width: '80px', height: '80px', backgroundColor: '#0011fd', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 30px', transform: 'rotate(-10deg)', boxShadow: '0 20px 40px rgba(0,17,253,0.2)' }}>
                        <Volume2 size={32} color="#fff" />
                    </div>
                    <h2 style={{ fontSize: isMobile ? '36px' : '56px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-2px', marginBottom: '20px' }}>Subscreve o Feed</h2>
                    <p style={{ color: '#888', fontSize: '18px', marginBottom: '40px' }}>Recebe os destaques de cada episódio e recursos extras diretamente no teu e-mail.</p>
                    <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '10px', justifyContent: 'center' }}>
                        <input
                            type="email"
                            placeholder="Teu melhor e-mail"
                            style={{ padding: '20px 30px', borderRadius: '99px', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: 'rgba(255,255,255,0.05)', color: '#fff', outline: 'none', width: isMobile ? '100%' : '400px' }}
                        />
                        <button style={{ padding: '20px 40px', backgroundColor: '#fff', color: '#10171f', borderRadius: '99px', border: 'none', fontWeight: 900, textTransform: 'uppercase', cursor: 'pointer' }}>Aderir</button>
                    </div>
                </div>
            </section>


        </div>
    );
};

export default PodcastsPage;

