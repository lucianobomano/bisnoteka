import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Briefcase,
    Users,
    Search,
    Sparkles,
    Filter,
    Clock,
    MapPin,
    Building2,
    ArrowRight,
    CheckCircle2,
    Plus,
    X,
    ChevronDown,
    Zap,
    ShieldCheck,
    Globe,
    ChevronLeft,
    ChevronRight,
    ArrowUpRight,
    FileText,
    Star,
    Layers
} from 'lucide-react';

// Data Models
interface Opportunity {
    id: string;
    title: string;
    company: string;
    logo: string;
    category: string;
    type: 'Full-time' | 'Fractional (Part-time)' | 'Contrato / Projeto' | 'Co-Founder';
    location: string;
    mode: '100% Remoto' | 'Híbrido (Luanda)' | 'Presencial (Luanda)';
    salary: string;
    experienceLevel: 'Sênior' | 'Pleno' | 'Executive / C-Level' | 'Junior / Estágio';
    description: string;
    tags: string[];
    postedDate: string;
    isHot?: boolean;
    isVerified?: boolean;
    applicantsCount: number;
}

interface Talent {
    id: string;
    name: string;
    role: string;
    avatar: string;
    category: string;
    rate: string;
    location: string;
    experienceYears: string;
    skills: string[];
    bio: string;
    pastCompany: string;
    rating: number;
    availability: string;
    badgeText: string;
    badgeBg: string;
    badgeTextColor: string;
    frameBg: string;
    borderColor: string;
}

const initialOpportunities: Opportunity[] = [
    {
        id: 'opp-1',
        title: 'Lead Full-Stack Engineer (React & Node.js)',
        company: 'KwanzaPay Fintech',
        logo: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=200',
        category: 'Engenharia & Tech',
        type: 'Full-time',
        location: 'Luanda / Remoto',
        mode: '100% Remoto',
        salary: '1.8M - 2.8M KZ / mês',
        experienceLevel: 'Sênior',
        description: 'Buscamos um Engenheiro de Software Sênior para liderar o desenvolvimento da nova arquitetura de pagamentos instantâneos multimoeda.',
        tags: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'AWS'],
        postedDate: 'Há 2 horas',
        isHot: true,
        isVerified: true,
        applicantsCount: 14
    },
    {
        id: 'opp-2',
        title: 'Fractional Chief Marketing Officer (CMO)',
        company: 'AgriTech Angola',
        logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=200',
        category: 'Marketing & Growth',
        type: 'Fractional (Part-time)',
        location: 'Luanda',
        mode: 'Híbrido (Luanda)',
        salary: '$2,500 - $4,000 / mês (15h/semana)',
        experienceLevel: 'Executive / C-Level',
        description: 'Procuramos um executivo de marketing fracionado para estruturar a estratégia de aquisição B2B e expansão regional para mercados vizinhos.',
        tags: ['Growth Marketing', 'B2B Sales', 'Brand Strategy', 'CAC/LTV'],
        postedDate: 'Há 5 horas',
        isHot: true,
        isVerified: true,
        applicantsCount: 8
    },
    {
        id: 'opp-3',
        title: 'Lead UI/UX Designer & Design Systems',
        company: 'Faundr Studio',
        logo: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=200',
        category: 'Design & UX',
        type: 'Contrato / Projeto',
        location: 'Remoto Global',
        mode: '100% Remoto',
        salary: '1.2M - 1.8M KZ / projeto',
        experienceLevel: 'Pleno',
        description: 'Redesenho completo da plataforma web e aplicação móvel com foco em usabilidade mobile-first e sistema de componentes escalável no Figma.',
        tags: ['Figma', 'Design Systems', 'UX Research', 'Prototipagem'],
        postedDate: 'Há 1 dia',
        isVerified: true,
        applicantsCount: 22
    },
    {
        id: 'opp-4',
        title: 'Co-Founder & Chief Technology Officer (CTO)',
        company: 'LogiX Express (HealthTech)',
        logo: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&q=80&w=200',
        category: 'Co-Founder',
        type: 'Co-Founder',
        location: 'Luanda',
        mode: 'Presencial (Luanda)',
        salary: 'Equity (15% - 25%) + Pro-labore',
        experienceLevel: 'Executive / C-Level',
        description: 'Startup acelerada pelo Faundr Forge busca co-fundador técnico para liderar o desenvolvimento da plataforma logística de distribuição médica.',
        tags: ['Equity', 'Startup Founding', 'System Architecture', 'Mobile'],
        postedDate: 'Há 2 dias',
        isHot: true,
        isVerified: true,
        applicantsCount: 6
    },
    {
        id: 'opp-5',
        title: 'Product Operations & Data Analyst',
        company: 'Bisnoteka Labs',
        logo: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?auto=format&fit=crop&q=80&w=200',
        category: 'Produto & Operações',
        type: 'Full-time',
        location: 'Luanda',
        mode: 'Híbrido (Luanda)',
        salary: '900k - 1.4M KZ / mês',
        experienceLevel: 'Pleno',
        description: 'Responsável pela análise de dados de retenção de utilizadores, otimização do funil de conversão e gestão do roadmap de produto.',
        tags: ['SQL', 'Mixpanel', 'Product Analytics', 'Agile'],
        postedDate: 'Há 3 dias',
        isVerified: true,
        applicantsCount: 19
    },
    {
        id: 'opp-6',
        title: 'Grant de Aceleração & Mentoria ($10k)',
        company: 'Faundr Impact Fund',
        logo: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&q=80&w=200',
        category: 'Grants & Aceleração',
        type: 'Contrato / Projeto',
        location: 'Angola',
        mode: '100% Remoto',
        salary: 'Fundo Perdido ($10,000 USD)',
        experienceLevel: 'Junior / Estágio',
        description: 'Programa de financiamento e aceleração de 12 semanas para startups em estágio pré-seed com protótipo funcional.',
        tags: ['Grant', 'Aceleração', 'Pitch', 'Incubação'],
        postedDate: 'Há 4 dias',
        isHot: true,
        isVerified: true,
        applicantsCount: 45
    }
];

