import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    X, Plus, Trash2, ChevronDown, ChevronUp, GripVertical,
    Upload, FileText, Video, Image as ImageIcon, Link2,
    Users, Star, Tag, Globe, Eye, EyeOff,
    CheckCircle2, AlertCircle, Layers, BookOpen, PlayCircle,
    Settings, ChevronRight, ChevronLeft, Rocket
} from 'lucide-react';

/* ─────────── Types ─────────── */
interface LessonFile {
    id: string;
    name: string;
    type: 'video' | 'pdf' | 'image' | 'link' | 'other';
    url: string;
    size?: string;
}

interface Lesson {
    id: string;
    title: string;
    description: string;
    duration: string;
    videoUrl: string;
    isFree: boolean;
    isPublished: boolean;
    files: LessonFile[];
    order: number;
}

interface Module {
    id: string;
    title: string;
    description: string;
    isExpanded: boolean;
    lessons: Lesson[];
    order: number;
}

interface CourseData {
    title: string;
    subtitle: string;
    description: string;
    category: string;
    level: string;
    language: string;
    price: string;
    originalPrice: string;
    currency: string;
    thumbnailUrl: string;
    promoVideoUrl: string;
    tags: string[];
    requirements: string[];
    objectives: string[];
    targetAudience: string;
    estimatedDuration: string;
    certificateEnabled: boolean;
    isPublished: boolean;
    isFeatured: boolean;
    modules: Module[];
    instructor: string;
    instructorBio: string;
    instructorPhoto: string;
    seoTitle: string;
    seoDescription: string;
}

interface AdvancedCourseModalProps {
    isOpen: boolean;
    onClose: () => void;
}

/* ─────────── Helpers ─────────── */
const uid = () => Math.random().toString(36).slice(2, 10);

const emptyLesson = (order: number): Lesson => ({
    id: uid(), title: '', description: '', duration: '',
    videoUrl: '', isFree: false, isPublished: true,
    files: [], order,
});

const emptyModule = (order: number): Module => ({
    id: uid(), title: '', description: '',
    isExpanded: true, lessons: [emptyLesson(1)], order,
});

