import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Sparkles, ArrowRight, CheckCircle2, Star, ShieldCheck, Download,
    BookOpen, Briefcase, TrendingUp, Zap, Clock, DollarSign,
    Search, Filter, ChevronDown, Award, Users, Lightbulb,
    Lock, ExternalLink, HelpCircle, Check, Flame, Layers, Copy, CheckCheck, Gift,
    FileText, FileCheck, BookCheck, Shield, ChevronRight, UploadCloud, Trash2
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface IdeaItem {
    id: number | string;
    number: string;
    title: string;
    type: 'B2B' | 'B2C';
    category: string;
    description: string;
    example?: string;
    skills: string;
    price: string;
    featured?: boolean;
}

const ALL_IDEAS: IdeaItem[] = [
    // B2B - ESCRITA
    {
        id: 1,
        number: '01',
        title: 'Ghostwriting Corporativo Premium',
        type: 'B2B',
        category: 'Escrita',
        description: 'O método silencioso onde empresários e figuras públicas em Angola pagam fortunas para colocarem a assinatura deles nas tuas palavras. Como operar nos bastidores, redigir discursos e livros inteiros e cobrar até 25.000.000 Kz por projeto sem nunca revelar a tua identidade?',
        example: 'O roteiro exato para fechar o primeiro CEO sem ter portfólio prévio nem livros publicados.',
        skills: 'Passo a passo confidencial & plano de 1M Kz na Página 18 do livro',
        price: '500.000 – 25.000.000 AOA / projeto',
        featured: true
    },
    {
        id: 2,
        number: '02',
        title: 'Roteiros de Vendas Baseados em Neurociência',
        type: 'B2B',
        category: 'Escrita',
        description: 'A sequência de gatilhos psicológicos ocultos que faz o cérebro de qualquer cliente corporativo tomar a decisão de compra antes mesmo de ver o preço. Porque é que empresas pagam até 1.000.000 Kz por um roteiro de 2 páginas que destrava vendas paradas?',
        example: 'A técnica de 3 etapas que desarma o habitual "vou pensar e depois ligo".',
        skills: 'Guiões neurológicos e plano de execução na Página 22 do livro',
        price: '100.000 – 1.000.000 AOA / script',
        featured: true
    },
    {
        id: 3,
        number: '03',
        title: 'Redator de Conteúdo para Mídias Sociais',
        type: 'B2B',
        category: 'Escrita',
        description: 'A estrutura de 4 linhas que faz marcas em Luanda pagarem até 100.000 Kz por publicações que você monta em 15 minutos. O segredo não é escrever muito — é saber a psicologia de retenção que força os algoritmos a entregar clientes pagantes.',
        example: 'Como empacotar 12 publicações estratégicas e faturar meio milhão de Kwanzas.',
        skills: 'Estrutura de retenção rápida na Página 26 do livro',
        price: '10.000 – 100.000 AOA / publicação'
    },
    {
        id: 4,
        number: '04',
        title: 'Redator de Websites & Landing Pages',
        type: 'B2B',
        category: 'Escrita',
        description: 'A ordem exata das seções de uma página que transforma visitantes desconfiados em compradores imediatos na internet angolana. Como transformar qualquer produto num ímã de vendas e cobrar de 500.000 a 1.500.000 Kz por projeto com apenas um computador.',
        example: 'O esqueleto de conversão que empresas pagam adiantado para ter no ar.',
        skills: 'Template de funil de vendas na Página 30 do livro',
        price: '50.000 – 500.000 AOA / página (+1.5M para funis)'
    },
    {
        id: 5,
        number: '05',
        title: 'Email Copywriter Estratégico',
        type: 'B2B',
        category: 'Escrita',
        description: 'Como um simples e-mail de 150 palavras enviado numa terça-feira à tarde pode gerar milhões de Kwanzas em vendas para um negócio local. Descubra porque esta é considerada a habilidade de geração de receita mais rápida e lucrativa do mundo digital.',
        example: 'A esteira de 5 mensagens que reativa clientes sumidos há meses.',
        skills: 'Assuntos com +60% de taxa de abertura na Página 34 do livro',
        price: '25.000 – 130.000 AOA / e-mail'
    },
    {
        id: 6,
        number: '06',
        title: 'Dossiês de Autoridade & E-books Corporativos',
        type: 'B2B',
        category: 'Escrita',
        description: 'O formato de documento que faz uma empresa comum parecer a líder incontestável do setor em Angola. Como empacotar conhecimento técnico em materiais elegantes que abrem portas com governos, bancos e investidores a preços premium.',
        example: 'Como transformar relatórios enfadonhos em ativos de autoridade milionários.',
        skills: 'Passo a passo de monetização na Página 38 do livro',
        price: '125.000 – 600.000 AOA / material'
    },
    {
        id: 7,
        number: '07',
        title: 'Revisor e Auditor de Comunicação Executiva',
        type: 'B2B',
        category: 'Escrita',
        description: 'Um único erro num contrato ou proposta pode custar milhões a uma grande empresa. Como se posicionar como o "filtro confidencial" que diretores contratam a 65.000 Kz por hora para garantir que nada passe despercebido antes de assinaturas críticas.',
        example: 'O serviço de blindagem textual que grandes escritórios disputam.',
        skills: 'Checklist de auditoria na Página 42 do livro',
        price: '20.000 – 65.000 Kz / hora'
    },
    {
        id: 8,
        number: '08',
        title: 'Redator de Currículos Executivos & Perfis C-Level',
        type: 'B2B',
        category: 'Escrita',
        description: 'O que os profissionais que ganham salários de 3 a 10 milhões por mês em multinacionais colocam nos seus perfis para serem disputados no mercado sem nunca procurar emprego? O método de posicionamento que vale até 250.000 Kz por documento.',
        example: 'A bio executiva que atrai ofertas de recrutadores internacionais.',
        skills: 'Estrutura C-Level na Página 46 do livro',
        price: '85.000 – 250.000 Kz / documento'
    },
    {
        id: 9,
        number: '09',
        title: 'Consultor e Redator de SEO para PMEs',
        type: 'B2B',
        category: 'Escrita',
        description: 'Como fazer uma empresa aparecer no topo absoluto do Google quando clientes em Angola pesquisam pelo serviço dela — sem gastar 1 Kwanza em anúncios. O ativo digital invisível que gera contratos mensais contínuos de alto valor.',
        example: 'Como posicionar um negócio local acima de gigantes tradicionais.',
        skills: 'Estratégia de ranqueamento local na Página 50 do livro',
        price: '65.000 – 150.000 Kz / hora'
    },
    {
        id: 10,
        number: '10',
        title: 'Ghostwriter de LinkedIn para Fundadores',
        type: 'B2B',
        category: 'Escrita',
        description: 'Porque é que os maiores executivos de Luanda parecem estar sempre ativos a fechar parcerias no LinkedIn, quando na verdade mal abrem a aplicação? Como gerir os bastidores da autoridade de um líder e faturar até 1.200.000 Kz por mês por cliente.',
        example: 'O sistema de 2 horas por semana para gerir a notoriedade de um líder.',
        skills: 'Roteiro de abordagem executiva na Página 54 do livro',
        price: '200.000 – 1.200.000 Kz / mês (retainer)',
        featured: true
    },
    {
        id: 11,
        number: '11',
        title: 'Redator Técnico de Manuais & Procedimentos',
        type: 'B2B',
        category: 'Escrita',
        description: 'Indústrias perdem fortunas porque operários não entendem manuais complexos. Como cobrar 800.000 Kz para traduzir processos confusos em fluxos visuais tão simples que eliminam falhas na operação em 24 horas.',
        example: 'A padronização que gerentes de fábrica compram sem hesitar.',
        skills: 'Framework de descomplicação na Página 58 do livro',
        price: '150.000 – 800.000 Kz / manual'
    },
    {
        id: 12,
        number: '12',
        title: 'Redator de Propostas de Negócios & Concursos',
        type: 'B2B',
        category: 'Escrita',
        description: 'A diferença exata entre uma proposta comercial ignorada no e-mail e uma que faz a diretoria aprovar o orçamento imediatamente. O elemento psicológico de ancoragem que vence concorrências contra propostas muito mais baratas.',
        example: 'A estrutura de persuasão formal que fecha contratos governamentais.',
        skills: 'Modelo de proposta blindada na Página 62 do livro',
        price: '100.000 – 1.500.000 Kz / proposta'
    },

    // B2B - MARKETING
    {
        id: 13,
        number: '13',
        title: 'Agência de Micro-Influencers de Nicho',
        type: 'B2B',
        category: 'Marketing',
        description: 'Porque é que influenciadores com apenas 3.000 seguidores vendem 10x mais do que celebridades com meio milhão? O modelo de agenciamento que conecta marcas angolanas a criadores de nicho, faturando 5.000.000 Kz por campanha com margens brutais.',
        example: 'Como fechar campanhas com grandes marcas sem ter audiência própria.',
        skills: 'Roteiro de intermediação sem capital na Página 68 do livro',
        price: '200.000 – 5.000.000 AOA / campanha',
        featured: true
    },
    {
        id: 14,
        number: '14',
        title: 'Growth Hacking B2B para PMEs',
        type: 'B2B',
        category: 'Marketing',
        description: 'Os atalhos de aquisição de clientes pouco conhecidos que colocam contratos na mesa em 7 dias com orçamento quase nulo, contornando toda a burocracia e demora das agências de publicidade tradicionais.',
        example: 'Os 3 experimentos rápidos que dobraram as vendas de empresas locais.',
        skills: 'Plano de ação acelerada na Página 72 do livro',
        price: '300.000 – 2.000.000 AOA / mês',
        featured: true
    },
    {
        id: 15,
        number: '15',
        title: 'Gestor de Tráfego Pago de Alta Precisão',
        type: 'B2B',
        category: 'Marketing',
        description: 'A configuração secreta de anúncios que faz cada 10.000 Kz investidos voltarem como 50.000 a 200.000 Kz em pedidos no WhatsApp. O erro fatal que 95% das empresas cometem e como cobrar honorários mensais para resolver isso.',
        example: 'O funil de mensagens diretas que nunca para de tocar.',
        skills: 'Configuração de alta conversão na Página 88 do livro',
        price: '150.000 – 800.000 Kz / mês por cliente'
    },
    {
        id: 16,
        number: '16',
        title: 'Produtor Estratégico de Podcasts Corporativos',
        type: 'B2B',
        category: 'Marketing',
        description: 'O mecanismo onde empresas convidam os seus clientes mais cobiçados para uma "entrevista descontraída" e fecham contratos milionários nos bastidores logo a seguir. Como estruturar essa máquina de prospecção corporativa.',
        example: 'Como cobrar 350.000 Kz por episódio produzindo tudo em part-time.',
        skills: 'Estratégia de atração corporativa na Página 80 do livro',
        price: '80.000 – 350.000 Kz / episódio'
    },
    {
        id: 17,
        number: '18',
        title: 'Criador de Dashboards & Cockpits de Marketing',
        type: 'B2B',
        category: 'Marketing',
        description: 'Como cobrar 600.000 Kz por uma única tela interativa que mostra o fluxo de vendas e lucros em tempo real no telemóvel do empresário. Descubra porque donos de empresas compram isto no primeiro minuto da apresentação.',
        example: 'A ferramenta gratuita que você usa para construir painéis executivos.',
        skills: 'Modelos de dashboard prontos na Página 104 do livro',
        price: '150.000 – 600.000 Kz / dashboard'
    },

    // B2B - VENDAS
    {
        id: 18,
        number: '19',
        title: 'Equipas Comerciais sob Demanda (Closers)',
        type: 'B2B',
        category: 'Vendas',
        description: 'Empresas em Angola têm armazéns cheios de produtos mas equipes que não sabem vender. Como montar um esquadrão de fechadores part-time, negociar 10% a 25% de comissão e faturar milhões sem correr risco de estoque.',
        example: 'Como faturar 1.500.000 Kz em comissões num único fim de semana.',
        skills: 'Contrato de parceria comercial na Página 110 do livro',
        price: '300.000 AOA base + comissão de fecho',
        featured: true
    },
    {
        id: 19,
        number: '20',
        title: 'Inteligência de Concorrência Comercial',
        type: 'B2B',
        category: 'Vendas',
        description: 'O método 100% legal de descobrir exatamente quanto o maior concorrente do teu cliente está a cobrar, onde ele compra insumos e quais são as suas maiores reclamações de clientes. Dossiês que empresários pagam fortunas para ter em mãos.',
        example: 'As técnicas de cliente oculto que revelam brechas de mercado milionárias.',
        skills: 'Roteiro de investigação comercial na Página 114 do livro',
        price: '250.000 – 1.800.000 AOA / dossiê'
    },
    {
        id: 20,
        number: '21',
        title: 'Consultor de Geração de Leads Qualificados',
        type: 'B2B',
        category: 'Vendas',
        description: 'Como conseguir o contacto direto do telemóvel dos maiores tomadores de decisão em Luanda sem nunca ter de passar pela secretária ou pelo filtro da receção. O atalho que equipes comerciais compram todas as semanas.',
        example: 'Como extrair 200 contactos de donos de empresas em 1 hora.',
        skills: 'Técnicas de mineração de decisores na Página 126 do livro',
        price: '100.000 – 750.000 Kz / lote'
    },
    {
        id: 21,
        number: '22',
        title: 'Treinador de Fecho Rápido e Tratamento de Objeções',
        type: 'B2B',
        category: 'Vendas',
        description: 'A frase de 2 linhas que destrava qualquer cliente quando ele diz "o preço está muito alto" ou "não temos verba este trimestre". Como ser contratado por 1.500.000 Kz para dar um workshop de 1 dia a equipes comerciais.',
        example: 'O roleplay prático que dobra a conversão de vendedores tímidos.',
        skills: 'Os 7 desarmamentos de objeções na Página 130 do livro',
        price: '300.000 – 1.500.000 Kz / sessão corporativa'
    },

    // B2B - DESIGN & BRANDING
    {
        id: 22,
        number: '23',
        title: 'Identidade de Marca Dinâmica & Sistemas Visuais',
        type: 'B2B',
        category: 'Design',
        description: 'Porque é que grandes empresas pagam 3.500.000 Kz por um sistema de marca que parece minimalista? A psicologia visual que faz uma pequena empresa de Luanda parecer uma multinacional estabelecida em menos de 48 horas.',
        example: 'Como cobrar 10x mais por design vendendo "percepção de valor executivo".',
        skills: 'Engenharia de marcas dinâmicas na Página 136 do livro',
        price: '250.000 – 3.500.000 Kz / projeto',
        featured: true
    },
    {
        id: 23,
        number: '24',
        title: 'Apresentações Cinematográficas & Pitch Decks',
        type: 'B2B',
        category: 'Design',
        description: 'A arquitetura de slides que já destravaram milhões de Kwanzas em investimentos e concorrências de alto risco. O que acontece na lâmina 5 que faz diretores e investidores decidirem fechar antes da apresentação terminar?',
        example: 'A narrativa de 10 lâminas que capta rodadas de capital.',
        skills: 'Estrutura do pitch deck milionário na Página 140 do livro',
        price: '200.000 – 1.500.000 Kz / apresentação'
    },
    {
        id: 24,
        number: '25',
        title: 'Auditoria Fantasma de Concorrentes (Ghost Audit)',
        type: 'B2B',
        category: 'Design',
        description: 'Como auditar discretamente os funis, propostas e atendimento do concorrente de um cliente, identificar exatamente onde eles estão a perder vendas e vender a solução pronta por 1.200.000 Kz numa única reunião de diagnóstico.',
        example: 'O relatório comparativo que deixa o empresário chocado e pronto a comprar.',
        skills: 'Checklist da auditoria fantasma na Página 180 do livro',
        price: '300.000 – 1.200.000 Kz / auditoria',
        featured: true
    },
    {
        id: 25,
        number: '26',
        title: 'Ghost Pitch Agency (Vendas Confidenciais)',
        type: 'B2B',
        category: 'Design',
        description: 'Grandes empresas que disputam concursos milionários não têm tempo para preparar propostas visuais que vencem. Como operar como o estúdio secreto nos bastidores que desenha apresentações de choque cobrando 2.000.000 Kz por pitch.',
        example: 'A proposta que fez uma PME bater multinacionais numa concorrência.',
        skills: 'Estratégia de pitch sob encomenda na Página 200 do livro',
        price: '250.000 – 2.000.000 Kz / pitch'
    },

    // B2B - TECNOLOGIA & IA
    {
        id: 26,
        number: '27',
        title: 'Consultoria de Automação de Processos com IA',
        type: 'B2B',
        category: 'Tecnologia & IA',
        description: 'A ferramenta gratuita que substitui 4 funcionários operacionais, elimina erros humanos e poupa milhões por mês a qualquer empresa. Como cobrar 3.500.000 Kz para configurar isso num único sábado sem escrever código.',
        example: 'Os 3 fluxos de automação que donos de negócios imploram para ter.',
        skills: 'Roteiro de implementação rápida na Página 356 do livro',
        price: '350.000 – 3.500.000 Kz / implementação',
        featured: true
    },
    {
        id: 27,
        number: '28',
        title: 'Atendimento com Avatares & Agentes de IA 24/7',
        type: 'B2B',
        category: 'Tecnologia & IA',
        description: 'Como instalar um funcionário digital no WhatsApp de uma empresa que tira dúvidas, envia orçamentos e fecha pagamentos às 3h da manhã enquanto todos dormem. O modelo de assinatura que rende de 400.000 a 4.000.000 Kz todo mês.',
        example: 'Como criar um agente inteligente de atendimento em 3 horas.',
        skills: 'Passo a passo sem programação na Página 376 do livro',
        price: '400.000 – 4.000.000 Kz + manutenção mensal',
        featured: true
    },
    {
        id: 28,
        number: '29',
        title: 'Digital Twins (Gémeos Digitais de Operações)',
        type: 'B2B',
        category: 'Tecnologia & IA',
        description: 'O serviço de consultoria de altíssimo escalão onde você cria um modelo digital da operação de uma empresa para prever falhas antes que elas causem prejuízos reais. Contratos corporativos que chegam a 25.000.000 Kz.',
        example: 'Como simular cenários logísticos e industriais para grandes marcas.',
        skills: 'Metodologia de réplica operacional na Página 208 do livro',
        price: '2.000.000 – 25.000.000 Kz / projeto corporativo'
    },
    {
        id: 29,
        number: '30',
        title: 'Automatização de Recrutamento & Triagem de Talentos',
        type: 'B2B',
        category: 'Tecnologia & IA',
        description: 'Como escanear 1.000 currículos em 30 segundos e encontrar exatamente os 3 profissionais ideais sem ler pilhas de papel. Empresas pagam até 1.800.000 Kz para fugir de contratações erradas que custam o triplo.',
        example: 'O filtro automatizado que faz o trabalho de um setor de RH em minutos.',
        skills: 'Estrutura de triagem com IA na Página 214 do livro',
        price: '300.000 – 1.800.000 Kz / processo'
    },

    // B2B - ADMINISTRAÇÃO, FINANÇAS & LEGAL
    {
        id: 30,
        number: '31',
        title: 'Estruturação de Incentivos Fiscais Legais',
        type: 'B2B',
        category: 'Finança & Legal',
        description: 'As deduções e incentivos tributários 100% previstos na lei angolana que a maioria dos contabilistas desconhece. Como reter milhões no caixa da empresa de forma legal e receber uma percentagem direta da economia gerada.',
        example: 'O caso da empresa que economizou 8 milhões sem sair da legalidade.',
        skills: 'Mapeamento fiscal estratégico na Página 308 do livro',
        price: '500.000 – 15.000.000 Kz / projeto',
        featured: true
    },
    {
        id: 31,
        number: '32',
        title: 'Assessoria para Licitações & Concursos Públicos',
        type: 'B2B',
        category: 'Finança & Legal',
        description: 'Milhões de Kwanzas em contratações públicas ficam sem concorrentes ou são reprovados por erros infantis em certidões. Como ser o especialista que monta pastas documentais blindadas e cobra 2.500.000 Kz por concurso aprovado.',
        example: 'O roteiro de conformidade que aprova propostas na primeira análise.',
        skills: 'Checklist de qualificação pública na Página 328 do livro',
        price: '250.000 – 2.500.000 Kz / concurso'
    },
    {
        id: 32,
        number: '33',
        title: 'Escritório Virtual & Concierge Executivo',
        type: 'B2B',
        category: 'Administração',
        description: 'Como faturar centenas de milhares de Kwanzas por mês prestando serviços de secretariado e endereço comercial VIP para multinacionais e consultores estrangeiros sem pagar renda de nenhum imóvel comercial.',
        example: 'A esteira de atendimento corporativo operada a partir de casa.',
        skills: 'Estrutura de escritório digital na Página 274 do livro',
        price: '150.000 – 600.000 Kz / mês (assinatura)'
    },

    // B2C - EXPERIÊNCIAS & SERVIÇOS PESSOAIS
    {
        id: 33,
        number: '34',
        title: 'Clube de Experiências Gastronómicas Secretas',
        type: 'B2C',
        category: 'B2C Serviços',
        description: 'O modelo onde pessoas pagam 120.000 Kz por lugar para um jantar exclusivo sem saber a ementa nem o endereço até poucas horas antes. Como usar a psicologia da exclusividade para esgotar eventos em minutos em Luanda.',
        example: 'Como lucrar mais de 1.000.000 Kz num único sábado à noite.',
        skills: 'Fórmula de escassez gastronómica na Página 434 do livro',
        price: '40.000 – 120.000 Kz / pessoa (ingresso)',
        featured: true
    },
    {
        id: 34,
        number: '35',
        title: 'Dark Kitchen VIP & Chef On-Demand',
        type: 'B2C',
        category: 'B2C Serviços',
        description: 'Como faturar de 80.000 a 500.000 Kz por evento gastronómico exclusivo usando a cozinha da tua própria casa, sem pagar aluguel de restaurante, sem funcionários fixos e com reservas pagas com 50% de adiantamento.',
        example: 'O cardápio de alta margem que clientes VIP reservam com semanas de antecedência.',
        skills: 'Plano de operações de dark kitchen na Página 454 do livro',
        price: '80.000 – 500.000 Kz / evento'
    },
    {
        id: 35,
        number: '36',
        title: 'Smart Home On-Demand (Automação Descomplicada)',
        type: 'B2C',
        category: 'B2C Serviços',
        description: 'Equipamentos simples de 25.000 Kz que transformam qualquer apartamento num ambiente inteligente controlado por voz e telemóvel. O pacote que condomínios fechados e famílias pagam 350.000 Kz para ter instalado em poucas horas.',
        example: 'Como fechar 3 residências por semana em Talatona ou Kilamba.',
        skills: 'Kit básico de instalação rápida na Página 470 do livro',
        price: '50.000 – 350.000 Kz / instalação'
    },
    {
        id: 36,
        number: '37',
        title: 'Organizador Profissional de Espaços (Home Organizer)',
        type: 'B2C',
        category: 'B2C Serviços',
        description: 'Porque é que executivos e famílias de alto rendimento em Luanda pagam até 180.000 Kz por dia para alguém organizar os seus armários e closets? A técnica de padronização visual que transforma desespero em clientes fiéis o ano todo.',
        example: 'Como fechar pacotes mensais de manutenção residencial e corporativa.',
        skills: 'Método de categorização funcional na Página 550 do livro',
        price: '40.000 – 180.000 Kz / dia de intervenção'
    }
];

