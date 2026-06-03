import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    X, Plus, Trash2,
    Upload, FileText, Image as ImageIcon,
    Users, Tag, Globe,
    CheckCircle2, AlertCircle, TrendingUp,
    ChevronRight, ChevronLeft, Rocket, DollarSign,
    BarChart, Zap, Shield, Target, Lightbulb,
    FileSpreadsheet, Layout, ShoppingBag, Terminal
} from 'lucide-react';

/* ─────────── Types ─────────── */
interface IdeaFile {
    id: string;
    name: string;
    type: 'pdf' | 'xlsx' | 'pptx' | 'docx' | 'csv' | 'canva' | 'image' | 'other';
    description: string;
    url: string;
}

interface ExecutionStep {
    id: string;
    title: string;
    description: string;
    duration: string;
    order: number;
}

interface GalleryImage {
    id: string;
    url: string;
    caption: string;
}

interface IdeaData {
    // Basic Info
    title: string;
    category: string;
    sector: string;
    description: string;
    summary: string;
    thumbnailUrl: string;

    // Financial
    investmentLevel: string;
    investmentMin: string;
    investmentMax: string;
    currency: string;
    profitPotential: string;
    revenueTimeframe: string;
    price: string;
    originalPrice: string;

    // Analysis
    difficulty: string;
    marketOpportunity: string;
    competitiveAdvantage: string;
    targetMarket: string;
    marketSize: string;

    // Monetization
    monetization: string[];

    // Execution
    steps: ExecutionStep[];

    // Skills & Resources
    requiredSkills: string[];
    requiredTools: string[];

    // Risks
    risks: string[];
    mitigations: string[];

    // Files
    files: IdeaFile[];

    // Gallery
    gallery: GalleryImage[];

    // Tags & SEO
    tags: string[];
    seoTitle: string;
    seoDescription: string;

    // Publishing
    isPublished: boolean;
    isFeatured: boolean;
    isValidated: boolean;
}

interface AdvancedIdeaModalProps {
    isOpen: boolean;
    onClose: () => void;
}

/* ─────────── Helpers ─────────── */
const uid = () => Math.random().toString(36).slice(2, 10);

const emptyStep = (order: number): ExecutionStep => ({
    id: uid(), title: '', description: '', duration: '', order,
});

/* ─────────── Styles ─────────── */
const s = {
    overlay: {
        position: 'fixed' as const, inset: 0,
        backgroundColor: 'rgba(15,23,42,0.85)', backdropFilter: 'blur(12px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 2000, padding: '15px',
    },
    container: {
        backgroundColor: '#ffffff', width: '100%', maxWidth: '960px',
        height: '92vh', borderRadius: '28px',
        border: '1px solid #e2e8f0', overflow: 'hidden',
        display: 'flex', flexDirection: 'column' as const,
        boxShadow: '0 25px 60px -15px rgba(0,0,0,0.25)',
    },
    header: {
        padding: '24px 32px', borderBottom: '1px solid #f1f5f9',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        flexShrink: 0,
    },
    body: { flex: 1, overflowY: 'auto' as const, padding: '32px' },
    footer: {
        padding: '20px 32px', borderTop: '1px solid #f1f5f9',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        flexShrink: 0, backgroundColor: '#fafbfc',
    },
    label: {
        fontSize: '11px', fontWeight: 800, color: '#64748b',
        textTransform: 'uppercase' as const, letterSpacing: '0.8px',
    },
    input: {
        backgroundColor: '#f8fafc', border: '1px solid #e2e8f0',
        padding: '14px 16px', borderRadius: '14px', color: '#0f172a',
        fontSize: '14px', fontWeight: 500, width: '100%', outline: 'none',
    },
    select: {
        backgroundColor: '#f8fafc', border: '1px solid #e2e8f0',
        padding: '14px 16px', borderRadius: '14px', color: '#0f172a',
        fontSize: '14px', fontWeight: 500, width: '100%', cursor: 'pointer',
    },
    textarea: {
        backgroundColor: '#f8fafc', border: '1px solid #e2e8f0',
        padding: '14px 16px', borderRadius: '14px', color: '#0f172a',
        fontSize: '14px', fontWeight: 500, width: '100%',
        resize: 'none' as const, minHeight: '100px', outline: 'none',
    },
    btnPrimary: {
        backgroundColor: '#059669', color: '#fff', border: 'none',
        padding: '14px 28px', borderRadius: '14px', fontWeight: 800,
        fontSize: '14px', cursor: 'pointer', display: 'flex',
        alignItems: 'center', gap: '8px',
        boxShadow: '0 4px 14px rgba(5,150,105,0.25)',
    },
    btnSecondary: {
        backgroundColor: '#fff', color: '#1e293b',
        border: '1px solid #e2e8f0', padding: '14px 28px',
        borderRadius: '14px', fontWeight: 700, fontSize: '14px',
        cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px',
    },
    btnDanger: {
        backgroundColor: '#fef2f2', color: '#ef4444',
        border: '1px solid #fecaca', padding: '8px 12px',
        borderRadius: '10px', fontWeight: 700, fontSize: '12px',
        cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px',
    },
    btnSmall: {
        backgroundColor: '#f1f5f9', color: '#475569',
        border: '1px solid #e2e8f0', padding: '8px 14px',
        borderRadius: '10px', fontWeight: 700, fontSize: '12px',
        cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px',
    },
    fieldGroup: { display: 'flex', flexDirection: 'column' as const, gap: '8px' },
    row: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' },
    row3: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' },
    section: { display: 'flex', flexDirection: 'column' as const, gap: '24px' },
    stepIndicator: (active: boolean, completed: boolean) => ({
        width: '36px', height: '36px', borderRadius: '50%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '13px', fontWeight: 800,
        backgroundColor: completed ? '#059669' : active ? '#f83821' : '#f1f5f9',
        color: completed || active ? '#fff' : '#94a3b8',
        border: active ? '3px solid rgba(248,56,33,0.2)' : 'none',
        transition: 'all 0.3s',
    }),
    stepLabel: (active: boolean) => ({
        fontSize: '11px', fontWeight: active ? 800 : 600,
        color: active ? '#0f172a' : '#94a3b8',
        textTransform: 'uppercase' as const, letterSpacing: '0.5px',
        marginTop: '6px',
    }),
    tagChip: {
        display: 'inline-flex', alignItems: 'center', gap: '6px',
        backgroundColor: '#fef2f2', color: '#dc2626',
        padding: '6px 12px', borderRadius: '8px',
        fontSize: '12px', fontWeight: 700,
    },
};

