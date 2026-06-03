import React, { useState, useEffect } from 'react';
import { FaFacebookF, FaInstagram, FaXTwitter, FaPinterestP, FaLinkedinIn, FaYoutube } from 'react-icons/fa6';

const Footer: React.FC = () => {
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
        <footer style={{ backgroundColor: '#f5f5f5', paddingTop: isMobile ? '40px' : '60px', paddingBottom: '40px' }}>
            {/* Logo */}
            <div style={{ textAlign: 'center', marginBottom: isMobile ? '30px' : '50px' }}>
                <h1 style={{
                    fontSize: isMobile ? '28px' : '40px',
                    fontWeight: 700,
                    color: '#f83821',
                    fontStyle: 'italic',
                    letterSpacing: '-1px'
                }}>
                    BISNOTEKA
                </h1>
            </div>

            {/* Links Grid */}
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)',
                gap: isMobile ? '30px' : '40px',
                padding: isMobile ? '0 20px' : '0 40px',
                marginBottom: isMobile ? '40px' : '60px'
            }}>
                {/* Column 1 - Quem somos */}
                <div style={{ textAlign: isMobile ? 'center' : 'left' }}>
                    <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#000', marginBottom: '20px' }}>Quem somos</h4>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                        {['Sobre Nós', 'Nossa Missão', 'Nossa Visão', 'Nossos Valores', 'Carreira', 'Histórias de sucesso'].map((item, idx) => (
                            <li key={idx} style={{ marginBottom: '10px' }}>
                                <a href="#" style={{
                                    color: '#373737',
                                    textDecoration: 'none',
                                    fontSize: '14px'
                                }}>{item}</a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Column 2 - Educação */}
                <div style={{ textAlign: isMobile ? 'center' : 'left' }}>
                    <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#000', marginBottom: '20px' }}>Educação</h4>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                        {[
                            'Cursos', 'Faundr xperience', 'Faundr forge', 'Biz Xperience equipa',
                            'Revista', 'Livros', 'Audiolivros', 'Podcast', 'Entrevistas',
                            'Workshop', 'Palestras', 'Motivação', 'Meditação', 'Coaching', 'Recursos'
                        ].map((item, idx) => (
                            <li key={idx} style={{ marginBottom: '10px' }}>
                                <a href="#" style={{
                                    color: '#373737',
                                    textDecoration: 'none',
                                    fontSize: '14px'
                                }}>{item}</a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Column 3 - Suporte */}
                <div style={{ textAlign: isMobile ? 'center' : 'left' }}>
                    <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#000', marginBottom: '20px' }}>Suporte</h4>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                        {[
                            'Contacte-nos', 'Facebook oficial', 'Grupo', 'FAQ',
                            'Obter recursos', 'Tornar-se um instrutor', 'Tornar-se afiliado',
                            'Política editorial', 'suporte@bisnoteka.com'
                        ].map((item, idx) => (
                            <li key={idx} style={{ marginBottom: '10px' }}>
                                <a href="#" style={{
                                    color: '#373737',
                                    textDecoration: 'none',
                                    fontSize: '14px'
                                }}>{item}</a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Column 4 - JUNTE-SE A NOSSA COMUNIDADE */}
                <div style={{ textAlign: isMobile ? 'center' : 'left' }}>
                    <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#000', marginBottom: '20px' }}>JUNTE-SE A NOSSA COMUNIDADE</h4>
                    <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.5', marginBottom: '30px' }}>
                        Junte-se a mais de <strong>200.000</strong> empreendedores em todo o mundo para aprender os insights e dicas mais recentes de que você precisa para construir um negócio revolucionário.
                    </p>
                    <button style={{
                        backgroundColor: '#f83821',
                        color: '#ffffff',
                        border: 'none',
                        padding: '15px 30px',
                        borderRadius: '25px',
                        fontSize: '14px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        width: isMobile ? '100%' : 'auto'
                    }}>
                        Subscrever Agora
                    </button>
                </div>
            </div>

            {/* Social Icons */}
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: isMobile ? '20px' : '30px',
                marginBottom: '40px',
                flexWrap: 'wrap'
            }}>
                <a href="#" style={{ color: '#000' }}><FaFacebookF size={isMobile ? 30 : 40} /></a>
                <a href="#" style={{ color: '#000' }}><FaInstagram size={isMobile ? 30 : 40} /></a>
                <a href="#" style={{ color: '#000' }}><FaXTwitter size={isMobile ? 30 : 40} /></a>
                <a href="#" style={{ color: '#000' }}><FaPinterestP size={isMobile ? 30 : 40} /></a>
                <a href="#" style={{ color: '#000' }}><FaLinkedinIn size={isMobile ? 30 : 40} /></a>
                <a href="#" style={{ color: '#000' }}><FaYoutube size={isMobile ? 30 : 40} /></a>
            </div>

            {/* Copyright */}
            <div style={{ textAlign: 'center', borderTop: '1px solid #ddd', paddingTop: '30px', padding: isMobile ? '30px 20px 0' : '30px 0 0' }}>
                <p style={{ fontSize: isMobile ? '12px' : '14px', color: '#666', marginBottom: '5px' }}>
                    © {new Date().getFullYear()} - <strong>Bisnoteka</strong>, Todos os direitos reservados
                </p>
                <p style={{ fontSize: isMobile ? '10px' : '12px', color: '#999' }}>
                    NIF: XXXXXX-XXX
                </p>
            </div>
        </footer>
    );
};

export default Footer;
