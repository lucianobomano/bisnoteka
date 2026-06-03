import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Calendar,
    Clock,
    ChevronLeft,
    ChevronRight,
    Play,
    CheckCircle,
    FileText,
    Users,
    Trophy,
    Lock,
    Target,
    Activity,
    Brain,
    MessageSquare,
} from 'lucide-react';

const MindsetDisruptivoPage: React.FC = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 1024);
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const [tracks, setTracks] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTracks = async () => {
            try {
                const res = await fetch(`\${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/api/mindset`);
                if (res.ok) {
                    const data = await res.json();
                    setTracks(data);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchTracks();
    }, []);

    const activeTrack = tracks.length > 0 ? tracks[0] : null;

    const currentBook = {
        title: activeTrack?.bookTitle || "A ÚNICA COISA",
        author: activeTrack?.bookAuthor || "Gary Keller & Jay Papasan",
        description: activeTrack?.description || "A focada busca por resultados extraordinários.",
        cover: activeTrack?.coverImage || "/media/LIVROS01.png",
        month: activeTrack ? new Date(activeTrack.monthYear).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' }) : "Março 2024",
        totalDays: 31,
        currentDay: 12,
        progress: 42,
        stats: {
            students: 1240,
            completionRate: "78%",
            avgDailyReading: "45 min"
        }
    };

    const dailyReadingPlan = [
        { day: 10, pages: "80-100", status: "done", topic: "A Mentira do Equilíbrio" },
        { day: 11, pages: "101-125", status: "done", topic: "A Prova do Sucesso" },
        { day: 12, pages: "126-150", status: "current", topic: "O Efeito Dominó" },
        { day: 13, pages: "151-175", status: "upcoming", topic: "Vivendo com Propósito" },
        { day: 14, pages: "176-200", status: "upcoming", topic: "Produtividade Extrema" },
    ];

    const pastChallenges = tracks.slice(1).map((t: any) => ({
        month: new Date(t.monthYear).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' }),
        title: t.bookTitle,
        cover: t.coverImage || "/media/LIVROS01.png",
        status: t.status,
        completion: 100
    }));
    
    if (pastChallenges.length === 0) {
        pastChallenges.push(
            { month: "Fevereiro 2024", title: "PROPRIEDADE INTELECTUAL", cover: "/media/COURSE_DIGITAL_ENT.png", status: "Finalizado", completion: 100 },
            { month: "Janeiro 2024", title: "HÁBITOS ATÔMICOS", cover: "/media/LIVROS01.png", status: "Finalizado", completion: 100 },
            { month: "Dezembro 2023", title: "O ALQUIMISTA", cover: "/media/LIVROS01.png", status: "Review", completion: 85 }
        );
    }

    return (
        <div style={{ backgroundColor: '#050505', minHeight: '100vh', color: '#fff', fontFamily: 'Inter, sans-serif' }}>





            {/* 2. Hero Section - Massive Impact */}
            <section style={{
                padding: isMobile ? '120px 20px 60px' : '180px 40px 100px',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {/* Background Decor */}
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
                    <div style={{ position: 'absolute', top: '-10%', right: '-10%', width: '800px', height: '800px', background: 'radial-gradient(circle, rgba(0,17,253,0.15) 0%, transparent 70%)', filter: 'blur(100px)' }}></div>
                    <div style={{ position: 'absolute', bottom: '-10%', left: '-10%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(248,56,33,0.1) 0%, transparent 70%)', filter: 'blur(80px)' }}></div>
                </div>

                <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 1, display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '80px', alignItems: 'center' }}>
                    <div style={{ flex: 1 }}>
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', backgroundColor: 'rgba(248,56,33,0.1)', padding: '8px 20px', borderRadius: '50px', border: '1px solid rgba(248,56,33,0.2)', marginBottom: '30px' }}
                        >
                            <Calendar size={16} color="#f83821" />
                            <span style={{ color: '#f83821', fontWeight: 900, fontSize: '12px', textTransform: 'uppercase' }}>Ojetivo do Mês: {currentBook.month}</span>
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            style={{ fontSize: isMobile ? '56px' : '110px', fontWeight: 900, lineHeight: 0.85, textTransform: 'uppercase', marginBottom: '30px', letterSpacing: '-4px' }}
                        >
                            AFIE A SUA <br /> <span style={{ color: '#0011fd' }}>MENTE</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            style={{ fontSize: '20px', color: '#888', maxWidth: '600px', lineHeight: 1.5, marginBottom: '50px' }}
                        >
                            O sistema foi desenhado para te manter na média. O Programa Disruptivo é a sua arma para quebrar o ciclo através do conhecimento visceral.
                        </motion.p>

                        <div style={{ display: 'flex', gap: '20px' }}>
                            <button style={{ backgroundColor: '#0011fd', color: '#fff', border: 'none', padding: '25px 60px', borderRadius: '15px', fontWeight: 900, fontSize: '18px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '15px' }}>
                                ABRIR LIVRO <Play fill="#fff" size={20} />
                            </button>
                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                <span style={{ fontSize: '24px', fontWeight: 900 }}>PAGE 126</span>
                                <span style={{ fontSize: '12px', color: '#666', fontWeight: 900 }}>PONTO DE PARADA ATUAL</span>
                            </div>
                        </div>
                    </div>

                    <div style={{ flex: 0.8, position: 'relative' }}>
                        <motion.div
                            initial={{ scale: 0.8, rotate: 5, opacity: 0 }}
                            animate={{ scale: 1, rotate: 0, opacity: 1 }}
                            transition={{ type: 'spring', stiffness: 100, delay: 0.3 }}
                            style={{ position: 'relative', zIndex: 2 }}
                        >
                            <div style={{
                                width: isMobile ? '280px' : '450px',
                                aspectRatio: '2/3',
                                backgroundColor: '#111',
                                borderRadius: '30px',
                                overflow: 'hidden',
                                boxShadow: '0 50px 100px rgba(0,0,0,0.8)',
                                border: '1px solid rgba(255,255,255,0.1)'
                            }}>
                                <img src={currentBook.cover} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Book Cover" />
                            </div>

                            {/* Floating Stats */}
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                                style={{ position: 'absolute', top: '10%', right: '-15%', backgroundColor: '#fff', color: '#000', padding: '20px', borderRadius: '20px', boxShadow: '0 20px 40px rgba(0,0,0,0.3)', width: '180px' }}
                            >
                                <div style={{ fontSize: '10px', fontWeight: 900, color: '#888', textTransform: 'uppercase', marginBottom: '5px' }}>Lendo agora</div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <div style={{ display: 'flex', marginLeft: '5px' }}>
                                        {[1, 2, 3].map(i => <div key={i} style={{ width: '25px', height: '25px', borderRadius: '50%', backgroundColor: '#ddd', border: '2px solid #fff', marginLeft: '-10px' }}></div>)}
                                    </div>
                                    <span style={{ fontSize: '14px', fontWeight: 900 }}>+42 Membros</span>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 3. Daily Hub - The "Mission" approach */}
            <section style={{ padding: '80px 40px', backgroundColor: '#080808' }}>
                <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '40px' }}>

                        {/* A. Current Mission */}
                        <div style={{ gridColumn: isMobile ? 'auto' : 'span 2', backgroundColor: '#0f0f0f', borderRadius: '40px', padding: '50px', border: '1px solid rgba(255,255,255,0.05)', position: 'relative', overflow: 'hidden' }}>
                            <div style={{ position: 'absolute', top: 0, right: 0, padding: '30px', opacity: 0.1 }}>
                                <Target size={120} />
                            </div>
                            <div style={{ position: 'relative', zIndex: 1 }}>
                                <h3 style={{ fontSize: '12px', fontWeight: 900, color: '#0011fd', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '20px' }}>Missão do Dia - {currentBook.currentDay}/31</h3>
                                <h2 style={{ fontSize: '48px', fontWeight: 900, marginBottom: '20px' }}>LEIA AS PÁGINAS 126 A 150</h2>
                                <p style={{ color: '#888', fontSize: '18px', marginBottom: '40px', maxWidth: '500px' }}>Tópico Hoje: <strong style={{ color: '#fff' }}>"O Efeito Dominó"</strong>. Como uma pequena ação gera um impacto massivo a longo prazo.</p>

                                <div style={{ display: 'flex', gap: '30px', marginBottom: '50px' }}>
                                    <div style={{ backgroundColor: 'rgba(255,255,255,0.03)', padding: '20px 40px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                        <div style={{ fontSize: '10px', color: '#666', fontWeight: 900, textTransform: 'uppercase', marginBottom: '5px' }}>Meta de Tempo</div>
                                        <div style={{ fontSize: '24px', fontWeight: 900 }}>45 MIN</div>
                                    </div>
                                    <div style={{ backgroundColor: 'rgba(255,255,255,0.03)', padding: '20px 40px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                        <div style={{ fontSize: '10px', color: '#666', fontWeight: 900, textTransform: 'uppercase', marginBottom: '5px' }}>Dificuldade</div>
                                        <div style={{ fontSize: '24px', fontWeight: 900, color: '#f83821' }}>ALTA</div>
                                    </div>
                                </div>

                                <button style={{ backgroundColor: '#fff', color: '#000', border: 'none', padding: '20px 50px', borderRadius: '15px', fontWeight: 900, fontSize: '16px', cursor: 'pointer', transition: 'all 0.3s' }}>
                                    MARCAR COMO LIDO
                                </button>
                            </div>
                        </div>

                        {/* B. Lab Reports Quick Actions */}
                        <div style={{ backgroundColor: '#0011fd', borderRadius: '40px', padding: '50px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <div style={{ width: '60px', height: '60px', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '30px' }}>
                                <FileText size={30} color="#fff" />
                            </div>
                            <div>
                                <h3 style={{ fontSize: '32px', fontWeight: 900, color: '#fff', lineHeight: 1, marginBottom: '20px' }}>LABORATÓRIO DE <br /> APRENDIZAGEM</h3>
                                <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px', marginBottom: '30px' }}>Não basta ler. É preciso processar. Clique abaixo para abrir seu relatório diário.</p>
                                <button style={{ width: '100%', backgroundColor: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.3)', color: '#fff', padding: '18px', borderRadius: '15px', fontWeight: 900, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                                    NOVO RELATÓRIO <ChevronRight size={18} />
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* 4. Reading Timeline - Advanced Visualization */}
            <section style={{ padding: '100px 40px' }}>
                <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '60px' }}>
                        <div>
                            <h2 style={{ fontSize: '42px', fontWeight: 900, textTransform: 'uppercase' }}>Cronograma de Execução</h2>
                            <p style={{ color: '#888' }}>Mantenha o ritmo. Distração é o inimigo número 1.</p>
                        </div>
                        <div style={{ backgroundColor: '#111', padding: '15px 30px', borderRadius: '15px', display: 'flex', alignItems: 'center', gap: '20px', border: '1px solid rgba(255,255,255,0.05)' }}>
                            <div style={{ textAlign: 'right' }}>
                                <div style={{ fontSize: '24px', fontWeight: 900 }}>{currentBook.progress}%</div>
                                <div style={{ fontSize: '10px', color: '#666', fontWeight: 900 }}>CONCLUÍDO NO MÊS</div>
                            </div>
                            <div style={{ width: '80px', height: '10px', backgroundColor: '#222', borderRadius: '5px', overflow: 'hidden' }}>
                                <div style={{ width: `${currentBook.progress}%`, height: '100%', backgroundColor: '#0011fd' }}></div>
                            </div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        {dailyReadingPlan.map((item, idx) => (
                            <motion.div
                                key={idx}
                                whileHover={{ x: 10, backgroundColor: 'rgba(255,255,255,0.02)' }}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    padding: '30px',
                                    backgroundColor: item.status === 'current' ? 'rgba(0,17,253,0.05)' : '#0a0a0a',
                                    borderRadius: '25px',
                                    border: item.status === 'current' ? '1px solid #0011fd' : '1px solid rgba(255,255,255,0.05)',
                                    transition: 'all 0.3s'
                                }}
                            >
                                <div style={{ width: '80px', fontSize: '24px', fontWeight: 900, color: item.status === 'done' ? '#666' : '#fff' }}>D{item.day}</div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: '20px', fontWeight: 900, textTransform: 'uppercase', marginBottom: '5px', color: item.status === 'done' ? '#666' : '#fff' }}>{item.topic}</div>
                                    <div style={{ fontSize: '12px', color: '#666', fontWeight: 900 }}>PÁGINAS: {item.pages}</div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                    {item.status === 'done' ? (
                                        <div style={{ color: '#0011fd', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 900 }}>
                                            <CheckCircle size={20} /> FINALIZADO
                                        </div>
                                    ) : item.status === 'current' ? (
                                        <div style={{ backgroundColor: '#0011fd', color: '#fff', padding: '10px 25px', borderRadius: '50px', fontSize: '12px', fontWeight: 900 }}>LEITURA ATIVA</div>
                                    ) : (
                                        <div style={{ border: '1px solid rgba(255,255,255,0.1)', color: '#444', padding: '10px 25px', borderRadius: '50px', fontSize: '12px', fontWeight: 900 }}>BLOQUEADO <Lock size={12} /></div>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4.5 Challenge Navigator - Previous Months */}
            <section style={{ padding: '80px 40px', backgroundColor: '#0a0a0a', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '50px' }}>
                        <div>
                            <h2 style={{ fontSize: '32px', fontWeight: 900, textTransform: 'uppercase', color: '#fff' }}>Arquivo de Desafios</h2>
                            <p style={{ color: '#666' }}>Recupere o conhecimento de meses passados e complete sua jornada.</p>
                        </div>
                        <div style={{ display: 'flex', gap: '15px' }}>
                            <button style={{ width: '50px', height: '50px', borderRadius: '15px', backgroundColor: '#111', border: '1px solid rgba(255,255,255,0.05)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                <ChevronLeft size={24} />
                            </button>
                            <button style={{ width: '50px', height: '50px', borderRadius: '15px', backgroundColor: '#0011fd', border: 'none', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                <ChevronRight size={24} />
                            </button>
                        </div>
                    </div>

                    <div style={{
                        display: 'flex',
                        gap: '30px',
                        overflowX: 'auto',
                        paddingBottom: '20px',
                        msOverflowStyle: 'none',
                        scrollbarWidth: 'none'
                    }}>
                        {pastChallenges.map((challenge, idx) => (
                            <motion.div
                                key={idx}
                                whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.02)' }}
                                style={{
                                    flexShrink: 0,
                                    width: '320px',
                                    backgroundColor: '#0f0f0f',
                                    borderRadius: '30px',
                                    padding: '25px',
                                    border: '1px solid rgba(255,255,255,0.05)',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s'
                                }}
                            >
                                <div style={{
                                    width: '100%',
                                    height: '220px',
                                    backgroundColor: '#222',
                                    borderRadius: '20px',
                                    marginBottom: '20px',
                                    overflow: 'hidden',
                                    position: 'relative'
                                }}>
                                    <img src={challenge.cover} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }} alt="" />
                                    <div style={{ position: 'absolute', top: '15px', left: '15px', backgroundColor: challenge.status === 'Finalizado' ? '#0011fd' : '#f83821', padding: '5px 12px', borderRadius: '50px', fontSize: '10px', fontWeight: 900 }}>
                                        {challenge.status}
                                    </div>
                                </div>
                                <h4 style={{ fontSize: '12px', color: '#0011fd', fontWeight: 900, textTransform: 'uppercase', marginBottom: '8px' }}>{challenge.month}</h4>
                                <h3 style={{ fontSize: '18px', fontWeight: 900, textTransform: 'uppercase', marginBottom: '15px', lineHeight: 1.2 }}>{challenge.title}</h3>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                    <div style={{ flex: 1, height: '4px', backgroundColor: '#222', borderRadius: '2px' }}>
                                        <div style={{ width: `${challenge.completion}%`, height: '100%', backgroundColor: '#fff', opacity: 0.2 }}></div>
                                    </div>
                                    <span style={{ fontSize: '12px', fontWeight: 900, color: '#666' }}>{challenge.completion}%</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. Performance Dashboard - Stats & Community */}
            <section style={{ padding: '100px 40px', backgroundColor: '#050505' }}>
                <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)', gap: '30px' }}>

                        <div style={{ backgroundColor: '#111', padding: '40px', borderRadius: '35px', border: '1px solid rgba(255,255,255,0.05)' }}>
                            <div style={{ color: '#0011fd', marginBottom: '20px' }}><Users size={32} /></div>
                            <div style={{ fontSize: '32px', fontWeight: 900 }}>{currentBook.stats.students}</div>
                            <div style={{ fontSize: '12px', color: '#666', fontWeight: 900, textTransform: 'uppercase' }}>ALUNOS NO PROGRAMA</div>
                        </div>

                        <div style={{ backgroundColor: '#111', padding: '40px', borderRadius: '35px', border: '1px solid rgba(255,255,255,0.05)' }}>
                            <div style={{ color: '#f83821', marginBottom: '20px' }}><Trophy size={32} /></div>
                            <div style={{ fontSize: '32px', fontWeight: 900 }}>{currentBook.stats.completionRate}</div>
                            <div style={{ fontSize: '12px', color: '#666', fontWeight: 900, textTransform: 'uppercase' }}>TAXA DE CONCLUSÃO</div>
                        </div>

                        <div style={{ backgroundColor: '#111', padding: '40px', borderRadius: '35px', border: '1px solid rgba(255,255,255,0.05)' }}>
                            <div style={{ color: '#fff', marginBottom: '20px' }}><Clock size={32} /></div>
                            <div style={{ fontSize: '32px', fontWeight: 900 }}>{currentBook.stats.avgDailyReading}</div>
                            <div style={{ fontSize: '12px', color: '#666', fontWeight: 900, textTransform: 'uppercase' }}>MEDIA DE LEITURA</div>
                        </div>

                        <div style={{ backgroundColor: '#111', padding: '40px', borderRadius: '35px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ color: '#0011fd', marginBottom: '10px' }}><Activity size={40} /></div>
                                <span style={{ fontWeight: 900, fontSize: '14px', color: '#fff' }}>VER FULL STATS</span>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* 6. Floating Action - AI Guide / Knowledge Assistant */}
            <motion.div
                drag
                dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
                style={{
                    position: 'fixed',
                    bottom: '40px',
                    right: '40px',
                    zIndex: 1000,
                    cursor: 'grab'
                }}
            >
                <div style={{
                    backgroundColor: '#fff',
                    color: '#000',
                    padding: '20px 30px',
                    borderRadius: '25px',
                    boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '20px'
                }}>
                    <div style={{ width: '45px', height: '45px', backgroundColor: '#0011fd', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Brain color="#fff" size={24} />
                    </div>
                    <div>
                        <div style={{ fontSize: '14px', fontWeight: 900 }}>GUIA DISRUPTIVO</div>
                        <div style={{ fontSize: '10px', color: '#666', fontWeight: 900 }}>PERGUNTE SOBRE O LIVRO</div>
                    </div>
                    <div style={{ backgroundColor: '#f5f5f5', padding: '10px', borderRadius: '50%' }}>
                        <MessageSquare size={18} />
                    </div>
                </div>
            </motion.div>

        </div>
    );
};

export default MindsetDisruptivoPage;
