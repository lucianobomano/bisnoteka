import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, ArrowRight, FileText, FileSpreadsheet, Image as ImageIcon, Star, ShieldCheck, ShoppingBag, Layout, Terminal } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface BusinessIdea {
    id: number;
    title: string;
    description: string;
    category: string;
    investment: string;
    potential: string;
    difficulty: string;
    img: string;
    tags: string[];
}

const BisnotekaPage: React.FC = () => {
    const navigate = useNavigate();
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 1024);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);



    const [businessIdeas, setBusinessIdeas] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBusinesses = async () => {
            try {
                const res = await fetch('http://localhost:3001/api/business');
                if (res.ok) {
                    const data = await res.json();
                    const formatted = data.map((b: any, idx: number) => ({
                        id: b.id,
                        title: b.name,
                        description: b.aiPayload?.summary || "Ideia gerada com inteligência artificial para dominar o mercado.",
                        category: Array.isArray(b.niche) ? b.niche[0] : (typeof b.niche === 'string' ? b.niche : "SaaS"),
                        investment: "Variável",
                        potential: "Alto",
                        difficulty: "Médium",
                        img: `https://images.unsplash.com/photo-${1542838132 + idx}?q=80&w=2070&auto=format&fit=crop`,
                        tags: Array.isArray(b.niche) ? b.niche : []
                    }));
                    setBusinessIdeas(formatted);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchBusinesses();
    }, []);

    const filteredIdeas = businessIdeas.length > 0 ? businessIdeas : [
        {
            id: 1,
            title: "Micro-SaaS de Gestão para Mercados",
            description: "Sistema simplificado de inventário e vendas focado em pequenos retalhistas locais que operam offline.",
            category: "SaaS",
            investment: "Baixo",
            potential: "Alto",
            difficulty: "Médium",
            img: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=2070&auto=format&fit=crop",
            tags: ["África", "Offline-first", "Gestão"]
        }
    ];

    return (
        <div style={{ backgroundColor: '#10171f', minHeight: '100vh', color: '#fff', fontFamily: 'Inter, sans-serif' }}>

            {/* Header / Hero */}
            <section style={{
                padding: isMobile ? '120px 20px 60px' : '180px 60px 80px',
                backgroundColor: '#10171f',
                color: '#fff',
                textAlign: 'center'
            }}>
                <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                    >
                        <h1 style={{
                            fontSize: isMobile ? '42px' : '90px',
                            fontWeight: 900,
                            letterSpacing: '-3px',
                            lineHeight: 0.9,
                            textTransform: 'uppercase',
                            marginBottom: '20px'
                        }}>
                            BIBLIOTECA DE <br /> <span style={{ color: '#f83821' }}>IDEIAS VALIDADAS</span>
                        </h1>
                        <p style={{
                            fontSize: isMobile ? '18px' : '22px',
                            color: '#888',
                            maxWidth: '700px',
                            margin: '0 auto 40px',
                            lineHeight: 1.4
                        }}>
                            A sua próxima grande oportunidade está aqui. Explore o nosso repositório de negócios prontos para serem executados no mercado africano.
                        </p>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            style={{ display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap' }}
                        >
                            <button
                                onClick={() => navigate('/criar-negocio')}
                                style={{
                                    padding: '18px 36px',
                                    backgroundColor: '#f83821',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '99px',
                                    fontSize: '16px',
                                    fontWeight: 900,
                                    textTransform: 'uppercase',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    boxShadow: '0 4px 14px 0 rgba(248,56,33,0.39)',
                                    transition: 'transform 0.2s ease',
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                            >
                                CRIAR O MEU NEGÓCIO <ArrowRight size={18} />
                            </button>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Separator Line */}
            <div style={{
                width: '100%',
                height: '1px',
                backgroundColor: 'rgba(255,255,255,0.05)',
                position: 'sticky',
                top: '75px',
                zIndex: 40
            }}></div>

            <div style={{ padding: '40px 0' }}>
                {/* Section: Visão geral */}
                <section style={{ marginBottom: '80px' }}>
                    <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 20px' }}>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)',
                            justifyContent: 'center',
                            gap: '20px'
                        }}>
                            {filteredIdeas.map((idea, idx) => (
                                <motion.div
                                    key={idea.id}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: idx * 0.05 }}
                                    onClick={() => navigate(`/bisnoteka/${idea.id}`)}
                                    style={{
                                        backgroundColor: '#1a222c',
                                        borderRadius: '24px',
                                        overflow: 'hidden',
                                        padding: '14px',
                                        width: '100%',
                                        cursor: 'pointer',
                                        border: '1px solid rgba(255,255,255,0.05)',
                                        transition: 'transform 0.3s ease',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        margin: isMobile ? '0 auto' : '0'
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.borderColor = '#f83821'}
                                    onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'}
                                >
                                    <div style={{ width: '100%', height: '240px', borderRadius: '16px', overflow: 'hidden', marginBottom: '20px', position: 'relative' }}>
                                        <img src={idea.img} alt={idea.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        <div style={{ position: 'absolute', top: '15px', left: '15px', backgroundColor: '#f83821', color: '#fff', padding: '4px 12px', borderRadius: '99px', fontSize: '10px', fontWeight: 900, textTransform: 'uppercase' }}>
                                            {idea.category}
                                        </div>
                                    </div>

                                    <div style={{ padding: '0 6px' }}>
                                        <h3 style={{ fontSize: '20px', fontWeight: 900, color: '#fff', marginBottom: '12px', textTransform: 'uppercase', lineHeight: 1.1 }}>{idea.title}</h3>
                                        <p style={{ fontSize: '14px', color: '#888', marginBottom: '20px', height: '42px', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                                            {idea.description}
                                        </p>

                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '25px' }}>
                                            <div style={{ padding: '12px', backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: '12px' }}>
                                                <p style={{ fontSize: '9px', color: '#555', fontWeight: 800, textTransform: 'uppercase', marginBottom: '4px' }}>Investimento</p>
                                                <p style={{ fontSize: '13px', fontWeight: 800, color: '#fff' }}>{idea.investment}</p>
                                            </div>
                                            <div style={{ padding: '12px', backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: '12px' }}>
                                                <p style={{ fontSize: '9px', color: '#555', fontWeight: 800, textTransform: 'uppercase', marginBottom: '4px' }}>Potencial</p>
                                                <p style={{ fontSize: '13px', fontWeight: 800, color: '#00c853' }}>{idea.potential}</p>
                                            </div>
                                        </div>

                                        <button style={{
                                            width: '100%',
                                            padding: '16px',
                                            backgroundColor: '#f83821',
                                            color: '#fff',
                                            border: 'none',
                                            borderRadius: '12px',
                                            fontSize: '13px',
                                            fontWeight: 900,
                                            textTransform: 'uppercase',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '10px',
                                            cursor: 'pointer'
                                        }}>
                                            Explorar Ideia <ArrowRight size={16} />
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Section: Ficheiros incluídos */}
                <section style={{ marginBottom: '120px', backgroundColor: 'rgba(255,255,255,0.01)', padding: '100px 0' }}>
                    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
                        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                            <h2 style={{ fontSize: isMobile ? '32px' : '48px', fontWeight: 900, color: '#fff', textTransform: 'uppercase', marginBottom: '15px', letterSpacing: '-2px' }}>O que recebes em cada blueprint</h2>
                            <p style={{ color: '#888', fontSize: '18px' }}>Não vendemos apenas ideias, vendemos a execução completa.</p>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
                            {[
                                { name: 'Plano de Negócio Operacional', desc: 'Estrutura detalhada de como gerir o dia-a-dia.', icon: <FileText color="#f83821" /> },
                                { name: 'Planilha de Viabilidade Financeira', desc: 'Cálculo de ROI, Break-even e Cashflow.', icon: <FileSpreadsheet color="#00c853" /> },
                                { name: 'Brandbook e Logotipo Editável', desc: 'Identidade visual pronta para usar.', icon: <ImageIcon color="#0011fd" /> },
                                { name: 'Sumário Executivo para Bancos', desc: 'Documentação pronta para pedir financiamento.', icon: <ShieldCheck color="#ff9800" /> },
                                { name: 'Estratégia de Marketing Digital', desc: 'Plano de tráfego pago e redes sociais.', icon: <Layout color="#e91e63" /> },
                                { name: 'Checklist de Lançamento (Go-to-market)', desc: 'Calendário de passos para os primeiros 30 dias.', icon: <Terminal color="#fff" /> },
                                { name: 'Modelos de Contratos Legais', desc: 'Termos com fornecedores e clientes.', icon: <FileText color="#888" /> },
                                { name: 'Lista de Fornecedores API/Físicos', desc: 'Contactos diretos de quem precisas.', icon: <ShoppingBag color="#b388ff" /> }
                            ].map((item, i) => (
                                <div key={i} style={{ padding: '30px', backgroundColor: '#1a222c', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                                    <div style={{ minWidth: '50px', height: '50px', backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h4 style={{ color: '#fff', fontSize: '16px', fontWeight: 800, marginBottom: '8px' }}>{item.name}</h4>
                                        <p style={{ color: '#888', fontSize: '13px', lineHeight: 1.5 }}>{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Section: Galeria */}
                <section style={{ marginBottom: '120px' }}>
                    <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 20px' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)', gap: '15px' }}>
                            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                                <div key={n} style={{ width: '100%', height: '350px', backgroundColor: '#1a222c', borderRadius: '20px', overflow: 'hidden' }}>
                                    <img src={`https://images.unsplash.com/photo-${1550000000000 + (n * 100000)}?q=80&w=800&auto=format&fit=crop`} alt="Showcase" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5 }} />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Section: Classificação */}
                <section style={{ marginBottom: '100px' }}>
                    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 20px' }}>
                        <div style={{ backgroundColor: '#1a222c', borderRadius: '32px', padding: isMobile ? '30px' : '60px', border: '1px solid rgba(255,255,255,0.05)' }}>
                            <h2 style={{ fontSize: isMobile ? '28px' : '42px', fontWeight: 900, color: '#fff', textTransform: 'uppercase', marginBottom: '40px', textAlign: 'center', letterSpacing: '-1.5px' }}>Top Ideias deste Mês</h2>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                {[
                                    { rank: 1, name: 'Micro-SaaS Gestão Mercados', score: 98 },
                                    { rank: 2, name: 'Marketplace Artesanato', score: 94 },
                                    { rank: 3, name: 'Delivery de Peixe Fresco', score: 89 },
                                    { rank: 4, name: 'EduTech para Escolas Rurais', score: 85 },
                                    { rank: 5, name: 'Fintech de Micro-Crédito', score: 82 }
                                ].map((item, i) => (
                                    <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '24px', backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                            <div style={{ width: '44px', height: '44px', backgroundColor: i === 0 ? '#f83821' : '#10171f', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, color: '#fff', fontSize: '18px' }}>
                                                {item.rank}
                                            </div>
                                            <div>
                                                <h4 style={{ color: '#fff', fontSize: '18px', fontWeight: 800 }}>{item.name}</h4>
                                                <div style={{ display: 'flex', gap: '2px', marginTop: '6px' }}>
                                                    {[1, 2, 3, 4, 5].map(s => <Star key={s} size={12} fill="#f83821" color="#f83821" />)}
                                                </div>
                                            </div>
                                        </div>
                                        <div style={{ textAlign: 'right' }}>
                                            <div style={{ fontSize: '24px', fontWeight: 900, color: '#00c853' }}>{item.score}%</div>
                                            {!isMobile && <div style={{ fontSize: '11px', color: '#555', fontWeight: 900, textTransform: 'uppercase' }}>Fator Viabilidade</div>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            {/* Newsletter CTA */}
            <section style={{
                backgroundColor: '#10171f',
                padding: '100px 20px',
                textAlign: 'center',
                color: '#fff',
                borderTop: '1px solid rgba(255,255,255,0.05)'
            }}>
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <TrendingUp size={48} color="#f83821" style={{ marginBottom: '25px' }} />
                    <h2 style={{ fontSize: isMobile ? '32px' : '56px', fontWeight: 900, textTransform: 'uppercase', marginBottom: '20px', lineHeight: 1 }}>Receba Novas Ideias <br /> Toda Semana</h2>
                    <p style={{ color: '#888', marginBottom: '40px', fontSize: '18px' }}>Junte-se a outros 15,000 faundrs que recebem análises de mercado exclusivas diretamente no email.</p>
                    <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '15px', justifyContent: 'center' }}>
                        <input
                            type="email"
                            placeholder="Seu melhor email"
                            style={{
                                padding: '20px 30px',
                                borderRadius: '99px',
                                border: '1px solid rgba(255,255,255,0.2)',
                                backgroundColor: 'rgba(255,255,255,0.05)',
                                color: '#fff',
                                width: isMobile ? '100%' : '400px',
                                fontSize: '16px',
                                outline: 'none'
                            }}
                        />
                        <button style={{
                            padding: '20px 40px',
                            backgroundColor: '#f83821',
                            color: '#fff',
                            borderRadius: '9999px',
                            border: 'none',
                            fontSize: '16px',
                            fontWeight: 900,
                            textTransform: 'uppercase',
                            cursor: 'pointer'
                        }}>ASSINAR AGORA</button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default BisnotekaPage;
