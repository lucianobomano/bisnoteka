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
  Target
} from 'lucide-react';

const FaundrForgePage: React.FC = () => {
  return (
    <div className="bg-[#f8f9fa] min-h-screen text-[#10171f] font-sans">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 px-4 bg-white overflow-hidden">
        <div className="container mx-auto max-w-6xl relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="inline-block px-4 py-1.5 rounded-full bg-[#f83821]/10 text-[#f83821] font-semibold text-sm mb-6 uppercase tracking-wider">
              Aceleradora de Negócios
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.1] mb-8 text-[#10171f]">
              A fundação inabalável <br className="hidden md:block"/> para o seu império.
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              Um programa intensivo de 3 meses focado em estruturar, escalar e forjar o seu negócio com bases inabaláveis. Transforme o seu potencial em resultados reais.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/cadastro" className="w-full sm:w-auto px-8 py-4 bg-[#f83821] text-white font-bold rounded-lg hover:bg-[#d6220e] transition-all flex items-center justify-center gap-2 shadow-xl shadow-red-500/20 text-lg">
                Garantir a Minha Vaga <ArrowRight size={20} />
              </Link>
              <a href="#programa" className="w-full sm:w-auto px-8 py-4 bg-transparent text-[#10171f] font-bold rounded-lg border border-gray-300 hover:bg-gray-50 transition-all flex items-center justify-center text-lg">
                Ver o Programa
              </a>
            </div>
            
            <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-gray-500 text-sm font-medium">
              <div className="flex items-center gap-2"><ShieldCheck size={18} className="text-[#f83821]"/> Acesso Exclusivo</div>
              <div className="flex items-center gap-2"><Zap size={18} className="text-[#f83821]"/> Aplicação Prática</div>
              <div className="flex items-center gap-2"><Target size={18} className="text-[#f83821]"/> Resultados Mensuráveis</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. O QUE ESTÁ INCLUÍDO (PILARES) */}
      <section id="programa" className="py-24 bg-[#f8f9fa] px-4 border-t border-gray-200">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-[#10171f] tracking-tight mb-4">Os 6 Pilares do Faundr Forge</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Tudo o que precisa para estruturar o seu negócio de forma profissional e escalável.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: <Building2 size={32}/>, title: "Arquitetura de Negócio", desc: "Estruture o seu modelo de negócio, operações e processos internos para máxima eficiência operacional." },
              { icon: <Palette size={32}/>, title: "Branding & Posicionamento", desc: "Crie uma marca magnética e um posicionamento de mercado impossível de ser ignorado pela concorrência." },
              { icon: <TrendingUp size={32}/>, title: "Estratégia de Marketing", desc: "Sistemas de aquisição de clientes previsíveis, funis de conversão e estratégias de retenção avançadas." },
              { icon: <Scaling size={32}/>, title: "Escala e Crescimento", desc: "Táticas de growth hacking, expansão de mercado e otimização de vendas para multiplicar o seu volume." },
              { icon: <LineChart size={32}/>, title: "Finanças e Contabilidade", desc: "Domine os números do seu negócio. Fluxo de caixa, margens de lucro, projeções e planeamento fiscal." },
              { icon: <Network size={32}/>, title: "Networking Estratégico", desc: "Acesso a uma rede exclusiva de fundadores e parceiros estratégicos para alavancar os seus resultados." }
            ].map((module, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 group"
              >
                <div className="w-16 h-16 rounded-xl bg-gray-50 flex items-center justify-center text-[#f83821] mb-6 group-hover:scale-110 group-hover:bg-[#f83821]/10 transition-all">
                  {module.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-[#10171f]">{module.title}</h3>
                <p className="text-gray-600 leading-relaxed">{module.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. ROADMAP 3 MESES */}
      <section className="py-24 bg-white px-4 border-t border-gray-200">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-[#10171f] tracking-tight mb-4">O Ciclo de 3 Meses</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Um roadmap claro e acionável focado em execução e resultados rápidos.</p>
          </div>

          <div className="flex flex-col md:flex-row gap-8 relative">
            {/* Connecting Line Desktop */}
            <div className="hidden md:block absolute top-12 left-0 w-full h-1 bg-gray-100 z-0"></div>

            {[
              { 
                month: "Mês 1", 
                title: "Fundações & Estrutura", 
                items: ["Diagnóstico profundo do negócio", "Definição do modelo de negócio", "Estratégia de Branding", "Mapeamento de Processos"]
              },
              { 
                month: "Mês 2", 
                title: "Tração & Aquisição", 
                items: ["Criação de Funis de Vendas", "Estratégias de Tráfego", "Otimização de Conversão", "Máquina de Vendas previsível"]
              },
              { 
                month: "Mês 3", 
                title: "Escala & Otimização", 
                items: ["Gestão Financeira Avançada", "Sistemas de Delegação", "Networking Estratégico", "Planeamento de Escala"]
              }
            ].map((phase, idx) => (
              <div key={idx} className="flex-1 relative z-10">
                <div className="w-24 h-24 rounded-full bg-white border-4 border-gray-100 flex items-center justify-center shadow-lg mx-auto mb-8 text-[#f83821] font-black text-xl">
                  {phase.month}
                </div>
                <div className="bg-[#f8f9fa] rounded-2xl p-8 border border-gray-200 h-full">
                  <h3 className="text-2xl font-bold text-center mb-6 text-[#10171f]">{phase.title}</h3>
                  <ul className="space-y-4">
                    {phase.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 size={20} className="text-[#f83821] flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. A PORTA DE ENTRADA (GATEWAY) */}
      <section className="py-24 bg-[#0c1219] text-white px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#0011fd]/20 via-transparent to-transparent pointer-events-none"></div>
        
        <div className="container mx-auto max-w-5xl relative z-10 text-center">
          <div className="inline-block px-4 py-1.5 rounded-full bg-[#0011fd]/20 text-[#60a5fa] font-semibold text-sm mb-6 uppercase tracking-wider border border-[#0011fd]/30">
            A Etapa Seguinte
          </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-8">
            O seu bilhete para o <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-600">Faundr Xperience</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed mb-12">
            O Faundr Forge não é o destino final. É o campo de treino intensivo obrigatório. A graduação com sucesso neste programa é o único caminho para garantir o acesso ao nosso ecossistema de elite: o <strong className="text-white">Faundr Xperience</strong>.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto text-left">
            <div className="bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-sm">
              <h4 className="text-xl font-bold text-white mb-3">Acesso Restrito</h4>
              <p className="text-gray-400">Apenas os negócios que provam a sua estrutura e capacidade de execução no Forge recebem o convite para o nível seguinte.</p>
            </div>
            <div className="bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-sm">
              <h4 className="text-xl font-bold text-white mb-3">Rede de Elite</h4>
              <p className="text-gray-400">No Xperience, sentar-se-á à mesa com fundadores que já escalaram múltiplos negócios com faturamentos expressivos.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FINAL CTA */}
      <section className="py-24 bg-[#f83821] text-white px-4 text-center">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">Pronto para forjar o seu império?</h2>
          <p className="text-xl mb-10 text-white/90">As vagas para a próxima turma são limitadas. Inscreva-se agora e garanta o seu lugar na vanguarda dos negócios estruturados.</p>
          <Link to="/cadastro" className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-white text-[#f83821] font-black rounded-xl hover:bg-gray-100 hover:scale-105 transition-all shadow-2xl text-lg uppercase tracking-wide">
            Garantir a minha vaga agora <ArrowRight size={24} />
          </Link>
        </div>
      </section>

    </div>
  );
};

export default FaundrForgePage;
