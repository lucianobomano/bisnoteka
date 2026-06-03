import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, Play } from 'lucide-react';
import { Link } from 'react-router-dom';


const CoursesPage: React.FC = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [activeCategory, setActiveCategory] = useState('Todos');

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 1024);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const categories = ['Todos', 'Negócios', 'Marketing', 'Vendas', 'Ecommerce', 'Branding', 'Liderança'];

    const [courses, setCourses] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const res = await fetch(`\${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/api/courses`);
                if (res.ok) {
                    const data = await res.json();
                    const formatted = data.map((c: any) => ({
                        id: c.id,
                        title: c.title,
                        category: c.category,
                        description: c.description,
                        instructor: c.instructor,
                        rating: c.rating,
                        img: c.coverImage || "/media/COURSE_ECOMMERCE.png"
                    }));
                    setCourses(formatted);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchCourses();
    }, []);

    const filteredCourses = activeCategory === 'Todos'
        ? courses
        : courses.filter(c => c.category === activeCategory);

    return (
        <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', color: '#10171f', fontFamily: 'Inter, sans-serif' }}>

            {/* 1. Hero Section */}
            <section style={{
                backgroundColor: '#10171f',
                color: '#ffffff',
                padding: isMobile ? '120px 20px 80px' : '200px 60px 120px',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.1 }}>
                    <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '40%', height: '40%', background: '#f83821', filter: 'blur(150px)', borderRadius: '50%' }}></div>
                    <div style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '40%', height: '40%', background: '#0011fd', filter: 'blur(150px)', borderRadius: '50%' }}></div>
                </div>

                <div style={{ position: 'relative', zIndex: 1, maxWidth: '1200px', margin: '0 auto' }}>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{
                            fontSize: isMobile ? '48px' : '110px',
                            fontWeight: 900,
                            lineHeight: 0.9,
                            letterSpacing: '-4px',
                            textTransform: 'uppercase',
                            marginBottom: '30px'
                        }}
                    >
                        DOMINE O JOGO <br /> <span style={{ color: '#f83821' }}>DOS NEGÓCIOS</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        style={{
                            fontSize: isMobile ? '18px' : '24px',
                            color: '#888',
                            maxWidth: '700px',
                            margin: '0 auto 50px',
                            lineHeight: 1.4
                        }}
                    >
                        Aprenda com quem está no campo de batalha. Estruturas validadas, estratégias brutais e mentalidade de ícone.
                    </motion.p>
                </div>
            </section>

            {/* 2. Cursos Section */}
            <section style={{ padding: isMobile ? '60px 20px' : '100px 60px', backgroundColor: '#f6f7f9' }}>
                <div style={{ maxWidth: '1400px', margin: '0 auto' }}>

                    {/* Category Filtering */}
                    <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        gap: '15px',
                        marginBottom: '60px'
                    }}>
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                style={{
                                    padding: '12px 25px',
                                    borderRadius: '9999px',
                                    border: activeCategory === cat ? 'none' : '1px solid #ddd',
                                    backgroundColor: activeCategory === cat ? '#f83821' : 'transparent',
                                    color: activeCategory === cat ? '#fff' : '#10171f',
                                    fontSize: '14px',
                                    fontWeight: 700,
                                    textTransform: 'uppercase',
                                    transition: 'all 0.3s ease',
                                    cursor: 'pointer'
                                }}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Grid de Cursos - Estilo Biblioteca Faundr */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)',
                        gap: isMobile ? '30px' : '20px'
                    }}>
                        {filteredCourses.map((course, idx) => (
                            <motion.div
                                key={course.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: idx * 0.05 }}
                                whileHover={{ y: -10 }}
                                style={{
                                    width: '100%',
                                    backgroundColor: 'rgba(255, 255, 255, 0.7)',
                                    backdropFilter: 'blur(10px)',
                                    WebkitBackdropFilter: 'blur(10px)',
                                    borderRadius: '24px',
                                    padding: '14px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    border: '1px solid rgba(255, 255, 255, 0.3)',
                                    boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
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

                                {/* Course Thumbnail - Aspect Ratio Estilo Livro */}
                                <div style={{
                                    width: '100%',
                                    height: '240px',
                                    backgroundColor: '#ddd',
                                    borderRadius: '12px',
                                    marginBottom: '20px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    overflow: 'hidden',
                                    boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
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
                                    color: '#10171f',
                                    marginBottom: '5px',
                                    textTransform: 'uppercase',
                                    lineHeight: 1.1
                                }}>
                                    {course.title}
                                </h3>
                                <p style={{
                                    fontSize: '12px',
                                    color: '#666',
                                    marginBottom: '10px',
                                    display: '-webkit-box',
                                    WebkitLineClamp: 3,
                                    WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden',
                                    lineHeight: '1.4',
                                    height: '50px' // Ensure consistency
                                }}>
                                    {course.description}
                                </p>
                                <p style={{ fontSize: '12px', color: '#10171f', fontWeight: 'bold', marginBottom: '15px' }}>
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
                                    <span style={{ fontSize: '12px', fontWeight: 700, marginLeft: '5px', color: '#10171f' }}>
                                        {course.rating.toFixed(1)}
                                    </span>
                                </div>

                                {/* Action Button */}
                                <div style={{ marginTop: 'auto' }}>
                                    <Link to={`/cursos/${course.id}`} style={{ textDecoration: 'none' }}>
                                        <button style={{
                                            width: '100%',
                                            height: '54px',
                                            borderRadius: '12px',
                                            backgroundColor: '#10171f',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: '#fff',
                                            fontSize: '14px',
                                            fontWeight: 900,
                                            textTransform: 'uppercase',
                                            border: 'none',
                                            cursor: 'pointer',
                                            transition: 'all 0.3s ease',
                                            gap: '10px'
                                        }}
                                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f83821'}
                                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#10171f'}
                                        >
                                            VER CURSO <Play size={16} fill="currentColor" />
                                        </button>
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 3. Mindset Disruptivo Section */}
            <section style={{
                backgroundColor: '#000000',
                color: '#ffffff',
                padding: isMobile ? '80px 20px' : '150px 60px',
                textAlign: 'center',
                overflow: 'hidden',
                position: 'relative'
            }}>
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%', height: '100%', opacity: 0.1 }}>
                    <div style={{ fontSize: '30vw', fontWeight: 900, color: '#white', opacity: 0.05, whiteSpace: 'nowrap' }}>MINDSET DISRUPTIVO</div>
                </div>

                <div style={{ position: 'relative', zIndex: 1, maxWidth: '1000px', margin: '0 auto' }}>
                    <h2 style={{ fontSize: isMobile ? '36px' : '84px', fontWeight: 900, textTransform: 'uppercase', lineHeight: 0.9, marginBottom: '40px' }}>
                        AFIE A SUA <br /> <span style={{ color: '#0011fd' }}>MENTALIDADE</span>
                    </h2>
                    <p style={{ fontSize: isMobile ? '18px' : '28px', color: '#888', marginBottom: '60px', lineHeight: 1.4 }}>
                        O sistema foi desenhado para te manter na média. Nós quebramos as correntes.
                    </p>

                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '40px' }}>
                        {[
                            { title: 'BRUTALIDADE', desc: 'Não há espaço para fraqueza quando se busca o topo.' },
                            { title: 'VELOCIDADE', desc: 'A execução supera a perfeição todos os dias.' },
                            { title: 'OBSESSÃO', desc: 'Equilíbrio é para quem não quer ser extraordinário.' }
                        ].map((m, idx) => (
                            <div key={idx} style={{ textAlign: 'center', padding: '30px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '24px' }}>
                                <h4 style={{ fontSize: '24px', fontWeight: 900, marginBottom: '15px', color: '#f83821' }}>{m.title}</h4>
                                <p style={{ color: '#aaa', fontSize: '16px' }}>{m.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. Faundr Forge Section (Copied from MagazinePage) */}
            <section style={{
                backgroundImage: "url('/media/BG.png')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                padding: isMobile ? '60px 20px' : '120px',
                display: 'flex',
                justifyContent: 'center'
            }}>
                <div style={{
                    maxWidth: '1200px',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: isMobile ? 'center' : 'flex-start',
                    textAlign: isMobile ? 'center' : 'left'
                }}>
                    <p style={{ fontSize: isMobile ? '24px' : '40px', color: '#000000', marginBottom: '10px', fontWeight: 'normal' }}>
                        apresentando a
                    </p>
                    <p style={{ fontSize: isMobile ? '24px' : '40px', fontWeight: 900, color: '#000000', marginBottom: '10px', textTransform: 'lowercase' }}>
                        faundr forge
                    </p>
                    <h2 style={{
                        fontSize: isMobile ? '36px' : '70px',
                        fontWeight: 'bold',
                        color: '#000000',
                        marginBottom: '20px',
                        lineHeight: '1.1',
                        maxWidth: '1100px'
                    }}>
                        a única associação que você precisa para construir qualquer negócio
                    </h2>
                    <p style={{ fontSize: isMobile ? '20px' : '40px', fontWeight: 'bold', color: '#000000', margin: 0 }}>
                        + aprenda com quem faz acontecer
                    </p>
                    <p style={{ fontSize: isMobile ? '20px' : '40px', fontWeight: 900, color: '#000000', margin: 0 }}>
                        + estruturas comprovadas
                    </p>
                    <p style={{ fontSize: isMobile ? '20px' : '40px', fontWeight: 'bold', color: '#000000', marginBottom: '40px' }}>
                        + comunidade com ideias semelhantes
                    </p>
                    <button style={{
                        fontSize: isMobile ? '18px' : '20px',
                        backgroundColor: '#000000',
                        color: '#ffffff',
                        width: isMobile ? '280px' : '330px',
                        height: isMobile ? '80px' : '102px',
                        borderRadius: '51px',
                        border: 'none',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        textTransform: 'uppercase',
                        transition: 'opacity 0.2s'
                    }}
                        onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
                        onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                    >
                        JUNTE-SE HOJE
                    </button>
                </div>
            </section>

            {/* 5. Revista Section (Copied from Masterclasses/Home) */}
            <section style={{
                backgroundColor: '#000000',
                padding: isMobile ? '40px 20px' : '80px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <p style={{
                    fontSize: isMobile ? '20px' : '28px',
                    fontWeight: 400,
                    letterSpacing: isMobile ? '0' : '-2.5px',
                    lineHeight: '1.2',
                    color: '#ffffff',
                    marginBottom: isMobile ? '30px' : '50px',
                    textAlign: 'center',
                    maxWidth: isMobile ? '100%' : '900px'
                }}>
                    ENTREVISTAS EXCLUSIVAS COM OS MELHORES EMPREENDEDORES DE ÁFRIKA, DISPONÍVEL APENAS NA FAUNDR MAGAZINE.
                </p>

                <div
                    style={{
                        position: 'relative',
                        width: '100%',
                        maxWidth: '1740px',
                        overflow: 'hidden'
                    }}
                >
                    <div
                        id="magazine-scroll-courses"
                        style={{
                            display: 'flex',
                            gap: '20px',
                            overflowX: 'auto',
                            scrollBehavior: 'smooth',
                            paddingBottom: '20px',
                            scrollbarWidth: 'none',
                            msOverflowStyle: 'none'
                        }}
                    >
                        {[
                            { image: 'MAG01.png', edition: 'Edição 1: Mar 15, 2023' },
                            { image: 'MAG02.png', edition: 'Edição 2: Apr 23, 2023' },
                            { image: 'MAG03.png', edition: 'Edição 3: May 30, 2023' },
                            { image: 'MAG04.png', edition: 'Edição 4: Jun 18, 2023' },
                            { image: 'MAG05.png', edition: 'Edição 5: Jul 25, 2023' },
                            { image: 'MAG06.png', edition: 'Edição 6: Aug 12, 2023' }
                        ].map((magazine, idx) => (
                            <div
                                key={idx}
                                style={{
                                    flexShrink: 0,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center'
                                }}
                            >
                                <div style={{
                                    width: isMobile ? '240px' : '430px',
                                    height: isMobile ? '330px' : '592px',
                                    overflow: 'hidden',
                                    marginBottom: '15px'
                                }}>
                                    <img
                                        src={`/media/${magazine.image}`}
                                        alt={magazine.edition}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover'
                                        }}
                                    />
                                </div>
                                <p style={{ fontSize: '14px', color: '#888888', textAlign: 'center' }}>
                                    {magazine.edition}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                <button style={{
                    width: isMobile ? '280px' : '300px',
                    height: isMobile ? '60px' : '80px',
                    backgroundColor: '#0011FD',
                    borderRadius: '9999px',
                    border: 'none',
                    color: '#ffffff',
                    fontSize: isMobile ? '16px' : '20px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    marginTop: '50px'
                }}>
                    VER TODAS EDIÇÕES
                </button>
            </section>

        </div>
    );
};

export default CoursesPage;
