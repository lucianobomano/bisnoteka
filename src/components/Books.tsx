import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, BookOpen, Star } from 'lucide-react';

interface BooksProps {
    onNavigate?: (page: 'home' | 'books') => void;
}

const Books: React.FC<BooksProps> = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [activeCategory, setActiveCategory] = useState('Todos');

    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    const categories = ['Todos', 'Físicos', 'Ebooks', 'Audiobooks', 'Liderança', 'Marketing', 'Finanças'];

    const [books, setBooks] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/api/products`);
                if (res.ok) {
                    const data = await res.json();
                    const formatted = data.map((b: any, idx: number) => ({
                        id: b.id,
                        title: b.title,
                        author: b.author || 'FAUNDR AUTHOR',
                        price: b.price.toString(),
                        oldPrice: (b.price * 1.5).toString(),
                        rating: 5,
                        type: b.format === 'PHYSICAL' ? 'Físico' : 'Ebook',
                        image: b.coverImage || `BOOK0${(idx % 4) + 1}.png`
                    }));
                    setBooks(formatted);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchBooks();
    }, []);

    return (
        <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', paddingTop: isMobile ? '30px' : '60px' }}>

            {/* Hero Section */}
            <section style={{ padding: isMobile ? '0 20px' : '0 80px', marginBottom: '60px' }}>
                <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{
                            fontSize: isMobile ? '36px' : '70px',
                            fontWeight: 900,
                            color: '#10171f',
                            lineHeight: 1,
                            letterSpacing: '-3px',
                            textTransform: 'uppercase',
                            marginBottom: '20px'
                        }}
                    >
                        BIBLIOTECA <span style={{ color: '#f83821' }}>FAUNDR</span>
                    </motion.h1>
                    <p style={{ fontSize: isMobile ? '16px' : '22px', color: '#666', maxWidth: '800px', lineHeight: 1.4 }}>
                        Acesso exclusivo às ferramentas e conhecimentos que moldaram os maiores impérios de África.
                        Do físico ao digital, o conhecimento não tem barreiras.
                    </p>
                </div>
            </section>

            {/* Categories & Filter */}
            <section style={{ padding: isMobile ? '0 20px' : '0 80px', marginBottom: '40px', overflowX: 'auto', whiteSpace: 'nowrap' }} className="no-scrollbar">
                <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', gap: '15px' }}>
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
                                transition: 'all 0.3s ease'
                            }}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </section>

            {/* Books Grid */}
            <section style={{ padding: isMobile ? '0 20px' : '0 80px', paddingBottom: '100px' }}>
                <div style={{
                    maxWidth: '1400px',
                    margin: '0 auto',
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(300px, 1fr))',
                    gap: isMobile ? '30px' : '50px'
                }}>
                    {books.map((book, idx) => (
                        <motion.div
                            key={book.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.1 }}
                            style={{
                                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                                backdropFilter: 'blur(10px)',
                                WebkitBackdropFilter: 'blur(10px)',
                                borderRadius: '24px',
                                padding: '24px',
                                display: 'flex',
                                flexDirection: 'column',
                                position: 'relative',
                                overflow: 'hidden',
                                border: '1px solid rgba(255, 255, 255, 0.3)',
                                boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
                            }}
                        >
                            {/* Type Badge */}
                            <div style={{
                                position: 'absolute',
                                top: '20px',
                                right: '20px',
                                backgroundColor: book.type === 'Físico' ? '#10171f' : book.type === 'Ebook' ? '#0011fd' : '#f83821',
                                color: '#fff',
                                padding: '5px 12px',
                                borderRadius: '9999px',
                                fontSize: '10px',
                                fontWeight: 800,
                                textTransform: 'uppercase',
                                zIndex: 2
                            }}>
                                {book.type}
                            </div>

                            {/* Book Cover Placeholder */}
                            <div style={{
                                width: '100%',
                                aspectRatio: '3/4',
                                backgroundColor: '#ddd',
                                borderRadius: '12px',
                                marginBottom: '20px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                overflow: 'hidden',
                                boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                            }}>
                                <div style={{ textAlign: 'center', padding: '20px' }}>
                                    <BookOpen size={60} color="#999" strokeWidth={1} />
                                    <p style={{ marginTop: '10px', color: '#999', fontSize: '12px', fontWeight: 600 }}>CAPA DO LIVRO</p>
                                </div>
                            </div>

                            {/* Info */}
                            <h3 style={{ fontSize: '22px', fontWeight: 900, color: '#10171f', marginBottom: '5px', textTransform: 'uppercase', lineHeight: 1.1 }}>
                                {book.title}
                            </h3>
                            <p style={{ fontSize: '16px', color: '#666', marginBottom: '15px' }}>{book.author}</p>

                            {/* Rating */}
                            <div style={{ display: 'flex', gap: '2px', marginBottom: '20px' }}>
                                {[1, 2, 3, 4, 5].map((s) => (
                                    <Star key={s} size={14} fill={s <= Math.floor(book.rating) ? "#f83821" : "none"} color="#f83821" />
                                ))}
                                <span style={{ fontSize: '12px', fontWeight: 700, marginLeft: '5px', color: '#10171f' }}>{book.rating}</span>
                            </div>

                            {/* Price & Action */}
                            <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                                <div>
                                    {book.oldPrice && (
                                        <p style={{ fontSize: '14px', color: '#999', textDecoration: 'line-through', marginBottom: '2px' }}>AKZ {book.oldPrice}</p>
                                    )}
                                    <p style={{ fontSize: '24px', fontWeight: 900, color: '#10171f' }}>AKZ {book.price}</p>
                                </div>
                                <button style={{
                                    width: '50px',
                                    height: '50px',
                                    borderRadius: '50%',
                                    backgroundColor: '#10171f',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#fff',
                                    border: 'none',
                                    cursor: 'pointer'
                                }}>
                                    <ShoppingCart size={20} />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Newsletter / CTA */}
            <section style={{ backgroundColor: '#10171f', padding: isMobile ? '60px 20px' : '100px 80px', textAlign: 'center' }}>
                <h2 style={{ fontSize: isMobile ? '30px' : '50px', color: '#fff', fontWeight: 900, textTransform: 'uppercase', marginBottom: '30px', letterSpacing: '-2px' }}>
                    QUER MAIS CONHECIMENTO? <br /> <span style={{ color: '#f83821' }}>ASSINE A NOSSA NEWSLETTER</span>
                </h2>
                <div style={{
                    maxWidth: '600px',
                    margin: '0 auto',
                    display: 'flex',
                    flexDirection: isMobile ? 'column' : 'row',
                    gap: '15px'
                }}>
                    <input
                        type="email"
                        placeholder="SEU MELHOR E-MAIL"
                        style={{
                            flex: 1,
                            height: '60px',
                            borderRadius: '9999px',
                            border: 'none',
                            padding: '0 30px',
                            fontSize: '16px',
                            fontWeight: 600
                        }}
                    />
                    <button style={{
                        height: '60px',
                        padding: '0 40px',
                        borderRadius: '9999px',
                        backgroundColor: '#f83821',
                        color: '#fff',
                        fontWeight: 900,
                        border: 'none',
                        textTransform: 'uppercase'
                    }}>
                        INSCREVER
                    </button>
                </div>
            </section>

            <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
        </div>
    );
};

export default Books;