const BONUS_BOOKS = [
    {
        id: 1,
        title: '1M Business Plan',
        pages: '12 Páginas',
        tag: 'Estratégia & Escala',
        desc: 'O roteiro condensado e direto ao ponto para desenhar, validar e tracionar um plano de negócios que atinge 1.000.000 Kz por mês em tempo recorde.'
    },
    {
        id: 2,
        title: '7 Características de um Empreendedor de Sucesso',
        pages: '30 Páginas',
        tag: 'Mentalidade & Ação',
        desc: 'Os pilares de postura, tolerância ao risco e resiliência psicológica que diferenciam quem fatura alto de quem desiste no primeiro obstáculo.'
    },
    {
        id: 3,
        title: 'A Melhor Forma de Começar a Empreender',
        pages: '52 Páginas',
        tag: 'Guia de Entrada',
        desc: 'Como escolher o nicho certo, fazer a primeira validação com baixo capital e estruturar o arranque prático sem burocracias desnecessárias.'
    },
    {
        id: 4,
        title: 'Coloque Seu Negócio no Automático',
        pages: '92 Páginas',
        tag: 'Automação & Liberdade',
        desc: 'Guia completo de delegação, montagem de esteiras de vendas e fluxos que continuam a faturar e a operar com previsibilidade mesmo enquanto descansas.'
    },
    {
        id: 5,
        title: 'O Guia Prático de Lançamentos de Sucesso',
        pages: '59 Páginas',
        tag: 'Campanhas & Vendas',
        desc: 'Estratégias de antecipação, copy persuasiva e geração de pico de demanda para colocar novos produtos e serviços no mercado com alta procura.'
    },
    {
        id: 6,
        title: 'Terceirização de Negócio como Fator de Geração',
        pages: '60 Páginas',
        tag: 'Alavancagem & Lucro',
        desc: 'Como operar como intermediário estratégico e multiplicar as tuas margens contratando prestadores especializados para entregar o serviço.'
    }
];

const BONUS_POPS = [
    { area: 'Finanças', title: 'POP - Gestão de Fluxo de Caixa Diário e Semanal' },
    { area: 'Finanças', title: 'POP - Conciliação Bancária & Fecho Contábil' },
    { area: 'Finanças', title: 'POP - Cobrança Eficaz de Clientes em Atraso' },
    { area: 'Finanças', title: 'POP - Preparar Previsão e Projeção de Caixa' },
    { area: 'Finanças', title: 'POP - Revisão Periódica de Devedores' },
    { area: 'Finanças', title: 'POP - Inventário e Reconciliação de Ativos' },
    { area: 'Pessoas & RH', title: 'POP - Processo Completo de Contratação de Funcionários' },
    { area: 'Pessoas & RH', title: 'POP - Como Estruturar um Departamento de RH do Zero' },
    { area: 'Pessoas & RH', title: 'POP - Gerenciamento e Alocação da Força de Trabalho' },
    { area: 'Pessoas & RH', title: 'POP - Desenvolvimento de Programa de Treinamento' },
    { area: 'Pessoas & RH', title: 'POP - Avaliação e Revisão de Desempenho' },
    { area: 'Atendimento & Vendas', title: 'POP - Criação de Estratégia de Atendimento ao Cliente' },
    { area: 'Atendimento & Vendas', title: 'POP - Implementação do Treinamento de Atendimento' },
    { area: 'Atendimento & Vendas', title: 'POP - Roteiro de Melhoria Contínua do Atendimento' },
    { area: 'Operações', title: 'POP - Configuração e Homologação do Processo de Compra' },
    { area: 'Estratégia', title: 'POP - Metodologia Completa: Como Avaliar Negócio à Venda' }
];

