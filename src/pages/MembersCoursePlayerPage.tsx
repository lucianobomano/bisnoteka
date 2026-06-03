import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PlayCircle, CheckCircle, Lock, ChevronLeft, Award } from 'lucide-react';
import { courses } from '../data/coursesData';

const MembersCoursePlayerPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const course = courses.find((c) => c.id === Number(id)) || courses[0];
    
    const [activeLesson, setActiveLesson] = useState(0);

    const modules = [
        {
            title: "Módulo 1: Fundamentos",
            lessons: [
                { title: "Bem-vindo ao Curso", duration: "05:20", completed: true, locked: false, videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
                { title: "A Mentalidade Correta", duration: "12:45", completed: true, locked: false, videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
                { title: "Definição de Objectivos", duration: "18:30", completed: false, locked: false, videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" }
            ]
        },
        {
            title: "Módulo 2: O Sistema",
            lessons: [
                { title: "A mecânica do negócio", duration: "25:10", completed: false, locked: true, videoUrl: "" },
                { title: "Como atrair clientes", duration: "30:00", completed: false, locked: true, videoUrl: "" },
            ]
        }
    ];

    return (
        <div style={{ paddingBottom: '3rem' }}>
            <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center' }}>
                <Link to="/membros" style={{ color: '#aaaaaa', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    <ChevronLeft size={16} /> Voltar aos meus cursos
                </Link>
            </div>
            
            <div className="player-grid">
                
                {/* Left side: Video Player */}
                <div style={{ width: '100%', flex: 1 }}>
                    <div className="video-container" style={{ position: 'relative', marginBottom: '1.5rem', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', border: '1px solid #333', backgroundColor: '#000' }}>
                        <video 
                            key={activeLesson}
                            controls
                            poster={course.img}
                            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                        >
                            <source src={modules[0].lessons[activeLesson]?.videoUrl || "https://www.w3schools.com/html/mov_bbb.mp4"} type="video/mp4" />
                            O seu navegador não suporta a tag de vídeo.
                        </video>
                    </div>
                    
                    <h1 style={{ fontSize: '1.875rem', fontWeight: 900, marginBottom: '1rem', color: '#fff', lineHeight: 1.2 }}>{modules[0].lessons[activeLesson]?.title || "Aula Carregando"}</h1>
                    <p style={{ color: '#aaaaaa', lineHeight: 1.6, marginBottom: '2rem', fontSize: '1rem' }}>
                        Nesta aula vamos abordar os conceitos fundamentais que precisa entender para aplicar a estratégia completa. Assista até ao fim e faça as anotações necessárias no seu caderno BISNOTEKA.
                    </p>
                    
                    <div style={{ padding: '1.5rem', backgroundColor: '#111', borderRadius: '1rem', border: '1px solid #333', display: 'flex', flexDirection: 'column', gap: '1.5rem', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <div style={{ fontSize: '0.75rem', fontWeight: 900, color: '#666', textTransform: 'uppercase', marginBottom: '0.75rem', letterSpacing: '0.05em' }}>Material da Aula</div>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                                    <button style={{ backgroundColor: 'transparent', border: '1px solid #0011fd', color: '#0011fd', padding: '0.5rem 1.25rem', borderRadius: '0.75rem', fontWeight: 700, fontSize: '0.875rem', cursor: 'pointer', transition: 'all 0.2s' }}>Slides PDF</button>
                                    <button style={{ backgroundColor: 'transparent', border: '1px solid #333', color: '#fff', padding: '0.5rem 1.25rem', borderRadius: '0.75rem', fontWeight: 700, fontSize: '0.875rem', cursor: 'pointer', transition: 'all 0.2s' }}>Resumo</button>
                                </div>
                            </div>
                            <button style={{ backgroundColor: '#0011fd', color: '#fff', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '0.75rem', fontWeight: 900, textTransform: 'uppercase', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', cursor: 'pointer', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', fontSize: '0.875rem' }}>
                                Concluir Aula <CheckCircle size={18} />
                            </button>
                        </div>
                    </div>
                </div>
                
                {/* Right side: Lessons List */}
                <div className="lesson-list-sidebar">
                    <div style={{ padding: '2rem 1.5rem 1.5rem 1.5rem', borderBottom: '1px solid #222' }}>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#fff', textTransform: 'uppercase', letterSpacing: '-0.025em', marginBottom: '0.25rem' }}>Conteúdo do Curso</h2>
                        <div style={{ fontSize: '0.875rem', color: '#aaaaaa', fontWeight: 500 }}>{course.title}</div>
                        
                        <div style={{ marginTop: '2rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#666', textTransform: 'uppercase', letterSpacing: '0.05em' }}>2 de 5 Aulas</span>
                                <span style={{ fontSize: '0.75rem', fontWeight: 900, color: '#0011fd', textTransform: 'uppercase', letterSpacing: '0.05em' }}>40% Completo</span>
                            </div>
                            <div className="progress-bar-bg" style={{ height: '6px' }}>
                                <div className="progress-bar-fill" style={{ width: '40%', backgroundImage: 'none', backgroundColor: '#0011fd' }}></div>
                            </div>
                        </div>
                    </div>
                    
                    <div style={{ padding: '1.5rem 1rem' }}>
                        {modules.map((mod, modIdx) => (
                            <div key={modIdx} style={{ marginBottom: '1.5rem' }}>
                                <h3 style={{ fontSize: '0.875rem', fontWeight: 900, color: '#fff', marginBottom: '0.75rem', padding: '0.5rem 1rem', backgroundColor: '#222', borderRadius: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                    {mod.title}
                                </h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                                    {mod.lessons.map((lesson, lessIdx) => {
                                        const isActive = modIdx === 0 && lessIdx === activeLesson;
                                        return (
                                            <div 
                                                key={lessIdx} 
                                                onClick={() => !lesson.locked && modIdx === 0 ? setActiveLesson(lessIdx) : null}
                                                className={`lesson-item ${lesson.locked ? 'locked' : ''} ${isActive ? 'active' : ''}`}
                                            >
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', width: '100%' }}>
                                                    <div style={{ width: '32px', height: '32px', flexShrink: 0, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: lesson.completed ? '#0011fd' : '#222' }}>
                                                        {lesson.locked ? <Lock size={14} color="#666" /> : (lesson.completed ? <CheckCircle size={14} color="#fff" /> : <PlayCircle size={14} color="#666" style={{ marginLeft: '2px' }} />)}
                                                    </div>
                                                    <div style={{ flex: 1, overflow: 'hidden' }}>
                                                        <div style={{ fontSize: '0.875rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontWeight: isActive ? 900 : 600, color: isActive ? '#fff' : (lesson.locked ? '#666' : '#cccccc') }}>{lesson.title}</div>
                                                        <div style={{ fontSize: '0.75rem', color: '#666', fontWeight: 500, marginTop: '2px' }}>{lesson.duration}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <div style={{ margin: '0 1rem 1.5rem 1rem', padding: '1.25rem', backgroundColor: 'rgba(234, 179, 8, 0.05)', border: '1px solid rgba(234, 179, 8, 0.2)', borderRadius: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ color: '#eab308', backgroundColor: 'rgba(234, 179, 8, 0.1)', padding: '0.5rem', borderRadius: '0.75rem', flexShrink: 0 }}>
                            <Award size={24} />
                        </div>
                        <div>
                            <div style={{ fontSize: '0.875rem', fontWeight: 900, color: '#eab308', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>Certificado Final</div>
                            <div style={{ fontSize: '0.75rem', color: '#aaaaaa', lineHeight: 1.2 }}>Complete todas as aulas para desbloquear.</div>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    );
};

export default MembersCoursePlayerPage;
