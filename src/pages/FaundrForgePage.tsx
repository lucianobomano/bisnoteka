import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CheckCircle2,
  ArrowRight,
  ChevronDown,
  Play,
  Sparkles,
  ShieldCheck,
  Check,
  ChevronRight,
  ChevronLeft,
  Rocket,
  Award,
  Briefcase,
  Megaphone,
  DollarSign,
  BookOpen,
  Brain,
  Compass,
  TrendingUp,
  Zap
} from 'lucide-react';
import './FaundrForgePage.css';

const FaundrForgePage: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [slideIndex, setSlideIndex] = useState(3); // Start with Jordan Menard centered
  const [isPaused, setIsPaused] = useState(false);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const mentors = [
    { name: "Gretta van Riel", title: "Fundadora de 5 marcas multi-milionárias", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300" },
    { name: "Nathan Chan", title: "CEO @ Foundr Magazine, Empreendedor", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=300" },
    { name: "Alexa von Tobel", title: "Fundou LearnVest ($375M) & VC Investor", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=300" },
    { name: "Richard Branson", title: "Fundador do Grupo Virgin", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300" },
    { name: "Sabri Suby", title: "Fundador da King Kong Agency", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=300" },
    { name: "Armando Silva", title: "Especialista em Escala e Operação", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=300" },
    { name: "Mariana Costa", title: "Diretora de Growth e Funis de Vendas", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300" },
    { name: "Daniel Rocha", title: "Mestre de Tráfego e Lançamentos", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300" }
  ];

  const slides = [
    {
      course: "Start & Scale Your Store",
      author: "with Gretta van Riel",
      desc: "Learn how to launch and scale a multi-million dollar ecommerce store with a proven step-by-step blueprint.",
      img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600",
      color: "rgba(226, 157, 126, 0.9)"
    },
    {
      course: "Ecommerce Masterclass",
      author: "with Nathan Chan",
      desc: "Learn how to scale a business to a million dollars and build a massive, loyal brand following.",
      img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=600",
      color: "rgba(212, 117, 117, 0.9)"
    },
    {
      course: "Ecommerce Branding Blueprint",
      author: "with Camille Moore",
      desc: "Learn how to build a brand identity that creates memories, trust, and eliminates purchase anxiety.",
      img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=600",
      color: "rgba(125, 143, 169, 0.9)"
    },
    {
      course: "Crafting Winning Offers",
      author: "with Jordan Menard",
      desc: "Learn how to choose the right product and structure offers with high-converting creatives at the right time.",
      img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600",
      color: "rgba(226, 178, 126, 0.9)"
    },
    {
      course: "Sourcing Blueprint",
      author: "with James Hechem",
      desc: "Master the art of negotiating and sourcing products reliably with a proven logistics framework.",
      img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=600",
      color: "rgba(140, 169, 125, 0.9)"
    },
    {
      course: "Arquitetura Operacional",
      author: "with Armando Silva",
      desc: "Como organizar equipes, automatizar tarefas cotidianas e estruturar sua empresa para rodar sem você.",
      img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=600",
      color: "rgba(142, 117, 212, 0.9)"
    },
    {
      course: "Growth & Funis de Escala",
      author: "with Mariana Costa",
      desc: "Domine a engenharia por trás de funis de vendas de alta performance e atração em massa de leads qualificados.",
      img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600",
      color: "rgba(117, 212, 204, 0.9)"
    },
    {
      course: "Tráfego Pago de Elite",
      author: "with Daniel Rocha",
      desc: "Aprenda a criar, otimizar e escalar campanhas milionárias nas maiores redes de anúncios do mundo.",
      img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=600",
      color: "rgba(212, 117, 184, 0.9)"
    }
  ];

  const welcomeMentorsData = [
    { name: "Julie Hirsch", title: "ARQUITETA DE MARCAS SUSTENTÁVEIS", desc: "Siga os princípios da Julie para construir uma marca que enfatiza a sustentabilidade e práticas éticas, atraindo consumidores conscientes e gerando impacto.", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300" },
    { name: "Anaita Sarkar", title: "CONSTRUTORA DE MARCAS ECOMMERCE", desc: "Obtenha insights da jornada de Anaita para construir uma marca de ecommerce atraente, aplicando as suas técnicas para construir a sua presença e credibilidade online.", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=300" },
    { name: "Alicia Scott", title: "INOVADORA DE MARCAS DE BELEZA", desc: "Aproveite as experiências de Alicia na construção de uma marca de beleza de sucesso, empregando as suas estratégias para navegar na indústria e escalar o seu negócio.", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300" },
    { name: "Lauren & Brooke", title: "PIONEIRAS DA REVENDA DE MODA", desc: "Explore os métodos de Lauren e Brooke para transformar a revenda de moda num empreendimento rentável, aproveitando a sua experiência para o seu sucesso.", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300" },
    { name: "Harry Sanders", title: "ARQUITETO DE SEO", desc: "Adote as estratégias de SEO do Harry para elevar o ranking da sua loja nos motores de busca, impulsionando tráfego e vendas de forma orgânica.", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=300" },
    { name: "Binh Rey", title: "ESTRATEGISTA DE MARCAS", desc: "Aprenda com a experiência da Binh para registar eficazmente os seus produtos ou marca, salvaguardando a sua propriedade intelectual num mercado competitivo.", img: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=300" },
    { name: "Nat Choprasert", title: "ENGENHEIRO DE EFICIÊNCIA IA", desc: "Integre as técnicas baseadas em IA do Nat para automatizar tarefas, aumentando a eficiência e libertando tempo valioso para iniciativas estratégicas.", img: "https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&q=80&w=300" },
    { name: "Doone Roisin", title: "CONSTRUTORA DE MARCAS ECONÓMICAS", desc: "Abrace os princípios da Doone para construir uma marca de ecommerce de alto impacto com um orçamento reduzido, maximizando recursos para um crescimento sustentável.", img: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&q=80&w=300" }
  ];



  React.useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % slides.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [isPaused, slides.length]);

  const nextSlide = () => {
    setSlideIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setSlideIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const disciplinesData = [
    {
      title: "Empreendedorismo",
      desc: "Aprenda a olhar para o mercado sob uma perspectiva estratégica e identifique oportunidades de negócio escaláveis que a maioria das pessoas não vê."
    },
    {
      title: "Branding",
      desc: "Construa uma marca forte, magnética e com posicionamento premium para se diferenciar e dominar o seu nicho."
    },
    {
      title: "Gestão",
      desc: "Organize a sua operação, lidere equipas e crie processos eficientes para estruturar uma empresa que roda sem depender de si."
    },
    {
      title: "Marketing",
      desc: "Domine estratégias de aquisição de clientes, funis de conversão e marketing de conteúdo de alto impacto."
    },
    {
      title: "Finanças",
      desc: "Aprenda a controlar o seu fluxo de caixa, entender as métricas do seu negócio (unit economics) e planejar o crescimento de forma segura."
    },
    {
      title: "Contabilidade",
      desc: "Mantenha o seu negócio em total conformidade fiscal, faça o planejamento tributário correto e evite surpresas fiscais."
    },
    {
      title: "Mindset",
      desc: "Desenvolva a mentalidade resiliente e de foco necessária para tomar decisões de alto impacto sob pressão constante."
    },
    {
      title: "Hard e Soft skills",
      desc: "Desenvolva tanto as competências técnicas cruciais como as habilidades interpessoais de comunicação, liderança e negociação."
    },
    {
      title: "Propósito",
      desc: "Conheça as ferramentas que te vão ajudar a identificar o seu propósito, se conectar e empreender através dele."
    },
    {
      title: "Crescimento",
      desc: "Aplique metodologias ágeis de crescimento (growth) para acelerar a escala, reter clientes e expandir a sua quota de mercado."
    }
  ];

  const testimonials = [
    { quote: "O Faundr Forge não é um curso teórico. É o passo a passo absoluto que mudou de vez a operação da minha marca física.", name: "Vitor Henriques", company: "Fundador @ GearBox Auto", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100" },
    { quote: "Antes eu trabalhava sem rumo. Hoje eu tenho painéis de controle e metas financeiras claras de CEO. Minhas margens dobraram.", name: "Juliana Neves", company: "CEO @ Pure Skin Labs", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100" },
    { quote: "A mentoria direta e o acesso ao ecossistema Xperience são os ativos mais valiosos para qualquer empresário ambicioso.", name: "Gabriel Souza", company: "Diretor @ Nexus Tech", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100" }
  ];

  const faqItems = [
    { q: "O que é exatamente o Faundr Forge?", a: "O Faundr Forge é o nosso ecossistema de aceleração de negócios com duração intensiva de 3 meses (90 dias). Ele foi desenhado para estruturar e automatizar os processos, branding, captação e finanças de empresas de qualquer setor, preparando-as para uma escala rápida e previsível." },
    { q: "Como funciona o teste de 14 dias por R$ 9,00?", a: "Ao iniciar o teste, você adquire acesso completo a todas as aulas teóricas de mentores de elite, ferramentas do Business Creator, templates de processos e à comunidade privada por 14 dias. Se você não se sentir totalmente satisfeito, poderá cancelar o acesso a qualquer momento em 1 clique." },
    { q: "Quais mentores fazem parte do programa?", a: "Nosso corpo de mentores é constituído exclusivamente por fundadores que construíram empresas de faturamento de múltiplos milhões a bilhões de dólares. Nomes como Gretta van Riel, Richard Branson, Sabri Suby e especialistas focados em escala operacional e tráfego direto." },
    { q: "O Forge é indicado para quem está a começar do zero?", a: "Sim. O programa aborda desde a validação de ideias de negócios, precificação, branding magnético até sistemas avançados de delegação e escala, o que o torna ideal tanto para novos empreendedores como para negócios já estabelecidos." },
    { q: "Qual a relação entre o Faundr Forge e o Faundr Xperience?", a: "O Faundr Forge funciona como a porta de entrada e a fundação técnica obrigatória. Apenas as empresas estruturadas e aprovadas que passarem pela graduação do Forge recebem o convite exclusivo para se tornarem membros do Faundr Xperience, a nossa rede fechada VIP de fundadores milionários." },
    { q: "Existe alguma garantia de reembolso?", a: "Sim. Oferecemos uma dupla garantia incondicional e condicional de 90 dias. Se você aplicar as ferramentas nos primeiros 90 dias e provar que não obteve qualquer resultado, nós devolveremos 100% do seu investimento e daremos R$ 500 do nosso próprio bolso." }
  ];

  return (
    <div className="forge-page">

      {/* 1. TOP PROMO BANNER */}
      <div className="forge-promo-banner">
        <div className="forge-promo-content">
          <span className="forge-promo-badge">Oferta Limitada</span>
          <span className="forge-promo-text">
            Desbloqueie o seu negócio dos sonhos — Teste o Forge por 14 dias por apenas R$ 9,00
          </span>
          <Link to="/cadastro" className="forge-btn-secondary" style={{ color: 'white', padding: '0 10px', fontSize: '12px' }}>
            Experimentar agora <ArrowRight size={12} />
          </Link>
        </div>
      </div>

      {/* 2. HERO SECTION */}
      <section className="forge-hero">
        {/* Dotted SVG Map BG */}
        <div className="forge-hero-map-bg">
          <svg viewBox="0 0 1000 500" width="100%" height="100%" fill="currentColor">
            <path d="M150,150 Q180,120 220,160 T300,150 T400,180 T550,140 T700,160 T850,150" stroke="#f83821" strokeWidth="2" strokeDasharray="5,5" fill="none" opacity="0.3" />
            <circle cx="150" cy="150" r="4" fill="#f83821" className="animate-pulse" />
            <circle cx="220" cy="160" r="5" fill="#0011fd" />
            <circle cx="300" cy="150" r="4" fill="#f83821" />
            <circle cx="400" cy="180" r="6" fill="#fbc02d" />
            <circle cx="550" cy="140" r="4" fill="#f83821" />
            <circle cx="700" cy="160" r="5" fill="#0011fd" />
            <circle cx="850" cy="150" r="6" fill="#f83821" />
          </svg>
        </div>

        <div className="forge-hero-content">
          <span className="forge-hero-tag">Bem-vindo ao Faundr Forge</span>
          <h1 className="forge-hero-title">
            A base inabalável para <br /> começar a construir o seu <span>império.</span>
          </h1>
          <p className="forge-hero-subtitle">
            O <strong>Faundr Forge</strong> é um ecossistema intensivo desenhado especificamente para forjar modelos de negócio altamente escaláveis, rentáveis e previsíveis.
          </p>
          <div className="forge-hero-cta-group">
            <Link to="/cadastro" className="forge-btn-primary">
              Garantir meu acesso agora <ArrowRight size={18} />
            </Link>
            <a href="#detalhes" className="forge-btn-secondary">
              Ver o currículo completo <ChevronRight size={18} />
            </a>
          </div>
        </div>

        {/* Hero Mentor Slider Section */}
        <div className="forge-mentor-slider-section"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}>
          <div className="forge-mentor-slider-container">
            <button className="forge-mentor-slider-btn prev" onClick={prevSlide} aria-label="Slide Anterior">
              <ChevronLeft size={24} />
            </button>

            <div className="forge-mentor-slider-viewport">
              <div className="forge-mentor-slider-track">
                {slides.map((slide, index) => {
                  let offset = index - slideIndex;
                  const half = slides.length / 2;
                  if (offset < -half) {
                    offset += slides.length;
                  } else if (offset > half) {
                    offset -= slides.length;
                  }

                  const absOffset = Math.abs(offset);
                  const isActive = offset === 0;

                  // Dynamic style values for loop transitions
                  const scale = isActive ? 1.08 : absOffset === 1 ? 0.9 : 0.8;
                  const opacity = isActive ? 1 : absOffset === 1 ? 0.6 : absOffset === 2 ? 0.25 : 0;
                  const zIndex = 10 - absOffset;
                  const visibility = absOffset >= 3 ? 'hidden' : 'visible';
                  const pointerEvents = absOffset >= 2 ? 'none' : 'auto';

                  return (
                    <div className={`forge-mentor-slide-card ${isActive ? 'active' : ''}`}
                      key={index}
                      onClick={() => setSlideIndex(index)}
                      style={{
                        transform: `translateX(calc(${offset} * (var(--card-width) + var(--card-gap)))) scale(${scale})`,
                        opacity,
                        zIndex,
                        visibility,
                        pointerEvents
                      }}>
                      <img src={slide.img} alt={slide.course} />
                      <div className="forge-mentor-slide-card-overlay"
                        style={{
                          background: isActive
                            ? `linear-gradient(to top, ${slide.color} 0%, rgba(0,0,0,0.5) 60%, rgba(0,0,0,0.15) 100%)`
                            : undefined
                        }}>
                        <div className="forge-mentor-slide-course">{slide.course}</div>
                        <div className="forge-mentor-slide-author">{slide.author}</div>
                        <div className="forge-mentor-slide-desc">{slide.desc}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <button className="forge-mentor-slider-btn next" onClick={nextSlide} aria-label="Próximo Slide">
              <ChevronRight size={24} />
            </button>
          </div>

          <div className="forge-mentor-slider-dots">
            {slides.map((_, index) => (
              <button key={index}
                className={`forge-mentor-slider-dot ${index === slideIndex ? 'active' : ''}`}
                onClick={() => setSlideIndex(index)}
                aria-label={`Ir para slide ${index + 1}`} />
            ))}
          </div>
        </div>

        {/* Brands logos banner */}
        <div className="forge-logos-section">
          <div className="forge-logos-title">Nossos Fundadores Já Apareceram Em</div>
          <div className="forge-logos-container">
            <span style={{ fontSize: '18px', fontWeight: 900, color: '#aaa', fontFamily: 'Sora' }}>FORBES</span>
            <span style={{ fontSize: '18px', fontWeight: 900, color: '#aaa', fontFamily: 'Sora' }}>CNBC</span>
            <span style={{ fontSize: '18px', fontWeight: 900, color: '#aaa', fontFamily: 'Sora' }}>ENTREPRENEUR</span>
            <span style={{ fontSize: '18px', fontWeight: 900, color: '#aaa', fontFamily: 'Sora' }}>WSJ</span>
            <span style={{ fontSize: '18px', fontWeight: 900, color: '#aaa', fontFamily: 'Sora' }}>WIRED</span>
          </div>
        </div>
      </section>

      {/* 3. YELLOW SPLIT BANNER */}
      <section className="forge-yellow-banner">
        <div className="forge-yellow-left">
          <h2 className="forge-yellow-title">
            Quer começar a empreender do jeito certo e com confiança?
          </h2>
          <p className="forge-yellow-text">
            Num mundo cheio de soluções pouco fiáveis, o <strong>Faundr Forge</strong> fornece foco. Ajudamos a encontrar clareza, quer esteja a começar do zero ou a tentar crescer. Fazemos isso fornecendo as informações, ferramentas e recursos mais fiáveis e atualizados diretamente de líderes da indústria.
          </p>
          <p className="forge-yellow-text">
            Talvez ainda esteja a tentar encontrar a sua ideia, ou talvez esteja bloqueado no marketing da sua marca. Seja qual for o desafio, a nossa abordagem 360° irá guiar-lhe através de eventos da comunidade e cursos completos para o manter em movimento.
          </p>
          <p className="forge-yellow-footer-text">
            Desbloqueie o seu caminho de aprendizagem exclusivo e comece a crescer com o <strong>Faundr Forge</strong>
          </p>
        </div>
        <div className="forge-yellow-right">
          <img src="/media/yellow_banner_founder.png" alt="Founder Working" />
        </div>
      </section>

      {/* 4. WELCOME SECTION */}
      <section className="forge-welcome-section">
        <div className="forge-welcome-header">
          <h2 className="forge-welcome-title">Bem-vindo ao <span className="blue-ellipse-text">Faundr Forge<svg className="blue-ellipse-svg" viewBox="0 0 200 60" xmlns="http://www.w3.org/2000/svg"><ellipse cx="100" cy="30" rx="95" ry="25" fill="none" stroke="#0011fd" strokeWidth="3" strokeLinecap="round" strokeDasharray="600" strokeDashoffset="0" transform="rotate(-2 100 30)" /></svg></span></h2>
          <p className="forge-welcome-desc">
            O sucesso do seu negócio começa aqui. Ao tornar-se membro do Faundr Forge, recebe uma jornada de aprendizagem personalizada para guiá-lo através dos seus novos eventos, cursos e experiências. Trazemos os conhecimentos actuais, validados e relevantes para o ajudar a começar a empreender do jeito certo e com confiança. Aprenda com os melhores insights de quem está no mercado há anos, ligue os atalhos diretamente ao seu negócio e construa a marca dos seus sonhos.
          </p>
          <div className="forge-welcome-subtitle-wrapper">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="crown-icon"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
            <h3>Aprenda com a <strong>ELITE</strong> da indústria</h3>
          </div>
        </div>

        <div className="forge-welcome-mentors-grid">
          {welcomeMentorsData.slice(0, 7).map((mentor, index) => (
            <div className="forge-welcome-mentor-card" key={index}>
              <img src={mentor.img} alt={mentor.name} />
              <div className="forge-welcome-mentor-overlay"></div>
              <div className="forge-welcome-mentor-info">
                <div className="forge-welcome-mentor-name">{mentor.name}</div>
                <div className="forge-welcome-mentor-title">{mentor.title}</div>
                <div className="forge-welcome-mentor-desc">{mentor.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. MEMBERSHIP FEATURES */}
      <section className="forge-membership-section" id="detalhes">
        <div className="forge-membership-header">
          <span className="forge-membership-tag">Aceleração de Alta Performance</span>
          <h2 className="forge-membership-title">O que está incluído no seu acesso</h2>
        </div>

        <div className="forge-disciplines-list-container">
          {disciplinesData.map((discipline, index) => (
            <div className={`forge-discipline-stripe-card ${index % 2 === 0 ? 'odd-card' : 'even-card'}`} key={index}>
              <div className="forge-stripe-number-block">
                <span className="forge-stripe-number">{String(index + 1).padStart(2, '0')}</span>
              </div>
              <div className="forge-stripe-content-block">
                <h3 className="forge-stripe-title">{discipline.title}</h3>
                <p className="forge-stripe-desc">{discipline.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="forge-membership-cta">
          <Link to="/cadastro" className="forge-btn-primary">
            Garantir meu acesso agora <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* 6. TESTIMONIALS & VIDEO BLOCK */}
      <section className="forge-testimonials-section">
        <h2 className="forge-testimonials-title">O que dizem os nossos alunos</h2>
        <div className="forge-testimonials-grid">
          {testimonials.map((t, index) => (
            <div className={`forge-testimonial-bubble ${index === 0 ? 'blue' : index === 1 ? 'yellow' : 'grey'}`} key={index}>
              <p className="forge-testimonial-quote">"{t.quote}"</p>
              <div className="forge-testimonial-user">
                <div className="forge-testimonial-avatar">
                  <img src={t.avatar} alt={t.name} />
                </div>
                <div className="forge-testimonial-info">
                  <span className="forge-testimonial-name">{t.name}</span>
                  <span className="forge-testimonial-company">{t.company}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Video Block with big text */}
        <div className="forge-big-video-block">
          <div className="forge-big-video-container">
            <img src="https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?auto=format&fit=crop&q=80&w=900" alt="Event crowd" />
            <div className="forge-big-video-overlay">
              <h3 className="forge-big-video-badge">
                Faturei <span>R$ 100K</span> em apenas 90 dias
              </h3>
              <p style={{ color: 'white', opacity: 0.9, fontSize: '14px', marginBottom: '25px', fontWeight: 600 }}>
                Conheça a história real do método aplicado passo a passo
              </p>
              <div className="forge-big-video-btn">
                <Play size={32} fill="currentColor" style={{ marginLeft: '6px' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. OFFER BOX & PRICING */}
      <section className="forge-offer-section">
        <div className="forge-offer-container">
          <div className="forge-offer-left">
            <span className="forge-offer-tag">Transforme Seu Negócio Hoje</span>
            <h2 className="forge-offer-title">Comece a construir seu império comercial</h2>
            <ul className="forge-offer-bullets-list">
              <li><Check size={18} /> Acesso completo a mais de 30 blueprints de aceleração</li>
              <li><Check size={18} /> Participação garantida na Comunidade Mastermind</li>
              <li><Check size={18} /> Mentorias ao vivo e sessões de suporte semanais</li>
              <li><Check size={18} /> Acervo digital completo das revistas Faundr Magazine</li>
              <li><Check size={18} /> Licença de uso do software Business Creator</li>
            </ul>
          </div>
          <div className="forge-offer-right">
            <span className="forge-offer-card-tag">Acesso Experimental</span>
            <h3 className="forge-offer-card-price">
              R$ 9,00 <span>/ 14 dias</span>
            </h3>
            <p className="forge-offer-card-price-desc">Depois apenas R$ 99/mês. Cancele com um clique.</p>
            <span className="forge-offer-trial-duration">Desbloqueio de Acesso Imediato</span>
            <Link to="/cadastro" className="forge-checkout-btn">
              Garantir meu acesso agora <ArrowRight size={18} />
            </Link>
            <p className="forge-checkout-guarantees">
              Ambiente de pagamento 100% criptografado e seguro. <br />
              Seu acesso pode ser cancelado no painel a qualquer momento.
            </p>
            <div className="forge-checkout-cards-logos">
              <span style={{ fontSize: '10px', fontWeight: 800, color: '#666' }}>VISA</span>
              <span style={{ fontSize: '10px', fontWeight: 800, color: '#666' }}>MASTERCARD</span>
              <span style={{ fontSize: '10px', fontWeight: 800, color: '#666' }}>PIX</span>
              <span style={{ fontSize: '10px', fontWeight: 800, color: '#666' }}>SSL SECURE</span>
            </div>
          </div>
        </div>
      </section>

      {/* 8. 90-DAY GUARANTEE */}
      <section className="forge-guarantee-section">
        <div className="forge-guarantee-container">
          <div className="forge-guarantee-badge">
            <span className="forge-guarantee-badge-num">90</span>
            <span className="forge-guarantee-badge-lbl">Dias</span>
            <span className="forge-guarantee-badge-sub">Garantia</span>
          </div>
          <div className="forge-guarantee-right">
            <h3 className="forge-guarantee-heading">Dupla Garantia Incondicional de Resultado</h3>
            <p className="forge-guarantee-desc">
              Temos tanta confiança na nossa metodologia e nos mentores que a criaram que assumimos todo o risco por você. Se você seguir o método passo a passo, estruturar o seu negócio e não obtiver resultados tangíveis em 90 dias, devolvemos 100% do seu investimento e adicionamos R$ 500 adicionais em sua conta pelo tempo investido.
            </p>
          </div>
        </div>
      </section>

      {/* 9. STUDENT COLLAGE & METRICS */}
      <section className="forge-students-collage-section">
        <div className="forge-students-collage-container">
          <div className="forge-student-avatars-collage">
            <div className="forge-collage-avatar-img"><img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100" alt="Avatar" /></div>
            <div className="forge-collage-avatar-img"><img src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=100" alt="Avatar" /></div>
            <div className="forge-collage-avatar-img"><img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100" alt="Avatar" /></div>
            <div className="forge-collage-avatar-img"><img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100" alt="Avatar" /></div>
            <div className="forge-collage-avatar-img"><img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100" alt="Avatar" /></div>
          </div>
          <h2 className="forge-collage-heading">
            Mais de 10 anos entregando resultados reais para fundadores de todo o mundo.
          </h2>

          <div className="forge-metrics-grid">
            <div className="forge-metric-item">
              <span className="forge-metric-num">30K+</span>
              <span className="forge-metric-lbl">Alunos Ativos</span>
            </div>
            <div className="forge-metric-item">
              <span className="forge-metric-num">R$ 15M+</span>
              <span className="forge-metric-lbl">Faturamento Gerado</span>
            </div>
            <div className="forge-metric-item">
              <span className="forge-metric-num">40+</span>
              <span className="forge-metric-lbl">Países Atendidos</span>
            </div>
            <div className="forge-metric-item">
              <span className="forge-metric-num">300+</span>
              <span className="forge-metric-lbl">Parcerias Formadas</span>
            </div>
          </div>
        </div>
      </section>

      {/* 10. LEGENDARY MENTORS */}
      <section className="forge-mentors-section">
        <h2 className="forge-mentors-title">Aprenda Com Empreendedores Lendários</h2>
        <div className="forge-mentors-big-grid">

          <div className="forge-mentor-big-card">
            <div className="forge-mentor-big-avatar">
              <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=300" alt="Nathan Chan" />
            </div>
            <h3 className="forge-mentor-big-name">Nathan Chan</h3>
            <span className="forge-mentor-big-role">Fundador & CEO @ Foundr</span>
            <p className="forge-mentor-big-bio">
              Construiu a Foundr Magazine do zero no seu quarto até se tornar um império internacional de educação para empreendedores, entrevistando os maiores líderes de negócios do mundo.
            </p>
          </div>

          <div className="forge-mentor-big-card">
            <div className="forge-mentor-big-avatar">
              <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300" alt="Gretta van Riel" />
            </div>
            <h3 className="forge-mentor-big-name">Gretta van Riel</h3>
            <span className="forge-mentor-big-role">Fundadora Multi-Milionária</span>
            <p className="forge-mentor-big-bio">
              Uma das maiores mentes de e-commerce do mundo. Criou 5 marcas distintas com faturamento de múltiplos milhões de dólares antes de completar 30 anos utilizando tráfego viral e influenciadores.
            </p>
          </div>

          <div className="forge-mentor-big-card">
            <div className="forge-mentor-big-avatar">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300" alt="Richard Branson" />
            </div>
            <h3 className="forge-mentor-big-name">Richard Branson</h3>
            <span className="forge-mentor-big-role">Fundador @ Virgin Group</span>
            <p className="forge-mentor-big-bio">
              Magnata dos negócios e filantropo. Fundou o império Virgin Group com mais de 400 empresas de aviação, música, telecomunicações e turismo espacial, pioneiro da escala empresarial massiva.
            </p>
          </div>

        </div>
      </section>

      {/* 11. FAQ SECTION */}
      <section className="forge-faq-section" id="faq">
        <h2 className="forge-faq-title">Perguntas <span>Frequentes</span></h2>
        <div className="forge-faq-container">
          {faqItems.map((item, index) => (
            <div className={`forge-faq-accordion ${openFaqIndex === index ? 'open' : ''}`} key={index}>
              <div className="forge-faq-header" onClick={() => toggleFaq(index)}>
                <span>{item.q}</span>
                <ChevronDown size={18} className="forge-faq-icon" />
              </div>
              <div className="forge-faq-content">
                <p className="forge-faq-text">{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </section>


    </div>
  );
};

export default FaundrForgePage;
