import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, User, AlertCircle, ArrowRight, Eye, EyeOff } from 'lucide-react';

const RegisterPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [nameFocused, setNameFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [confirmPasswordFocused, setConfirmPasswordFocused] = useState(false);
  const [hoveredButton, setHoveredButton] = useState(false);
  const [hoveredGoogle, setHoveredGoogle] = useState(false);
  const [hoveredApple, setHoveredApple] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!name || !email || !password || !confirmPassword) {
      setError('Por favor, preencha todos os campos.');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('A palavra-passe deve conter pelo menos 6 caracteres.');
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('As palavras-passe introduzidas não são iguais.');
      setLoading(false);
      return;
    }

    try {
      const res = await register(name, email, password);
      if (res.success) {
        navigate('/onboarding');
      } else {
        setError(res.error || 'Falha ao registar utilizador. Tente novamente.');
      }
    } catch (err) {
      setError('Ocorreu um erro inesperado. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0c1219',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '40px 16px',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: "'Roboto', sans-serif",
      color: '#fff'
    }}>
      <style>{`
        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus,
        input:-webkit-autofill:active {
          -webkit-background-clip: text;
          -webkit-text-fill-color: #ffffff !important;
          transition: background-color 5000s ease-in-out 0s;
          box-shadow: inset 0 0 20px 20px #0a0f16 !important;
        }
      `}</style>

      {/* Dynamic Glowing Ambient Blobs */}
      <div style={{
        position: 'absolute',
        top: '-15%',
        left: '-10%',
        width: '600px',
        height: '600px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(248,56,33,0.08) 0%, rgba(248,56,33,0) 70%)',
        filter: 'blur(80px)',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-15%',
        right: '-10%',
        width: '600px',
        height: '600px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,17,253,0.06) 0%, rgba(0,17,253,0) 70%)',
        filter: 'blur(80px)',
        pointerEvents: 'none'
      }} />

      <div style={{ width: '100%', maxWidth: '440px', zIndex: 10 }}>
        {/* Header/Logo */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <Link to="/" style={{ display: 'inline-block', transition: 'transform 0.3s ease' }}>
            <img src="/LOGO H.svg" alt="Bisnoteka" style={{ height: '32px', marginBottom: '12px' }} />
          </Link>
          <p style={{ color: '#8892b0', fontSize: '14px', letterSpacing: '0.5px' }}>O motor de inteligência e conhecimento do fundador</p>
        </div>

        {/* Form Card */}
        <div style={{
          backgroundColor: 'rgba(16, 23, 31, 0.75)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          borderRadius: '24px',
          padding: '36px 32px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
        }}>
          <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#fff', marginBottom: '6px', letterSpacing: '-0.5px' }}>Criar a sua conta</h2>
          <p style={{ color: '#8892b0', fontSize: '14px', marginBottom: '24px' }}>Registe-se e comece o seu onboarding personalizado.</p>

          {error && (
            <div style={{
              marginBottom: '20px',
              backgroundColor: 'rgba(239, 68, 68, 0.06)',
              border: '1px solid rgba(239, 68, 68, 0.2)',
              color: '#fca5a5',
              fontSize: '14px',
              borderRadius: '12px',
              padding: '14px',
              display: 'flex',
              alignItems: 'start',
              gap: '12px'
            }}>
              <AlertCircle size={18} style={{ color: '#ef4444', flexShrink: 0, marginTop: '2px' }} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#8892b0', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Nome Completo</label>
              <div style={{ position: 'relative' }}>
                <span style={{
                  position: 'absolute',
                  insetY: 0,
                  left: '14px',
                  top: '15px',
                  display: 'flex',
                  alignItems: 'center',
                  color: nameFocused ? '#f83821' : '#4b5563',
                  transition: 'color 0.3s ease'
                }}>
                  <User size={16} />
                </span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onFocus={() => setNameFocused(true)}
                  onBlur={() => setNameFocused(false)}
                  style={{
                    width: '100%',
                    padding: '14px 14px 14px 42px',
                    backgroundColor: '#0a0f16',
                    border: nameFocused ? '1px solid rgba(248, 56, 33, 0.5)' : '1px solid rgba(255, 255, 255, 0.05)',
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '14px',
                    outline: 'none',
                    boxShadow: nameFocused ? '0 0 15px rgba(248, 56, 33, 0.12)' : 'none',
                    transition: 'all 0.3s ease'
                  }}
                  placeholder="Seu Nome Completo"
                  required
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#8892b0', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>E-mail</label>
              <div style={{ position: 'relative' }}>
                <span style={{
                  position: 'absolute',
                  insetY: 0,
                  left: '14px',
                  top: '15px',
                  display: 'flex',
                  alignItems: 'center',
                  color: emailFocused ? '#f83821' : '#4b5563',
                  transition: 'color 0.3s ease'
                }}>
                  <Mail size={16} />
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setEmailFocused(true)}
                  onBlur={() => setEmailFocused(false)}
                  style={{
                    width: '100%',
                    padding: '14px 14px 14px 42px',
                    backgroundColor: '#0a0f16',
                    border: emailFocused ? '1px solid rgba(248, 56, 33, 0.5)' : '1px solid rgba(255, 255, 255, 0.05)',
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '14px',
                    outline: 'none',
                    boxShadow: emailFocused ? '0 0 15px rgba(248, 56, 33, 0.12)' : 'none',
                    transition: 'all 0.3s ease'
                  }}
                  placeholder="seuemail@exemplo.com"
                  required
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#8892b0', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Palavra-passe</label>
              <div style={{ position: 'relative' }}>
                <span style={{
                  position: 'absolute',
                  insetY: 0,
                  left: '14px',
                  top: '15px',
                  display: 'flex',
                  alignItems: 'center',
                  color: passwordFocused ? '#f83821' : '#4b5563',
                  transition: 'color 0.3s ease'
                }}>
                  <Lock size={16} />
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setPasswordFocused(true)}
                  onBlur={() => setPasswordFocused(false)}
                  style={{
                    width: '100%',
                    padding: '14px 42px 14px 42px',
                    backgroundColor: '#0a0f16',
                    border: passwordFocused ? '1px solid rgba(248, 56, 33, 0.5)' : '1px solid rgba(255, 255, 255, 0.05)',
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '14px',
                    outline: 'none',
                    boxShadow: passwordFocused ? '0 0 15px rgba(248, 56, 33, 0.12)' : 'none',
                    transition: 'all 0.3s ease'
                  }}
                  placeholder="Mínimo 6 caracteres"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '14px',
                    top: '14px',
                    backgroundColor: 'transparent',
                    border: 'none',
                    color: '#4b5563',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#8892b0', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Confirmar Palavra-passe</label>
              <div style={{ position: 'relative' }}>
                <span style={{
                  position: 'absolute',
                  insetY: 0,
                  left: '14px',
                  top: '15px',
                  display: 'flex',
                  alignItems: 'center',
                  color: confirmPasswordFocused ? '#f83821' : '#4b5563',
                  transition: 'color 0.3s ease'
                }}>
                  <Lock size={16} />
                </span>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onFocus={() => setConfirmPasswordFocused(true)}
                  onBlur={() => setConfirmPasswordFocused(false)}
                  style={{
                    width: '100%',
                    padding: '14px 42px 14px 42px',
                    backgroundColor: '#0a0f16',
                    border: confirmPasswordFocused ? '1px solid rgba(248, 56, 33, 0.5)' : '1px solid rgba(255, 255, 255, 0.05)',
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '14px',
                    outline: 'none',
                    boxShadow: confirmPasswordFocused ? '0 0 15px rgba(248, 56, 33, 0.12)' : 'none',
                    transition: 'all 0.3s ease'
                  }}
                  placeholder="Repita a palavra-passe"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={{
                    position: 'absolute',
                    right: '14px',
                    top: '14px',
                    backgroundColor: 'transparent',
                    border: 'none',
                    color: '#4b5563',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              onMouseEnter={() => setHoveredButton(true)}
              onMouseLeave={() => setHoveredButton(false)}
              style={{
                width: '100%',
                padding: '15px',
                background: hoveredButton ? 'linear-gradient(135deg, #ff4c36 0%, #e22b15 100%)' : 'linear-gradient(135deg, #f83821 0%, #d6220e 100%)',
                color: '#fff',
                fontSize: '14px',
                fontWeight: 700,
                border: 'none',
                borderRadius: '12px',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '8px',
                boxShadow: hoveredButton ? '0 8px 24px rgba(248, 56, 33, 0.3)' : '0 4px 14px rgba(248, 56, 33, 0.2)',
                transform: hoveredButton ? 'translateY(-1px)' : 'none',
                transition: 'all 0.3s ease',
                opacity: loading ? 0.6 : 1,
                marginTop: '8px'
              }}
            >
              {loading ? (
                <div style={{ width: '20px', height: '20px', border: '2px solid #fff', borderTopColor: 'transparent', borderRadius: '50%' }} className="animate-spin"></div>
              ) : (
                <>
                  Registar e Iniciar Onboarding
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', margin: '20px 0' }}>
            <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(255, 255, 255, 0.05)' }}></div>
            <span style={{ fontSize: '11px', color: '#4b5563', padding: '0 12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>ou registar com</span>
            <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(255, 255, 255, 0.05)' }}></div>
          </div>

          {/* Social Logins */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <button
              type="button"
              onMouseEnter={() => setHoveredGoogle(true)}
              onMouseLeave={() => setHoveredGoogle(false)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                padding: '12px',
                backgroundColor: hoveredGoogle ? 'rgba(255, 255, 255, 0.03)' : 'rgba(255, 255, 255, 0.01)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                borderRadius: '12px',
                color: '#fff',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <svg style={{ width: '16px', height: '16px' }} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <g transform="matrix(1, 0, 0, 1, 0, 0)">
                  <path d="M21.35,11.1H12v2.7h5.38c-0.24,1.28 -0.96,2.37 -2.04,3.1v2.56h3.3c1.93,-1.78 3.04,-4.4 3.04,-7.4C21.68,11.96 21.56,11.5 21.35,11.1z" fill="#4285F4" />
                  <path d="M12,20.9c2.4,0 4.4,-0.8 5.88,-2.16l-3.3,-2.56c-0.9,0.6 -2.06,0.96 -3.24,0.96 -2.3,0 -4.24,-1.55 -4.94,-3.64H2.94v2.64C4.42,18.8 8,20.9 12,20.9z" fill="#34A853" />
                  <path d="M7.06,13.5c-0.18,-0.54 -0.28,-1.12 -0.28,-1.7s0.1,-1.16 0.28,-1.7V7.46H2.94C2.33,8.68 2,10.06 2,11.8s0.33,3.12 0.94,4.34L7.06,13.5z" fill="#FBBC05" />
                  <path d="M12,6.76c1.3,0 2.48,0.45 3.4,1.32l2.56,-2.56C16.4,4.04 14.4,3.2 12,3.2c-4,0 -7.58,2.1 -9.06,5.34l4.12,3.2c0.7,-2.09 2.64,-3.64 4.94,-3.64z" fill="#EA4335" />
                </g>
              </svg>
              Google
            </button>
            <button
              type="button"
              onMouseEnter={() => setHoveredApple(true)}
              onMouseLeave={() => setHoveredApple(false)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                padding: '12px',
                backgroundColor: hoveredApple ? 'rgba(255, 255, 255, 0.03)' : 'rgba(255, 255, 255, 0.01)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                borderRadius: '12px',
                color: '#fff',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <svg style={{ width: '14px', height: '14px', fill: '#fff' }} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.2.67-2.92 1.51-.61.73-1.14 1.87-1 2.98 1.11.09 2.24-.59 2.93-1.43z" />
              </svg>
              Apple
            </button>
          </div>
        </div>

        {/* Footer info */}
        <p style={{ textAlign: 'center', color: '#4b5563', fontSize: '13px', marginTop: '28px' }}>
          Já tem uma conta?{' '}
          <Link to="/login" style={{ color: '#f83821', textDecoration: 'none', fontWeight: 600 }}>
            Faça login aqui
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
