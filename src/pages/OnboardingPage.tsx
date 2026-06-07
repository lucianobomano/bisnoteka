import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, Target, Sparkles, Palette, ArrowRight, ArrowLeft, ShieldCheck, Check, Cpu, Award } from 'lucide-react';

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
  const [simulationStepIndex, setSimulationStepIndex] = useState(0);
  const [showFinishedCard, setShowFinishedCard] = useState(false);
  const [hoveredBack, setHoveredBack] = useState(false);
  const [hoveredNext, setHoveredNext] = useState(false);
  const [hoveredOptions, setHoveredOptions] = useState<Record<string, boolean>>({});
  
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
      'A iniciar o compilador do Bisnoteka Core Engine...',
      'A mapear o perfil de utilizador com base nas suas competências...',
      'A varrer a base de dados em busca de ideias e oportunidades...',
      'A criar recomendações de cursos (Liderança, Escala e Finanças)...',
      'A gerar templates inteligentes de documentação...',
      'A encriptar tokens de segurança e autenticação do utilizador...',
      'Ecossistema configurado com sucesso! A carregar interface...'
    ];

    for (let i = 0; i < states.length; i++) {
      setSimulationStepIndex(i);
      setSimulationState(states[i]);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    setLoading(false);
    setShowFinishedCard(true);
  };

  const handleFinalRedirect = async () => {
    try {
      const res = await completeOnboarding(answers);
      if (res.success) {
        navigate('/membros');
      } else {
        alert(res.error || 'Erro ao finalizar o onboarding. Tente novamente.');
        setCurrentStep(4);
        setShowFinishedCard(false);
      }
    } catch (err) {
      alert('Erro inesperado ao salvar onboarding.');
      setCurrentStep(4);
      setShowFinishedCard(false);
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

  const setHoveredState = (key: string, value: boolean) => {
    setHoveredOptions(prev => ({ ...prev, [key]: value }));
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                margin: '0 auto 12px',
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                backgroundColor: 'rgba(248, 56, 33, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#f83821',
                boxShadow: '0 0 15px rgba(248, 56, 33, 0.1)'
              }}>
                <Briefcase size={20} />
              </div>
              <h3 style={{ fontSize: '22px', fontWeight: 700, color: '#fff', letterSpacing: '-0.5px' }}>Qual é o seu perfil atual?</h3>
              <p style={{ color: '#8892b0', fontSize: '14px', marginTop: '6px' }}>Isso ajuda-nos a ajustar o tom e o conteúdo que irá encontrar na plataforma.</p>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { id: 'student', label: 'Estudante / Académico', desc: 'A procurar aprender as bases do empreendedorismo moderno.' },
                { id: 'aspiring', label: 'Aspirante a Empreendedor', desc: 'Tenho ideias e sonhos, mas ainda não tirei o meu projeto do papel.' },
                { id: 'freelancer', label: 'Freelancer / Profissional Independente', desc: 'Presto serviços e quero estruturar ou escalar o meu negócio.' },
                { id: 'owner', label: 'Fundador / Empresário Estabelecido', desc: 'Já tenho uma empresa ativa e procuro inovar e obter ferramentas de IA.' }
              ].map(opt => {
                const isSelected = answers.profile === opt.id;
                const isHovered = hoveredOptions[opt.id] || false;
                return (
                  <button
                    key={opt.id}
                    onClick={() => setAnswers(prev => ({ ...prev, profile: opt.id }))}
                    onMouseEnter={() => setHoveredState(opt.id, true)}
                    onMouseLeave={() => setHoveredState(opt.id, false)}
                    style={{
                      padding: '16px 20px',
                      backgroundColor: isSelected ? 'rgba(248, 56, 33, 0.08)' : (isHovered ? 'rgba(255, 255, 255, 0.03)' : 'rgba(255, 255, 255, 0.01)'),
                      border: isSelected ? '1px solid rgba(248, 56, 33, 0.6)' : '1px solid rgba(255, 255, 255, 0.05)',
                      borderRadius: '16px',
                      textAlign: 'left',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      transition: 'all 0.2s ease',
                      boxShadow: isSelected ? '0 0 15px rgba(248, 56, 33, 0.08)' : 'none'
                    }}
                    type="button"
                  >
                    <div style={{ paddingRight: '16px' }}>
                      <div style={{ fontWeight: 700, fontSize: '15px', color: isSelected ? '#f83821' : '#fff', transition: 'color 0.2s' }}>{opt.label}</div>
                      <div style={{ fontSize: '12px', color: '#8892b0', marginTop: '4px' }}>{opt.desc}</div>
                    </div>
                    <div style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      border: isSelected ? '1px solid #f83821' : '1px solid rgba(255, 255, 255, 0.1)',
                      backgroundColor: isSelected ? '#f83821' : 'transparent',
                      color: isSelected ? '#fff' : 'transparent',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      transition: 'all 0.2s ease'
                    }}>
                      <Check size={12} strokeWidth={3} />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        );

      case 2:
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                margin: '0 auto 12px',
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                backgroundColor: 'rgba(0, 17, 253, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#0011fd',
                boxShadow: '0 0 15px rgba(0, 17, 253, 0.1)'
              }}>
                <Target size={20} />
              </div>
              <h3 style={{ fontSize: '22px', fontWeight: 700, color: '#fff', letterSpacing: '-0.5px' }}>Quais são os seus objetivos principais?</h3>
              <p style={{ color: '#8892b0', fontSize: '14px', marginTop: '6px' }}>Selecione todas as opções que fazem sentido para a sua jornada.</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { id: 'ideas', label: 'Encontrar ideias de negócio viáveis e validadas', icon: '💡' },
                { id: 'courses', label: 'Aprender com programas práticos e cursos de escala', icon: '🎓' },
                { id: 'documents', label: 'Gerar documentação estratégica e relatórios de IA', icon: '📝' },
                { id: 'networking', label: 'Ligar-me a uma comunidade global de fundadores', icon: '🤝' }
              ].map(opt => {
                const isSelected = answers.goals.includes(opt.id);
                const isHovered = hoveredOptions[opt.id] || false;
                return (
                  <button
                    key={opt.id}
                    onClick={() => toggleGoal(opt.id)}
                    onMouseEnter={() => setHoveredState(opt.id, true)}
                    onMouseLeave={() => setHoveredState(opt.id, false)}
                    style={{
                      padding: '16px 20px',
                      backgroundColor: isSelected ? 'rgba(248, 56, 33, 0.08)' : (isHovered ? 'rgba(255, 255, 255, 0.03)' : 'rgba(255, 255, 255, 0.01)'),
                      border: isSelected ? '1px solid rgba(248, 56, 33, 0.6)' : '1px solid rgba(255, 255, 255, 0.05)',
                      borderRadius: '16px',
                      textAlign: 'left',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      transition: 'all 0.2s ease',
                      boxShadow: isSelected ? '0 0 15px rgba(248, 56, 33, 0.08)' : 'none'
                    }}
                    type="button"
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <span style={{ fontSize: '22px' }}>{opt.icon}</span>
                      <span style={{ fontWeight: 700, fontSize: '15px', color: isSelected ? '#f83821' : '#fff', transition: 'color 0.2s' }}>{opt.label}</span>
                    </div>
                    <div style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      border: isSelected ? '1px solid #f83821' : '1px solid rgba(255, 255, 255, 0.1)',
                      backgroundColor: isSelected ? '#f83821' : 'transparent',
                      color: isSelected ? '#fff' : 'transparent',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      transition: 'all 0.2s ease'
                    }}>
                      <Check size={12} strokeWidth={3} />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        );

      case 3:
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                margin: '0 auto 12px',
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                backgroundColor: 'rgba(168, 85, 247, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#a855f7',
                boxShadow: '0 0 15px rgba(168, 85, 247, 0.1)'
              }}>
                <Sparkles size={20} />
              </div>
              <h3 style={{ fontSize: '22px', fontWeight: 700, color: '#fff', letterSpacing: '-0.5px' }}>Que áreas de mercado lhe interessam?</h3>
              <p style={{ color: '#8892b0', fontSize: '14px', marginTop: '6px' }}>Selecione pelo menos duas opções para otimizarmos a curadoria.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              {[
                { id: 'saas', label: 'Software & SaaS', icon: '💻' },
                { id: 'ecommerce', label: 'E-commerce', icon: '🛒' },
                { id: 'ai', label: 'Inteligência Artificial', icon: '🤖' },
                { id: 'education', label: 'Educação Digital', icon: '📚' },
                { id: 'agency', label: 'Agências & Serviços', icon: '💼' },
                { id: 'realestate', label: 'Imobiliário & Investimento', icon: '🏢' }
              ].map(opt => {
                const isSelected = answers.interests.includes(opt.id);
                const isHovered = hoveredOptions[opt.id] || false;
                return (
                  <button
                    key={opt.id}
                    onClick={() => toggleInterest(opt.id)}
                    onMouseEnter={() => setHoveredState(opt.id, true)}
                    onMouseLeave={() => setHoveredState(opt.id, false)}
                    style={{
                      padding: '20px 16px',
                      backgroundColor: isSelected ? 'rgba(248, 56, 33, 0.08)' : (isHovered ? 'rgba(255, 255, 255, 0.03)' : 'rgba(255, 255, 255, 0.01)'),
                      border: isSelected ? '1px solid rgba(248, 56, 33, 0.6)' : '1px solid rgba(255, 255, 255, 0.05)',
                      borderRadius: '16px',
                      textAlign: 'left',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px',
                      transition: 'all 0.2s ease',
                      boxShadow: isSelected ? '0 0 15px rgba(248, 56, 33, 0.08)' : 'none'
                    }}
                    type="button"
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                      <span style={{ fontSize: '24px' }}>{opt.icon}</span>
                      <div style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        border: isSelected ? '1px solid #f83821' : '1px solid rgba(255, 255, 255, 0.1)',
                        backgroundColor: isSelected ? '#f83821' : 'transparent',
                        color: isSelected ? '#fff' : 'transparent',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.2s ease'
                      }}>
                        <Check size={12} strokeWidth={3} />
                      </div>
                    </div>
                    <span style={{ fontWeight: 700, fontSize: '14px', color: isSelected ? '#f83821' : '#fff', transition: 'color 0.2s' }}>{opt.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        );

      case 4:
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                margin: '0 auto 12px',
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#10b981',
                boxShadow: '0 0 15px rgba(16, 185, 129, 0.1)'
              }}>
                <Palette size={20} />
              </div>
              <h3 style={{ fontSize: '22px', fontWeight: 700, color: '#fff', letterSpacing: '-0.5px' }}>Que estilo de marca prefere?</h3>
              <p style={{ color: '#8892b0', fontSize: '14px', marginTop: '6px' }}>Isto configurará os algoritmos do gerador de logótipos e marcas.</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { id: 'minimalist', label: 'Minimalista & Limpo', desc: 'Tipografia fina, muito espaço em branco, tons sóbrios. Foco na sofisticação moderna.' },
                { id: 'tech', label: 'Tecnológico & Neon', desc: 'Cores de alto contraste, elementos gráficos futuristas. Ideal para startups e IA.' },
                { id: 'luxury', label: 'Luxuoso & Premium', desc: 'Tons dourados e pretos, serifas clássicas. Foco no mercado corporativo e de alto nível.' },
                { id: 'classic', label: 'Clássico & Corporativo', desc: 'Formatos geométricos e paletes sólidas. Transmite estabilidade, prestígio e segurança.' }
              ].map(opt => {
                const isSelected = answers.style === opt.id;
                const isHovered = hoveredOptions[opt.id] || false;
                return (
                  <button
                    key={opt.id}
                    onClick={() => setAnswers(prev => ({ ...prev, style: opt.id }))}
                    onMouseEnter={() => setHoveredState(opt.id, true)}
                    onMouseLeave={() => setHoveredState(opt.id, false)}
                    style={{
                      padding: '16px 20px',
                      backgroundColor: isSelected ? 'rgba(248, 56, 33, 0.08)' : (isHovered ? 'rgba(255, 255, 255, 0.03)' : 'rgba(255, 255, 255, 0.01)'),
                      border: isSelected ? '1px solid rgba(248, 56, 33, 0.6)' : '1px solid rgba(255, 255, 255, 0.05)',
                      borderRadius: '16px',
                      textAlign: 'left',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      transition: 'all 0.2s ease',
                      boxShadow: isSelected ? '0 0 15px rgba(248, 56, 33, 0.08)' : 'none'
                    }}
                    type="button"
                  >
                    <div style={{ paddingRight: '16px' }}>
                      <div style={{ fontWeight: 700, fontSize: '15px', color: isSelected ? '#f83821' : '#fff', transition: 'color 0.2s' }}>{opt.label}</div>
                      <div style={{ fontSize: '12px', color: '#8892b0', marginTop: '4px' }}>{opt.desc}</div>
                    </div>
                    <div style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      border: isSelected ? '1px solid #f83821' : '1px solid rgba(255, 255, 255, 0.1)',
                      backgroundColor: isSelected ? '#f83821' : 'transparent',
                      color: isSelected ? '#fff' : 'transparent',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      transition: 'all 0.2s ease'
                    }}>
                      <Check size={12} strokeWidth={3} />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        );

      case 5:
        if (showFinishedCard) {
          return (
            <div style={{ textAlign: 'center', padding: '16px 0', display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'center' }}>
              <div style={{ position: 'relative', width: '80px', height: '80px' }}>
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '50%',
                  backgroundColor: 'rgba(248, 56, 33, 0.2)',
                  animation: 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite'
                }} />
                <div style={{
                  position: 'relative',
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(26, 34, 44, 0.9)',
                  border: '1px solid rgba(248, 56, 33, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Award size={36} style={{ color: '#f83821' }} />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <h3 style={{ fontSize: '24px', fontWeight: 700, color: '#fff', letterSpacing: '-0.5px' }}>Configuração Concluída!</h3>
                <p style={{ color: '#8892b0', fontSize: '14px', maxWidth: '380px', margin: '0 auto', lineHeight: 1.4 }}>
                  O seu motor de inteligência e conhecimento do fundador está pronto. Desbloqueámos no seu painel:
                </p>
              </div>

              <div style={{
                backgroundColor: 'rgba(10, 15, 22, 0.8)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                borderRadius: '16px',
                padding: '20px',
                width: '100%',
                maxWidth: '440px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                textAlign: 'left'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#f83821', flexShrink: 0 }}></div>
                  <span style={{ fontSize: '14px', color: '#e5e0e7', fontWeight: 600 }}>💡 Gerador de Ideias Bisnoteka (Acesso Completo)</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#f83821', flexShrink: 0 }}></div>
                  <span style={{ fontSize: '14px', color: '#e5e0e7', fontWeight: 600 }}>🎓 Recomendações de Cursos Personalizadas</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#f83821', flexShrink: 0 }}></div>
                  <span style={{ fontSize: '14px', color: '#e5e0e7', fontWeight: 600 }}>📝 Ferramentas de Branding & Pitch Deck IA</span>
                </div>
              </div>

              <button
                onClick={handleFinalRedirect}
                onMouseEnter={() => setHoveredNext(true)}
                onMouseLeave={() => setHoveredNext(false)}
                style={{
                  width: '100%',
                  maxWidth: '440px',
                  padding: '15px',
                  background: hoveredNext ? 'linear-gradient(135deg, #ff4c36 0%, #e22b15 100%)' : 'linear-gradient(135deg, #f83821 0%, #d6220e 100%)',
                  color: '#fff',
                  fontSize: '14px',
                  fontWeight: 700,
                  border: 'none',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '10px',
                  boxShadow: hoveredNext ? '0 8px 24px rgba(248, 56, 33, 0.3)' : '0 4px 14px rgba(248, 56, 33, 0.2)',
                  transform: hoveredNext ? 'translateY(-1px)' : 'none',
                  transition: 'all 0.3s ease'
                }}
                type="button"
              >
                Aceder ao Painel de Membros
                <ArrowRight size={16} />
              </button>
            </div>
          );
        }

        return (
          <div style={{ textAlign: 'center', padding: '32px 0', display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'center' }}>
            <div style={{ position: 'relative', width: '96px', height: '96px' }}>
              <div style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '50%',
                backgroundColor: 'rgba(248, 56, 33, 0.15)',
                animation: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite'
              }} />
              <div style={{
                position: 'relative',
                width: '96px',
                height: '96px',
                borderRadius: '50%',
                backgroundColor: '#0d131b',
                border: '1px solid rgba(248, 56, 33, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Cpu size={40} style={{ color: '#f83821', animation: 'spin 3s linear infinite' }} />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <h3 style={{ fontSize: '24px', fontWeight: 700, color: '#fff', letterSpacing: '-0.5px' }}>Mapeamento Inteligente</h3>
              <p style={{ color: '#8892b0', fontSize: '14px', maxWidth: '380px', margin: '0 auto', lineHeight: 1.4 }}>
                A nossa IA está a estruturar as suas ferramentas exclusivas de fundação.
              </p>
            </div>

            <div style={{
              backgroundColor: '#080d14',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              borderRadius: '16px',
              padding: '16px',
              width: '100%',
              maxWidth: '440px',
              textAlign: 'left',
              fontFamily: 'monospace',
              fontSize: '11px',
              height: '128px',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'end'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10b981', marginBottom: '8px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '4px' }}>
                <ShieldCheck size={16} />
                <span>Bisnoteka Engine v1.0.0</span>
              </div>
              <div style={{ color: 'rgba(136, 146, 176, 0.6)', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                {simulationStepIndex > 0 && <div>[OK] A iniciar o compilador...</div>}
                {simulationStepIndex > 1 && <div>[OK] A carregar perfil do utilizador...</div>}
                {simulationStepIndex > 2 && <div>[OK] A estruturar base de dados...</div>}
                {simulationStepIndex > 3 && <div>[OK] A selecionar curadoria de cursos...</div>}
              </div>
              <div style={{ color: '#f83821', fontWeight: 'bold', marginTop: '6px', animation: 'pulse 1s infinite' }}>
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
        @keyframes ping {
          75%, 100% { transform: scale(2); opacity: 0; }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: .5; }
        }
      `}</style>

      {/* Ambient backgrounds */}
      <div style={{
        position: 'absolute',
        top: '-20%',
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
        bottom: '-20%',
        right: '-10%',
        width: '600px',
        height: '600px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,17,253,0.06) 0%, rgba(0,17,253,0) 70%)',
        filter: 'blur(80px)',
        pointerEvents: 'none'
      }} />

      <div style={{ width: '100%', maxWidth: '600px', zIndex: 10 }}>
        {/* Step Progress Header */}
        {currentStep < 5 && (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', padding: '0 16px' }}>
            <img src="/LOGO H.svg" alt="Bisnoteka" style={{ height: '24px' }} />
            <div style={{ display: 'flex', gap: '10px', width: '200px' }}>
              {steps.slice(0, 4).map(step => (
                <div key={step.id} style={{ position: 'relative', flexGrow: 1, height: '6px', borderRadius: '4px', overflow: 'hidden', backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
                  <div 
                    style={{
                      height: '100%',
                      background: 'linear-gradient(90deg, #f83821, #d6220e)',
                      width: currentStep >= step.id ? '100%' : '0%',
                      transition: 'width 0.5s ease'
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Wizard Card Container */}
        <div style={{
          backgroundColor: 'rgba(16, 23, 31, 0.75)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          borderRadius: '24px',
          padding: '40px 32px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          position: 'relative'
        }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep + (showFinishedCard ? '-done' : '')}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderStepContent()}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          {currentStep < 5 && (
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: '32px',
              paddingTop: '24px',
              borderTop: '1px solid rgba(255, 255, 255, 0.05)'
            }}>
              <button
                onClick={handleBack}
                disabled={currentStep === 1}
                onMouseEnter={() => setHoveredBack(true)}
                onMouseLeave={() => setHoveredBack(false)}
                style={{
                  padding: '10px 16px',
                  backgroundColor: hoveredBack && currentStep !== 1 ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  color: currentStep === 1 ? '#4b5563' : '#e5e0e7',
                  borderRadius: '12px',
                  fontSize: '14px',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: currentStep === 1 ? 'not-allowed' : 'pointer',
                  opacity: currentStep === 1 ? 0.3 : 1,
                  transition: 'all 0.2s'
                }}
                type="button"
              >
                <ArrowLeft size={16} />
                Voltar
              </button>

              <button
                onClick={handleNext}
                disabled={isNextDisabled()}
                onMouseEnter={() => setHoveredNext(true)}
                onMouseLeave={() => setHoveredNext(false)}
                style={{
                  padding: '10px 20px',
                  background: isNextDisabled() 
                    ? 'rgba(255, 255, 255, 0.05)' 
                    : (hoveredNext ? 'linear-gradient(135deg, #ff4c36 0%, #e22b15 100%)' : 'linear-gradient(135deg, #f83821 0%, #d6220e 100%)'),
                  color: isNextDisabled() ? '#4b5563' : '#fff',
                  borderRadius: '12px',
                  fontSize: '14px',
                  fontWeight: 700,
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: isNextDisabled() ? 'not-allowed' : 'pointer',
                  opacity: isNextDisabled() ? 0.4 : 1,
                  boxShadow: isNextDisabled() ? 'none' : (hoveredNext ? '0 8px 24px rgba(248, 56, 33, 0.3)' : '0 4px 14px rgba(248, 56, 33, 0.2)'),
                  transform: hoveredNext && !isNextDisabled() ? 'translateY(-1px)' : 'none',
                  transition: 'all 0.2s'
                }}
                type="button"
              >
                {currentStep === 4 ? 'Finalizar Perfil' : 'Continuar'}
                <ArrowRight size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;
