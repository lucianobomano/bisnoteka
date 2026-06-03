import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Loader2, Sparkles, Target, Palette, BookOpen, Layers, Zap, Image as ImageIcon, FileDown, FileText } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import html2pdf from 'html2pdf.js';

interface BusinessDetails {
    id: string;
    name: string;
    niche: string[];
    visualStyle: string;
    colorPalette: { preset: string[]; custom: string[] };
    status: string;
    aiPayload: any;
    createdAt: string;
}

const BusinessDetailsPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [business, setBusiness] = useState<BusinessDetails | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'estrategia' | 'identidade' | 'documentos'>('estrategia');
    const [downloadingDoc, setDownloadingDoc] = useState<string | null>(null);

    const handleDownloadPDF = (docName: string) => {
        setDownloadingDoc(docName);
        
        // Timeout to allow the off-screen element to render if it hasn't
        setTimeout(() => {
            const element = document.getElementById(`pdf-content-${docName.replace(/\s+/g, '-')}`);
            if (!element) {
                console.error("Element not found for PDF");
                setDownloadingDoc(null);
                return;
            }

            const opt = {
                margin:       15,
                filename:     `${business?.name || 'Faundr'} - ${docName}.pdf`,
                image:        { type: 'jpeg', quality: 0.98 },
                html2canvas:  { scale: 2, useCORS: true },
                jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
            };

            // Make it temporarily visible for html2pdf if needed (some versions ignore off-screen)
            element.style.display = 'block';
            
            html2pdf().from(element).set(opt).save().then(() => {
                element.style.display = 'none';
                setDownloadingDoc(null);
            }).catch((err: any) => {
                console.error("Error generating PDF", err);
                element.style.display = 'none';
                setDownloadingDoc(null);
            });
        }, 100);
    };

    useEffect(() => {
        fetch(`http://localhost:3001/api/business`)
            .then(res => res.json())
            .then(data => {
                const found = data.find((b: BusinessDetails) => b.id === id);
                if (found) {
                    setBusiness(found);
                }
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch business details", err);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh', flexDirection: 'column', gap: '20px' }}>
                <Loader2 size={48} color="#f83821" className="animate-spin" style={{ animation: 'spin 2s linear infinite' }} />
                <p style={{ color: '#888', fontWeight: 600 }}>A decodificar o império...</p>
                <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
            </div>
        );
    }

    if (!business) {
        return (
            <div style={{ textAlign: 'center', padding: '100px 0' }}>
                <h2 style={{ fontSize: '32px', color: '#fff', marginBottom: '20px' }}>Negócio não encontrado</h2>
                <button onClick={() => navigate('/membros/dashboard')} style={{ padding: '12px 24px', backgroundColor: '#333', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Voltar ao Dashboard</button>
            </div>
        );
    }

    const payload = business.aiPayload || {};
    const hasError = !!payload.error;
    const isMock = Object.keys(payload).length === 0 && !hasError;
    const primaryColor = business.colorPalette?.custom?.[0] || '#f83821';
    
    // Safety checks for AI Payload structure
    const execSummary = payload.executiveSummary || {};
    const persona = payload.targetPersona || {};
    const brand = payload.brandIdentity || {};
    const marketing = payload.marketingStrategy || {};
    const visuals = payload.visualPrompts || {};
    const docs = payload.documents || {};

    return (
        <div style={{ paddingBottom: '4rem', color: '#fff' }}>
            {/* Header */}
            <div style={{ marginBottom: '40px' }}>
                <button 
                    onClick={() => navigate('/membros/dashboard')} 
                    style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: 600, padding: '0 0 20px 0', transition: 'color 0.2s' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#888'}
                >
                    <ArrowLeft size={16} /> Voltar ao Dashboard
                </button>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '10px' }}>
                            <div style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: primaryColor, boxShadow: `0 0 20px ${primaryColor}` }} />
                            <h1 style={{ fontSize: '3.5rem', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1 }}>{business.name}</h1>
                        </div>
                        <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                            {business.niche.map(n => (
                                <span key={n} style={{ padding: '6px 14px', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '99px', fontSize: '12px', fontWeight: 700 }}>
                                    {n}
                                </span>
                            ))}
                        </div>
                    </div>
                    
                    <div style={{ textAlign: 'right' }}>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(0,200,83,0.1)', color: '#00c853', padding: '8px 16px', borderRadius: '99px', fontWeight: 800, fontSize: '12px', textTransform: 'uppercase' }}>
                            <Sparkles size={16} /> Gerado por Inteligência Artificial
                        </div>
                        <p style={{ color: '#666', fontSize: '13px', marginTop: '10px', fontWeight: 600 }}>Criado em {new Date(business.createdAt).toLocaleDateString('pt-PT')}</p>
                    </div>
                </div>
            </div>

            {hasError ? (
                <div style={{ backgroundColor: 'rgba(248,56,33,0.1)', border: '1px solid rgba(248,56,33,0.3)', padding: '30px', borderRadius: '16px', textAlign: 'center' }}>
                    <h3 style={{ color: '#f83821', fontSize: '24px', fontWeight: 800, marginBottom: '10px' }}>Erro na Geração IA</h3>
                    <p style={{ color: '#ccc' }}>{payload.error}</p>
                    <p style={{ color: '#888', marginTop: '10px', fontSize: '14px' }}>Certifique-se de que a API Key do Gemini está configurada corretamente no .env do backend.</p>
                </div>
            ) : isMock ? (
                <div style={{ backgroundColor: 'rgba(255,255,255,0.05)', padding: '30px', borderRadius: '16px', textAlign: 'center' }}>
                    <h3 style={{ color: '#fff', fontSize: '24px', fontWeight: 800, marginBottom: '10px' }}>A aguardar dados...</h3>
                    <p style={{ color: '#888' }}>O payload da IA não foi guardado corretamente ou está vazio.</p>
                </div>
            ) : (
                <>
                    {/* Navigation Tabs */}
                    <div style={{ display: 'flex', gap: '10px', marginBottom: '40px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '20px', overflowX: 'auto' }}>
                        {[
                            { id: 'estrategia', label: 'Estratégia & Negócio', icon: <Target size={18} /> },
                            { id: 'identidade', label: 'Identidade & Marca', icon: <Palette size={18} /> },
                            { id: 'documentos', label: 'Documentos Gerados', icon: <BookOpen size={18} /> }
                        ].map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px',
                                    backgroundColor: activeTab === tab.id ? 'rgba(255,255,255,0.1)' : 'transparent',
                                    color: activeTab === tab.id ? '#fff' : '#888',
                                    border: 'none', borderRadius: '12px', fontWeight: 800, fontSize: '14px', cursor: 'pointer', transition: 'all 0.2s', whiteSpace: 'nowrap'
                                }}
                            >
                                {tab.icon} {tab.label}
                            </button>
                        ))}
                    </div>

                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        {/* TAB 1: ESTRATÉGIA */}
                        {activeTab === 'estrategia' && (
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '30px' }}>
                                {/* Executive Summary */}
                                <div style={{ backgroundColor: '#111', border: '1px solid #222', borderRadius: '24px', padding: '30px' }}>
                                    <h3 style={{ fontSize: '20px', fontWeight: 900, marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}><Layers color="#f83821" /> Resumo Executivo</h3>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                        <div>
                                            <div style={{ color: '#888', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', marginBottom: '8px' }}>Missão</div>
                                            <div style={{ color: '#fff', fontSize: '16px', lineHeight: 1.5, fontWeight: 500 }}>{execSummary.mission || 'Não definido'}</div>
                                        </div>
                                        <div>
                                            <div style={{ color: '#888', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', marginBottom: '8px' }}>Visão</div>
                                            <div style={{ color: '#fff', fontSize: '16px', lineHeight: 1.5, fontWeight: 500 }}>{execSummary.vision || 'Não definido'}</div>
                                        </div>
                                        <div style={{ backgroundColor: 'rgba(248,56,33,0.05)', padding: '20px', borderRadius: '12px', borderLeft: '4px solid #f83821' }}>
                                            <div style={{ color: '#f83821', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', marginBottom: '8px' }}>Proposta de Valor</div>
                                            <div style={{ color: '#fff', fontSize: '18px', lineHeight: 1.4, fontWeight: 700 }}>"{execSummary.valueProposition || 'Não definido'}"</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Target Persona */}
                                <div style={{ backgroundColor: '#111', border: '1px solid #222', borderRadius: '24px', padding: '30px' }}>
                                    <h3 style={{ fontSize: '20px', fontWeight: 900, marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}><Target color="#f83821" /> Cliente Ideal (Persona)</h3>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                            <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: '#222', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>👤</div>
                                            <div>
                                                <div style={{ color: '#fff', fontSize: '20px', fontWeight: 800 }}>{persona.name || 'Persona'}</div>
                                                <div style={{ color: '#888', fontSize: '14px', fontWeight: 500 }}>{persona.demographics || 'Demografia indefinida'}</div>
                                            </div>
                                        </div>
                                        
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '10px' }}>
                                            <div>
                                                <div style={{ color: '#f83821', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', marginBottom: '10px' }}>Dores Principais</div>
                                                <ul style={{ paddingLeft: '20px', color: '#ccc', fontSize: '14px', lineHeight: 1.6, margin: 0 }}>
                                                    {persona.painPoints?.map((pain: string, i: number) => <li key={i}>{pain}</li>)}
                                                </ul>
                                            </div>
                                            <div>
                                                <div style={{ color: '#00c853', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', marginBottom: '10px' }}>Objetivos</div>
                                                <ul style={{ paddingLeft: '20px', color: '#ccc', fontSize: '14px', lineHeight: 1.6, margin: 0 }}>
                                                    {persona.goals?.map((goal: string, i: number) => <li key={i}>{goal}</li>)}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Marketing Strategy */}
                                <div style={{ backgroundColor: '#111', border: '1px solid #222', borderRadius: '24px', padding: '30px', gridColumn: '1 / -1' }}>
                                    <h3 style={{ fontSize: '20px', fontWeight: 900, marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}><Zap color="#f83821" /> Plano de Ataque (Go-to-Market)</h3>
                                    
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
                                        <div>
                                            <div style={{ color: '#888', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', marginBottom: '12px' }}>Estratégia de Lançamento</div>
                                            <div style={{ color: '#fff', fontSize: '15px', lineHeight: 1.6, backgroundColor: '#1a1a1a', padding: '20px', borderRadius: '12px' }}>
                                                {marketing.launchStrategy || 'Estratégia não definida.'}
                                            </div>
                                        </div>
                                        <div>
                                            <div style={{ color: '#888', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', marginBottom: '12px' }}>Canais de Aquisição</div>
                                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                                                {marketing.acquisitionChannels?.map((ch: string, i: number) => (
                                                    <span key={i} style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '8px 16px', borderRadius: '8px', fontSize: '14px', fontWeight: 600 }}>{ch}</span>
                                                ))}
                                            </div>
                                            
                                            <div style={{ color: '#888', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', marginBottom: '12px', marginTop: '24px' }}>Pilares de Conteúdo</div>
                                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                                                {marketing.contentPillars?.map((cp: string, i: number) => (
                                                    <span key={i} style={{ backgroundColor: 'rgba(248,56,33,0.1)', color: '#f83821', padding: '8px 16px', borderRadius: '8px', fontSize: '14px', fontWeight: 600 }}>{cp}</span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* TAB 2: IDENTIDADE & MARCA */}
                        {activeTab === 'identidade' && (
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '30px' }}>
                                {/* Colors & Typography */}
                                <div style={{ backgroundColor: '#111', border: '1px solid #222', borderRadius: '24px', padding: '30px' }}>
                                    <h3 style={{ fontSize: '20px', fontWeight: 900, marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}><Palette color="#f83821" /> Estilo & Cores</h3>
                                    
                                    <div style={{ color: '#888', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', marginBottom: '12px' }}>Paleta Principal ({business.visualStyle})</div>
                                    <div style={{ display: 'flex', gap: '15px', marginBottom: '30px' }}>
                                        {business.colorPalette?.custom?.length > 0 ? (
                                            business.colorPalette.custom.map((hex, i) => (
                                                <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                                                    <div style={{ width: '60px', height: '60px', backgroundColor: hex, borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.5)' }} />
                                                    <span style={{ fontSize: '12px', color: '#888', fontWeight: 600, textTransform: 'uppercase' }}>{hex}</span>
                                                </div>
                                            ))
                                        ) : (
                                            <div style={{ color: '#fff' }}>Baseada na preset: {business.colorPalette?.preset?.join(', ')}</div>
                                        )}
                                    </div>

                                    <div style={{ color: '#888', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', marginBottom: '12px' }}>Tipografia Sugerida</div>
                                    <div style={{ backgroundColor: '#1a1a1a', padding: '20px', borderRadius: '12px', fontSize: '16px', color: '#fff', fontWeight: 500 }}>
                                        {brand.typographySuggestions || 'Nenhuma sugestão recebida.'}
                                    </div>
                                </div>

                                {/* Values & Voice */}
                                <div style={{ backgroundColor: '#111', border: '1px solid #222', borderRadius: '24px', padding: '30px' }}>
                                    <h3 style={{ fontSize: '20px', fontWeight: 900, marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}><Sparkles color="#f83821" /> Essência da Marca</h3>
                                    
                                    <div style={{ color: '#888', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', marginBottom: '12px' }}>Tom de Voz</div>
                                    <div style={{ backgroundColor: '#1a1a1a', padding: '20px', borderRadius: '12px', fontSize: '15px', color: '#ccc', lineHeight: 1.6, marginBottom: '30px' }}>
                                        {brand.toneOfVoice || 'Não definido.'}
                                    </div>

                                    <div style={{ color: '#888', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', marginBottom: '12px' }}>Valores Inegociáveis</div>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                                        {brand.coreValues?.map((val: string, i: number) => (
                                            <span key={i} style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '10px 20px', borderRadius: '99px', fontSize: '14px', fontWeight: 800 }}>{val}</span>
                                        ))}
                                    </div>
                                </div>

                                {/* Prompts GenIA */}
                                <div style={{ backgroundColor: '#111', border: '1px solid #222', borderRadius: '24px', padding: '30px', gridColumn: '1 / -1' }}>
                                    <h3 style={{ fontSize: '20px', fontWeight: 900, marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '10px' }}><ImageIcon color="#f83821" /> Direção de Arte (Prompts IA)</h3>
                                    <p style={{ color: '#888', fontSize: '14px', marginBottom: '24px' }}>Copie estes prompts e use-os no Midjourney, DALL-E ou Adobe Firefly para gerar a sua identidade visual.</p>
                                    
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
                                        <div>
                                            <div style={{ color: '#fff', fontSize: '14px', fontWeight: 800, marginBottom: '10px' }}>Prompt para Logótipo</div>
                                            <div style={{ backgroundColor: '#000', padding: '20px', borderRadius: '12px', fontFamily: 'monospace', color: '#00c853', fontSize: '13px', lineHeight: 1.5, position: 'relative' }}>
                                                {visuals.logoPrompt || 'Não gerado.'}
                                            </div>
                                        </div>
                                        <div>
                                            <div style={{ color: '#fff', fontSize: '14px', fontWeight: 800, marginBottom: '10px' }}>Prompt para Brandbook (Moodboard)</div>
                                            <div style={{ backgroundColor: '#000', padding: '20px', borderRadius: '12px', fontFamily: 'monospace', color: '#00c853', fontSize: '13px', lineHeight: 1.5 }}>
                                                {visuals.brandbookPrompt || 'Não gerado.'}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* TAB 3: DOCUMENTOS */}
                        {activeTab === 'documentos' && (
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                                {Object.keys(docs).length === 0 ? (
                                    <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '60px 0', backgroundColor: '#111', borderRadius: '24px', border: '1px solid #222' }}>
                                        <BookOpen size={48} color="#444" style={{ marginBottom: '20px' }} />
                                        <h3 style={{ fontSize: '20px', color: '#fff', fontWeight: 800 }}>Nenhum documento estratégico solicitado</h3>
                                        <p style={{ color: '#888' }}>Não foram solicitados documentos adicionais durante o briefing.</p>
                                    </div>
                                ) : (
                                    Object.entries(docs).map(([docName, docContent], index) => {
                                        const docId = `pdf-content-${docName.replace(/\s+/g, '-')}`;
                                        return (
                                            <div key={index} style={{ backgroundColor: '#111', border: '1px solid #222', borderRadius: '20px', padding: '30px', display: 'flex', flexDirection: 'column', gap: '20px', transition: 'transform 0.2s', cursor: 'default' }}
                                                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                                                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                                            >
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                                    <div style={{ width: '50px', height: '50px', backgroundColor: 'rgba(248,56,33,0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <FileText color="#f83821" size={24} />
                                                    </div>
                                                    <div>
                                                        <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#fff', margin: 0 }}>{docName}</h3>
                                                        <p style={{ fontSize: '12px', color: '#888', margin: 0, marginTop: '4px' }}>Documento Estratégico PDF</p>
                                                    </div>
                                                </div>
                                                
                                                <button 
                                                    onClick={() => handleDownloadPDF(docName)}
                                                    disabled={downloadingDoc === docName}
                                                    style={{ 
                                                        marginTop: 'auto', 
                                                        width: '100%', 
                                                        padding: '14px', 
                                                        backgroundColor: downloadingDoc === docName ? '#333' : '#f83821', 
                                                        color: '#fff', 
                                                        border: 'none', 
                                                        borderRadius: '12px', 
                                                        fontWeight: 800, 
                                                        fontSize: '14px', 
                                                        display: 'flex', 
                                                        alignItems: 'center', 
                                                        justifyContent: 'center', 
                                                        gap: '8px', 
                                                        cursor: downloadingDoc === docName ? 'not-allowed' : 'pointer',
                                                        transition: 'background-color 0.2s'
                                                    }}
                                                >
                                                    {downloadingDoc === docName ? (
                                                        <><Loader2 size={18} className="animate-spin" style={{ animation: 'spin 2s linear infinite' }} /> A Gerar PDF...</>
                                                    ) : (
                                                        <><FileDown size={18} /> Download Documento</>
                                                    )}
                                                </button>

                                                {/* OFF-SCREEN PDF RENDER CONTAINER */}
                                                <div style={{ display: 'none' }}>
                                                    <div id={docId} style={{ padding: '40px', backgroundColor: '#ffffff', color: '#1a1a1a', fontFamily: 'Inter, sans-serif', width: '800px', margin: '0 auto' }}>
                                                        <div style={{ borderBottom: '2px solid #f83821', paddingBottom: '20px', marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                            <div>
                                                                <h1 style={{ fontSize: '32px', fontWeight: 900, color: '#1a1a1a', margin: 0 }}>{docName}</h1>
                                                                <p style={{ fontSize: '16px', color: '#666', margin: 0, marginTop: '8px', fontWeight: 600 }}>{business.name}</p>
                                                            </div>
                                                            <div style={{ color: '#f83821', fontWeight: 900, fontSize: '24px', letterSpacing: '-1px' }}>FAUNDR</div>
                                                        </div>
                                                        <div className="pdf-markdown-content" style={{ lineHeight: 1.8, fontSize: '14px', color: '#333' }}>
                                                            <ReactMarkdown>{docContent as string}</ReactMarkdown>
                                                        </div>
                                                        <div style={{ marginTop: '50px', borderTop: '1px solid #eaeaea', paddingTop: '20px', textAlign: 'center', fontSize: '10px', color: '#888' }}>
                                                            Gerado automaticamente pela Inteligência Artificial Faundr • {new Date().toLocaleDateString('pt-PT')}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })
                                )}
                            </div>
                        )}
                    </motion.div>
                </>
            )}

            {/* Markdown Styles */}
            <style>{`
                .markdown-content h1, .markdown-content h2, .markdown-content h3 { color: #fff; margin-top: 30px; margin-bottom: 15px; font-weight: 800; }
                .markdown-content h1 { font-size: 28px; }
                .markdown-content h2 { font-size: 22px; }
                .markdown-content h3 { font-size: 18px; }
                .markdown-content p { margin-bottom: 20px; }
                .markdown-content ul, .markdown-content ol { margin-bottom: 20px; padding-left: 20px; }
                .markdown-content li { margin-bottom: 8px; }
                .markdown-content strong { color: #fff; font-weight: 800; }
                .markdown-content blockquote { border-left: 4px solid #f83821; padding-left: 15px; margin-left: 0; color: #aaa; font-style: italic; }

                /* Styles specifically for the generated PDF */
                .pdf-markdown-content h1, .pdf-markdown-content h2, .pdf-markdown-content h3 { color: #1a1a1a; margin-top: 25px; margin-bottom: 12px; font-weight: 800; }
                .pdf-markdown-content h1 { font-size: 24px; border-bottom: 1px solid #eaeaea; padding-bottom: 10px; }
                .pdf-markdown-content h2 { font-size: 20px; }
                .pdf-markdown-content h3 { font-size: 16px; }
                .pdf-markdown-content p { margin-bottom: 15px; text-align: justify; }
                .pdf-markdown-content ul, .pdf-markdown-content ol { margin-bottom: 15px; padding-left: 20px; }
                .pdf-markdown-content li { margin-bottom: 6px; }
                .pdf-markdown-content strong { color: #000; font-weight: 800; }
                .pdf-markdown-content blockquote { border-left: 4px solid #f83821; padding-left: 15px; margin-left: 0; color: #555; font-style: italic; background-color: #f9f9f9; padding: 10px 15px; border-radius: 0 8px 8px 0; }
            `}</style>
        </div>
    );
};

export default BusinessDetailsPage;
