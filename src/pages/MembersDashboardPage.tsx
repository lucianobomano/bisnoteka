import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlayCircle, Clock, Trophy, Star, Play, Briefcase, Wand2, ChevronRight, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';


interface RealBusiness {
    id: string;
    name: string;
    niche: string[];
    visualStyle: string;
    colorPalette: { preset: string[]; custom: string[] };
    status: string;
    createdAt: string;
}

const MembersDashboardPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'cursos' | 'negocios'>('cursos');
    const [realBusinesses, setRealBusinesses] = useState<RealBusiness[]>([]);
    const [myCourses, setMyCourses] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isCoursesLoading, setIsCoursesLoading] = useState(true);

    React.useEffect(() => {
        if (activeTab === 'negocios') {
            setIsLoading(true);
            fetch('http://localhost:3001/api/business')
                .then(res => res.json())
                .then(data => {
                    setRealBusinesses(data);
                    setIsLoading(false);
                })
                .catch(err => {
                    console.error("Failed to fetch businesses", err);
                    setIsLoading(false);
                });
        }
    }, [activeTab]);

    React.useEffect(() => {
        fetch('http://localhost:3001/api/courses')
            .then(res => res.json())
            .then(data => {
                const formatted = data.slice(0, 2).map((c: any, index: number) => ({
                    ...c,
                    img: c.coverImage || "/media/COURSE_ECOMMERCE.png",
                    progress: index === 0 ? 35 : 0
                }));
                setMyCourses(formatted);
                setIsCoursesLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch courses", err);
                setIsCoursesLoading(false);
            });
    }, []);

    return (
        <div style={{ paddingBottom: '2rem' }}>
            <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px' }}>
                <div>
                    <h1 style={{ fontSize: '2.25rem', fontWeight: 900, marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '-0.025em', color: '#fff' }}>
                        Bem-vindo de volta!
                    </h1>
                    <p style={{ color: '#aaaaaa', fontSize: '1.125rem' }}>O seu painel central de evolução e negócios.</p>
                </div>

                {/* Tab Navigation */}
                <div style={{ display: 'flex', backgroundColor: '#111', padding: '6px', borderRadius: '16px', border: '1px solid #222' }}>
                    <button
                        onClick={() => setActiveTab('cursos')}
                        style={{
                            padding: '12px 24px',
                            borderRadius: '12px',
                            border: 'none',
                            backgroundColor: activeTab === 'cursos' ? '#222' : 'transparent',
                            color: activeTab === 'cursos' ? '#fff' : '#888',
                            fontSize: '14px',
                            fontWeight: 800,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            transition: 'all 0.2s'
                        }}
                    >
                        <GraduationCap size={18} color={activeTab === 'cursos' ? '#f83821' : '#888'} /> O Meu Aprendizado
                    </button>
                    <button
                        onClick={() => setActiveTab('negocios')}
                        style={{
                            padding: '12px 24px',
                            borderRadius: '12px',
                            border: 'none',
                            backgroundColor: activeTab === 'negocios' ? '#222' : 'transparent',
                            color: activeTab === 'negocios' ? '#fff' : '#888',
                            fontSize: '14px',
                            fontWeight: 800,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            transition: 'all 0.2s'
                        }}
                    >
                        <Briefcase size={18} color={activeTab === 'negocios' ? '#f83821' : '#888'} /> Os Meus Negócios
                    </button>
                </div>
            </div>

            <AnimatePresence mode="wait">
                {activeTab === 'cursos' && (
                    <motion.div key="cursos" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
                        {/* Dashboard Stats */}
                        <div className="members-stats-grid">
                            <div className="members-stat-card" style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <div style={{ width: '56px', height: '56px', backgroundColor: 'rgba(0, 17, 253, 0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                    <PlayCircle color="#0011fd" size={28} />
                                </div>
                                <div>
                                    <div style={{ fontSize: '1.875rem', fontWeight: 900, color: '#fff', lineHeight: 1, marginBottom: '4px' }}>2</div>
                                    <div style={{ fontSize: '0.75rem', color: '#666', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Cursos Ativos</div>
                                </div>
                            </div>
                            <div className="members-stat-card" style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <div style={{ width: '56px', height: '56px', backgroundColor: 'rgba(248, 56, 33, 0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                    <Clock color="#f83821" size={28} />
                                </div>
                                <div>
                                    <div style={{ fontSize: '1.875rem', fontWeight: 900, color: '#fff', lineHeight: 1, marginBottom: '4px' }}>12h 45m</div>
                                    <div style={{ fontSize: '0.75rem', color: '#666', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Horas Estudadas</div>
                                </div>
                            </div>
                            <div className="members-stat-card" style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <div style={{ width: '56px', height: '56px', backgroundColor: 'rgba(234, 179, 8, 0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                    <Trophy color="#eab308" size={28} />
                                </div>
                                <div>
                                    <div style={{ fontSize: '1.875rem', fontWeight: 900, color: '#fff', lineHeight: 1, marginBottom: '4px' }}>0</div>
                                    <div style={{ fontSize: '0.75rem', color: '#666', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Certificados</div>
                                </div>
                            </div>
                        </div>

                        {/* My Courses */}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', marginTop: '2rem' }}>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.025em', color: '#fff' }}>Cursos em Andamento</h2>
                        </div>
                        
                        <div className="course-grid">
                            {myCourses.map((course, idx) => (
                                <motion.div
                                    key={course.id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: idx * 0.05 }}
                                    whileHover={{ y: -10 }}
                                    style={{
                                        width: '100%',
                                        backgroundColor: '#111111',
                                        backdropFilter: 'blur(10px)',
                                        WebkitBackdropFilter: 'blur(10px)',
                                        borderRadius: '24px',
                                        padding: '14px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        position: 'relative',
                                        overflow: 'hidden',
                                        border: '1px solid #222',
                                        boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
                                    }}
                                >
                                    {/* Category Badge */}
                                    <div style={{
                                        position: 'absolute',
                                        top: '20px',
                                        right: '20px',
                                        backgroundColor: '#f83821',
                                        color: '#fff',
                                        padding: '5px 12px',
                                        borderRadius: '9999px',
                                        fontSize: '10px',
                                        fontWeight: 800,
                                        textTransform: 'uppercase',
                                        zIndex: 2
                                    }}>
                                        {course.category}
                                    </div>

                                    {/* Course Thumbnail */}
                                    <div style={{
                                        width: '100%',
                                        height: '240px',
                                        backgroundColor: '#222',
                                        borderRadius: '12px',
                                        marginBottom: '20px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        overflow: 'hidden',
                                        boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
                                    }}>
                                        <img
                                            src={course.img}
                                            alt={course.title}
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover'
                                            }}
                                        />
                                    </div>

                                    {/* Info */}
                                    <h3 style={{
                                        fontSize: '22px',
                                        fontWeight: 900,
                                        color: '#ffffff',
                                        marginBottom: '5px',
                                        textTransform: 'uppercase',
                                        lineHeight: 1.1
                                    }}>
                                        {course.title}
                                    </h3>
                                    <p style={{
                                        fontSize: '12px',
                                        color: '#aaaaaa',
                                        marginBottom: '10px',
                                        display: '-webkit-box',
                                        WebkitLineClamp: 3,
                                        WebkitBoxOrient: 'vertical',
                                        overflow: 'hidden',
                                        lineHeight: '1.4',
                                        height: '50px'
                                    }}>
                                        {course.description}
                                    </p>
                                    <p style={{ fontSize: '12px', color: '#ffffff', fontWeight: 'bold', marginBottom: '15px' }}>
                                        {course.instructor}
                                    </p>

                                    {/* Rating */}
                                    <div style={{ display: 'flex', gap: '2px', marginBottom: '20px', alignItems: 'center' }}>
                                        {[1, 2, 3, 4, 5].map((s) => (
                                            <Star
                                                key={s}
                                                size={14}
                                                fill={s <= Math.floor(course.rating) ? "#f83821" : "none"}
                                                color="#f83821"
                                            />
                                        ))}
                                        <span style={{ fontSize: '12px', fontWeight: 700, marginLeft: '5px', color: '#ffffff' }}>
                                            {course.rating.toFixed(1)}
                                        </span>
                                    </div>

                                    {/* Progress Section */}
                                    <div style={{ marginTop: 'auto' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '8px' }}>
                                            <span style={{ fontSize: '10px', fontWeight: 800, color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Progresso</span>
                                            <span style={{ fontSize: '12px', fontWeight: 900, color: '#fff' }}>{course.progress}%</span>
                                        </div>
                                        <div className="progress-bar-bg" style={{ marginBottom: '20px', height: '8px', backgroundColor: '#222', borderRadius: '5px', overflow: 'hidden' }}>
                                            <div className="progress-bar-fill" style={{ width: `${course.progress}%`, backgroundColor: '#f83821', height: '100%', borderRadius: '5px', transition: 'width 0.5s ease' }}></div>
                                        </div>
                                        
                                        <Link to={`/membros/curso/${course.id}`} style={{ textDecoration: 'none', display: 'block' }}>
                                            <button style={{ 
                                                width: '100%', 
                                                height: '54px', 
                                                backgroundColor: '#ffffff', 
                                                color: '#10171f', 
                                                borderRadius: '12px', 
                                                fontWeight: 900, 
                                                textTransform: 'uppercase', 
                                                fontSize: '14px', 
                                                display: 'flex', 
                                                alignItems: 'center', 
                                                justifyContent: 'center', 
                                                gap: '10px', 
                                                cursor: 'pointer', 
                                                transition: 'all 0.3s ease',
                                                border: 'none'
                                            }}
                                                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#f83821'; e.currentTarget.style.color = '#fff'; }}
                                                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#ffffff'; e.currentTarget.style.color = '#10171f'; }}
                                            >
                                                Continuar a Aula <Play size={16} fill="currentColor" />
                                            </button>
                                        </Link>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {activeTab === 'negocios' && (
                    <motion.div key="negocios" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', marginTop: '1rem' }}>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.025em', color: '#fff' }}>Negócios Gerados</h2>
                            <Link to="/criar-negocio" style={{ textDecoration: 'none' }}>
                                <button style={{ padding: '12px 24px', backgroundColor: '#f83821', color: '#fff', border: 'none', borderRadius: '99px', fontSize: '14px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <Wand2 size={16} /> CRIAR NOVO NEGÓCIO
                                </button>
                            </Link>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
                            {isLoading ? (
                                <p style={{ color: '#888' }}>A carregar os seus negócios...</p>
                            ) : realBusinesses.length === 0 ? (
                                <p style={{ color: '#888' }}>Ainda não gerou nenhum negócio. Clique em "Criar Novo Negócio" para começar.</p>
                            ) : (
                                realBusinesses.map((biz) => {
                                    const primaryColor = biz.colorPalette?.custom?.[0] || '#f83821';
                                    return (
                                        <motion.div
                                            key={biz.id}
                                            whileHover={{ y: -5, borderColor: '#444' }}
                                            style={{
                                                backgroundColor: '#111',
                                                border: '1px solid #222',
                                                borderRadius: '20px',
                                                padding: '24px',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                gap: '20px',
                                                position: 'relative',
                                                overflow: 'hidden'
                                            }}
                                        >
                                            {/* Top Color Accent */}
                                            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', backgroundColor: primaryColor }} />
                                            
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                                <div>
                                                    <h3 style={{ fontSize: '24px', fontWeight: 900, color: '#fff', marginBottom: '4px', letterSpacing: '-0.5px' }}>{biz.name}</h3>
                                                    <p style={{ color: '#666', fontSize: '12px', fontWeight: 600 }}>Criado em {new Date(biz.createdAt).toLocaleDateString('pt-PT')}</p>
                                                </div>
                                                <div style={{ 
                                                    backgroundColor: biz.status === 'Gerado pela IA' ? 'rgba(0, 200, 83, 0.1)' : 'rgba(234, 179, 8, 0.1)',
                                                    color: biz.status === 'Gerado pela IA' ? '#00c853' : '#eab308',
                                                    padding: '4px 10px',
                                                    borderRadius: '99px',
                                                    fontSize: '11px',
                                                    fontWeight: 800,
                                                    textTransform: 'uppercase'
                                                }}>
                                                    {biz.status}
                                                </div>
                                            </div>

                                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                                {biz.niche && biz.niche.map(n => (
                                                    <span key={n} style={{ backgroundColor: '#222', color: '#ccc', padding: '4px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: 600 }}>
                                                        {n}
                                                    </span>
                                                ))}
                                            </div>

                                            <div style={{ marginTop: 'auto', paddingTop: '20px', borderTop: '1px solid #222', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                    <span style={{ color: '#555', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase' }}>Estilo Visual</span>
                                                    <span style={{ color: '#fff', fontSize: '13px', fontWeight: 600 }}>{biz.visualStyle}</span>
                                                </div>
                                                
                                                <Link to={`/membros/negocio/${biz.id}`} style={{ textDecoration: 'none' }}>
                                                    <button style={{ 
                                                        backgroundColor: '#fff', 
                                                        color: '#000', 
                                                        border: 'none', 
                                                        width: '40px', 
                                                        height: '40px', 
                                                        borderRadius: '50%', 
                                                        display: 'flex', 
                                                        alignItems: 'center', 
                                                        justifyContent: 'center',
                                                        cursor: 'pointer',
                                                        transition: 'transform 0.2s'
                                                    }}
                                                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                                                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                                    title="Ver Negócio Completo"
                                                    >
                                                        <ChevronRight size={20} />
                                                    </button>
                                                </Link>
                                            </div>
                                        </motion.div>
                                    );
                                })
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default MembersDashboardPage;
