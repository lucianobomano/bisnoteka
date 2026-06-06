import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';


const MagazinePage: React.FC = () => {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = React.useState(1);
    const [isMobile, setIsMobile] = React.useState(false);
    const itemsPerPage = 16;

    React.useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const topics = [
        "Simon Sinek of The Optimism Company: Infinite Thinking",
        "How to Have Money Conversations With Strength and Confidence",
        "Abi Horton and Danny Cozzolino of Beaus+Babes: Growing Up to Give Back",
        "How to Support Your Team's Resilience During Times of Uncertainty",
        "Nikhil Arora and Alejandro Velez of Back to the Roots: A Gardening Company Rooted in Relationships",
        "4 Factors that Can Enhance Your Business's Reputation",
        "How to Delegate and Still Get Great Results"
    ];


    const [archiveIssues, setArchiveIssues] = React.useState<any[]>([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchMagazines = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/api/magazine`);
                if (res.ok) {
                    const data = await res.json();
                    if (Array.isArray(data)) {
                        const formatted = data.map((m: any, idx: number) => ({
                            id: m.id,
                            img: m.coverImage || `/media/MAG0${(idx % 6) + 1}.png`,
                            title: m.title,
                            description: m.description,
                            releaseDate: m.releaseDate,
                            topics: m.topics || [],
                            issueNumber: m.issueNumber || (data.length - idx)
                        }));
                        setArchiveIssues(formatted);
                    }
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchMagazines();
    }, []);

    const latestIssue = archiveIssues.length > 0 ? archiveIssues[0] : null;

    return (
        <div className="bg-[#f6f7f9] min-h-screen text-[#10171f] font-['Helvetica_Neue',Helvetica,Arial,sans-serif]">
            {/* Combined Hero and ÚLTIMA EDIÇÃO Info Section */}
            <section style={{ backgroundColor: '#D8D9D8', paddingTop: isMobile ? '80px' : '128px', paddingBottom: '0', overflow: 'hidden', position: 'relative' }}>
                <div className="container mx-auto px-4 mb-20">
                    <div className="flex justify-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex justify-center"
                        >
                            {loading ? (
                                <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 1.5 }} style={{ maxWidth: isMobile ? '300px' : '600px', height: isMobile ? '400px' : '700px', width: isMobile ? '300px' : '600px', backgroundColor: '#e2e8f0', borderRadius: '0' }} />
                            ) : (
                                <img
                                    src={latestIssue?.img || "https://4ca6b6e2b41c5e86394d7346d365d1c7.cdn.bubble.io/cdn-cgi/image/w=768,h=896,f=auto,dpr=1,fit=contain/f1679589218262x104448028251117760/Grupo%20de%20m%C3%A1scara%209.png"}
                                    alt={`faundr EDITION-${latestIssue?.issueNumber || '01'}`}
                                    onClick={() => latestIssue && window.open('/ler-revista/' + latestIssue.id, '_blank')}
                                    className="shadow-[20px_20px_60px_rgba(0,0,0,0.1)] object-contain cursor-pointer transition-transform hover:scale-105"
                                    style={{ maxWidth: isMobile ? '300px' : '600px', maxHeight: isMobile ? '400px' : '700px', width: '100%', height: 'auto', borderRadius: '0' }}
                                />
                            )}
                        </motion.div>
                    </div>
                </div>

                {/* White content group inside the grey hero section */}
                <div style={{
                    backgroundColor: '#ffffff',
                    maxWidth: '1200px',
                    margin: '0 auto',
                    padding: isMobile ? '40px 20px' : '0 150px',
                    width: '100%',
                    minHeight: isMobile ? 'auto' : '750px'
                }}>
                    <h2 style={{ fontSize: isMobile ? '16px' : '20px', fontWeight: 'bold', textTransform: 'uppercase', margin: 0, paddingTop: isMobile ? '0' : '70px' }}>ÚLTIMA EDIÇÃO</h2>
                    <div style={{ height: '5px', backgroundColor: '#f83821', width: '100%', marginTop: '8px', marginBottom: isMobile ? '30px' : '40px' }}></div>

                    <div className="flex flex-col md:flex-row justify-between w-full md:w-[796px] mx-auto items-start" style={{ gap: '40px', paddingBottom: '70px' }}>
                        {/* Left: Info */}
                        <div style={{ width: isMobile ? '100%' : '40%' }}>
                            {loading ? (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                    <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 1.5 }} style={{ width: '250px', height: '40px', backgroundColor: '#e2e8f0', borderRadius: '8px' }} />
                                    <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 1.5 }} style={{ width: '180px', height: '40px', backgroundColor: '#e2e8f0', borderRadius: '8px' }} />
                                </div>
                            ) : (
                                <p style={{
                                    fontSize: isMobile ? '32px' : '50px',
                                    fontWeight: 'normal',
                                    fontFamily: "'RocknRoll One', sans-serif",
                                    lineHeight: '1.4'
                                }}>
                                    {latestIssue ? `Edição ${latestIssue.issueNumber}` : 'Edição 1'}<br />
                                    {latestIssue ? new Date(latestIssue.releaseDate).toLocaleDateString('pt-PT', { month: 'long', year: 'numeric' }) : 'Março 2023'}
                                </p>
                            )}
                        </div>

                        {/* Right: Topics */}
                        <div className={`flex flex-col items-start flex-1 ${isMobile ? 'mt-8' : 'ml-12'}`}>
                            <h4 style={{ fontSize: isMobile ? '22px' : '30px', lineHeight: '1.4', marginBottom: '25px', fontWeight: '700' }}>
                                O que você vai encontrar nessa edição
                            </h4>
                            <div style={{ fontSize: isMobile ? '18px' : '22px', lineHeight: '1.5', color: '#10171f', fontWeight: '400', width: '100%' }}>
                                {loading ? (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', width: '100%' }}>
                                        {[1, 2, 3, 4, 5].map((_, i) => (
                                            <motion.div key={i} animate={{ opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 1.5 }} style={{ width: `${60 + Math.random() * 30}%`, height: '24px', backgroundColor: '#e2e8f0', borderRadius: '4px' }} />
                                        ))}
                                    </div>
                                ) : latestIssue && latestIssue.topics && latestIssue.topics.length > 0 ? latestIssue.topics.map((topic: string, i: number) => (
                                    <div key={i} className="mb-2">{topic}</div>
                                )) : topics.map((topic, i) => (
                                    <div key={i} className="mb-2">{topic}</div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing Section - Black with Column layout */}
            <section style={{
                backgroundColor: '#000000',
                minHeight: isMobile ? 'auto' : '920px',
                paddingTop: isMobile ? '80px' : '150px',
                paddingBottom: isMobile ? '60px' : '0',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start',
                gap: '20px',
                color: '#ffffff'
            }}>
                <h2 style={{
                    fontSize: isMobile ? '32px' : '50px',
                    fontFamily: "'RocknRoll One', sans-serif",
                    fontWeight: 'normal',
                    margin: 0,
                    textAlign: 'center'
                }}>
                    Preço da Revista
                </h2>
                <p style={{
                    fontSize: isMobile ? '16px' : '20px',
                    width: isMobile ? '100%' : '1000px',
                    padding: isMobile ? '0 20px' : '0',
                    lineHeight: '1.4',
                    fontWeight: '300',
                    marginBottom: '20px',
                    textAlign: 'center',
                    color: '#ffffff'
                }}>
                    A Faundr é a melhor ferramenta e recurso para jovens empreendedores. Oferecemos uma ampla seleção de pacotes de assinatura e cada pacote de assinatura vem com uma avaliação GRATUITA que pode ser cancelada a qualquer momento. Também oferecemos uma edição GRATUITA de cortesia para que você possa ter uma ideia do que somos. Se você não quiser se inscrever, tudo bem também! Você também pode comprar edições individualmente!
                </p>

                <div style={{
                    maxWidth: '1200px',
                    width: '100%',
                    display: 'flex',
                    flexDirection: isMobile ? 'column' : 'row',
                    marginTop: isMobile ? '40px' : 'auto',
                    gap: isMobile ? '40px' : '0'
                }}>
                    {/* Grupo 1 */}
                    <div style={{
                        height: isMobile ? 'auto' : '500px',
                        flex: 1,
                        borderRight: isMobile ? 'none' : '1px solid rgba(160, 160, 160, 0.5)',
                        borderBottom: isMobile ? '1px solid rgba(160, 160, 160, 0.3)' : 'none',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        padding: isMobile ? '0 20px 40px' : '0 20px'
                    }}>
                        <span style={{ fontSize: isMobile ? '18px' : '24px', color: '#D2D2D2', marginBottom: '10px' }}>Emissão única</span>
                        <span style={{ fontSize: isMobile ? '48px' : '60px', color: '#d2d2d2', fontWeight: 'bold' }}>2.499</span>
                        <span style={{ fontSize: '23px', color: '#d2d2d2' }}>AKZ</span>
                    </div>

                    {/* Grupo 2 */}
                    <div style={{
                        height: isMobile ? 'auto' : '500px',
                        flex: 1,
                        borderRight: isMobile ? 'none' : '1px solid rgba(160, 160, 160, 0.5)',
                        borderBottom: isMobile ? '1px solid rgba(160, 160, 160, 0.3)' : 'none',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        padding: isMobile ? '0 20px 40px' : '0 20px'
                    }}>
                        <span style={{ fontSize: isMobile ? '18px' : '24px', color: '#D2D2D2', marginBottom: '10px' }}>Assinatura mensal</span>
                        <span style={{ fontSize: isMobile ? '48px' : '60px', color: '#d2d2d2', fontWeight: 'bold' }}>599</span>
                        <span style={{ fontSize: '23px', color: '#d2d2d2' }}>AKZ</span>
                    </div>

                    {/* Grupo 3 */}
                    <div style={{
                        height: isMobile ? 'auto' : '500px',
                        flex: 1,
                        borderRight: isMobile ? 'none' : '1px solid rgba(160, 160, 160, 0.5)',
                        borderBottom: isMobile ? '1px solid rgba(160, 160, 160, 0.3)' : 'none',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        padding: isMobile ? '0 20px 40px' : '0 20px'
                    }}>
                        <span style={{ fontSize: isMobile ? '18px' : '24px', color: '#D2D2D2', marginBottom: '10px' }}>Assinatura anual</span>
                        <span style={{ fontSize: isMobile ? '48px' : '60px', color: '#f83821', fontWeight: 'bold' }}>11.499</span>
                        <span style={{ fontSize: '23px', color: '#d2d2d2' }}>AKZ</span>
                        <span style={{ fontSize: '23px', color: '#f83821', marginTop: '10px' }}>Mais popular</span>
                    </div>

                    {/* Grupo 4 */}
                    <div style={{
                        height: isMobile ? 'auto' : '500px',
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        padding: '0 20px'
                    }}>
                        <span style={{ fontSize: isMobile ? '18px' : '24px', color: '#D2D2D2', marginBottom: '10px', textAlign: 'center' }}>Pacote de edição anterior 24x</span>
                        <span style={{ fontSize: isMobile ? '48px' : '60px', color: '#d2d2d2', fontWeight: 'bold' }}>20.499</span>
                        <span style={{ fontSize: '23px', color: '#d2d2d2' }}>AKZ</span>
                    </div>
                </div>
            </section>

            {/* Archive Section - Refined with specific dimensions */}
            <section style={{ backgroundColor: '#ffffff', padding: isMobile ? '60px 0' : '100px 0' }}>
                <div style={{ width: '100%', maxWidth: '1780px', margin: '0 auto', padding: '0 20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                    <h2 style={{
                        fontSize: isMobile ? '32px' : '60px',
                        fontFamily: "'RocknRoll One', sans-serif",
                        fontWeight: 'normal',
                        textTransform: 'uppercase',
                        color: '#10171f',
                        textAlign: 'center',
                        marginBottom: isMobile ? '40px' : '60px'
                    }}>
                        Explore todas as edições
                    </h2>

                    {/* 4-column Repeater Grid - Forced 4 columns with specific dimensions, fluid on mobile */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: isMobile ? 'repeat(auto-fit, minmax(280px, 1fr))' : 'repeat(4, 360px)',
                        gap: '20px',
                        width: '100%',
                        maxWidth: '1780px',
                        justifyContent: isMobile ? 'stretch' : 'center'
                    }}>
                        {loading ? (
                            Array.from({ length: 4 }).map((_, idx) => (
                                <div key={`skel-${idx}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '40px' }}>
                                    <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 1.5 }} style={{ width: isMobile ? '100%' : '360px', aspectRatio: '360 / 525', backgroundColor: '#e2e8f0', borderRadius: '0', marginBottom: '20px' }} />
                                    <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 1.5 }} style={{ width: '80%', height: '24px', backgroundColor: '#e2e8f0', borderRadius: '4px', marginBottom: '12px' }} />
                                    <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 1.5 }} style={{ width: '60%', height: '16px', backgroundColor: '#e2e8f0', borderRadius: '4px' }} />
                                </div>
                            ))
                        ) : archiveIssues.length === 0 ? (
                            <div style={{ gridColumn: '1 / -1', padding: '60px', textAlign: 'center', fontSize: '20px', color: '#64748b' }}>
                                Ainda não há revistas publicadas.
                            </div>
                        ) : archiveIssues.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((issue, idx) => (
                                <div
                                    key={idx}
                                    onClick={() => window.open('/ler-revista/' + issue.id, '_blank')}
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        textAlign: 'center',
                                        cursor: 'pointer',
                                        marginBottom: '40px'
                                    }}
                                    className="group"
                                >
                                    {/* Magazine Cover - Fixed 360x525px on desktop, fluid on mobile */}
                                    <div style={{
                                        position: 'relative',
                                        width: isMobile ? '100%' : '360px',
                                        maxWidth: '360px',
                                        height: 'auto',
                                        aspectRatio: '360 / 525',
                                        marginBottom: '20px',
                                        overflow: 'hidden',
                                        backgroundColor: '#f8f9fa'
                                    }}>
                                        <img
                                            src={issue.img}
                                            alt={issue.title}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                                            className="group-hover:scale-105"
                                        />
                                        {/* Full Access Overlay */}
                                        <div style={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            width: '100%',
                                            height: '100%',
                                            backgroundColor: 'rgba(0,0,0,0.3)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            opacity: 0,
                                            transition: 'opacity 0.3s ease'
                                        }} className="group-hover:opacity-100">
                                            <span style={{
                                                color: '#ffffff',
                                                fontSize: '12px',
                                                fontWeight: 'bold',
                                                textTransform: 'uppercase',
                                                padding: '8px 16px',
                                                backgroundColor: 'rgba(255,255,255,0.2)',
                                                backdropFilter: 'blur(5px)',
                                                borderRadius: '8px',
                                                border: '1px solid rgba(255,255,255,0.3)'
                                            }}>
                                                Full Access
                                            </span>
                                        </div>
                                    </div>

                                    <h3 style={{ fontSize: '16px', fontWeight: 900, color: '#10171f', marginBottom: '8px', textTransform: 'uppercase' }}>
                                        {issue.title}
                                    </h3>
                                    <p style={{ fontSize: '13px', color: '#888', fontWeight: 'bold', marginBottom: '24px', lineHeight: '1.4' }}>
                                        {issue.description}
                                    </p>
                                </div>
                            )
                        )}
                    </div>

                    {/* Pagination - Matching Reference Image & Functional */}
                    {Math.max(1, Math.ceil(archiveIssues.length / itemsPerPage)) > 1 && (
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            marginTop: '60px',
                            marginBottom: '40px'
                        }}>
                            <div
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                style={{
                                    padding: '0 25px',
                                    height: '45px',
                                    backgroundColor: currentPage === 1 ? '#eee' : '#10171f',
                                    borderRadius: '6px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: currentPage === 1 ? '#aaa' : '#ffffff',
                                    fontSize: '18px',
                                    fontWeight: 'bold',
                                    cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                                    marginRight: '5px',
                                    transition: 'all 0.2s'
                                }}
                            >
                                « Prev
                            </div>

                            {Array.from({ length: Math.ceil(archiveIssues.length / itemsPerPage) }, (_, i) => i + 1).map((page) => (
                                <div
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    style={{
                                        width: '45px',
                                        height: '45px',
                                        border: currentPage === page ? '2px solid #f83821' : '1px solid #D2D2D2',
                                        borderRadius: '6px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: currentPage === page ? '#f83821' : '#D2D2D2',
                                        fontSize: '18px',
                                        fontWeight: 'bold',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s',
                                        backgroundColor: currentPage === page ? 'rgba(248, 56, 33, 0.05)' : 'transparent'
                                    }}
                                >
                                    {page}
                                </div>
                            ))}

                            <div
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(archiveIssues.length / itemsPerPage)))}
                                style={{
                                    padding: '0 25px',
                                    height: '45px',
                                    backgroundColor: currentPage === Math.ceil(archiveIssues.length / itemsPerPage) ? '#eee' : '#f83821',
                                    borderRadius: '6px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: currentPage === Math.ceil(archiveIssues.length / itemsPerPage) ? '#aaa' : '#ffffff',
                                    fontSize: '18px',
                                    fontWeight: 'bold',
                                    cursor: currentPage === Math.ceil(archiveIssues.length / itemsPerPage) ? 'not-allowed' : 'pointer',
                                    marginLeft: '5px',
                                    transition: 'all 0.2s'
                                }}
                            >
                                Next »
                            </div>
                        </div>
                    )}

                    {/* Printed Editions Section - "EDIÇÕES IMPRENSAS" */}
                    <div style={{ marginTop: isMobile ? '40px' : '80px', width: '100%', maxWidth: '1200px' }}>
                        <h2 style={{ fontSize: isMobile ? '24px' : '32px', fontWeight: 'bold', textTransform: 'uppercase', margin: 0 }}>EDIÇÕES IMPRENSAS</h2>
                        <div style={{ height: '5px', backgroundColor: '#f83821', width: '100%', marginTop: '10px', marginBottom: isMobile ? '30px' : '60px' }}></div>

                        <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? '40px' : '80px', alignItems: 'center' }}>
                            {/* Left: Magazine Cover */}
                            <div style={{
                                flexShrink: 0,
                                width: isMobile ? '100%' : '450px',
                                maxWidth: '450px',
                                height: isMobile ? 'auto' : '620px',
                                aspectRatio: isMobile ? '450 / 620' : 'none',
                                backgroundColor: '#f0f0f0',
                                overflow: 'hidden',
                                boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
                            }}>
                                <img
                                    src="/media/MAG04.png"
                                    alt="Revista Faundr Paulo Ngunza"
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            </div>

                            {/* Right: Content */}
                            <div style={{ flex: 1, textAlign: isMobile ? 'center' : 'left' }}>
                                <h3 style={{
                                    fontSize: isMobile ? '24px' : '32px',
                                    fontWeight: 'normal',
                                    marginBottom: '0',
                                    color: '#10171f',
                                    fontFamily: "'RocknRoll One', sans-serif",
                                    fontStyle: 'normal'
                                }}>Revista faundr</h3>
                                <h4 style={{
                                    fontSize: isMobile ? '50px' : '100px',
                                    fontWeight: 'normal',
                                    marginBottom: isMobile ? '20px' : '30px',
                                    color: '#10171f',
                                    lineHeight: '0.9',
                                    letterSpacing: '-2px',
                                    fontFamily: "'RocknRoll One', sans-serif"
                                }}>GRATUITA</h4>

                                <p style={{ fontSize: isMobile ? '18px' : '22px', color: '#555', lineHeight: '1.5', marginBottom: '20px', maxWidth: isMobile ? '100%' : '550px' }}>
                                    Obtenha nossa primeira edição especial física da Faundr Magazine, apresentando a Bisnoteka, que criamos especificamente para ajudá-lo a superar os problemas que todo empreendedor enfrenta ao expandir seus negócios.
                                </p>

                                <p style={{ fontSize: '14px', color: '#888', marginBottom: isMobile ? '30px' : '50px' }}>
                                    A revista é por nossa conta, é só pagar o frete e ela é sua!
                                </p>

                                <button style={{
                                    backgroundColor: '#0027ff',
                                    color: '#ffffff',
                                    padding: '18px 50px',
                                    borderRadius: '50px',
                                    fontSize: '18px',
                                    fontWeight: 'bold',
                                    textTransform: 'uppercase',
                                    border: 'none',
                                    cursor: 'pointer',
                                    transition: 'background-color 0.2s',
                                    boxShadow: '0 10px 20px rgba(0,39,255,0.2)'
                                }}
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#001fd1'}
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#0027ff'}
                                >
                                    SABER MAIS
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Faundr Forge Section */}
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

            {/* Free Training Section */}
            <section style={{
                backgroundColor: '#f83821',
                padding: isMobile ? '80px 20px' : '150px 60px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                gap: '20px'
            }}>
                <h2 style={{
                    fontSize: isMobile ? '36px' : '74px',
                    fontWeight: 'bold',
                    color: '#ffffff',
                    maxWidth: '1080px',
                    lineHeight: '1.1',
                    letterSpacing: '-1px',
                    margin: 0
                }}>
                    TREINAMENTO GRATUITO PARA FAUNDRS START
                </h2>
                <p style={{
                    fontSize: isMobile ? '18px' : '30px',
                    color: '#ffffff',
                    margin: 0,
                    fontWeight: 'normal'
                }}>
                    Estratégias acionáveis para iniciar e desenvolver qualquer negócio.
                </p>
                <button style={{
                    fontSize: isMobile ? '18px' : '23px',
                    backgroundColor: '#ffffff',
                    color: '#f83821',
                    width: isMobile ? '260px' : '300px',
                    height: isMobile ? '70px' : '80px',
                    borderRadius: '40px',
                    border: 'none',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    textTransform: 'uppercase',
                    marginTop: '20px',
                    transition: 'transform 0.2s'
                }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                    SABER MAIS
                </button>
            </section>
        </div>
    );
};

export default MagazinePage;
