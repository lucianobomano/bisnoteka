import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    ChevronRight, ChevronDown, CheckCircle2,
    Sun, Star,
    Lightbulb,
    Book, BookOpen
} from 'lucide-react';
import { Link } from 'react-router-dom';

const FaundrMagazineLandingPage: React.FC = () => {
    const [faqOpen, setFaqOpen] = useState<number | null>(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 1024);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const toggleFaq = (index: number) => {
        setFaqOpen(faqOpen === index ? null : index);
    };

    return (
        <div style={{ backgroundColor: '#000000', minHeight: '100vh', color: '#ffffff', fontFamily: 'Inter, sans-serif' }}>

            {/* Top Bar Accent */}
            <div style={{ width: '100%', height: '4px', backgroundColor: '#0011fd' }}></div>

            {/* Hero Section */}
            <section style={{ padding: isMobile ? '40px 20px 0' : '80px 20px 0', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        {/* Top Badge */}
                        <div style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            backgroundColor: '#0011fd',
                            padding: '8px 24px',
                            borderRadius: '99px',
                            marginBottom: isMobile ? '20px' : '40px'
                        }}>
                            <span style={{ fontSize: '13px', fontWeight: 600, textTransform: 'none', letterSpacing: '0' }}>Bem-Vindos a</span>
                        </div>

                        {/* Title */}
                        <h1 style={{
                            fontSize: isMobile ? '38px' : 'clamp(48px, 8vw, 95px)',
                            fontWeight: 700,
                            letterSpacing: isMobile ? '-1px' : '-2px',
                            lineHeight: 1,
                            marginBottom: '15px',
                            textTransform: 'none'
                        }}>
                            Faunder Magazine
                        </h1>

                        {/* Subtitle */}
                        <p style={{
                            color: 'rgba(255,255,255,0.6)',
                            fontSize: isMobile ? '16px' : '24px',
                            maxWidth: '700px',
                            margin: isMobile ? '0 auto 24px' : '0 auto 40px',
                            lineHeight: 1.3,
                            fontWeight: 400
                        }}>
                            A Primeira revista holística em Angola sobre empreendedorismo
                        </p>

                        {/* Watch Presentation Button (The 360x103 one) */}
                        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0px' }}>
                            <button style={{
                                width: isMobile ? '280px' : '360px',
                                height: isMobile ? '70px' : '103px',
                                backgroundColor: '#0011fd',
                                color: '#ffffff',
                                borderRadius: '99px',
                                border: 'none',
                                fontSize: isMobile ? '16px' : '20px',
                                fontWeight: 500,
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '20px',
                                transition: 'all 0.3s'
                            }} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                                Assistir apresentação
                                <span style={{
                                    width: '0',
                                    height: '0',
                                    borderTop: '10px solid transparent',
                                    borderBottom: '10px solid transparent',
                                    borderLeft: '18px solid #ffffff',
                                    display: 'inline-block'
                                }}></span>
                            </button>
                        </div>
                    </motion.div>
                </div>

                {/* Hero Featured Image - Magazine Fan */}
                <div style={{
                    width: '100%',
                    maxWidth: '1000px',
                    marginTop: '0px',
                    position: 'relative',
                    borderBottom: '1px solid rgba(255,255,255,0.2)',
                    paddingBottom: '0px',
                    lineHeight: 0
                }}>
                    <motion.img
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        src="/faundr_magazine/hero.png"
                        alt="Faundr Magazine Fan"
                        style={{
                            width: '100%',
                            height: 'auto',
                            display: 'block',
                            margin: '0 auto'
                        }}
                    />
                </div>
            </section>

            {/* Feature Cards Section */}
            <section style={{ padding: isMobile ? '40px 20px' : '80px 20px' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{
                        display: 'flex',
                        flexDirection: isMobile ? 'column' : 'row',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: isMobile ? '20px' : '10px',
                        marginBottom: isMobile ? '40px' : '60px',
                        width: '100%'
                    }}>
                        {[
                            {
                                icon: Sun,
                                title: "Propósito",
                                desc: "Encontre o seu propósito, se conecte com ele e viva uma vida repleta de significados"
                            },
                            {
                                icon: Star,
                                title: "Motivação",
                                desc: "Apenas saber o que fazer e quando fazer não basta por isso, conte com uma dose orientadora de motivação e frases de reflexão que te ajudarão a alcançar os seus..."
                            },
                            {
                                icon: Lightbulb,
                                title: "Protagonismo",
                                desc: "A vida vai muito além de seguir apenas o sistema e todas as suas regras que faz com que você se sinta como apenas um peão. Assuma o protagonismo da sua vida e viva de verdade"
                            }
                        ].map((card, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ backgroundColor: '#464646', borderColor: '#464646' }}
                                style={{
                                    width: isMobile ? '100%' : '280px',
                                    maxWidth: isMobile ? '340px' : 'none',
                                    height: isMobile ? 'auto' : '300px',
                                    backgroundColor: '#191919',
                                    padding: '24px 30px',
                                    borderRadius: '10px',
                                    border: '1px solid #191919',
                                    textAlign: 'left',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '20px',
                                    transition: 'background-color 0.3s, border-color 0.3s',
                                    cursor: 'default'
                                }}
                            >
                                <div style={{
                                    width: '80px',
                                    height: '80px',
                                    backgroundColor: '#0111FF',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    border: '3px solid rgba(1, 17, 255, 0.3)',
                                    flexShrink: 0
                                }}>
                                    <card.icon size={35} color="white" />
                                </div>
                                <div>
                                    <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '10px', color: '#fff' }}>{card.title}</h3>
                                    <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', lineHeight: 1.4, margin: 0 }}>{card.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div style={{ textAlign: 'center' }}>
                        <Link to="/revista" style={{ textDecoration: 'none' }}>
                            <button style={{
                                width: isMobile ? '280px' : '350px',
                                height: isMobile ? '60px' : '80px',
                                backgroundColor: '#0111FF',
                                color: '#ffffff',
                                borderRadius: '5px',
                                border: 'none',
                                fontSize: isMobile ? '24px' : '38px',
                                fontWeight: 600,
                                cursor: 'pointer',
                                transition: 'all 0.3s',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }} onMouseEnter={(e) => e.currentTarget.style.filter = 'brightness(1.1)'} onMouseLeave={(e) => e.currentTarget.style.filter = 'brightness(1)'}>
                                Ler agora
                            </button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Divider Line */}
            <div style={{ maxWidth: '1000px', margin: '80px auto 0', borderBottom: '1px solid rgba(255,255,255,0.2)' }}></div>

            {/* O Que É Section */}
            <section style={{ padding: isMobile ? '60px 20px' : '150px 20px', textAlign: 'center' }}>
                <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                    <div style={{ display: 'inline-block', marginBottom: isMobile ? '30px' : '80px' }}>
                        <h2 style={{ fontSize: isMobile ? '40px' : '80px', fontWeight: 700, color: '#fff', margin: 0, textTransform: 'none' }}>O que é</h2>
                        <div style={{ width: '100%', height: isMobile ? '6px' : '12px', backgroundColor: '#0111FF', marginTop: '-5px' }}></div>
                    </div>

                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: isMobile ? '24px' : '50px',
                        color: 'rgba(255,255,255,0.5)',
                        fontSize: isMobile ? '16px' : '24px',
                        lineHeight: 1.4,
                        fontWeight: 400,
                        maxWidth: '900px',
                        margin: '0 auto'
                    }}>
                        <p style={{ margin: 0 }}>
                            A Faundr Magazine é uma revista de fomento ao Empreendedorismo. Ela visa expor o nome dos principais fazedores de negócio da actualidade contando suas histórias de modos que, a mesma seja usada como fonte de insiração para novos empreendedores ou que deseja começar.
                        </p>
                        <p style={{ margin: 0 }}>
                            A Faundr Magazine é uma Revista única e autêntica para ajudar você nessa jornada do empreendedorismo. Em cada edição serão apresentas tópicos relavantes e actualizados do mundo dos negócios.
                        </p>
                        <p style={{ margin: 0 }}>
                            A FAUNDR MAGAZINE ™ é uma revista e um espaço dedicado exclusivamente à abordagem profunda do empreendedorismo angolano. Criada por empreendedores para empreendedores. Pretendemos que a mesma sirva de fonte de inspiração, exposição, conhecimento e conexão que abraça o espírito audacioso e visionário daqueles que se atrevem a moldar o futuro por meio do empreendedorismo.
                        </p>
                    </div>
                </div>
            </section>

            {/* Objectivos Section */}
            <section style={{ padding: isMobile ? '60px 20px' : '100px 20px', backgroundColor: '#000000' }}>
                <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                        <div style={{ fontSize: isMobile ? '16px' : '24px', fontWeight: 700, color: '#0111FF', marginBottom: '10px' }}>O livro para dar mais motivação para os seus dias</div>
                        <h2 style={{ fontSize: isMobile ? '40px' : '90px', fontWeight: 700, textTransform: 'none', color: '#fff', margin: 0 }}>Objectivos</h2>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%', alignItems: 'center' }}>
                        {[
                            {
                                num: "01",
                                text: "Escale o seu negócio ou desperte o empreendedor adormecido em você. A Faundr Magazine é uma revista mensal que tem por objectivo a exposição dos empreendedores que já se encontram no campo de batalha de modos que a sua história inspire os outros a fazer o mesmo."
                            },
                            {
                                num: "02",
                                text: "Escale o seu negócio ou desperte o empreendedor adormecido em você. A Faundr Magazine é uma revista mensal que tem por objectivo a exposição dos empreendedores que já se encontram no campo de batalha de modos que a sua história inspire os outros a fazer o mesmo."
                            }
                        ].map((obj, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ backgroundColor: '#464646' }}
                                style={{
                                    width: isMobile ? '100%' : '718px',
                                    height: 'auto',
                                    minHeight: isMobile ? 'auto' : '200px',
                                    backgroundColor: '#191919',
                                    padding: isMobile ? '30px 20px' : '20px 30px',
                                    borderRadius: '10px',
                                    display: 'flex',
                                    flexDirection: isMobile ? 'column' : 'row',
                                    gap: isMobile ? '20px' : '30px',
                                    alignItems: 'center',
                                    transition: 'background-color 0.3s',
                                    cursor: 'default',
                                    textAlign: isMobile ? 'center' : 'left'
                                }}
                            >
                                <div style={{
                                    width: '97px',
                                    height: '97px',
                                    backgroundColor: '#0111FF',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '48px',
                                    fontWeight: 700,
                                    color: '#fff',
                                    flexShrink: 0,
                                    boxShadow: '0 0 0 10px rgba(1, 17, 255, 0.1)'
                                }}>
                                    {obj.num}
                                </div>
                                <div style={{
                                    fontSize: '18px',
                                    fontWeight: 400,
                                    color: 'rgba(255,255,255,0.7)',
                                    lineHeight: 1.4,
                                    maxWidth: '520px'
                                }}>
                                    {obj.text}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Como Funciona Section */}
            <section style={{ padding: isMobile ? '60px 20px' : '120px 20px', backgroundColor: '#000000' }}>
                <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
                    {/* Header with Blue Oval */}
                    <div style={{ position: 'relative', display: 'inline-block', marginBottom: '40px' }}>
                        <h2 style={{ fontSize: isMobile ? '40px' : '70px', fontWeight: 700, position: 'relative', zIndex: 1, margin: 0, color: '#fff' }}>Como funciona</h2>
                        <div style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%) rotate(-1deg)',
                            width: '120%',
                            height: '140%',
                            border: isMobile ? '5px solid #0111FF' : '10px solid #0111FF',
                            borderRadius: '50% 50% 45% 55% / 55% 45% 55% 45%',
                            zIndex: 0
                        }}></div>
                    </div>

                    <p style={{
                        color: 'rgba(255,255,255,0.7)',
                        fontSize: '18px',
                        lineHeight: 1.4,
                        maxWidth: '800px',
                        margin: isMobile ? '40px auto 60px' : '60px auto 100px',
                        fontWeight: 400
                    }}>
                        A FAUNDR MAGAZINE ™ é uma revista mensal que será lançada no dia 1 de cada mês. Na véspera de cada lançamento, uma semana antes, será desenvolvida uma campanha de aquecimento mostrando os principais tópicos desta edição.
                    </p>

                    <h3 style={{ fontSize: isMobile ? '28px' : '48px', fontWeight: 700, marginBottom: isMobile ? '40px' : '80px', color: '#fff' }}>Conteúdo abordado</h3>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '50px' : '30px', alignItems: 'center', width: '100%' }}>
                        {[
                            {
                                num: "#1",
                                title: "Histórias de sucesso de empreendedores angolanos",
                                desc: "Destaque dos principais empreendedores de Angola, suas trajetórias inspiradoras, desafios enfrentados e lições aprendidas.",
                                circleSide: 'left'
                            },
                            {
                                num: "#2",
                                title: "Guias e dicas práticas para empreendedores",
                                desc: "Artigos práticos com dicas sobre como começar um negócio, gestão financeira, marketing, estratégias de crescimento, networking e outras habilidades essenciais para empreender.",
                                circleSide: 'right'
                            },
                            {
                                num: "#3",
                                title: "Inovação e tendências no empreendedorismo",
                                desc: "Apresente as últimas tendências e inovações em diferentes setores da economia angolana. Explore novas tecnologias, modelos de negócios disruptivos e abordagens criativas que estão impulsionando o empreendedorismo no país.",
                                circleSide: 'left'
                            },
                            {
                                num: "#4",
                                title: "Entrevistas com especialistas",
                                desc: "Realize entrevistas com especialistas em empreendedorismo, economia e negócios, tanto de Angola quanto de outros países. Eles podem compartilhar seus conhecimentos, experiências e conselhos valiosos para os leitores.",
                                circleSide: 'right'
                            }
                        ].map((card, i) => (
                            <div key={i} style={{ 
                                position: 'relative', 
                                width: '100%', 
                                maxWidth: isMobile ? '450px' : '934px',
                                height: 'auto',
                                marginTop: isMobile ? '30px' : '0px'
                            }}>
                                {/* Number Circle */}
                                <div style={{
                                    position: 'absolute',
                                    top: isMobile ? '0px' : '50%',
                                    left: isMobile ? '50%' : card.circleSide === 'left' ? '-50px' : 'auto',
                                    right: isMobile ? 'auto' : card.circleSide === 'right' ? '-50px' : 'auto',
                                    transform: isMobile ? 'translate(-50%, -50%)' : 'translateY(-50%)',
                                    width: isMobile ? '60px' : '100px',
                                    height: isMobile ? '60px' : '100px',
                                    backgroundColor: '#0111FF',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: isMobile ? '24px' : '44px',
                                    fontWeight: 700,
                                    zIndex: 2,
                                    color: '#fff',
                                    boxShadow: '0 0 25px rgba(1, 17, 255, 0.5)'
                                }}>
                                    {card.num}
                                </div>

                                {/* Content Box */}
                                <div style={{
                                    width: '100%',
                                    backgroundColor: '#000',
                                    borderRadius: '0px',
                                    display: 'flex',
                                    flexDirection: isMobile ? 'column' : 'row',
                                    alignItems: 'stretch',
                                    overflow: 'hidden',
                                    border: '1px solid #191919',
                                    paddingTop: isMobile ? '40px' : '0px'
                                }}>
                                    {card.circleSide === 'left' ? (
                                        <>
                                            <div style={{ 
                                                width: isMobile ? '100%' : '35%', 
                                                padding: isMobile ? '20px 24px 10px' : '30px 40px', 
                                                textAlign: isMobile ? 'center' : 'left', 
                                                backgroundColor: '#191919', 
                                                display: 'flex', 
                                                alignItems: 'center',
                                                justifyContent: isMobile ? 'center' : 'flex-start'
                                            }}>
                                                <h4 style={{ fontSize: isMobile ? '18px' : '22px', fontWeight: 600, color: '#fff', margin: 0, lineHeight: 1.2 }}>{card.title}</h4>
                                            </div>
                                            <div style={{ 
                                                width: isMobile ? '100%' : '65%', 
                                                padding: isMobile ? '10px 24px 30px' : '30px 40px', 
                                                textAlign: isMobile ? 'center' : 'left', 
                                                color: 'rgba(255,255,255,0.7)', 
                                                fontSize: isMobile ? '14px' : '16px', 
                                                display: 'flex', 
                                                alignItems: 'center' 
                                            }}>
                                                {card.desc}
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            {isMobile ? (
                                                <>
                                                    <div style={{ 
                                                        width: '100%', 
                                                        padding: '20px 24px 10px', 
                                                        textAlign: 'center', 
                                                        backgroundColor: '#191919', 
                                                        display: 'flex', 
                                                        alignItems: 'center',
                                                        justifyContent: 'center'
                                                    }}>
                                                        <h4 style={{ fontSize: '18px', fontWeight: 600, color: '#fff', margin: 0, lineHeight: 1.2 }}>{card.title}</h4>
                                                    </div>
                                                    <div style={{ 
                                                        width: '100%', 
                                                        padding: '10px 24px 30px', 
                                                        textAlign: 'center', 
                                                        color: 'rgba(255,255,255,0.7)', 
                                                        fontSize: '14px', 
                                                        display: 'flex', 
                                                        alignItems: 'center',
                                                        justifyContent: 'center'
                                                    }}>
                                                        {card.desc}
                                                    </div>
                                                </>
                                            ) : (
                                                <>
                                                    <div style={{ width: '65%', height: '100%', padding: '30px 40px', textAlign: 'center', color: 'rgba(255,255,255,0.7)', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <div style={{ maxWidth: '480px' }}>{card.desc}</div>
                                                    </div>
                                                    <div style={{ width: '35%', height: '100%', padding: '30px 40px', textAlign: 'left', backgroundColor: '#191919', display: 'flex', alignItems: 'center' }}>
                                                        <h4 style={{ fontSize: '22px', fontWeight: 600, color: '#fff', margin: 0, lineHeight: 1.2 }}>{card.title}</h4>
                                                    </div>
                                                </>
                                            )}
                                        </>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Para quem é esta Revista Section */}
            <section style={{ padding: isMobile ? '60px 20px' : '150px 20px', backgroundColor: '#000000' }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
                    <h2 style={{ fontSize: isMobile ? '36px' : '70px', fontWeight: 700, textAlign: 'center', marginBottom: isMobile ? '40px' : '100px', color: '#fff' }}>Para quem é esta Revista</h2>

                    <div style={{
                        display: 'flex',
                        flexDirection: isMobile ? 'column' : 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: isMobile ? '30px' : '0px',
                        position: 'relative',
                        padding: isMobile ? '0 10px' : '0 40px'
                    }}>
                        {[
                            {
                                title: "Empreendedores Ambiciosos",
                                items: [
                                    "Empreendedores Iniciantes",
                                    "Buscadores de Sucesso",
                                    "Líderes de Startups",
                                    "Entusiastas de Desenvolvimento Pessoal",
                                    "Focados em Resultados"
                                ],
                                isCenter: false
                            },
                            {
                                title: "Estudantes e Jovens Profissionais",
                                items: [
                                    "Estudantes Universitários",
                                    "Recém-Formados em Busca de Propósito",
                                    "Aprendizes Ambiciosos",
                                    "Jovens Artistas e Criativos",
                                    "Amantes do Conhecimento"
                                ],
                                isCenter: true
                            },
                            {
                                title: "Profissionais de Desenvolvimento Pessoal",
                                items: [
                                    "Coaches e Mentores",
                                    "Palestrantes Empreendedores",
                                    "Psicólogos e Terapeutas",
                                    "Treinadores de Liderança",
                                    "Entusiastas de Desenvolvimento Pessoal"
                                ],
                                isCenter: false
                            }
                        ].map((card, i) => (
                            <div key={i} style={{
                                width: isMobile ? '100%' : '360px',
                                height: isMobile ? 'auto' : card.isCenter ? '540px' : '460px',
                                backgroundColor: card.isCenter ? '#141414' : '#0a0a0a',
                                border: '2px solid #0111FF',
                                borderRadius: '15px',
                                padding: isMobile ? '30px 20px' : '50px 40px',
                                zIndex: card.isCenter ? 2 : 1,
                                marginLeft: isMobile ? '0' : i === 0 ? '0' : '-20px',
                                marginRight: isMobile ? '0' : i === 2 ? '0' : '-20px',
                                display: 'flex',
                                flexDirection: 'column',
                                transition: 'all 0.3s ease',
                                boxShadow: card.isCenter ? '0 0 40px rgba(1, 17, 255, 0.2)' : 'none'
                            }}>
                                <h3 style={{
                                    fontSize: '24px',
                                    fontWeight: 700,
                                    color: 'rgba(255,255,255,0.8)',
                                    marginBottom: '40px',
                                    lineHeight: 1.2,
                                    minHeight: '60px'
                                }}>
                                    {card.title}
                                </h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                    {card.items.map((item, j) => (
                                        <div key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
                                            <div style={{ color: '#0111FF', marginTop: '2px' }}>
                                                <CheckCircle2 size={22} />
                                            </div>
                                            <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '18px', lineHeight: 1.3, fontWeight: 400 }}>{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Helps Section */}
            <section style={{ padding: isMobile ? '60px 20px' : '120px 20px', backgroundColor: '#000' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <h2 style={{ fontSize: isMobile ? '36px' : '70px', fontWeight: 700, textAlign: 'center', marginBottom: isMobile ? '40px' : '100px', color: '#fff' }}>Como esta Revista vai ajudar-te?</h2>

                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.2fr 1fr', gap: isMobile ? '30px' : '60px', alignItems: 'center' }}>
                        <div style={{ position: 'relative' }}>
                            <img src="/faundr_magazine/WTF.png" style={{ width: '100%', height: 'auto', display: 'block' }} alt="Revista fan" />
                        </div>

                        <div style={{ textAlign: isMobile ? 'center' : 'left' }}>
                            <h3 style={{ fontSize: isMobile ? '24px' : '32px', fontWeight: 700, color: '#fff', marginBottom: isMobile ? '20px' : '40px' }}>Aprenda mais sobre empreendedorismo</h3>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: isMobile ? '30px' : '60px' }}>
                                {[
                                    { title: "Paixão (O que você ama)", desc: "Representa as atividades que trazem alegria e entusiasmo. São as coisas que você faria mesmo se não fossem remuneradas." },
                                    { title: "Missão (O que o mundo precisa)", desc: "Refere-se às atividades que contribuem para algo maior do que você mesmo, proporcionando um senso de propósito e significado." },
                                    { title: "Vocação (O que você é bom em)", desc: "Envolve as habilidades e talentos naturais que você possui, aquelas em que se destaca naturalmente." },
                                    { title: "Profissão (O que você pode ser pago para fazer)", desc: "Relaciona-se com as atividades que podem fornecer sustento financeiro e estabilidade." }
                                ].map((item, i) => (
                                    <div key={i} style={{ display: 'flex', gap: '20px', textAlign: 'left' }}>
                                        <div style={{ color: 'rgba(255,255,255,0.7)', marginTop: '5px' }}>
                                            <CheckCircle2 size={24} />
                                        </div>
                                        <div>
                                            <p style={{ margin: 0, fontSize: isMobile ? '15px' : '18px', lineHeight: 1.4, color: 'rgba(255,255,255,0.4)' }}>
                                                <strong style={{ color: 'rgba(255,255,255,0.7)' }}>{item.title}:</strong> {item.desc}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <Link to="/revista" style={{ textDecoration: 'none' }}>
                                <button style={{
                                    padding: isMobile ? '15px 40px' : '25px 60px',
                                    backgroundColor: '#0111FF',
                                    color: '#ffffff',
                                    borderRadius: '8px',
                                    border: 'none',
                                    fontSize: isMobile ? '18px' : '24px',
                                    fontWeight: 700,
                                    cursor: 'pointer',
                                    transition: 'all 0.3s'
                                }} onMouseEnter={(e) => e.currentTarget.style.filter = 'brightness(1.1)'} onMouseLeave={(e) => e.currentTarget.style.filter = 'brightness(1)'}>
                                    Ler agora
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Profissionais de Desenvolvimento Pessoal Section */}
            <section style={{ padding: isMobile ? '60px 20px' : '120px 20px', backgroundColor: '#000' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1.2fr', gap: isMobile ? '30px' : '60px', alignItems: 'center' }}>
                    <div style={{ textAlign: isMobile ? 'center' : 'left' }}>
                        <h3 style={{ fontSize: isMobile ? '24px' : '32px', fontWeight: 700, color: 'rgba(255,255,255,0.7)', marginBottom: isMobile ? '20px' : '40px' }}>Profissionais de Desenvolvimento Pessoal</h3>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: isMobile ? '30px' : '60px' }}>
                            {[
                                { title: "Inspirar Protagonismo Diário", desc: "Cada frase deste e-book é uma faísca para despertar o protagonista interior em sua audiência." },
                                { title: "Fornecer Motivação Sustentável", desc: "Com técnicas de neuromarketing, o e-book é projetado para oferecer uma motivação consistente e sustentável." },
                                { title: "Guiar na Descoberta do Propósito", desc: "As frases cuidadosamente selecionadas não apenas motivam, mas também orientam." },
                                { title: "Promover a Mentalidade de Conquista", desc: "Ao internalizar as mensagens diárias, sua audiência será moldada por uma mentalidade de conquista" },
                                { title: "Estimular o Crescimento Contínuo", desc: "O e-book serve como um catalisador para o desenvolvimento pessoal contínuo." }
                            ].map((item, i) => (
                                <div key={i} style={{ display: 'flex', gap: '20px', textAlign: 'left' }}>
                                    <div style={{ color: 'rgba(255,255,255,0.8)', marginTop: '5px' }}>
                                        <CheckCircle2 size={24} />
                                    </div>
                                    <p style={{ margin: 0, fontSize: isMobile ? '15px' : '18px', lineHeight: 1.4, color: 'rgba(255,255,255,0.4)', maxWidth: '500px' }}>
                                        <strong style={{ color: 'rgba(255,255,255,0.6)' }}>{item.title}:</strong> {item.desc}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <Link to="/revista" style={{ textDecoration: 'none' }}>
                            <button style={{
                                width: isMobile ? '200px' : '250px',
                                height: isMobile ? '56px' : '70px',
                                backgroundColor: '#0111FF',
                                color: '#ffffff',
                                borderRadius: '5px',
                                border: 'none',
                                fontSize: isMobile ? '18px' : '24px',
                                fontWeight: 700,
                                cursor: 'pointer',
                                transition: 'all 0.3s'
                            }} onMouseEnter={(e) => e.currentTarget.style.filter = 'brightness(1.1)'} onMouseLeave={(e) => e.currentTarget.style.filter = 'brightness(1)'}>
                                Ler agora
                            </button>
                        </Link>
                    </div>

                    <div style={{ position: 'relative' }}>
                        <img src="/faundr_magazine/WTF2.png" style={{ width: '100%', height: 'auto', display: 'block' }} alt="Revista Spread" />
                    </div>
                </div>
            </section>

            {/* Algumas Páginas da Revista Section */}
            <section style={{ padding: isMobile ? '60px 20px' : '100px 20px', backgroundColor: '#000' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <h2 style={{
                        fontSize: isMobile ? '24px' : '32px',
                        fontWeight: 700,
                        textAlign: 'center',
                        marginBottom: isMobile ? '40px' : '80px',
                        color: 'rgba(255,255,255,0.7)',
                        textTransform: 'uppercase',
                        letterSpacing: '2px'
                    }}>
                        Algumas Páginas da Revista
                    </h2>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
                        gap: isMobile ? '12px' : '20px'
                    }}>
                        {[
                            "/faundr_magazine/pages/210.png",
                            "/faundr_magazine/pages/25.png",
                            "/faundr_magazine/pages/224.png",
                            "/faundr_magazine/pages/218.png",
                            "/faundr_magazine/pages/241.png",
                            "/faundr_magazine/pages/237.png",
                            "/faundr_magazine/pages/253.png",
                            "/faundr_magazine/pages/250.png",
                            "/faundr_magazine/pages/296.png",
                            "/faundr_magazine/pages/210.png",
                            "/faundr_magazine/pages/25.png",
                            "/faundr_magazine/pages/224.png"
                        ].map((src, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ scale: 1.05 }}
                                style={{
                                    aspectRatio: '210/297',
                                    backgroundColor: '#111',
                                    borderRadius: '15px',
                                    overflow: 'hidden',
                                    boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                                    cursor: 'pointer'
                                }}
                            >
                                <img
                                    src={src}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    alt={`Página ${i + 1}`}
                                />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mockup Display Section */}
            <section style={{ padding: isMobile ? '40px 20px 60px' : '80px 20px 120px', backgroundColor: '#000', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ maxWidth: '1000px', width: '100%', marginBottom: isMobile ? '40px' : '80px', textAlign: 'center' }}>
                    <img
                        src="/faundr_magazine/102145.png"
                        style={{
                            width: '100%',
                            height: 'auto',
                            maxWidth: '900px',
                            display: 'block',
                            margin: '0 auto'
                        }}
                        alt="Mockup Revista"
                    />
                </div>

                <Link to="/revista" style={{ textDecoration: 'none' }}>
                    <button style={{
                        width: isMobile ? '280px' : '350px',
                        height: isMobile ? '60px' : '80px',
                        backgroundColor: '#0111FF',
                        color: '#ffffff',
                        borderRadius: '5px',
                        border: 'none',
                        fontSize: isMobile ? '24px' : '38px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        transition: 'all 0.3s'
                    }} onMouseEnter={(e) => e.currentTarget.style.filter = 'brightness(1.1)'} onMouseLeave={(e) => e.currentTarget.style.filter = 'brightness(1)'}>
                        Ler agora
                    </button>
                </Link>
            </section>

            {/* Pricing Section */}
            <section style={{ padding: isMobile ? '60px 20px' : '100px 20px', backgroundColor: '#000' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: 'rgba(255,255,255,0.7)', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '2px' }}>Preço</div>
                    <h2 style={{ fontSize: isMobile ? '36px' : '60px', fontWeight: 700, marginBottom: '20px', color: '#fff' }}>Comprar o livro</h2>
                    <p style={{ fontSize: isMobile ? '16px' : '20px', color: 'rgba(255,255,255,0.6)', maxWidth: '700px', margin: isMobile ? '0 auto 40px' : '0 auto 80px', lineHeight: 1.5 }}>
                        O diferencial marcante deste livro reside na sua abordagem personalizada e prática para inspirar a jornada de cada leitor.
                    </p>

                    <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', flexWrap: 'wrap' }}>
                        {/* Card 1 */}
                        <div style={{
                            width: isMobile ? '100%' : '395px',
                            maxWidth: isMobile ? '400px' : 'none',
                            minHeight: isMobile ? 'auto' : '770px',
                            backgroundColor: '#191919',
                            border: '1px solid #0111FF',
                            borderRadius: '20px',
                            padding: isMobile ? '40px 24px' : '60px 40px',
                            textAlign: 'left',
                            display: 'flex',
                            flexDirection: 'column'
                        }}>
                            <div style={{ width: '60px', height: '60px', backgroundColor: '#0111FF', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '30px' }}>
                                <Book size={30} color="#fff" />
                            </div>
                            <h3 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '10px' }}>Compre o livro</h3>
                            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '18px', marginBottom: '30px' }}>Pagamento único</p>

                            <div style={{ marginBottom: '40px' }}>
                                <div style={{ fontSize: '32px', color: 'rgba(255,255,255,0.4)', textDecoration: 'line-through', fontWeight: 700 }}>AKZ 4750</div>
                                <div style={{ fontSize: '64px', fontWeight: 700, color: 'rgba(255,255,255,0.9)' }}>AKZ 0</div>
                            </div>

                            <Link to="/revista" style={{ textDecoration: 'none', marginBottom: '50px' }}>
                                <button style={{
                                    width: '100%',
                                    height: '60px',
                                    backgroundColor: '#0111FF',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '8px',
                                    fontSize: '20px',
                                    fontWeight: 700,
                                    cursor: 'pointer'
                                }}>Ler agora</button>
                            </Link>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                {[
                                    "Garantia de devolução do dinheiro em 30 dias",
                                    "Livro em formato PDF",
                                    "383 páginas",
                                    "Publicado em 2023",
                                    "Atualizações vitalícias"
                                ].map((item, i) => (
                                    <div key={i} style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
                                        <CheckCircle2 size={20} color="#0111FF" style={{ flexShrink: 0, marginTop: '2px' }} />
                                        <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '16px', lineHeight: 1.4 }}>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Card 2 */}
                        <div style={{
                            width: isMobile ? '100%' : '395px',
                            maxWidth: isMobile ? '400px' : 'none',
                            minHeight: isMobile ? 'auto' : '770px',
                            backgroundColor: '#191919',
                            border: '1px solid #0111FF',
                            borderRadius: '20px',
                            padding: isMobile ? '40px 24px' : '60px 40px',
                            textAlign: 'left',
                            display: 'flex',
                            flexDirection: 'column'
                        }}>
                            <div style={{ width: '60px', height: '60px', backgroundColor: '#0111FF', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '30px' }}>
                                <BookOpen size={30} color="#fff" />
                            </div>
                            <h3 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '10px' }}>Visualização gratuita</h3>
                            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '18px', marginBottom: '30px' }}>Experimente antes de comprar</p>

                            <div style={{ marginBottom: '40px' }}>
                                <div style={{ fontSize: '64px', fontWeight: 700, color: 'rgba(255,255,255,0.9)' }}>AKZ 0</div>
                                <div style={{ fontSize: '32px', color: 'rgba(255,255,255,0.4)', textDecoration: 'line-through', fontWeight: 700 }}>AKZ 4750</div>
                            </div>

                            <Link to="/revista" style={{ textDecoration: 'none', marginBottom: '50px' }}>
                                <button style={{
                                    width: '100%',
                                    height: '60px',
                                    backgroundColor: 'transparent',
                                    color: 'rgba(255,255,255,0.7)',
                                    border: '1.5px solid #0111FF',
                                    borderRadius: '8px',
                                    fontSize: '20px',
                                    fontWeight: 700,
                                    cursor: 'pointer'
                                }}>Visualização gratuita</button>
                            </Link>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                {[
                                    "Pré-visualização em formato PDF",
                                    "3 orientações gratuitas",
                                    "28 páginas"
                                ].map((item, i) => (
                                    <div key={i} style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
                                        <CheckCircle2 size={20} color="#0111FF" style={{ flexShrink: 0, marginTop: '2px' }} />
                                        <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '16px', lineHeight: 1.4 }}>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section style={{ padding: isMobile ? '60px 20px' : '120px 20px', backgroundColor: '#000' }}>
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: isMobile ? '40px' : '80px' }}>
                        <div style={{ fontSize: '14px', fontWeight: 700, color: 'rgba(255,255,255,0.7)', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '2px' }}>FAQ</div>
                        <h2 style={{ fontSize: isMobile ? '36px' : '64px', fontWeight: 700, color: '#fff' }}>Ainda tem dúvidas?</h2>
                    </div>

                    <div style={{ display: 'grid' }}>
                        {[
                            { q: "O que torna este e-book único?", a: "O Faundr Magazine combina conhecimento técnico com inspiração prática, focado no ecossistema de empreendedorismo angolano." },
                            { q: "Como as frases são selecionadas?", a: "Cada frase é curada com base na sua relevância estratégica e capacidade de motivar a ação imediata." },
                            { q: "Como o e-book pode me ajudar a descobrir meu propósito?", a: "Através de exercícios e reflexões guiadas baseadas no conceito de Ikigai e outras metodologias de autodescoberta." },
                            { q: "Há algum bônus exclusivo para os primeiros compradores?", a: "Sim, as primeiras purchases recebem guias extras de táticas de crescimento para startups." },
                            { q: "Como posso incorporar o e-book na minha rotina diária?", a: "Recomendamos a leitura de uma secção por dia e a aplicação imediata de pelo menos um conselho prático." },
                            { q: "O e-book é voltado para um público específico?", a: "É ideal para empreendedores, estudantes, criativos e profissionais em busca de desenvolvimento pessoal." },
                            { q: "Existe um suporte ou comunidade para discussão sobre o e-book?", a: "Sim, a compra inclui acesso à nossa comunidade Bisnoteka para networking e suporte." },
                            { q: "O e-book está disponível em outros idiomas?", a: "Atualmente, o conteúdo está disponível apenas em Português." },
                            { q: "Como faço para adquirir o e-book?", a: "Pode adquirir diretamente através dos botões de compra nesta página." },
                            { q: "Existe uma garantia de satisfação?", a: "Sim, oferecemos garantia de reembolso total nos primeiros 30 dias após a aquisição." }
                        ].map((faq, i) => (
                            <div key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', overflow: 'hidden' }}>
                                <div
                                    onClick={() => toggleFaq(i)}
                                    style={{
                                        padding: '40px 0',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        cursor: 'pointer',
                                    }}
                                >
                                    <h4 style={{ fontSize: isMobile ? '16px' : '20px', fontWeight: 400, color: 'rgba(255,255,255,0.7)', margin: 0, paddingRight: '10px' }}>
                                        {i + 1}. {faq.q}
                                    </h4>
                                    <div style={{ color: 'rgba(255,255,255,0.4)' }}>
                                        <ChevronDown size={isMobile ? 20 : 28} style={{
                                            transform: faqOpen === i ? 'rotate(180deg)' : 'none',
                                            transition: 'transform 0.3s ease'
                                        }} />
                                    </div>
                                </div>
                                {faqOpen === i && (
                                    <div style={{ padding: '0 0 40px', color: 'rgba(255,255,255,0.4)', fontSize: isMobile ? '15px' : '18px', lineHeight: 1.6 }}>
                                        {faq.a}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final Footer CTA */}
            <section style={{ padding: isMobile ? '80px 20px' : '150px 20px', textAlign: 'center', borderTop: '1px solid #222', overflow: 'hidden' }}>
                <h1 style={{ fontSize: '10vw', fontWeight: 900, letterSpacing: '-5px', color: 'rgba(255,255,255,0.05)', marginBottom: isMobile ? '-15px' : '-40px' }}>FAUNDR</h1>
                <h2 style={{ fontSize: isMobile ? '28px' : '48px', fontWeight: 900, marginBottom: isMobile ? '20px' : '40px' }}>Pronto para o Próximo Nível?</h2>
                <Link to="/revista">
                    <button style={{ padding: isMobile ? '15px 40px' : '25px 80px', backgroundColor: '#0011fd', color: '#fff', borderRadius: '99px', border: 'none', fontWeight: 900, fontSize: isMobile ? '16px' : '18px' }}>LER AGORA</button>
                </Link>
            </section>

        </div>
    );
};

export default FaundrMagazineLandingPage;
