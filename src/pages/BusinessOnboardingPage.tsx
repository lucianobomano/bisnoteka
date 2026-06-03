import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, Image as ImageIcon, Book, Target, LayoutTemplate, Briefcase, FileText, CheckCircle, Loader2, FolderOpen, PieChart, Network, CalendarDays, TrendingUp, Megaphone, Shield } from 'lucide-react';

interface BusinessData {
    name: string;
    niche: string[];
    problem: string;
    audience: string;
    brandVibe: string[];
    colorPalette: string[];
    customColors: string[];
    visualStyle: string[];
    logoType: string[];
    visuals: string[];
    strategy: string[];
    aiModel: 'faundr' | 'biz';
}

const TypewriterText: React.FC<{ text: string, style?: React.CSSProperties }> = ({ text, style }) => (
    <h2 style={style}>
        {text.split('').map((char, index) => (
            <motion.span
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.01, delay: index * 0.03 }}
            >
                {char}
            </motion.span>
        ))}
    </h2>
);

const BusinessOnboardingPage: React.FC = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState<BusinessData>({
        name: '',
        niche: [],
        problem: '',
        audience: '',
        brandVibe: [],
        colorPalette: [],
        customColors: ['#ffffff', '#ffffff', '#ffffff'],
        visualStyle: [],
        logoType: [],
        visuals: [],
        strategy: [],
        aiModel: 'faundr'
    });

    const [isProcessing, setIsProcessing] = useState(false);
    const [processingStage, setProcessingStage] = useState(0);
    const totalSteps = 11; // Number of questions

    const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

    // Focus input when step changes
    useEffect(() => {
        if (inputRef.current) {
            setTimeout(() => inputRef.current?.focus(), 400);
        }
    }, [step]);

    // Handle Enter key globally to advance
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleNext();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [step, formData, isProcessing]);

    const handleNext = () => {
        if (isProcessing) return;
        
        // Validation checks per step
        if (step === 1 && formData.name.trim() === '') return;
        if (step === 2 && formData.niche.length === 0) return;
        if (step === 3 && formData.problem.trim() === '') return;
        
        if (step === totalSteps) {
            startProcessing();
        } else if (step <= totalSteps) {
            setStep(prev => prev + 1);
        }
    };

    const handleBack = () => {
        if (step > 0 && !isProcessing && step <= totalSteps) {
            setStep(prev => prev - 1);
        }
    };

    const startProcessing = async () => {
        setStep(totalSteps + 1);
        setIsProcessing(true);
        const stages = [
            "A estruturar dados do briefing...",
            "A enviar parâmetros para a Inteligência Artificial...",
            "A gerar identidade visual e documentação estratégica...",
            "A finalizar o ecossistema do seu negócio..."
        ];
        
        stages.forEach((_, i) => {
            setTimeout(() => {
                setProcessingStage(i);
            }, i * 1500);
        });

        try {
            const response = await fetch(`\${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/api/business/generate`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error("Falha na geração do negócio.");
            }

            // Redirect to dashboard after a small delay to finish animations
            setTimeout(() => {
                setIsProcessing(false);
                navigate('/membros');
            }, stages.length * 1500);

        } catch (error) {
            console.error("Erro ao gerar negócio:", error);
            setIsProcessing(false);
            alert("Ocorreu um erro ao gerar o seu negócio. Tente novamente.");
        }
    };

    const toggleArrayItem = (key: keyof BusinessData, item: string) => {
        setFormData(prev => {
            const currentArray = prev[key] as string[];
            const exists = currentArray.includes(item);
            return {
                ...prev,
                [key]: exists ? currentArray.filter(i => i !== item) : [...currentArray, item]
            };
        });
    };

    const availableNiches = [
        'SaaS', 'E-commerce', 'Educação', 'Saúde', 'Finanças', 
        'Logística', 'Agrotech', 'Imobiliário', 'Serviços B2B', 'Entretenimento',
        'Moda e Vestuário', 'Alimentação e Bebidas', 'Turismo e Hotelaria', 
        'Marketing e Publicidade', 'Beleza e Bem-Estar', 'Tecnologia', 
        'Arte e Design', 'Consultoria', 'Comércio Local', 'Cripto e Web3'
    ];
    const brandVibes = ['Luxo', 'Minimalista', 'Inovador', 'Acessível', 'Tradicional', 'Divertido', 'Sério', 'Sustentável', 'Rebelde'];
    const colorPalettes = ['Tons Terra (Naturais)', 'Minimalista (Preto & Branco)', 'Vibrante & Neon', 'Tons Pastéis', 'Cores Frias (Profissional)', 'Cores Quentes (Energia)', 'Personalizadas'];
    const visualStyles = ['Corporativo', 'Divertido & Casual', 'Elegante & Premium', 'Futurista & Tech', 'Retro & Vintage', 'Artesanal & Orgânico'];
    const logoTypes = ['Tipográfico (Wordmark)', 'Símbolo / Ícone', 'Monograma (Letras)', 'Emblema', 'Mascote'];

    const fadeVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as any } },
        exit: { opacity: 0, y: -30, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as any } }
    };

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: '#05070a', color: '#fff', fontFamily: 'Inter, sans-serif',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            overflow: 'hidden', zIndex: 9999
        }}>
            {/* Ambient Background */}
            <div style={{ position: 'absolute', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(248,56,33,0.15) 0%, rgba(0,0,0,0) 70%)', top: '-10%', left: '-10%', filter: 'blur(80px)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(0,200,83,0.1) 0%, rgba(0,0,0,0) 70%)', bottom: '-20%', right: '-10%', filter: 'blur(80px)', pointerEvents: 'none' }} />

            {/* Top Bar (Close & Progress) */}
            <div style={{ position: 'absolute', top: '40px', left: '40px', right: '40px', display: 'flex', justifyContent: 'space-between', zIndex: 10 }}>
                <button onClick={() => navigate('/bisnoteka')} style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: 600, padding: '10px' }}>
                    <ArrowLeft size={16} /> Cancelar e Sair
                </button>
                {step > 0 && step <= totalSteps && (
                    <div style={{ color: '#555', fontSize: '14px', fontWeight: 600 }}>
                        {step} <span style={{ opacity: 0.5 }}>/ {totalSteps}</span>
                    </div>
                )}
            </div>

            {/* Main Content Area */}
            <div style={{ width: '100%', maxWidth: '800px', padding: '0 40px', zIndex: 10 }}>
                <AnimatePresence mode="wait">
                    {/* STEP 0: Welcome */}
                    {step === 0 && (
                        <motion.div key="step0" variants={fadeVariants} initial="hidden" animate="visible" exit="exit" style={{ textAlign: 'center' }}>
                            <h1 style={{ fontSize: '64px', fontWeight: 900, letterSpacing: '-2px', lineHeight: 1.1, marginBottom: '24px' }}>
                                A Inteligência Artificial <br />vai construir o seu <span style={{ color: '#f83821' }}>império</span>.
                            </h1>
                            <p style={{ color: '#888', fontSize: '20px', marginBottom: '60px' }}>Forneça os detalhes e deixe a nossa IA gerar todos os documentos e a sua identidade visual autêntica.</p>
                            <button onClick={handleNext} style={{ padding: '20px 48px', backgroundColor: '#f83821', color: '#fff', border: 'none', borderRadius: '99px', fontSize: '18px', fontWeight: 900, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '12px', boxShadow: '0 8px 32px rgba(248,56,33,0.3)' }}>
                                INICIAR O BRIEFING <ArrowRight size={20} />
                            </button>
                            <p style={{ marginTop: '20px', fontSize: '13px', color: '#555', fontWeight: 600 }}>ou pressione <strong style={{ color: '#fff' }}>Enter ↵</strong></p>
                        </motion.div>
                    )}

                    {/* STEP 1: Name */}
                    {step === 1 && (
                        <motion.div key="step1" variants={fadeVariants} initial="hidden" animate="visible" exit="exit" style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                            <TypewriterText text="1. Qual será o nome do seu negócio?" style={{ fontSize: '48px', fontWeight: 900, letterSpacing: '-1px' }} />
                            <input
                                ref={inputRef as React.RefObject<HTMLInputElement>}
                                type="text"
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                placeholder="Escreva aqui..."
                                style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '2px solid rgba(255,255,255,0.2)', fontSize: '42px', color: '#fff', fontWeight: 700, padding: '20px 0', outline: 'none' }}
                                onFocus={(e) => e.target.style.borderBottomColor = '#f83821'}
                                onBlur={(e) => e.target.style.borderBottomColor = 'rgba(255,255,255,0.2)'}
                            />
                        </motion.div>
                    )}

                    {/* STEP 2: Niche */}
                    {step === 2 && (
                        <motion.div key="step2" variants={fadeVariants} initial="hidden" animate="visible" exit="exit" style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                            <TypewriterText text="2. Em que setor atua?" style={{ fontSize: '48px', fontWeight: 900, letterSpacing: '-1px' }} />
                            <p style={{ color: '#888', fontSize: '18px' }}>Selecione um ou mais setores que definem a sua área de atuação.</p>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                                {availableNiches.map(niche => (
                                    <button
                                        key={niche}
                                        onClick={() => toggleArrayItem('niche', niche)}
                                        style={{
                                            padding: '16px 24px',
                                            borderRadius: '99px',
                                            border: `1px solid ${formData.niche.includes(niche) ? '#f83821' : 'rgba(255,255,255,0.1)'}`,
                                            backgroundColor: formData.niche.includes(niche) ? 'rgba(248,56,33,0.1)' : 'transparent',
                                            color: formData.niche.includes(niche) ? '#f83821' : '#fff',
                                            fontSize: '16px',
                                            fontWeight: 600,
                                            cursor: 'pointer',
                                            transition: 'all 0.2s'
                                        }}
                                    >
                                        {niche}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* STEP 3: Problem */}
                    {step === 3 && (
                        <motion.div key="step3" variants={fadeVariants} initial="hidden" animate="visible" exit="exit" style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                            <TypewriterText text={`3. Qual é o principal problema que a ${formData.name} resolve?`} style={{ fontSize: '48px', fontWeight: 900, letterSpacing: '-1px', lineHeight: 1.2 }} />
                            <textarea
                                ref={inputRef as React.RefObject<HTMLTextAreaElement>}
                                value={formData.problem}
                                onChange={e => setFormData({ ...formData, problem: e.target.value })}
                                placeholder="Ajudamos a [público] a [alcançar objetivo] através de..."
                                rows={3}
                                style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '2px solid rgba(255,255,255,0.2)', fontSize: '32px', color: '#fff', fontWeight: 600, padding: '20px 0', outline: 'none', resize: 'none', lineHeight: 1.4 }}
                                onFocus={(e) => e.target.style.borderBottomColor = '#f83821'}
                                onBlur={(e) => e.target.style.borderBottomColor = 'rgba(255,255,255,0.2)'}
                            />
                        </motion.div>
                    )}

                    {/* STEP 4: Audience */}
                    {step === 4 && (
                        <motion.div key="step4" variants={fadeVariants} initial="hidden" animate="visible" exit="exit" style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                            <TypewriterText text="4. Quem é o seu cliente ideal?" style={{ fontSize: '48px', fontWeight: 900, letterSpacing: '-1px' }} />
                            <input
                                ref={inputRef as React.RefObject<HTMLInputElement>}
                                type="text"
                                value={formData.audience}
                                onChange={e => setFormData({ ...formData, audience: e.target.value })}
                                placeholder="Ex: PMEs em crescimento..."
                                style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '2px solid rgba(255,255,255,0.2)', fontSize: '42px', color: '#fff', fontWeight: 700, padding: '20px 0', outline: 'none' }}
                                onFocus={(e) => e.target.style.borderBottomColor = '#f83821'}
                                onBlur={(e) => e.target.style.borderBottomColor = 'rgba(255,255,255,0.2)'}
                            />
                        </motion.div>
                    )}

                    {/* STEP 5: Brand Vibe */}
                    {step === 5 && (
                        <motion.div key="step5" variants={fadeVariants} initial="hidden" animate="visible" exit="exit" style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                            <TypewriterText text="5. Como descreveria a personalidade da sua marca?" style={{ fontSize: '48px', fontWeight: 900, letterSpacing: '-1px' }} />
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                                {brandVibes.map(vibe => (
                                    <button
                                        key={vibe}
                                        onClick={() => toggleArrayItem('brandVibe', vibe)}
                                        style={{
                                            padding: '16px 24px',
                                            borderRadius: '99px',
                                            border: `1px solid ${formData.brandVibe.includes(vibe) ? '#f83821' : 'rgba(255,255,255,0.1)'}`,
                                            backgroundColor: formData.brandVibe.includes(vibe) ? 'rgba(248,56,33,0.1)' : 'transparent',
                                            color: formData.brandVibe.includes(vibe) ? '#f83821' : '#fff',
                                            fontSize: '16px',
                                            fontWeight: 600,
                                            cursor: 'pointer',
                                            transition: 'all 0.2s'
                                        }}
                                    >
                                        {vibe}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* STEP 6: Color Palette */}
                    {step === 6 && (
                        <motion.div key="step6" variants={fadeVariants} initial="hidden" animate="visible" exit="exit" style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                            <TypewriterText text="6. Qual é a paleta de cores ideal?" style={{ fontSize: '48px', fontWeight: 900, letterSpacing: '-1px' }} />
                            <p style={{ color: '#888', fontSize: '18px' }}>As cores transmitem a energia da sua marca. Quais escolhe?</p>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                                {colorPalettes.map(palette => (
                                    <button
                                        key={palette}
                                        onClick={() => toggleArrayItem('colorPalette', palette)}
                                        style={{
                                            padding: '16px 24px',
                                            borderRadius: '99px',
                                            border: `1px solid ${formData.colorPalette.includes(palette) ? '#f83821' : 'rgba(255,255,255,0.1)'}`,
                                            backgroundColor: formData.colorPalette.includes(palette) ? 'rgba(248,56,33,0.1)' : 'transparent',
                                            color: formData.colorPalette.includes(palette) ? '#f83821' : '#fff',
                                            fontSize: '16px',
                                            fontWeight: 600,
                                            cursor: 'pointer',
                                            transition: 'all 0.2s'
                                        }}
                                    >
                                        {palette}
                                    </button>
                                ))}
                            </div>
                            
                            <AnimatePresence>
                                {formData.colorPalette.includes('Personalizadas') && (
                                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '10px' }}>
                                        <p style={{ color: '#888', fontSize: '16px' }}>Selecione até 3 cores específicas:</p>
                                        <div style={{ display: 'flex', gap: '20px' }}>
                                            {[0, 1, 2].map((index) => (
                                                <input
                                                    key={index}
                                                    type="color"
                                                    value={formData.customColors[index]}
                                                    onChange={(e) => {
                                                        const newColors = [...formData.customColors];
                                                        newColors[index] = e.target.value;
                                                        setFormData({ ...formData, customColors: newColors });
                                                    }}
                                                    style={{
                                                        width: '60px',
                                                        height: '60px',
                                                        padding: '0',
                                                        border: 'none',
                                                        borderRadius: '50%',
                                                        cursor: 'pointer',
                                                        overflow: 'hidden',
                                                        backgroundColor: 'transparent'
                                                    }}
                                                />
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    )}

                    {/* STEP 7: Visual Style */}
                    {step === 7 && (
                        <motion.div key="step7" variants={fadeVariants} initial="hidden" animate="visible" exit="exit" style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                            <TypewriterText text="7. Qual será o estilo visual dominante?" style={{ fontSize: '48px', fontWeight: 900, letterSpacing: '-1px' }} />
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                                {visualStyles.map(style => (
                                    <button
                                        key={style}
                                        onClick={() => toggleArrayItem('visualStyle', style)}
                                        style={{
                                            padding: '16px 24px',
                                            borderRadius: '99px',
                                            border: `1px solid ${formData.visualStyle.includes(style) ? '#f83821' : 'rgba(255,255,255,0.1)'}`,
                                            backgroundColor: formData.visualStyle.includes(style) ? 'rgba(248,56,33,0.1)' : 'transparent',
                                            color: formData.visualStyle.includes(style) ? '#f83821' : '#fff',
                                            fontSize: '16px',
                                            fontWeight: 600,
                                            cursor: 'pointer',
                                            transition: 'all 0.2s'
                                        }}
                                    >
                                        {style}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* STEP 8: Logo Type */}
                    {step === 8 && (
                        <motion.div key="step8" variants={fadeVariants} initial="hidden" animate="visible" exit="exit" style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                            <TypewriterText text="8. Que tipo de logótipo prefere?" style={{ fontSize: '48px', fontWeight: 900, letterSpacing: '-1px' }} />
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                                {logoTypes.map(type => (
                                    <button
                                        key={type}
                                        onClick={() => toggleArrayItem('logoType', type)}
                                        style={{
                                            padding: '16px 24px',
                                            borderRadius: '99px',
                                            border: `1px solid ${formData.logoType.includes(type) ? '#f83821' : 'rgba(255,255,255,0.1)'}`,
                                            backgroundColor: formData.logoType.includes(type) ? 'rgba(248,56,33,0.1)' : 'transparent',
                                            color: formData.logoType.includes(type) ? '#f83821' : '#fff',
                                            fontSize: '16px',
                                            fontWeight: 600,
                                            cursor: 'pointer',
                                            transition: 'all 0.2s'
                                        }}
                                    >
                                        {type}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* STEP 9: Visual Deliverables */}
                    {step === 9 && (
                        <motion.div key="step9" variants={fadeVariants} initial="hidden" animate="visible" exit="exit" style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                            <TypewriterText text="9. Que elementos visuais deseja gerar?" style={{ fontSize: '48px', fontWeight: 900, letterSpacing: '-1px' }} />
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
                                {['Logotipo Editável', 'Brandbook', 'Manual de Normas'].map(item => (
                                    <div
                                        key={item}
                                        onClick={() => toggleArrayItem('visuals', item)}
                                        style={{
                                            backgroundColor: formData.visuals.includes(item) ? 'rgba(248,56,33,0.1)' : 'rgba(255,255,255,0.03)',
                                            border: `2px solid ${formData.visuals.includes(item) ? '#f83821' : 'rgba(255,255,255,0.05)'}`,
                                            borderRadius: '16px', padding: '30px', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '15px', transition: 'all 0.2s'
                                        }}
                                    >
                                        <div style={{ color: formData.visuals.includes(item) ? '#f83821' : '#888' }}>
                                            {item === 'Logotipo Editável' && <ImageIcon size={32} />}
                                            {item === 'Brandbook' && <Book size={32} />}
                                            {item === 'Manual de Normas' && <LayoutTemplate size={32} />}
                                        </div>
                                        <h3 style={{ fontSize: '20px', fontWeight: 800 }}>{item}</h3>
                                        {formData.visuals.includes(item) && <CheckCircle color="#f83821" style={{ position: 'absolute', top: '20px', right: '20px' }} />}
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* STEP 10: Strategy Deliverables */}
                    {step === 10 && (
                        <motion.div key="step10" variants={fadeVariants} initial="hidden" animate="visible" exit="exit" style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                            <TypewriterText text="10. Escolha a documentação estratégica e planos de ação:" style={{ fontSize: '42px', fontWeight: 900, letterSpacing: '-1px' }} />
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '15px', maxHeight: '400px', overflowY: 'auto', paddingRight: '10px' }}>
                                {[
                                    { name: 'Plano de Negócio', icon: <Briefcase size={28} /> },
                                    { name: 'Modelo de Negócio', icon: <Network size={28} /> },
                                    { name: 'Apresentação Institucional', icon: <FileText size={28} /> },
                                    { name: 'Pitch Deck', icon: <Target size={28} /> },
                                    { name: 'Portfólio de Projectos', icon: <FolderOpen size={28} /> },
                                    { name: 'Portfólio Comercial', icon: <PieChart size={28} /> },
                                    { name: 'Plano de Marketing', icon: <Megaphone size={28} /> },
                                    { name: 'Calendário 30 dias (IG/FB)', icon: <CalendarDays size={28} /> },
                                    { name: 'Plano de Lançamento', icon: <Shield size={28} /> },
                                    { name: 'Plano de Escala', icon: <TrendingUp size={28} /> },
                                    { name: 'Plano 1 Milhão Kz em 3 Meses', icon: <Target size={28} /> }
                                ].map(item => (
                                    <div
                                        key={item.name}
                                        onClick={() => toggleArrayItem('strategy', item.name)}
                                        style={{
                                            backgroundColor: formData.strategy.includes(item.name) ? 'rgba(248,56,33,0.1)' : 'rgba(255,255,255,0.03)',
                                            border: `2px solid ${formData.strategy.includes(item.name) ? '#f83821' : 'rgba(255,255,255,0.05)'}`,
                                            borderRadius: '16px', padding: '20px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '15px', transition: 'all 0.2s', position: 'relative'
                                        }}
                                    >
                                        <div style={{ color: formData.strategy.includes(item.name) ? '#f83821' : '#888' }}>
                                            {item.icon}
                                        </div>
                                        <h3 style={{ fontSize: '16px', fontWeight: 800 }}>{item.name}</h3>
                                        {formData.strategy.includes(item.name) && <CheckCircle size={20} color="#f83821" style={{ position: 'absolute', right: '20px' }} />}
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* STEP 11: AI Model Selection */}
                    {step === 11 && (
                        <motion.div key="step11" variants={fadeVariants} initial="hidden" animate="visible" exit="exit" style={{ display: 'flex', flexDirection: 'column', gap: '40px', alignItems: 'center', textAlign: 'center' }}>
                            <TypewriterText text="11. Escolha o cérebro da sua operação:" style={{ fontSize: '42px', fontWeight: 900, letterSpacing: '-1px' }} />
                            <p style={{ color: '#888', fontSize: '18px', maxWidth: '600px', margin: '0 auto' }}>Selecione o motor de Inteligência Artificial que irá construir o seu negócio. Ambos são de elite mundial.</p>
                            
                            <div style={{ display: 'flex', gap: '30px', justifyContent: 'center', marginTop: '20px' }}>
                                <div
                                    onClick={() => setFormData({ ...formData, aiModel: 'faundr' })}
                                    style={{
                                        width: '300px',
                                        backgroundColor: formData.aiModel === 'faundr' ? 'rgba(248,56,33,0.1)' : 'rgba(255,255,255,0.03)',
                                        border: `2px solid ${formData.aiModel === 'faundr' ? '#f83821' : 'rgba(255,255,255,0.05)'}`,
                                        borderRadius: '24px', padding: '40px 30px', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', transition: 'all 0.3s',
                                        transform: formData.aiModel === 'faundr' ? 'scale(1.05)' : 'scale(1)'
                                    }}
                                >
                                    <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: 'rgba(248,56,33,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <div style={{ fontSize: '40px' }}>🧠</div>
                                    </div>
                                    <div>
                                        <h3 style={{ fontSize: '24px', fontWeight: 900, margin: 0, color: formData.aiModel === 'faundr' ? '#fff' : '#ccc' }}>Faundr AI</h3>
                                        <p style={{ fontSize: '14px', color: '#888', marginTop: '10px', lineHeight: 1.5 }}>Criatividade pura e velocidade de processamento extrema.</p>
                                    </div>
                                    {formData.aiModel === 'faundr' && <CheckCircle size={24} color="#f83821" style={{ position: 'absolute', top: '20px', right: '20px' }} />}
                                </div>

                                <div
                                    onClick={() => setFormData({ ...formData, aiModel: 'biz' })}
                                    style={{
                                        width: '300px',
                                        backgroundColor: formData.aiModel === 'biz' ? 'rgba(0,200,83,0.1)' : 'rgba(255,255,255,0.03)',
                                        border: `2px solid ${formData.aiModel === 'biz' ? '#00c853' : 'rgba(255,255,255,0.05)'}`,
                                        borderRadius: '24px', padding: '40px 30px', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', transition: 'all 0.3s',
                                        transform: formData.aiModel === 'biz' ? 'scale(1.05)' : 'scale(1)'
                                    }}
                                >
                                    <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: 'rgba(0,200,83,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <div style={{ fontSize: '40px' }}>⚡</div>
                                    </div>
                                    <div>
                                        <h3 style={{ fontSize: '24px', fontWeight: 900, margin: 0, color: formData.aiModel === 'biz' ? '#fff' : '#ccc' }}>Biz AI</h3>
                                        <p style={{ fontSize: '14px', color: '#888', marginTop: '10px', lineHeight: 1.5 }}>Motor lógico avançado focado em matemática e conversão.</p>
                                    </div>
                                    {formData.aiModel === 'biz' && <CheckCircle size={24} color="#00c853" style={{ position: 'absolute', top: '20px', right: '20px' }} />}
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* STEP 12: Processing / Final */}
                    {step === 12 && (
                        <motion.div key="step12" variants={fadeVariants} initial="hidden" animate="visible" exit="exit" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '40px' }}>
                            {isProcessing ? (
                                <>
                                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }}>
                                        <Loader2 size={64} color="#f83821" />
                                    </motion.div>
                                    <h2 style={{ fontSize: '36px', fontWeight: 800 }}>
                                        {processingStage === 0 && "A analisar mercado..."}
                                        {processingStage === 1 && "A estruturar identidade visual..."}
                                        {processingStage === 2 && "A gerar documentação estratégica..."}
                                        {processingStage === 3 && "A finalizar o ecossistema do seu império..."}
                                    </h2>
                                    <p style={{ color: '#888' }}>Por favor, não feche esta página. A IA está a trabalhar arduamente.</p>
                                </>
                            ) : (
                                <>
                                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 15 }} style={{ width: '120px', height: '120px', backgroundColor: 'rgba(0, 200, 83, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Check size={64} color="#00c853" />
                                    </motion.div>
                                    <div>
                                        <h1 style={{ fontSize: '64px', fontWeight: 900, letterSpacing: '-2px', marginBottom: '16px' }}>Sucesso Absoluto!</h1>
                                        <p style={{ fontSize: '24px', color: '#888' }}>O ecossistema e o plano estratégico para <strong>{formData.name}</strong> foram gerados pela Inteligência Artificial.</p>
                                        <p style={{ fontSize: '14px', color: '#f83821', marginTop: '10px' }}>(Verifique a Consola do Browser para ver o payload simulado da IA)</p>
                                    </div>
                                    <button onClick={() => navigate('/membros')} style={{ padding: '20px 48px', backgroundColor: '#00c853', color: '#fff', border: 'none', borderRadius: '99px', fontSize: '18px', fontWeight: 900, cursor: 'pointer', boxShadow: '0 8px 32px rgba(0,200,83,0.3)' }}>
                                        ACESSAR DASHBOARD DO NEGÓCIO
                                    </button>
                                </>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Bottom Navigation Controls */}
            {step > 0 && step <= totalSteps && (
                <div style={{ position: 'absolute', bottom: '60px', left: '0', right: '0', display: 'flex', justifyContent: 'center', gap: '20px', zIndex: 10 }}>
                    <div style={{ display: 'flex', gap: '15px', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.05)', padding: '10px', borderRadius: '99px', backdropFilter: 'blur(10px)' }}>
                        <button onClick={handleBack} disabled={step === 1} style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: step === 1 ? 'transparent' : 'rgba(255,255,255,0.1)', border: 'none', color: step === 1 ? '#555' : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: step === 1 ? 'not-allowed' : 'pointer', transition: 'all 0.2s' }}>
                            <ArrowLeft size={20} />
                        </button>
                        <button onClick={handleNext} style={{ height: '48px', padding: '0 32px', borderRadius: '99px', backgroundColor: '#f83821', border: 'none', color: '#fff', fontSize: '16px', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                            {step === totalSteps ? 'ENVIAR PARA A IA' : 'OK'} <ArrowRight size={20} />
                        </button>
                    </div>
                    <div style={{ position: 'absolute', bottom: '-30px', color: '#555', fontSize: '12px', fontWeight: 600 }}>
                        Pressione <strong style={{ color: '#aaa' }}>Enter ↵</strong> para avançar
                    </div>
                </div>
            )}
        </div>
    );
};

export default BusinessOnboardingPage;
