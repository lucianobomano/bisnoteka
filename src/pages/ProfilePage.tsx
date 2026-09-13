import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Shield, CreditCard, CheckCircle, AlertCircle, Eye, EyeOff, Loader } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const PRESETS_AVATARS = [
    { name: 'Red Flame', url: 'linear-gradient(135deg, #f83821 0%, #f97316 100%)' },
    { name: 'Neon Ocean', url: 'linear-gradient(135deg, #0011fd 0%, #06b6d4 100%)' },
    { name: 'Gold Success', url: 'linear-gradient(135deg, #eab308 0%, #ca8a04 100%)' },
    { name: 'Emerald Growth', url: 'linear-gradient(135deg, #10b981 0%, #047857 100%)' },
    { name: 'Purple Disruptor', url: 'linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)' },
    { name: 'Royal Velvet', url: 'linear-gradient(135deg, #ec4899 0%, #be185d 100%)' },
];

const ProfilePage: React.FC = () => {
    const { user, token, refreshUser } = useAuth();
    
    // Form fields
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [selectedAvatar, setSelectedAvatar] = useState('');
    const [customAvatarUrl, setCustomAvatarUrl] = useState('');
    const [useCustomAvatar, setUseCustomAvatar] = useState(false);

    // UI state
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        if (user) {
            setName(user.name || '');
            setEmail(user.email || '');
            
            // Determine if using custom avatar or preset
            const avatar = user.avatarUrl || '';
            setSelectedAvatar(avatar);
            if (avatar && !avatar.startsWith('linear-gradient')) {
                setCustomAvatarUrl(avatar);
                setUseCustomAvatar(true);
            } else {
                setUseCustomAvatar(false);
            }
        }
    }, [user]);

    const handleAvatarSelect = (url: string) => {
        setUseCustomAvatar(false);
        setSelectedAvatar(url);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSuccessMsg('');
        setErrorMsg('');

        if (!name.trim() || !email.trim()) {
            setErrorMsg('O nome e o e-mail são obrigatórios.');
            return;
        }

        if (password) {
            if (password.length < 6) {
                setErrorMsg('A nova palavra-passe deve ter pelo menos 6 caracteres.');
                return;
            }
            if (password !== confirmPassword) {
                setErrorMsg('As palavras-passe introduzidas não coincidem.');
                return;
            }
        }

        setIsSaving(true);

        const avatarToSave = useCustomAvatar ? customAvatarUrl : selectedAvatar;

        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/api/auth/profile`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    name,
                    email,
                    password: password || undefined,
                    avatarUrl: avatarToSave || null
                })
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Erro ao atualizar o perfil.');
            }

            // Sync user state globally
            await refreshUser();
            setSuccessMsg('Perfil atualizado com sucesso!');
            setPassword('');
            setConfirmPassword('');
        } catch (err: any) {
            setErrorMsg(err.message || 'Erro de ligação ao servidor.');
        } finally {
            setIsSaving(false);
        }
    };

    const getInitials = (fullName: string) => {
        const parts = fullName.split(' ');
        if (parts.length >= 2) {
            return (parts[0][0] + parts[1][0]).toUpperCase();
        }
        return fullName.substring(0, 2).toUpperCase();
    };

    return (
        <motion.div 
            initial={{ opacity: 0, y: 15 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.4 }}
            style={{ maxWidth: '850px', margin: '0 auto', color: '#fff' }}
        >
            <div style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '2.25rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.025em', marginBottom: '0.5rem' }}>
                    O Meu Perfil
                </h1>
                <p style={{ color: '#aaaaaa', fontSize: '1.125rem' }}>Gerencie as suas informações pessoais e credenciais de acesso.</p>
            </div>

            <div className="profile-grid">
                
                {/* Column 1: Card & Avatar */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div style={{ 
                        backgroundColor: '#111', 
                        border: '1px solid #222', 
                        borderRadius: '24px', 
                        padding: '30px 20px', 
                        textAlign: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}>
                        {/* Avatar Render */}
                        <div style={{ 
                            width: '120px', 
                            height: '120px', 
                            borderRadius: '50%', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            fontSize: '36px',
                            fontWeight: 900,
                            color: '#fff',
                            marginBottom: '20px',
                            border: '4px solid #1c1c1c',
                            overflow: 'hidden',
                            boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
                            background: selectedAvatar && selectedAvatar.startsWith('linear-gradient') ? selectedAvatar : '#1f2937'
                        }}>
                            {selectedAvatar && !selectedAvatar.startsWith('linear-gradient') ? (
                                <img src={selectedAvatar} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            ) : (
                                getInitials(name || 'Utilizador')
                            )}
                        </div>

                        <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '6px', textTransform: 'uppercase' }}>
                            {name || 'Nome Completo'}
                        </h3>
                        <p style={{ color: '#888', fontSize: '14px', marginBottom: '20px' }}>{email}</p>

                        {/* Badges */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%' }}>
                            <div style={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                gap: '8px', 
                                backgroundColor: '#181818', 
                                border: '1px solid #222', 
                                borderRadius: '12px', 
                                padding: '10px 14px',
                                fontSize: '13px'
                            }}>
                                <CreditCard size={16} color="#f83821" />
                                <div style={{ textAlign: 'left' }}>
                                    <div style={{ fontSize: '10px', color: '#666', fontWeight: 800, textTransform: 'uppercase' }}>Plano Atual</div>
                                    <div style={{ fontWeight: 800, color: user?.subscriptionTier === 'FREE' ? '#aaa' : '#eab308' }}>
                                        {user?.subscriptionTier || 'FREE'}
                                    </div>
                                </div>
                            </div>

                            <div style={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                gap: '8px', 
                                backgroundColor: '#181818', 
                                border: '1px solid #222', 
                                borderRadius: '12px', 
                                padding: '10px 14px',
                                fontSize: '13px'
                            }}>
                                <Shield size={16} color="#0011fd" />
                                <div style={{ textAlign: 'left' }}>
                                    <div style={{ fontSize: '10px', color: '#666', fontWeight: 800, textTransform: 'uppercase' }}>Função do Sistema</div>
                                    <div style={{ fontWeight: 800, color: '#fff' }}>
                                        {user?.role || 'USER'}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Column 2: Form */}
                <div style={{ flex: 1 }}>
                    <form onSubmit={handleSave} style={{ 
                        backgroundColor: '#111', 
                        border: '1px solid #222', 
                        borderRadius: '24px', 
                        padding: '30px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '24px'
                    }}>
                        
                        {/* Alerts */}
                        {successMsg && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: 'rgba(16, 185, 129, 0.1)', border: '1px solid #10b981', borderRadius: '12px', padding: '12px 16px', color: '#10b981', fontSize: '14px', fontWeight: 600 }}>
                                <CheckCircle size={18} />
                                {successMsg}
                            </div>
                        )}
                        {errorMsg && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: 'rgba(248, 56, 33, 0.1)', border: '1px solid #f83821', borderRadius: '12px', padding: '12px 16px', color: '#f83821', fontSize: '14px', fontWeight: 600 }}>
                                <AlertCircle size={18} />
                                {errorMsg}
                            </div>
                        )}

                        {/* General Info Section */}
                        <div>
                            <h2 style={{ fontSize: '16px', fontWeight: 900, textTransform: 'uppercase', color: '#fff', marginBottom: '16px', borderBottom: '1px solid #222', paddingBottom: '8px', letterSpacing: '0.05em' }}>
                                Informações Pessoais
                            </h2>
                            
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', color: '#666', marginBottom: '8px', letterSpacing: '0.05em' }}>Nome Completo</label>
                                    <div style={{ position: 'relative' }}>
                                        <User size={18} color="#444" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
                                        <input 
                                            type="text" 
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            style={{
                                                width: '100%',
                                                height: '50px',
                                                backgroundColor: '#161f28',
                                                border: '1px solid #222',
                                                borderRadius: '12px',
                                                padding: '0 16px 0 46px',
                                                color: '#ffffff',
                                                fontSize: '15px',
                                                outline: 'none'
                                            }}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', color: '#666', marginBottom: '8px', letterSpacing: '0.05em' }}>Endereço de E-mail</label>
                                    <div style={{ position: 'relative' }}>
                                        <Mail size={18} color="#444" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
                                        <input 
                                            type="email" 
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            style={{
                                                width: '100%',
                                                height: '50px',
                                                backgroundColor: '#161f28',
                                                border: '1px solid #222',
                                                borderRadius: '12px',
                                                padding: '0 16px 0 46px',
                                                color: '#ffffff',
                                                fontSize: '15px',
                                                outline: 'none'
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Avatar Customization */}
                        <div>
                            <h2 style={{ fontSize: '16px', fontWeight: 900, textTransform: 'uppercase', color: '#fff', marginBottom: '16px', borderBottom: '1px solid #222', paddingBottom: '8px', letterSpacing: '0.05em' }}>
                                Personalizar Avatar
                            </h2>

                            {/* Preset Grid */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))', gap: '12px', marginBottom: '16px' }}>
                                {PRESETS_AVATARS.map((av) => (
                                    <button
                                        type="button"
                                        key={av.name}
                                        onClick={() => handleAvatarSelect(av.url)}
                                        style={{
                                            height: '60px',
                                            borderRadius: '12px',
                                            border: selectedAvatar === av.url && !useCustomAvatar ? '3px solid #f83821' : '2px solid #222',
                                            background: av.url,
                                            cursor: 'pointer',
                                            transition: 'transform 0.15s ease',
                                            position: 'relative'
                                        }}
                                        title={av.name}
                                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                    >
                                        {selectedAvatar === av.url && !useCustomAvatar && (
                                            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: '9px' }}>
                                                <CheckCircle size={20} color="#fff" />
                                            </div>
                                        )}
                                    </button>
                                ))}
                            </div>

                            {/* Custom URL Option */}
                            <div style={{ backgroundColor: '#161f28', border: '1px solid #222', borderRadius: '16px', padding: '16px' }}>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', marginBottom: '8px' }}>
                                    <input 
                                        type="checkbox" 
                                        checked={useCustomAvatar} 
                                        onChange={(e) => {
                                            setUseCustomAvatar(e.target.checked);
                                            if (e.target.checked) {
                                                setSelectedAvatar(customAvatarUrl);
                                            } else {
                                                setSelectedAvatar(PRESETS_AVATARS[0].url);
                                            }
                                        }} 
                                        style={{ accentColor: '#f83821' }}
                                    />
                                    <span style={{ fontSize: '13px', fontWeight: 700, color: '#fff' }}>Utilizar imagem externa personalizada</span>
                                </label>
                                
                                {useCustomAvatar && (
                                    <input 
                                        type="url" 
                                        placeholder="https://exemplo.com/sua-imagem.png" 
                                        value={customAvatarUrl}
                                        onChange={(e) => {
                                            setCustomAvatarUrl(e.target.value);
                                            setSelectedAvatar(e.target.value);
                                        }}
                                        style={{
                                            width: '100%',
                                            height: '44px',
                                            backgroundColor: '#111',
                                            border: '1px solid #222',
                                            borderRadius: '10px',
                                            padding: '0 12px',
                                            color: '#ffffff',
                                            fontSize: '14px',
                                            outline: 'none',
                                            marginTop: '8px'
                                        }}
                                    />
                                )}
                            </div>
                        </div>

                        {/* Security Section */}
                        <div>
                            <h2 style={{ fontSize: '16px', fontWeight: 900, textTransform: 'uppercase', color: '#fff', marginBottom: '16px', borderBottom: '1px solid #222', paddingBottom: '8px', letterSpacing: '0.05em' }}>
                                Segurança (Alterar Palavra-passe)
                            </h2>
                            <p style={{ color: '#666', fontSize: '12px', marginBottom: '16px' }}>Deixe os campos em branco se não pretender alterar a palavra-passe atual.</p>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr', md: '1fr 1fr', gap: '16px', ...{ '@media (min-width: 768px)': { gridTemplateColumns: '1fr 1fr' } } } as any}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', color: '#666', marginBottom: '8px', letterSpacing: '0.05em' }}>Nova Palavra-passe</label>
                                    <div style={{ position: 'relative' }}>
                                        <Lock size={18} color="#444" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
                                        <input 
                                            type={showPassword ? 'text' : 'password'} 
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Mínimo 6 caracteres"
                                            style={{
                                                width: '100%',
                                                height: '50px',
                                                backgroundColor: '#161f28',
                                                border: '1px solid #222',
                                                borderRadius: '12px',
                                                padding: '0 46px 0 46px',
                                                color: '#ffffff',
                                                fontSize: '15px',
                                                outline: 'none'
                                            }}
                                        />
                                        <button 
                                            type="button" 
                                            onClick={() => setShowPassword(!showPassword)}
                                            style={{ background: 'transparent', border: 'none', position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', color: '#444' }}
                                        >
                                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', color: '#666', marginBottom: '8px', letterSpacing: '0.05em' }}>Confirmar Palavra-passe</label>
                                    <div style={{ position: 'relative' }}>
                                        <Lock size={18} color="#444" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
                                        <input 
                                            type={showConfirmPassword ? 'text' : 'password'} 
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            placeholder="Repita a palavra-passe"
                                            style={{
                                                width: '100%',
                                                height: '50px',
                                                backgroundColor: '#161f28',
                                                border: '1px solid #222',
                                                borderRadius: '12px',
                                                padding: '0 46px 0 46px',
                                                color: '#ffffff',
                                                fontSize: '15px',
                                                outline: 'none'
                                            }}
                                        />
                                        <button 
                                            type="button" 
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            style={{ background: 'transparent', border: 'none', position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', color: '#444' }}
                                        >
                                            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div style={{ marginTop: '12px' }}>
                            <button
                                type="submit"
                                disabled={isSaving}
                                style={{
                                    width: '100%',
                                    height: '54px',
                                    backgroundColor: isSaving ? '#555' : '#f83821',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '12px',
                                    fontWeight: 900,
                                    fontSize: '15px',
                                    textTransform: 'uppercase',
                                    cursor: isSaving ? 'not-allowed' : 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '10px',
                                    transition: 'background-color 0.2s ease',
                                    boxShadow: '0 4px 14px rgba(248, 56, 33, 0.3)'
                                }}
                                onMouseEnter={(e) => { if (!isSaving) e.currentTarget.style.backgroundColor = '#d62d19'; }}
                                onMouseLeave={(e) => { if (!isSaving) e.currentTarget.style.backgroundColor = '#f83821'; }}
                            >
                                {isSaving ? (
                                    <>
                                        A GUARDAR ALTERAÇÕES <Loader className="animate-spin" size={18} />
                                    </>
                                ) : (
                                    'GUARDAR ALTERAÇÕES'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </motion.div>
    );
};

export default ProfilePage;
