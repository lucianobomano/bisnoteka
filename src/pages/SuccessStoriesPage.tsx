import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Quote as QuoteIcon } from 'lucide-react';

const SuccessStoriesPage: React.FC = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 1024);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const [allStories, setAllStories] = useState<any[]>([]);
    const [featuredStories, setFeaturedStories] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStories = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/api/success-stories`);
                if (res.ok) {
                    const data = await res.json();
                    const formatted = data.map((s: any) => ({
                        id: s.id,
                        name: s.entrepreneurName,
                        company: s.title,
                        img: s.coverImage || "/media/ai/founder_male_1_1768641228052.png",
                        content: s.content
                    }));
                    setFeaturedStories(formatted.slice(0, 5));
                    setAllStories(formatted);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchStories();
    }, []);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;
    const totalPages = Math.max(1, Math.ceil(allStories.length / itemsPerPage));
    const currentStories = allStories.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    // Generate page numbers
    const getPageNumbers = () => {
        const pages = [];
        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            if (currentPage <= 3) {
                pages.push(1, 2, 3, 4, '...', totalPages);
            } else if (currentPage >= totalPages - 2) {
                pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
            } else {
                pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
            }
        }
        return pages;
    };

    return (
        <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', color: '#10171f', fontFamily: 'Inter, sans-serif' }}>
            {/* Hero and Featured sections remain same ... */}
            <section style={{
                padding: isMobile ? '120px 20px 80px' : '200px 60px 120px',
                textAlign: 'center',
                backgroundColor: '#ffffff'
            }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        style={{
                            fontSize: isMobile ? '36px' : '72px',
                            fontWeight: 900,
                            color: '#000000',
                            letterSpacing: isMobile ? '-1px' : '-5px',
                            lineHeight: 0.9,
                            textTransform: 'uppercase',
                            marginBottom: '30px'
                        }}
                    >
                        RESULTADOS REAIS <br /> CONHEÇA E SE INSPIRE
                    </motion.h1>

                    <p style={{
                        fontSize: isMobile ? '18px' : '24px',
                        color: '#666',
                        maxWidth: '800px',
                        margin: '0 auto 60px',
                        fontWeight: 500
                    }}>
                        A Bisnoteka não vende apenas teoria, entregamos o blueprint para resultados exponenciais na nova economia africana.
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '-15px' }}>
                            {[
                                "/media/ai/hero_avatar_1_1768641406907.png",
                                "/media/ai/hero_avatar_2_1768641423604.png",
                                "/media/ai/hero_avatar_3_1768641445096.png",
                                "/media/ai/hero_avatar_4_1768641461181.png",
                                "/media/ai/hero_avatar_5_1768641477856.png"
                            ].map((path, i) => (
                                <div key={i} style={{
                                    width: '80px',
                                    height: '80px',
                                    borderRadius: '50%',
                                    border: '4px solid #fff',
                                    overflow: 'hidden',
                                    marginLeft: i === 0 ? '0' : '-30px',
                                    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                                    zIndex: 6 - i
                                }}>
                                    <img src={path} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </div>
                            ))}
                        </div>
                        <p style={{ fontSize: '18px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px' }}>
                            Os melhores passam por aqui
                        </p>
                    </div>
                </div>
            </section>

            {/* 2. Histórias em destaque (BG cinza claro) */}
            <section style={{
                backgroundColor: '#f5f5f5',
                padding: '100px 0',
                display: 'flex',
                justifyContent: 'center'
            }}>
                <div style={{ width: '100%', maxWidth: '1800px', padding: '0 20px' }}>
                    <h2 style={{ fontSize: isMobile ? '30px' : '48px', fontWeight: 900, textTransform: 'uppercase', marginBottom: isMobile ? '40px' : '80px', textAlign: 'center', letterSpacing: isMobile ? '-1px' : '-2px' }}>Histórias em Destaque</h2>
                    <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        gap: '24px',
                        alignItems: 'stretch'
                    }}>
                        {featuredStories.map((story, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ y: -15, scale: 1.02 }}
                                style={{
                                    width: isMobile ? '100%' : '305px',
                                    backgroundColor: '#ffffff',
                                    borderRadius: '32px',
                                    padding: '24px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    boxShadow: '0 25px 50px rgba(0,0,0,0.08)',
                                    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                                    border: '1px solid rgba(0,0,0,0.05)',
                                    position: 'relative',
                                    overflow: 'hidden'
                                }}
                            >
                                <div style={{
                                    width: '100%',
                                    height: '270px',
                                    borderRadius: '24px',
                                    overflow: 'hidden',
                                    marginBottom: '25px',
                                    position: 'relative'
                                }}>
                                    <img src={story.img} alt={story.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    <div style={{
                                        position: 'absolute',
                                        top: '15px',
                                        right: '15px',
                                        backgroundColor: '#f83821',
                                        color: '#fff',
                                        padding: '6px 12px',
                                        borderRadius: '99px',
                                        fontSize: '10px',
                                        fontWeight: 900,
                                        textTransform: 'uppercase'
                                    }}>
                                        Elite Founder
                                    </div>
                                </div>
                                <h3 style={{ fontSize: '24px', fontWeight: 900, textTransform: 'uppercase', marginBottom: '8px', lineHeight: 1 }}>{story.name}</h3>
                                <p style={{ fontSize: '12px', color: '#f83821', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '30px' }}>{story.company}</p>
                                <button style={{
                                    width: '100%',
                                    height: '56px',
                                    backgroundColor: '#10171f',
                                    color: '#fff',
                                    fontSize: '14px',
                                    fontWeight: 900,
                                    textTransform: 'uppercase',
                                    border: 'none',
                                    borderRadius: '16px',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s',
                                    marginTop: 'auto'
                                }}
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f83821'}
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#10171f'}
                                >
                                    VER HISTÓRIA
                                </button>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 3. Secção todas as histórias (Grid 5x4) */}
            <section style={{ padding: '120px 0', backgroundColor: '#ffffff' }}>
                <div style={{ width: '100%', maxWidth: '1600px', margin: '0 auto', padding: '0 20px' }}>
                    <h2 style={{ fontSize: isMobile ? '30px' : '40px', fontWeight: 900, textTransform: 'uppercase', marginBottom: isMobile ? '40px' : '80px', letterSpacing: '-1px', textAlign: isMobile ? 'center' : 'left' }}>Todas as Histórias</h2>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(auto-fill, minmax(300px, 1fr))',
                        gap: isMobile ? '24px 16px' : '60px 40px',
                        justifyContent: 'center'
                    }}>
                        {currentStories.map((story, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                whileHover={{ scale: 1.05 }}
                                style={{
                                    width: '100%',
                                    textAlign: 'left',
                                    cursor: 'pointer'
                                }}
                            >
                                <div style={{
                                    width: '100%',
                                    height: isMobile ? '150px' : '270px',
                                    borderRadius: '24px',
                                    overflow: 'hidden',
                                    marginBottom: '20px',
                                    boxShadow: '0 15px 35px rgba(0,0,0,0.1)'
                                }}>
                                    <img src={story.img} alt={story.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </div>
                                <h4 style={{ fontSize: isMobile ? '16px' : '20px', fontWeight: 900, textTransform: 'uppercase', marginBottom: '5px' }}>{story.name}</h4>
                                <p style={{ fontSize: '12px', color: '#f83821', fontWeight: 900, textTransform: 'uppercase' }}>{story.company}</p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '80px' }}>
                            <button 
                                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                disabled={currentPage === 1}
                                style={{
                                    padding: '0 20px',
                                    height: '45px',
                                    backgroundColor: currentPage === 1 ? '#eee' : '#10171f',
                                    color: currentPage === 1 ? '#aaa' : '#fff',
                                    borderRadius: '8px',
                                    border: 'none',
                                    fontSize: '16px',
                                    fontWeight: 900,
                                    cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
                                }}
                            >
                                Anterior
                            </button>
                            {getPageNumbers().map((p, i) => (
                                <div key={i} 
                                    onClick={() => typeof p === 'number' && setCurrentPage(p)}
                                    style={{
                                    width: '45px',
                                    height: '45px',
                                    borderRadius: '8px',
                                    border: p === currentPage ? '2px solid #f83821' : '1px solid #ddd',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '16px',
                                    fontWeight: 700,
                                    color: p === currentPage ? '#f83821' : '#10171f',
                                    cursor: typeof p === 'number' ? 'pointer' : 'default'
                                }}>
                                    {p}
                                </div>
                            ))}
                            <button 
                                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                disabled={currentPage === totalPages}
                                style={{
                                    padding: '0 20px',
                                    height: '45px',
                                    backgroundColor: currentPage === totalPages ? '#eee' : '#f83821',
                                    color: currentPage === totalPages ? '#aaa' : '#fff',
                                    borderRadius: '8px',
                                    border: 'none',
                                    fontSize: '16px',
                                    fontWeight: 900,
                                    cursor: currentPage === totalPages ? 'not-allowed' : 'pointer'
                                }}
                            >
                                Próximo
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* 4. Secção contar a minha história */}
            <section style={{
                backgroundColor: '#10171f',
                padding: '120px 0',
                textAlign: 'center',
                color: '#fff'
            }}>
                <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 20px' }}>
                    <QuoteIcon size={60} color="#f83821" style={{ marginBottom: '30px' }} />
                    <h2 style={{ fontSize: isMobile ? '36px' : '64px', fontWeight: 900, textTransform: 'uppercase', lineHeight: 0.9, marginBottom: '30px' }}>
                        CHEGOU A SUA VEZ DE <br /> VIRAR UMA LENDA
                    </h2>
                    <p style={{ fontSize: '20px', color: 'rgba(255,255,255,0.7)', marginBottom: '50px', fontWeight: 500 }}>
                        Teve sucesso implementando as estratégias da Bisnoteka? Queremos conhecer a sua jornada e inspirar milhares de outros faundrs.
                    </p>
                    <button style={{
                        padding: '25px 60px',
                        backgroundColor: '#f83821',
                        color: '#fff',
                        borderRadius: '9999px',
                        fontSize: '20px',
                        fontWeight: 900,
                        textTransform: 'uppercase',
                        border: 'none',
                        cursor: 'pointer'
                    }}>
                        CONTAR MINHA HISTÓRIA
                    </button>
                </div>
            </section>

            {/* 5. Secção de apresentação da faundr forge (Copied from Magazine) */}
            <section style={{
                backgroundImage: "url('/media/BG.png')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                padding: isMobile ? '60px 20px' : '120px',
                display: 'flex',
                justifyContent: 'center'
            }}>
                <div style={{
                    maxWidth: '1200px',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: isMobile ? 'center' : 'flex-start',
                    textAlign: isMobile ? 'center' : 'left'
                }}>
                    <p style={{ fontSize: isMobile ? '24px' : '40px', color: '#000000', marginBottom: '10px', fontWeight: 'normal' }}>
                        apresentando a
                    </p>
                    <p style={{ fontSize: isMobile ? '24px' : '40px', fontWeight: 900, color: '#000000', marginBottom: '10px', textTransform: 'lowercase' }}>
                        faundr forge
                    </p>
                    <h2 style={{
                        fontSize: isMobile ? '36px' : '70px',
                        fontWeight: 'bold',
                        color: '#000000',
                        marginBottom: '20px',
                        lineHeight: '1.1',
                        maxWidth: '1100px'
                    }}>
                        a única associação que você precisa para construir qualquer negócio
                    </h2>
                    <p style={{ fontSize: isMobile ? '20px' : '40px', fontWeight: 'bold', color: '#000000', margin: 0 }}>
                        + aprenda com quem faz acontecer
                    </p>
                    <p style={{ fontSize: isMobile ? '20px' : '40px', fontWeight: 900, color: '#000000', margin: 0 }}>
                        + estruturas comprovadas
                    </p>
                    <p style={{ fontSize: isMobile ? '20px' : '40px', fontWeight: 'bold', color: '#000000', marginBottom: '40px' }}>
                        + comunidade com ideias semelhantes
                    </p>
                    <button style={{
                        fontSize: isMobile ? '18px' : '20px',
                        backgroundColor: '#000000',
                        color: '#ffffff',
                        width: isMobile ? '280px' : '330px',
                        height: isMobile ? '80px' : '102px',
                        borderRadius: '51px',
                        border: 'none',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        textTransform: 'uppercase',
                        transition: 'opacity 0.2s'
                    }}
                        onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.8')}
                        onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                    >
                        JUNTE-SE HOJE
                    </button>
                </div>
            </section>

            {/* 6. Secção revista (Copied "Printed Editions" style from Magazine) */}
            <section style={{ backgroundColor: '#ffffff', padding: isMobile ? '60px 20px' : '100px 0', display: 'flex', justifyContent: 'center' }}>
                <div style={{ width: '100%', maxWidth: '1200px' }}>
                    <h2 style={{ fontSize: isMobile ? '24px' : '32px', fontWeight: 'bold', textTransform: 'uppercase', margin: 0 }}>EDIÇÕES IMPRENSAS</h2>
                    <div style={{ height: '5px', backgroundColor: '#f83821', width: '100%', marginTop: '10px', marginBottom: isMobile ? '30px' : '60px' }}></div>

                    <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? '40px' : '80px', alignItems: 'center' }}>
                        <div style={{
                            flexShrink: 0,
                            width: isMobile ? '100%' : '450px',
                            maxWidth: '450px',
                            height: isMobile ? 'auto' : '620px',
                            aspectRatio: isMobile ? '450 / 620' : 'none',
                            backgroundColor: '#f0f0f0',
                            overflow: 'hidden',
                            boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
                        }}>
                            <img
                                src="/media/MAG04.png"
                                alt="Revista Faundr"
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        </div>

                        <div style={{ flex: 1, textAlign: isMobile ? 'center' : 'left' }}>
                            <h3 style={{
                                fontSize: isMobile ? '24px' : '32px',
                                fontWeight: 'normal',
                                marginBottom: '0',
                                color: '#10171f',
                                fontFamily: "'RocknRoll One', sans-serif"
                            }}>Revista faundr</h3>
                            <h4 style={{
                                fontSize: isMobile ? '50px' : '100px',
                                fontWeight: 'normal',
                                marginBottom: isMobile ? '20px' : '30px',
                                color: '#10171f',
                                lineHeight: '0.9',
                                letterSpacing: '-2px',
                                fontFamily: "'RocknRoll One', sans-serif"
                            }}>GRATUITA</h4>

                            <p style={{ fontSize: isMobile ? '18px' : '22px', color: '#555', lineHeight: '1.5', marginBottom: '20px' }}>
                                Obtenha nossa primeira edição especial física da Faundr Magazine, apresentando a Bisnoteka, que criamos especificamente para ajudá-lo a superar os problemas que todo empreendedor enfrenta ao expandir seus negócios.
                            </p>

                            <button style={{
                                backgroundColor: '#0027ff',
                                color: '#ffffff',
                                padding: '18px 50px',
                                borderRadius: '50px',
                                fontSize: '18px',
                                fontWeight: 'bold',
                                textTransform: 'uppercase',
                                border: 'none',
                                cursor: 'pointer',
                                transition: 'background-color 0.2s',
                                boxShadow: '0 10px 20px rgba(0,39,255,0.2)'
                            }}
                                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#001fd1')}
                                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#0027ff')}
                            >
                                SABER MAIS
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default SuccessStoriesPage;
