import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Play,
    CheckCircle2,
    Clock,
    Users,
    ShieldCheck,
    ArrowRight,
    ChevronDown,
    ChevronUp,
    Lock,
    Award,
    Zap,
    Trophy,
    Target
} from 'lucide-react';
import { courses } from '../data/coursesData';

const CourseDetailsPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [isMobile, setIsMobile] = useState(false);
    const [activeAccordion, setActiveAccordion] = useState<number | null>(0);
    const [scrolled, setScrolled] = useState(false);
    const [showSocialProof, setShowSocialProof] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 1024);
        checkMobile();
        window.addEventListener('resize', checkMobile);

        const handleScroll = () => {
            setScrolled(window.scrollY > 600);
        };
        window.addEventListener('scroll', handleScroll);

        // Show social proof after 3 seconds
        const timer = setTimeout(() => setShowSocialProof(true), 3000);

        return () => {
            window.removeEventListener('resize', checkMobile);
            window.removeEventListener('scroll', handleScroll);
            clearTimeout(timer);
        };
    }, []);

    const course = courses.find(c => c.id === Number(id)) || courses[0];

    const curriculum = [
        {
            title: "Módulo 1: Fundamentos do Escalonamento",
            lessons: [
                "O que é escala Real?",
                "Mentalidade de Fundador vs Operador",
                "Análise de Mercado em Angola",
                "O momento certo para escalar"
            ]
        },
        {
            title: "Módulo 2: Processos e Sistemas",
            lessons: [
                "Automatização de Fluxo de Caixa",
                "Gestão de Equipes Remotas e Híbridas",
                "KPIs que Realmente Importam",
                "Otimização de Operações Logísticas"
            ]
        },
        {
            title: "Módulo 3: Marketing e Vendas em Escala",
            lessons: [
                "Aquisição de Clientes em Massa",
                "Estruturas de Funil Angolanas",
                "Branding para Dominação do Nicho",
                "Retenção e LTV"
            ]
        }
    ];

    return (
        <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', color: '#10171f', fontFamily: 'Inter, sans-serif' }}>

            {/* Social Proof Notification */}
            <AnimatePresence>
                {showSocialProof && (
                    <motion.div
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 20, opacity: 1 }}
                        exit={{ x: -100, opacity: 0 }}
                        style={{
                            position: 'fixed',
                            bottom: '30px',
                            left: isMobile ? '10px' : '20px',
                            backgroundColor: '#fff',
                            padding: '15px 25px',
                            borderRadius: '16px',
                            boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '15px',
                            zIndex: 1000,
                            border: '1px solid #eee'
                        }}
                    >
                        <div style={{ width: '40px', height: '40px', backgroundColor: '#f83821', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                            <Users size={20} />
                        </div>
                        <div>
                            <div style={{ fontSize: '14px', fontWeight: 900 }}>12 pessoas</div>
                            <div style={{ fontSize: '12px', color: '#666' }}>estão a ver este curso agora.</div>
                        </div>
                        <button onClick={() => setShowSocialProof(false)} style={{ background: 'none', border: 'none', color: '#aaa', cursor: 'pointer', fontSize: '20px' }}>&times;</button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Sticky Purchase Bar */}
            <AnimatePresence>
                {scrolled && (
                    <motion.div
                        initial={{ y: -100 }}
                        animate={{ y: 0 }}
                        exit={{ y: -100 }}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100%',
                            backgroundColor: 'rgba(255,255,255,0.9)',
                            backdropFilter: 'blur(10px)',
                            padding: '15px 20px',
                            boxShadow: '0 5px 20px rgba(0,0,0,0.05)',
                            zIndex: 999,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderBottom: '1px solid #eee'
                        }}
                    >
                        <div style={{ maxWidth: '1200px', width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            {!isMobile && (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                    <div style={{ width: '40px', height: '40px', borderRadius: '8px', overflow: 'hidden' }}>
                                        <img src={course.img} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
                                    </div>
                                    <span style={{ fontWeight: 900, textTransform: 'uppercase', fontSize: '14px' }}>{course.title}</span>
                                </div>
                            )}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{ fontSize: '18px', fontWeight: 900, color: '#0011fd' }}>{course.price}</div>
                                    <div style={{ fontSize: '10px', color: '#666', fontWeight: 900, textTransform: 'uppercase' }}>Inscrições Abertas</div>
                                </div>
                                <button 
                                    onClick={() => navigate(`/checkout/${course.id}`)}
                                    style={{
                                    padding: '12px 30px',
                                    backgroundColor: '#0011fd',
                                    color: '#fff',
                                    borderRadius: '99px',
                                    border: 'none',
                                    fontSize: '12px',
                                    fontWeight: 900,
                                    cursor: 'pointer',
                                    textTransform: 'uppercase'
                                }}>
                                    Inscrever-me
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* 1. Hero / Header Section */}
            <section style={{
                padding: isMobile ? '120px 20px 0' : '150px 60px 0', // Remove padding bottom for exact split
                backgroundColor: '#000',
                color: '#fff',
                position: 'relative',
                overflow: 'visible',
                zIndex: 10
            }}>
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0.2, overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', width: '600px', height: '600px', background: 'radial-gradient(circle, #0011fd 0%, transparent 70%)', top: '-10%', left: '-10%' }}></div>
                    <div style={{ position: 'absolute', width: '600px', height: '600px', background: 'radial-gradient(circle, #f83821 0%, transparent 70%)', bottom: '-10%', right: '-10%' }}></div>
                </div>

                <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '60px', position: 'relative', zIndex: 1 }}>

                    {/* Info */}
                    <div style={{ maxWidth: '900px' }}>
                        <div style={{
                            display: 'inline-block',
                            padding: '6px 15px',
                            backgroundColor: '#f83821',
                            borderRadius: '99px',
                            fontSize: '12px',
                            fontWeight: 900,
                            marginBottom: '20px',
                            textTransform: 'uppercase'
                        }}>
                            {course.category}
                        </div>
                        <h1 style={{
                            fontSize: isMobile ? '42px' : '84px',
                            fontWeight: 900,
                            lineHeight: 1,
                            marginBottom: '30px',
                            textTransform: 'uppercase',
                        }}>
                            {course.title}
                        </h1>
                        <p style={{ fontSize: '20px', color: '#888', marginBottom: '40px', lineHeight: 1.5, maxWidth: '800px', margin: '0 auto 40px' }}>
                            {course.description}
                        </p>

                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px', marginBottom: '50px', justifyContent: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <Users size={24} color="#f83821" />
                                <div style={{ textAlign: 'left' }}>
                                    <div style={{ fontSize: '18px', fontWeight: 900 }}>+{course.students}</div>
                                    <div style={{ fontSize: '12px', color: '#666' }}>Alunos Ativos</div>
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <Clock size={24} color="#f83821" />
                                <div style={{ textAlign: 'left' }}>
                                    <div style={{ fontSize: '18px', fontWeight: 900 }}>{course.duration}</div>
                                    <div style={{ fontSize: '12px', color: '#666' }}>Conteúdo Total</div>
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <Award size={24} color="#f83821" />
                                <div style={{ textAlign: 'left' }}>
                                    <div style={{ fontSize: '18px', fontWeight: 900 }}>{course.level}</div>
                                    <div style={{ fontSize: '12px', color: '#666' }}>Nível do Curso</div>
                                </div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '30px', alignItems: 'center', justifyContent: 'center' }}>
                            <button 
                                onClick={() => navigate(`/checkout/${course.id}`)}
                                style={{
                                padding: '25px 60px',
                                backgroundColor: '#0011fd',
                                color: '#fff',
                                borderRadius: '99px',
                                border: 'none',
                                fontSize: '16px',
                                fontWeight: 900,
                                cursor: 'pointer',
                                textTransform: 'uppercase'
                            }}>
                                Inscrever-me agora
                            </button>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                <span style={{ fontSize: '32px', fontWeight: 900 }}>{course.price}</span>
                                {course.oldPrice && <span style={{ fontSize: '16px', color: '#aaa', textDecoration: 'line-through' }}>{course.oldPrice}</span>}
                            </div>
                        </div>
                    </div>

                    {/* Preview / Video Placeholder */}
                    <div style={{
                        width: isMobile ? '100%' : '780px',
                        height: isMobile ? 'auto' : '450px',
                        aspectRatio: isMobile ? '16/9' : undefined,
                        backgroundColor: '#111',
                        borderRadius: '30px',
                        border: '1px solid rgba(255,255,255,0.1)',
                        position: 'relative',
                        overflow: 'hidden',
                        boxShadow: '0 40px 100px rgba(0,0,0,0.6)',
                        marginBottom: isMobile ? '-100px' : '-225px', // Exact negative margin for 50% split on H=450
                        zIndex: 2
                    }}>
                        <img
                            src={course.img}
                            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5 }}
                            alt="Pre-visualização"
                        />
                        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                            <div style={{
                                width: '100px',
                                height: '100px',
                                backgroundColor: '#fff',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#000',
                                cursor: 'pointer',
                                margin: '0 auto 20px',
                                boxShadow: '0 0 30px rgba(255,255,255,0.3)'
                            }}>
                                <Play size={40} fill="currentColor" />
                            </div>
                            <span style={{ fontSize: '14px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '2px' }}>Trailer do Curso</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Gap for the overlapping trailer - H/2 + more space if needed */}
            <div style={{ height: isMobile ? '150px' : '300px' }}></div>

            {/* 2. O que vais aprender Section */}
            <section style={{ padding: '120px 20px', backgroundColor: '#fff' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '80px' }}>
                        <h2 style={{ fontSize: '56px', fontWeight: 900, marginBottom: '20px', textTransform: 'uppercase' }}>
                            O que vais <span style={{ color: '#0011fd' }}>conquistar?</span>
                        </h2>
                        <p style={{ fontSize: '18px', color: '#666', maxWidth: '600px', margin: '0 auto' }}>
                            Não é apenas um curso. É um plano de guerra para o seu negócio.
                        </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '30px' }}>
                        {[
                            { icon: <Zap color="#f83821" size={32} />, title: 'Velocidade de Execução', desc: 'Aprenda a aplicar estratégias em tempo recorde sem perder a qualidade.' },
                            { icon: <Target color="#f83821" size={32} />, title: 'Clareza Estratégica', desc: 'Saiba exatamente qual o próximo passo para escalar sem o caos operacional.' },
                            { icon: <Trophy color="#f83821" size={32} />, title: 'Dominação de Mercado', desc: 'Posicione sua marca como a autoridade inquestionável em seu setor.' },
                            { icon: <ShieldCheck color="#f83821" size={32} />, title: 'Sistemas Antifrágeis', desc: 'Construa processos que sobrevivem e prosperam em tempos de crise.' },
                            { icon: <Users color="#f83821" size={32} />, title: 'Networking de Elite', desc: 'Acesso exclusivo a uma comunidade de empreendedores que pensam como você.' },
                            { icon: <CheckCircle2 color="#f83821" size={32} />, title: 'Certificação Faundr', desc: 'Receba um selo de reconhecimento pela sua expertise em gestão de alto impacto.' }
                        ].map((item, i) => (
                            <div key={i} style={{ padding: '40px', backgroundColor: '#f9f9f9', borderRadius: '32px', border: '1px solid #eee' }}>
                                <div style={{ marginBottom: '20px' }}>{item.icon}</div>
                                <h4 style={{ fontSize: '24px', fontWeight: 900, marginBottom: '15px' }}>{item.title}</h4>
                                <p style={{ color: '#666', lineHeight: 1.6 }}>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 3. Curriculum Section */}
            <section style={{ padding: '120px 20px', backgroundColor: '#f4f4f4' }}>
                <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '80px' }}>
                        <h2 style={{ fontSize: '56px', fontWeight: 900, marginBottom: '20px', textTransform: 'uppercase' }}>
                            Por dentro do <span style={{ color: '#f83821' }}>Arsenal</span>
                        </h2>
                    </div>

                    <div style={{ display: 'grid', gap: '20px' }}>
                        {curriculum.map((mod, i) => (
                            <div key={i} style={{ backgroundColor: '#fff', borderRadius: '24px', overflow: 'hidden', border: '1px solid #eee' }}>
                                <div
                                    onClick={() => setActiveAccordion(activeAccordion === i ? null : i)}
                                    style={{ padding: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
                                >
                                    <h4 style={{ fontSize: '22px', fontWeight: 900 }}>{mod.title}</h4>
                                    {activeAccordion === i ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                                </div>
                                <AnimatePresence>
                                    {activeAccordion === i && (
                                        <motion.div
                                            initial={{ height: 0 }}
                                            animate={{ height: 'auto' }}
                                            exit={{ height: 0 }}
                                            style={{ overflow: 'hidden' }}
                                        >
                                            <div style={{ padding: '0 30px 30px', borderTop: '1px solid #eee' }}>
                                                {mod.lessons.map((lesson, j) => (
                                                    <div key={j} style={{ display: 'flex', gap: '15px', padding: '15px 0', borderBottom: j === mod.lessons.length - 1 ? 'none' : '1px solid #f0f0f0', alignItems: 'center' }}>
                                                        <div style={{ width: '32px', height: '32px', backgroundColor: '#f0f0f0', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                            {j < 2 ? <Play size={14} /> : <Lock size={14} color="#aaa" />}
                                                        </div>
                                                        <span style={{ fontSize: '16px', color: j < 2 ? '#10171f' : '#888' }}>{lesson}</span>
                                                        {j < 2 && <span style={{ marginLeft: 'auto', fontSize: '12px', color: '#0011fd', fontWeight: 900 }}>GRÁTIS</span>}
                                                    </div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. Instructor Section */}
            <section style={{ padding: '120px 20px', backgroundColor: '#000', color: '#fff' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '80px', alignItems: 'center' }}>
                    <div style={{ flex: 1 }}>
                        <div style={{
                            width: '100%',
                            aspectRatio: '1/1',
                            backgroundColor: '#222',
                            borderRadius: '50%',
                            border: '5px solid #0011fd',
                            overflow: 'hidden',
                            position: 'relative'
                        }}>
                            <img
                                src="/media/BISNOTEKA_LOGO.png"
                                style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '50px' }}
                                alt="Instrutor"
                            />
                        </div>
                    </div>
                    <div style={{ flex: 1.5 }}>
                        <div style={{ color: '#0011fd', fontWeight: 900, textTransform: 'uppercase', marginBottom: '20px', letterSpacing: '2px' }}>O Teu Mentor</div>
                        <h2 style={{ fontSize: '64px', fontWeight: 900, marginBottom: '30px', lineHeight: 0.9 }}>BISNOTEKA <span style={{ color: '#f83821' }}>GROUP</span></h2>
                        <p style={{ fontSize: '20px', color: '#aaa', lineHeight: 1.6, marginBottom: '40px' }}>
                            Com mais de uma década de experiência no mercado angolano, a Bisnoteka ajudou a construir e escalar centenas de negócios. Não entregamos apenas teoria, entregamos o que funciona no "terreno".
                        </p>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
                            <div>
                                <div style={{ fontSize: '42px', fontWeight: 900 }}>50k+</div>
                                <div style={{ fontSize: '14px', color: '#666' }}>Alunos Impactados</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '42px', fontWeight: 900 }}>15+</div>
                                <div style={{ fontSize: '14px', color: '#666' }}>Anos de Experiência</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. Objections / FAQ / Guarantee Section */}
            <section style={{ padding: '120px 20px', backgroundColor: '#fff', textAlign: 'center' }}>
                <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                    <div style={{ marginBottom: '80px' }}>
                        <ShieldCheck size={80} color="#0011fd" style={{ margin: '0 auto 30px' }} />
                        <h2 style={{ fontSize: '48px', fontWeight: 900, marginBottom: '30px' }}>RISCO ZERO: GARANTIA DE 30 DIAS</h2>
                        <p style={{ fontSize: '20px', color: '#666', lineHeight: 1.6 }}>
                            A Bisnoteka confia tanto no seu Arsenal que oferecemos uma garantia incondicional. Se em 30 dias você sentir que o conteúdo não agregou o valor prometido, devolvemos cada kwanza investido. Sem perguntas, sem burocracia.
                        </p>
                    </div>

                    <div style={{ padding: '60px', backgroundColor: '#f9f9f9', borderRadius: '48px', textAlign: 'left' }}>
                        <h3 style={{ fontSize: '32px', fontWeight: 900, marginBottom: '40px', textAlign: 'center' }}>AINDA COM DÚVIDAS?</h3>
                        {[
                            { q: "O curso é focado apenas no mercado de Angola?", a: "As bases são globais, mas os exemplos, contextos e estratégias de execução são 100% otimizados para a realidade de Angola, o que nos torna únicos." },
                            { q: "Preciso ter uma empresa aberta para começar?", a: "Não. O curso serve tanto para quem já tem um negócio e quer escalar, quanto para quem quer começar do zero com a mentalidade e processos corretos." },
                            { q: "Como acedo às aulas?", a: "O acesso é imediato após a confirmação do pagamento. Você receberá os dados no seu e-mail para entrar na nossa plataforma exclusiva." }
                        ].map((item, i) => (
                            <div key={i} style={{ marginBottom: '30px', borderBottom: '1px solid #eee', paddingBottom: '30px' }}>
                                <h4 style={{ fontSize: '20px', fontWeight: 900, marginBottom: '15px' }}>{item.q}</h4>
                                <p style={{ color: '#666', lineHeight: 1.6 }}>{item.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA Footer */}
            <section style={{ padding: '100px 20px', backgroundColor: '#0011fd', color: '#fff', textAlign: 'center' }}>
                <h2 style={{ fontSize: '64px', fontWeight: 900, marginBottom: '40px', lineHeight: 1 }}>É HORA DE SAIR DA MÉDIA.</h2>
                <p style={{ fontSize: '24px', fontWeight: 500, marginBottom: '60px', opacity: 0.9 }}>Junta-te aos +1.200 empreendedores que estão a dominar o mercado.</p>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
                    <button 
                        onClick={() => navigate(`/checkout/${course.id}`)}
                        style={{
                        padding: '30px 100px',
                        backgroundColor: '#fff',
                        color: '#0011fd',
                        borderRadius: '99px',
                        border: 'none',
                        fontSize: '20px',
                        fontWeight: 900,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '15px'
                    }}>
                        QUERO MINHA VAGA AGORA <ArrowRight size={20} />
                    </button>
                    <span style={{ fontSize: '14px', fontWeight: 900 }}>Pagamento Seguro via Multicaixa / Transferência</span>
                </div>
            </section>

        </div>
    );
};

export default CourseDetailsPage;