/* ─────────── STEPS ─────────── */
const steps = [
    { id: 1, label: 'Ideia & Setor' },
    { id: 2, label: 'Financeiro' },
    { id: 3, label: 'Mercado & Execução' },
    { id: 4, label: 'Ficheiros & Publicação' },
];

/* ═══════════════ COMPONENT ═══════════════ */
const AdvancedIdeaModal: React.FC<AdvancedIdeaModalProps> = ({ isOpen, onClose }) => {
    const [currentStep, setCurrentStep] = useState(1);

    /* list inputs */
    const [tagInput, setTagInput] = useState('');
    const [monetInput, setMonetInput] = useState('');
    const [skillInput, setSkillInput] = useState('');
    const [toolInput, setToolInput] = useState('');
    const [riskInput, setRiskInput] = useState('');
    const [mitigInput, setMitigInput] = useState('');

    const [idea, setIdea] = useState<IdeaData>({
        title: '', category: 'SaaS', sector: '', description: '', summary: '',
        thumbnailUrl: '',
        investmentLevel: 'Baixo', investmentMin: '', investmentMax: '',
        currency: 'KZ', profitPotential: 'Alto', revenueTimeframe: '',
        price: '', originalPrice: '',
        difficulty: 'Médio', marketOpportunity: '', competitiveAdvantage: '',
        targetMarket: '', marketSize: '',
        monetization: [], steps: [emptyStep(1)],
        requiredSkills: [], requiredTools: [],
        risks: [], mitigations: [],
        files: [], gallery: [],
        tags: [], seoTitle: '', seoDescription: '',
        isPublished: false, isFeatured: false, isValidated: false,
    });

    if (!isOpen) return null;

    const update = (patch: Partial<IdeaData>) => setIdea(prev => ({ ...prev, ...patch }));

    /* list helpers */
    const addToList = (field: keyof IdeaData, value: string, setter: (v: string) => void) => {
        if (value.trim() && !(idea[field] as string[]).includes(value.trim())) {
            update({ [field]: [...(idea[field] as string[]), value.trim()] });
            setter('');
        }
    };
    const removeFromList = (field: keyof IdeaData, idx: number) =>
        update({ [field]: (idea[field] as string[]).filter((_: string, i: number) => i !== idx) });

    /* step ops */
    const addStep = () => update({ steps: [...idea.steps, emptyStep(idea.steps.length + 1)] });
    const removeStep = (id: string) => update({ steps: idea.steps.filter(s => s.id !== id) });
    const updateStep = (id: string, patch: Partial<ExecutionStep>) =>
        update({ steps: idea.steps.map(s => s.id === id ? { ...s, ...patch } : s) });

    /* file ops */
    const addFile = () => update({
        files: [...idea.files, { id: uid(), name: '', type: 'pdf', description: '', url: '' }],
    });
    const removeFile = (id: string) => update({ files: idea.files.filter(f => f.id !== id) });
    const updateFile = (id: string, patch: Partial<IdeaFile>) =>
        update({ files: idea.files.map(f => f.id === id ? { ...f, ...patch } : f) });

    /* gallery ops */
    const addGalleryImage = () => update({
        gallery: [...idea.gallery, { id: uid(), url: '', caption: '' }],
    });
    const removeGalleryImage = (id: string) => update({ gallery: idea.gallery.filter(g => g.id !== id) });
    const updateGalleryImage = (id: string, patch: Partial<GalleryImage>) =>
        update({ gallery: idea.gallery.map(g => g.id === id ? { ...g, ...patch } : g) });

    /* file type icon */
    const fileIcon = (type: string) => {
        const icons: Record<string, React.ReactNode> = {
            pdf: <FileText size={14} color="#ef4444" />,
            xlsx: <FileSpreadsheet size={14} color="#059669" />,
            pptx: <Layout size={14} color="#f59e0b" />,
            docx: <FileText size={14} color="#3b82f6" />,
            csv: <Users size={14} color="#6b7280" />,
            canva: <ShoppingBag size={14} color="#a855f7" />,
            image: <ImageIcon size={14} color="#06b6d4" />,
        };
        return icons[type] || <FileText size={14} color="#94a3b8" />;
    };

    /* ═══════ STEP 1: IDEIA & SETOR ═══════ */
    const renderStep1 = () => (
        <div style={s.section}>
            <div style={s.fieldGroup}>
                <label style={s.label}>Nome da Ideia / Título *</label>
                <input style={s.input} placeholder="Ex: Micro-SaaS de Gestão para Mercados"
                    value={idea.title} onChange={e => update({ title: e.target.value })} />
            </div>

            <div style={s.row}>
                <div style={s.fieldGroup}>
                    <label style={s.label}>Categoria</label>
                    <select style={s.select} value={idea.category} onChange={e => update({ category: e.target.value })}>
                        <option>SaaS</option>
                        <option>E-commerce</option>
                        <option>Marketplace</option>
                        <option>Fintech</option>
                        <option>AgriTech</option>
                        <option>EdTech</option>
                        <option>HealthTech</option>
                        <option>Logística</option>
                        <option>Serviços</option>
                        <option>Comércio</option>
                        <option>Indústria</option>
                        <option>Consultoria</option>
                        <option>Energia</option>
                        <option>Alimentação</option>
                        <option>Outro</option>
                    </select>
                </div>
                <div style={s.fieldGroup}>
                    <label style={s.label}>Setor de Atuação</label>
                    <input style={s.input} placeholder="Ex: Tecnologia, Retalho, Agricultura..."
                        value={idea.sector} onChange={e => update({ sector: e.target.value })} />
                </div>
            </div>

            <div style={s.fieldGroup}>
                <label style={s.label}>Descrição Curta *</label>
                <textarea style={{ ...s.textarea, minHeight: '80px' }}
                    placeholder="Resumo de 1-2 frases sobre a ideia de negócio..."
                    value={idea.description} onChange={e => update({ description: e.target.value })} />
            </div>

            <div style={s.fieldGroup}>
                <label style={s.label}>Sumário Executivo *</label>
                <textarea style={{ ...s.textarea, minHeight: '140px' }}
                    placeholder="Explique em detalhe: qual o problema, a solução proposta, por que agora é o momento certo..."
                    value={idea.summary} onChange={e => update({ summary: e.target.value })} />
            </div>

            <div style={s.row}>
                <div style={s.fieldGroup}>
                    <label style={s.label}>Imagem de Capa (URL)</label>
                    <input style={s.input} placeholder="https://..."
                        value={idea.thumbnailUrl} onChange={e => update({ thumbnailUrl: e.target.value })} />
                    {idea.thumbnailUrl && (
                        <div style={{ width: '100%', height: '120px', borderRadius: '12px', overflow: 'hidden', backgroundColor: '#f1f5f9', marginTop: '4px' }}>
                            <img src={idea.thumbnailUrl} alt="preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                onError={(e: React.SyntheticEvent<HTMLImageElement>) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                        </div>
                    )}
                </div>
                <div style={s.fieldGroup}>
                    <label style={s.label}>Nível de Dificuldade</label>
                    <select style={s.select} value={idea.difficulty} onChange={e => update({ difficulty: e.target.value })}>
                        <option>Fácil</option>
                        <option>Médio</option>
                        <option>Difícil</option>
                        <option>Muito Difícil</option>
                    </select>
                    <p style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>
                        Dificuldade técnica e operacional para implementar
                    </p>
                </div>
            </div>

            {/* Tags */}
            <div style={s.fieldGroup}>
                <label style={s.label}>Tags / Palavras-chave</label>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <input style={{ ...s.input, flex: 1 }} placeholder="Adicionar tag..."
                        value={tagInput} onChange={e => setTagInput(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addToList('tags', tagInput, setTagInput))} />
                    <button onClick={() => addToList('tags', tagInput, setTagInput)} style={s.btnSmall}><Plus size={14} /></button>
                </div>
                {idea.tags.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '4px' }}>
                        {idea.tags.map((t, i) => (
                            <span key={i} style={s.tagChip}>
                                <Tag size={12} /> {t}
                                <X size={12} style={{ cursor: 'pointer' }} onClick={() => removeFromList('tags', i)} />
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );

    /* ═══════ STEP 2: FINANCEIRO ═══════ */
    const renderStep2 = () => (
        <div style={s.section}>
            {/* Investment */}
            <div style={{ backgroundColor: '#eff6ff', borderRadius: '18px', padding: '24px', border: '1px solid #bfdbfe' }}>
                <div style={{ fontSize: '13px', fontWeight: 800, color: '#1e40af', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <DollarSign size={16} /> INVESTIMENTO NECESSÁRIO
                </div>
                <div style={s.row3}>
                    <div style={s.fieldGroup}>
                        <label style={s.label}>Nível de Investimento</label>
                        <select style={s.select} value={idea.investmentLevel} onChange={e => update({ investmentLevel: e.target.value })}>
                            <option>Baixo (Menos de 1M KZ)</option>
                            <option>Médio (1M - 5M KZ)</option>
                            <option>Alto (5M - 20M KZ)</option>
                            <option>Muito Alto (Mais de 20M KZ)</option>
                        </select>
                    </div>
                    <div style={s.fieldGroup}>
                        <label style={s.label}>Mínimo Estimado</label>
                        <input style={s.input} placeholder="Ex: 50000"
                            value={idea.investmentMin} onChange={e => update({ investmentMin: e.target.value })} />
                    </div>
                    <div style={s.fieldGroup}>
                        <label style={s.label}>Máximo Estimado</label>
                        <input style={s.input} placeholder="Ex: 150000"
                            value={idea.investmentMax} onChange={e => update({ investmentMax: e.target.value })} />
                    </div>
                </div>
            </div>

            {/* Revenue & Profit */}
            <div style={{ backgroundColor: '#f0fdf4', borderRadius: '18px', padding: '24px', border: '1px solid #bbf7d0' }}>
                <div style={{ fontSize: '13px', fontWeight: 800, color: '#166534', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <TrendingUp size={16} /> POTENCIAL DE RETORNO
                </div>
                <div style={s.row3}>
                    <div style={s.fieldGroup}>
                        <label style={s.label}>Potencial de Lucro</label>
                        <select style={s.select} value={idea.profitPotential} onChange={e => update({ profitPotential: e.target.value })}>
                            <option>Moderado</option>
                            <option>Alto</option>
                            <option>Muito Alto</option>
                            <option>Exponencial</option>
                        </select>
                    </div>
                    <div style={s.fieldGroup}>
                        <label style={s.label}>Prazo de Retorno</label>
                        <input style={s.input} placeholder="Ex: 3-6 meses"
                            value={idea.revenueTimeframe} onChange={e => update({ revenueTimeframe: e.target.value })} />
                    </div>
                    <div style={s.fieldGroup}>
                        <label style={s.label}>Moeda</label>
                        <select style={s.select} value={idea.currency} onChange={e => update({ currency: e.target.value })}>
                            <option value="KZ">KZ (Kwanza)</option>
                            <option value="USD">USD (Dólar)</option>
                            <option value="EUR">EUR (Euro)</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Pricing (selling the idea pack) */}
            <div style={s.row}>
                <div style={s.fieldGroup}>
                    <label style={s.label}>Preço do Blueprint (KZ)</label>
                    <input style={s.input} placeholder="Ex: 25000"
                        value={idea.price} onChange={e => update({ price: e.target.value })} />
                    <p style={{ fontSize: '11px', color: '#94a3b8' }}>Preço para aceder ao pacote completo da ideia</p>
                </div>
                <div style={s.fieldGroup}>
                    <label style={s.label}>Preço Original (Riscado)</label>
                    <input style={s.input} placeholder="Ex: 45000"
                        value={idea.originalPrice} onChange={e => update({ originalPrice: e.target.value })} />
                </div>
            </div>

            {/* Monetization strategies */}
            <div style={{ backgroundColor: '#faf5ff', borderRadius: '18px', padding: '24px', border: '1px solid #e9d5ff' }}>
                <label style={{ ...s.label, color: '#7c3aed', marginBottom: '12px', display: 'block' }}>
                    <Lightbulb size={14} style={{ verticalAlign: 'middle', marginRight: '6px' }} />
                    MODELOS DE MONETIZAÇÃO DO NEGÓCIO
                </label>
                <div style={{ display: 'flex', gap: '10px', marginBottom: '12px' }}>
                    <input style={{ ...s.input, flex: 1, backgroundColor: '#fff' }}
                        placeholder="Ex: Assinatura Mensal (SaaS), Comissão por venda..."
                        value={monetInput} onChange={e => setMonetInput(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addToList('monetization', monetInput, setMonetInput))} />
                    <button onClick={() => addToList('monetization', monetInput, setMonetInput)} style={s.btnSmall}><Plus size={14} /></button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {idea.monetization.map((m, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: '#fff', padding: '10px 14px', borderRadius: '10px', border: '1px solid #e9d5ff' }}>
                            <DollarSign size={14} color="#7c3aed" />
                            <span style={{ flex: 1, fontSize: '13px', color: '#4c1d95' }}>{m}</span>
                            <X size={14} color="#94a3b8" style={{ cursor: 'pointer' }} onClick={() => removeFromList('monetization', i)} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    /* ═══════ STEP 3: MERCADO & EXECUÇÃO ═══════ */
    const renderStep3 = () => (
        <div style={s.section}>
            {/* Market Analysis */}
            <div style={{ backgroundColor: '#f8fafc', borderRadius: '18px', padding: '24px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <BarChart size={16} color="#f83821" /> ANÁLISE DE MERCADO
                </div>
                <div style={{ ...s.fieldGroup, marginBottom: '16px' }}>
                    <label style={s.label}>Oportunidade de Mercado *</label>
                    <textarea style={{ ...s.textarea, minHeight: '100px' }}
                        placeholder="Descreva por que esta ideia é viável agora, tendências de mercado, dados relevantes..."
                        value={idea.marketOpportunity} onChange={e => update({ marketOpportunity: e.target.value })} />
                </div>
                <div style={s.row}>
                    <div style={s.fieldGroup}>
                        <label style={s.label}>Mercado-Alvo</label>
                        <input style={s.input} placeholder="Ex: Pequenos retalhistas em zonas urbanas"
                            value={idea.targetMarket} onChange={e => update({ targetMarket: e.target.value })} />
                    </div>
                    <div style={s.fieldGroup}>
                        <label style={s.label}>Tamanho do Mercado</label>
                        <input style={s.input} placeholder="Ex: 500.000+ comerciantes"
                            value={idea.marketSize} onChange={e => update({ marketSize: e.target.value })} />
                    </div>
                </div>
                <div style={{ ...s.fieldGroup, marginTop: '16px' }}>
                    <label style={s.label}>Vantagem Competitiva</label>
                    <textarea style={{ ...s.textarea, minHeight: '80px' }}
                        placeholder="O que diferencia esta ideia das soluções existentes?"
                        value={idea.competitiveAdvantage} onChange={e => update({ competitiveAdvantage: e.target.value })} />
                </div>
            </div>

            {/* Execution Roadmap */}
            <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <div style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Target size={16} color="#f83821" /> ROADMAP DE EXECUÇÃO ({idea.steps.length} fases)
                    </div>
                    <button onClick={addStep} style={s.btnSmall}><Plus size={14} /> Nova Fase</button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {idea.steps.map((step, idx) => (
                        <div key={step.id} style={{ backgroundColor: '#f8fafc', borderRadius: '14px', border: '1px solid #e2e8f0', padding: '18px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                                <div style={{
                                    width: '32px', height: '32px', borderRadius: '10px',
                                    backgroundColor: '#10171f', color: '#fff', display: 'flex',
                                    alignItems: 'center', justifyContent: 'center',
                                    fontSize: '13px', fontWeight: 900,
                                }}>
                                    {idx + 1}
                                </div>
                                <span style={{ fontSize: '11px', fontWeight: 800, color: '#f83821', textTransform: 'uppercase' }}>
                                    Fase de Execução {idx + 1}
                                </span>
                                <div style={{ flex: 1 }} />
                                {idea.steps.length > 1 && (
                                    <button onClick={() => removeStep(step.id)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                                        <Trash2 size={14} color="#ef4444" />
                                    </button>
                                )}
                            </div>
                            <div style={s.row}>
                                <div style={s.fieldGroup}>
                                    <label style={s.label}>Título da Fase *</label>
                                    <input style={s.input} placeholder="Ex: Mapeamento, MVP, Piloto..."
                                        value={step.title} onChange={e => updateStep(step.id, { title: e.target.value })} />
                                </div>
                                <div style={s.fieldGroup}>
                                    <label style={s.label}>Duração Estimada</label>
                                    <input style={s.input} placeholder="Ex: 2-4 semanas"
                                        value={step.duration} onChange={e => updateStep(step.id, { duration: e.target.value })} />
                                </div>
                            </div>
                            <div style={{ ...s.fieldGroup, marginTop: '12px' }}>
                                <label style={s.label}>Descrição da Fase</label>
                                <textarea style={{ ...s.textarea, minHeight: '60px' }}
                                    placeholder="O que fazer nesta fase, objectivos específicos..."
                                    value={step.description} onChange={e => updateStep(step.id, { description: e.target.value })} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Skills Required */}
            <div style={{ backgroundColor: '#fefce8', borderRadius: '18px', padding: '24px', border: '1px solid #fde68a' }}>
                <label style={{ ...s.label, color: '#92400e', marginBottom: '12px', display: 'block' }}>
                    <Zap size={14} style={{ verticalAlign: 'middle', marginRight: '6px' }} />
                    SKILLS / COMPETÊNCIAS NECESSÁRIAS
                </label>
                <div style={{ display: 'flex', gap: '10px', marginBottom: '12px' }}>
                    <input style={{ ...s.input, flex: 1, backgroundColor: '#fff' }}
                        placeholder="Ex: Desenvolvimento Mobile, Marketing Digital..."
                        value={skillInput} onChange={e => setSkillInput(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addToList('requiredSkills', skillInput, setSkillInput))} />
                    <button onClick={() => addToList('requiredSkills', skillInput, setSkillInput)} style={s.btnSmall}><Plus size={14} /></button>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {idea.requiredSkills.map((sk, i) => (
                        <span key={i} style={{ ...s.tagChip, backgroundColor: '#fef3c7', color: '#92400e' }}>
                            {sk} <X size={12} style={{ cursor: 'pointer' }} onClick={() => removeFromList('requiredSkills', i)} />
                        </span>
                    ))}
                </div>
            </div>

            {/* Tools */}
            <div style={s.fieldGroup}>
                <label style={s.label}>Ferramentas / Recursos Necessários</label>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <input style={{ ...s.input, flex: 1 }}
                        placeholder="Ex: React Native, Stripe, AWS..."
                        value={toolInput} onChange={e => setToolInput(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addToList('requiredTools', toolInput, setToolInput))} />
                    <button onClick={() => addToList('requiredTools', toolInput, setToolInput)} style={s.btnSmall}><Plus size={14} /></button>
                </div>
                {idea.requiredTools.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '4px' }}>
                        {idea.requiredTools.map((t, i) => (
                            <span key={i} style={{ ...s.tagChip, backgroundColor: '#eef2ff', color: '#4338ca' }}>
                                <Terminal size={12} /> {t}
                                <X size={12} style={{ cursor: 'pointer' }} onClick={() => removeFromList('requiredTools', i)} />
                            </span>
                        ))}
                    </div>
                )}
            </div>

            {/* Risks & Mitigations */}
            <div style={s.row}>
                <div style={{ backgroundColor: '#fef2f2', borderRadius: '18px', padding: '20px', border: '1px solid #fecaca' }}>
                    <label style={{ ...s.label, color: '#991b1b', marginBottom: '10px', display: 'block' }}>
                        <AlertCircle size={14} style={{ verticalAlign: 'middle', marginRight: '4px' }} /> RISCOS
                    </label>
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
                        <input style={{ ...s.input, flex: 1, backgroundColor: '#fff', fontSize: '12px', padding: '10px 12px' }}
                            placeholder="Ex: Baixa adesão..." value={riskInput} onChange={e => setRiskInput(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addToList('risks', riskInput, setRiskInput))} />
                        <button onClick={() => addToList('risks', riskInput, setRiskInput)} style={s.btnSmall}><Plus size={12} /></button>
                    </div>
                    {idea.risks.map((r, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 10px', backgroundColor: '#fff', borderRadius: '8px', marginBottom: '6px', border: '1px solid #fecaca' }}>
                            <AlertCircle size={12} color="#ef4444" />
                            <span style={{ flex: 1, fontSize: '12px', color: '#7f1d1d' }}>{r}</span>
                            <X size={12} color="#94a3b8" style={{ cursor: 'pointer' }} onClick={() => removeFromList('risks', i)} />
                        </div>
                    ))}
                </div>
                <div style={{ backgroundColor: '#f0fdf4', borderRadius: '18px', padding: '20px', border: '1px solid #bbf7d0' }}>
                    <label style={{ ...s.label, color: '#166534', marginBottom: '10px', display: 'block' }}>
                        <Shield size={14} style={{ verticalAlign: 'middle', marginRight: '4px' }} /> MITIGAÇÕES
                    </label>
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
                        <input style={{ ...s.input, flex: 1, backgroundColor: '#fff', fontSize: '12px', padding: '10px 12px' }}
                            placeholder="Ex: Período de teste..." value={mitigInput} onChange={e => setMitigInput(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addToList('mitigations', mitigInput, setMitigInput))} />
                        <button onClick={() => addToList('mitigations', mitigInput, setMitigInput)} style={s.btnSmall}><Plus size={12} /></button>
                    </div>
                    {idea.mitigations.map((m, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 10px', backgroundColor: '#fff', borderRadius: '8px', marginBottom: '6px', border: '1px solid #bbf7d0' }}>
                            <CheckCircle2 size={12} color="#059669" />
                            <span style={{ flex: 1, fontSize: '12px', color: '#14532d' }}>{m}</span>
                            <X size={12} color="#94a3b8" style={{ cursor: 'pointer' }} onClick={() => removeFromList('mitigations', i)} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    /* ═══════ STEP 4: FICHEIROS & PUBLICAÇÃO ═══════ */
    const renderStep4 = () => (
        <div style={s.section}>
            {/* Files / Deliverables */}
            <div style={{ backgroundColor: '#f8fafc', borderRadius: '18px', padding: '24px', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <div style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Upload size={16} color="#f83821" /> FICHEIROS INCLUÍDOS ({idea.files.length})
                    </div>
                    <button onClick={addFile} style={s.btnSmall}><Plus size={14} /> Adicionar Ficheiro</button>
                </div>
                <p style={{ fontSize: '12px', color: '#64748b', marginBottom: '16px' }}>
                    Ficheiros que o comprador receberá: plano de negócio, modelo financeiro, pitch deck, identidade visual, etc.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {idea.files.map(file => (
                        <div key={file.id} style={{ backgroundColor: '#fff', borderRadius: '14px', border: '1px solid #e2e8f0', padding: '16px' }}>
                            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '10px' }}>
                                {fileIcon(file.type)}
                                <select value={file.type} onChange={e => updateFile(file.id, { type: e.target.value as IdeaFile['type'] })}
                                    style={{ ...s.select, width: '120px', padding: '8px 10px', fontSize: '12px' }}>
                                    <option value="pdf">PDF</option>
                                    <option value="xlsx">XLSX</option>
                                    <option value="pptx">PPTX</option>
                                    <option value="docx">DOCX</option>
                                    <option value="csv">CSV</option>
                                    <option value="canva">CANVA</option>
                                    <option value="image">Imagem</option>
                                    <option value="other">Outro</option>
                                </select>
                                <input style={{ ...s.input, flex: 1, padding: '8px 12px', fontSize: '13px' }}
                                    placeholder="Nome do ficheiro (Ex: Plano de Negócio Master)"
                                    value={file.name} onChange={e => updateFile(file.id, { name: e.target.value })} />
                                <button onClick={() => removeFile(file.id)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                                    <Trash2 size={14} color="#ef4444" />
                                </button>
                            </div>
                            <div style={s.row}>
                                <input style={{ ...s.input, fontSize: '12px', padding: '8px 12px' }}
                                    placeholder="Descrição breve do ficheiro..."
                                    value={file.description} onChange={e => updateFile(file.id, { description: e.target.value })} />
                                <input style={{ ...s.input, fontSize: '12px', padding: '8px 12px' }}
                                    placeholder="URL do ficheiro"
                                    value={file.url} onChange={e => updateFile(file.id, { url: e.target.value })} />
                            </div>
                        </div>
                    ))}
                    {idea.files.length === 0 && (
                        <div style={{ textAlign: 'center', padding: '30px', color: '#94a3b8', fontSize: '13px' }}>
                            Nenhum ficheiro adicionado. Clique em "+ Adicionar Ficheiro" acima.
                        </div>
                    )}
                </div>
            </div>

            {/* Gallery */}
            <div style={s.fieldGroup}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <label style={s.label}>Galeria de Imagens ({idea.gallery.length})</label>
                    <button onClick={addGalleryImage} style={s.btnSmall}><Plus size={14} /> Imagem</button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '8px' }}>
                    {idea.gallery.map(img => (
                        <div key={img.id} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                            <ImageIcon size={16} color="#06b6d4" />
                            <input style={{ ...s.input, flex: 2, padding: '10px 12px', fontSize: '12px' }}
                                placeholder="URL da imagem" value={img.url}
                                onChange={e => updateGalleryImage(img.id, { url: e.target.value })} />
                            <input style={{ ...s.input, flex: 1, padding: '10px 12px', fontSize: '12px' }}
                                placeholder="Legenda" value={img.caption}
                                onChange={e => updateGalleryImage(img.id, { caption: e.target.value })} />
                            <button onClick={() => removeGalleryImage(img.id)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                                <X size={14} color="#ef4444" />
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* SEO */}
            <div style={{ backgroundColor: '#f8fafc', borderRadius: '18px', padding: '24px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Globe size={16} color="#0011fd" /> SEO & METADADOS
                </div>
                <div style={{ ...s.fieldGroup, marginBottom: '16px' }}>
                    <label style={s.label}>Título SEO</label>
                    <input style={s.input} placeholder={idea.title || 'Título para motores de busca...'}
                        value={idea.seoTitle} onChange={e => update({ seoTitle: e.target.value })} />
                </div>
                <div style={s.fieldGroup}>
                    <label style={s.label}>Meta Descrição SEO</label>
                    <textarea style={{ ...s.textarea, minHeight: '70px' }}
                        placeholder="Descrição otimizada para resultados de busca..."
                        value={idea.seoDescription} onChange={e => update({ seoDescription: e.target.value })} />
                </div>
            </div>

            {/* Publishing Options */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '18px', backgroundColor: '#fefce8', borderRadius: '14px', border: '1px solid #fde68a', cursor: 'pointer' }}>
                    <input type="checkbox" checked={idea.isValidated} onChange={e => update({ isValidated: e.target.checked })}
                        style={{ width: '20px', height: '20px', accentColor: '#f59e0b' }} />
                    <div>
                        <div style={{ fontSize: '14px', fontWeight: 700, color: '#713f12' }}>✓ Ideia Validada pela Equipa</div>
                        <div style={{ fontSize: '12px', color: '#92400e' }}>Marcar como verificada e validada pelos especialistas Bisnoteka</div>
                    </div>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '18px', backgroundColor: '#f8fafc', borderRadius: '14px', border: '1px solid #e2e8f0', cursor: 'pointer' }}>
                    <input type="checkbox" checked={idea.isFeatured} onChange={e => update({ isFeatured: e.target.checked })}
                        style={{ width: '20px', height: '20px', accentColor: '#f83821' }} />
                    <div>
                        <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>Ideia em Destaque</div>
                        <div style={{ fontSize: '12px', color: '#64748b' }}>Mostrar na secção "Top Ideias" da biblioteca</div>
                    </div>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '18px', backgroundColor: idea.isPublished ? '#f0fdf4' : '#f8fafc', borderRadius: '14px', border: `1px solid ${idea.isPublished ? '#bbf7d0' : '#e2e8f0'}`, cursor: 'pointer' }}>
                    <input type="checkbox" checked={idea.isPublished} onChange={e => update({ isPublished: e.target.checked })}
                        style={{ width: '20px', height: '20px', accentColor: '#059669' }} />
                    <div>
                        <div style={{ fontSize: '14px', fontWeight: 700, color: idea.isPublished ? '#166534' : '#0f172a' }}>
                            {idea.isPublished ? '✓ Publicar Imediatamente' : 'Salvar como Rascunho'}
                        </div>
                        <div style={{ fontSize: '12px', color: '#64748b' }}>
                            {idea.isPublished ? 'A ideia ficará visível na biblioteca pública' : 'A ideia ficará oculta até ser publicada'}
                        </div>
                    </div>
                </label>
            </div>

            {/* Summary */}
            <div style={{ backgroundColor: '#10171f', borderRadius: '18px', padding: '24px', color: '#fff' }}>
                <div style={{ fontSize: '13px', fontWeight: 800, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={16} color="#f83821" /> RESUMO DA IDEIA
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px' }}>
                    <div>
                        <div style={{ fontSize: '22px', fontWeight: 900 }}>{idea.steps.length}</div>
                        <div style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 600 }}>FASES</div>
                    </div>
                    <div>
                        <div style={{ fontSize: '22px', fontWeight: 900 }}>{idea.monetization.length}</div>
                        <div style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 600 }}>MONETIZAÇÕES</div>
                    </div>
                    <div>
                        <div style={{ fontSize: '22px', fontWeight: 900 }}>{idea.files.length}</div>
                        <div style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 600 }}>FICHEIROS</div>
                    </div>
                    <div>
                        <div style={{ fontSize: '22px', fontWeight: 900 }}>{idea.risks.length}</div>
                        <div style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 600 }}>RISCOS</div>
                    </div>
                    <div>
                        <div style={{ fontSize: '22px', fontWeight: 900 }}>{idea.price || '0'}</div>
                        <div style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 600 }}>{idea.currency}</div>
                    </div>
                </div>
            </div>
        </div>
    );

    /* ═════════════ MAIN RENDER ═════════════ */
    return (
        <div style={s.overlay} onClick={onClose}>
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                style={s.container}
                onClick={e => e.stopPropagation()}
            >
                {/* Header */}
                <div style={s.header}>
                    <div>
                        <h2 style={{ fontSize: '20px', fontWeight: 900, color: '#0f172a', margin: 0 }}>
                            NOVA IDEIA DE NEGÓCIO
                        </h2>
                        <p style={{ fontSize: '12px', color: '#94a3b8', margin: '4px 0 0' }}>
                            Registar uma ideia de negócio completa com blueprint, análise de mercado e ficheiros
                        </p>
                    </div>
                    <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', padding: '8px' }}>
                        <X size={24} />
                    </button>
                </div>

                {/* Step Indicators */}
                <div style={{ padding: '0 32px', borderBottom: '1px solid #f1f5f9', flexShrink: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', padding: '16px 0' }}>
                        {steps.map((step, i) => (
                            <React.Fragment key={step.id}>
                                <button
                                    onClick={() => setCurrentStep(step.id)}
                                    style={{
                                        display: 'flex', flexDirection: 'column', alignItems: 'center',
                                        gap: '4px', background: 'none', border: 'none', cursor: 'pointer',
                                        padding: '8px 16px',
                                    }}
                                >
                                    <div style={s.stepIndicator(currentStep === step.id, currentStep > step.id)}>
                                        {currentStep > step.id ? <CheckCircle2 size={16} /> : step.id}
                                    </div>
                                    <span style={s.stepLabel(currentStep === step.id)}>{step.label}</span>
                                </button>
                                {i < steps.length - 1 && (
                                    <div style={{
                                        width: '40px', height: '2px', alignSelf: 'center', marginTop: '-14px',
                                        backgroundColor: currentStep > step.id ? '#059669' : '#e2e8f0',
                                        borderRadius: '1px', transition: 'all 0.3s',
                                    }} />
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </div>

                {/* Body */}
                <div style={s.body}>
                    <AnimatePresence mode="wait">
                        <motion.div key={currentStep}
                            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}>
                            {currentStep === 1 && renderStep1()}
                            {currentStep === 2 && renderStep2()}
                            {currentStep === 3 && renderStep3()}
                            {currentStep === 4 && renderStep4()}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Footer */}
                <div style={s.footer}>
                    <button onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                        disabled={currentStep === 1}
                        style={{ ...s.btnSecondary, opacity: currentStep === 1 ? 0.4 : 1, cursor: currentStep === 1 ? 'default' : 'pointer' }}>
                        <ChevronLeft size={18} /> Anterior
                    </button>
                    <div style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 600 }}>
                        Passo {currentStep} de {steps.length}
                    </div>
                    {currentStep < steps.length ? (
                        <button onClick={() => setCurrentStep(Math.min(steps.length, currentStep + 1))}
                            style={{ ...s.btnPrimary, backgroundColor: '#f83821', boxShadow: '0 4px 14px rgba(248,56,33,0.25)' }}>
                            Próximo <ChevronRight size={18} />
                        </button>
                    ) : (
                        <button onClick={() => { console.log('Idea Data:', idea); alert('Ideia publicada com sucesso! (dados no console)'); onClose(); }}
                            style={s.btnPrimary}>
                            <Rocket size={18} /> PUBLICAR IDEIA DISRUPTIVA
                        </button>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

export default AdvancedIdeaModal;
