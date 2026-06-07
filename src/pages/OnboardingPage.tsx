import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, Target, Sparkles, Palette, ArrowRight, ArrowLeft, ShieldCheck } from 'lucide-react';

const steps = [
  { id: 1, name: 'Perfil' },
  { id: 2, name: 'Objetivos' },
  { id: 3, name: 'Interesses' },
  { id: 4, name: 'Estilo' },
  { id: 5, name: 'Análise' }
];

const OnboardingPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState({
    profile: '',
    goals: [] as string[],
    interests: [] as string[],
    style: ''
  });
  const [loading, setLoading] = useState(false);
  const [simulationState, setSimulationState] = useState('');
  
  const { completeOnboarding } = useAuth();
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentStep < 5) {
      if (currentStep === 4) {
        runAISimulation();
      } else {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const runAISimulation = async () => {
    setCurrentStep(5);
    setLoading(true);

    const states = [
      'A analisar o seu perfil profissional...',
      'A mapear áreas de oportunidade com base nos seus interesses...',
      'A configurar o painel inteligente e ferramentas de IA...',
      'A gerar recomendações personalizadas de cursos...',
      'Tudo pronto! A preparar o seu acesso...'
    ];

    for (let i = 0; i < states.length; i++) {
      setSimulationState(states[i]);
      await new Promise(resolve => setTimeout(resolve, 1200));
    }

    try {
      const res = await completeOnboarding(answers);
      if (res.success) {
        navigate('/membros');
      } else {
        alert(res.error || 'Erro ao finalizar o onboarding. Tente novamente.');
        setCurrentStep(4);
        setLoading(false);
      }
    } catch (err) {
      alert('Erro inesperado ao salvar onboarding.');
      setCurrentStep(4);
      setLoading(false);
    }
  };

  const toggleGoal = (goal: string) => {
    setAnswers(prev => ({
      ...prev,
      goals: prev.goals.includes(goal) 
        ? prev.goals.filter(g => g !== goal) 
        : [...prev.goals, goal]
    }));
  };

  const toggleInterest = (interest: string) => {
    setAnswers(prev => ({
      ...prev,
      interests: prev.interests.includes(interest) 
        ? prev.interests.filter(i => i !== interest) 
        : [...prev.interests, interest]
    }));
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <div className="mx-auto w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 mb-3">
                <Briefcase className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Qual das opções descreve melhor o seu perfil atual?</h3>
              <p className="text-gray-400 text-sm">Isso ajuda-nos a ajustar o tom e o conteúdo que irá encontrar.</p>
            </div>
            
            <div className="grid grid-cols-1 gap-3">
              {[
                { id: 'student', label: 'Estudante', desc: 'A procurar aprender as bases do empreendedorismo.' },
                { id: 'aspiring', label: 'Aspirante a Empreendedor', desc: 'Tenho ideias mas ainda não criei o meu negócio.' },
                { id: 'freelancer', label: 'Freelancer / Profissional Independente', desc: 'Presto serviços e quero escalar a minha atividade.' },
                { id: 'owner', label: 'Empresário Estabelecido', desc: 'Já tenho uma empresa ativa e procuro inovar e expandir.' }
              ].map(opt => (
                <button
                  key={opt.id}
                  onClick={() => setAnswers(prev => ({ ...prev, profile: opt.id }))}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    answers.profile === opt.id
                      ? 'bg-red-950/20 border-red-500 shadow-md shadow-red-950/10'
                      : 'bg-[#0d131b]/80 border-white/5 hover:border-white/10'
                  }`}
                  type="button"
                >
                  <div className="font-semibold text-white">{opt.label}</div>
                  <div className="text-xs text-gray-400 mt-1">{opt.desc}</div>
                </button>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <div className="mx-auto w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 mb-3">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Quais são os seus principais objetivos na Bisnoteka?</h3>
              <p className="text-gray-400 text-sm">Selecione todas as opções que se aplicam a si.</p>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {[
                { id: 'ideas', label: 'Encontrar ideias de negócio validadas', icon: '💡' },
                { id: 'courses', label: 'Aprender através de cursos e mentorias', icon: '🎓' },
                { id: 'documents', label: 'Gerar planos estratégicos e documentos de apoio', icon: '📝' },
                { id: 'networking', label: 'Conectar com outros fundadores e investidores', icon: '🤝' }
              ].map(opt => {
                const isSelected = answers.goals.includes(opt.id);
                return (
                  <button
                    key={opt.id}
                    onClick={() => toggleGoal(opt.id)}
                    className={`p-4 rounded-xl border text-left transition-all flex items-center gap-4 ${
                      isSelected
                        ? 'bg-red-950/20 border-red-500'
                        : 'bg-[#0d131b]/80 border-white/5 hover:border-white/10'
                    }`}
                    type="button"
                  >
                    <span className="text-2xl">{opt.icon}</span>
                    <div>
                      <div className="font-semibold text-white">{opt.label}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <div className="mx-auto w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-500 mb-3">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Quais áreas de negócio lhe despertam mais interesse?</h3>
              <p className="text-gray-400 text-sm">Selecione pelo menos duas áreas.</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                { id: 'saas', label: 'Software / SaaS', icon: '💻' },
                { id: 'ecommerce', label: 'E-commerce', icon: '🛒' },
                { id: 'ai', label: 'Inteligência Artificial', icon: '🤖' },
                { id: 'education', label: 'Educação / Infoprodutos', icon: '📚' },
                { id: 'agency', label: 'Agência / Serviços', icon: '💼' },
                { id: 'realestate', label: 'Imobiliário', icon: '🏢' }
              ].map(opt => {
                const isSelected = answers.interests.includes(opt.id);
                return (
                  <button
                    key={opt.id}
                    onClick={() => toggleInterest(opt.id)}
                    className={`p-4 rounded-xl border text-left transition-all flex flex-col gap-2 ${
                      isSelected
                        ? 'bg-red-950/20 border-red-500'
                        : 'bg-[#0d131b]/80 border-white/5 hover:border-white/10'
                    }`}
                    type="button"
                  >
                    <span className="text-2xl">{opt.icon}</span>
                    <span className="font-semibold text-white text-sm">{opt.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <div className="mx-auto w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 mb-3">
                <Palette className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Que estilo visual ou tom prefere para a sua marca?</h3>
              <p className="text-gray-400 text-sm">Isso guiará a IA na geração de identidades e logótipos.</p>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {[
                { id: 'minimalist', label: 'Minimalista & Limpo', desc: 'Foco na tipografia e espaço em branco. Elegante e moderno.' },
                { id: 'tech', label: 'Tecnológico & Futurista', desc: 'Cores vibrantes, neon, estilos sci-fi e de alta tecnologia.' },
                { id: 'luxury', label: 'Premium & Luxuoso', desc: 'Tons de dourado, preto, serifas sofisticadas. Foco na exclusividade.' },
                { id: 'classic', label: 'Clássico & Corporativo', desc: 'Cores sóbrias (azul, cinzento), design tradicional e de confiança.' }
              ].map(opt => (
                <button
                  key={opt.id}
                  onClick={() => setAnswers(prev => ({ ...prev, style: opt.id }))}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    answers.style === opt.id
                      ? 'bg-red-950/20 border-red-500'
                      : 'bg-[#0d131b]/80 border-white/5 hover:border-white/10'
                  }`}
                  type="button"
                >
                  <div className="font-semibold text-white">{opt.label}</div>
                  <div className="text-xs text-gray-400 mt-1">{opt.desc}</div>
                </button>
              ))}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="text-center py-12 space-y-6">
            <div className="relative mx-auto w-24 h-24">
              <div className="absolute inset-0 rounded-full bg-red-600/20 animate-ping" />
              <div className="relative w-24 h-24 rounded-full bg-red-950/40 border border-red-500/30 flex items-center justify-center">
                <Sparkles className="w-10 h-10 text-red-500 animate-pulse" />
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-white">A Otimizar a sua Experiência</h3>
              <p className="text-gray-400 text-sm max-w-sm mx-auto">
                A nossa inteligência artificial está a configurar o seu ecossistema personalizado.
              </p>
            </div>

            <div className="bg-[#080d14] border border-white/5 rounded-xl p-4 max-w-sm mx-auto text-left font-mono text-xs">
              <div className="flex items-center gap-2 text-green-400 mb-2">
                <ShieldCheck className="w-4 h-4" />
                <span>Bisnoteka Core Engine v1.0.0</span>
              </div>
              <div className="text-gray-300 animate-pulse">
                &gt; {simulationState}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const isNextDisabled = () => {
    if (currentStep === 1 && !answers.profile) return true;
    if (currentStep === 2 && answers.goals.length === 0) return true;
    if (currentStep === 3 && answers.interests.length < 2) return true;
    if (currentStep === 4 && !answers.style) return true;
    return false;
  };

  return (
    <div className="min-h-screen bg-[#080d14] flex flex-col justify-center items-center px-4 relative overflow-hidden font-['Roboto'] py-12">
      {/* Background gradients */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-red-900/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-950/10 blur-[120px] pointer-events-none" />

      <div className="w-full max-w-xl z-10">
        {currentStep < 5 && (
          <div className="flex justify-between items-center mb-8 px-4">
            <img src="/LOGO H.svg" alt="Bisnoteka" className="h-6" />
            <div className="flex gap-2">
              {steps.slice(0, 4).map(step => (
                <div
                  key={step.id}
                  className={`h-1.5 w-10 rounded-full transition-all duration-300 ${
                    currentStep >= step.id ? 'bg-red-600' : 'bg-white/10'
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        <div className="bg-[#10171f]/80 border border-white/5 rounded-2xl p-8 shadow-2xl backdrop-blur-md relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderStepContent()}
            </motion.div>
          </AnimatePresence>

          {currentStep < 5 && (
            <div className="flex justify-between items-center mt-8 pt-6 border-t border-white/5">
              <button
                onClick={handleBack}
                disabled={currentStep === 1}
                className="py-2.5 px-4 bg-white/5 border border-white/5 text-gray-300 hover:text-white rounded-xl text-sm font-semibold flex items-center gap-2 transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                type="button"
              >
                <ArrowLeft className="w-4 h-4" />
                Voltar
              </button>

              <button
                onClick={handleNext}
                disabled={isNextDisabled()}
                className="py-2.5 px-5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white rounded-xl text-sm font-semibold flex items-center gap-2 transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                type="button"
              >
                {currentStep === 4 ? 'Finalizar Perfil' : 'Continuar'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;
