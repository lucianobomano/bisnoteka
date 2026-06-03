import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle, TrendingUp, DollarSign, Zap, MessageSquare, Share2, Users, BarChart, FileText, FileSpreadsheet, Image as ImageIcon, Star, Download, Layout, ShieldCheck, ShoppingBag, Terminal } from 'lucide-react';

interface DetailedIdea {
    title: string;
    category: string;
    description: string;
    img: string;
    investment: string;
    potential: string;
    difficulty: string;
    summary: string;
    marketOpportunity: string;
    monetization: string[];
    steps: { title: string; desc: string }[];
    requiredSkills: string[];
    riscos: string[];
}

const IdeaDetailsPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [isMobile, setIsMobile] = useState(false);
    const [activeTab, setActiveTab] = useState('Visão geral');

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 1024);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const ideasData: Record<string, DetailedIdea> = {
        '1': {
            title: "Micro-SaaS de Gestão para Mercados",
            category: "SaaS",
            description: "Sistema simplificado de inventário e vendas focado em pequenos retalhistas locais que operam offline.",
            img: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=2070&auto=format&fit=crop",
            investment: "Baixo (AKZ 50.000 - 150.000)",
            potential: "Alto (Retorno em 3-6 meses)",
            difficulty: "Médium",
            summary: "O mercado informal e as pequenas lojas de bairro em África enfrentam desafios enormes na gestão de stock e controlo de caixa. Este Micro-SaaS propõe uma solução mobile-first que funciona sem internet (sync quando disponível) para digitalizar estas operações.",
            marketOpportunity: "Milhares de pequenos comerciantes ainda usam cadernos para anotar vendas. A digitalização permite acesso a crédito, melhor controle de margens e redução de desperdícios.",
            monetization: [
                "Assinatura Mensal (SaaS)",
                "Taxa por transação (se integrar pagamentos)",
                "Consultoria de digitalização de inventário"
            ],
            steps: [
                { title: "Mapeamento", desc: "Identificar 10 mercados locais e entrevistar donos de bancadas sobre as maiores dores." },
                { title: "MVP", desc: "Desenvolver uma aplicação simples de registo de entrada e saída de produtos com suporte offline." },
                { title: "Piloto", desc: "Implementar em 3 lojas e recolher feedback por 30 dias gratuitamente." },
                { title: "Escala", desc: "Apresentar para associações de comerciantes e oferecer planos de grupo." }
            ],
            requiredSkills: ["Desenvolvimento Mobile (React Native/Flutter)", "Design UX para baixa literacia digital", "Vendas diretas B2B"],
            riscos: ["Baixa adesão tecnológica inicial", "Dificuldade de suporte técnico remoto", "Alternativas de baixo custo (caderno)"]
        },
        '2': {
            title: "Marketplace de Produtos Artesanais",
            category: "E-commerce",
            description: "Plataforma que liga artesãos locais diretamente a compradores internacionais com foco em storytelling.",
            img: "https://images.unsplash.com/photo-1534073828943-f801091bb18c?q=80&w=1974&auto=format&fit=crop",
            investment: "Médio (AKZ 200.000 - 500.000)",
            potential: "Muito Alto (Mercado Exterior)",
            difficulty: "Médium",
            summary: "A riqueza do artesanato africano é subvalorizada localmente, mas extremamente apreciada na Europa e EUA. Este marketplace não vende apenas itens, vende a história de quem os fez.",
            marketOpportunity: "Crescente procura por produtos autênticos e 'fair trade' em mercados desenvolvidos.",
            monetization: [
                "Comissão sobre vendas (15-25%)",
                "Serviços de certificação de autenticidade",
                "Assinaturas mensais para artesãos premium"
            ],
            steps: [
                { title: "Curadoria", desc: "Visitar centros de artesanato e selecionar 5 produtores com alto padrão de qualidade." },
                { title: "Logística", desc: "Estabelecer parcerias com DHL/FedEx para envios internacionais simplificados." },
                { title: "Plataforma", desc: "Criar uma loja Shopify ou custom focada em imagens de alta qualidade e vídeos dos artesãos." }
            ],
            requiredSkills: ["E-commerce", "Marketing Digital Internacional (Ads)", "Logística e Exportação"],
            riscos: ["Custos de envio elevados", "Controlo de qualidade irregular", "Complexidade alfandegária"]
        }
    };

    const idea = ideasData[id || '1'] || ideasData['1'];

    return (
        <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', color: '#10171f', fontFamily: 'Inter, sans-serif' }}>

            {/* Nav Back */}
            <div style={{
                position: 'fixed',
                top: '100px',
                left: isMobile ? '20px' : '60px',
                zIndex: 10
            }}>
                <button
                    onClick={() => navigate('/bisnoteka')}
                    style={{
                        padding: '12px 20px',
                        backgroundColor: '#fff',
                        borderRadius: '99px',
                        border: '1px solid #ddd',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
                    }}
                >
                    <ArrowLeft size={18} /> VOLTAR PARA BIBLIOTECA
                </button>
            </div>

            {/* Hero Section */}
            <section style={{ padding: isMobile ? '120px 20px 60px' : '150px 60px 80px', backgroundColor: '#f6f7f9' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '60px', alignItems: 'center' }}>

                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        style={{ flex: 1 }}
                    >
                        <div style={{
                            display: 'inline-block',
                            padding: '6px 16px',
                            backgroundColor: '#f83821',
                            color: '#fff',
                            borderRadius: '99px',
                            fontSize: '12px',
                            fontWeight: 900,
                            textTransform: 'uppercase',
                            marginBottom: '20px'
                        }}>
                            Ideia Validada • {idea.category}
                        </div>
                        <h1 style={{
                            fontSize: isMobile ? '42px' : '72px',
                            fontWeight: 900,
                            lineHeight: 0.9,
                            letterSpacing: '-3px',
                            textTransform: 'uppercase',
                            marginBottom: '30px',
                            color: '#10171f'
                        }}>{idea.title}</h1>
                        <p style={{ fontSize: '20px', color: '#555', marginBottom: '40px', lineHeight: 1.5, fontWeight: 500 }}>
                            {idea.description}
                        </p>

                        <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: '#eef1ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <DollarSign size={20} color="#0011fd" />
                                </div>
                                <div>
                                    <p style={{ fontSize: '10px', color: '#999', fontWeight: 800, textTransform: 'uppercase' }}>Investimento</p>
                                    <p style={{ fontSize: '14px', fontWeight: 900 }}>{idea.investment}</p>
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: '#fff0ef', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <TrendingUp size={20} color="#f83821" />
                                </div>
                                <div>
                                    <p style={{ fontSize: '10px', color: '#999', fontWeight: 800, textTransform: 'uppercase' }}>Potencial</p>
                                    <p style={{ fontSize: '14px', fontWeight: 900 }}>{idea.potential}</p>
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: '#f0fff4', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Zap size={20} color="#00c853" />
                                </div>
                                <div>
                                    <p style={{ fontSize: '10px', color: '#999', fontWeight: 800, textTransform: 'uppercase' }}>Dificuldade</p>
                                    <p style={{ fontSize: '14px', fontWeight: 900 }}>{idea.difficulty}</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        style={{ flex: 1, width: '100%' }}
                    >
                        <div style={{
                            width: '100%',
                            aspectRatio: '16/10',
                            borderRadius: '40px',
                            overflow: 'hidden',
                            boxShadow: '0 30px 60px rgba(0,0,0,0.15)',
                            position: 'relative'
                        }}>
                            <img src={idea.img} alt={idea.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Submenu Tabs */}
            <div style={{
                position: 'sticky',
                top: '75px',
                backgroundColor: '#fff',
                borderBottom: '1px solid #efefef',
                zIndex: 40,
                display: 'flex',
                justifyContent: 'center',
                padding: '0 20px'
            }}>
                <div style={{
                    display: 'flex',
                    gap: isMobile ? '20px' : '40px',
                    overflowX: 'auto',
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none'
                }}>
                    {['Visão geral', 'Ficheiros incluídos', 'Galeria', 'Classificação'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            style={{
                                padding: '20px 0',
                                backgroundColor: 'transparent',
                                border: 'none',
                                borderBottom: activeTab === tab ? '3px solid #f83821' : '3px solid transparent',
                                color: activeTab === tab ? '#10171f' : '#888',
                                fontSize: '14px',
                                fontWeight: 800,
                                textTransform: 'uppercase',
                                cursor: 'pointer',
                                transition: 'all 0.3s',
                                whiteSpace: 'nowrap'
                            }}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* Content Area */}
            <section style={{ padding: '80px 20px' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '2fr 1fr', gap: '80px' }}>

                    {/* Main Content */}
                    <div style={{ overflow: 'hidden' }}>

                        {activeTab === 'Visão geral' && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                <div style={{ marginBottom: '60px' }}>
                                    <h2 style={{ fontSize: '36px', fontWeight: 900, textTransform: 'uppercase', marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '15px' }}>
                                        <Users color="#f83821" /> Sumário Executivo
                                    </h2>
                                    <p style={{ fontSize: '18px', lineHeight: 1.8, color: '#444' }}>
                                        {idea.summary}
                                    </p>
                                </div>

                                <div style={{ marginBottom: '60px' }}>
                                    <h2 style={{ fontSize: '36px', fontWeight: 900, textTransform: 'uppercase', marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '15px' }}>
                                        <BarChart color="#f83821" /> Oportunidade de Mercado
                                    </h2>
                                    <p style={{ fontSize: '18px', lineHeight: 1.8, color: '#444' }}>
                                        {idea.marketOpportunity}
                                    </p>
                                </div>

                                <div style={{ marginBottom: '60px' }}>
                                    <h2 style={{ fontSize: '36px', fontWeight: 900, textTransform: 'uppercase', marginBottom: '40px', letterSpacing: '-1.5px' }}>
                                        Roadmap de Execução
                                    </h2>
                                    <div style={{ position: 'relative', paddingLeft: '50px' }}>
                                        <div style={{
                                            position: 'absolute',
                                            left: '15px',
                                            top: '0',
                                            bottom: '0',
                                            width: '2px',
                                            background: 'linear-gradient(to bottom, #f83821, #10171f, #f6f7f9)',
                                            opacity: 0.3,
                                            zIndex: 1
                                        }}></div>

                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                                            {idea.steps.map((step, idx) => (
                                                <motion.div
                                                    key={idx}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    whileInView={{ opacity: 1, x: 0 }}
                                                    viewport={{ once: true }}
                                                    transition={{ delay: idx * 0.1 }}
                                                    style={{ position: 'relative' }}
                                                >
                                                    <div style={{
                                                        position: 'absolute',
                                                        left: '-43px',
                                                        top: '50%',
                                                        transform: 'translateY(-50%)',
                                                        width: '18px',
                                                        height: '18px',
                                                        backgroundColor: '#fff',
                                                        border: '4px solid #f83821',
                                                        borderRadius: '50%',
                                                        zIndex: 3,
                                                        boxShadow: '0 0 15px rgba(248, 56, 33, 0.4)'
                                                    }}></div>

                                                    <div style={{
                                                        padding: '30px',
                                                        backgroundColor: '#ffffff',
                                                        borderRadius: '28px',
                                                        border: '1px solid #f0f0f0',
                                                        boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
                                                        display: 'flex',
                                                        gap: '25px',
                                                        alignItems: 'flex-start',
                                                        transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                                                    }}
                                                        onMouseEnter={(e) => {
                                                            e.currentTarget.style.borderColor = '#f83821';
                                                        }}
                                                        onMouseLeave={(e) => {
                                                            e.currentTarget.style.borderColor = '#f0f0f0';
                                                        }}
                                                    >
                                                        <div style={{
                                                            backgroundColor: '#10171f',
                                                            color: '#fff',
                                                            width: '56px',
                                                            height: '56px',
                                                            minWidth: '56px',
                                                            borderRadius: '18px',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            fontWeight: 900,
                                                            fontSize: '22px',
                                                            boxShadow: '0 10px 20px rgba(16, 23, 31, 0.15)'
                                                        }}>{idx + 1}</div>

                                                        <div>
                                                            <div style={{
                                                                fontSize: '11px',
                                                                fontWeight: 900,
                                                                color: '#f83821',
                                                                textTransform: 'uppercase',
                                                                letterSpacing: '2px',
                                                                marginBottom: '6px'
                                                            }}>Fase de Execução</div>
                                                            <h4 style={{ fontSize: '22px', fontWeight: 900, textTransform: 'uppercase', marginBottom: '8px', color: '#10171f', lineHeight: 1.1 }}>{step.title}</h4>
                                                            <p style={{ color: '#555', lineHeight: 1.6, fontSize: '15px' }}>{step.desc}</p>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'Ficheiros incluídos' && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                <h2 style={{ fontSize: '36px', fontWeight: 900, textTransform: 'uppercase', marginBottom: '15px' }}>Ativos Prontos</h2>
                                <p style={{ color: '#666', marginBottom: '40px', fontSize: '18px' }}>Tudo o que precisas para lançar este negócio amanhã, validado pela nossa equipa de especialistas.</p>

                                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '20px' }}>
                                    {[
                                        { name: 'Plano de Negócio Master', ext: 'PDF', icon: <FileText color="#f83821" /> },
                                        { name: 'Modelo Financeiro Pro 3 Anos', ext: 'XLSX', icon: <FileSpreadsheet color="#00c853" /> },
                                        { name: 'Pitch Deck para Investidores', ext: 'PPTX', icon: <Layout color="#ff9800" /> },
                                        { name: 'Sumário Executivo Estratégico', ext: 'PDF', icon: <ShieldCheck color="#0011fd" /> },
                                        { name: 'Manual de Identidade Visual', ext: 'PDF', icon: <ImageIcon color="#e91e63" /> },
                                        { name: 'Kit de Redes Sociais (Templates)', ext: 'CANVA', icon: <ShoppingBag color="#b388ff" /> },
                                        { name: 'Lista de Fornecedores Validados', ext: 'CSV', icon: <Users color="#607d8b" /> },
                                        { name: 'Scripts de Vendas e CRM', ext: 'DOCX', icon: <MessageSquare color="#795548" /> },
                                        { name: 'Roadmap Técnico de Backend', ext: 'PDF', icon: <Terminal color="#000" /> },
                                        { name: 'Termos e Condições Legais', ext: 'PDF', icon: <FileText color="#9e9e9e" /> }
                                    ].map((file, i) => (
                                        <div key={i} style={{
                                            padding: '25px',
                                            borderRadius: '20px',
                                            border: '1px solid #f0f0f0',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            backgroundColor: '#fff',
                                            boxShadow: '0 4px 15px rgba(0,0,0,0.02)'
                                        }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                                <div style={{ width: '45px', height: '45px', borderRadius: '12px', backgroundColor: '#f9f9f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    {file.icon}
                                                </div>
                                                <div>
                                                    <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#10171f', marginBottom: '2px' }}>{file.name}</h4>
                                                    <span style={{ fontSize: '10px', color: '#999', fontWeight: 900, textTransform: 'uppercase' }}>{file.ext} • 12.4 MB</span>
                                                </div>
                                            </div>
                                            <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#10171f' }}>
                                                <Download size={20} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'Galeria' && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                <h2 style={{ fontSize: '36px', fontWeight: 900, textTransform: 'uppercase', marginBottom: '40px' }}>Ativos Visuais</h2>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
                                    {[1, 2, 3, 4].map((n) => (
                                        <div key={n} style={{ width: '100%', height: '300px', backgroundColor: '#f0f0f0', borderRadius: '24px', overflow: 'hidden' }}>
                                            <img src={`https://images.unsplash.com/photo-${1500000000000 + n}?q=80&w=1200&auto=format&fit=crop`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Gallery" />
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'Classificação' && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                <h2 style={{ fontSize: '36px', fontWeight: 900, textTransform: 'uppercase', marginBottom: '15px' }}>Feedback da Comunidade</h2>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '30px', marginBottom: '50px', padding: '40px', backgroundColor: '#f6f7f9', borderRadius: '32px' }}>
                                    <div style={{ textAlign: 'center' }}>
                                        <div style={{ fontSize: '64px', fontWeight: 900, color: '#10171f', lineHeight: 1 }}>4.9</div>
                                        <div style={{ display: 'flex', gap: '2px', justifyContent: 'center', marginTop: '10px' }}>
                                            {[1, 2, 3, 4, 5].map(s => <Star key={s} size={16} fill="#f83821" color="#f83821" />)}
                                        </div>
                                        <p style={{ fontSize: '12px', color: '#888', marginTop: '10px', fontWeight: 700 }}>Em 142 avaliações</p>
                                    </div>
                                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                        {[5, 4, 3, 2, 1].map((n) => (
                                            <div key={n} style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                                <span style={{ fontSize: '12px', fontWeight: 700, minWidth: '15px' }}>{n}</span>
                                                <div style={{ flex: 1, height: '8px', backgroundColor: '#ddd', borderRadius: '4px', overflow: 'hidden' }}>
                                                    <div style={{ width: n === 5 ? '85%' : n === 4 ? '10%' : '5%', height: '100%', backgroundColor: '#f83821' }}></div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div>
                        <div style={{ backgroundColor: '#10171f', padding: '40px', borderRadius: '32px', color: '#fff', position: 'sticky', top: '150px' }}>
                            <h3 style={{ fontSize: '24px', fontWeight: 900, textTransform: 'uppercase', marginBottom: '30px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '15px' }}>Monetização</h3>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                {idea.monetization.map((m: string, i: number) => (
                                    <li key={i} style={{ marginBottom: '20px', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                                        <CheckCircle size={20} color="#f83821" style={{ marginTop: '4px', flexShrink: 0 }} />
                                        <span style={{ fontSize: '16px', fontWeight: 500 }}>{m}</span>
                                    </li>
                                ))}
                            </ul>

                            <h3 style={{ fontSize: '24px', fontWeight: 900, textTransform: 'uppercase', marginTop: '50px', marginBottom: '30px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '15px' }}>Skills Necessárias</h3>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                                {idea.requiredSkills.map((skill, i) => (
                                    <div key={i} style={{ padding: '8px 16px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '99px', fontSize: '13px', fontWeight: 600 }}>
                                        {skill}
                                    </div>
                                ))}
                            </div>

                            <button style={{
                                width: '100%',
                                marginTop: '60px',
                                padding: '20px',
                                backgroundColor: '#f83821',
                                color: '#fff',
                                borderRadius: '16px',
                                border: 'none',
                                fontSize: '16px',
                                fontWeight: 900,
                                textTransform: 'uppercase',
                                cursor: 'pointer',
                                transition: 'opacity 0.2s'
                            }}>
                                DESCARREGAR BLUEPRINT PDF
                            </button>
                        </div>
                    </div>

                </div>
            </section>

            {/* Footer Engagement */}
            <section style={{ padding: '80px 20px', borderTop: '1px solid #efefef', textAlign: 'center' }}>
                <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                    <h3 style={{ fontSize: '28px', fontWeight: 900, textTransform: 'uppercase', marginBottom: '20px' }}>Gostou desta ideia?</h3>
                    <p style={{ color: '#666', marginBottom: '40px' }}>Fale com outros faundrs sobre como implementar esta solução ou encontre parceiros.</p>
                    <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
                        <button style={{ padding: '15px 30px', borderRadius: '99px', border: '1px solid #ddd', background: 'none', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <MessageSquare size={18} /> COMUNIDADE
                        </button>
                        <button style={{ padding: '15px 30px', borderRadius: '99px', border: '1px solid #ddd', background: 'none', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <Share2 size={18} /> PARTILHAR
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default IdeaDetailsPage;