/* ─────────── Styles (shared) ─────────── */
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
    body: {
        flex: 1, overflowY: 'auto' as const, padding: '32px',
    },
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
        fontSize: '14px', fontWeight: 500, width: '100%',
        outline: 'none', transition: 'border-color 0.2s',
    },
    select: {
        backgroundColor: '#f8fafc', border: '1px solid #e2e8f0',
        padding: '14px 16px', borderRadius: '14px', color: '#0f172a',
        fontSize: '14px', fontWeight: 500, width: '100%', cursor: 'pointer',
    },
    textarea: {
        backgroundColor: '#f8fafc', border: '1px solid #e2e8f0',
        padding: '14px 16px', borderRadius: '14px', color: '#0f172a',
        fontSize: '14px', fontWeight: 500, width: '100%', resize: 'none' as const,
        minHeight: '100px', outline: 'none',
    },
    btnPrimary: {
        backgroundColor: '#0011fd', color: '#fff', border: 'none',
        padding: '14px 28px', borderRadius: '14px', fontWeight: 800,
        fontSize: '14px', cursor: 'pointer', display: 'flex',
        alignItems: 'center', gap: '8px',
        boxShadow: '0 4px 14px rgba(0,17,253,0.25)',
        transition: 'all 0.2s',
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
    fieldGroup: {
        display: 'flex', flexDirection: 'column' as const, gap: '8px',
    },
    row: {
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px',
    },
    row3: {
        display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px',
    },
    section: {
        display: 'flex', flexDirection: 'column' as const, gap: '24px',
    },
    stepIndicator: (active: boolean, completed: boolean) => ({
        width: '36px', height: '36px', borderRadius: '50%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '13px', fontWeight: 800,
        backgroundColor: completed ? '#059669' : active ? '#0011fd' : '#f1f5f9',
        color: completed || active ? '#fff' : '#94a3b8',
        border: active ? '3px solid rgba(0,17,253,0.2)' : 'none',
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
        backgroundColor: '#eef2ff', color: '#4338ca',
        padding: '6px 12px', borderRadius: '8px',
        fontSize: '12px', fontWeight: 700,
    },
};

/* ─────────── STEPS CONFIG ─────────── */
const steps = [
    { id: 1, label: 'Informações', icon: <BookOpen size={14} /> },
    { id: 2, label: 'Conteúdo', icon: <Layers size={14} /> },
    { id: 3, label: 'Módulos & Aulas', icon: <PlayCircle size={14} /> },
    { id: 4, label: 'Configurações', icon: <Settings size={14} /> },
];

/* ═══════════════ COMPONENT ═══════════════ */
const AdvancedCourseModal: React.FC<AdvancedCourseModalProps> = ({ isOpen, onClose }) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [tagInput, setTagInput] = useState('');
    const [reqInput, setReqInput] = useState('');
    const [objInput, setObjInput] = useState('');

    const [course, setCourse] = useState<CourseData>({
        title: '', subtitle: '', description: '',
        category: 'Empreendedorismo', level: 'Iniciante',
        language: 'Português', price: '', originalPrice: '',
        currency: 'KZ', thumbnailUrl: '', promoVideoUrl: '',
        tags: [], requirements: [], objectives: [],
        targetAudience: '', estimatedDuration: '',
        certificateEnabled: true, isPublished: false, isFeatured: false,
        modules: [emptyModule(1)],
        instructor: '', instructorBio: '', instructorPhoto: '',
        seoTitle: '', seoDescription: '',
    });

    if (!isOpen) return null;

    /* helpers */
    const updateCourse = (patch: Partial<CourseData>) =>
        setCourse(prev => ({ ...prev, ...patch }));

    const addTag = () => {
        if (tagInput.trim() && !course.tags.includes(tagInput.trim())) {
            updateCourse({ tags: [...course.tags, tagInput.trim()] });
            setTagInput('');
        }
    };

    const removeTag = (t: string) =>
        updateCourse({ tags: course.tags.filter(x => x !== t) });

    const addRequirement = () => {
        if (reqInput.trim()) {
            updateCourse({ requirements: [...course.requirements, reqInput.trim()] });
            setReqInput('');
        }
    };

    const removeRequirement = (i: number) =>
        updateCourse({ requirements: course.requirements.filter((_, idx) => idx !== i) });

    const addObjective = () => {
        if (objInput.trim()) {
            updateCourse({ objectives: [...course.objectives, objInput.trim()] });
            setObjInput('');
        }
    };

    const removeObjective = (i: number) =>
        updateCourse({ objectives: course.objectives.filter((_, idx) => idx !== i) });

    /* module ops */
    const addModule = () =>
        updateCourse({ modules: [...course.modules, emptyModule(course.modules.length + 1)] });

    const removeModule = (moduleId: string) =>
        updateCourse({ modules: course.modules.filter(m => m.id !== moduleId) });

    const updateModule = (moduleId: string, patch: Partial<Module>) =>
        updateCourse({
            modules: course.modules.map(m =>
                m.id === moduleId ? { ...m, ...patch } : m
            ),
        });

    const toggleModuleExpand = (moduleId: string) =>
        updateModule(moduleId, {
            isExpanded: !course.modules.find(m => m.id === moduleId)?.isExpanded,
        });

    /* lesson ops */
    const addLesson = (moduleId: string) => {
        const mod = course.modules.find(m => m.id === moduleId);
        if (!mod) return;
        updateModule(moduleId, {
            lessons: [...mod.lessons, emptyLesson(mod.lessons.length + 1)],
        });
    };

    const removeLesson = (moduleId: string, lessonId: string) => {
        const mod = course.modules.find(m => m.id === moduleId);
        if (!mod) return;
        updateModule(moduleId, {
            lessons: mod.lessons.filter(l => l.id !== lessonId),
        });
    };

    const updateLesson = (moduleId: string, lessonId: string, patch: Partial<Lesson>) => {
        const mod = course.modules.find(m => m.id === moduleId);
        if (!mod) return;
        updateModule(moduleId, {
            lessons: mod.lessons.map(l =>
                l.id === lessonId ? { ...l, ...patch } : l
            ),
        });
    };

    /* lesson file ops */
    const addLessonFile = (moduleId: string, lessonId: string) => {
        const mod = course.modules.find(m => m.id === moduleId);
        if (!mod) return;
        const lesson = mod.lessons.find(l => l.id === lessonId);
        if (!lesson) return;
        const newFile: LessonFile = { id: uid(), name: '', type: 'pdf', url: '' };
        updateLesson(moduleId, lessonId, {
            files: [...lesson.files, newFile],
        });
    };

    const removeLessonFile = (moduleId: string, lessonId: string, fileId: string) => {
        const mod = course.modules.find(m => m.id === moduleId);
        if (!mod) return;
        const lesson = mod.lessons.find(l => l.id === lessonId);
        if (!lesson) return;
        updateLesson(moduleId, lessonId, {
            files: lesson.files.filter(f => f.id !== fileId),
        });
    };

    const updateLessonFile = (moduleId: string, lessonId: string, fileId: string, patch: Partial<LessonFile>) => {
        const mod = course.modules.find(m => m.id === moduleId);
        if (!mod) return;
        const lesson = mod.lessons.find(l => l.id === lessonId);
        if (!lesson) return;
        updateLesson(moduleId, lessonId, {
            files: lesson.files.map(f => f.id === fileId ? { ...f, ...patch } : f),
        });
    };

    /* module stats */
    const totalLessons = course.modules.reduce((sum, m) => sum + m.lessons.length, 0);
    const totalFiles = course.modules.reduce(
        (sum, m) => sum + m.lessons.reduce((s2, l) => s2 + l.files.length, 0), 0
    );

    /* ──────── FILE TYPE ICON ──────── */
    const fileTypeIcon = (type: string) => {
        switch (type) {
            case 'video': return <Video size={14} color="#8b5cf6" />;
            case 'pdf': return <FileText size={14} color="#ef4444" />;
            case 'image': return <ImageIcon size={14} color="#06b6d4" />;
            case 'link': return <Link2 size={14} color="#0011fd" />;
            default: return <FileText size={14} color="#94a3b8" />;
        }
    };

    /* ═════════════ RENDER STEP 1: INFORMAÇÕES BÁSICAS ═════════════ */
    const renderStep1 = () => (
        <div style={s.section}>
            {/* Título & Subtítulo */}
            <div style={s.fieldGroup}>
                <label style={s.label}>Título do Curso *</label>
                <input
                    style={s.input}
                    placeholder="Ex: Marketing Digital Avançado 2.0"
                    value={course.title}
                    onChange={e => updateCourse({ title: e.target.value })}
                />
            </div>

            <div style={s.fieldGroup}>
                <label style={s.label}>Subtítulo / Tagline</label>
                <input
                    style={s.input}
                    placeholder="Uma frase curta que descreva o valor do curso"
                    value={course.subtitle}
                    onChange={e => updateCourse({ subtitle: e.target.value })}
                />
            </div>

            <div style={s.fieldGroup}>
                <label style={s.label}>Descrição Completa *</label>
                <textarea
                    style={{ ...s.textarea, minHeight: '140px' }}
                    placeholder="Descrição detalhada do curso, o que o aluno vai aprender, benefícios..."
                    value={course.description}
                    onChange={e => updateCourse({ description: e.target.value })}
                />
            </div>

            {/* Categoria / Nível / Idioma */}
            <div style={s.row3}>
                <div style={s.fieldGroup}>
                    <label style={s.label}>Categoria</label>
                    <select
                        style={s.select}
                        value={course.category}
                        onChange={e => updateCourse({ category: e.target.value })}
                    >
                        <option>Empreendedorismo</option>
                        <option>Marketing</option>
                        <option>Finanças</option>
                        <option>Desenvolvimento Pessoal</option>
                        <option>Tecnologia</option>
                        <option>Estratégia</option>
                        <option>Design</option>
                        <option>Liderança</option>
                        <option>Vendas</option>
                    </select>
                </div>
                <div style={s.fieldGroup}>
                    <label style={s.label}>Nível</label>
                    <select
                        style={s.select}
                        value={course.level}
                        onChange={e => updateCourse({ level: e.target.value })}
                    >
                        <option>Iniciante</option>
                        <option>Intermediário</option>
                        <option>Avançado</option>
                        <option>Todos os Níveis</option>
                    </select>
                </div>
                <div style={s.fieldGroup}>
                    <label style={s.label}>Idioma</label>
                    <select
                        style={s.select}
                        value={course.language}
                        onChange={e => updateCourse({ language: e.target.value })}
                    >
                        <option>Português</option>
                        <option>Inglês</option>
                        <option>Francês</option>
                        <option>Espanhol</option>
                    </select>
                </div>
            </div>

            {/* Instrutor */}
            <div style={{ backgroundColor: '#f8fafc', borderRadius: '18px', padding: '24px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Users size={16} color="#0011fd" /> INFORMAÇÕES DO INSTRUTOR
                </div>
                <div style={s.row}>
                    <div style={s.fieldGroup}>
                        <label style={s.label}>Nome do Instrutor</label>
                        <input
                            style={s.input}
                            placeholder="Nome completo..."
                            value={course.instructor}
                            onChange={e => updateCourse({ instructor: e.target.value })}
                        />
                    </div>
                    <div style={s.fieldGroup}>
                        <label style={s.label}>Foto do Instrutor (URL)</label>
                        <input
                            style={s.input}
                            placeholder="https://..."
                            value={course.instructorPhoto}
                            onChange={e => updateCourse({ instructorPhoto: e.target.value })}
                        />
                    </div>
                </div>
                <div style={{ ...s.fieldGroup, marginTop: '16px' }}>
                    <label style={s.label}>Bio do Instrutor</label>
                    <textarea
                        style={{ ...s.textarea, minHeight: '80px' }}
                        placeholder="Breve biografia profissional..."
                        value={course.instructorBio}
                        onChange={e => updateCourse({ instructorBio: e.target.value })}
                    />
                </div>
            </div>

            {/* Público Alvo */}
            <div style={s.fieldGroup}>
                <label style={s.label}>Público-Alvo</label>
                <textarea
                    style={{ ...s.textarea, minHeight: '70px' }}
                    placeholder="Para quem é este curso? Ex: Empreendedores iniciantes, profissionais de marketing..."
                    value={course.targetAudience}
                    onChange={e => updateCourse({ targetAudience: e.target.value })}
                />
            </div>
        </div>
    );

    /* ═════════════ RENDER STEP 2: CONTEÚDO & MEDIA ═════════════ */
    const renderStep2 = () => (
        <div style={s.section}>
            {/* Thumbnail & Promo Video */}
            <div style={s.row}>
                <div style={s.fieldGroup}>
                    <label style={s.label}>Imagem de Capa (URL) *</label>
                    <input
                        style={s.input}
                        placeholder="https://imagem-do-curso.jpg"
                        value={course.thumbnailUrl}
                        onChange={e => updateCourse({ thumbnailUrl: e.target.value })}
                    />
                    {course.thumbnailUrl && (
                        <div style={{ width: '100%', height: '140px', borderRadius: '12px', overflow: 'hidden', backgroundColor: '#f1f5f9', marginTop: '8px' }}>
                            <img src={course.thumbnailUrl} alt="preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                onError={(e: React.SyntheticEvent<HTMLImageElement>) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                        </div>
                    )}
                </div>
                <div style={s.fieldGroup}>
                    <label style={s.label}>Vídeo Promocional (URL)</label>
                    <input
                        style={s.input}
                        placeholder="https://youtube.com/watch?v=..."
                        value={course.promoVideoUrl}
                        onChange={e => updateCourse({ promoVideoUrl: e.target.value })}
                    />
                    <p style={{ fontSize: '11px', color: '#94a3b8', marginTop: '4px' }}>
                        Vídeo de apresentação gratuito para atrair alunos
                    </p>
                </div>
            </div>

            {/* Tags */}
            <div style={s.fieldGroup}>
                <label style={s.label}>Tags / Palavras-chave</label>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <input
                        style={{ ...s.input, flex: 1 }}
                        placeholder="Adicionar tag..."
                        value={tagInput}
                        onChange={e => setTagInput(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTag())}
                    />
                    <button onClick={addTag} style={s.btnSmall}><Plus size={14} /> Adicionar</button>
                </div>
                {course.tags.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px' }}>
                        {course.tags.map(t => (
                            <span key={t} style={s.tagChip}>
                                <Tag size={12} /> {t}
                                <X size={12} style={{ cursor: 'pointer' }} onClick={() => removeTag(t)} />
                            </span>
                        ))}
                    </div>
                )}
            </div>

            {/* Requisitos */}
            <div style={{ backgroundColor: '#fffbeb', borderRadius: '18px', padding: '24px', border: '1px solid #fde68a' }}>
                <label style={{ ...s.label, color: '#92400e', marginBottom: '12px', display: 'block' }}>
                    <AlertCircle size={14} style={{ verticalAlign: 'middle', marginRight: '6px' }} />
                    PRÉ-REQUISITOS DO CURSO
                </label>
                <div style={{ display: 'flex', gap: '10px', marginBottom: '12px' }}>
                    <input
                        style={{ ...s.input, flex: 1, backgroundColor: '#fff' }}
                        placeholder="Ex: Conhecimento básico de informática"
                        value={reqInput}
                        onChange={e => setReqInput(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addRequirement())}
                    />
                    <button onClick={addRequirement} style={s.btnSmall}><Plus size={14} /></button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {course.requirements.map((r, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: '#fff', padding: '10px 14px', borderRadius: '10px', border: '1px solid #fde68a' }}>
                            <CheckCircle2 size={14} color="#f59e0b" />
                            <span style={{ flex: 1, fontSize: '13px', color: '#451a03' }}>{r}</span>
                            <X size={14} color="#94a3b8" style={{ cursor: 'pointer' }} onClick={() => removeRequirement(i)} />
                        </div>
                    ))}
                </div>
            </div>

            {/* Objectivos */}
            <div style={{ backgroundColor: '#f0fdf4', borderRadius: '18px', padding: '24px', border: '1px solid #bbf7d0' }}>
                <label style={{ ...s.label, color: '#166534', marginBottom: '12px', display: 'block' }}>
                    <Star size={14} style={{ verticalAlign: 'middle', marginRight: '6px' }} />
                    O QUE O ALUNO VAI APRENDER
                </label>
                <div style={{ display: 'flex', gap: '10px', marginBottom: '12px' }}>
                    <input
                        style={{ ...s.input, flex: 1, backgroundColor: '#fff' }}
                        placeholder="Ex: Criar campanhas de marketing eficazes"
                        value={objInput}
                        onChange={e => setObjInput(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addObjective())}
                    />
                    <button onClick={addObjective} style={s.btnSmall}><Plus size={14} /></button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {course.objectives.map((o, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: '#fff', padding: '10px 14px', borderRadius: '10px', border: '1px solid #bbf7d0' }}>
                            <CheckCircle2 size={14} color="#059669" />
                            <span style={{ flex: 1, fontSize: '13px', color: '#14532d' }}>{o}</span>
                            <X size={14} color="#94a3b8" style={{ cursor: 'pointer' }} onClick={() => removeObjective(i)} />
                        </div>
                    ))}
                </div>
            </div>

            {/* Duração estimada */}
            <div style={s.fieldGroup}>
                <label style={s.label}>Duração Estimada Total</label>
                <input
                    style={s.input}
                    placeholder="Ex: 24 horas"
                    value={course.estimatedDuration}
                    onChange={e => updateCourse({ estimatedDuration: e.target.value })}
                />
            </div>
        </div>
    );

    /* ═════════════ RENDER STEP 3: MÓDULOS & AULAS ═════════════ */
    const renderStep3 = () => (
        <div style={s.section}>
            {/* Stats bar */}
            <div style={{ display: 'flex', gap: '20px', padding: '16px 20px', backgroundColor: '#f8fafc', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Layers size={16} color="#0011fd" />
                    <span style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a' }}>{course.modules.length}</span>
                    <span style={{ fontSize: '12px', color: '#64748b' }}>Módulos</span>
                </div>
                <div style={{ width: '1px', backgroundColor: '#e2e8f0' }} />
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <PlayCircle size={16} color="#8b5cf6" />
                    <span style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a' }}>{totalLessons}</span>
                    <span style={{ fontSize: '12px', color: '#64748b' }}>Aulas</span>
                </div>
                <div style={{ width: '1px', backgroundColor: '#e2e8f0' }} />
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <FileText size={16} color="#ef4444" />
                    <span style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a' }}>{totalFiles}</span>
                    <span style={{ fontSize: '12px', color: '#64748b' }}>Arquivos</span>
                </div>
            </div>

            {/* Modules list */}
            {course.modules.map((mod, modIdx) => (
                <div key={mod.id} style={{ borderRadius: '18px', border: '1px solid #e2e8f0', overflow: 'hidden', backgroundColor: '#fff' }}>
                    {/* Module header */}
                    <div
                        style={{
                            padding: '18px 20px', display: 'flex', alignItems: 'center', gap: '14px',
                            backgroundColor: mod.isExpanded ? '#f8fafc' : '#fff', cursor: 'pointer',
                            borderBottom: mod.isExpanded ? '1px solid #e2e8f0' : 'none',
                        }}
                        onClick={() => toggleModuleExpand(mod.id)}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#94a3b8' }}>
                            <GripVertical size={16} />
                        </div>
                        <div style={{
                            width: '32px', height: '32px', borderRadius: '10px',
                            backgroundColor: '#eef2ff', display: 'flex', alignItems: 'center',
                            justifyContent: 'center', fontSize: '13px', fontWeight: 900, color: '#4338ca',
                        }}>
                            {modIdx + 1}
                        </div>
                        <div style={{ flex: 1 }}>
                            <input
                                style={{ ...s.input, fontWeight: 700, fontSize: '15px', padding: '8px 12px', backgroundColor: 'transparent', border: 'none' }}
                                placeholder={`Módulo ${modIdx + 1} — Título do módulo`}
                                value={mod.title}
                                onChange={e => { e.stopPropagation(); updateModule(mod.id, { title: e.target.value }); }}
                                onClick={e => e.stopPropagation()}
                            />
                        </div>
                        <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 700 }}>
                            {mod.lessons.length} aula{mod.lessons.length !== 1 ? 's' : ''}
                        </span>
                        {mod.isExpanded ? <ChevronUp size={18} color="#94a3b8" /> : <ChevronDown size={18} color="#94a3b8" />}
                        {course.modules.length > 1 && (
                            <button
                                onClick={e => { e.stopPropagation(); removeModule(mod.id); }}
                                style={{ ...s.btnDanger, padding: '6px' }}
                            >
                                <Trash2 size={14} />
                            </button>
                        )}
                    </div>

                    {/* Module body (expanded) */}
                    <AnimatePresence>
                        {mod.isExpanded && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.25 }}
                                style={{ overflow: 'hidden' }}
                            >
                                <div style={{ padding: '20px' }}>
                                    {/* Module description */}
                                    <div style={{ ...s.fieldGroup, marginBottom: '20px' }}>
                                        <label style={s.label}>Descrição do Módulo</label>
                                        <textarea
                                            style={{ ...s.textarea, minHeight: '60px' }}
                                            placeholder="O que será abordado neste módulo..."
                                            value={mod.description}
                                            onChange={e => updateModule(mod.id, { description: e.target.value })}
                                        />
                                    </div>

                                    {/* Lessons */}
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                                        {mod.lessons.map((lesson, lesIdx) => (
                                            <div key={lesson.id} style={{
                                                backgroundColor: '#fafbfc', borderRadius: '14px',
                                                border: '1px solid #f1f5f9', padding: '18px',
                                            }}>
                                                {/* Lesson header row */}
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                                                    <div style={{
                                                        width: '26px', height: '26px', borderRadius: '8px',
                                                        backgroundColor: '#e0e7ff', display: 'flex',
                                                        alignItems: 'center', justifyContent: 'center',
                                                        fontSize: '11px', fontWeight: 900, color: '#4338ca',
                                                    }}>
                                                        {lesIdx + 1}
                                                    </div>
                                                    <PlayCircle size={16} color="#8b5cf6" />
                                                    <span style={{ fontSize: '12px', fontWeight: 800, color: '#0f172a', textTransform: 'uppercase' }}>
                                                        Aula {lesIdx + 1}
                                                    </span>
                                                    <div style={{ flex: 1 }} />
                                                    {/* Free toggle */}
                                                    <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '11px', fontWeight: 700, color: lesson.isFree ? '#059669' : '#94a3b8' }}>
                                                        <input
                                                            type="checkbox"
                                                            checked={lesson.isFree}
                                                            onChange={e => updateLesson(mod.id, lesson.id, { isFree: e.target.checked })}
                                                        />
                                                        {lesson.isFree ? 'GRATUITA' : 'PAGA'}
                                                    </label>
                                                    {/* Published toggle */}
                                                    <button
                                                        onClick={() => updateLesson(mod.id, lesson.id, { isPublished: !lesson.isPublished })}
                                                        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
                                                        title={lesson.isPublished ? 'Publicada' : 'Oculta'}
                                                    >
                                                        {lesson.isPublished
                                                            ? <Eye size={16} color="#059669" />
                                                            : <EyeOff size={16} color="#94a3b8" />}
                                                    </button>
                                                    {mod.lessons.length > 1 && (
                                                        <button
                                                            onClick={() => removeLesson(mod.id, lesson.id)}
                                                            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
                                                        >
                                                            <Trash2 size={14} color="#ef4444" />
                                                        </button>
                                                    )}
                                                </div>

                                                {/* Lesson Fields */}
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                                    <div style={s.row}>
                                                        <div style={s.fieldGroup}>
                                                            <label style={s.label}>Título da Aula *</label>
                                                            <input
                                                                style={s.input}
                                                                placeholder="Ex: Introdução ao Branding"
                                                                value={lesson.title}
                                                                onChange={e => updateLesson(mod.id, lesson.id, { title: e.target.value })}
                                                            />
                                                        </div>
                                                        <div style={s.fieldGroup}>
                                                            <label style={s.label}>Duração</label>
                                                            <input
                                                                style={s.input}
                                                                placeholder="Ex: 15:30"
                                                                value={lesson.duration}
                                                                onChange={e => updateLesson(mod.id, lesson.id, { duration: e.target.value })}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div style={s.fieldGroup}>
                                                        <label style={s.label}>Descrição da Aula</label>
                                                        <textarea
                                                            style={{ ...s.textarea, minHeight: '60px' }}
                                                            placeholder="O que será ensinado nesta aula..."
                                                            value={lesson.description}
                                                            onChange={e => updateLesson(mod.id, lesson.id, { description: e.target.value })}
                                                        />
                                                    </div>

                                                    <div style={s.fieldGroup}>
                                                        <label style={s.label}>URL do Vídeo da Aula</label>
                                                        <input
                                                            style={s.input}
                                                            placeholder="https://vimeo.com/... ou https://youtube.com/..."
                                                            value={lesson.videoUrl}
                                                            onChange={e => updateLesson(mod.id, lesson.id, { videoUrl: e.target.value })}
                                                        />
                                                    </div>

                                                    {/* Lesson Files / Resources */}
                                                    <div style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '16px', border: '1px solid #e2e8f0' }}>
                                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                                                            <span style={{ ...s.label, margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                                <Upload size={13} /> MATERIAIS DA AULA
                                                            </span>
                                                            <button
                                                                onClick={() => addLessonFile(mod.id, lesson.id)}
                                                                style={s.btnSmall}
                                                            >
                                                                <Plus size={12} /> Arquivo
                                                            </button>
                                                        </div>

                                                        {lesson.files.length === 0 ? (
                                                            <p style={{ fontSize: '12px', color: '#94a3b8', textAlign: 'center', padding: '16px' }}>
                                                                Nenhum material adicionado. Clique em "+ Arquivo" para adicionar PDFs, links ou recursos.
                                                            </p>
                                                        ) : (
                                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                                                {lesson.files.map(file => (
                                                                    <div key={file.id} style={{
                                                                        display: 'flex', alignItems: 'center', gap: '10px',
                                                                        padding: '10px 12px', backgroundColor: '#f8fafc',
                                                                        borderRadius: '10px', border: '1px solid #f1f5f9',
                                                                    }}>
                                                                        {fileTypeIcon(file.type)}
                                                                        <select
                                                                            value={file.type}
                                                                            onChange={e => updateLessonFile(mod.id, lesson.id, file.id, { type: e.target.value as LessonFile['type'] })}
                                                                            style={{ ...s.select, width: '100px', padding: '6px 8px', fontSize: '11px' }}
                                                                        >
                                                                            <option value="pdf">PDF</option>
                                                                            <option value="video">Vídeo</option>
                                                                            <option value="image">Imagem</option>
                                                                            <option value="link">Link</option>
                                                                            <option value="other">Outro</option>
                                                                        </select>
                                                                        <input
                                                                            style={{ ...s.input, flex: 1, padding: '6px 10px', fontSize: '12px' }}
                                                                            placeholder="Nome do arquivo"
                                                                            value={file.name}
                                                                            onChange={e => updateLessonFile(mod.id, lesson.id, file.id, { name: e.target.value })}
                                                                        />
                                                                        <input
                                                                            style={{ ...s.input, flex: 2, padding: '6px 10px', fontSize: '12px' }}
                                                                            placeholder="URL do arquivo"
                                                                            value={file.url}
                                                                            onChange={e => updateLessonFile(mod.id, lesson.id, file.id, { url: e.target.value })}
                                                                        />
                                                                        <button
                                                                            onClick={() => removeLessonFile(mod.id, lesson.id, file.id)}
                                                                            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
                                                                        >
                                                                            <X size={14} color="#ef4444" />
                                                                        </button>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}

                                        {/* Add lesson button */}
                                        <button
                                            onClick={() => addLesson(mod.id)}
                                            style={{
                                                ...s.btnSmall, justifyContent: 'center', padding: '14px',
                                                border: '2px dashed #d1d5db', backgroundColor: 'transparent',
                                                color: '#6b7280', width: '100%',
                                            }}
                                        >
                                            <Plus size={16} /> ADICIONAR AULA AO MÓDULO {modIdx + 1}
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            ))}

            {/* Add module button */}
            <button
                onClick={addModule}
                style={{
                    ...s.btnSecondary, justifyContent: 'center', padding: '18px',
                    border: '2px dashed #0011fd', color: '#0011fd', width: '100%',
                    backgroundColor: '#eef2ff', fontWeight: 800,
                }}
            >
                <Plus size={18} /> ADICIONAR NOVO MÓDULO
            </button>
        </div>
    );

    /* ═════════════ RENDER STEP 4: CONFIGURAÇÕES & PREÇO ═════════════ */
    const renderStep4 = () => (
        <div style={s.section}>
            {/* Pricing */}
            <div style={{ backgroundColor: '#eff6ff', borderRadius: '18px', padding: '24px', border: '1px solid #bfdbfe' }}>
                <div style={{ fontSize: '13px', fontWeight: 800, color: '#1e40af', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Tag size={16} /> PREÇO & MONETIZAÇÃO
                </div>
                <div style={s.row3}>
                    <div style={s.fieldGroup}>
                        <label style={s.label}>Preço Atual *</label>
                        <input
                            style={s.input}
                            placeholder="45000"
                            value={course.price}
                            onChange={e => updateCourse({ price: e.target.value })}
                        />
                    </div>
                    <div style={s.fieldGroup}>
                        <label style={s.label}>Preço Original (Riscado)</label>
                        <input
                            style={s.input}
                            placeholder="65000"
                            value={course.originalPrice}
                            onChange={e => updateCourse({ originalPrice: e.target.value })}
                        />
                    </div>
                    <div style={s.fieldGroup}>
                        <label style={s.label}>Moeda</label>
                        <select
                            style={s.select}
                            value={course.currency}
                            onChange={e => updateCourse({ currency: e.target.value })}
                        >
                            <option value="KZ">KZ (Kwanza)</option>
                            <option value="USD">USD (Dólar)</option>
                            <option value="EUR">EUR (Euro)</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Options */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '18px', backgroundColor: '#f8fafc', borderRadius: '14px', border: '1px solid #e2e8f0', cursor: 'pointer' }}>
                    <input
                        type="checkbox"
                        checked={course.certificateEnabled}
                        onChange={e => updateCourse({ certificateEnabled: e.target.checked })}
                        style={{ width: '20px', height: '20px', accentColor: '#0011fd' }}
                    />
                    <div>
                        <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>Emitir Certificado</div>
                        <div style={{ fontSize: '12px', color: '#64748b' }}>Os alunos receberão certificado ao concluir o curso</div>
                    </div>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '18px', backgroundColor: '#f8fafc', borderRadius: '14px', border: '1px solid #e2e8f0', cursor: 'pointer' }}>
                    <input
                        type="checkbox"
                        checked={course.isFeatured}
                        onChange={e => updateCourse({ isFeatured: e.target.checked })}
                        style={{ width: '20px', height: '20px', accentColor: '#0011fd' }}
                    />
                    <div>
                        <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>Curso em Destaque</div>
                        <div style={{ fontSize: '12px', color: '#64748b' }}>Mostrar na secção de destaques da página inicial</div>
                    </div>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '18px', backgroundColor: course.isPublished ? '#f0fdf4' : '#f8fafc', borderRadius: '14px', border: `1px solid ${course.isPublished ? '#bbf7d0' : '#e2e8f0'}`, cursor: 'pointer' }}>
                    <input
                        type="checkbox"
                        checked={course.isPublished}
                        onChange={e => updateCourse({ isPublished: e.target.checked })}
                        style={{ width: '20px', height: '20px', accentColor: '#059669' }}
                    />
                    <div>
                        <div style={{ fontSize: '14px', fontWeight: 700, color: course.isPublished ? '#166534' : '#0f172a' }}>
                            {course.isPublished ? '✓ Publicar Imediatamente' : 'Salvar como Rascunho'}
                        </div>
                        <div style={{ fontSize: '12px', color: '#64748b' }}>
                            {course.isPublished ? 'O curso ficará visível para todos os utilizadores' : 'O curso ficará oculto até ser publicado'}
                        </div>
                    </div>
                </label>
            </div>

            {/* SEO */}
            <div style={{ backgroundColor: '#f8fafc', borderRadius: '18px', padding: '24px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Globe size={16} color="#0011fd" /> SEO & METADADOS
                </div>
                <div style={{ ...s.fieldGroup, marginBottom: '16px' }}>
                    <label style={s.label}>Título SEO</label>
                    <input
                        style={s.input}
                        placeholder={course.title || 'Título para motores de busca...'}
                        value={course.seoTitle}
                        onChange={e => updateCourse({ seoTitle: e.target.value })}
                    />
                </div>
                <div style={s.fieldGroup}>
                    <label style={s.label}>Meta Descrição SEO</label>
                    <textarea
                        style={{ ...s.textarea, minHeight: '70px' }}
                        placeholder="Descrição otimizada para aparecer nos resultados de busca..."
                        value={course.seoDescription}
                        onChange={e => updateCourse({ seoDescription: e.target.value })}
                    />
                </div>
            </div>

            {/* Summary */}
            <div style={{ backgroundColor: '#0f172a', borderRadius: '18px', padding: '24px', color: '#fff' }}>
                <div style={{ fontSize: '13px', fontWeight: 800, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={16} color="#34d399" /> RESUMO DO CURSO
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
                    <div>
                        <div style={{ fontSize: '24px', fontWeight: 900 }}>{course.modules.length}</div>
                        <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 600 }}>MÓDULOS</div>
                    </div>
                    <div>
                        <div style={{ fontSize: '24px', fontWeight: 900 }}>{totalLessons}</div>
                        <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 600 }}>AULAS</div>
                    </div>
                    <div>
                        <div style={{ fontSize: '24px', fontWeight: 900 }}>{totalFiles}</div>
                        <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 600 }}>ARQUIVOS</div>
                    </div>
                    <div>
                        <div style={{ fontSize: '24px', fontWeight: 900 }}>{course.price || '0'}</div>
                        <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 600 }}>{course.currency}</div>
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
                {/* ──── HEADER ──── */}
                <div style={s.header}>
                    <div>
                        <h2 style={{ fontSize: '20px', fontWeight: 900, color: '#0f172a', margin: 0 }}>
                            CRIAR NOVO CURSO
                        </h2>
                        <p style={{ fontSize: '12px', color: '#94a3b8', margin: '4px 0 0' }}>
                            Preencha todas as informações para publicar o curso na plataforma
                        </p>
                    </div>
                    <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', padding: '8px' }}>
                        <X size={24} />
                    </button>
                </div>

                {/* ──── STEP INDICATORS ──── */}
                <div style={{ padding: '0 32px', borderBottom: '1px solid #f1f5f9', flexShrink: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', padding: '16px 0' }}>
                        {steps.map((step, i) => (
                            <React.Fragment key={step.id}>
                                <button
                                    onClick={() => setCurrentStep(step.id)}
                                    style={{
                                        display: 'flex', flexDirection: 'column', alignItems: 'center',
                                        gap: '4px', background: 'none', border: 'none', cursor: 'pointer',
                                        padding: '8px 16px', opacity: 1,
                                    }}
                                >
                                    <div style={s.stepIndicator(currentStep === step.id, currentStep > step.id)}>
                                        {currentStep > step.id ? <CheckCircle2 size={16} /> : step.id}
                                    </div>
                                    <span style={s.stepLabel(currentStep === step.id)}>
                                        {step.label}
                                    </span>
                                </button>
                                {i < steps.length - 1 && (
                                    <div style={{
                                        width: '40px', height: '2px', alignSelf: 'center',
                                        marginTop: '-14px',
                                        backgroundColor: currentStep > step.id ? '#059669' : '#e2e8f0',
                                        borderRadius: '1px', transition: 'all 0.3s',
                                    }} />
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </div>

                {/* ──── BODY ──── */}
                <div style={s.body}>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentStep}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.2 }}
                        >
                            {currentStep === 1 && renderStep1()}
                            {currentStep === 2 && renderStep2()}
                            {currentStep === 3 && renderStep3()}
                            {currentStep === 4 && renderStep4()}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* ──── FOOTER ──── */}
                <div style={s.footer}>
                    <button
                        onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                        disabled={currentStep === 1}
                        style={{
                            ...s.btnSecondary,
                            opacity: currentStep === 1 ? 0.4 : 1,
                            cursor: currentStep === 1 ? 'default' : 'pointer',
                        }}
                    >
                        <ChevronLeft size={18} /> Anterior
                    </button>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#94a3b8', fontWeight: 600 }}>
                        Passo {currentStep} de {steps.length}
                    </div>

                    {currentStep < steps.length ? (
                        <button
                            onClick={() => setCurrentStep(Math.min(steps.length, currentStep + 1))}
                            style={s.btnPrimary}
                        >
                            Próximo <ChevronRight size={18} />
                        </button>
                    ) : (
                        <button
                            onClick={() => {
                                console.log('Course Data:', course);
                                alert('Curso criado com sucesso! (dados no console)');
                                onClose();
                            }}
                            style={{ ...s.btnPrimary, backgroundColor: '#059669', boxShadow: '0 4px 14px rgba(5,150,105,0.25)' }}
                        >
                            <Rocket size={18} /> PUBLICAR CURSO
                        </button>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

export default AdvancedCourseModal;
