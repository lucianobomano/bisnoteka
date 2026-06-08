import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  Palette, 
  TrendingUp, 
  Scaling, 
  LineChart, 
  Network,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Zap,
  Target,
  ChevronRight
} from 'lucide-react';

const FaundrForgePage: React.FC = () => {
  return (
    <div className="bg-[#fcfcfd] min-h-screen text-[#050505] font-sans selection:bg-[#f83821] selection:text-white">
      
      {/* 1. HERO SECTION - PREMIUM EDITORIAL VIBE */}
      <section className="relative pt-40 pb-32 md:pt-56 md:pb-40 px-4 overflow-hidden flex flex-col justify-center min-h-[90vh]">
        {/* Subtle grid background */}
        <div className="absolute inset-0 z-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(to right, #00000008 1px, transparent 1px), linear-gradient(to bottom, #00000008 1px, transparent 1px)', backgroundSize: '64px 64px', maskImage: 'radial-gradient(ellipse at center, black, transparent 80%)', WebkitMaskImage: 'radial-gradient(ellipse at center, black, transparent 80%)' }}></div>
        
        {/* Soft glowing orb behind the text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#f83821]/5 blur-[120px] rounded-full pointer-events-none z-0"></div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-8"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-black/10 bg-white/50 backdrop-blur-md mb-8">
                <span className="flex h-2 w-2 rounded-full bg-[#f83821] animate-pulse"></span>
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#050505]">Programa de Aceleração • 3 Meses</span>
              </div>
              
              <h1 className="text-6xl md:text-[6rem] font-black tracking-tighter leading-[0.95] mb-8 text-[#050505]">
                A base inabalável para <br className="hidden md:block"/> escalar o seu <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(90deg, #f83821, #b91c1c)' }}>império.</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-500 mb-12 max-w-2xl leading-relaxed font-light">
                O <strong className="font-bold text-[#050505]">Faundr Forge</strong> não é um curso. É um ecossistema intensivo desenhado para forjar modelos de negócio altamente escaláveis e lucrativos.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-5">
                <Link to="/cadastro" className="group relative w-full sm:w-auto overflow-hidden rounded-full p-[1px] transition-all hover:scale-105" style={{ boxShadow: '0 0 40px -10px rgba(248,56,33,0.5)' }}>
                  <span className="absolute inset-0 rounded-full" style={{ backgroundImage: 'linear-gradient(to right, #f83821, #b91c1c)' }}></span>
                  <div className="relative flex items-center justify-center gap-3 px-10 py-5 rounded-full font-bold text-lg uppercase tracking-wide transition-all group-hover:bg-transparent" style={{ backgroundColor: '#f83821', color: 'white' }}>
                    Garantir Lugar na Turma <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
                <a href="#programa" className="group flex items-center gap-2 px-8 py-5 font-bold text-lg hover:text-[#f83821] transition-colors" style={{ color: '#050505' }}>
                  Ver o currículo completo <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="lg:col-span-4 hidden lg:flex flex-col gap-6"
            >
              {/* Premium abstract stats cards */}
              <div className="p-8 rounded-[2rem] bg-white border border-gray-100 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] backdrop-blur-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#f83821]/5 rounded-full blur-2xl"></div>
                <ShieldCheck size={32} className="text-[#f83821] mb-6" />
                <h4 className="text-4xl font-black text-[#050505] mb-2 tracking-tight">100%</h4>
                <p className="text-sm font-medium text-gray-500 uppercase tracking-widest">Metodologia Testada</p>
              </div>
              <div className="p-8 rounded-[2rem] bg-[#050505] text-white border border-white/10 shadow-2xl relative overflow-hidden">
                <Target size={32} className="text-white/50 mb-6" />
                <h4 className="text-4xl font-black text-white mb-2 tracking-tight">3 Meses</h4>
                <p className="text-sm font-medium text-white/50 uppercase tracking-widest">Transformação Total</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. O QUE ESTÁ INCLUÍDO (PILARES) - MINIMAL HIGH CONTRAST */}
      <section id="programa" className="py-32 px-4 relative bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-3xl">
              <h2 className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#f83821] mb-4">O Arsenal Completo</h2>
              <h3 className="text-5xl md:text-6xl font-black text-[#050505] tracking-tighter leading-none">
                Engenharia de <br className="hidden md:block"/> Alto Nível.
              </h3>
            </div>
            <p className="text-xl text-gray-500 max-w-md font-light leading-relaxed">
              O currículo foi desenhado com precisão cirúrgica para extrair o máximo potencial do seu modelo de negócio em 90 dias.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-100 p-px rounded-3xl overflow-hidden shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)]">
            {[
              { icon: <Building2 size={28}/>, title: "Arquitetura Operacional", desc: "Estruture processos internos à prova de bala, desenhados para funcionar e escalar sem a sua dependência diária." },
              { icon: <Palette size={28}/>, title: "Branding de Autoridade", desc: "Posicionamento magnético que torna a concorrência irrelevante e justifica uma precificação premium imediata." },
              { icon: <TrendingUp size={28}/>, title: "Sistemas de Aquisição", desc: "Construção de funis de conversão validados e máquinas de vendas previsíveis que atraem clientes qualificados 24/7." },
              { icon: <Scaling size={28}/>, title: "Mecânicas de Escala", desc: "Táticas agressivas de growth, alavancagem de mercado e otimização de conversão para multiplicar o seu volume de receita." },
              { icon: <LineChart size={28}/>, title: "Mestria Financeira", desc: "Painéis de controlo de CEO. Domine o fluxo de caixa, expansão de margens de lucro, projeções e elisão fiscal inteligente." },
              { icon: <Network size={28}/>, title: "Networking de Elite", desc: "Acesso vitalício a uma irmandade de fundadores ambiciosos e parcerias estratégicas que aceleram resultados." }
            ].map((module, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white p-12 hover:bg-[#fafafa] transition-colors duration-500 group relative"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#f83821] to-[#b91c1c] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                <div className="w-14 h-14 rounded-2xl bg-[#050505] flex items-center justify-center text-white mb-8 shadow-lg group-hover:shadow-[#f83821]/20 group-hover:-translate-y-1 transition-all duration-300">
                  {module.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-[#050505] tracking-tight">{module.title}</h3>
                <p className="text-gray-500 leading-relaxed font-light">{module.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. ROADMAP 3 MESES - INFOGRAPHIC STYLE */}
      <section className="py-32 bg-[#fafafa] px-4 relative border-t border-gray-100">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-24">
            <h2 className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#f83821] mb-4">Metodologia Forge</h2>
            <h3 className="text-5xl md:text-6xl font-black text-[#050505] tracking-tighter mb-6">90 Dias para o Impacto</h3>
            <div className="w-24 h-1 bg-[#f83821] mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative">
            {/* Minimal line connecting steps */}
            <div className="hidden lg:block absolute top-8 left-[10%] right-[10%] h-px bg-gray-200 z-0"></div>

            {[
              { 
                month: "01", 
                title: "Fundações & Clareza", 
                desc: "Destruir os vícios antigos e reconstruir o modelo de negócio numa base preparada para receber volume pesado de clientes.",
                items: ["Diagnóstico profundo do negócio", "Definição do modelo de negócio", "Estratégia de Branding", "Mapeamento de Processos"]
              },
              { 
                month: "02", 
                title: "Tração & Volume", 
                desc: "Implementar a infraestrutura de vendas e de captação. O foco passa a ser puramente aquisição previsível e matemática.",
                items: ["Criação de Funis de Vendas", "Estratégias de Tráfego", "Otimização de Conversão", "Máquina de Vendas previsível"]
              },
              { 
                month: "03", 
                title: "Otimização & Escala", 
                desc: "Afinar os motores. Reduzir atrito, aumentar Lifetime Value (LTV) e delegar a operação para focar na estratégia macro.",
                items: ["Gestão Financeira Avançada", "Sistemas de Delegação", "Networking Estratégico", "Planeamento de Escala"]
              }
            ].map((phase, idx) => (
              <div key={idx} className="relative z-10 flex flex-col">
                <div className="w-16 h-16 rounded-2xl bg-[#050505] text-white flex items-center justify-center font-black text-2xl shadow-xl mb-10 mx-auto lg:mx-0">
                  {phase.month}
                </div>
                <h4 className="text-3xl font-black text-[#050505] mb-4 tracking-tight text-center lg:text-left">{phase.title}</h4>
                <p className="text-gray-500 mb-8 font-light leading-relaxed text-center lg:text-left">{phase.desc}</p>
                
                <ul className="space-y-4 mt-auto">
                  {phase.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-4 p-4 rounded-xl hover:bg-white transition-colors border border-transparent hover:border-gray-100 hover:shadow-sm">
                      <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-[#f83821]/10 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-[#f83821]"></div>
                      </div>
                      <span className="text-[#050505] font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. A PORTA DE ENTRADA (GATEWAY) - ULTRA PREMIUM DARK MODE */}
      <section className="py-40 text-white px-4 relative overflow-hidden flex items-center justify-center" style={{ backgroundColor: '#050505' }}>
        {/* Cinematic deep glow effects */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none" style={{ backgroundImage: 'radial-gradient(ellipse at 80% 0%, rgba(248, 56, 33, 0.15), transparent 50%), radial-gradient(ellipse at 20% 100%, rgba(255, 255, 255, 0.05), transparent 50%)' }}></div>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' opacity=\'0.05\'/%3E%3C/svg%3E")', opacity: 0.4 }}></div>
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/20 bg-white/5 backdrop-blur-md mb-8">
                <ShieldCheck size={14} className="text-white" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white">Próximo Nível</span>
              </div>
              
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 leading-[1.05] text-white">
                O único bilhete <br />
                de acesso ao <br />
                <span className="text-transparent bg-clip-text italic pr-4" style={{ backgroundImage: 'linear-gradient(90deg, #ffffff, #a3a3a3)' }}>Xperience.</span>
              </h2>
              
              <p className="text-xl md:text-2xl font-light leading-relaxed mb-12 text-gray-400">
                O Faundr Forge é o campo de treino intensivo. A graduação com sucesso neste programa é o <strong className="text-white font-bold">pré-requisito absoluto</strong> para garantir o acesso ao nosso ecossistema privado de elite.
              </p>

              <div className="space-y-6">
                <div className="flex items-center gap-6 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl hover:bg-white/10 transition-colors cursor-default">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 size={24} className="text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-1">Acesso Estritamente Restrito</h4>
                    <p className="text-sm text-gray-400">Apenas os negócios estruturados e validados no Forge recebem o convite exclusivo.</p>
                  </div>
                </div>
                <div className="flex items-center gap-6 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl hover:bg-white/10 transition-colors cursor-default">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 size={24} className="text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-1">A Rede de Elite Definitiva</h4>
                    <p className="text-sm text-gray-400">No Xperience, sentar-se-á à mesa de fundadores com faturamentos multi-milionários.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Premium visual element right side */}
            <div className="relative hidden lg:block">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#f83821]/20 to-transparent blur-3xl rounded-full"></div>
              <div className="relative aspect-[4/5] rounded-[3rem] bg-gradient-to-br from-white/10 to-white/5 border border-white/20 p-2 backdrop-blur-2xl shadow-2xl flex flex-col">
                <div className="h-12 border-b border-white/10 flex items-center px-6 gap-2">
                  <div className="w-3 h-3 rounded-full bg-white/20"></div>
                  <div className="w-3 h-3 rounded-full bg-white/20"></div>
                  <div className="w-3 h-3 rounded-full bg-white/20"></div>
                </div>
                <div className="flex-1 p-10 flex flex-col justify-center items-center text-center">
                  <div className="w-24 h-24 mb-8">
                    <img src="/LOGO H.svg" alt="Bisnoteka" className="w-full h-full object-contain filter brightness-0 invert opacity-50" />
                  </div>
                  <h3 className="text-4xl font-black mb-4 uppercase tracking-widest text-white/90">Xperience</h3>
                  <p className="text-white/40 uppercase tracking-[0.3em] text-xs font-bold">Unlock Required</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FINAL CTA - HIGH CONTRAST BLOCK */}
      <section className="py-32 px-4 relative" style={{ backgroundColor: '#f83821' }}>
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter text-white leading-tight">
            Pronto para construir <br/> o seu legado?
          </h2>
          <p className="text-xl md:text-2xl mb-14 text-white/90 font-light max-w-2xl mx-auto">
            As vagas para a próxima turma limitam-se a garantir a qualidade de execução de cada membro. Tome a decisão hoje.
          </p>
          <Link to="/cadastro" className="group inline-flex items-center justify-center gap-4 px-12 py-6 rounded-full transition-all hover:-translate-y-1" style={{ backgroundColor: '#050505', color: 'white', boxShadow: '0 20px 40px -15px rgba(0,0,0,0.5)', textDecoration: 'none' }}>
            <span className="font-black text-xl uppercase tracking-widest text-white">Submeter Aplicação</span>
            <span className="p-2 rounded-full transition-colors" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
              <ArrowRight size={24} color="white" />
            </span>
          </Link>
          <p className="mt-8 text-sm text-white/70 font-medium uppercase tracking-widest">Ciclo Restrito • Lugares Limitados</p>
        </div>
      </section>

    </div>
  );
};

export default FaundrForgePage;
