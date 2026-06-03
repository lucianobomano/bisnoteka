import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    return (
        <section
            className="relative flex flex-col items-center justify-start bg-white overflow-hidden"
            style={{ minHeight: isMobile ? 'auto' : '100vh', paddingTop: isMobile ? '40px' : '60px', paddingBottom: isMobile ? '40px' : 0 }}
        >
            {/* Background Gradient Soft Glows */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#0011fd]/10 rounded-full blur-[120px]"></div>
            </div>

            <div className="w-full relative z-10 flex flex-col items-center" style={{ padding: isMobile ? '0 20px' : 0 }}>

                {/* Headline Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="m-0 p-0"
                >
                    <span
                        className="font-bold text-[#10171f] text-center block m-0 p-0"
                        style={{ fontSize: isMobile ? '18px' : '30px', lineHeight: '1.2' }}
                    >
                        OFERTA DE LANÇAMENTO
                    </span>
                </motion.div>

                {/* Main Title */}
                <motion.h1
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="font-black text-[#10171f] uppercase m-0 p-0 max-w-none"
                    style={{
                        fontSize: isMobile ? '36px' : '90px',
                        letterSpacing: isMobile ? '-2px' : '-7.5px',
                        textAlign: 'center',
                        lineHeight: '0.9',
                        marginTop: '0px',
                        marginBottom: '0px'
                    }}
                >
                    TUDO QUE VOCÊ <br /> PRECISA NUM SÓ LUGAR.
                </motion.h1>

                {/* Main Visual Image Composition */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative m-0 p-0 overflow-hidden flex items-center justify-center"
                    style={{
                        width: isMobile ? '100%' : '1084px',
                        maxWidth: '100%',
                        height: isMobile ? 'auto' : '607px',
                        marginTop: '0px',
                        marginBottom: '0px'
                    }}
                >
                    <img
                        src="/media/HERO IMG.png"
                        alt="Bisnoteka Content"
                        className="w-full h-full object-contain m-0 p-0"
                    />
                </motion.div>

                {/* Mentalidade Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center m-0 p-0"
                    style={{ marginTop: '0px', width: '100%' }}
                >
                    <div
                        style={{
                            width: isMobile ? '100%' : '706px',
                            maxWidth: '100%',
                            height: isMobile ? 'auto' : '180px',
                            border: '1px solid #232323',
                            marginTop: '0px',
                            padding: isMobile ? '30px 20px' : '0 80px'
                        }}
                        className="flex items-center justify-center text-center relative m-0"
                    >
                        <h2
                            className="font-bold text-[#10171f] uppercase m-0"
                            style={{
                                fontSize: isMobile ? '22px' : '40px',
                                letterSpacing: isMobile ? '-1px' : '-2px',
                                textAlign: 'center',
                                lineHeight: '1.1'
                            }}
                        >
                            ADQUIRA A MENTALIDADE <br /> CORRECTA PARA <span style={{ color: '#F8341F' }}>EMPREENDER</span>
                        </h2>
                    </div>

                    {/* Pulsing Button Wrap */}
                    <div className="relative" style={{ marginTop: isMobile ? '-30px' : '-41px' }}>
                        {/* Ripple Effect */}
                        {[1, 2, 3].map((i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0.5, scale: 1 }}
                                animate={{ opacity: 0, scale: 1.5 }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    delay: i * 0.6,
                                    ease: "easeOut"
                                }}
                                className="absolute inset-0 bg-[#f8341f] rounded-full"
                            />
                        ))}

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            style={{
                                width: isMobile ? '280px' : '370px',
                                height: isMobile ? '60px' : '82px',
                                backgroundColor: '#f8341f',
                                fontSize: isMobile ? '18px' : '25px',
                                borderRadius: '9999px',
                                marginBottom: isMobile ? '0' : '50px'
                            }}
                            className="text-white font-black shadow-2xl relative z-10 transition-transform tracking-wider uppercase m-0"
                        >
                            COMEÇAR AGORA
                        </motion.button>
                    </div>
                </motion.div>

            </div>
        </section>
    );
};

export default Hero;