const FAQS = [
    {
        q: "Como é entregue o livro e os bónus após o pagamento?",
        a: "A entrega é 100% imediata e digital. Assim que confirmas o pagamento (por Multicaixa Express ou transferência bancária com envio do comprovativo), recebes o link de download do livro oficial de 581 páginas em PDF de alta resolução, juntamente com a pasta completa com os 6 E-books Bónus adicionais e os 16 POPs editáveis em Microsoft Word (.docx), diretamente no teu e-mail e no WhatsApp."
    },
    {
        q: "Preciso de largar o meu emprego das 8h às 16h para começar?",
        a: "Não! Esse é o foco central do livro. O autor Luciano Bom-Ano desenhou as mais de 114 ideias especificamente para quem quer começar pequeno, dedicando apenas 1h a 2h por noite ou aos fins de semana, sem arriscar a tua estabilidade financeira."
    },
    {
        q: "Os valores e exemplos de ganhos aplicam-se à realidade de Angola?",
        a: "Sim, absolutamente. Todas as tabelas de preços e planos estratégicos foram mapeados em Kwanzas (AOA) com base na procura real de empresas e consumidores em Luanda e províncias, com valores praticados por prestadores de serviços em 2026."
    },
    {
        q: "O que vem exatamente no livro oficial de 581 páginas?",
        a: "O livro traz o Manifesto 'Porquê ter um trabalho extra?', um Glossário Prático de Termos de Negócios e Estratégia de A a W, mais de 70 modelos B2B em 7 áreas, 40 modelos B2C completos e um Hub de Inovações Tecnológicas & IA. Cada ideia inclui habilidades necessárias, plano para faturar 1 Milhão Kz/mês, roteiro de prospecção com pouco ou zero capital, checklist prático e exercícios de validação."
    },
    {
        q: "Como funcionam os 16 POPs operacionais inclusos como bónus?",
        a: "Os POPs (Procedimentos Operacionais Padronizados) são ficheiros em formato Word (.docx) 100% editáveis cobrindo finanças, fluxo de caixa, cobranças, contratações, atendimento e avaliação de empresas. Podes adaptá-los em minutos com a tua logomarca para usar no teu próprio negócio ou vender como consultoria de organização para outras empresas."
    },
    {
        q: "Existe alguma garantia se eu não gostar do conteúdo?",
        a: "Sim! Oferecemos uma Garantia Incondicional de Satisfação de 7 dias. Se descarregares o livro e sentires que o conteúdo não te entrega valor imediato, basta enviares uma mensagem no WhatsApp do suporte Bisnoteka e devolvemos 100% do teu dinheiro sem perguntas."
    }
];

