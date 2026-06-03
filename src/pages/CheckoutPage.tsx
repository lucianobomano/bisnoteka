import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShieldCheck, ArrowLeft, Lock } from 'lucide-react';
import { courses } from '../data/coursesData';

const CheckoutPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const course = courses.find((c) => c.id === Number(id)) || courses[0];
    
    const [isProcessing, setIsProcessing] = useState(false);
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);
        // Simulate API call
        setTimeout(() => {
            navigate('/membros');
        }, 2000);
    };

    return (
        <div style={{ backgroundColor: '#f6f7f9', minHeight: '100vh', color: '#10171f', fontFamily: 'Inter, sans-serif', padding: '100px 20px', display: 'flex', justifyContent: 'center' }}>
            <div style={{ maxWidth: '1000px', width: '100%', display: 'flex', gap: '40px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
                <div style={{ flex: '1 1 500px' }}>
                    <button onClick={() => navigate(-1)} style={{ display: 'flex', alignItems: 'center', gap: '5px', background: 'none', border: 'none', color: '#666', cursor: 'pointer', marginBottom: '30px', fontWeight: 600 }}>
                        <ArrowLeft size={16} /> Voltar
                    </button>
                    <h1 style={{ fontSize: '32px', fontWeight: 900, marginBottom: '10px', textTransform: 'uppercase' }}>Finalizar Inscrição</h1>
                    <p style={{ color: '#666', marginBottom: '30px' }}>Complete os seus dados para aceder ao "{course.title}" imediatamente.</p>
                    
                    <form onSubmit={handleSubmit} style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                        <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '20px' }}>1. Dados Pessoais</h3>
                        <div style={{ display: 'grid', gap: '15px', marginBottom: '30px' }}>
                            <input required type="text" placeholder="Nome Completo" style={{ width: '100%', padding: '15px', borderRadius: '12px', border: '1px solid #ddd', fontSize: '16px' }} />
                            <input required type="email" placeholder="E-mail" style={{ width: '100%', padding: '15px', borderRadius: '12px', border: '1px solid #ddd', fontSize: '16px' }} />
                            <input required type="text" placeholder="Telemóvel" style={{ width: '100%', padding: '15px', borderRadius: '12px', border: '1px solid #ddd', fontSize: '16px' }} />
                        </div>
                        
                        <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '20px' }}>2. Pagamento</h3>
                        <div style={{ display: 'grid', gap: '15px', marginBottom: '30px' }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '15px', border: '1px solid #0011fd', borderRadius: '12px', cursor: 'pointer', backgroundColor: 'rgba(0,17,253,0.05)' }}>
                                <input type="radio" name="payment" defaultChecked style={{ accentColor: '#0011fd' }} />
                                <div>
                                    <div style={{ fontWeight: 800 }}>Transferência / Depósito</div>
                                    <div style={{ fontSize: '12px', color: '#666' }}>Acesso libertado após comprovativo</div>
                                </div>
                            </label>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '15px', border: '1px solid #ddd', borderRadius: '12px', cursor: 'pointer' }}>
                                <input type="radio" name="payment" style={{ accentColor: '#0011fd' }} />
                                <div>
                                    <div style={{ fontWeight: 800 }}>Cartão Visa / Mastercard</div>
                                    <div style={{ fontSize: '12px', color: '#666' }}>Acesso Imediato</div>
                                </div>
                            </label>
                        </div>
                        
                        <button type="submit" disabled={isProcessing} style={{
                            width: '100%',
                            padding: '20px',
                            backgroundColor: isProcessing ? '#888' : '#0011fd',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '99px',
                            fontSize: '18px',
                            fontWeight: 900,
                            textTransform: 'uppercase',
                            cursor: isProcessing ? 'not-allowed' : 'pointer',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: '10px'
                        }}>
                            {isProcessing ? 'A processar...' : 'Confirmar Inscrição'} <Lock size={18} />
                        </button>
                    </form>
                </div>
                
                {/* Resumo do Pedido */}
                <div style={{ flex: '1 1 350px', backgroundColor: '#fff', padding: '40px', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', position: 'sticky', top: '100px' }}>
                    <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '20px' }}>Resumo do Pedido</h3>
                    
                    <div style={{ display: 'flex', gap: '15px', marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid #eee' }}>
                        <div style={{ width: '80px', height: '80px', borderRadius: '12px', overflow: 'hidden' }}>
                            <img src={course.img} alt={course.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                        <div>
                            <div style={{ fontWeight: 900, lineHeight: 1.2, marginBottom: '5px' }}>{course.title}</div>
                            <div style={{ fontSize: '12px', color: '#666' }}>Acesso Vitalício</div>
                        </div>
                    </div>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                        <span style={{ color: '#666' }}>Preço do Curso</span>
                        <span style={{ fontWeight: 800 }}>{course.price}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '20px', borderBottom: '1px solid #eee', marginBottom: '20px' }}>
                        <span style={{ color: '#666' }}>Taxas</span>
                        <span style={{ fontWeight: 800 }}>Grátis</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
                        <span style={{ fontSize: '18px', fontWeight: 900 }}>Total</span>
                        <span style={{ fontSize: '24px', fontWeight: 900, color: '#f83821' }}>{course.price}</span>
                    </div>
                    
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', backgroundColor: '#f9f9f9', padding: '15px', borderRadius: '12px' }}>
                        <ShieldCheck size={24} color="#0011fd" style={{ flexShrink: 0 }} />
                        <div>
                            <div style={{ fontWeight: 800, fontSize: '14px' }}>Compra Segura</div>
                            <div style={{ fontSize: '12px', color: '#666' }}>Os teus dados estão protegidos. Garantia de devolução de 30 dias.</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
