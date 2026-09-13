import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Calendar, MapPin, Ticket, ArrowRight, Star, Sparkles, Camera, 
    Users, Award, Clock, CheckCircle2, ChevronDown, Zap, Globe, 
    Building, ShieldCheck, X, Volume2, Play
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FaundrExperiencePage: React.FC = () => {
    const navigate = useNavigate();
    const [events, setEvents] = useState<any[]>([]);
    const [activeDay, setActiveDay] = useState<number>(1);
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTier, setSelectedTier] = useState<string>('VIP');

    // Countdown Timer Logic
    const [timeLeft, setTimeLeft] = useState({
        days: 42,
        hours: 14,
        minutes: 32,
        seconds: 45
    });

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
                if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
                if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
                if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
                return prev;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/api/events`);
                if (res.ok) {
                    const data = await res.json();
                    setEvents(data);
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchEvents();
    }, []);

    const toggleFaq = (index: number) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    const speakers = [
        {
            name: "Ricardo Ventura",
            role: "CEO & Founder",
            company: "Nexus Invest",
            topic: "Como Captar os Primeiros $500k em África",
            image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600",
            tag: "Keynote Speaker"
        },
        {
            name: "Dra. Nair de Sousa",
            role: "Head of Growth",
            company: "FOUNDR FORGE",
            topic: "Estratégia Go-to-Market de Zero a $1M ARR",
            image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600",
            tag: "Alumni Leader"
        },
        {
            name: "Eng. Mário Silva",
            role: "Managing Partner",
            company: "Venture Capital Angola",
            topic: "O Que os Investidores Procuram em 2026",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600",
            tag: "Investor Panel"
        },
        {
            name: "Tânia Santos",
            role: "Founder",
            company: "AgroTech Connect",
            topic: "Do Pitch Local à Escala Regional",
            image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=600",
            tag: "FOUNDR Forge Alumni"
        }
    ];

    const schedule = [
        {
            day: 1,
            title: "DIA 1: IMERSÃO E NETWORKING VIP",
            date: "24 DE NOVEMBRO",
            sessions: [
                { time: "09:00 - 10:30", title: "Credenciação & Welcome Coffee VIP", desc: "Recepção exclusiva de convidados e kit de boas-vindas FOUNDR.", speaker: "Equipa FOUNDR" },
                { time: "10:30 - 12:00", title: "Keynote de Abertura: O Estado do Empreendedorismo em 2026", desc: "Análise estratégica dos novos mercados e oportunidades de financiamento.", speaker: "Ricardo Ventura" },
                { time: "14:00 - 16:30", title: "Painel de Investidores: O Que Faz um Pitch Ganhar", desc: "Debate aberto com investidores reais e análise de cases.", speaker: "Painel VC & Business Angels" },
                { time: "17:00 - 19:00", title: "Sunset Cocktail & Speed Networking", desc: "Conexões diretas entre fundadores e mentores ao por do sol.", speaker: "Todos os Participantes" }
            ]
        },
        {
            day: 2,
            title: "DIA 2: ESCALA & PITCH BATTLE ALUMNI",
            date: "25 DE NOVEMBRO",
            sessions: [
                { time: "09:30 - 11:30", title: "Masterclass: Operações e Automação com IA", desc: "Como escalar um negócio reduzindo custos fixos através de IA generativa.", speaker: "Dra. Nair de Sousa" },
                { time: "12:00 - 13:30", title: "Alumni Pitch Battle (Semifinais)", desc: "10 fundadores selecionados apresentam as suas soluções perante júri especializado.", speaker: "Alumni FOUNDR FORGE" },
                { time: "15:00 - 17:30", title: "Mesa Redonda: Expansão Transfronteiriça", desc: "Estratégias legais e operacionais para atuar em múltiplos mercados africanos.", speaker: "Fundadores Convidados" },
                { time: "18:00 - 20:00", title: "Noite de Gala & Entrega de Prémios", desc: "Celebração dos melhores negócios e atribuição do prémio Founder of the Year.", speaker: "Júri de Honra" }
            ]
        },
        {
            day: 3,
            title: "DIA 3: VIP INNER CIRCLE RETREAT (EXCLUSIVO VIP)",
            date: "26 DE NOVEMBRO",
            sessions: [
                { time: "10:00 - 13:00", title: "Mastermind Fechado de Estratégia de Capital", desc: "Sessão privada para análise individual de captação de recursos e valuation.", speaker: "Mentores & VIPs" },
                { time: "13:30 - 16:00", title: "Almoço Executivo & Encerramento", desc: "Experiência gastronómica com parceiros estratégicos e celebração de acordos.", speaker: "Inner Circle VIP" }
            ]
        }
    ];

    const faqs = [
        {
            q: "Quem pode participar no FOUNDR EXPERIENCE?",
            a: "O evento foi concebido para fundadores de startups, empreendedores em fase de escala, investidores e ex-alunos (alumni) dos programas FOUNDR FORGE. Vagas limitadas para garantir networking de alto valor."
        },
        {
            q: "O que está incluído no Passe Alumni?",
            a: "O Passe Alumni garante acesso aos 2 dias principais do evento, palestras, painéis, pitch battle, coffee breaks, kit de participante e acesso ao Sunset Cocktail de Networking."
        },
        {
            q: "Qual a diferença do Passe Ultra VIP?",
            a: "O Passe Ultra VIP inclui tudo do Passe Alumni mais: acesso exclusivo ao Dia 3 (Mastermind Fechado & Almoço Executivo), assentos nas primeiras filas da Gala, consultoria individual com mentores e acesso permanente à comunidade de investidores."
        },
        {
            q: "Onde será realizado o evento?",
            a: "O evento decorrerá no Centro de Convenções do Hotel Epic Sana em Luanda, Angola, oferecendo instalações de classe mundial e serviço premium."
        }
    ];

    return (
        <div style={{ backgroundColor: '#08090a', color: '#ffffff', fontFamily: 'Inter, sans-serif', minHeight: '100vh', overflowX: 'hidden' }}>

            {/* Ambient Animated Glow Mesh */}
            <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
                <div style={{
                    position: 'absolute',
                    top: '-15%',
                    right: '-10%',
                    width: '60vw',
                    height: '60vw',
                    background: 'radial-gradient(circle, rgba(248,56,33,0.18) 0%, rgba(0,0,0,0) 70%)',
                    filter: 'blur(100px)'
                }}></div>
                <div style={{
                    position: 'absolute',
                    bottom: '-10%',
                    left: '-10%',
                    width: '65vw',
                    height: '65vw',
                    background: 'radial-gradient(circle, rgba(0,17,253,0.15) 0%, rgba(0,0,0,0) 70%)',
                    filter: 'blur(120px)'
                }}></div>
            </div>

            {/* Hero Section */}
            <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '140px 20px 80px', zIndex: 1 }}>
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: 'url("https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?auto=format&fit=crop&q=80&w=2000")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    opacity: 0.18,
                    mixBlendMode: 'luminosity'
                }}></div>
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to bottom, rgba(8,9,10,0.4) 0%, rgba(8,9,10,0.95) 80%, #08090a 100%)'
                }}></div>

                <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 2 }}>
                    
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '10px',
                            padding: '8px 24px',
                            backgroundColor: 'rgba(255,255,255,0.06)',
                            backdropFilter: 'blur(12px)',
                            border: '1px solid rgba(255,255,255,0.12)',
                            borderRadius: '12px',
                            marginBottom: '30px',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
                        }}
                    >
                        <Sparkles size={16} color="#f83821" />
                        <span style={{ fontSize: '11px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '3px', color: '#f83821' }}>
                            FOUNDR FORGE • EDICÃO ANUAL 2026
                        </span>
                    </motion.div>

                    {/* Main Title */}
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        style={{
                            fontSize: 'clamp(44px, 8vw, 105px)',
                            fontWeight: 900,
                            lineHeight: 0.9,
                            letterSpacing: '-3px',
                            textTransform: 'uppercase',
                            marginBottom: '30px'
                        }}
                    >
                        FOUNDR <br />
                        <span style={{
                            background: 'linear-gradient(135deg, #ffffff 0%, #f83821 50%, #0011fd 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}>
                            EXPERIENCE
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        style={{
                            fontSize: 'clamp(16px, 2vw, 22px)',
                            color: '#a0a5b1',
                            maxWidth: '800px',
                            margin: '0 auto 50px',
                            lineHeight: 1.5,
                            fontWeight: 400
                        }}
                    >
                        O maior ponto de encontro anual para fundadores, líderes e alumni do programa <strong style={{ color: '#fff' }}>FOUNDR FORGE</strong>. Três dias de imersão estratégica, networking com investidores e aceleração de negócios.
                    </motion.p>

                    {/* Live Countdown Grid */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '100%',
                            margin: '0 auto 60px',
                            gap: '15px',
                            flexWrap: 'wrap'
                        }}
                    >
                        {[
                            { label: 'DIAS', val: timeLeft.days },
                            { label: 'HORAS', val: timeLeft.hours },
                            { label: 'MINUTOS', val: timeLeft.minutes },
                            { label: 'SEGUNDOS', val: timeLeft.seconds }
                        ].map((item, idx) => (
                            <div key={idx} style={{
                                width: '90px',
                                padding: '16px 10px',
                                backgroundColor: 'rgba(255,255,255,0.03)',
                                border: '1px solid rgba(255,255,255,0.08)',
                                borderRadius: '12px',
                                backdropFilter: 'blur(10px)',
                                textAlign: 'center'
                            }}>
                                <div style={{ fontSize: '28px', fontWeight: 900, color: '#fff', lineHeight: 1 }}>
                                    {String(item.val).padStart(2, '0')}
                                </div>
                                <div style={{ fontSize: '9px', fontWeight: 800, color: '#f83821', letterSpacing: '1px', marginTop: '6px' }}>
                                    {item.label}
                                </div>
                            </div>
                        ))}
                    </motion.div>

                    {/* Quick Event Info Bar */}
                    <div style={{
                        display: 'inline-flex',
                        gap: '30px',
                        flexWrap: 'wrap',
                        justify: 'center',
                        alignItems: 'center',
                        marginBottom: '50px',
                        padding: '16px 32px',
                        backgroundColor: 'rgba(255,255,255,0.02)',
                        border: '1px solid rgba(255,255,255,0.06)',
                        borderRadius: '12px'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <Calendar size={18} color="#f83821" />
                            <span style={{ fontSize: '14px', fontWeight: 700, color: '#e2e8f0' }}>24 - 26 NOV 2026</span>
                        </div>
                        <div style={{ width: '1px', height: '16px', backgroundColor: 'rgba(255,255,255,0.1)' }}></div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <MapPin size={18} color="#0011fd" />
                            <span style={{ fontSize: '14px', fontWeight: 700, color: '#e2e8f0' }}>EPIC SANA, LUANDA</span>
                        </div>
                        <div style={{ width: '1px', height: '16px', backgroundColor: 'rgba(255,255,255,0.1)' }}></div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <Users size={18} color="#eab308" />
                            <span style={{ fontSize: '14px', fontWeight: 700, color: '#e2e8f0' }}>250 LUGARES RESERVADOS</span>
                        </div>
                    </div>

                    {/* CTAs */}
                    <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            style={{
                                padding: '20px 40px',
                                backgroundColor: '#f83821',
                                color: '#ffffff',
                                border: 'none',
                                borderRadius: '12px',
                                fontSize: '15px',
                                fontWeight: 900,
                                textTransform: 'uppercase',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                boxShadow: '0 10px 30px rgba(248,56,33,0.4)',
                                transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                        >
                            GARANTIR O MEU PASSE <ArrowRight size={18} />
                        </button>
                        <a
                            href="#programacao"
                            style={{
                                padding: '20px 36px',
                                backgroundColor: 'rgba(255,255,255,0.05)',
                                color: '#ffffff',
                                border: '1px solid rgba(255,255,255,0.15)',
                                borderRadius: '12px',
                                fontSize: '15px',
                                fontWeight: 800,
                                textTransform: 'uppercase',
                                textDecoration: 'none',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px'
                            }}
                        >
                            VER PROGRAMAÇÃO
                        </a>
                    </div>

                </div>
            </section>

            {/* Impact Metrics Grid */}
            <section style={{ padding: '60px 20px', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)', backgroundColor: '#0b0d10' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '30px', textAlign: 'center' }}>
                    {[
                        { num: "250+", label: "FUNDADORES & ALUMNI", color: "#f83821" },
                        { num: "15+", label: "INVESTIDORES VC", color: "#0011fd" },
                        { num: "$5M+", label: "VALUATION DO ECOSSISTEMA", color: "#eab308" },
                        { num: "3 DIAS", label: "IMERSÃO DE ALTO IMPACTO", color: "#00c853" }
                    ].map((stat, i) => (
                        <div key={i} style={{ padding: '20px' }}>
                            <div style={{ fontSize: '42px', fontWeight: 900, color: stat.color, marginBottom: '6px' }}>{stat.num}</div>
                            <div style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px', color: '#88909a' }}>{stat.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Pillars / The Experience */}
            <section style={{ padding: '120px 20px', backgroundColor: '#08090a' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    
                    <div style={{ textAlign: 'center', marginBottom: '80px' }}>
                        <div style={{ fontSize: '12px', fontWeight: 900, color: '#f83821', textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '12px' }}>
                            PORQUÊ PARTICIPAR
                        </div>
                        <h2 style={{ fontSize: 'clamp(32px, 5vw, 54px)', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-1.5px', color: '#fff' }}>
                            O QUE ESPERAR DO <br />
                            <span style={{ color: '#0011fd' }}>FOUNDR EXPERIENCE</span>
                        </h2>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
                        {[
                            {
                                title: "KEYNOTES DE ALTO IMPACTO",
                                desc: "Palestras práticas com quem realmente construiu e escalou empresas milionárias no mercado africano e global.",
                                icon: <Zap color="#f83821" size={28} />,
                                border: "#f83821"
                            },
                            {
                                title: "ALUMNI PITCH BATTLE",
                                desc: "O palco onde os fundadores do FOUNDR FORGE apresentam os seus negócios diretamente a fundos de Venture Capital.",
                                icon: <Award color="#0011fd" size={28} />,
                                border: "#0011fd"
                            },
                            {
                                title: "NETWORKING VIP Á PORTA FECHADA",
                                desc: "Ambiente reservado para conversas francas sobre captação, erros de gestão, expansão e estratégias reais.",
                                icon: <Users color="#eab308" size={28} />,
                                border: "#eab308"
                            },
                            {
                                title: "GALA FOUNDERS OF THE YEAR",
                                desc: "Celebração anual das melhores conquistas, atribuição de prémios e jantar executivo de grande prestígio.",
                                icon: <Star color="#00c853" size={28} />,
                                border: "#00c853"
                            }
                        ].map((pillar, idx) => (
                            <div key={idx} style={{
                                padding: '36px',
                                backgroundColor: '#0f1115',
                                borderRadius: '12px',
                                border: '1px solid rgba(255,255,255,0.06)',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '20px',
                                transition: 'all 0.3s ease'
                            }}>
                                <div style={{ width: '56px', height: '56px', borderRadius: '12px', backgroundColor: 'rgba(255,255,255,0.03)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    {pillar.icon}
                                </div>
                                <h3 style={{ fontSize: '20px', fontWeight: 900, textTransform: 'uppercase', color: '#fff' }}>{pillar.title}</h3>
                                <p style={{ fontSize: '14px', color: '#9098a5', lineHeight: 1.6 }}>{pillar.desc}</p>
                            </div>
                        ))}
                    </div>

                </div>
            </section>

            {/* Speakers Section */}
            <section style={{ padding: '120px 20px', backgroundColor: '#0b0d10' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    
                    <div style={{ textAlign: 'center', marginBottom: '80px' }}>
                        <div style={{ fontSize: '12px', fontWeight: 900, color: '#0011fd', textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '12px' }}>
                            ORADORES E MENTORES
                        </div>
                        <h2 style={{ fontSize: 'clamp(32px, 5vw, 54px)', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-1.5px', color: '#fff' }}>
                            QUEM VAI ESTAR NO PALCO
                        </h2>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '30px' }}>
                        {speakers.map((spk, idx) => (
                            <div key={idx} style={{
                                backgroundColor: '#0f1115',
                                borderRadius: '12px',
                                border: '1px solid rgba(255,255,255,0.06)',
                                overflow: 'hidden',
                                display: 'flex',
                                flexDirection: 'column'
                            }}>
                                <div style={{ width: '100%', height: '280px', position: 'relative' }}>
                                    <img src={spk.image} alt={spk.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    <div style={{
                                        position: 'absolute',
                                        top: '12px',
                                        left: '12px',
                                        backgroundColor: '#f83821',
                                        color: '#fff',
                                        padding: '4px 12px',
                                        borderRadius: '12px',
                                        fontSize: '10px',
                                        fontWeight: 900,
                                        textTransform: 'uppercase'
                                    }}>
                                        {spk.tag}
                                    </div>
                                </div>
                                <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                    <div>
                                        <h3 style={{ fontSize: '20px', fontWeight: 900, color: '#fff', marginBottom: '4px' }}>{spk.name}</h3>
                                        <p style={{ fontSize: '12px', color: '#f83821', fontWeight: 800, textTransform: 'uppercase', marginBottom: '16px' }}>{spk.role} • {spk.company}</p>
                                        <p style={{ fontSize: '13px', color: '#a0a5b1', fontStyle: 'italic', lineHeight: 1.4 }}>"{spk.topic}"</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </section>

            {/* Agenda / Schedule Section */}
            <section id="programacao" style={{ padding: '120px 20px', backgroundColor: '#08090a' }}>
                <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                    
                    <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                        <div style={{ fontSize: '12px', fontWeight: 900, color: '#eab308', textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '12px' }}>
                            PROGRAMAÇÃO COMPLETA
                        </div>
                        <h2 style={{ fontSize: 'clamp(32px, 5vw, 54px)', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-1.5px', color: '#fff' }}>
                            3 DIAS INTENSOS
                        </h2>
                    </div>

                    {/* Day Selector Tabs */}
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '50px', flexWrap: 'wrap' }}>
                        {schedule.map((item) => (
                            <button
                                key={item.day}
                                onClick={() => setActiveDay(item.day)}
                                style={{
                                    padding: '16px 28px',
                                    borderRadius: '12px',
                                    border: activeDay === item.day ? '2px solid #f83821' : '1px solid rgba(255,255,255,0.08)',
                                    backgroundColor: activeDay === item.day ? '#f83821' : 'rgba(255,255,255,0.02)',
                                    color: '#ffffff',
                                    fontSize: '14px',
                                    fontWeight: 900,
                                    textTransform: 'uppercase',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s'
                                }}
                            >
                                DIA {item.day} ({item.date})
                            </button>
                        ))}
                    </div>

                    {/* Selected Day Agenda Cards */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        {schedule.find(s => s.day === activeDay)?.sessions.map((sess, idx) => (
                            <div key={idx} style={{
                                padding: '30px',
                                backgroundColor: '#0f1115',
                                borderRadius: '12px',
                                border: '1px solid rgba(255,255,255,0.06)',
                                display: 'flex',
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                                gap: '24px',
                                alignItems: 'flex-start'
                            }}>
                                <div style={{
                                    minWidth: '140px',
                                    padding: '10px 16px',
                                    backgroundColor: 'rgba(255,255,255,0.03)',
                                    borderRadius: '8px',
                                    fontSize: '13px',
                                    fontWeight: 900,
                                    color: '#f83821',
                                    textAlign: 'center'
                                }}>
                                    {sess.time}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <h3 style={{ fontSize: '20px', fontWeight: 900, color: '#fff', marginBottom: '8px' }}>{sess.title}</h3>
                                    <p style={{ fontSize: '14px', color: '#9098a5', marginBottom: '12px', lineHeight: 1.5 }}>{sess.desc}</p>
                                    <div style={{ fontSize: '12px', fontWeight: 800, color: '#0011fd', textTransform: 'uppercase' }}>
                                        Orador: {sess.speaker}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </section>

            {/* Passes & Pricing Tier Grid */}
            <section style={{ padding: '120px 20px', backgroundColor: '#0b0d10', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
                    
                    <div style={{ textAlign: 'center', marginBottom: '80px' }}>
                        <div style={{ fontSize: '12px', fontWeight: 900, color: '#f83821', textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '12px' }}>
                            BILHETES E INSCRIÇÃO
                        </div>
                        <h2 style={{ fontSize: 'clamp(32px, 5vw, 54px)', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-1.5px', color: '#fff' }}>
                            ESCOLHA A SUA EXPERIÊNCIA
                        </h2>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
                        
                        {/* Alumni Pass */}
                        <div style={{
                            padding: '44px',
                            backgroundColor: '#0f1115',
                            borderRadius: '12px',
                            border: '1px solid rgba(255,255,255,0.08)',
                            display: 'flex',
                            flexDirection: 'column',
                            justify: 'space-between'
                        }}>
                            <div>
                                <span style={{ fontSize: '11px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '2px', color: '#0011fd', marginBottom: '12px', display: 'block' }}>
                                    PASSE GERAL
                                </span>
                                <h3 style={{ fontSize: '32px', fontWeight: 900, textTransform: 'uppercase', marginBottom: '16px', color: '#fff' }}>
                                    ALUMNI PASS
                                </h3>
                                <p style={{ color: '#88909a', fontSize: '14px', marginBottom: '30px' }}>
                                    Ideal para fundadores ativos e ex-alunos que desejam participar dos 2 dias de imersão e networking.
                                </p>
                                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 40px 0', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                                    {[
                                        "Acesso aos 2 Dias Principais do Evento",
                                        "Kit de Boas-Vindas Oficial FOUNDR",
                                        "Acesso ao Sunset Cocktail & Networking",
                                        "Assistir ao Alumni Pitch Battle",
                                        "Certificado Oficial de Participação"
                                    ].map((feat, i) => (
                                        <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', color: '#d1d5db' }}>
                                            <CheckCircle2 size={18} color="#0011fd" />
                                            {feat}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <button
                                onClick={() => { setSelectedTier('ALUMNI'); setIsModalOpen(true); }}
                                style={{
                                    width: '100%',
                                    padding: '20px',
                                    backgroundColor: '#ffffff',
                                    color: '#08090a',
                                    border: 'none',
                                    borderRadius: '12px',
                                    fontSize: '14px',
                                    fontWeight: 900,
                                    textTransform: 'uppercase',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s'
                                }}
                            >
                                GARANTIR ALUMNI PASS
                            </button>
                        </div>

                        {/* Ultra VIP Inner Circle */}
                        <div style={{
                            padding: '44px',
                            backgroundColor: '#121620',
                            borderRadius: '12px',
                            border: '2px solid #f83821',
                            display: 'flex',
                            flexDirection: 'column',
                            justify: 'space-between',
                            position: 'relative',
                            boxShadow: '0 20px 50px rgba(248,56,33,0.15)'
                        }}>
                            <div style={{
                                position: 'absolute',
                                top: '-14px',
                                right: '24px',
                                backgroundColor: '#f83821',
                                color: '#fff',
                                padding: '4px 14px',
                                borderRadius: '12px',
                                fontSize: '10px',
                                fontWeight: 900,
                                textTransform: 'uppercase'
                            }}>
                                EXPERIÊNCIA RECOMENDADA
                            </div>

                            <div>
                                <span style={{ fontSize: '11px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '2px', color: '#f83821', marginBottom: '12px', display: 'block' }}>
                                    INNER CIRCLE
                                </span>
                                <h3 style={{ fontSize: '32px', fontWeight: 900, textTransform: 'uppercase', marginBottom: '16px', color: '#fff' }}>
                                    ULTRA VIP PASS
                                </h3>
                                <p style={{ color: '#a0a5b1', fontSize: '14px', marginBottom: '30px' }}>
                                    Acesso ilimitado de 3 dias com Mastermind Fechado, almoço executivo e mentoria direta com investidores.
                                </p>
                                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 40px 0', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                                    {[
                                        "TUDO INCLUÍDO NO PASSE ALUMNI",
                                        "Acesso ao DIA 3: Mastermind Fechado & Almoço Executivo",
                                        "Assentos VIP nas Primeiras Filas",
                                        "1-on-1 Advisory de Captação com Investidores",
                                        "Acesso ao Grupo Privado Inner Circle Founders"
                                    ].map((feat, i) => (
                                        <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', color: '#ffffff', fontWeight: 600 }}>
                                            <Sparkles size={18} color="#f83821" />
                                            {feat}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <button
                                onClick={() => { setSelectedTier('VIP'); setIsModalOpen(true); }}
                                style={{
                                    width: '100%',
                                    padding: '20px',
                                    backgroundColor: '#f83821',
                                    color: '#ffffff',
                                    border: 'none',
                                    borderRadius: '12px',
                                    fontSize: '14px',
                                    fontWeight: 900,
                                    textTransform: 'uppercase',
                                    cursor: 'pointer',
                                    boxShadow: '0 10px 30px rgba(248,56,33,0.4)',
                                    transition: 'all 0.2s'
                                }}
                            >
                                INSCREVER-SE NO INNER CIRCLE VIP
                            </button>
                        </div>

                    </div>

                </div>
            </section>

            {/* Testimonials */}
            <section style={{ padding: '120px 20px', backgroundColor: '#08090a' }}>
                <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
                    <Star size={44} color="#f83821" fill="#f83821" style={{ marginBottom: '30px' }} />
                    <h2 style={{ fontSize: 'clamp(24px, 4vw, 42px)', fontWeight: 900, lineHeight: 1.3, marginBottom: '40px', color: '#fff' }}>
                        "O FOUNDR EXPERIENCE NÃO É APENAS UM EVENTO — É O CATALISADOR QUE TRANSFORMOU O NOSSO PITCH NUM APOSTA DE $300K POR INVESTIDORES ANJOS."
                    </h2>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
                        <div style={{ width: '56px', height: '56px', borderRadius: '99px', overflow: 'hidden', border: '2px solid #f83821' }}>
                            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200" alt="Alumni" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                        <div style={{ textAlign: 'left' }}>
                            <div style={{ fontSize: '16px', fontWeight: 900, color: '#fff' }}>Mateus Cangue</div>
                            <div style={{ fontSize: '12px', color: '#88909a', fontWeight: 700 }}>CO-FOUNDER @ LOGISTIX AFRIKA • ALUMNI 2025</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section style={{ padding: '100px 20px', backgroundColor: '#0b0d10', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    
                    <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                        <h2 style={{ fontSize: '36px', fontWeight: 900, textTransform: 'uppercase', color: '#fff' }}>
                            PERGUNTAS FREQUENTES
                        </h2>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {faqs.map((faq, idx) => (
                            <div
                                key={idx}
                                onClick={() => toggleFaq(idx)}
                                style={{
                                    padding: '24px',
                                    backgroundColor: '#0f1115',
                                    borderRadius: '12px',
                                    border: '1px solid rgba(255,255,255,0.06)',
                                    cursor: 'pointer'
                                }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#fff' }}>{faq.q}</h3>
                                    <ChevronDown
                                        size={20}
                                        color="#f83821"
                                        style={{
                                            transform: openFaq === idx ? 'rotate(180deg)' : 'rotate(0deg)',
                                            transition: 'transform 0.3s'
                                        }}
                                    />
                                </div>
                                {openFaq === idx && (
                                    <p style={{ marginTop: '16px', fontSize: '14px', color: '#9098a5', lineHeight: 1.6 }}>
                                        {faq.a}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>

                </div>
            </section>

            {/* Final CTA Banner */}
            <section style={{ padding: '120px 20px', backgroundColor: '#f83821', textAlign: 'center', color: '#fff' }}>
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <h2 style={{ fontSize: 'clamp(36px, 6vw, 64px)', fontWeight: 900, textTransform: 'uppercase', lineHeight: 0.95, marginBottom: '24px' }}>
                        ESTÁS PRONTO PARA A PRÓXIMA ETAPA?
                    </h2>
                    <p style={{ fontSize: '18px', fontWeight: 600, marginBottom: '40px', opacity: 0.9 }}>
                        As vagas são estritamente limitadas a 250 participantes para assegurar a qualidade do networking.
                    </p>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        style={{
                            padding: '22px 48px',
                            backgroundColor: '#08090a',
                            color: '#ffffff',
                            border: 'none',
                            borderRadius: '12px',
                            fontSize: '16px',
                            fontWeight: 900,
                            textTransform: 'uppercase',
                            cursor: 'pointer',
                            boxShadow: '0 10px 40px rgba(0,0,0,0.5)'
                        }}
                    >
                        INSCREVER-ME NO FOUNDR EXPERIENCE
                    </button>
                </div>
            </section>

            {/* Modal de Inscrição / RSVP */}
            <AnimatePresence>
                {isModalOpen && (
                    <div style={{
                        position: 'fixed',
                        inset: 0,
                        backgroundColor: 'rgba(0,0,0,0.85)',
                        backdropFilter: 'blur(10px)',
                        zIndex: 100,
                        display: 'flex',
                        alignItems: 'center',
                        justify: 'center',
                        padding: '20px'
                    }}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            style={{
                                width: '100%',
                                maxWidth: '540px',
                                backgroundColor: '#0f1115',
                                borderRadius: '12px',
                                border: '1px solid rgba(255,255,255,0.12)',
                                padding: '40px',
                                position: 'relative',
                                boxShadow: '0 25px 50px rgba(0,0,0,0.8)'
                            }}
                        >
                            <button
                                onClick={() => setIsModalOpen(false)}
                                style={{
                                    position: 'absolute',
                                    top: '20px',
                                    right: '20px',
                                    background: 'none',
                                    border: 'none',
                                    color: '#88909a',
                                    cursor: 'pointer'
                                }}
                            >
                                <X size={24} />
                            </button>

                            <h3 style={{ fontSize: '24px', fontWeight: 900, textTransform: 'uppercase', color: '#fff', marginBottom: '8px' }}>
                                RESERVA DE PASSE
                            </h3>
                            <p style={{ fontSize: '13px', color: '#88909a', marginBottom: '30px' }}>
                                Preencha os seus dados para validar o acesso ao <strong style={{ color: '#f83821' }}>FOUNDR EXPERIENCE 2026</strong> ({selectedTier} PASS).
                            </p>

                            <form onSubmit={(e) => { e.preventDefault(); alert("Inscrição registada com sucesso! A nossa equipa entrará em contacto."); setIsModalOpen(false); }} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                <div>
                                    <label style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#a0a5b1', display: 'block', marginBottom: '6px' }}>Nome Completo</label>
                                    <input
                                        required
                                        type="text"
                                        placeholder="Ex: Carlos Eduardo"
                                        style={{ width: '100%', padding: '14px 18px', backgroundColor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff', outline: 'none', boxSizing: 'border-box' }}
                                    />
                                </div>
                                <div>
                                    <label style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#a0a5b1', display: 'block', marginBottom: '6px' }}>Email Profissional</label>
                                    <input
                                        required
                                        type="email"
                                        placeholder="seu.email@empresa.com"
                                        style={{ width: '100%', padding: '14px 18px', backgroundColor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff', outline: 'none', boxSizing: 'border-box' }}
                                    />
                                </div>
                                <div>
                                    <label style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#a0a5b1', display: 'block', marginBottom: '6px' }}>Nome da Empresa / Startup</label>
                                    <input
                                        required
                                        type="text"
                                        placeholder="Ex: Nexus Solutions"
                                        style={{ width: '100%', padding: '14px 18px', backgroundColor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff', outline: 'none', boxSizing: 'border-box' }}
                                    />
                                </div>
                                <div>
                                    <label style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#a0a5b1', display: 'block', marginBottom: '6px' }}>Contacto WhatsApp</label>
                                    <input
                                        required
                                        type="tel"
                                        placeholder="+244 9..."
                                        style={{ width: '100%', padding: '14px 18px', backgroundColor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff', outline: 'none', boxSizing: 'border-box' }}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    style={{
                                        width: '100%',
                                        padding: '18px',
                                        backgroundColor: '#f83821',
                                        color: '#ffffff',
                                        border: 'none',
                                        borderRadius: '8px',
                                        fontSize: '14px',
                                        fontWeight: 900,
                                        textTransform: 'uppercase',
                                        cursor: 'pointer',
                                        marginTop: '10px'
                                    }}
                                >
                                    CONFIRMAR INSCRIÇÃO
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

        </div>
    );
};

export default FaundrExperiencePage;
