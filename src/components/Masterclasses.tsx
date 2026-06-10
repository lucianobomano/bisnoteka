import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, ChevronLeft, ChevronRight } from 'lucide-react';

// Animated Counter Component
const CounterItem: React.FC<{ target: number; label: string; suffix?: string }> = ({ target, label, suffix = '' }) => {
    const [count, setCount] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !isVisible) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.5 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, [isVisible]);

    useEffect(() => {
        if (!isVisible) return;

        const duration = 2000; // 2 seconds animation
        const steps = 60;
        const stepValue = target / steps;
        const stepDuration = duration / steps;
        let current = 0;

        const timer = setInterval(() => {
            current += stepValue;
            if (current >= target) {
                setCount(target);
                clearInterval(timer);
            } else {
                setCount(Math.floor(current));
            }
        }, stepDuration);

        return () => clearInterval(timer);
    }, [isVisible, target]);

    const formatNumber = (num: number): string => {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(0) + 'K';
        }
        return num.toString();
    };

    return (
        <div ref={ref} style={{ textAlign: 'left' }}>
            <p style={{
                fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                fontSize: '41px',
                color: '#FE3721',
                fontWeight: 700,
                lineHeight: '1',
                marginBottom: '8px'
            }}>
                {formatNumber(count)}{suffix}
            </p>
            <p style={{
                fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                fontSize: '14px',
                color: '#000000',
                fontWeight: 400,
                letterSpacing: '1px'
            }}>
                {label}
            </p>
        </div>
    );
};

