import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, User, AlertCircle, ArrowRight } from 'lucide-react';

const RegisterPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
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
    <div className="min-h-screen bg-[#080d14] flex flex-col justify-center items-center px-4 relative overflow-hidden font-['Roboto'] py-12">
      {/* Background gradients */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-red-900/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-950/10 blur-[120px] pointer-events-none" />
      
      <div className="w-full max-w-md z-10">
        {/* Header/Logo */}
        <div className="text-center mb-8 flex flex-col items-center">
          <Link to="/">
            <img src="/LOGO H.svg" alt="Bisnoteka" className="h-8 mb-4" />
          </Link>
          <p className="text-gray-400 text-sm">O motor de inteligência e conhecimento do empreendedor</p>
        </div>

        {/* Card */}
        <div className="bg-[#10171f]/80 border border-white/5 rounded-2xl p-8 shadow-2xl backdrop-blur-md">
          <h2 className="text-2xl font-semibold text-white mb-2">Criar a sua conta</h2>
          <p className="text-gray-400 text-sm mb-6">Registe-se para aceder ao ecossistema e começar o seu onboarding</p>

          {error && (
            <div className="mb-6 bg-red-950/40 border border-red-500/30 text-red-200 text-sm rounded-lg p-3 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 mt-0.5 text-red-400 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Nome Completo</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                  <User className="w-5 h-5" />
                </span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-[#0c1219]/90 border border-white/10 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:border-red-500 transition-colors"
                  placeholder="Seu Nome"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">E-mail</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                  <Mail className="w-5 h-5" />
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-[#0c1219]/90 border border-white/10 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:border-red-500 transition-colors"
                  placeholder="seuemail@exemplo.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Palavra-passe</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                  <Lock className="w-5 h-5" />
                </span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-[#0c1219]/90 border border-white/10 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:border-red-500 transition-colors"
                  placeholder="Min. 6 caracteres"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Confirmar Palavra-passe</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                  <Lock className="w-5 h-5" />
                </span>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-[#0c1219]/90 border border-white/10 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:border-red-500 transition-colors"
                  placeholder="Repita a palavra-passe"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 mt-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-semibold rounded-xl text-sm flex justify-center items-center gap-2 transition-all shadow-lg shadow-red-950/20 disabled:opacity-50 cursor-pointer"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  Registar e Iniciar Onboarding
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer info */}
        <p className="text-center text-gray-500 text-xs mt-8">
          Já tem uma conta?{' '}
          <Link to="/login" className="text-red-400 hover:text-red-300 font-semibold hover:underline">
            Faça login aqui
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