const featuredTalents: Talent[] = [
    {
        id: 'tal-1',
        name: 'Lauren',
        role: 'Graphic Designer',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600',
        category: 'Design & UX',
        rate: '$40 / hora',
        location: 'Luanda / Remoto',
        experienceYears: '6 anos exp.',
        skills: ['Branding', 'Figma', 'Visual Design'],
        bio: 'Especialista em branding visual e identidade corporativa para startups de tecnologia.',
        pastCompany: 'Prev. @ R/GA',
        rating: 4.9,
        availability: 'Disponível',
        badgeText: 'GRAPHIC DESIGNER',
        badgeBg: '#00e676',
        badgeTextColor: '#012e14',
        frameBg: '#032514',
        borderColor: '#07542d'
    },
    {
        id: 'tal-2',
        name: 'Henry',
        role: 'Back End Dev',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600',
        category: 'Engenharia & Tech',
        rate: '$55 / hora',
        location: 'Remoto',
        experienceYears: '8 anos exp.',
        skills: ['Node.js', 'Python', 'PostgreSQL', 'AWS'],
        bio: 'Arquiteto de sistemas distribuídos e microserviços de alta performance.',
        pastCompany: 'Prev. @ Meta',
        rating: 5.0,
        availability: 'Disponível',
        badgeText: 'BACK END DEV',
        badgeBg: '#00b0ff',
        badgeTextColor: '#01223d',
        frameBg: '#061d33',
        borderColor: '#0c4373'
    },
    {
        id: 'tal-3',
        name: 'Sarah',
        role: 'UI Designer',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600',
        category: 'Design & UX',
        rate: '$50 / hora',
        location: 'Luanda',
        experienceYears: '7 anos exp.',
        skills: ['Figma', 'UI/UX', 'Design Systems'],
        bio: 'Designer de interfaces premiada, especializada em produtos mobile e SaaS.',
        pastCompany: 'Prev. @ Apple',
        rating: 5.0,
        availability: 'Disponível',
        badgeText: 'UI DESIGNER',
        badgeBg: '#ff1744',
        badgeTextColor: '#3d0009',
        frameBg: '#40060e',
        borderColor: '#820e1e'
    },
    {
        id: 'tal-4',
        name: 'Jeff',
        role: 'Marketer',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=600',
        category: 'Marketing & Growth',
        rate: '$45 / hora',
        location: 'Remoto',
        experienceYears: '9 anos exp.',
        skills: ['Growth', 'Paid Media', 'GTM Strategy'],
        bio: 'Especialista em escala de aquisição B2B e campanhas globais de marketing.',
        pastCompany: 'Prev. @ PepsiCo',
        rating: 4.9,
        availability: 'Disponível',
        badgeText: 'MARKETER',
        badgeBg: '#651fff',
        badgeTextColor: '#1b054a',
        frameBg: '#160a33',
        borderColor: '#3d1b85'
    },
    {
        id: 'tal-5',
        name: 'Harry',
        role: 'Project Manager',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=600',
        category: 'Produto & Operações',
        rate: '$48 / hora',
        location: 'Luanda',
        experienceYears: '6 anos exp.',
        skills: ['Agile', 'Scrum', 'Product Ops'],
        bio: 'Gestor de projetos focado em execução rápida, liderança de equipas e entregas sem atrito.',
        pastCompany: 'Prev. @ Ramp',
        rating: 4.8,
        availability: 'Disponível',
        badgeText: 'PROJECT MANAGER',
        badgeBg: '#d500f9',
        badgeTextColor: '#380042',
        frameBg: '#300524',
        borderColor: '#6b0c50'
    }
];

const OpportunitiesPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'jobs' | 'talents'>('jobs');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Todas');
    const [selectedMode, setSelectedMode] = useState('Todos');
    const [selectedLevel, setSelectedLevel] = useState('Todos');
    const [isMobile, setIsMobile] = useState(false);
    
    // Ref for section cards slider
    const scrollContainerRef = React.useRef<HTMLDivElement>(null);

    const scrollCards = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = direction === 'left' ? -504 : 504;
            scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };
    
    // Modals
    const [showApplyModal, setShowApplyModal] = useState(false);
    const [selectedOpp, setSelectedOpp] = useState<Opportunity | null>(null);
    const [showPostJobModal, setShowPostJobModal] = useState(false);

    // Form States
    const [applyForm, setApplyForm] = useState({
        name: '',
        email: '',
        phone: '',
        portfolio: '',
        notes: ''
    });

    const [newJobForm, setNewJobForm] = useState({
        title: '',
        company: '',
        category: 'Engenharia & Tech',
        type: 'Full-time',
        mode: '100% Remoto',
        salary: '',
        location: 'Luanda / Remoto',
        description: '',
        tags: ''
    });

    const [isSubmitted, setIsSubmitted] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Filtered Jobs
    const filteredJobs = useMemo(() => {
        return initialOpportunities.filter(opp => {
            const matchesSearch = opp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                opp.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                opp.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                opp.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));

            const matchesCategory = selectedCategory === 'Todas' || opp.category === selectedCategory;
            const matchesMode = selectedMode === 'Todos' || opp.mode.includes(selectedMode);
            const matchesLevel = selectedLevel === 'Todos' || opp.experienceLevel === selectedLevel;

            return matchesSearch && matchesCategory && matchesMode && matchesLevel;
        });
    }, [searchTerm, selectedCategory, selectedMode, selectedLevel]);

    const handleApplySubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitted(true);
        setTimeout(() => {
            setIsSubmitted(false);
            setShowApplyModal(false);
            setApplyForm({ name: '', email: '', phone: '', portfolio: '', notes: '' });
            alert(`Candidatura submetida com sucesso para "${selectedOpp?.title}"! Nossa equipa entrará em contacto em menos de 48 horas.`);
        }, 1200);
    };

    const handlePostJobSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setShowPostJobModal(false);
        alert("Oportunidade submetida para curadoria! Após a verificação em < 24h, estará visível na rede de talentos.");
        setNewJobForm({ title: '', company: '', category: 'Engenharia & Tech', type: 'Full-time', mode: '100% Remoto', salary: '', location: 'Luanda / Remoto', description: '', tags: '' });
    };

    const categories = [
        'Todas',
        'Engenharia & Tech',
        'Design & UX',
        'Marketing & Growth',
        'Produto & Operações',
        'Co-Founder',
        'Grants & Aceleração'
    ];

    return (
        <div style={{ backgroundColor: '#090a0f', minHeight: '100vh', color: '#ffffff', fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif' }}>
            
            {/* 1. HERO SECTION & EXACT PROFILE CARDS (Pangea.app exact design) */}
            <section style={{
                backgroundColor: '#07080c',
                padding: isMobile ? '70px 20px 50px' : '100px 20px 80px',
                position: 'relative',
                textAlign: 'center',
                overflow: 'hidden',
                backgroundImage: 'radial-gradient(circle at 50% 25%, rgba(255,255,255,0.03) 0%, transparent 70%)'
            }}>
                {/* Nuvem de Fumo / Smoke Glow Overlay */}
                <div style={{
                    position: 'absolute',
                    top: '-5%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '100%',
                    maxWidth: '1400px',
                    height: '100%',
                    background: 'radial-gradient(ellipse at center, rgba(0, 163, 255, 0.05) 0%, rgba(248, 56, 33, 0.03) 40%, transparent 75%)',
                    pointerEvents: 'none',
                    filter: 'blur(100px)'
                }}></div>

                <div style={{ maxWidth: '1600px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
                    
                    {/* Cyan Monospace Top Pill Badge */}
                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '6px 16px',
                        backgroundColor: 'rgba(0, 163, 255, 0.1)',
                        border: '1px solid rgba(0, 163, 255, 0.3)',
                        borderRadius: '9999px',
                        fontSize: '11px',
                        fontFamily: '"JetBrains Mono", monospace',
                        fontWeight: 700,
                        color: '#00a3ff',
                        letterSpacing: '1.5px',
                        textTransform: 'uppercase',
                        marginBottom: '32px'
                    }}>
                        BUILD FASTER WITH FRACTIONAL HIRING
                    </div>

                    {/* Main Headline */}
                    <h1 style={{
                        fontSize: isMobile ? '42px' : '98px',
                        fontWeight: 400,
                        letterSpacing: '-3px',
                        lineHeight: 1.0,
                        marginBottom: '28px',
                        color: '#ffffff',
                        fontFamily: '"Plus Jakarta Sans", "Inter", sans-serif'
                    }}>
                        Hire high <br style={{ display: isMobile ? 'none' : 'block' }} />
                        quality humans
                    </h1>

                    {/* Subtitle */}
                    <p style={{
                        fontSize: isMobile ? '16px' : '20px',
                        color: '#94a3b8',
                        maxWidth: '720px',
                        margin: '0 auto 40px',
                        lineHeight: 1.6,
                        fontWeight: 400
                    }}>
                        The best marketing, design, ops, and engineering operators in the world, ready to hire in 24 hours. AI-supported, human selected, and flexible to work with.
                    </p>

                    {/* Start Hiring Button (Full Cyan Pill Button) */}
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '40px' }}>
                        <button
                            onClick={() => {
                                const feedSection = document.getElementById('marketplace-feed');
                                feedSection?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            style={{
                                backgroundColor: '#00a3ff',
                                color: '#07080c',
                                border: 'none',
                                padding: '16px 36px',
                                borderRadius: '9999px',
                                fontSize: '16px',
                                fontWeight: 800,
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                boxShadow: '0 0 35px rgba(0, 163, 255, 0.4)',
                                transition: 'all 0.25s ease'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
                                e.currentTarget.style.backgroundColor = '#38bdf8';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                                e.currentTarget.style.backgroundColor = '#00a3ff';
                            }}
                        >
                            Start Hiring <ArrowRight size={18} />
                        </button>
                    </div>

                    {/* Backed by Y Combinator Badge */}
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: '#64748b', marginBottom: '50px' }}>
                        <span>Backed by</span>
                        <div style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            backgroundColor: '#ffffff',
                            color: '#000000',
                            padding: '4px 10px',
                            borderRadius: '4px',
                            fontWeight: 900,
                            fontSize: '13px'
                        }}>
                            <span style={{ backgroundColor: '#ff6600', color: '#ffffff', padding: '1px 5px', borderRadius: '2px', fontWeight: 900 }}>Y</span> Combinator
                        </div>
                    </div>

                    {/* 5 PROFILE CARDS DIRECTLY BELOW YCOMBINATOR (EXACT PANGEA REPLICA) */}
                    <div
                        style={{
                            display: 'flex',
                            justify: 'center',
                            alignItems: 'center',
                            gap: isMobile ? '20px' : '50px',
                            padding: '24px 0 10px',
                            margin: '0 auto',
                            width: '100%',
                            maxWidth: '1600px',
                            flexWrap: 'nowrap',
                            boxSizing: 'border-box'
                        }}
                    >
                        {featuredTalents.map((talent) => (
                            <motion.div
                                key={talent.id}
                                whileHover={{ y: -6, scale: 1.02 }}
                                style={{
                                    width: isMobile ? '220px' : '278px',
                                    height: isMobile ? '310px' : '370px',
                                    backgroundColor: talent.frameBg,
                                    border: `2px solid ${talent.borderColor}`,
                                    borderRadius: '20px',
                                    padding: '12px',
                                    position: 'relative',
                                    boxSizing: 'border-box',
                                    flexShrink: 0,
                                    boxShadow: '0 20px 40px rgba(0,0,0,0.8)',
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                {/* Inner Image Wrapper */}
                                <div style={{
                                    width: '100%',
                                    height: '100%',
                                    borderRadius: '12px',
                                    overflow: 'hidden',
                                    position: 'relative'
                                }}>
                                    {/* Category Badge Inside Card at Top Center of Inner Photo */}
                                    <div style={{
                                        position: 'absolute',
                                        top: '0',
                                        left: '50%',
                                        transform: 'translateX(-50%)',
                                        backgroundColor: talent.badgeBg,
                                        color: talent.badgeTextColor,
                                        padding: '4px 14px',
                                        borderRadius: '0 0 6px 6px',
                                        fontSize: '10px',
                                        fontFamily: '"JetBrains Mono", "Courier New", monospace',
                                        fontWeight: 900,
                                        letterSpacing: '0.8px',
                                        whiteSpace: 'nowrap',
                                        zIndex: 10,
                                        boxShadow: '0 2px 8px rgba(0,0,0,0.6)'
                                    }}>
                                        {talent.badgeText}
                                    </div>

                                    <img
                                        src={talent.avatar}
                                        alt={talent.name}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover'
                                        }}
                                    />

                                    {/* Bottom Gradient Fade with Name & Previous Company */}
                                    <div style={{
                                        position: 'absolute',
                                        bottom: 0,
                                        left: 0,
                                        right: 0,
                                        padding: '24px 16px 16px',
                                        background: 'linear-gradient(to top, #000000 0%, rgba(0,0,0,0.75) 50%, transparent 100%)',
                                        textAlign: 'left',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '2px'
                                    }}>
                                        <h3 style={{
                                            fontSize: '26px',
                                            fontWeight: 700,
                                            color: '#ffffff',
                                            margin: 0,
                                            letterSpacing: '-0.5px',
                                            fontFamily: '"Plus Jakarta Sans", sans-serif'
                                        }}>
                                            {talent.name}
                                        </h3>
                                        <span style={{
                                            fontSize: '12px',
                                            color: '#e2e8f0',
                                            fontWeight: 500
                                        }}>
                                            {talent.pastCompany}
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                </div>
            </section>

            {/* 2. TRUSTED BY LEADING COMPANIES BAR */}
            <section style={{
                backgroundColor: '#090a0f',
                padding: '40px 20px 60px',
                borderBottom: '1px solid rgba(255,255,255,0.06)'
            }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
                    <span style={{
                        fontSize: '11px',
                        fontFamily: '"JetBrains Mono", monospace',
                        fontWeight: 800,
                        letterSpacing: '2px',
                        color: '#64748b',
                        textTransform: 'uppercase'
                    }}>
                        TRUSTED BY LEADING COMPANIES
                    </span>

                    <div style={{
                        display: 'flex',
                        justify: 'center',
                        alignItems: 'center',
                        gap: isMobile ? '24px' : '50px',
                        flexWrap: 'wrap',
                        marginTop: '30px',
                        opacity: 0.65
                    }}>
                        {['Project Fortress', 'BECHTEL', 'Ratio', 'eztrackr', 'SecurityScorecard', 'Pabau', 'gaia', 'LuxCitizenship', 'Riipen'].map((brand, idx) => (
                            <span key={idx} style={{ fontSize: '16px', fontWeight: 800, color: '#ffffff', letterSpacing: '1px' }}>
                                {brand}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* 3. ACCESS THE TALENT YOU NEED SECTION */}
            <section style={{
                backgroundColor: '#07080b',
                paddingTop: isMobile ? '60px' : '100px',
                paddingBottom: isMobile ? '60px' : '100px',
                paddingLeft: isMobile ? '20px' : '473px',
                paddingRight: '0px',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
                boxSizing: 'border-box'
            }}>
                {/* Header with Title & Controls */}
                <div style={{
                    display: 'flex',
                    justify: 'space-between',
                    alignItems: 'flex-end',
                    marginBottom: '48px',
                    paddingRight: isMobile ? '20px' : '60px',
                    flexWrap: 'wrap',
                    gap: '20px'
                }}>
                    <div>
                        {/* Small Orange Top Monospace Badge */}
                        <div style={{
                            display: 'inline-block',
                            padding: '4px 10px',
                            backgroundColor: 'rgba(255, 85, 0, 0.12)',
                            border: '1px solid rgba(255, 85, 0, 0.3)',
                            borderRadius: '4px',
                            fontSize: '10px',
                            fontFamily: '"JetBrains Mono", monospace',
                            fontWeight: 800,
                            color: '#ff5500',
                            letterSpacing: '1.5px',
                            textTransform: 'uppercase',
                            marginBottom: '16px'
                        }}>
                            PICK FROM HIGH-QUALITY FRACTIONAL TALENT
                        </div>

                        <h2 style={{
                            fontSize: isMobile ? '36px' : '64px',
                            fontWeight: 400,
                            color: '#ffffff',
                            fontFamily: '"Plus Jakarta Sans", sans-serif',
                            margin: 0,
                            lineHeight: 1.05,
                            letterSpacing: '-1.5px'
                        }}>
                            Access the <br />
                            talent you need
                        </h2>

                        <p style={{
                            color: '#94a3b8',
                            fontSize: isMobile ? '14px' : '16px',
                            maxWidth: '520px',
                            marginTop: '16px',
                            lineHeight: 1.5,
                            fontWeight: 400
                        }}>
                            Interview curated candidates for every role you're hiring for, hand-picked to select the world's best fractional talent
                        </p>
                    </div>

                    {/* Navigation Arrows */}
                    <div style={{ display: 'flex', gap: '12px' }}>
                        <button 
                            onClick={() => scrollCards('left')}
                            style={{
                                width: '48px',
                                height: '48px',
                                borderRadius: '50%',
                                backgroundColor: 'rgba(255,255,255,0.04)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                color: '#ffffff',
                                display: 'flex',
                                alignItems: 'center',
                                justify: 'center',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.04)'}
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <button 
                            onClick={() => scrollCards('right')}
                            style={{
                                width: '48px',
                                height: '48px',
                                borderRadius: '50%',
                                backgroundColor: 'rgba(255,255,255,0.04)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                color: '#ffffff',
                                display: 'flex',
                                alignItems: 'center',
                                justify: 'center',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.04)'}
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>

                {/* Cards Container (480x480px Cards with horizontal scroll) */}
                <div 
                    ref={scrollContainerRef}
                    style={{
                        display: 'flex',
                        gap: '24px',
                        overflowX: 'auto',
                        scrollBehavior: 'smooth',
                        paddingRight: isMobile ? '20px' : '60px',
                        paddingBottom: '20px',
                        msOverflowStyle: 'none',
                        scrollbarWidth: 'none'
                    }}
                >
                    {[
                        {
                            badge: 'FRACTIONAL MARKETERS',
                            title: 'Marketing',
                            desc: 'From GTM Strategy, to Growth Management, to Social Media Management',
                            bgImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=800'
                        },
                        {
                            badge: 'FRACTIONAL DESIGNERS',
                            title: 'Design',
                            desc: 'The graphic, UI/UX, and content designers you need to differentiate your company',
                            bgImage: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=800'
                        },
                        {
                            badge: 'FRACTIONAL OPS PROS',
                            title: 'Operations',
                            desc: 'Project + Product Managers to keep your team running smoothly',
                            bgImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800'
                        },
                        {
                            badge: 'FRACTIONAL DEVELOPERS',
                            title: 'Engineering',
                            desc: 'Front-End, Back-End, Full-Stack, and Mobile developers to build your tech stack',
                            bgImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800'
                        },
                        {
                            badge: 'FRACTIONAL PRODUCT MANAGERS',
                            title: 'Product',
                            desc: 'Strategic product leaders to drive roadmap, user research, and feature execution',
                            bgImage: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=800'
                        }
                    ].map((card, idx) => (
                        <motion.div
                            key={idx}
                            whileHover={{ y: -6 }}
                            style={{
                                width: isMobile ? '320px' : '480px',
                                height: isMobile ? '380px' : '480px',
                                minWidth: isMobile ? '320px' : '480px',
                                minHeight: isMobile ? '380px' : '480px',
                                backgroundColor: '#11131a',
                                borderRadius: '20px',
                                padding: isMobile ? '28px 24px' : '40px 36px',
                                border: '1px solid rgba(255,255,255,0.08)',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                position: 'relative',
                                overflow: 'hidden',
                                boxSizing: 'border-box',
                                flexShrink: 0,
                                boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
                            }}
                        >
                            {/* Dark Grayscale Atmospheric Image Background */}
                            <div style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                height: '70%',
                                backgroundImage: `url(${card.bgImage})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                opacity: 0.18,
                                filter: 'grayscale(100%) contrast(130%)',
                                pointerEvents: 'none',
                                maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)',
                                WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)'
                            }} />

                            {/* Top Content: Monospace Badge */}
                            <div style={{ position: 'relative', zIndex: 2 }}>
                                <span style={{
                                    display: 'inline-block',
                                    padding: '4px 10px',
                                    backgroundColor: 'rgba(255, 85, 0, 0.12)',
                                    border: '1px solid rgba(255, 85, 0, 0.3)',
                                    borderRadius: '4px',
                                    fontSize: '10px',
                                    fontFamily: '"JetBrains Mono", monospace',
                                    fontWeight: 800,
                                    color: '#ff5500',
                                    letterSpacing: '1.2px',
                                    textTransform: 'uppercase'
                                }}>
                                    {card.badge}
                                </span>
                            </div>

                            {/* Bottom Content: Title, Description, and Learn More Button */}
                            <div style={{ position: 'relative', zIndex: 2 }}>
                                <h3 style={{
                                    fontSize: isMobile ? '28px' : '36px',
                                    fontWeight: 500,
                                    color: '#ffffff',
                                    margin: '0 0 12px 0',
                                    fontFamily: '"Plus Jakarta Sans", sans-serif',
                                    letterSpacing: '-0.5px'
                                }}>
                                    {card.title}
                                </h3>

                                <p style={{
                                    fontSize: isMobile ? '13px' : '15px',
                                    color: '#94a3b8',
                                    lineHeight: 1.55,
                                    margin: '0 0 28px 0',
                                    maxWidth: '380px'
                                }}>
                                    {card.desc}
                                </p>

                                <button style={{
                                    backgroundColor: '#ff5500',
                                    color: '#000000',
                                    border: 'none',
                                    padding: '12px 24px',
                                    borderRadius: '9999px',
                                    fontSize: '14px',
                                    fontWeight: 700,
                                    cursor: 'pointer',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    transition: 'all 0.2s ease'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = '#ff6b1a';
                                    e.currentTarget.style.transform = 'translateY(-1px)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = '#ff5500';
                                    e.currentTarget.style.transform = 'translateY(0)';
                                }}
                                >
                                    Learn More <ArrowRight size={16} />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </section>

            {/* 4. BUILD WITH PANGEANS, GROW WITH PANGEA SECTION (Exatamente como Screenshot 5) */}
            <section style={{
                backgroundColor: '#090a0f',
                padding: isMobile ? '60px 20px' : '100px 40px',
                borderBottom: '1px solid rgba(255,255,255,0.06)'
            }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    
                    <div style={{
                        display: 'flex',
                        justify: 'space-between',
                        alignItems: 'flex-end',
                        marginBottom: '50px',
                        flexWrap: 'wrap',
                        gap: '20px'
                    }}>
                        <div>
                            <h2 style={{
                                fontSize: isMobile ? '32px' : '52px',
                                fontWeight: 400,
                                color: '#ffffff',
                                fontFamily: '"Plus Jakarta Sans", sans-serif',
                                margin: 0,
                                lineHeight: 1.15
                            }}>
                                Build with Pangeans, <br />
                                grow with Pangea
                            </h2>

                            <p style={{
                                color: '#94a3b8',
                                fontSize: '16px',
                                maxWidth: '560px',
                                marginTop: '14px',
                                lineHeight: 1.5
                            }}>
                                Expand your team's capabilities quickly with high-quality operators from Pangea's private talent network, available in 48 or less
                            </p>
                        </div>

                        {/* Navigation Arrows */}
                        <div style={{ display: 'flex', gap: '12px' }}>
                            <button style={{
                                width: '44px',
                                height: '44px',
                                borderRadius: '50%',
                                backgroundColor: 'rgba(255,255,255,0.05)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                color: '#ffffff',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer'
                            }}>
                                <ChevronLeft size={20} />
                            </button>
                            <button style={{
                                width: '44px',
                                height: '44px',
                                borderRadius: '50%',
                                backgroundColor: 'rgba(255,255,255,0.05)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                color: '#ffffff',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer'
                            }}>
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    </div>

                    {/* Cards Grid (Cyan Monospace Badges) */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
                        gap: '24px'
                    }}>
                        {[
                            {
                                badge: 'BLUE-CHIP TALENT',
                                title: 'High-quality humans',
                                desc: "Access the world's best fractional talent from over 170 countries, prestigious universities, and blue-chip companies."
                            },
                            {
                                badge: 'AI-NATIVE WORKFLOWS',
                                title: 'Cutting-edge operators',
                                desc: 'Incorporate the latest in AI advancements into your workflow with expert operators who know what tools are right for your team.'
                            },
                            {
                                badge: 'FRACTIONAL PROS',
                                title: 'Ready for fractional work',
                                desc: 'Work with talent who anticipate the changes and flexibility that come with competing in today\'s market.'
                            }
                        ].map((card, idx) => (
                            <div
                                key={idx}
                                style={{
                                    backgroundColor: '#12141c',
                                    borderRadius: '16px',
                                    padding: '36px 30px',
                                    border: '1px solid rgba(255,255,255,0.08)',
                                    backgroundImage: 'radial-gradient(circle at top left, rgba(0,163,255,0.03) 0%, transparent 60%)'
                                }}
                            >
                                <span style={{
                                    fontSize: '10px',
                                    fontFamily: '"JetBrains Mono", monospace',
                                    fontWeight: 800,
                                    color: '#00a3ff',
                                    letterSpacing: '1px',
                                    textTransform: 'uppercase'
                                }}>
                                    {card.badge}
                                </span>

                                <h3 style={{
                                    fontSize: '26px',
                                    fontWeight: 500,
                                    color: '#ffffff',
                                    margin: '16px 0 12px',
                                    fontFamily: '"Plus Jakarta Sans", sans-serif'
                                }}>
                                    {card.title}
                                </h3>

                                <p style={{ fontSize: '14px', color: '#94a3b8', lineHeight: 1.6 }}>
                                    {card.desc}
                                </p>
                            </div>
                        ))}
                    </div>

                </div>
            </section>

            {/* 5. INTERACTIVE MARKETPLACE FEED & LIVE SEARCH (VAGAS E TALENTOS) */}
            <section id="marketplace-feed" style={{
                maxWidth: '1200px',
                margin: '0 auto',
                padding: isMobile ? '60px 20px' : '100px 40px'
            }}>
                
                {/* Tab Switcher (Vagas vs Talentos) */}
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '40px' }}>
                    <div style={{
                        display: 'flex',
                        backgroundColor: '#12141c',
                        padding: '6px',
                        borderRadius: '9999px',
                        border: '1px solid rgba(255,255,255,0.1)',
                        gap: '6px'
                    }}>
                        <button
                            onClick={() => setActiveTab('jobs')}
                            style={{
                                padding: '14px 32px',
                                borderRadius: '9999px',
                                fontSize: '14px',
                                fontWeight: 800,
                                border: 'none',
                                backgroundColor: activeTab === 'jobs' ? '#00a3ff' : 'transparent',
                                color: activeTab === 'jobs' ? '#07080c' : '#94a3b8',
                                cursor: 'pointer',
                                transition: 'all 0.25s',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                            }}
                        >
                            <Briefcase size={18} /> VAGAS & PROJETOS ABERTOS ({filteredJobs.length})
                        </button>

                        <button
                            onClick={() => setActiveTab('talents')}
                            style={{
                                padding: '14px 32px',
                                borderRadius: '9999px',
                                fontSize: '14px',
                                fontWeight: 800,
                                border: 'none',
                                backgroundColor: activeTab === 'talents' ? '#00a3ff' : 'transparent',
                                color: activeTab === 'talents' ? '#07080c' : '#94a3b8',
                                cursor: 'pointer',
                                transition: 'all 0.25s',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                            }}
                        >
                            <Users size={18} /> TALENTOS FRACIONADOS ({featuredTalents.length})
                        </button>
                    </div>
                </div>

                {/* Filter Control Box */}
                <div style={{
                    backgroundColor: '#12141c',
                    padding: '24px',
                    borderRadius: '16px',
                    border: '1px solid rgba(255,255,255,0.1)',
                    marginBottom: '40px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px'
                }}>
                    {/* Search Input */}
                    <div style={{ position: 'relative' }}>
                        <Search size={20} color="#64748b" style={{ position: 'absolute', left: '18px', top: '50%', transform: 'translateY(-50%)' }} />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder={activeTab === 'jobs' ? "Buscar por cargo, tecnologia (React, Figma, Growth), startup..." : "Buscar talentos por competência, nome ou tecnologia..."}
                            style={{
                                width: '100%',
                                padding: '16px 20px 16px 52px',
                                fontSize: '15px',
                                backgroundColor: '#090a0f',
                                border: '1px solid rgba(255,255,255,0.12)',
                                borderRadius: '12px',
                                outline: 'none',
                                color: '#ffffff',
                                boxSizing: 'border-box'
                            }}
                        />
                    </div>

                    {/* Filter Pills */}
                    <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '6px' }}>
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                style={{
                                    padding: '10px 18px',
                                    borderRadius: '9999px',
                                    fontSize: '13px',
                                    fontWeight: 700,
                                    whiteSpace: 'nowrap',
                                    border: selectedCategory === cat ? '1px solid #00a3ff' : '1px solid rgba(255,255,255,0.1)',
                                    backgroundColor: selectedCategory === cat ? '#00a3ff' : 'rgba(255,255,255,0.03)',
                                    color: selectedCategory === cat ? '#07080c' : '#94a3b8',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s'
                                }}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* FEED DE OPORTUNIDADES */}
                {activeTab === 'jobs' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        {filteredJobs.map(opp => (
                            <motion.div
                                key={opp.id}
                                whileHover={{ y: -3, borderColor: 'rgba(0,163,255,0.4)' }}
                                style={{
                                    backgroundColor: '#12141c',
                                    borderRadius: '16px',
                                    border: '1px solid rgba(255,255,255,0.08)',
                                    padding: isMobile ? '20px' : '28px',
                                    display: 'flex',
                                    flexDirection: isMobile ? 'column' : 'row',
                                    justify: 'space-between',
                                    alignItems: isMobile ? 'flex-start' : 'center',
                                    gap: '24px',
                                    transition: 'all 0.25s ease'
                                }}
                            >
                                <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                                    <img src={opp.logo} alt={opp.company} style={{ width: '60px', height: '60px', borderRadius: '12px', objectFit: 'cover' }} />
                                    <div>
                                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '6px' }}>
                                            <span style={{ fontSize: '13px', fontWeight: 800, color: '#00a3ff' }}>{opp.company}</span>
                                            {opp.isVerified && (
                                                <span style={{ fontSize: '10px', fontWeight: 800, backgroundColor: 'rgba(0,200,83,0.15)', color: '#00c853', padding: '3px 8px', borderRadius: '9999px' }}>
                                                    VERIFICADA FAUNDR
                                                </span>
                                            )}
                                        </div>

                                        <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#ffffff', marginBottom: '8px' }}>
                                            {opp.title}
                                        </h3>

                                        <p style={{ fontSize: '14px', color: '#94a3b8', marginBottom: '16px', maxWidth: '700px', lineHeight: 1.5 }}>
                                            {opp.description}
                                        </p>

                                        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                                            <span style={{ fontSize: '12px', backgroundColor: 'rgba(255,255,255,0.05)', color: '#cbd5e1', padding: '4px 12px', borderRadius: '9999px' }}>
                                                {opp.type}
                                            </span>
                                            <span style={{ fontSize: '12px', backgroundColor: 'rgba(0,163,255,0.1)', color: '#00a3ff', padding: '4px 12px', borderRadius: '9999px', fontWeight: 700 }}>
                                                {opp.salary}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={() => { setSelectedOpp(opp); setShowApplyModal(true); }}
                                    style={{
                                        backgroundColor: '#00a3ff',
                                        color: '#07080c',
                                        border: 'none',
                                        padding: '14px 28px',
                                        borderRadius: '9999px',
                                        fontSize: '13px',
                                        fontWeight: 800,
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        whiteSpace: 'nowrap'
                                    }}
                                >
                                    CANDIDATAR-SE <ArrowRight size={16} />
                                </button>
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* FEED DE TALENTOS */}
                {activeTab === 'talents' && (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
                        {featuredTalents.map(talent => (
                            <div
                                key={talent.id}
                                style={{
                                    backgroundColor: talent.frameBg,
                                    borderRadius: '16px',
                                    border: `1px solid ${talent.borderColor}`,
                                    padding: '28px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justify: 'space-between'
                                }}
                            >
                                <div>
                                    <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '16px' }}>
                                        <img src={talent.avatar} alt={talent.name} style={{ width: '56px', height: '56px', borderRadius: '12px', objectFit: 'cover' }} />
                                        <div>
                                            <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#ffffff', margin: 0 }}>{talent.name}</h3>
                                            <span style={{ fontSize: '12px', color: talent.badgeBg, fontWeight: 700 }}>{talent.role}</span>
                                            <div style={{ fontSize: '11px', color: '#94a3b8' }}>{talent.pastCompany}</div>
                                        </div>
                                    </div>

                                    <p style={{ fontSize: '13px', color: '#cbd5e1', lineHeight: 1.5, marginBottom: '20px' }}>
                                        "{talent.bio}"
                                    </p>

                                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '20px' }}>
                                        {talent.skills.map((skill, i) => (
                                            <span key={i} style={{ fontSize: '11px', backgroundColor: 'rgba(255,255,255,0.05)', color: '#cbd5e1', padding: '3px 8px', borderRadius: '4px' }}>
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <button
                                    onClick={() => alert(`Solicitação de entrevista enviada para ${talent.name}!`)}
                                    style={{
                                        backgroundColor: 'rgba(255,255,255,0.05)',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        color: '#ffffff',
                                        padding: '12px',
                                        borderRadius: '9999px',
                                        fontSize: '13px',
                                        fontWeight: 700,
                                        cursor: 'pointer',
                                        textAlign: 'center'
                                    }}
                                >
                                    SOLICITAR ENTREVISTA
                                </button>
                            </div>
                        ))}
                    </div>
                )}

            </section>

            {/* MODAL DE CANDIDATURA À VAGA */}
            <AnimatePresence>
                {showApplyModal && selectedOpp && (
                    <motion.div
                        key="apply-modal"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(7,8,12,0.85)', backdropFilter: 'blur(12px)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}
                    >
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} style={{ backgroundColor: '#12141c', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.12)', width: '100%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto' }}>
                            <div style={{ padding: '24px', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <span style={{ fontSize: '10px', fontFamily: '"JetBrains Mono", monospace', color: '#00a3ff', letterSpacing: '1px' }}>FAUNDR APPLICATION</span>
                                    <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#ffffff', margin: 0 }}>{selectedOpp.title}</h2>
                                    <div style={{ fontSize: '13px', color: '#94a3b8' }}>{selectedOpp.company} • {selectedOpp.salary}</div>
                                </div>
                                <button onClick={() => setShowApplyModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}><X size={24} /></button>
                            </div>

                            <form onSubmit={handleApplySubmit} style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                    <label style={{ fontSize: '12px', fontWeight: 700, color: '#94a3b8' }}>NOME COMPLETO *</label>
                                    <input type="text" required value={applyForm.name} onChange={e => setApplyForm({ ...applyForm, name: e.target.value })} placeholder="Ex: Hamilton Silva" style={{ padding: '14px', borderRadius: '10px', backgroundColor: '#090a0f', border: '1px solid rgba(255,255,255,0.12)', color: '#ffffff', fontSize: '14px' }} />
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                        <label style={{ fontSize: '12px', fontWeight: 700, color: '#94a3b8' }}>E-MAIL *</label>
                                        <input type="email" required value={applyForm.email} onChange={e => setApplyForm({ ...applyForm, email: e.target.value })} placeholder="seu@email.com" style={{ padding: '14px', borderRadius: '10px', backgroundColor: '#090a0f', border: '1px solid rgba(255,255,255,0.12)', color: '#ffffff', fontSize: '14px' }} />
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                        <label style={{ fontSize: '12px', fontWeight: 700, color: '#94a3b8' }}>TELEFONE / WHATSAPP *</label>
                                        <input type="tel" required value={applyForm.phone} onChange={e => setApplyForm({ ...applyForm, phone: e.target.value })} placeholder="+244 923 000 000" style={{ padding: '14px', borderRadius: '10px', backgroundColor: '#090a0f', border: '1px solid rgba(255,255,255,0.12)', color: '#ffffff', fontSize: '14px' }} />
                                    </div>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                    <label style={{ fontSize: '12px', fontWeight: 700, color: '#94a3b8' }}>LINK DO PORTFÓLIO / LINKEDIN *</label>
                                    <input type="url" required value={applyForm.portfolio} onChange={e => setApplyForm({ ...applyForm, portfolio: e.target.value })} placeholder="https://linkedin.com/in/seu-perfil" style={{ padding: '14px', borderRadius: '10px', backgroundColor: '#090a0f', border: '1px solid rgba(255,255,255,0.12)', color: '#ffffff', fontSize: '14px' }} />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitted}
                                    style={{
                                        backgroundColor: isSubmitted ? '#00c853' : '#00a3ff',
                                        color: '#07080c',
                                        border: 'none',
                                        padding: '16px',
                                        borderRadius: '9999px',
                                        fontWeight: 800,
                                        fontSize: '14px',
                                        cursor: 'pointer',
                                        marginTop: '10px'
                                    }}
                                >
                                    {isSubmitted ? 'SUBMETENDO...' : 'CONFIRMAR CANDIDATURA'}
                                </button>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
};

export default OpportunitiesPage;