const Masterclasses: React.FC = () => {
    // Responsive hook
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    // Logo names exactly as shown in reference image
    const logos = [
        "FASTCOMPANY", "TIME", "Forbes", "shopify", "THE HUFFINGTON POST",
        "FORTUNE", "teachable", "THE WALL STREET JOURNAL", "Inc.", "THINKIFIC", "HubSpot"
    ];

    const cards = [
        {
            thumbnail: "/media/masterclass_1.png",
            title: "START A PROFITABLE ONLINE STORE IN JUST 12 WEEKS",
            description: "Multimillionaire ecommerce expert Gretta Van Riel teaches you how to launch a powerhouse online store."
        },
        {
            thumbnail: "/media/masterclass_2.png",
            title: "GO FROM ZERO TO 500K+ INSTAGRAM FOLLOWERS",
            description: "Get the formula Foundr used to reach 500k Instagram followers in 12 months, then keep scaling to 3+ million."
        },
        {
            thumbnail: "/media/masterclass_3.png",
            title: "GROW YOUR ECOMMERCE SALES WITH FACEBOOK ADS",
            description: "Discover the \"Algorithm-Proof\" Facebook ads strategy for scaling ecommerce brands with Nick Shackelford."
        }
    ];

    return (
        <>
            <section
                style={{ backgroundColor: '#f6f7f9', paddingTop: 0, padding: isMobile ? '0 15px' : 0 }}
                className="w-full flex flex-col items-center"
            >
                {/* Logo Slider Group */}
                <div
                    style={{
                        width: isMobile ? '100%' : '1360px',
                        maxWidth: '100%',
                        height: isMobile ? '80px' : '115px',
                        backgroundColor: '#10171f',
                        borderBottomLeftRadius: '16px',
                        borderBottomRightRadius: '16px'
                    }}
                    className="relative overflow-hidden flex flex-col items-center justify-center"
                >
                    {/* TRUSTED BY text */}
                    <span
                        style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '3px', marginBottom: '12px' }}
                        className="text-white/60 uppercase"
                    >
                        TRUSTED BY
                    </span>

                    {/* Infinite sliding logos */}
                    <div style={{ width: '100%', overflow: 'hidden' }}>
                        <motion.div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '50px',
                                whiteSpace: 'nowrap'
                            }}
                            animate={{ x: [0, -1200] }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        >
                            {[...logos, ...logos, ...logos].map((logo, idx) => (
                                <span
                                    key={idx}
                                    style={{
                                        fontSize: '16px',
                                        fontWeight: 700,
                                        letterSpacing: '-0.5px',
                                        fontStyle: 'italic',
                                        color: 'rgba(255,255,255,0.5)',
                                        flexShrink: 0
                                    }}
                                >
                                    {logo}
                                </span>
                            ))}
                        </motion.div>
                    </div>
                </div>

                {/* Section Title */}
                <h2
                    style={{
                        fontSize: isMobile ? '28px' : '50px',
                        letterSpacing: isMobile ? '-1px' : '-5px',
                        fontWeight: 700,
                        marginTop: isMobile ? '50px' : '100px',
                        marginBottom: isMobile ? '24px' : '42px',
                        lineHeight: '1',
                        color: '#10171f',
                        textAlign: 'center',
                        maxWidth: isMobile ? '90%' : '765px',
                        padding: isMobile ? '0 15px' : 0
                    }}
                    className="uppercase"
                >
                    CONSELHOS DE FAUNDRS QUE ESTÃO NO JOGO E FAZEM ACONTECER
                </h2>

                {/* Cards Grid */}
                <div style={{
                    display: 'flex',
                    flexDirection: isMobile ? 'column' : 'row',
                    gap: isMobile ? '20px' : '32px',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: '60px',
                    padding: isMobile ? '0 15px' : 0,
                    width: isMobile ? '100%' : 'auto'
                }}>
                    {cards.map((card, idx) => (
                        <div
                            key={idx}
                            style={{
                                width: isMobile ? '100%' : '350px',
                                maxWidth: isMobile ? '350px' : '350px',
                                height: 'auto',
                                minHeight: isMobile ? 'auto' : '585px',
                                backgroundColor: '#ffffff',
                                paddingLeft: isMobile ? '20px' : '30px',
                                paddingRight: isMobile ? '20px' : '30px',
                                paddingTop: '25px',
                                paddingBottom: '48px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                                borderRadius: '24px',
                                boxShadow: '0 0 30px rgba(0, 0, 0, 0.15)'
                            }}
                        >
                            {/* Thumbnail Container - 290x172px */}
                            <div
                                style={{
                                    position: 'relative',
                                    width: isMobile ? '100%' : '290px',
                                    height: isMobile ? '160px' : '172px',
                                    marginBottom: '42px',
                                    display: 'flex',
                                    justifyContent: 'center'
                                }}
                            >
                                {/* Solid Shadow - horizontal offset -15, vertical offset 15, color #F8341F */}
                                <div
                                    style={{
                                        position: 'absolute',
                                        width: '100%',
                                        height: '100%',
                                        backgroundColor: '#F8341F',
                                        left: '-15px',
                                        top: '15px',
                                        zIndex: 0
                                    }}
                                />

                                {/* Image Container */}
                                <div
                                    style={{
                                        position: 'relative',
                                        zIndex: 1,
                                        width: '100%',
                                        height: '100%',
                                        backgroundColor: '#e5e5e5',
                                        overflow: 'hidden'
                                    }}
                                >
                                    <img
                                        src={card.thumbnail}
                                        alt={card.title}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />

                                    {/* Play Button with pulsating animation */}
                                    <div
                                        style={{
                                            position: 'absolute',
                                            top: '50%',
                                            left: '50%',
                                            transform: 'translate(-50%, -50%)'
                                        }}
                                    >
                                        {/* Pulsating ring - blur 3px, spread 12px, #f834f1 40% opacity */}
                                        <motion.div
                                            style={{
                                                position: 'absolute',
                                                top: '50%',
                                                left: '50%',
                                                width: '56px',
                                                height: '56px',
                                                borderRadius: '50%',
                                                transform: 'translate(-50%, -50%)'
                                            }}
                                            animate={{
                                                boxShadow: [
                                                    "0 0 3px 0px rgba(248, 52, 241, 0)",
                                                    "0 0 3px 12px rgba(248, 52, 241, 0.4)",
                                                    "0 0 3px 0px rgba(248, 52, 241, 0)"
                                                ]
                                            }}
                                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                                        />

                                        {/* Play button circle */}
                                        <div
                                            style={{
                                                width: '56px',
                                                height: '56px',
                                                backgroundColor: '#f8341f',
                                                borderRadius: '50%',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                cursor: 'pointer',
                                                position: 'relative',
                                                zIndex: 2
                                            }}
                                        >
                                            <Play fill="white" color="white" size={24} style={{ marginLeft: '3px' }} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Title - 25px, letter-spacing -1.5px, line-height 1, color #091745 */}
                            <h3
                                style={{
                                    fontSize: '25px',
                                    letterSpacing: '-1.5px',
                                    lineHeight: '1',
                                    color: '#091745',
                                    fontWeight: 900,
                                    marginBottom: '30px',
                                    textTransform: 'uppercase'
                                }}
                            >
                                {card.title}
                            </h3>

                            {/* Description - 18px, weight 400, line-height 1.2, color #091745 */}
                            <p
                                style={{
                                    fontSize: '18px',
                                    fontWeight: 400,
                                    lineHeight: '1.2',
                                    color: '#091745',
                                    marginBottom: 'auto'
                                }}
                            >
                                {card.description}
                            </p>

                            {/* Button SABER MAIS - w=100%, h=65px, bg #FE3721, full rounded */}
                            <button
                                style={{
                                    width: '100%',
                                    height: '65px',
                                    backgroundColor: '#FE3721',
                                    borderRadius: '9999px',
                                    border: 'none',
                                    color: 'white',
                                    fontSize: '18px',
                                    fontWeight: 900,
                                    textTransform: 'uppercase',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '8px',
                                    marginTop: isMobile ? '20px' : '0'
                                }}
                            >
                                SABER MAIS
                                <span style={{ fontSize: '14px' }}>›</span>
                            </button>
                        </div>
                    ))}
                </div>

                {/* Bottom Link Group - 590x42px, bg #ffffff, full rounded */}
                <div
                    style={{
                        width: isMobile ? '100%' : '590px',
                        height: isMobile ? 'auto' : '42px',
                        backgroundColor: isMobile ? 'transparent' : '#ffffff',
                        borderRadius: '9999px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: isMobile ? '40px' : '80px',
                        padding: isMobile ? '0 15px' : 0,
                        cursor: 'pointer'
                    }}
                >
                    <p style={{
                        fontSize: isMobile ? '16px' : '22px',
                        letterSpacing: isMobile ? '0' : '-0.5px',
                        fontWeight: 700,
                        color: '#10171f',
                        margin: 0,
                        textAlign: 'center'
                    }}>
                        Quer mais? <span style={{ color: '#FE3721' }}>Veja todas as nossas Masterclasses grátis</span>
                    </p>
                </div>

                {/* About Us Section */}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: isMobile ? 'column' : 'row',
                        width: '100%',
                        marginTop: isMobile ? '40px' : '72px',
                        marginBottom: isMobile ? '40px' : '80px',
                        alignItems: isMobile ? 'center' : 'flex-start',
                        padding: isMobile ? '0 20px' : 0
                    }}
                >
                    {/* Books Image - extends from left edge */}
                    <div style={{
                        flexShrink: 0,
                        marginLeft: isMobile ? '0' : '-610px',
                        marginRight: isMobile ? '0' : '720px',
                        display: isMobile ? 'none' : 'block'
                    }}>
                        <img
                            src="/media/livros.png"
                            alt="Bisnoteka Books"
                            style={{
                                width: '970px',
                                height: 'auto',
                                objectFit: 'contain',
                                transform: 'scale(1.8)',
                                transformOrigin: 'left center'
                            }}
                        />
                    </div>

                    {/* About Us Content - 80px spacing from image */}
                    <div style={{ marginLeft: isMobile ? '0' : '80px', maxWidth: isMobile ? '100%' : '500px', textAlign: isMobile ? 'center' : 'left' }}>
                        {/* Sobre nós */}
                        <p style={{
                            fontSize: isMobile ? '24px' : '30px',
                            letterSpacing: isMobile ? '-1px' : '-1.5px',
                            color: '#091747',
                            marginBottom: '15px',
                            fontWeight: 400
                        }}>
                            Sobre nós
                        </p>

                        {/* Bisnoteka */}
                        <h2 style={{
                            fontSize: isMobile ? '48px' : '102px',
                            fontFamily: 'Sora, sans-serif',
                            fontWeight: 700,
                            letterSpacing: isMobile ? '-1px' : '-3px',
                            color: '#11171F',
                            marginBottom: isMobile ? '30px' : '60px',
                            lineHeight: '1'
                        }}>
                            Bisnoteka
                        </h2>

                        {/* Description text */}
                        <div style={{
                            fontFamily: 'Roboto, sans-serif',
                            fontSize: '17px',
                            fontWeight: 400,
                            lineHeight: '1.6',
                            color: '#333'
                        }}>
                            <p style={{ marginBottom: '1em' }}>
                                A Bisnoteka é uma empresa angolana de mídia e educação para empreendedores. Procuramos, através dos nossos conteúdos e programas, combinar educação, terapia, coaching, motivação, meditação e networking num só lugar para te entregar resultados e ajudar a construir sua melhor versão.
                            </p>
                            <p style={{ marginBottom: '1em' }}>
                                Educamos e inspiramos os fundadores de hoje a se tornarem os ícones de negócios de amanhã da nossa sociedade afrikana e angolana em particular. Pretendemos fazer isso através da democratização da informação de alto nível, comprovada e validada por quem já está no campo de batalha.
                            </p>
                            <p style={{ marginBottom: '1em' }}>
                                Nossa missão é criar uma geração de milionários angolanos comprometidos em tornar o mundo um lugar melhor através do seu empreendedorismo.
                            </p>
                            <p>
                                Bem-vindos a Bisnoteka, a forja de futuros Milionários
                            </p>
                        </div>

                        {/* Counters - 70px below description */}
                        <div style={{
                            display: 'flex',
                            flexWrap: isMobile ? 'wrap' : 'nowrap',
                            justifyContent: isMobile ? 'center' : 'flex-start',
                            gap: isMobile ? '20px' : '40px',
                            marginTop: isMobile ? '40px' : '70px',
                            width: '100%'
                        }}>
                            <CounterItem target={12} label="PAÍSES" />
                            <CounterItem target={250000} label="SEGUIDORES" suffix="+" />
                            <CounterItem target={150} label="PODCASTS" suffix="+" />
                            <CounterItem target={500} label="ARTIGOS" suffix="+" />
                        </div>
                    </div>
                </div>

                {/* Section with Decorative Circles - Title and Cards */}
                <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    {/* Top Group Header (circles) */}
                    <div style={{ position: 'relative', width: isMobile ? '300px' : '970px', height: isMobile ? '300px' : '970px', flexShrink: 0 }}>
                        {/* Background circle - 720x720px */}
                        <div style={{
                            width: isMobile ? '280px' : '720px',
                            height: isMobile ? '280px' : '720px',
                            borderRadius: '50%',
                            backgroundColor: '#ffffff',
                            position: 'absolute',
                            top: '0',
                            left: '50%',
                            transform: 'translateX(-50%)'
                        }} />
                        {/* Top circle - 640x640px with shadow */}
                        <div style={{
                            width: isMobile ? '240px' : '640px',
                            height: isMobile ? '240px' : '640px',
                            borderRadius: '50%',
                            backgroundColor: '#ffffff',
                            position: 'absolute',
                            top: isMobile ? '20px' : '40px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            boxShadow: '0 0 16px rgba(0, 0, 0, 0.12)'
                        }} />
                    </div>

                    {/* Title */}
                    <h2
                        style={{
                            fontSize: isMobile ? '26px' : '50px',
                            letterSpacing: isMobile ? '-1px' : '-5px',
                            lineHeight: '1.2',
                            maxWidth: isMobile ? '90%' : '751px',
                            marginTop: isMobile ? '-280px' : '-800px',
                            marginBottom: isMobile ? '30px' : '50px',
                            textAlign: 'center',
                            color: '#10171f',
                            fontWeight: 700,
                            position: 'relative',
                            zIndex: 1
                        }}
                        className="uppercase"
                    >
                        POR ONDE DESEJA COMEÇAR A CONSTRUIR O SEU NEGÓCIO?
                    </h2>

                    {/* Service Cards Grid */}
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: isMobile ? '30px' : '20px',
                        alignItems: 'center',
                        marginBottom: isMobile ? '40px' : '80px',
                        position: 'relative',
                        zIndex: 1,
                        width: '100%',
                        padding: isMobile ? '0 20px' : 0
                    }}>
                        {[
                            { image: 'CURSOS.png', title: 'CURSOS ONLINE', description: 'Aprenda a criar uma estrutura de negócio que funciona estudando exemplos validados e de quem tem feito isso repetidas vezes' },
                            { image: 'FAUNDR FORGE.png', title: 'FAUNDR FORGE', description: 'Mergulhe numa jornada imersiva que te vai oferecer todas as ferramentas que precisas para criar, validar, segmentar, escalar e crescer um negócio.' },
                            { image: 'FAUNDR XPERIENCE.png', title: 'FAUNDR XPERIENCE', description: 'Mergulhe numa jornada imersiva que te vai oferecer todas as ferramentas que precisas para criar, validar, segmentar, escalar e crescer um negócio.' },
                            { image: 'MINDSET.png', title: 'MINDSET DISRUPTIVO', description: 'Adquira acesso a maior comunidade de leitura nacional. Leia os livros que merecem ser lidos e afie o seu mindset. Torna-te na pessoa que você nasceu para ser.' },
                            { image: 'PODCASTS.png', title: 'PODCASTS SEMANAIS', description: 'Acompanhe as melhores entrevistas em vídeo e áudio aos melhores e maiores empreendedores nacionais e não só. Esteja por dentro do que acontece localmente e do que tem funcionado fora.' },
                            { image: 'MAGAZINE.png', title: 'REVISTA MENSAL', description: 'Entrevistas exclusivas com quem está no jogo. Leia em primeira mão o que diversos profissionais, líderes no seu mercado, fizeram para chegar onde chegaram e o que estão a fazer para se manter no jogo.' },
                            { image: 'LIVROS01.png', title: 'LIVROS', description: 'Acompanhe a nossa série de livros sugeridos pelos principais profissionais do mercado nacional e internacional e adquira o seu mindset.' },
                            { image: 'AUDIOBOOKS.png', title: 'ÁUDIO LIVROS', description: 'Oiça os livros de qualquer lugar e dispositivo. Já não há motivos para ficar parado e para trás' },
                            { image: 'MOTIVA.png', title: 'MOTIVAÇÃO', description: 'Motiva-te com os nossos vídeos e áudios para começares da melhor maneira a sua jornada de trabalho ou terminares ela de maneira mais intensa.' },
                            { image: 'MINDSET BUSINESS.png', title: 'MINDSET NEGÓCIO', description: 'Adquira a mentalidade correcta para empreender e mantenha-te sempre disposto para enfrentar as dificuldades que esse mundo oferece.' },
                            { image: 'MOTIVA.png', title: 'BIBLIOTEKA BIZ', description: 'Encontre ideias de negócio validadas com planos de negócio, identidade visual completa, brand books e muito mais' },
                            { image: 'CONSULTORIA.png', title: 'CONSULTORIA GRATUITA', description: 'Consultoria com os nossos profissionais. Esclareça todas as dúvidas e receba as orientações pontuais prontas a serem aplicadas no seu negócio.', isLast: true }
                        ].map((card, idx) => (
                            <div
                                key={idx}
                                style={{
                                    width: isMobile ? '100%' : '1040px',
                                    height: isMobile ? 'auto' : (card.isLast ? '500px' : '342px'),
                                    padding: isMobile ? '24px' : '42px',
                                    borderRadius: '12px',
                                    backgroundColor: '#ffffff',
                                    boxShadow: '0 0 20px 4px rgba(0, 0, 0, 0.15)',
                                    display: 'flex',
                                    flexDirection: isMobile ? 'column' : 'row',
                                    alignItems: 'center',
                                    gap: isMobile ? '20px' : '60px',
                                    marginBottom: (card.isLast && !isMobile) ? '-80px' : '0'
                                }}
                            >
                                {/* Image Container */}
                                <div style={{ width: isMobile ? '100%' : '260px', height: isMobile ? 'auto' : '260px', maxWidth: '280px', flexShrink: 0, borderRadius: '8px', overflow: 'hidden' }}>
                                    <img
                                        src={`/media/${card.image}`}
                                        alt={card.title}
                                        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                                    />
                                </div>

                                {/* Info Group */}
                                <div style={{ width: isMobile ? '100%' : '450px', display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: isMobile ? 'center' : 'left' }}>
                                    <h3 style={{
                                        fontSize: isMobile ? '24px' : '30px',
                                        letterSpacing: isMobile ? '-1px' : '-1.5px',
                                        textTransform: 'uppercase',
                                        color: '#091747',
                                        fontWeight: 700,
                                        marginBottom: '16px'
                                    }}>
                                        {card.title}
                                    </h3>
                                    <p style={{
                                        fontSize: isMobile ? '16px' : '22px',
                                        fontWeight: 400,
                                        lineHeight: '1.2',
                                        color: '#333',
                                        marginBottom: '24px'
                                    }}>
                                        {card.description}
                                    </p>
                                    <button style={{
                                        width: isMobile ? '100%' : '280px',
                                        height: '65px',
                                        backgroundColor: '#f8341f',
                                        borderRadius: '9999px',
                                        border: 'none',
                                        color: 'white',
                                        fontSize: isMobile ? '18px' : '22px',
                                        fontWeight: 700,
                                        cursor: 'pointer',
                                        textTransform: 'uppercase'
                                    }}>
                                        SABER MAIS
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section style={{
                backgroundColor: '#161616',
                paddingTop: '150px',
                paddingBottom: '100px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginTop: isMobile ? '0' : '-100px'
            }}>
                {/* Section Title */}
                <h2 style={{
                    fontSize: isMobile ? '28px' : '50px',
                    letterSpacing: isMobile ? '-1px' : '-5px',
                    lineHeight: '1.1',
                    color: '#ffffff',
                    marginBottom: isMobile ? '30px' : '50px',
                    maxWidth: isMobile ? '90%' : '855px',
                    textAlign: 'center',
                    fontWeight: 700,
                    padding: isMobile ? '0 15px' : 0
                }}>
                    APRENDA COM A ESTRUTURA CONFIRMADA DOS MAIORES PLAYERS NACIONAIS
                </h2>

                {/* Testimonial Cards */}
                <div style={{
                    display: 'flex',
                    flexDirection: isMobile ? 'column' : 'row',
                    gap: isMobile ? '40px' : '42px',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%'
                }}>
                    {[
                        { name: 'João Silva', role: 'CEO & Fundador', company: 'TechAngola', comment: '"A Bisnoteka mudou completamente a minha perspetiva sobre empreendedorismo. Os cursos são incríveis!"', image: 'testimonial_1.png' },
                        { name: 'Maria Santos', role: 'Empreendedora', company: 'StartUp Hub', comment: '"Graças à formação da Bisnoteka, consegui escalar o meu negócio em 300% em apenas 6 meses."', image: 'testimonial_2.png' },
                        { name: 'Pedro Nunes', role: 'Investidor', company: 'Capital Angola', comment: '"A comunidade e o networking que encontrei aqui são inestimáveis. Recomendo a todos os empreendedores."', image: 'testimonial_3.png' }
                    ].map((testimonial, idx) => (
                        <div
                            key={idx}
                            style={{
                                width: isMobile ? '100%' : '300px',
                                maxWidth: isMobile ? '320px' : '300px',
                                height: 'auto',
                                minHeight: isMobile ? 'auto' : '560px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                textAlign: 'center',
                                padding: '20px'
                            }}
                        >
                            {/* Avatar */}
                            <div style={{
                                width: isMobile ? '200px' : '286px',
                                height: isMobile ? '200px' : '286px',
                                minWidth: isMobile ? '200px' : '286px',
                                minHeight: isMobile ? '200px' : '286px',
                                borderRadius: '50%',
                                border: isMobile ? '6px solid #FE3721' : '10px solid #FE3721',
                                overflow: 'hidden',
                                marginBottom: '24px',
                                backgroundColor: '#333',
                                flexShrink: 0
                            }}>
                                <img
                                    src={`/media/${testimonial.image}`}
                                    alt={testimonial.name}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover'
                                    }}
                                />
                            </div>

                            {/* Name */}
                            <p style={{
                                fontSize: isMobile ? '18px' : '22px',
                                lineHeight: '1',
                                color: '#e5e1e7',
                                maxWidth: '100%',
                                marginBottom: '10px',
                                fontWeight: 600
                            }}>
                                {testimonial.name}
                            </p>

                            {/* Role */}
                            <p style={{
                                fontSize: isMobile ? '16px' : '21px',
                                lineHeight: '1',
                                color: '#BCBCBC',
                                marginBottom: '20px'
                            }}>
                                {testimonial.role}, {testimonial.company}
                            </p>

                            {/* Comment */}
                            <p style={{
                                fontSize: isMobile ? '16px' : '21px',
                                lineHeight: '1.4',
                                color: '#BCBCBC',
                                fontStyle: 'italic'
                            }}>
                                {testimonial.comment}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* 7 Pillars Section */}
            <section style={{
                backgroundColor: '#E2E2E2',
                paddingTop: isMobile ? '60px' : '150px',
                paddingBottom: isMobile ? '60px' : '100px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: isMobile ? '60px 20px' : undefined
            }}>
                {/* Main Title */}
                <h2 style={{
                    fontSize: isMobile ? '26px' : '50px',
                    letterSpacing: isMobile ? '-1px' : '-5px',
                    lineHeight: '1',
                    color: '#0F151C',
                    maxWidth: isMobile ? '100%' : '865px',
                    marginBottom: '12px',
                    textAlign: 'center',
                    fontWeight: 700
                }}>
                    NA BISNOTEKA VOCÊ VAI APRENDER OS 7 PILARES PARA GERAÇÃO DE RIQUEZAS NUM MUNDO MODERNO
                </h2>

                {/* Subtitle */}
                <p style={{
                    fontSize: isMobile ? '16px' : '25px',
                    fontWeight: 400,
                    lineHeight: '1.3',
                    letterSpacing: isMobile ? '0' : '-1px',
                    color: '#0f151c',
                    marginBottom: isMobile ? '30px' : '50px',
                    textAlign: 'center',
                    maxWidth: isMobile ? '100%' : '865px'
                }}>
                    O mercado mudou e você precisa se atualizar! Comece hoje sua evolução nas áreas de Negócios, Finanças, Marketing, Liderança, Estratégia, Mentalidade e muito mais!
                </p>

                {/* Pillar Cards */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '30px' : '40px', width: isMobile ? '100%' : 'auto', alignItems: 'center' }}>

                    {/* Card 1 - Propósito (number left) */}
                    <div style={{ width: isMobile ? '100%' : '966px', maxWidth: '100%', height: isMobile ? 'auto' : '194px', backgroundColor: '#ffffff', display: 'flex', flexDirection: isMobile ? 'column' : 'row', overflow: 'hidden' }}>
                        <div style={{ width: isMobile ? '100%' : '274px', height: '194px', backgroundColor: '#10171f', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <span style={{ fontSize: '200px', color: '#f83821', fontWeight: 700, lineHeight: '1' }}>01</span>
                        </div>
                        <div style={{ flex: 1, padding: isMobile ? '20px' : '0 50px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <h3 style={{ fontSize: isMobile ? '20px' : '30px', color: '#091747', letterSpacing: '-1.5px', fontWeight: 700, marginBottom: '10px' }}>PROPÓSITO</h3>
                            <p style={{ fontSize: isMobile ? '14px' : '22px', lineHeight: '1.2', color: '#091747', maxWidth: isMobile ? '100%' : '450px' }}>Conheça as ferramentas que te vão ajudar a identificar o seu propósito, se conectar e empreender através dele.</p>
                        </div>
                    </div>

                    {/* Card 2 - OCN (number right) */}
                    <div style={{ width: isMobile ? '100%' : '966px', maxWidth: '100%', height: isMobile ? 'auto' : '194px', backgroundColor: '#ffffff', display: 'flex', flexDirection: isMobile ? 'column-reverse' : 'row', overflow: 'hidden' }}>
                        <div style={{ flex: 1, padding: isMobile ? '20px' : '0 50px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <h3 style={{ fontSize: isMobile ? '20px' : '30px', color: '#091747', letterSpacing: '-1.5px', fontWeight: 700, marginBottom: '10px' }}>OCN - OPORTUNIDADES E CRIAÇÃO DE NEGÓCIO</h3>
                            <p style={{ fontSize: isMobile ? '14px' : '22px', lineHeight: '1.2', color: '#091747', maxWidth: isMobile ? '100%' : '591px' }}>Aprenda a olhar no mercado de uma outra perspectiva e enxergue as oportunidades que a maioria das pessoas não vê e saia na frente</p>
                        </div>
                        <div style={{ width: isMobile ? '100%' : '274px', height: '194px', backgroundColor: '#0011fd', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <span style={{ fontSize: '200px', color: '#ffffff', fontWeight: 700, lineHeight: '1' }}>02</span>
                        </div>
                    </div>

                    {/* Card 3 - Branding (number left) */}
                    <div style={{ width: isMobile ? '100%' : '966px', maxWidth: '100%', height: isMobile ? 'auto' : '194px', backgroundColor: '#ffffff', display: 'flex', flexDirection: isMobile ? 'column' : 'row', overflow: 'hidden' }}>
                        <div style={{ width: isMobile ? '100%' : '274px', height: '194px', backgroundColor: '#f83821', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <span style={{ fontSize: '200px', color: '#ffffff', fontWeight: 700, lineHeight: '1' }}>03</span>
                        </div>
                        <div style={{ flex: 1, padding: isMobile ? '20px' : '0 50px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <h3 style={{ fontSize: isMobile ? '20px' : '30px', color: '#091747', letterSpacing: '-1.5px', fontWeight: 700, marginBottom: '10px' }}>BRANDING E AWARNESS</h3>
                            <p style={{ fontSize: isMobile ? '14px' : '22px', lineHeight: '1.2', color: '#091747', maxWidth: isMobile ? '100%' : '450px' }}>Construa um negócio e transforme-o numa marca memorável</p>
                        </div>
                    </div>

                    {/* Card 4 - Estratégia (number right) */}
                    <div style={{ width: isMobile ? '100%' : '966px', maxWidth: '100%', height: isMobile ? 'auto' : '194px', backgroundColor: '#ffffff', display: 'flex', flexDirection: isMobile ? 'column-reverse' : 'row', overflow: 'hidden' }}>
                        <div style={{ flex: 1, padding: isMobile ? '20px' : '0 50px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <h3 style={{ fontSize: isMobile ? '20px' : '30px', color: '#091747', letterSpacing: '-1.5px', fontWeight: 700, marginBottom: '10px' }}>ESTRATÉGIA E INOVAÇÃO</h3>
                            <p style={{ fontSize: isMobile ? '14px' : '22px', lineHeight: '1.2', color: '#091747', maxWidth: isMobile ? '100%' : '591px' }}>Aprenda como criar e gerenciar modelos estratégicos para conduzir o seu negócio.</p>
                        </div>
                        <div style={{ width: isMobile ? '100%' : '274px', height: '194px', backgroundColor: '#10171f', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <span style={{ fontSize: '200px', color: '#ffffff', fontWeight: 700, lineHeight: '1' }}>04</span>
                        </div>
                    </div>

                    {/* Card 5 - Finanças (number left) */}
                    <div style={{ width: isMobile ? '100%' : '966px', maxWidth: '100%', height: isMobile ? 'auto' : '194px', backgroundColor: '#ffffff', display: 'flex', flexDirection: isMobile ? 'column' : 'row', overflow: 'hidden' }}>
                        <div style={{ width: isMobile ? '100%' : '274px', height: '194px', backgroundColor: '#0011fd', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <span style={{ fontSize: '200px', color: '#ffffff', fontWeight: 700, lineHeight: '1' }}>05</span>
                        </div>
                        <div style={{ flex: 1, padding: isMobile ? '20px' : '0 50px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <h3 style={{ fontSize: isMobile ? '20px' : '30px', color: '#091747', letterSpacing: '-1.5px', fontWeight: 700, marginBottom: '10px' }}>GESTÃO E FINANÇAS</h3>
                            <p style={{ fontSize: isMobile ? '14px' : '22px', lineHeight: '1.2', color: '#091747', maxWidth: isMobile ? '100%' : '450px' }}>Aprenda a gerenciar um dos aspectos mais importantes do seu negócio e veja como multiplicar.</p>
                        </div>
                    </div>

                    {/* Card 6 - Soft Skills (number right) */}
                    <div style={{ width: isMobile ? '100%' : '966px', maxWidth: '100%', height: isMobile ? 'auto' : '194px', backgroundColor: '#ffffff', display: 'flex', flexDirection: isMobile ? 'column-reverse' : 'row', overflow: 'hidden' }}>
                        <div style={{ flex: 1, padding: isMobile ? '20px' : '0 50px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <h3 style={{ fontSize: isMobile ? '20px' : '30px', color: '#091747', letterSpacing: '-1.5px', fontWeight: 700, marginBottom: '10px' }}>SOFT SKILLS</h3>
                            <p style={{ fontSize: isMobile ? '14px' : '22px', lineHeight: '1.2', color: '#091747', maxWidth: isMobile ? '100%' : '591px' }}>Entenda como essas habilidades podem ser un grande aliado na busca pela ascensão no mercado.</p>
                        </div>
                        <div style={{ width: isMobile ? '100%' : '274px', height: '194px', backgroundColor: '#f83821', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <span style={{ fontSize: '200px', color: '#000000', fontWeight: 700, lineHeight: '1' }}>06</span>
                        </div>
                    </div>

                    {/* Card 7 - Liderança (number left) */}
                    <div style={{ width: isMobile ? '100%' : '966px', maxWidth: '100%', height: isMobile ? 'auto' : '194px', backgroundColor: '#ffffff', display: 'flex', flexDirection: isMobile ? 'column' : 'row', overflow: 'hidden' }}>
                        <div style={{ width: isMobile ? '100%' : '274px', height: '194px', backgroundColor: '#10171f', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <span style={{ fontSize: '200px', color: '#0011fd', fontWeight: 700, lineHeight: '1' }}>07</span>
                        </div>
                        <div style={{ flex: 1, padding: isMobile ? '20px' : '0 50px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <h3 style={{ fontSize: isMobile ? '20px' : '30px', color: '#091747', letterSpacing: '-1.5px', fontWeight: 700, marginBottom: '10px' }}>LIDERANÇA E COMPORTAMENTO</h3>
                            <p style={{ fontSize: isMobile ? '14px' : '22px', lineHeight: '1.2', color: '#091747', maxWidth: isMobile ? '100%' : '450px' }}>Saiba como conduzir uma equipe mantendo seu time engajado visando alta performance.</p>
                        </div>
                    </div>

                </div>
            </section>

            {/* Pricing Section - COMO FAZER PARTE */}
            <section style={{
                backgroundColor: '#D1D1D1',
                paddingTop: isMobile ? '40px' : '80px',
                paddingBottom: isMobile ? '60px' : '100px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: isMobile ? '40px 20px' : undefined
            }}>
                {/* Section Title */}
                <h2 style={{
                    fontSize: isMobile ? '36px' : '90px',
                    letterSpacing: isMobile ? '-1px' : '-2px',
                    color: '#000000',
                    marginBottom: isMobile ? '30px' : '50px',
                    fontWeight: 700,
                    textAlign: 'center'
                }}>
                    COMO FAZER PARTE
                </h2>

                {/* Pricing Card */}
                <div style={{
                    width: isMobile ? '100%' : '500px',
                    height: isMobile ? 'auto' : '950px',
                    backgroundColor: '#ffffff',
                    borderRadius: '30px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    overflow: 'visible',
                    paddingBottom: isMobile ? '40px' : 0
                }}>
                    {/* Top Group */}
                    <div style={{
                        width: '100%',
                        height: isMobile ? 'auto' : '298px',
                        paddingTop: isMobile ? '40px' : '80px',
                        paddingLeft: isMobile ? '20px' : '40px',
                        paddingRight: isMobile ? '20px' : '40px',
                        boxSizing: 'border-box',
                        backgroundColor: '#080808',
                        borderTopLeftRadius: '30px',
                        borderTopRightRadius: '30px',
                        paddingBottom: isMobile ? '60px' : 0
                    }}>
                        <h3 style={{
                            fontSize: isMobile ? '20px' : '30px',
                            fontWeight: 700,
                            lineHeight: '1.2',
                            color: '#ffffff',
                            textAlign: 'center'
                        }}>
                            COMECE A EMPREENDER E CRIE A VIDA QUE SEMPRE SONHOU
                        </h3>
                    </div>

                    {/* Savings Badge */}
                    <div style={{
                        width: isMobile ? '90%' : '400px',
                        height: isMobile ? '80px' : '115px',
                        backgroundColor: '#f83821',
                        borderBottomLeftRadius: '50px',
                        borderBottomRightRadius: '50px',
                        borderBottom: '10px solid #10171f',
                        marginTop: isMobile ? '-40px' : '-60px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 10
                    }}>
                        <span style={{ fontSize: isMobile ? '16px' : '30px', color: '#10171f', fontWeight: 400 }}>ECONOMIZE MAIS DE</span>
                        <span style={{ fontSize: isMobile ? '20px' : '35px', color: '#10171f', fontWeight: 700, textDecoration: 'line-through' }}>AKZ 1.000.000</span>
                    </div>

                    {/* Price Info */}
                    <p style={{ fontSize: isMobile ? '16px' : '30px', color: '#929191', marginTop: isMobile ? '20px' : '40px' }}>TUDO ISSO POR APENAS</p>
                    <p style={{ fontSize: isMobile ? '40px' : '70px', color: '#2E2E2E', fontWeight: 400, margin: '10px 0 0 0' }}>AKZ</p>
                    <p style={{ fontSize: isMobile ? '48px' : '80px', color: '#2E2E2E', fontWeight: 700, margin: '0 0 20px 0' }}>7.997/mês</p>
                    <p style={{ fontSize: isMobile ? '18px' : '25px', color: '#929191' }}>ou 95.000 a Vista</p>

                    {/* CTA Button with pulsating animation */}
                    <motion.button
                        style={{
                            width: isMobile ? '85%' : '320px',
                            height: isMobile ? '60px' : '80px',
                            backgroundColor: '#f83821',
                            borderRadius: '9999px',
                            border: 'none',
                            color: '#000000',
                            fontSize: isMobile ? '18px' : '22px',
                            fontWeight: 700,
                            cursor: 'pointer',
                            marginTop: '30px'
                        }}
                        animate={{
                            boxShadow: [
                                '0 0 0 0px rgba(248, 56, 33, 0.4)',
                                '0 0 0 15px rgba(248, 56, 33, 0.4)',
                                '0 0 0 0px rgba(248, 56, 33, 0.4)'
                            ]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: 'easeInOut'
                        }}
                    >
                        REGISTRAR AGORA
                    </motion.button>

                    {/* Payment Logos */}
                    <div style={{
                        display: 'flex',
                        gap: isMobile ? '10px' : '20px',
                        marginTop: '40px',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexWrap: 'wrap',
                        padding: isMobile ? '0 10px' : 0
                    }}>
                        <span style={{ fontSize: isMobile ? '10px' : '14px', color: '#666', fontWeight: 600 }}>MASTERCARD</span>
                        <span style={{ fontSize: isMobile ? '10px' : '14px', color: '#666', fontWeight: 600 }}>VISA</span>
                        <span style={{ fontSize: isMobile ? '10px' : '14px', color: '#666', fontWeight: 600 }}>MULTICAIXA</span>
                        <span style={{ fontSize: isMobile ? '10px' : '14px', color: '#666', fontWeight: 600 }}>PAYPAL</span>
                    </div>
                </div>
            </section>

            {/* Training Section */}
            <section style={{
                backgroundColor: '#ffffff',
                paddingTop: isMobile ? '60px' : '100px',
                paddingBottom: isMobile ? '60px' : '100px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: isMobile ? '40px 20px' : undefined
            }}>
                {/* Header Box */}
                <div style={{
                    maxWidth: '1468px',
                    width: '100%',
                    height: isMobile ? 'auto' : '472px',
                    borderRadius: '20px',
                    boxShadow: '0 0 20px 4px rgba(0, 0, 0, 0.15)',
                    paddingTop: '50px',
                    paddingLeft: isMobile ? '20px' : '80px',
                    paddingRight: isMobile ? '20px' : '80px',
                    paddingBottom: isMobile ? '180px' : '200px',
                    boxSizing: 'border-box',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    backgroundColor: '#ffffff'
                }}>
                    <p style={{
                        fontSize: isMobile ? '16px' : '21px',
                        color: '#000000',
                        marginBottom: isMobile ? '15px' : '30px'
                    }}>
                        PRONTO PARA COMEÇAR? VAMOS AO TRABALHO
                    </p>
                    <h2 style={{
                        fontSize: isMobile ? '26px' : '50px',
                        letterSpacing: isMobile ? '-1px' : '-5px',
                        lineHeight: '1.2',
                        color: '#000000',
                        marginBottom: isMobile ? '30px' : '50px',
                        fontWeight: 700
                    }}>
                        RECEBA TREINAMENTO<br />GRATUITO COM OS MELHORES
                    </h2>
                </div>

                {/* Trainer Cards */}
                <div style={{
                    maxWidth: '1070px',
                    width: '100%',
                    display: 'flex',
                    flexDirection: isMobile ? 'column' : 'row',
                    gap: isMobile ? '20px' : '10px',
                    marginTop: isMobile ? '-120px' : '-213px',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    {[
                        { image: 'IMG01.png', name: 'Marta Coelho', role: 'ceo e founder da', company: 'MALISKA' },
                        { image: 'IMG02.png', name: 'Mário Silva', role: 'founder e ceo da', company: 'BALLY' },
                        { image: 'IMG03.png', name: 'Carla de Jesus', role: 'founder da', company: 'KIRIUS' },
                        { image: 'IMG04.png', name: 'Business Hustle', role: 'ceo e founder da Atlas', company: 'do sul' }
                    ].map((trainer, idx) => (
                        <div
                            key={idx}
                            style={{
                                width: isMobile ? '100%' : '260px',
                                maxWidth: isMobile ? '320px' : '260px',
                                height: '473px',
                                borderRadius: '0',
                                overflow: 'hidden',
                                position: 'relative',
                                backgroundImage: `url(/media/${trainer.image})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                            }}
                        >
                            {/* Gradient Overlay */}
                            <div style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.2) 20%, rgba(0,0,0,0.8) 100%)',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'flex-end',
                                padding: '20px',
                                boxSizing: 'border-box',
                                alignItems: 'center',
                                textAlign: 'center'
                            }}>
                                <h4 style={{
                                    fontSize: '20px',
                                    color: '#ffffff',
                                    fontWeight: 700,
                                    marginBottom: '5px',
                                    textAlign: 'center'
                                }}>
                                    {trainer.name}
                                </h4>
                                <p style={{
                                    fontSize: '14px',
                                    color: '#cccccc',
                                    marginBottom: '15px',
                                    textAlign: 'center'
                                }}>
                                    {trainer.role}<br />{trainer.company}
                                </p>
                                <button style={{
                                    width: '100%',
                                    height: '45px',
                                    backgroundColor: '#f83821',
                                    borderRadius: '25px',
                                    border: 'none',
                                    color: '#ffffff',
                                    fontSize: '14px',
                                    fontWeight: 700,
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '8px'
                                }}>
                                    ASSISTIR AGORA <Play fill="white" color="white" size={14} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA Section - Dark */}
            <section style={{
                backgroundColor: '#161616',
                paddingTop: isMobile ? '80px' : '150px',
                paddingBottom: isMobile ? '60px' : '50px',
                height: isMobile ? 'auto' : '620px',
                marginTop: isMobile ? '0' : '-170px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start',
                boxSizing: 'border-box',
                paddingLeft: isMobile ? '20px' : 0,
                paddingRight: isMobile ? '20px' : 0
            }}>
                {/* Main Title */}
                <h2 style={{
                    width: isMobile ? '100%' : '946px',
                    fontSize: isMobile ? '28px' : '60px',
                    fontWeight: 700,
                    color: '#ffffff',
                    lineHeight: '1.2',
                    letterSpacing: isMobile ? '-1px' : '-5px',
                    marginBottom: isMobile ? '30px' : '50px',
                    textAlign: 'center'
                }}>
                    APROVEITE O TREINAMENTO GRATUITO ENQUANTO EXISTIR
                </h2>

                {/* Subtitle */}
                <p style={{
                    fontSize: isMobile ? '16px' : '25px',
                    fontWeight: 400,
                    letterSpacing: isMobile ? '0' : '-2.5px',
                    color: '#ffffff',
                    marginBottom: isMobile ? '30px' : '50px',
                    textAlign: 'center',
                    maxWidth: isMobile ? '100%' : 'none'
                }}>
                    ACIONÁVEL, TESTADO EM BATALHA ESTRUTURAS PARA CONSTRUÇÃO QUALQUER NEGÓCIO.
                </p>

                {/* CTA Button with pulsating animation */}
                <motion.button
                    style={{
                        width: isMobile ? '280px' : '450px',
                        height: isMobile ? '60px' : '102px',
                        backgroundColor: '#f83821',
                        borderRadius: '9999px',
                        border: 'none',
                        color: '#ffffff',
                        fontSize: isMobile ? '18px' : '25px',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        cursor: 'pointer',
                        marginBottom: isMobile ? '40px' : '50px'
                    }}
                    animate={{
                        boxShadow: [
                            '0 0 0 0px rgba(248, 56, 33, 0.3)',
                            '0 0 0 10px rgba(248, 56, 33, 0.3)',
                            '0 0 0 0px rgba(248, 56, 33, 0.3)'
                        ]
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut'
                    }}
                >
                    SABER MAIS
                </motion.button>
            </section>

            {/* Magazine Section */}
            <section style={{
                backgroundColor: '#000000',
                padding: isMobile ? '40px 20px' : '80px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                {/* Section Title */}
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

                {/* Magazine Carousel */}
                <div
                    style={{
                        position: 'relative',
                        width: '100%',
                        maxWidth: '1740px',
                        overflow: 'hidden'
                    }}
                    onMouseEnter={(e) => {
                        const arrows = e.currentTarget.querySelectorAll('.carousel-arrow');
                        arrows.forEach(arrow => (arrow as HTMLElement).style.opacity = '1');
                    }}
                    onMouseLeave={(e) => {
                        const arrows = e.currentTarget.querySelectorAll('.carousel-arrow');
                        arrows.forEach(arrow => (arrow as HTMLElement).style.opacity = '0');
                    }}
                >
                    {/* Left Arrow */}
                    {!isMobile && (
                        <div
                            className="carousel-arrow"
                            style={{
                                position: 'absolute',
                                left: '20px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                width: '50px',
                                height: '50px',
                                borderRadius: '50%',
                                backgroundColor: '#f83821',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                zIndex: 10,
                                opacity: 0,
                                transition: 'opacity 0.3s ease'
                            }}
                            onClick={() => {
                                const container = document.getElementById('magazine-scroll');
                                if (container) container.scrollBy({ left: -450, behavior: 'smooth' });
                            }}
                        >
                            <ChevronLeft color="white" size={30} />
                        </div>
                    )}

                    {/* Right Arrow */}
                    {!isMobile && (
                        <div
                            className="carousel-arrow"
                            style={{
                                position: 'absolute',
                                right: '20px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                width: '50px',
                                height: '50px',
                                borderRadius: '50%',
                                backgroundColor: '#f83821',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                zIndex: 10,
                                opacity: 0,
                                transition: 'opacity 0.3s ease'
                            }}
                            onClick={() => {
                                const container = document.getElementById('magazine-scroll');
                                if (container) container.scrollBy({ left: 450, behavior: 'smooth' });
                            }}
                        >
                            <ChevronRight color="white" size={30} />
                        </div>
                    )}

                    {/* Scrollable Container */}
                    <div
                        id="magazine-scroll"
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
                                {/* Magazine Cover */}
                                <div style={{
                                    width: isMobile ? '280px' : '430px',
                                    height: isMobile ? '386px' : '592px',
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
                                {/* Edition Text */}
                                <p style={{
                                    fontSize: '16px',
                                    color: '#888888',
                                    textAlign: 'center'
                                }}>
                                    {magazine.edition}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Magazine CTA Button */}
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
        </>
    );
};

export default Masterclasses;
