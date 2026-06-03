import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ShoppingBag, Star, Search, ShoppingCart,
    Tag, Zap, ShieldCheck, Package, ArrowRight,
    Headphones
} from 'lucide-react';

interface Product {
    id: number;
    title: string;
    category: string;
    price: string;
    oldPrice?: string;
    img: string;
    rating: number;
    description: string;
    accent: string;
    stock: number;
}

const ShopPage: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isMobile, setIsMobile] = useState(false);
    const [activeCategory, setActiveCategory] = useState('Todos');

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 1024);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const categories = ['Todos', 'T-Shirts', 'Kits', 'Recursos', 'Ferramentas'];

    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`\${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/api/products`);
                if (response.ok) {
                    const data = await response.json();
                    const formattedProducts = data.map((p: any) => ({
                        id: p.id,
                        title: p.title,
                        category: p.category,
                        price: `${p.price} AKZ`,
                        oldPrice: p.oldPrice ? `${p.oldPrice} AKZ` : undefined,
                        img: p.coverImage || "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800",
                        rating: 5.0,
                        description: p.description,
                        accent: "#0011fd",
                        stock: 100
                    }));
                    setProducts(formattedProducts);
                }
            } catch (error) {
                console.error("Failed to fetch products:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const filteredProducts = products.filter(p => {
        const matchesCategory = activeCategory === 'Todos' || p.category === activeCategory;
        const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div style={{ backgroundColor: '#10171f', minHeight: '100vh', color: '#fff', fontFamily: 'Inter, sans-serif' }}>

            {/* Ambient Background Elements */}
            <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
                <div style={{ position: 'absolute', top: '-15%', right: '-15%', width: '60vw', height: '60vw', backgroundColor: '#0011fd', opacity: 0.12, filter: 'blur(180px)', borderRadius: '50%' }}></div>
                <div style={{ position: 'absolute', bottom: '-15%', left: '-15%', width: '50vw', height: '50vw', backgroundColor: '#f83821', opacity: 0.1, filter: 'blur(180px)', borderRadius: '50%' }}></div>
            </div>

            {/* Hero Section */}
            <section style={{
                padding: isMobile ? '140px 20px 80px' : '200px 60px 120px',
                textAlign: 'center',
                position: 'relative',
                zIndex: 1
            }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', backgroundColor: 'rgba(255,255,255,0.05)', padding: '10px 24px', borderRadius: '99px', marginBottom: '35px', border: '1px solid rgba(255,255,255,0.1)' }}>
                            <Tag size={14} color="#f83821" />
                            <span style={{ fontSize: '11px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '2.5px' }}>Equipamento Original</span>
                        </div>
                        <h1 style={{
                            fontSize: isMobile ? '56px' : '110px',
                            fontWeight: 900,
                            letterSpacing: '-5px',
                            lineHeight: 0.82,
                            marginBottom: '40px',
                            textTransform: 'uppercase'
                        }}>
                            <span style={{ color: '#0011fd' }}>LOJA</span> <br /> MODO FUNDADOR
                        </h1>
                        <p style={{ color: '#888', fontSize: isMobile ? '18px' : '24px', maxWidth: '800px', margin: '0 auto 60px', lineHeight: 1.5, fontWeight: 500 }}>
                            Ativos e ferramentas projetadas para quem não aceita o status quo. <br /> Hardware mental e vestuário táctico para a nova elite.
                        </p>

                        <div style={{ display: 'flex', justifyContent: 'center', gap: '25px', flexWrap: 'wrap' }}>
                            <button style={{ padding: '22px 50px', backgroundColor: '#f83821', color: '#fff', borderRadius: '99px', border: 'none', fontSize: '15px', fontWeight: 900, textTransform: 'uppercase', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '14px', boxShadow: '0 25px 50px rgba(248, 56, 33, 0.4)', transition: 'transform 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                                Ver Roadmap Comercial <ArrowRight size={20} />
                            </button>
                            <button style={{ padding: '22px 50px', backgroundColor: 'rgba(255,255,255,0.05)', color: '#fff', borderRadius: '99px', border: '1px solid rgba(255,255,255,0.1)', fontSize: '15px', fontWeight: 900, textTransform: 'uppercase', cursor: 'pointer', backdropFilter: 'blur(10px)' }}>
                                Catálogo PDF
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Navigation Bar */}
            <div style={{ width: '100%', height: '1px', backgroundColor: 'rgba(255,255,255,0.05)', zIndex: 40 }}></div>

            <section style={{ height: '130px', backgroundColor: 'rgba(16, 23, 31, 1)', zIndex: 39, borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center' }}>
                <div style={{ maxWidth: '1440px', width: '100%', margin: '0 auto', padding: '0 20px', display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', alignItems: isMobile ? 'stretch' : 'center', gap: '30px' }}>

                    {/* Category Tabs */}
                    <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', scrollbarWidth: 'none' }}>
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                style={{
                                    padding: '12px 28px',
                                    backgroundColor: activeCategory === cat ? '#0011fd' : 'rgba(255,255,255,0.03)',
                                    border: '1px solid rgba(255,255,255,0.05)',
                                    borderRadius: '99px',
                                    color: activeCategory === cat ? '#fff' : '#777',
                                    fontSize: '12px',
                                    fontWeight: 800,
                                    textTransform: 'uppercase',
                                    letterSpacing: '1px',
                                    cursor: 'pointer',
                                    whiteSpace: 'nowrap',
                                    transition: 'all 0.3s'
                                }}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    <div style={{ position: 'relative', width: isMobile ? '100%' : '400px' }}>
                        <Search size={20} color="#555" style={{ position: 'absolute', left: '24px', top: '50%', transform: 'translateY(-50%)' }} />
                        <input
                            type="text"
                            placeholder="RECURSOS, KITS OU ROUPA..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '18px 24px 18px 60px',
                                borderRadius: '99px',
                                backgroundColor: 'rgba(255,255,255,0.03)',
                                border: '1px solid rgba(255,255,255,0.05)',
                                color: '#fff',
                                fontSize: '14px',
                                fontWeight: 700,
                                outline: 'none',
                                textTransform: 'uppercase',
                                letterSpacing: '1px'
                            }}
                        />
                    </div>
                </div>
            </section>

            {/* Product Display Matrix */}
            <main style={{ padding: '100px 0', position: 'relative', zIndex: 1 }}>
                <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 20px' }}>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)',
                        gap: '30px'
                    }}>
                        <AnimatePresence mode='popLayout'>
                            {filteredProducts.map((product, idx) => (
                                <motion.div
                                    key={product.id}
                                    layout
                                    initial={{ opacity: 0, y: 40 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.5, delay: idx * 0.08 }}
                                    style={{
                                        backgroundColor: '#1a222c',
                                        borderRadius: '40px',
                                        overflow: 'hidden',
                                        border: '1px solid rgba(255,255,255,0.05)',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        height: '620px',
                                        transition: 'all 0.4s ease',
                                        cursor: 'pointer'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.borderColor = '#0011fd';
                                        e.currentTarget.style.transform = 'translateY(-10px)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
                                        e.currentTarget.style.transform = 'translateY(0)';
                                    }}
                                >
                                    {/* Visual Container */}
                                    <div style={{ position: 'relative', height: '360px', width: '100%', overflow: 'hidden' }}>
                                        <img
                                            src={product.img}
                                            alt={product.title}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 1.2s ease' }}
                                            className="product-image"
                                        />
                                        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #1a222c 0%, transparent 60%)' }}></div>

                                        {/* Badges */}
                                        <div style={{ position: 'absolute', top: '25px', left: '25px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                            <div style={{ backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(12px)', color: '#fff', padding: '6px 14px', borderRadius: '99px', fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px', border: '1px solid rgba(255,255,255,0.1)' }}>
                                                {product.category}
                                            </div>
                                            {product.oldPrice && (
                                                <div style={{ backgroundColor: '#f83821', color: '#fff', padding: '6px 14px', borderRadius: '99px', fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px', alignSelf: 'flex-start' }}>
                                                    Oferta Limitada
                                                </div>
                                            )}
                                        </div>

                                        {/* Action Circle */}
                                        <button style={{
                                            position: 'absolute',
                                            right: '25px',
                                            bottom: '25px',
                                            width: '60px',
                                            height: '60px',
                                            borderRadius: '50%',
                                            backgroundColor: '#0011fd',
                                            border: 'none',
                                            color: '#fff',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            cursor: 'pointer',
                                            boxShadow: '0 20px 40px rgba(0, 17, 253, 0.4)',
                                            zIndex: 2,
                                            transition: 'all 0.3s'
                                        }}>
                                            <ShoppingCart size={24} />
                                        </button>
                                    </div>

                                    {/* Content Area */}
                                    <div style={{ padding: '35px 30px 40px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '15px' }}>
                                            <div style={{ display: 'flex' }}>
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} size={12} fill={i < Math.floor(product.rating) ? "#f83821" : "transparent"} color={i < Math.floor(product.rating) ? "#f83821" : "#555"} />
                                                ))}
                                            </div>
                                            <span style={{ fontSize: '12px', color: '#555', fontWeight: 800 }}>{product.rating} / 5.0</span>
                                        </div>

                                        <h3 style={{ fontSize: '30px', fontWeight: 900, textTransform: 'uppercase', lineHeight: 1.05, marginBottom: '20px', color: '#fff', letterSpacing: '-1px' }}>{product.title}</h3>
                                        <p style={{ fontSize: '15px', color: '#888', lineHeight: 1.6, marginBottom: '35px', minHeight: '4.8em' }}>{product.description}</p>

                                        <div style={{ paddingTop: '30px', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                                            <div>
                                                <p style={{ fontSize: '11px', color: '#555', fontWeight: 800, textTransform: 'uppercase', marginBottom: '5px', letterSpacing: '1px' }}>Preço de Ativo</p>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                                    <span style={{ fontSize: '28px', fontWeight: 900, color: '#fff' }}>{product.price}</span>
                                                    {product.oldPrice && <span style={{ fontSize: '16px', color: '#444', textDecoration: 'line-through', fontWeight: 700 }}>{product.oldPrice}</span>}
                                                </div>
                                            </div>
                                            <div style={{ textAlign: 'right' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: product.stock < 10 ? '#f83821' : '#00ff88', fontSize: '10px', fontWeight: 900, textTransform: 'uppercase' }}>
                                                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'currentColor' }}></div>
                                                    {product.stock} un. restantes
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {filteredProducts.length === 0 && (
                        <div style={{ textAlign: 'center', padding: '150px 0' }}>
                            <ShoppingBag size={80} color="#1a222c" style={{ marginBottom: '30px' }} />
                            <h3 style={{ fontSize: '32px', fontWeight: 900, textTransform: 'uppercase', marginBottom: '15px' }}>Vazio no Inventário</h3>
                            <p style={{ color: '#555', fontSize: '18px' }}>Não encontramos ativos correspondentes à sua busca táctica.</p>
                            <button onClick={() => { setSearchQuery(''); setActiveCategory('Todos') }} style={{ marginTop: '40px', padding: '15px 40px', backgroundColor: 'transparent', color: '#fff', border: '1px solid #333', borderRadius: '99px', fontWeight: 900, textTransform: 'uppercase', cursor: 'pointer' }}>
                                Resetar Filtros
                            </button>
                        </div>
                    )}
                </div>
            </main>

            {/* Industrial Features Section */}
            <section style={{ padding: '120px 0', borderTop: '1px solid rgba(255,255,255,0.05)', backgroundColor: 'rgba(255,255,255,0.01)', position: 'relative' }}>
                <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 60px' }}>
                    <div style={{ gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)', display: 'grid', gap: '40px' }}>
                        {[
                            { icon: Zap, title: "Entrega Digital", desc: "Acesso imediato a todos os ativos digitais no momento do checkout." },
                            { icon: Package, title: "Logística Táctica", desc: "Hardware e vestuário entregue com protocolo de segurança em 48h." },
                            { icon: ShieldCheck, title: "Qualidade Auditada", desc: "Cada item passa por um rigoroso controlo de excelência fundador." },
                            { icon: Headphones, title: "Suporte Direto", desc: "Suporte humano especializado para implementação de ferramentas." }
                        ].map((item, i) => (
                            <div key={i} style={{ padding: '40px', backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: '32px', border: '1px solid rgba(255,255,255,0.03)' }}>
                                <div style={{ width: '50px', height: '50px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '25px', color: '#f83821' }}>
                                    <item.icon size={24} />
                                </div>
                                <h4 style={{ fontSize: '16px', fontWeight: 900, textTransform: 'uppercase', marginBottom: '15px', letterSpacing: '1px' }}>{item.title}</h4>
                                <p style={{ fontSize: '14px', color: '#666', lineHeight: 1.6 }}>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Premium CTA / Newsletter */}
            <section style={{ padding: '150px 20px', backgroundColor: '#0011fd', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url("https://www.transparenttextures.com/patterns/carbon-fibre.png")', opacity: 0.1, pointerEvents: 'none' }}></div>
                <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
                    <h2 style={{ fontSize: isMobile ? '40px' : '80px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-3.5px', lineHeight: 0.9, marginBottom: '30px' }}>
                        FAÇA PARTE DO <br /> SUPPLY CHAIN ELITE
                    </h2>
                    <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '20px', maxWidth: '650px', margin: '0 auto 60px', fontWeight: 600 }}>
                        Receba acessos antecipados, drops exclusivos de vestuário e novas ferramentas antes do mercado saturar.
                    </p>
                    <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '15px', justifyContent: 'center' }}>
                        <input
                            type="email"
                            placeholder="Teu e-mail operacional"
                            style={{ padding: '24px 35px', borderRadius: '99px', border: 'none', backgroundColor: 'rgba(255,255,255,0.15)', color: '#fff', outline: 'none', width: isMobile ? '100%' : '450px', fontWeight: 600, fontSize: '16px', backdropFilter: 'blur(10px)' }}
                        />
                        <button style={{ padding: '24px 50px', backgroundColor: '#fff', color: '#0011fd', borderRadius: '99px', border: 'none', fontWeight: 900, textTransform: 'uppercase', cursor: 'pointer', fontSize: '15px', letterSpacing: '1px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>Aderir à Lista</button>
                    </div>
                </div>
            </section>

            <style>{`
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .product-image:hover {
                    transform: scale(1.1);
                }
            `}</style>
        </div>
    );
};

export default ShopPage;