const Book114IdeiasLandingPage: React.FC = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [faqOpen, setFaqOpen] = useState<number | null>(0);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 1024);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Filter states
    const [activeTab, setActiveTab] = useState<'ALL' | 'B2B' | 'B2C'>('ALL');
    const [selectedCategory, setSelectedCategory] = useState<string>('Todas');
    const [searchQuery, setSearchQuery] = useState<string>('');

    // Calculator states
    const [hoursPerWeek, setHoursPerWeek] = useState<number>(10);
    const [selectedRole, setSelectedRole] = useState<'copy' | 'design' | 'ai' | 'sales'>('ai');
    const [experienceTier, setExperienceTier] = useState<'iniciante' | 'intermediario' | 'avancado'>('intermediario');

    // Checkout Modal
    const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState<'express' | 'iban'>('iban');
    const [buyerPhone, setBuyerPhone] = useState('');
    const [buyerName, setBuyerName] = useState('');
    const [buyerEmail, setBuyerEmail] = useState('');
    const [receiptFile, setReceiptFile] = useState<File | null>(null);
    const [receiptFileName, setReceiptFileName] = useState<string>('');
    const [receiptFileSize, setReceiptFileSize] = useState<string>('');
    const [isDraggingFile, setIsDraggingFile] = useState(false);
    const [uploadError, setUploadError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [copiedIban, setCopiedIban] = useState(false);

    // Scroll Helper
    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const offset = 80;
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = element.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;
            window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
    };

    // Filtered Ideas
    const filteredIdeas = useMemo(() => {
        return ALL_IDEAS.filter(idea => {
            if (activeTab !== 'ALL' && idea.type !== activeTab) return false;
            if (selectedCategory !== 'Todas' && idea.category !== selectedCategory) return false;
            if (searchQuery.trim() !== '') {
                const query = searchQuery.toLowerCase();
                return (
                    idea.title.toLowerCase().includes(query) ||
                    idea.description.toLowerCase().includes(query) ||
                    idea.skills.toLowerCase().includes(query) ||
                    (idea.example && idea.example.toLowerCase().includes(query))
                );
            }
            return true;
        });
    }, [activeTab, selectedCategory, searchQuery]);

    // Available categories
    const availableCategories = useMemo(() => {
        const cats = new Set<string>();
        ALL_IDEAS.forEach(i => {
            if (activeTab === 'ALL' || i.type === activeTab) {
                cats.add(i.category);
            }
        });
        return ['Todas', ...Array.from(cats)];
    }, [activeTab]);

    // Dynamic Income Calculation
    const calculatedEarnings = useMemo(() => {
        const rates: Record<string, { iniciante: number; intermediario: number; avancado: number }> = {
            copy: { iniciante: 12000, intermediario: 35000, avancado: 90000 },
            design: { iniciante: 15000, intermediario: 45000, avancado: 120000 },
            ai: { iniciante: 25000, intermediario: 80000, avancado: 250000 },
            sales: { iniciante: 20000, intermediario: 65000, avancado: 180000 }
        };
        const hourly = rates[selectedRole][experienceTier];
        const monthlyHours = hoursPerWeek * 4;
        const totalMonthly = monthlyHours * hourly;
        const formattedMonthly = totalMonthly.toLocaleString('pt-AO');
        const formattedYearly = (totalMonthly * 12).toLocaleString('pt-AO');
        const multiplier = Math.round(totalMonthly / 15000);
        return { totalMonthly, formattedMonthly, formattedYearly, multiplier };
    }, [hoursPerWeek, selectedRole, experienceTier]);

    // File handler
    const handleFileChange = (file: File | null) => {
        if (!file) return;
        if (file.size > 15 * 1024 * 1024) {
            setUploadError('O ficheiro é demasiado grande. O limite máximo é 15MB.');
            return;
        }
        setUploadError(null);
        setReceiptFile(file);
        setReceiptFileName(file.name);
        const sizeInKb = Math.round(file.size / 1024);
        if (sizeInKb > 1000) {
            setReceiptFileSize(`${(sizeInKb / 1024).toFixed(1)} MB`);
        } else {
            setReceiptFileSize(`${sizeInKb} KB`);
        }
    };

    const handleRemoveFile = () => {
        setReceiptFile(null);
        setReceiptFileName('');
        setReceiptFileSize('');
        setUploadError(null);
    };

    // Checkout submit
    const handleCheckoutSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (paymentMethod === 'iban' && !receiptFile) {
            setUploadError('Por favor, anexa o ficheiro do comprovativo bancário antes de confirmar.');
            return;
        }
        setUploadError(null);
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSuccess(true);
        }, 1200);
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopiedIban(true);
        setTimeout(() => setCopiedIban(false), 2500);
    };

    return (
        <div style={{
            backgroundColor: '#000000',
            minHeight: '100vh',
            color: '#ffffff',
            fontFamily: "'Inter', sans-serif"
        }}>
            {/* Top Bar Accent in Bisnoteka Emerald */}
            <div style={{ width: '100%', height: '4px', backgroundColor: '#22c55e' }}></div>

            {/* Top Sub-Nav (Clean & Minimal) */}
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                padding: '16px 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid rgba(255,255,255,0.1)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Link to="/livros" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <BookOpen size={14} color="#22c55e" />
                        <span>Biblioteca Bisnoteka</span>
                    </Link>
                    <span style={{ color: 'rgba(255,255,255,0.2)' }}>/</span>
                    <span style={{ color: '#ffffff', fontSize: '13px', fontWeight: 600 }}>+114 Ideias Lucrativas</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    {!isMobile && (
                        <>
                            <button onClick={() => scrollToSection('dilema')} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.6)', fontSize: '13px', cursor: 'pointer', transition: 'color 0.2s' }}>
                                O Dilema
                            </button>
                            <button onClick={() => scrollToSection('arsenal')} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.6)', fontSize: '13px', cursor: 'pointer', transition: 'color 0.2s' }}>
                                Arsenal (+114)
                            </button>
                            <button onClick={() => scrollToSection('bonus')} style={{ background: 'none', border: 'none', color: '#22c55e', fontSize: '13px', fontWeight: 700, cursor: 'pointer', transition: 'color 0.2s' }}>
                                Bónus (6+16)
                            </button>
                            <button onClick={() => scrollToSection('simulador')} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.6)', fontSize: '13px', cursor: 'pointer', transition: 'color 0.2s' }}>
                                Simulador
                            </button>
                            <button onClick={() => scrollToSection('autor')} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.6)', fontSize: '13px', cursor: 'pointer', transition: 'color 0.2s' }}>
                                Autor
                            </button>
                            <button onClick={() => scrollToSection('preco')} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.6)', fontSize: '13px', cursor: 'pointer', transition: 'color 0.2s' }}>
                                Preço
                            </button>
                        </>
                    )}
                    <button
                        onClick={() => setIsCheckoutModalOpen(true)}
                        style={{
                            backgroundColor: '#22c55e',
                            color: '#000000',
                            border: 'none',
                            borderRadius: '99px',
                            padding: '8px 18px',
                            fontSize: '12px',
                            fontWeight: 700,
                            cursor: 'pointer'
                        }}
                    >
                        Adquirir • 15.000 Kz
                    </button>
                </div>
            </div>

            {/* ========================================================================= */}
            {/* HERO SECTION (FAUNDR MAGAZINE STYLE: SPACIOUS, BOLD, CENTRED) */}
            {/* ========================================================================= */}
            <section style={{
                padding: isMobile ? '50px 20px 0' : '90px 20px 0',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        {/* Top Badge (Faundr Magazine Style) */}
                        <div style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            backgroundColor: '#22c55e',
                            padding: '8px 24px',
                            borderRadius: '99px',
                            marginBottom: isMobile ? '20px' : '35px'
                        }}>
                            <span style={{ fontSize: '13px', fontWeight: 800, color: '#000000', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
                                Edição Oficial Bisnoteka • 581 Páginas • Por Luciano Bom-Ano
                            </span>
                        </div>

                        {/* Monumental Clean Title */}
                        <h1 style={{
                            fontSize: isMobile ? '36px' : 'clamp(44px, 7vw, 84px)',
                            fontWeight: 700,
                            letterSpacing: isMobile ? '-1px' : '-2px',
                            lineHeight: 1.05,
                            marginBottom: '20px',
                            color: '#ffffff'
                        }}>
                            +114 Ideias Lucrativas <br />
                            de Renda Extra
                        </h1>

                        {/* Subtitle */}
                        <p style={{
                            color: 'rgba(255,255,255,0.7)',
                            fontSize: isMobile ? '16px' : '22px',
                            maxWidth: '780px',
                            margin: isMobile ? '0 auto 28px' : '0 auto 40px',
                            lineHeight: 1.4,
                            fontWeight: 400
                        }}>
                            O manual prático com 581 páginas de pura estratégia: mais de 70 ideias B2B e 40 ideias B2C para faturar de 50.000 a 25.000.000 Kz em Angola sem largar o emprego das 8h às 16h.
                        </p>

                        {/* Big Centered Action Button (Faundr Style: 360x90) */}
                        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: isMobile ? '40px' : '60px' }}>
                            <button
                                onClick={() => setIsCheckoutModalOpen(true)}
                                style={{
                                    width: isMobile ? '290px' : '360px',
                                    height: isMobile ? '70px' : '90px',
                                    backgroundColor: '#22c55e',
                                    color: '#000000',
                                    borderRadius: '99px',
                                    border: 'none',
                                    fontSize: isMobile ? '16px' : '20px',
                                    fontWeight: 700,
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '16px',
                                    transition: 'all 0.3s ease'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                            >
                                <span>Adquirir Livro • 15.000 Kz</span>
                                <ArrowRight size={22} color="#000000" />
                            </button>
                        </div>
                    </motion.div>
                </div>

                {/* Hero Featured Image - Clean Book Showcase with Official Cover */}
                <div style={{
                    width: '100%',
                    maxWidth: '900px',
                    position: 'relative',
                    borderBottom: '1px solid rgba(255,255,255,0.15)',
                    paddingBottom: isMobile ? '30px' : '50px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}>
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        style={{
                            maxWidth: isMobile ? '270px' : '350px',
                            borderRadius: '12px',
                            overflow: 'hidden',
                            boxShadow: '0 25px 60px rgba(0,0,0,0.9), 0 0 30px rgba(34,197,94,0.15)',
                            border: '1px solid rgba(255,255,255,0.12)'
                        }}
                    >
                        <img
                            src="/media/capa-114-ideias-oficial.png"
                            alt="Capa Oficial: +114 Ideias de Negócio Tão Boas Que Parecem Ilegais"
                            style={{
                                width: '100%',
                                height: 'auto',
                                display: 'block'
                            }}
                            onError={(e) => {
                                e.currentTarget.src = "/media/capa-114-ideias.png";
                            }}
                        />
                    </motion.div>

                    {/* Clean specification lines */}
                    <div style={{
                        marginTop: '26px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px',
                        fontSize: '13px',
                        color: 'rgba(255,255,255,0.6)',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        fontWeight: 500
                    }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#22c55e' }}>
                            <CheckCircle2 size={16} /> 581 Páginas em PDF de Alta Resolução
                        </span>
                        <span>•</span>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#ffffff' }}>
                            <Gift size={16} color="#22c55e" /> 6 E-books Bónus Inclusos (305 Pág.)
                        </span>
                        <span>•</span>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#ffffff' }}>
                            <FileCheck size={16} color="#22c55e" /> Pack 16 POPs em Word (.DOCX)
                        </span>
                        <span>•</span>
                        <span style={{ color: 'rgba(255,255,255,0.6)' }}>
                            Envio Imediato WhatsApp & E-mail
                        </span>
                    </div>
                </div>
            </section>

            {/* ========================================================================= */}
            {/* STATS & FEATURE CARDS (FAUNDR MAGAZINE CARDS) */}
            {/* ========================================================================= */}
            <section style={{ padding: isMobile ? '50px 20px' : '80px 20px' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{
                        display: 'flex',
                        flexDirection: isMobile ? 'column' : 'row',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '15px',
                        width: '100%'
                    }}>
                        {[
                            {
                                icon: BookOpen,
                                title: "581 Páginas Oficiais",
                                desc: "Manual completo com roteiros para faturar 1M Kz/mês, habilidades mapeadas e checklists para cada ideia."
                            },
                            {
                                icon: Briefcase,
                                title: "+70 Modelos B2B",
                                desc: "Serviços corporativos de alto valor para empresas angolanas, com propostas de 50.000 a 25.000.000 Kz."
                            },
                            {
                                icon: Users,
                                title: "40 Modelos B2C",
                                desc: "Serviços diretos ao consumidor com início imediato e baixo ou zero investimento inicial."
                            },
                            {
                                icon: Gift,
                                title: "6 Bónus + 16 POPs",
                                desc: "Pack com 6 e-books estratégicos adicionais (305 pág.) e 16 Procedimentos Operacionais Padrão em Word."
                            }
                        ].map((card, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ backgroundColor: '#1c2420' }}
                                style={{
                                    width: isMobile ? '100%' : '270px',
                                    maxWidth: isMobile ? '360px' : 'none',
                                    minHeight: isMobile ? 'auto' : '260px',
                                    backgroundColor: '#111613',
                                    padding: '28px 24px',
                                    borderRadius: '12px',
                                    border: '1px solid #1a231d',
                                    textAlign: 'left',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '16px',
                                    transition: 'background-color 0.3s',
                                    cursor: 'default'
                                }}
                            >
                                <div style={{
                                    width: '58px',
                                    height: '58px',
                                    backgroundColor: '#22c55e',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0
                                }}>
                                    <card.icon size={26} color="#000000" />
                                </div>
                                <div>
                                    <h3 style={{ fontSize: '17px', fontWeight: 700, marginBottom: '8px', color: '#fff' }}>{card.title}</h3>
                                    <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '13px', lineHeight: 1.5, margin: 0 }}>{card.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Divider Line */}
            <div style={{ maxWidth: '1000px', margin: '0 auto', borderBottom: '1px solid rgba(255,255,255,0.15)' }}></div>

            {/* ========================================================================= */}
            {/* O QUE É O LIVRO (EDITORIAL OVERVIEW) */}
            {/* ========================================================================= */}
            <section id="sobre" style={{ padding: isMobile ? '60px 20px' : '110px 20px', textAlign: 'center' }}>
                <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                    <div style={{ display: 'inline-block', marginBottom: isMobile ? '30px' : '50px' }}>
                        <h2 style={{ fontSize: isMobile ? '36px' : '60px', fontWeight: 700, color: '#fff', margin: 0 }}>O que é este livro</h2>
                        <div style={{ width: '100%', height: '8px', backgroundColor: '#22c55e', marginTop: '-4px' }}></div>
                    </div>

                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: isMobile ? '24px' : '36px',
                        color: 'rgba(255,255,255,0.7)',
                        fontSize: isMobile ? '16px' : '21px',
                        lineHeight: 1.55,
                        fontWeight: 400,
                        maxWidth: '880px',
                        margin: '0 auto'
                    }}>
                        <p style={{ margin: 0 }}>
                            <strong>"+114 Ideias Lucrativas de Renda Extra"</strong> é o maior e mais completo arsenal tático criado por <strong>Luciano Bom-Ano</strong> para profissionais que recusam aceitar o teto financeiro de um salário único em Angola.
                        </p>
                        <p style={{ margin: 0 }}>
                            Ao longo de <strong>581 páginas rigorosamente estruturadas</strong>, o livro foge da teoria abstrata para entregar planos de combate executáveis: cada modelo de negócio traz a descrição minuciosa da oportunidade, habilidades exatas necessárias, plano infalível para 1 Milhão Kz/mês, roteiro de prospecção sem capital e checklist de execução.
                        </p>
                        <p style={{ margin: 0 }}>
                            Inclui ainda um <strong>Glossário Prático de Termos de Negócios e Estratégia de A a W</strong> (pp. 6-9) para dominar conceitos modernos como Ghost Branding, Micro-SaaS, White Label, Dark Kitchens e IA Generativa, permitindo negociar de igual para igual com empresas e clientes corporativos de alto poder aquisitivo.
                        </p>
                    </div>
                </div>
            </section>

            {/* Divider Line */}
            <div style={{ maxWidth: '1000px', margin: '0 auto', borderBottom: '1px solid rgba(255,255,255,0.15)' }}></div>

            {/* ========================================================================= */}
            {/* O DILEMA (MANIFESTO SECTION: 8h às 16h vs Renda Extra - PÁG 4 A 5) */}
            {/* ========================================================================= */}
            <section id="dilema" style={{ padding: isMobile ? '60px 20px' : '110px 20px', backgroundColor: '#000000' }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                        <div style={{ fontSize: '13px', fontWeight: 700, color: '#22c55e', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                            O Manifesto do Autor (Páginas 4 e 5 do Livro)
                        </div>
                        <h2 style={{ fontSize: isMobile ? '36px' : '60px', fontWeight: 700, color: '#fff', margin: 0 }}>
                            Porquê ter um trabalho extra?
                        </h2>
                    </div>

                    <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '24px', width: '100%', justifyContent: 'center' }}>
                        {/* The Trap (Red Accent Circle) */}
                        <div style={{
                            flex: 1,
                            backgroundColor: '#111613',
                            border: '1px solid #281818',
                            borderRadius: '16px',
                            padding: isMobile ? '30px 20px' : '40px 35px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '20px'
                        }}>
                            <div style={{ width: '48px', height: '48px', backgroundColor: '#ef4444', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Lock size={22} color="#000000" />
                            </div>
                            <h3 style={{ fontSize: '22px', fontWeight: 700, color: '#ffffff', margin: 0 }}>
                                A Armadilha da Fonte Única
                            </h3>
                            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '14px', lineHeight: 1.6, margin: 0 }}>
                                Depender exclusivamente de um salário mensal das 8h às 16h no contexto económico atual é viver a um passo da vulnerabilidade. A inflação corrói o poder de compra e qualquer imprevisto desestabiliza as tuas finanças.
                            </p>
                            <ul style={{ paddingLeft: '18px', margin: 0, color: 'rgba(255,255,255,0.6)', fontSize: '13px', lineHeight: 1.8 }}>
                                <li>Teto salarial rígido sem perspectiva de aumento imediato</li>
                                <li>Vulnerabilidade perante corte de custos da empresa</li>
                                <li>Sensação de trocar tempo precioso por quantias insuficientes</li>
                            </ul>
                        </div>

                        {/* The Solution (Bisnoteka Emerald Accent) */}
                        <div style={{
                            flex: 1,
                            backgroundColor: '#111613',
                            border: '1px solid #1a3824',
                            borderRadius: '16px',
                            padding: isMobile ? '30px 20px' : '40px 35px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '20px'
                        }}>
                            <div style={{ width: '48px', height: '48px', backgroundColor: '#22c55e', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Sparkles size={22} color="#000000" />
                            </div>
                            <h3 style={{ fontSize: '22px', fontWeight: 700, color: '#ffffff', margin: 0 }}>
                                A Rota da Multiplicação em Part-Time
                            </h3>
                            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '14px', lineHeight: 1.6, margin: 0 }}>
                                Como Luciano Bom-Ano explica no livro, a renda extra não exige abandonar o emprego: dedicares 1h a 2h diárias ou os teus fins de semana a prestar serviços com as tuas habilidades já existentes cria uma segunda fonte sólida e previsível.
                            </p>
                            <ul style={{ paddingLeft: '18px', margin: 0, color: 'rgba(255,255,255,0.6)', fontSize: '13px', lineHeight: 1.8 }}>
                                <li>Faturação extra de 100.000 a 1.000.000+ Kz por mês</li>
                                <li>Sem risco de desemprego: constróis enquanto recebes o teu salário</li>
                                <li>Liberdade financeira real para investir, poupar e prosperar</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Divider Line */}
            <div style={{ maxWidth: '1000px', margin: '0 auto', borderBottom: '1px solid rgba(255,255,255,0.15)' }}></div>

            {/* ========================================================================= */}
            {/* O ARSENAL (+114 IDEIAS) - INTERACTIVE EXPLORER COM GANCHOS DE CURIOSIDADE */}
            {/* ========================================================================= */}
            <section id="arsenal" style={{ padding: isMobile ? '60px 20px' : '110px 20px', backgroundColor: '#000000' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                        <div style={{ fontSize: '13px', fontWeight: 700, color: '#22c55e', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                            Catálogo de Oportunidades & Ganchos
                        </div>
                        <h2 style={{ fontSize: isMobile ? '36px' : '60px', fontWeight: 700, color: '#fff', margin: '0 0 16px' }}>
                            O Arsenal de Ideias
                        </h2>
                        <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: isMobile ? '15px' : '18px', maxWidth: '750px', margin: '0 auto' }}>
                            Ideias tão lucrativas que parecem ilegais. Explora uma amostra das brechas de mercado detalhadas no livro oficial e descobre como funcionam na prática.
                        </p>
                    </div>

                    {/* Filter Bar */}
                    <div style={{
                        display: 'flex',
                        flexDirection: isMobile ? 'column' : 'row',
                        gap: '15px',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '30px'
                    }}>
                        {/* B2B / B2C Tabs */}
                        <div style={{ display: 'flex', gap: '8px', backgroundColor: '#111613', padding: '6px', borderRadius: '99px', border: '1px solid #1a231d' }}>
                            {[
                                { id: 'ALL', label: 'Todas as Ideias' },
                                { id: 'B2B', label: 'Modelos B2B (+70)' },
                                { id: 'B2C', label: 'Modelos B2C (40)' }
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    type="button"
                                    onClick={() => {
                                        setActiveTab(tab.id as any);
                                        setSelectedCategory('Todas');
                                    }}
                                    style={{
                                        padding: '8px 18px',
                                        borderRadius: '99px',
                                        border: 'none',
                                        backgroundColor: activeTab === tab.id ? '#22c55e' : 'transparent',
                                        color: activeTab === tab.id ? '#000000' : 'rgba(255,255,255,0.7)',
                                        fontSize: '12px',
                                        fontWeight: 700,
                                        cursor: 'pointer',
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        {/* Search Input */}
                        <div style={{ position: 'relative', width: isMobile ? '100%' : '320px' }}>
                            <Search size={16} color="rgba(255,255,255,0.4)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                            <input
                                type="text"
                                placeholder="Pesquisar por ideia, gancho..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                style={{
                                    width: '100%',
                                    backgroundColor: '#111613',
                                    border: '1px solid #1a231d',
                                    borderRadius: '99px',
                                    padding: '10px 16px 10px 40px',
                                    color: '#ffffff',
                                    fontSize: '13px',
                                    outline: 'none',
                                    boxSizing: 'border-box'
                                }}
                            />
                        </div>
                    </div>

                    {/* Category Filter Pills */}
                    <div style={{
                        display: 'flex',
                        gap: '8px',
                        overflowX: 'auto',
                        paddingBottom: '16px',
                        marginBottom: '30px',
                        scrollbarWidth: 'none'
                    }}>
                        {availableCategories.map((cat) => (
                            <button
                                key={cat}
                                type="button"
                                onClick={() => setSelectedCategory(cat)}
                                style={{
                                    padding: '6px 14px',
                                    borderRadius: '99px',
                                    border: selectedCategory === cat ? '1px solid #22c55e' : '1px solid #1a231d',
                                    backgroundColor: selectedCategory === cat ? '#18271e' : '#111613',
                                    color: selectedCategory === cat ? '#22c55e' : 'rgba(255,255,255,0.6)',
                                    fontSize: '12px',
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                    whiteSpace: 'nowrap'
                                }}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Ideas Grid (Curiosity-Driven Cards) */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
                        gap: '20px'
                    }}>
                        {filteredIdeas.slice(0, 18).map((idea) => (
                            <div
                                key={idea.id}
                                style={{
                                    backgroundColor: '#111613',
                                    border: '1px solid #1a231d',
                                    borderRadius: '14px',
                                    padding: '24px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    transition: 'all 0.25s',
                                    cursor: 'default'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = '#151d17';
                                    e.currentTarget.style.borderColor = 'rgba(34,197,94,0.45)';
                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = '#111613';
                                    e.currentTarget.style.borderColor = '#1a231d';
                                    e.currentTarget.style.transform = 'translateY(0)';
                                }}
                            >
                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <span style={{ fontSize: '11px', fontWeight: 800, color: '#22c55e', backgroundColor: '#18271e', padding: '3px 8px', borderRadius: '4px' }}>
                                                #{idea.number}
                                            </span>
                                            <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', fontWeight: 600 }}>
                                                {idea.category}
                                            </span>
                                        </div>
                                        <span style={{ fontSize: '10px', fontWeight: 700, color: idea.type === 'B2B' ? '#38bdf8' : '#f472b6', backgroundColor: idea.type === 'B2B' ? 'rgba(56,189,248,0.1)' : 'rgba(244,114,182,0.1)', padding: '2px 8px', borderRadius: '4px' }}>
                                            {idea.type}
                                        </span>
                                    </div>

                                    <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#ffffff', marginBottom: '12px', lineHeight: 1.3 }}>
                                        {idea.title}
                                    </h3>

                                    {/* Curiosity Hook Description */}
                                    <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.75)', lineHeight: 1.55, marginBottom: '14px' }}>
                                        {idea.description}
                                    </p>

                                    {/* The Practical Secret Box */}
                                    {idea.example && (
                                        <div style={{
                                            borderLeft: '2px solid #22c55e',
                                            backgroundColor: '#0a0e0b',
                                            padding: '8px 12px',
                                            borderRadius: '0 6px 6px 0',
                                            fontSize: '12px',
                                            color: '#ffffff',
                                            fontStyle: 'italic',
                                            marginBottom: '14px',
                                            lineHeight: 1.4
                                        }}>
                                            <span style={{ color: '#22c55e', fontWeight: 700, fontStyle: 'normal', display: 'block', fontSize: '10px', textTransform: 'uppercase', marginBottom: '2px' }}>
                                                O Enigma Prático:
                                            </span>
                                            {idea.example}
                                        </div>
                                    )}

                                    {/* Book Reference Anchor */}
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '6px',
                                        fontSize: '11px',
                                        color: '#22c55e',
                                        fontWeight: 600,
                                        backgroundColor: '#142218',
                                        padding: '6px 10px',
                                        borderRadius: '6px',
                                        marginBottom: '16px'
                                    }}>
                                        <BookOpen size={13} color="#22c55e" style={{ flexShrink: 0 }} />
                                        <span>{idea.skills}</span>
                                    </div>
                                </div>

                                <div style={{
                                    paddingTop: '14px',
                                    borderTop: '1px solid rgba(255,255,255,0.08)',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    gap: '10px'
                                }}>
                                    <div style={{ minWidth: 0, flex: 1 }}>
                                        <div style={{ fontSize: '10px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', fontWeight: 700, letterSpacing: '0.04em' }}>
                                            Potencial de Faturação
                                        </div>
                                        <div style={{ fontSize: '13px', fontWeight: 800, color: '#22c55e', marginTop: '2px', wordBreak: 'break-word', lineHeight: 1.2 }}>
                                            {idea.price}
                                        </div>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => setIsCheckoutModalOpen(true)}
                                        style={{
                                            background: 'none',
                                            border: '1px solid rgba(34,197,94,0.3)',
                                            color: 'rgba(255,255,255,0.9)',
                                            fontSize: '11px',
                                            fontWeight: 700,
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '4px',
                                            padding: '6px 10px',
                                            borderRadius: '6px',
                                            backgroundColor: 'rgba(34,197,94,0.08)',
                                            whiteSpace: 'nowrap',
                                            flexShrink: 0,
                                            transition: 'all 0.2s'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.backgroundColor = '#22c55e';
                                            e.currentTarget.style.borderColor = '#22c55e';
                                            e.currentTarget.style.color = '#000000';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.backgroundColor = 'rgba(34,197,94,0.08)';
                                            e.currentTarget.style.borderColor = 'rgba(34,197,94,0.3)';
                                            e.currentTarget.style.color = 'rgba(255,255,255,0.9)';
                                        }}
                                    >
                                        <span>Ver no Livro</span>
                                        <ArrowRight size={12} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Footer Banner to Buy Ebook */}
                    <div style={{
                        marginTop: '40px',
                        textAlign: 'center',
                        padding: '36px 24px',
                        backgroundColor: '#111613',
                        borderRadius: '16px',
                        border: '1px solid #1a231d'
                    }}>
                        <p style={{ fontSize: '19px', fontWeight: 700, color: '#ffffff', marginBottom: '8px' }}>
                            Queres descobrir como funciona cada um dos +114 modelos e aplicá-los passo a passo?
                        </p>
                        <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', marginBottom: '24px', maxWidth: '680px', margin: '0 auto 24px' }}>
                            O livro oficial possui 581 páginas com o plano infalível para 1 Milhão Kz/mês por ideia, roteiros de abordagem em Angola, checklists práticos e acesso imediato aos 6 E-books Bónus e aos 16 POPs em Word.
                        </p>
                        <button
                            onClick={() => setIsCheckoutModalOpen(true)}
                            style={{
                                backgroundColor: '#22c55e',
                                color: '#000000',
                                fontWeight: 700,
                                fontSize: '14px',
                                padding: '14px 32px',
                                borderRadius: '99px',
                                border: 'none',
                                cursor: 'pointer'
                            }}
                        >
                            Adquirir o Livro Oficial Completo (15.000 Kz)
                        </button>
                    </div>
                </div>
            </section>

            {/* Divider Line */}
            <div style={{ maxWidth: '1000px', margin: '0 auto', borderBottom: '1px solid rgba(255,255,255,0.15)' }}></div>

            {/* ========================================================================= */}
            {/* BÓNUS EXCLUSIVOS (NEW DEDICATED SECTION) */}
            {/* ========================================================================= */}
            <section id="bonus" style={{ padding: isMobile ? '60px 20px' : '110px 20px', backgroundColor: '#000000' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                        <div style={{ fontSize: '13px', fontWeight: 800, color: '#22c55e', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                            Acesso Imediato Incluído
                        </div>
                        <h2 style={{ fontSize: isMobile ? '36px' : '60px', fontWeight: 700, color: '#fff', margin: '0 0 16px' }}>
                            Bónus Exclusivos de Lançamento
                        </h2>
                        <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: isMobile ? '15px' : '18px', maxWidth: '750px', margin: '0 auto' }}>
                            Ao adquirires a edição oficial de 581 páginas hoje, recebes acesso imediato e vitalício a um ecossistema complementar de aceleração avaliado em mais de <strong>AKZ 85.000</strong>.
                        </p>
                    </div>

                    {/* BONUS PART 1: 6 E-BOOKS COMPLEMENTARES */}
                    <div style={{ marginBottom: '60px' }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            marginBottom: '24px',
                            paddingBottom: '12px',
                            borderBottom: '1px solid rgba(255,255,255,0.1)'
                        }}>
                            <div style={{
                                width: '36px',
                                height: '36px',
                                borderRadius: '50%',
                                backgroundColor: '#22c55e',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#000000',
                                fontWeight: 800,
                                fontSize: '14px'
                            }}>
                                1
                            </div>
                            <div>
                                <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#ffffff', margin: 0 }}>
                                    Coleção de 6 E-books Estratégicos de Apoio (305 Páginas no Total)
                                </h3>
                                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', margin: '2px 0 0' }}>
                                    Manuais práticos em PDF para acelerar planeamento, mentalidade, automação e terceirização.
                                </p>
                            </div>
                        </div>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
                            gap: '20px'
                        }}>
                            {BONUS_BOOKS.map((book) => (
                                <div
                                    key={book.id}
                                    style={{
                                        backgroundColor: '#111613',
                                        border: '1px solid #1a231d',
                                        borderRadius: '12px',
                                        padding: '24px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-between',
                                        transition: 'all 0.2s'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = '#161e19';
                                        e.currentTarget.style.borderColor = 'rgba(34,197,94,0.3)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = '#111613';
                                        e.currentTarget.style.borderColor = '#1a231d';
                                    }}
                                >
                                    <div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                                            <span style={{ fontSize: '11px', fontWeight: 700, color: '#22c55e', backgroundColor: '#18271e', padding: '3px 8px', borderRadius: '4px' }}>
                                                {book.tag}
                                            </span>
                                            <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>
                                                {book.pages}
                                            </span>
                                        </div>
                                        <h4 style={{ fontSize: '17px', fontWeight: 700, color: '#ffffff', marginBottom: '10px', lineHeight: 1.3 }}>
                                            {book.title}
                                        </h4>
                                        <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.5, margin: 0 }}>
                                            {book.desc}
                                        </p>
                                    </div>
                                    <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#22c55e', fontWeight: 600 }}>
                                        <BookCheck size={14} /> Ficheiro em PDF Pronto para Leitura
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* BONUS PART 2: 16 POPs OPERACIONAIS EM WORD */}
                    <div>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            marginBottom: '24px',
                            paddingBottom: '12px',
                            borderBottom: '1px solid rgba(255,255,255,0.1)'
                        }}>
                            <div style={{
                                width: '36px',
                                height: '36px',
                                borderRadius: '50%',
                                backgroundColor: '#22c55e',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#000000',
                                fontWeight: 800,
                                fontSize: '14px'
                            }}>
                                2
                            </div>
                            <div>
                                <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#ffffff', margin: 0 }}>
                                    Pack Operacional com 16 POPs Editáveis em Word (.DOCX)
                                </h3>
                                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', margin: '2px 0 0' }}>
                                    Procedimentos Operacionais Padronizados prontos a editar com a tua marca ou usar em consultoria.
                                </p>
                            </div>
                        </div>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
                            gap: '14px'
                        }}>
                            {BONUS_POPS.map((pop, idx) => (
                                <div
                                    key={idx}
                                    style={{
                                        backgroundColor: '#111613',
                                        border: '1px solid #1a231d',
                                        borderRadius: '8px',
                                        padding: '14px 18px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        gap: '12px'
                                    }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <FileText size={18} color="#22c55e" style={{ flexShrink: 0 }} />
                                        <div>
                                            <div style={{ fontSize: '13px', fontWeight: 600, color: '#ffffff' }}>
                                                {pop.title}
                                            </div>
                                            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', marginTop: '2px' }}>
                                                Área: {pop.area} • Ficheiro Microsoft Word (.docx) Editável
                                            </div>
                                        </div>
                                    </div>
                                    <span style={{ fontSize: '11px', color: '#22c55e', fontWeight: 700, backgroundColor: '#18271e', padding: '3px 8px', borderRadius: '4px', whiteSpace: 'nowrap' }}>
                                        .DOCX
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Divider Line */}
            <div style={{ maxWidth: '1000px', margin: '0 auto', borderBottom: '1px solid rgba(255,255,255,0.15)' }}></div>

            {/* ========================================================================= */}
            {/* SIMULADOR DE RENDA EXTRA */}
            {/* ========================================================================= */}
            <section id="simulador" style={{ padding: isMobile ? '60px 20px' : '110px 20px', backgroundColor: '#000000' }}>
                <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                        <div style={{ fontSize: '13px', fontWeight: 700, color: '#22c55e', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                            Simulação Realista de Ganhos
                        </div>
                        <h2 style={{ fontSize: isMobile ? '36px' : '60px', fontWeight: 700, color: '#fff', margin: 0 }}>
                            Simulador de Faturação
                        </h2>
                    </div>

                    <div style={{
                        backgroundColor: '#111613',
                        borderRadius: '16px',
                        border: '1px solid #1a231d',
                        padding: isMobile ? '30px 20px' : '50px 40px',
                        display: 'grid',
                        gridTemplateColumns: isMobile ? '1fr' : '1.2fr 0.8fr',
                        gap: '40px',
                        alignItems: 'center'
                    }}>
                        <div>
                            {/* Area */}
                            <div style={{ marginBottom: '24px' }}>
                                <label style={{ display: 'block', fontSize: '12px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', fontWeight: 700, marginBottom: '10px' }}>
                                    Área de Foco
                                </label>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                                    {[
                                        { id: 'ai', label: 'IA & Automação' },
                                        { id: 'copy', label: 'Escrita & Conteúdo' },
                                        { id: 'sales', label: 'Vendas & Negociação' },
                                        { id: 'design', label: 'Design & Branding' }
                                    ].map((role) => (
                                        <button
                                            key={role.id}
                                            type="button"
                                            onClick={() => setSelectedRole(role.id as any)}
                                            style={{
                                                padding: '12px',
                                                borderRadius: '8px',
                                                border: selectedRole === role.id ? '1.5px solid #22c55e' : '1px solid #1a231d',
                                                backgroundColor: selectedRole === role.id ? '#152119' : '#0a0e0b',
                                                color: selectedRole === role.id ? '#22c55e' : 'rgba(255,255,255,0.7)',
                                                fontSize: '12px',
                                                fontWeight: 700,
                                                cursor: 'pointer'
                                            }}
                                        >
                                            {role.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Hours slider */}
                            <div style={{ marginBottom: '24px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                    <label style={{ fontSize: '12px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', fontWeight: 700 }}>
                                        Horas Dedicadas por Semana
                                    </label>
                                    <span style={{ fontSize: '13px', fontWeight: 700, color: '#22c55e' }}>
                                        {hoursPerWeek} horas / semana
                                    </span>
                                </div>
                                <input
                                    type="range"
                                    min={5}
                                    max={30}
                                    step={1}
                                    value={hoursPerWeek}
                                    onChange={(e) => setHoursPerWeek(Number(e.target.value))}
                                    style={{
                                        width: '100%',
                                        accentColor: '#22c55e',
                                        cursor: 'pointer'
                                    }}
                                />
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'rgba(255,255,255,0.4)', marginTop: '4px' }}>
                                    <span>5h (Part-time leve)</span>
                                    <span>15h (Noites e fins de semana)</span>
                                    <span>30h (Quase full-time)</span>
                                </div>
                            </div>

                            {/* Experience Level */}
                            <div>
                                <label style={{ display: 'block', fontSize: '12px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', fontWeight: 700, marginBottom: '10px' }}>
                                    Nível de Experiência
                                </label>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                                    {[
                                        { id: 'iniciante', label: 'Iniciante' },
                                        { id: 'intermediario', label: 'Intermédio' },
                                        { id: 'avancado', label: 'Avançado' }
                                    ].map((tier) => (
                                        <button
                                            key={tier.id}
                                            type="button"
                                            onClick={() => setExperienceTier(tier.id as any)}
                                            style={{
                                                padding: '10px',
                                                borderRadius: '8px',
                                                border: experienceTier === tier.id ? '1.5px solid #22c55e' : '1px solid #1a231d',
                                                backgroundColor: experienceTier === tier.id ? '#152119' : '#0a0e0b',
                                                color: experienceTier === tier.id ? '#22c55e' : 'rgba(255,255,255,0.7)',
                                                fontSize: '12px',
                                                fontWeight: 700,
                                                cursor: 'pointer'
                                            }}
                                        >
                                            {tier.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Result Display Card */}
                        <div style={{
                            backgroundColor: '#0a0e0b',
                            border: '1.5px solid #22c55e',
                            borderRadius: '12px',
                            padding: '30px 24px',
                            textAlign: 'center',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '16px'
                        }}>
                            <div style={{ fontSize: '12px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', fontWeight: 700 }}>
                                Potencial Estimado de Renda Extra
                            </div>
                            <div>
                                <div style={{ fontSize: isMobile ? '32px' : '44px', fontWeight: 800, color: '#22c55e', letterSpacing: '-1px' }}>
                                    AKZ {calculatedEarnings.formattedMonthly}
                                </div>
                                <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>
                                    por mês em regime part-time
                                </div>
                            </div>

                            <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '16px' }}>
                                <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)' }}>
                                    Projeção Anual: <strong style={{ color: '#ffffff' }}>AKZ {calculatedEarnings.formattedYearly}</strong>
                                </div>
                                <div style={{ fontSize: '12px', color: '#22c55e', marginTop: '6px', fontWeight: 600 }}>
                                    Paga o investimento no livro {calculatedEarnings.multiplier}x logo no primeiro mês
                                </div>
                            </div>

                            <button
                                onClick={() => setIsCheckoutModalOpen(true)}
                                style={{
                                    backgroundColor: '#22c55e',
                                    color: '#000000',
                                    fontWeight: 700,
                                    fontSize: '13px',
                                    padding: '12px',
                                    borderRadius: '99px',
                                    border: 'none',
                                    cursor: 'pointer',
                                    marginTop: '8px'
                                }}
                            >
                                Começar com o Livro (15.000 Kz)
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Divider Line */}
            <div style={{ maxWidth: '1000px', margin: '0 auto', borderBottom: '1px solid rgba(255,255,255,0.15)' }}></div>

            {/* ========================================================================= */}
            {/* DEPOIMENTOS / PROVA SOCIAL */}
            {/* ========================================================================= */}
            <section style={{ padding: isMobile ? '60px 20px' : '110px 20px', backgroundColor: '#000000' }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                        <div style={{ fontSize: '13px', fontWeight: 700, color: '#22c55e', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                            Depoimentos Reais
                        </div>
                        <h2 style={{ fontSize: isMobile ? '36px' : '60px', fontWeight: 700, color: '#fff', margin: 0 }}>
                            O que diz quem já aplicou
                        </h2>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '20px' }}>
                        {[
                            {
                                quote: "Apliquei a ideia de Gestão de LinkedIn para Executivos (Ideia 10). Em 3 semanas fechei dois clientes diretores em Talatona que me pagam 250.000 Kz cada por mês.",
                                name: "Edmilson C.",
                                role: "Analista de Marketing & Freelancer",
                                location: "Luanda"
                            },
                            {
                                quote: "O capítulo de automação com IA e os POPs de fluxo de caixa em Word pouparam-me meses de tentativa e erro. Já faturei mais de 1.800.000 Kz só a organizar processos de pequenas lojas.",
                                name: "Teresa M.",
                                role: "Consultora de Processos",
                                location: "Benguela"
                            },
                            {
                                quote: "O maior diferencial é que os números estão todos na nossa moeda, em Kwanzas, e adaptados para o mercado real de Angola. Não é aquela teoria gringa que não funciona aqui.",
                                name: "Mauro S.",
                                role: "Engenheiro & Criador de Renda Extra",
                                location: "Luanda"
                            }
                        ].map((t, idx) => (
                            <div
                                key={idx}
                                style={{
                                    backgroundColor: '#111613',
                                    border: '1px solid #1a231d',
                                    borderRadius: '12px',
                                    padding: '28px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between'
                                }}
                            >
                                <div>
                                    <div style={{ display: 'flex', gap: '4px', marginBottom: '16px' }}>
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} size={16} fill="#22c55e" color="#22c55e" />
                                        ))}
                                    </div>
                                    <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '14px', lineHeight: 1.6, fontStyle: 'italic', margin: 0 }}>
                                        "{t.quote}"
                                    </p>
                                </div>
                                <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                                    <div style={{ fontSize: '14px', fontWeight: 700, color: '#ffffff' }}>{t.name}</div>
                                    <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)' }}>{t.role} • {t.location}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Divider Line */}
            <div style={{ maxWidth: '1000px', margin: '0 auto', borderBottom: '1px solid rgba(255,255,255,0.15)' }}></div>

            {/* ========================================================================= */}
            {/* ========================================================================= */}
            {/* SOBRE O AUTOR (LUCIANO BOM-ANO - FOTO OFICIAL & ECOSSISTEMA) */}
            {/* ========================================================================= */}
            <section id="autor" style={{ padding: isMobile ? '60px 20px' : '110px 20px', backgroundColor: '#000000' }}>
                <div style={{ maxWidth: '1040px', margin: '0 auto' }}>
                    {/* Top Profile Card */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: isMobile ? '1fr' : '300px 1fr',
                        gap: isMobile ? '32px' : '48px',
                        alignItems: 'center',
                        marginBottom: '48px'
                    }}>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{
                                width: isMobile ? '240px' : '290px',
                                maxWidth: '100%',
                                aspectRatio: '3 / 4',
                                borderRadius: '16px',
                                overflow: 'hidden',
                                margin: '0 auto',
                                border: '2px solid #22c55e',
                                boxShadow: '0 20px 50px rgba(0,0,0,0.8), 0 0 25px rgba(34,197,94,0.2)'
                            }}>
                                <img
                                    src="/media/luciano-bom-ano-suit.jpg"
                                    alt="Luciano Bom-Ano - Autor, Mentor de Negócios e Fundador"
                                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', display: 'block' }}
                                    onError={(e) => { e.currentTarget.src = "/media/luciano-bom-ano.jpg"; }}
                                />
                            </div>
                            <div style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '6px',
                                marginTop: '14px',
                                backgroundColor: '#111613',
                                border: '1px solid #1a231d',
                                padding: '6px 14px',
                                borderRadius: '20px',
                                fontSize: '11px',
                                color: '#22c55e',
                                fontWeight: 700
                            }}>
                                <Award size={13} color="#22c55e" />
                                <span>Serial Entrepreneur & Designer</span>
                            </div>
                        </div>

                        <div>
                            <div style={{ fontSize: '13px', fontWeight: 700, color: '#22c55e', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '1px' }}>
                                O Mentor, Estrategista & Autor
                            </div>
                            <h2 style={{ fontSize: isMobile ? '32px' : '48px', fontWeight: 700, color: '#ffffff', margin: '0 0 16px', lineHeight: 1.15 }}>
                                Luciano Bom-Ano
                            </h2>
                            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '15px', lineHeight: 1.65, marginBottom: '14px' }}>
                                Mentor de negócios, especialista em estratégia e fundador da <strong>Bisnoteka</strong>. Luciano tem dedicado a sua trajetória a descomplicar o empreendedorismo em Angola e a capacitar profissionais para transformarem conhecimentos práticos em fontes de receita sustentáveis.
                            </p>
                            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', lineHeight: 1.6, marginBottom: '20px' }}>
                                É especialista em <strong>Branding</strong> e <strong>Fullstack Designer</strong>, fundador e CEO da <strong>Bhao Agency</strong> (Agência de Branding, Criação, activação e gestão de marcas), e líder de ecossistemas inovadores em tecnologia, indústria da construção, agronegócio e educação criativa em Angola.
                            </p>

                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                                <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.7)', backgroundColor: '#111613', border: '1px solid #1a231d', padding: '6px 12px', borderRadius: '6px' }}>
                                    ✨ +10 Anos no Ecossistema
                                </span>
                                <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.7)', backgroundColor: '#111613', border: '1px solid #1a231d', padding: '6px 12px', borderRadius: '6px' }}>
                                    🚀 7+ Startups & Plataformas
                                </span>
                                <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.7)', backgroundColor: '#111613', border: '1px solid #1a231d', padding: '6px 12px', borderRadius: '6px' }}>
                                    👥 Mais de 5.000 Profissionais Formados
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Ecosystem & Founded Ventures Grid */}
                    <div style={{
                        backgroundColor: '#0a0e0b',
                        border: '1px solid #1a231d',
                        borderRadius: '16px',
                        padding: isMobile ? '22px 16px' : '32px 28px'
                    }}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: isMobile ? 'flex-start' : 'center',
                            flexDirection: isMobile ? 'column' : 'row',
                            gap: '10px',
                            marginBottom: '24px',
                            borderBottom: '1px solid rgba(255,255,255,0.08)',
                            paddingBottom: '16px'
                        }}>
                            <div>
                                <span style={{ fontSize: '11px', fontWeight: 800, color: '#22c55e', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                    Experiência de Campo & Empreendimentos
                                </span>
                                <h3 style={{ fontSize: isMobile ? '20px' : '24px', fontWeight: 700, color: '#ffffff', margin: '4px 0 0' }}>
                                    Ecossistema de Empresas e Plataformas Fundadas
                                </h3>
                            </div>
                            <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>
                                Metodologias validadas em operações de mercado real
                            </span>
                        </div>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
                            gap: '16px'
                        }}>
                            {/* 1. Bhao Agency */}
                            <div style={{
                                backgroundColor: '#111613',
                                border: '1px solid #1a231d',
                                borderRadius: '12px',
                                padding: '20px',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                transition: 'all 0.2s'
                            }}>
                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                                        <span style={{ fontSize: '10px', fontWeight: 800, color: '#22c55e', backgroundColor: '#18271e', padding: '2px 8px', borderRadius: '4px' }}>
                                            BRANDING & DESIGN
                                        </span>
                                        <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>
                                            Fundador & CEO
                                        </span>
                                    </div>
                                    <h4 style={{ fontSize: '17px', fontWeight: 700, color: '#ffffff', marginBottom: '4px' }}>
                                        Bhao Agency
                                    </h4>
                                    <div style={{ fontSize: '11px', color: '#22c55e', fontWeight: 600, marginBottom: '10px' }}>
                                        Especialista em Branding & Fullstack Designer
                                    </div>
                                    <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.5, margin: 0 }}>
                                        Agência de Branding, Criação, activação e gestão estratégica de marcas.
                                    </p>
                                </div>
                            </div>

                            {/* 2. Arkhus360 */}
                            <div style={{
                                backgroundColor: '#111613',
                                border: '1px solid #1a231d',
                                borderRadius: '12px',
                                padding: '20px',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                transition: 'all 0.2s'
                            }}>
                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                                        <span style={{ fontSize: '10px', fontWeight: 800, color: '#38bdf8', backgroundColor: 'rgba(56,189,248,0.1)', padding: '2px 8px', borderRadius: '4px' }}>
                                            INDÚSTRIA AEC
                                        </span>
                                        <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>
                                            Fundador & CEO
                                        </span>
                                    </div>
                                    <h4 style={{ fontSize: '17px', fontWeight: 700, color: '#ffffff', marginBottom: '4px' }}>
                                        Arkhus360
                                    </h4>
                                    <div style={{ fontSize: '11px', color: '#38bdf8', fontWeight: 600, marginBottom: '10px' }}>
                                        Plataforma All-in-One
                                    </div>
                                    <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.5, margin: 0 }}>
                                        Plataforma AIO para Arquitectos, Engenheiros e Profissionais da indústria AEC.
                                    </p>
                                </div>
                            </div>

                            {/* 3. Brivo360 */}
                            <div style={{
                                backgroundColor: '#111613',
                                border: '1px solid #1a231d',
                                borderRadius: '12px',
                                padding: '20px',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                transition: 'all 0.2s'
                            }}>
                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                                        <span style={{ fontSize: '10px', fontWeight: 800, color: '#a855f7', backgroundColor: 'rgba(168,85,247,0.1)', padding: '2px 8px', borderRadius: '4px' }}>
                                            BRAND MANAGEMENT
                                        </span>
                                        <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>
                                            Fundador & CEO
                                        </span>
                                    </div>
                                    <h4 style={{ fontSize: '17px', fontWeight: 700, color: '#ffffff', marginBottom: '4px' }}>
                                        Brivo360
                                    </h4>
                                    <div style={{ fontSize: '11px', color: '#a855f7', fontWeight: 600, marginBottom: '10px' }}>
                                        Brandbooks Vivos
                                    </div>
                                    <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.5, margin: 0 }}>
                                        Plataforma de Gestão de Marcas em tempo real por meio de Brandbooks vivos e colaborativos.
                                    </p>
                                </div>
                            </div>

                            {/* 4. Bukly */}
                            <div style={{
                                backgroundColor: '#111613',
                                border: '1px solid #1a231d',
                                borderRadius: '12px',
                                padding: '20px',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                transition: 'all 0.2s'
                            }}>
                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                                        <span style={{ fontSize: '10px', fontWeight: 800, color: '#f59e0b', backgroundColor: 'rgba(245,158,11,0.1)', padding: '2px 8px', borderRadius: '4px' }}>
                                            EDTECH & MÍDIA
                                        </span>
                                        <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>
                                            Fundador & CEO
                                        </span>
                                    </div>
                                    <h4 style={{ fontSize: '17px', fontWeight: 700, color: '#ffffff', marginBottom: '4px' }}>
                                        Bukly
                                    </h4>
                                    <div style={{ fontSize: '11px', color: '#f59e0b', fontWeight: 600, marginBottom: '10px' }}>
                                        Podcasts & Resumos Críticos
                                    </div>
                                    <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.5, margin: 0 }}>
                                        Plataforma de consumo de livros em formato podcast, debate, crítica e resumo executivo.
                                    </p>
                                </div>
                            </div>

                            {/* 5. Kietu Farm */}
                            <div style={{
                                backgroundColor: '#111613',
                                border: '1px solid #1a231d',
                                borderRadius: '12px',
                                padding: '20px',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                transition: 'all 0.2s'
                            }}>
                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                                        <span style={{ fontSize: '10px', fontWeight: 800, color: '#22c55e', backgroundColor: '#18271e', padding: '2px 8px', borderRadius: '4px' }}>
                                            AGRITECH
                                        </span>
                                        <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>
                                            Fundador
                                        </span>
                                    </div>
                                    <h4 style={{ fontSize: '17px', fontWeight: 700, color: '#ffffff', marginBottom: '4px' }}>
                                        Kietu Farm
                                    </h4>
                                    <div style={{ fontSize: '11px', color: '#22c55e', fontWeight: 600, marginBottom: '10px' }}>
                                        Inovação no Agronegócio
                                    </div>
                                    <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.5, margin: 0 }}>
                                        Plataforma revolucionária dedicada à modernização e transformação do setor agrícola.
                                    </p>
                                </div>
                            </div>

                            {/* 6. IAK */}
                            <div style={{
                                backgroundColor: '#111613',
                                border: '1px solid #1a231d',
                                borderRadius: '12px',
                                padding: '20px',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                transition: 'all 0.2s'
                            }}>
                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                                        <span style={{ fontSize: '10px', fontWeight: 800, color: '#ec4899', backgroundColor: 'rgba(236,72,153,0.1)', padding: '2px 8px', borderRadius: '4px' }}>
                                            ECONOMIA CRIATIVA
                                        </span>
                                        <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>
                                            Fundador
                                        </span>
                                    </div>
                                    <h4 style={{ fontSize: '17px', fontWeight: 700, color: '#ffffff', marginBottom: '4px' }}>
                                        IAK
                                    </h4>
                                    <div style={{ fontSize: '11px', color: '#ec4899', fontWeight: 600, marginBottom: '10px' }}>
                                        Instituto Angolano de Criatividade
                                    </div>
                                    <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.5, margin: 0 }}>
                                        Instituição voltada para a formação, desenvolvimento e capacitação de talentos criativos em Angola.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Divider Line */}
            <div style={{ maxWidth: '1000px', margin: '0 auto', borderBottom: '1px solid rgba(255,255,255,0.15)' }}></div>

            {/* ========================================================================= */}
            {/* PRICING SECTION (FAUNDR MAGAZINE VALUE STACK) */}
            {/* ========================================================================= */}
            <section id="preco" style={{ padding: isMobile ? '60px 20px' : '110px 20px', backgroundColor: '#000000' }}>
                <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: '#22c55e', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '2px' }}>
                        Oferta Oficial de Lançamento
                    </div>
                    <h2 style={{ fontSize: isMobile ? '36px' : '60px', fontWeight: 700, marginBottom: '16px', color: '#fff' }}>
                        Adquirir o Livro Oficial
                    </h2>
                    <p style={{ fontSize: isMobile ? '15px' : '18px', color: 'rgba(255,255,255,0.6)', maxWidth: '650px', margin: '0 auto 50px', lineHeight: 1.5 }}>
                        Acesso imediato e vitalício à obra completa de 581 páginas em PDF HD, à coleção de 6 e-books bónus e ao pack de 16 POPs em Word.
                    </p>

                    <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', flexWrap: 'wrap' }}>
                        {/* The Main Offer Card */}
                        <div style={{
                            width: isMobile ? '100%' : '480px',
                            backgroundColor: '#111613',
                            border: '2px solid #22c55e',
                            borderRadius: '20px',
                            padding: isMobile ? '36px 20px' : '48px 36px',
                            textAlign: 'left',
                            display: 'flex',
                            flexDirection: 'column'
                        }}>
                            <div style={{ width: '60px', height: '60px', backgroundColor: '#22c55e', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                                <BookOpen size={30} color="#000000" />
                            </div>

                            <h3 style={{ fontSize: '26px', fontWeight: 700, marginBottom: '8px', color: '#fff' }}>Combo Oficial Completo</h3>
                            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px', marginBottom: '24px' }}>Pagamento Único • Acesso Vitalício Imediato</p>

                            {/* Stacked Value Breakdown */}
                            <div style={{
                                backgroundColor: '#0a0e0b',
                                borderRadius: '10px',
                                padding: '16px',
                                border: '1px solid #1a231d',
                                marginBottom: '24px'
                            }}>
                                <div style={{ fontSize: '11px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', fontWeight: 700, marginBottom: '8px' }}>
                                    Valor dos Componentes Separados:
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'rgba(255,255,255,0.7)', marginBottom: '4px' }}>
                                    <span>• Livro +114 Ideias (581 Páginas em PDF)</span>
                                    <span style={{ textDecoration: 'line-through' }}>AKZ 35.000</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'rgba(255,255,255,0.7)', marginBottom: '4px' }}>
                                    <span>• 6 E-books Bónus Estratégicos (305 Pág.)</span>
                                    <span style={{ textDecoration: 'line-through' }}>AKZ 45.000</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'rgba(255,255,255,0.7)', marginBottom: '4px' }}>
                                    <span>• Pack 16 POPs Operacionais (.DOCX Word)</span>
                                    <span style={{ textDecoration: 'line-through' }}>AKZ 30.000</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'rgba(255,255,255,0.7)', marginBottom: '8px' }}>
                                    <span>• Glossário Prático de Estratégia (A a W)</span>
                                    <span style={{ textDecoration: 'line-through' }}>AKZ 10.000</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: 700, color: 'rgba(255,255,255,0.5)', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '6px' }}>
                                    <span>Valor Real Total:</span>
                                    <span style={{ textDecoration: 'line-through' }}>AKZ 120.000</span>
                                </div>
                            </div>

                            <div style={{ marginBottom: '26px' }}>
                                <div style={{ fontSize: '18px', color: 'rgba(255,255,255,0.4)', textDecoration: 'line-through', fontWeight: 700 }}>Valor Total: AKZ 120.000</div>
                                <div style={{ fontSize: '52px', fontWeight: 800, color: '#22c55e', letterSpacing: '-1px' }}>AKZ 15.000</div>
                                <div style={{ fontSize: '12px', color: '#22c55e', fontWeight: 600, marginTop: '2px' }}>Poupança de mais de 87% nesta edição de lançamento</div>
                            </div>

                            <button
                                onClick={() => setIsCheckoutModalOpen(true)}
                                style={{
                                    width: '100%',
                                    height: '60px',
                                    backgroundColor: '#22c55e',
                                    color: '#000000',
                                    border: 'none',
                                    borderRadius: '8px',
                                    fontSize: '17px',
                                    fontWeight: 700,
                                    cursor: 'pointer',
                                    marginBottom: '30px',
                                    transition: 'all 0.2s'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.filter = 'brightness(1.1)'}
                                onMouseLeave={(e) => e.currentTarget.style.filter = 'brightness(1)'}
                            >
                                Comprar Agora por 15.000 Kz
                            </button>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                                {[
                                    "Livro oficial completo em PDF HD (581 páginas)",
                                    "Mais de 70 ideias B2B e 40 ideias B2C completas",
                                    "Roteiro infalível para faturar 1M Kz/mês por ideia",
                                    "Glossário de termos e estratégias de negócios (A a W)",
                                    "Bónus 1: Pack de 6 E-books Estratégicos (305 pág.)",
                                    "Bónus 2: Pack de 16 POPs em Microsoft Word (.docx)",
                                    "Entrega imediata no teu e-mail e WhatsApp",
                                    "Garantia incondicional de satisfação de 7 dias"
                                ].map((feature, i) => (
                                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <div style={{ width: '20px', height: '20px', backgroundColor: 'rgba(34,197,94,0.15)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                            <Check size={12} color="#22c55e" strokeWidth={3} />
                                        </div>
                                        <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.85)', lineHeight: 1.4 }}>{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Divider Line */}
            <div style={{ maxWidth: '1000px', margin: '0 auto', borderBottom: '1px solid rgba(255,255,255,0.15)' }}></div>

            {/* ========================================================================= */}
            {/* FAQ SECTION (FAUNDR MAGAZINE ACCORDION) */}
            {/* ========================================================================= */}
            <section style={{ padding: isMobile ? '60px 20px' : '110px 20px', backgroundColor: '#000000' }}>
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                        <div style={{ fontSize: '13px', fontWeight: 700, color: '#22c55e', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                            Dúvidas Comuns
                        </div>
                        <h2 style={{ fontSize: isMobile ? '36px' : '60px', fontWeight: 700, color: '#fff', margin: 0 }}>
                            Perguntas Frequentes
                        </h2>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                        {FAQS.map((faq, index) => (
                            <div
                                key={index}
                                style={{
                                    backgroundColor: '#111613',
                                    border: '1px solid #1a231d',
                                    borderRadius: '12px',
                                    overflow: 'hidden'
                                }}
                            >
                                <button
                                    onClick={() => setFaqOpen(faqOpen === index ? null : index)}
                                    style={{
                                        width: '100%',
                                        padding: '22px 24px',
                                        backgroundColor: 'transparent',
                                        border: 'none',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        cursor: 'pointer',
                                        textAlign: 'left'
                                    }}
                                >
                                    <span style={{ fontSize: '16px', fontWeight: 700, color: '#ffffff', paddingRight: '16px' }}>
                                        {faq.q}
                                    </span>
                                    <ChevronDown
                                        size={20}
                                        color="#22c55e"
                                        style={{
                                            transform: faqOpen === index ? 'rotate(180deg)' : 'none',
                                            transition: 'transform 0.2s',
                                            flexShrink: 0
                                        }}
                                    />
                                </button>
                                <AnimatePresence>
                                    {faqOpen === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <div style={{
                                                padding: '0 24px 22px',
                                                fontSize: '14px',
                                                lineHeight: 1.6,
                                                color: 'rgba(255,255,255,0.7)',
                                                borderTop: '1px solid rgba(255,255,255,0.06)',
                                                paddingTop: '16px'
                                            }}>
                                                {faq.a}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ========================================================================= */}
            {/* FOOTER (CLEAN FAUNDR MAGAZINE STYLE) */}
            {/* ========================================================================= */}
            <footer style={{
                borderTop: '1px solid rgba(255,255,255,0.1)',
                padding: '40px 20px',
                textAlign: 'center',
                backgroundColor: '#0a0e0b'
            }}>
                <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', alignItems: 'center', gap: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ width: '28px', height: '28px', backgroundColor: '#22c55e', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <BookOpen size={16} color="#000000" />
                        </div>
                        <span style={{ fontSize: '15px', fontWeight: 800, color: '#ffffff' }}>BISNOTEKA</span>
                    </div>

                    <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>
                        © 2026 Bisnoteka • +114 Ideias Lucrativas de Renda Extra por Luciano Bom-Ano. Todos os direitos reservados.
                    </div>

                    <div style={{ display: 'flex', gap: '16px', fontSize: '12px' }}>
                        <Link to="/livros" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>Biblioteca</Link>
                        <Link to="/" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>Início</Link>
                    </div>
                </div>
            </footer>

            {/* ========================================================================= */}
            {/* CHECKOUT MODAL (MULTICAIXA EXPRESS & IBAN COM UPLOAD DE COMPROVATIVO) */}
            {/* ========================================================================= */}
            <AnimatePresence>
                {isCheckoutModalOpen && (
                    <div style={{
                        position: 'fixed',
                        inset: 0,
                        backgroundColor: 'rgba(0,0,0,0.85)',
                        backdropFilter: 'blur(8px)',
                        zIndex: 9999,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '20px'
                    }}>
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            style={{
                                backgroundColor: '#111613',
                                border: '1px solid #22c55e',
                                borderRadius: '20px',
                                maxWidth: '520px',
                                width: '100%',
                                padding: isMobile ? '24px 20px' : '32px 36px',
                                position: 'relative',
                                maxHeight: '92vh',
                                overflowY: 'auto',
                                boxShadow: '0 25px 70px rgba(0,0,0,0.9), 0 0 40px rgba(34,197,94,0.15)'
                            }}
                        >
                            <button
                                onClick={() => {
                                    setIsCheckoutModalOpen(false);
                                    setIsSuccess(false);
                                }}
                                style={{
                                    position: 'absolute',
                                    top: '18px',
                                    right: '18px',
                                    background: 'none',
                                    border: 'none',
                                    color: 'rgba(255,255,255,0.6)',
                                    fontSize: '24px',
                                    cursor: 'pointer',
                                    padding: '4px'
                                }}
                            >
                                ✕
                            </button>

                            {!isSuccess ? (
                                <>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                                        <div style={{ width: '32px', height: '32px', backgroundColor: '#22c55e', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <BookOpen size={18} color="#000000" />
                                        </div>
                                        <div>
                                            <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#ffffff', margin: 0 }}>
                                                Adquirir Edição Oficial
                                            </h3>
                                            <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', margin: 0 }}>
                                                Livro Oficial (581 Pág.) + 6 E-books + 16 POPs
                                            </p>
                                        </div>
                                    </div>

                                    {/* Price Box */}
                                    <div style={{
                                        backgroundColor: '#0a0e0b',
                                        padding: '12px 16px',
                                        borderRadius: '10px',
                                        border: '1px solid #1a231d',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        marginBottom: '18px'
                                    }}>
                                        <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)' }}>Total a Pagar:</span>
                                        <div style={{ textAlign: 'right' }}>
                                            <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', textDecoration: 'line-through', marginRight: '8px' }}>120.000 Kz</span>
                                            <span style={{ fontSize: '20px', fontWeight: 800, color: '#22c55e' }}>AKZ 15.000</span>
                                        </div>
                                    </div>

                                    {/* Payment Method Selector */}
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '18px' }}>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setPaymentMethod('express');
                                                setUploadError(null);
                                            }}
                                            style={{
                                                padding: '12px',
                                                borderRadius: '8px',
                                                border: paymentMethod === 'express' ? '1.5px solid #22c55e' : '1px solid #1a231d',
                                                backgroundColor: paymentMethod === 'express' ? '#18271e' : '#0a0e0b',
                                                color: paymentMethod === 'express' ? '#22c55e' : 'rgba(255,255,255,0.7)',
                                                fontSize: '13px',
                                                fontWeight: 700,
                                                cursor: 'pointer'
                                            }}
                                        >
                                            Multicaixa Express
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setPaymentMethod('iban');
                                                setUploadError(null);
                                            }}
                                            style={{
                                                padding: '12px',
                                                borderRadius: '8px',
                                                border: paymentMethod === 'iban' ? '1.5px solid #22c55e' : '1px solid #1a231d',
                                                backgroundColor: paymentMethod === 'iban' ? '#18271e' : '#0a0e0b',
                                                color: paymentMethod === 'iban' ? '#22c55e' : 'rgba(255,255,255,0.7)',
                                                fontSize: '13px',
                                                fontWeight: 700,
                                                cursor: 'pointer'
                                            }}
                                        >
                                            Transferência / IBAN
                                        </button>
                                    </div>

                                    {paymentMethod === 'iban' && (
                                        <div style={{
                                            backgroundColor: '#0a0e0b',
                                            padding: '12px 14px',
                                            borderRadius: '8px',
                                            border: '1px solid #1a231d',
                                            marginBottom: '16px'
                                        }}>
                                            <div style={{ fontSize: '11px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', fontWeight: 700, marginBottom: '6px' }}>
                                                Dados Bancários (BAI Angola):
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                                                <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.8)' }}>Beneficiário:</span>
                                                <span style={{ fontSize: '12px', fontWeight: 600, color: '#ffffff' }}>BISNOTEKA SERVICOS DIGITAIS</span>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.8)' }}>IBAN:</span>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                    <span style={{ fontSize: '12px', fontWeight: 700, color: '#22c55e' }}>AO06.0040.0000.8934.1234.1012.3</span>
                                                    <button
                                                        type="button"
                                                        onClick={() => copyToClipboard('AO06004000008934123410123')}
                                                        style={{ background: 'none', border: 'none', color: '#22c55e', cursor: 'pointer', padding: '2px' }}
                                                        title="Copiar IBAN"
                                                    >
                                                        {copiedIban ? <CheckCheck size={14} /> : <Copy size={14} />}
                                                    </button>
                                                </div>
                                            </div>
                                            {copiedIban && (
                                                <div style={{ fontSize: '11px', color: '#22c55e', marginTop: '4px', textAlign: 'right' }}>
                                                    IBAN copiado para a área de transferência!
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* Checkout Form */}
                                    <form onSubmit={handleCheckoutSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                                        <div>
                                            <label style={{ display: 'block', fontSize: '12px', color: 'rgba(255,255,255,0.6)', marginBottom: '5px', fontWeight: 600 }}>
                                                Teu Nome Completo
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                placeholder="Ex: Manuel António"
                                                value={buyerName}
                                                onChange={(e) => setBuyerName(e.target.value)}
                                                style={{
                                                    width: '100%',
                                                    backgroundColor: '#0a0e0b',
                                                    border: '1px solid #1a231d',
                                                    borderRadius: '8px',
                                                    padding: '10px 14px',
                                                    color: '#ffffff',
                                                    fontSize: '13px',
                                                    outline: 'none',
                                                    boxSizing: 'border-box'
                                                }}
                                            />
                                        </div>

                                        <div>
                                            <label style={{ display: 'block', fontSize: '12px', color: 'rgba(255,255,255,0.6)', marginBottom: '5px', fontWeight: 600 }}>
                                                {paymentMethod === 'express' ? 'Teu Número Multicaixa Express (9xx xxx xxx)' : 'Teu Número WhatsApp para Envio'}
                                            </label>
                                            <input
                                                type="tel"
                                                required
                                                placeholder="Ex: 923 000 000"
                                                value={buyerPhone}
                                                onChange={(e) => setBuyerPhone(e.target.value)}
                                                style={{
                                                    width: '100%',
                                                    backgroundColor: '#0a0e0b',
                                                    border: '1px solid #1a231d',
                                                    borderRadius: '8px',
                                                    padding: '10px 14px',
                                                    color: '#ffffff',
                                                    fontSize: '13px',
                                                    outline: 'none',
                                                    boxSizing: 'border-box'
                                                }}
                                            />
                                        </div>

                                        <div>
                                            <label style={{ display: 'block', fontSize: '12px', color: 'rgba(255,255,255,0.6)', marginBottom: '5px', fontWeight: 600 }}>
                                                Teu E-mail para Envio dos Ficheiros
                                            </label>
                                            <input
                                                type="email"
                                                required
                                                placeholder="Ex: manuel@gmail.com"
                                                value={buyerEmail}
                                                onChange={(e) => setBuyerEmail(e.target.value)}
                                                style={{
                                                    width: '100%',
                                                    backgroundColor: '#0a0e0b',
                                                    border: '1px solid #1a231d',
                                                    borderRadius: '8px',
                                                    padding: '10px 14px',
                                                    color: '#ffffff',
                                                    fontSize: '13px',
                                                    outline: 'none',
                                                    boxSizing: 'border-box'
                                                }}
                                            />
                                        </div>

                                        {/* ========================================================= */}
                                        {/* COMPROVATIVO UPLOAD INPUT AREA (FOR IBAN / TRANSFERÊNCIA) */}
                                        {/* ========================================================= */}
                                        {paymentMethod === 'iban' && (
                                            <div>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                                                    <label style={{ fontSize: '12px', color: 'rgba(255,255,255,0.8)', fontWeight: 600 }}>
                                                        Comprovativo de Transferência <span style={{ color: '#22c55e' }}>*</span>
                                                    </label>
                                                    <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>PDF, JPG ou PNG até 15MB</span>
                                                </div>

                                                {!receiptFile ? (
                                                    <div
                                                        onDragOver={(e) => { e.preventDefault(); setIsDraggingFile(true); }}
                                                        onDragLeave={() => setIsDraggingFile(false)}
                                                        onDrop={(e) => {
                                                            e.preventDefault();
                                                            setIsDraggingFile(false);
                                                            if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                                                                handleFileChange(e.dataTransfer.files[0]);
                                                            }
                                                        }}
                                                        onClick={() => document.getElementById('comprovativo-upload-input')?.click()}
                                                        style={{
                                                            backgroundColor: isDraggingFile ? '#16281e' : '#0a0e0b',
                                                            border: isDraggingFile ? '2px dashed #22c55e' : (uploadError ? '1.5px dashed #ef4444' : '1.5px dashed rgba(34,197,94,0.4)'),
                                                            borderRadius: '10px',
                                                            padding: '18px 16px',
                                                            textAlign: 'center',
                                                            cursor: 'pointer',
                                                            transition: 'all 0.2s',
                                                            display: 'flex',
                                                            flexDirection: 'column',
                                                            alignItems: 'center',
                                                            gap: '8px'
                                                        }}
                                                        onMouseEnter={(e) => {
                                                            if (!isDraggingFile) e.currentTarget.style.borderColor = '#22c55e';
                                                        }}
                                                        onMouseLeave={(e) => {
                                                            if (!isDraggingFile && !uploadError) e.currentTarget.style.borderColor = 'rgba(34,197,94,0.4)';
                                                        }}
                                                    >
                                                        <input
                                                            id="comprovativo-upload-input"
                                                            type="file"
                                                            accept="image/*,application/pdf"
                                                            onChange={(e) => {
                                                                if (e.target.files && e.target.files[0]) {
                                                                    handleFileChange(e.target.files[0]);
                                                                }
                                                            }}
                                                            style={{ display: 'none' }}
                                                        />
                                                        <div style={{
                                                            width: '40px',
                                                            height: '40px',
                                                            borderRadius: '50%',
                                                            backgroundColor: 'rgba(34,197,94,0.12)',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center'
                                                        }}>
                                                            <UploadCloud size={22} color="#22c55e" />
                                                        </div>
                                                        <div>
                                                            <div style={{ fontSize: '13px', fontWeight: 600, color: '#ffffff' }}>
                                                                Arrasta o comprovativo ou <span style={{ color: '#22c55e', textDecoration: 'underline' }}>clica para anexar</span>
                                                            </div>
                                                            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', marginTop: '2px' }}>
                                                                Anexa o recibo emitido pelo teu banco ou aplicativo
                                                            </div>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div style={{
                                                        backgroundColor: '#0a0e0b',
                                                        border: '1.5px solid #22c55e',
                                                        borderRadius: '10px',
                                                        padding: '12px 14px',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'space-between',
                                                        gap: '12px'
                                                    }}>
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
                                                            <div style={{
                                                                width: '34px',
                                                                height: '34px',
                                                                borderRadius: '8px',
                                                                backgroundColor: 'rgba(34,197,94,0.15)',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                flexShrink: 0
                                                            }}>
                                                                <FileCheck size={18} color="#22c55e" />
                                                            </div>
                                                            <div style={{ minWidth: 0 }}>
                                                                <div style={{
                                                                    fontSize: '13px',
                                                                    fontWeight: 600,
                                                                    color: '#ffffff',
                                                                    whiteSpace: 'nowrap',
                                                                    overflow: 'hidden',
                                                                    textOverflow: 'ellipsis'
                                                                }}>
                                                                    {receiptFileName}
                                                                </div>
                                                                <div style={{ fontSize: '11px', color: '#22c55e', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                                                                    <span>{receiptFileSize}</span>
                                                                    <span>•</span>
                                                                    <span style={{ fontWeight: 600 }}>Comprovativo anexado ✓</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <button
                                                            type="button"
                                                            onClick={handleRemoveFile}
                                                            style={{
                                                                background: 'none',
                                                                border: 'none',
                                                                color: 'rgba(255,255,255,0.5)',
                                                                cursor: 'pointer',
                                                                padding: '6px',
                                                                borderRadius: '6px',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                transition: 'color 0.2s'
                                                            }}
                                                            title="Remover ou substituir ficheiro"
                                                            onMouseEnter={(e) => e.currentTarget.style.color = '#ef4444'}
                                                            onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </div>
                                                )}

                                                {uploadError && (
                                                    <div style={{ fontSize: '12px', color: '#ef4444', marginTop: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                        <span>⚠️</span>
                                                        <span>{uploadError}</span>
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            style={{
                                                width: '100%',
                                                height: '52px',
                                                backgroundColor: '#22c55e',
                                                color: '#000000',
                                                border: 'none',
                                                borderRadius: '8px',
                                                fontSize: '15px',
                                                fontWeight: 800,
                                                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                                                marginTop: '8px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                gap: '10px'
                                            }}
                                        >
                                            {isSubmitting ? (
                                                <span>A processar envio...</span>
                                            ) : (
                                                <span>
                                                    {paymentMethod === 'express' 
                                                        ? 'Pagar Agora via Express (15.000 Kz)' 
                                                        : (receiptFile ? 'Enviar Comprovativo e Concluir' : 'Confirmar Envio do Comprovativo')}
                                                </span>
                                            )}
                                        </button>
                                    </form>
                                </>
                            ) : (
                                <div style={{ textAlign: 'center', padding: '20px 0' }}>
                                    <div style={{ width: '64px', height: '64px', backgroundColor: 'rgba(34,197,94,0.15)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                                        <CheckCircle2 size={36} color="#22c55e" />
                                    </div>
                                    <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#ffffff', marginBottom: '10px' }}>
                                        {paymentMethod === 'iban' ? 'Comprovativo Recebido com Sucesso!' : 'Solicitação Express Registada!'}
                                    </h3>
                                    
                                    {paymentMethod === 'iban' ? (
                                        <>
                                            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.5, marginBottom: '16px' }}>
                                                O teu comprovativo <strong>{receiptFileName}</strong> foi anexado ao teu pedido. A nossa equipa valida o depósito e os ficheiros (Livro oficial de 581 páginas + 6 Bónus + 16 POPs) são liberados diretamente para:
                                            </p>
                                            <div style={{ backgroundColor: '#0a0e0b', padding: '12px 16px', borderRadius: '8px', border: '1px solid #1a231d', marginBottom: '20px', textAlign: 'left', fontSize: '13px' }}>
                                                <div style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '4px' }}>
                                                    📱 WhatsApp: <strong style={{ color: '#22c55e' }}>{buyerPhone}</strong>
                                                </div>
                                                <div style={{ color: 'rgba(255,255,255,0.8)' }}>
                                                    📧 E-mail: <strong style={{ color: '#22c55e' }}>{buyerEmail}</strong>
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.5, marginBottom: '20px' }}>
                                            Enviámos uma notificação de 15.000 Kz para o teu telemóvel Multicaixa Express (<strong>{buyerPhone}</strong>). Assim que aprovares no teu telefone, os ficheiros são descarregados instantaneamente.
                                        </p>
                                    )}

                                    <button
                                        onClick={() => {
                                            setIsCheckoutModalOpen(false);
                                            setIsSuccess(false);
                                            setReceiptFile(null);
                                            setReceiptFileName('');
                                            setReceiptFileSize('');
                                        }}
                                        style={{
                                            backgroundColor: '#22c55e',
                                            color: '#000000',
                                            border: 'none',
                                            borderRadius: '99px',
                                            padding: '12px 28px',
                                            fontSize: '14px',
                                            fontWeight: 700,
                                            cursor: 'pointer'
                                        }}
                                    >
                                        Concluir
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Book114IdeiasLandingPage;
