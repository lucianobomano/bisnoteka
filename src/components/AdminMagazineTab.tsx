import React, { useState, useEffect } from 'react';
import { Plus, Newspaper, MoreVertical, Edit, Trash2, X, Upload } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminMagazineTab() {
    const [magazines, setMagazines] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingMagazine, setEditingMagazine] = useState<any>(null);
    const [magazineToDelete, setMagazineToDelete] = useState<string | null>(null);
    const [currentTopic, setCurrentTopic] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [pdfFile, setPdfFile] = useState<File | null>(null);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        topics: [] as string[],
        issueNumber: '',
        coverImage: '',
        pdfFileUrl: '',
        releaseDate: ''
    });

    useEffect(() => {
        fetchMagazines();
    }, []);

    const fetchMagazines = async () => {
        try {
            setLoading(true);
            const res = await fetch(`\${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/api/magazine`);
            const data = await res.json();
            if (Array.isArray(data)) {
                setMagazines(data);
            } else {
                console.error("API returned non-array data:", data);
                setMagazines([]);
            }
        } catch (error) {
            console.error("Error fetching magazines:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        try {
            setIsSaving(true);
            const isEditing = !!editingMagazine;
            
            let finalPdfUrl = formData.pdfFileUrl;

            // If a new PDF file is selected, upload it first
            if (pdfFile) {
                // Get signed upload URL from our backend
                const urlRes = await fetch(`\${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/api/upload-pdf-url`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ filename: pdfFile.name })
                });

                if (!urlRes.ok) {
                    const errorData = await urlRes.json().catch(() => ({}));
                    throw new Error(errorData.error || 'Falha ao obter permissão para envio do arquivo no Supabase.');
                }

                const urlData = await urlRes.json();
                
                // Upload directly to Supabase
                const uploadRes = await fetch(urlData.signedUrl, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/pdf'
                    },
                    body: pdfFile
                });

                if (!uploadRes.ok) {
                    throw new Error('Falha ao enviar o arquivo PDF para o servidor de armazenamento.');
                }

                finalPdfUrl = urlData.publicUrl;
            }

            const url = isEditing 
                ? `\${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/api/magazine/${editingMagazine.id}`
                : `\${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/api/magazine`;
                
            const method = isEditing ? 'PUT' : 'POST';

            const payload = {
                ...formData,
                pdfFileUrl: finalPdfUrl
            };

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                setShowModal(false);
                setEditingMagazine(null);
                setPdfFile(null);
                setFormData({ title: '', description: '', topics: [], issueNumber: '', coverImage: '', pdfFileUrl: '', releaseDate: '' });
                fetchMagazines();
            } else {
                const body = await res.text();
                alert(`Erro ao guardar: ${body}`);
            }
        } catch (error: any) {
            console.error("Error saving magazine:", error);
            alert(`Erro ao guardar: ${error.message}`);
        } finally {
            setIsSaving(false);
        }
    };

    const handleDeleteClick = (id: string) => {
        setMagazineToDelete(id);
    };

    const confirmDelete = async () => {
        if (!magazineToDelete) return;
        try {
            const res = await fetch(`\${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/api/magazine/${magazineToDelete}`, { method: 'DELETE' });
            if (res.ok) {
                setMagazineToDelete(null);
                fetchMagazines();
            } else {
                alert("Erro ao eliminar. Certifique-se que o backend (server.ts) foi reiniciado após as últimas atualizações.");
                setMagazineToDelete(null);
            }
        } catch (error) {
            console.error("Error deleting magazine:", error);
            alert("Erro de conexão. O servidor backend está ligado?");
            setMagazineToDelete(null);
        }
    };

    const cancelDelete = () => {
        setMagazineToDelete(null);
    };

    const openEditModal = (mag: any) => {
        setEditingMagazine(mag);
        setPdfFile(null);
        setFormData({
            title: mag.title || '',
            description: mag.description || '',
            topics: mag.topics ? [...mag.topics] : [],
            issueNumber: mag.issueNumber ? String(mag.issueNumber) : '',
            coverImage: mag.coverImage || '',
            pdfFileUrl: mag.pdfFileUrl || '',
            releaseDate: mag.releaseDate ? mag.releaseDate.split('T')[0] : ''
        });
        setShowModal(true);
    };

    const openCreateModal = () => {
        setEditingMagazine(null);
        setPdfFile(null);
        setFormData({ title: '', description: '', topics: [], issueNumber: '', coverImage: '', pdfFileUrl: '', releaseDate: '' });
        setShowModal(true);
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({ ...formData, coverImage: reader.result as string });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAddTopic = () => {
        if (currentTopic.trim()) {
            setFormData({ ...formData, topics: [...formData.topics, currentTopic.trim()] });
            setCurrentTopic('');
        }
    };

    const handleRemoveTopic = (index: number) => {
        const newTopics = [...formData.topics];
        newTopics.splice(index, 1);
        setFormData({ ...formData, topics: newTopics });
    };

    const handlePdfUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setPdfFile(file);
            setFormData({ ...formData, pdfFileUrl: file.name });
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ fontSize: '24px', fontWeight: 900, color: '#0f172a' }}>Gestão de Revistas</h2>
                <button
                    onClick={openCreateModal}
                    style={{ backgroundColor: '#0011fd', color: '#fff', border: 'none', padding: '12px 25px', borderRadius: '12px', fontWeight: 900, fontSize: '14px', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
                >
                    <Plus size={18} /> NOVA EDIÇÃO
                </button>
            </div>

            {loading ? (
                <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>Carregando edições...</div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '30px' }}>
                    {magazines.length === 0 ? (
                        <div style={{ gridColumn: '1 / -1', padding: '40px', textAlign: 'center', color: '#64748b', backgroundColor: '#fff', borderRadius: '25px', border: '1px solid #e2e8f0' }}>
                            Nenhuma revista cadastrada no momento.
                        </div>
                    ) : (
                        magazines.map((mag, i) => (
                            <div key={mag.id || i} style={{ backgroundColor: '#fff', borderRadius: '25px', border: '1px solid #e2e8f0', padding: '15px', display: 'flex', flexDirection: 'column' }}>
                                <div style={{ position: 'relative', width: '100%', aspectRatio: '1/1.4', backgroundColor: '#f1f5f9', borderRadius: '15px', overflow: 'hidden', marginBottom: '15px' }}>
                                    {mag.coverImage ? (
                                        <img src={mag.coverImage} alt={mag.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    ) : (
                                        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <Newspaper size={40} color="#cbd5e1" />
                                        </div>
                                    )}
                                </div>
                                <div style={{ flex: 1, padding: '0 5px', display: 'flex', flexDirection: 'column' }}>
                                    <div style={{ fontWeight: 800, color: '#0f172a', marginBottom: '5px', lineHeight: '1.2' }}>{mag.title}</div>
                                    <div style={{ fontSize: '12px', color: '#64748b', flex: 1 }}>Vol {mag.issueNumber || i + 1}</div>
                                    
                                    <div style={{ display: 'flex', gap: '10px', marginTop: '15px', paddingTop: '15px', borderTop: '1px solid #f1f5f9' }}>
                                        <button onClick={() => openEditModal(mag)} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', padding: '8px', borderRadius: '8px', cursor: 'pointer', color: '#0f172a', fontWeight: 700, fontSize: '12px' }}>
                                            <Edit size={14} /> Editar
                                        </button>
                                        <button onClick={() => handleDeleteClick(mag.id)} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px', backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', padding: '8px', borderRadius: '8px', cursor: 'pointer', color: '#ef4444', fontWeight: 700, fontSize: '12px' }}>
                                            <Trash2 size={14} /> Eliminar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}

            <AnimatePresence>
                {showModal && (
                    <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            style={{ backgroundColor: '#ffffff', width: '100%', maxWidth: '700px', borderRadius: '40px', border: '1px solid #e2e8f0', overflow: 'hidden', maxHeight: '90vh', display: 'flex', flexDirection: 'column' }}
                        >
                            <div style={{ padding: '30px 40px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <h2 style={{ fontSize: '24px', fontWeight: 900, color: '#0f172a' }}>
                                    {editingMagazine ? 'EDITAR EDIÇÃO' : 'NOVA EDIÇÃO'}
                                </h2>
                                <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}><X size={24} /></button>
                            </div>
                            
                            <div style={{ padding: '40px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                        <label style={{ fontSize: '12px', fontWeight: 900, color: '#64748b' }}>TÍTULO DA REVISTA</label>
                                        <input type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} placeholder="Título principal..." style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', padding: '15px', borderRadius: '15px', color: '#0f172a' }} />
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                        <label style={{ fontSize: '12px', fontWeight: 900, color: '#64748b' }}>VOLUME / NÚMERO</label>
                                        <input type="number" value={formData.issueNumber} onChange={e => setFormData({...formData, issueNumber: e.target.value})} placeholder="Ex: 1" style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', padding: '15px', borderRadius: '15px', color: '#0f172a' }} />
                                    </div>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                    <label style={{ fontSize: '12px', fontWeight: 900, color: '#64748b' }}>DESCRIÇÃO (SINOPSE)</label>
                                    <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} placeholder="Resumo dos temas abordados..." style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', padding: '15px', borderRadius: '15px', color: '#0f172a', height: '100px', resize: 'none' }}></textarea>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                    <label style={{ fontSize: '12px', fontWeight: 900, color: '#64748b' }}>ASSUNTOS ABORDADOS</label>
                                    <div style={{ display: 'flex', gap: '10px' }}>
                                        <input 
                                            type="text" 
                                            value={currentTopic} 
                                            onChange={e => setCurrentTopic(e.target.value)} 
                                            placeholder="Ex: Inteligência Artificial" 
                                            style={{ flex: 1, backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', padding: '15px', borderRadius: '15px', color: '#0f172a' }} 
                                            onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleAddTopic(); } }}
                                        />
                                        <button 
                                            type="button"
                                            onClick={handleAddTopic} 
                                            style={{ backgroundColor: '#0011fd', color: '#fff', border: 'none', padding: '0 20px', borderRadius: '15px', fontWeight: 900, cursor: 'pointer' }}
                                        >
                                            Adicionar
                                        </button>
                                    </div>
                                    {formData.topics.length > 0 && (
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '10px' }}>
                                            {formData.topics.map((topic, idx) => (
                                                <div key={idx} style={{ backgroundColor: '#f1f5f9', padding: '8px 15px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', fontWeight: 700, color: '#0f172a' }}>
                                                    {topic}
                                                    <button type="button" onClick={() => handleRemoveTopic(idx)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', display: 'flex', alignItems: 'center', padding: 0 }}><X size={14} /></button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                        <label style={{ fontSize: '12px', fontWeight: 900, color: '#64748b' }}>CAPA DA REVISTA (UPLOAD)</label>
                                        <input type="file" accept="image/*" onChange={handleImageUpload} style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', padding: '12px', borderRadius: '15px', color: '#0f172a' }} />
                                        {formData.coverImage && <div style={{ fontSize: '10px', color: '#059669', fontWeight: 700 }}>✓ Imagem carregada (ou URL definida)</div>}
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                        <label style={{ fontSize: '12px', fontWeight: 900, color: '#64748b' }}>DATA DE LANÇAMENTO</label>
                                        <input type="date" value={formData.releaseDate} onChange={e => setFormData({...formData, releaseDate: e.target.value})} style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', padding: '15px', borderRadius: '15px', color: '#0f172a' }} />
                                    </div>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                    <label style={{ fontSize: '12px', fontWeight: 900, color: '#64748b' }}>ARQUIVO PDF DA REVISTA (UPLOAD)</label>
                                    <input type="file" accept="application/pdf" onChange={handlePdfUpload} style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', padding: '15px', borderRadius: '15px', color: '#0f172a' }} />
                                    {formData.pdfFileUrl && <div style={{ fontSize: '10px', color: '#059669', fontWeight: 700 }}>✓ Ficheiro PDF carregado</div>}
                                </div>
                                
                                <button 
                                    onClick={handleSave} 
                                    disabled={isSaving}
                                    style={{ backgroundColor: isSaving ? '#94a3b8' : '#0011fd', color: '#fff', border: 'none', padding: '18px', borderRadius: '15px', fontWeight: 900, fontSize: '16px', cursor: isSaving ? 'not-allowed' : 'pointer', marginTop: '10px' }}
                                >
                                    {isSaving ? 'A GUARDAR (PODE DEMORAR ALGUNS SEGUNDOS)...' : (editingMagazine ? 'GUARDAR ALTERAÇÕES' : 'SALVAR NO ACERVO')}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}

                {/* Custom Confirmation Modal for Deletion */}
                {magazineToDelete && (
                    <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            style={{ backgroundColor: '#ffffff', width: '100%', maxWidth: '400px', borderRadius: '30px', border: '1px solid #e2e8f0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
                        >
                            <div style={{ padding: '30px', textAlign: 'center' }}>
                                <div style={{ width: '60px', height: '60px', backgroundColor: 'rgba(239, 68, 68, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                                    <Trash2 size={30} color="#ef4444" />
                                </div>
                                <h3 style={{ fontSize: '20px', fontWeight: 900, color: '#0f172a', marginBottom: '10px' }}>Eliminar Revista?</h3>
                                <p style={{ color: '#64748b', fontSize: '14px', lineHeight: '1.5' }}>
                                    Tem certeza que deseja eliminar permanentemente esta revista? Esta ação não pode ser desfeita.
                                </p>
                            </div>
                            <div style={{ padding: '20px', backgroundColor: '#f8fafc', borderTop: '1px solid #f1f5f9', display: 'flex', gap: '10px' }}>
                                <button onClick={cancelDelete} style={{ flex: 1, padding: '12px', backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', fontWeight: 700, color: '#64748b', cursor: 'pointer' }}>
                                    Cancelar
                                </button>
                                <button onClick={confirmDelete} style={{ flex: 1, padding: '12px', backgroundColor: '#ef4444', border: 'none', borderRadius: '12px', fontWeight: 700, color: '#fff', cursor: 'pointer' }}>
                                    Sim, Eliminar
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
