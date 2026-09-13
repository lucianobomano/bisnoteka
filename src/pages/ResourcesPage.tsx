import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Search, BookOpen, CheckSquare, Download, 
    Sparkles, ArrowUpRight, Zap, CheckCircle2, Circle, ChevronRight, Check
} from 'lucide-react';

// Interfaces
interface Term {
    id: string;
    term: string;
    category: string;
    definition: string;
    example: string;
}

interface ChecklistItem {
    id: string;
    text: string;
    completed: boolean;
}

interface ChecklistGroup {
    id: string;
    title: string;
    description: string;
    badge: 'Freemium' | 'Premium';
    extension: string;
    size: string;
    downloadsCount: string;
    image: string;
    items: ChecklistItem[];
}

interface AppTool {
    id: string;
    name: string;
    category: string;
    type: 'Freemium' | 'Premium' | 'Grátis';
    description: string;
    rating: number;
    icon: string;
    url: string;
}

interface DownloadableResource {
    id: string;
    title: string;
    category: string;
    format: string;
    extension: string;
    size: string;
    type: 'Freemium' | 'Premium';
    downloadsCount: string;
    description: string;
    image: string;
    content: string;
}

const dictionaryTerms: Term[] = [
    { id: '1', term: 'CAC (Custo de Aquisição de Cliente)', category: 'Finanças & Métricas', definition: 'O valor médio gasto em marketing e vendas para conquistar um único novo cliente.', example: 'Se gastou $1.000 em anúncios e conseguiu 10 clientes, seu CAC é de $100.' },
    { id: '2', term: 'LTV (Lifetime Value)', category: 'Finanças & Métricas', definition: 'O lucro líquido total gerado por um cliente ao longo de todo o tempo em que consome o seu produto.', example: 'Se um cliente paga $20/mês e fica 12 meses, seu LTV bruto é $240.' },
    { id: '3', term: 'Runway', category: 'Gestão & Captação', definition: 'O número de meses que a sua startup consegue operar antes que o caixa acabe, mantendo a receita e gastos atuais.', example: 'Com $60.000 no banco e burn rate de $10.000/mês, o seu Runway é de 6 meses.' },
    { id: '4', term: 'Burn Rate', category: 'Finanças & Métricas', definition: 'A taxa com que a empresa consome o seu capital disponível por mês.', example: 'Se a empresa gasta $15.000/mês a mais do que fatura, o Burn Rate mensal é $15.000.' },
    { id: '5', term: 'ARR (Annual Recurring Revenue)', category: 'Finanças & Métricas', definition: 'Receita Recorrente Anual acumulada proveniente de contratos ou assinaturas ativas.', example: 'Se tem $10.000 MRR (mensal), seu ARR é de $120.000.' },
    { id: '6', term: 'Product-Market Fit (PMF)', category: 'Estratégia & Produto', definition: 'O estado em que o seu produto satisfaz uma forte procura de mercado de forma sustentável.', example: 'Quando os clientes atuais começam a recomendar organicamente e a retenção é alta.' },
    { id: '7', term: 'Bootstrapping', category: 'Finanças & Métricas', definition: 'Criar e fazer crescer uma empresa usando apenas recursos próprios, sem investimento externo.', example: 'Iniciar uma consultoria com poupanças pessoais e reinvestir os lucros do primeiro cliente.' },
    { id: '8', term: 'Cap Table (Capitalization Table)', category: 'Legal & Captação', definition: 'Tabela estruturada que detalha a percentagem de propriedade da empresa entre fundadores, investidores e opções de ações.', example: 'Tabela discriminando 70% Fundador A, 20% Fundador B e 10% Investidor Anjo.' }
];

const dictionaryDownloadableFiles: DownloadableResource[] = [
    {
        id: 'dict-file-1',
        title: 'Dicionário Completo do Empreendedor (E-Book PDF)',
        category: 'Glossário Técnico & Conceitos',
        format: 'Livro Digital PDF',
        extension: 'PDF',
        size: '5.8 MB',
        type: 'Freemium',
        downloadsCount: '6.4k',
        image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=600',
        description: 'Manual definitivo em PDF reunindo mais de 80 conceitos de finanças, captação, produto, marketing e direito societário.',
        content: `=====================================================
DICIONÁRIO COMPLETO DO EMPREENDEDOR - FOUNDR FORGE 2026
=====================================================

1. CAC (Custo de Aquisição de Cliente)
2. LTV (Lifetime Value)
3. RUNWAY (Tempo de Vida do Caixa)
4. BURN RATE (Taxa de Queima de Caixa)
5. ARR & MRR (Receita Recorrente Anual e Mensal)
6. PRODUCT-MARKET FIT (PMF)
7. BOOTSTRAPPING
8. CAP TABLE & TERM SHEET

=====================================================
FOUNDR FORGE - EDICAO OFICIAL
`
    },
    {
        id: 'dict-file-2',
        title: 'Guia Prático de Métricas & Indicadores SaaS',
        category: 'Finanças & Métricas',
        format: 'Documento Técnico PDF',
        extension: 'PDF',
        size: '3.2 MB',
        type: 'Premium',
        downloadsCount: '2.9k',
        image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=600',
        description: 'Guia explicativo das fórmulas matemáticas e interpretação de Churn, Expansion MRR, Quick Ratio e Payback Period.',
        content: `=====================================================
GUIA PRÁTICO DE MÉTRICAS SAAS & KPI - FOUNDR FORGE
=====================================================
- CHURN RATE = (Clientes Perdidos no Mês / Clientes no Início) * 100
- PAYBACK DO CAC = CAC / (MRR Médio por Cliente * Margem Bruta)
- SAAS QUICK RATIO = (Novo MRR + Expansion MRR) / (Churn MRR + Contraction MRR)
`
    },
    {
        id: 'dict-file-3',
        title: 'Glossário Jurídico para Startups & Captação',
        category: 'Legal & Societário',
        format: 'Minuta / Documento DOCX',
        extension: 'DOCX',
        size: '1.4 MB',
        type: 'Freemium',
        downloadsCount: '3.8k',
        image: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=600',
        description: 'Termos jurídicos descodificados: MÚTUO CONVERSÍVEL, DRAG-ALONG, TAG-ALONG, VESTING, CLIFF e BAD LEAVER.',
        content: `=====================================================
GLOSSÁRIO JURÍDICO DE CAPTAÇÃO & SOCIETÁRIO - FOUNDR
=====================================================
- MÚTUO CONVERSÍVEL: Empréstimo que pode ser convertido em participação societária no futuro.
- DRAG-ALONG: Direito do acionista maioritário de obrigar os minoritários a vender as suas ações numa aquisição.
- TAG-ALONG: Direito do minoritário de vender as suas ações nas mesmas condições oferecidas ao maioritário.
`
    }
];

const initialChecklists: ChecklistGroup[] = [
    {
        id: 'chk-1',
        title: 'Checklist de Lançamento de Startup MVP',
        description: 'Passos fundamentais para tirar a sua ideia do papel e validar o produto no mercado real.',
        badge: 'Freemium',
        extension: 'PDF',
        size: '2.1 MB',
        downloadsCount: '4.2k',
        image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&q=80&w=600',
        items: [
            { id: '1-1', text: 'Definir proposta de valor clara em uma frase', completed: true },
            { id: '1-2', text: 'Mapear os 3 principais problemas do cliente ideal', completed: true },
            { id: '1-3', text: 'Criar Landing Page simples com formulário de captura', completed: false },
            { id: '1-4', text: 'Entrevistar 15 potenciais clientes (Problema/Solução)', completed: false },
            { id: '1-5', text: 'Lançar MVP funcional e recolher os primeiros 10 feedbacks', completed: false }
        ]
    },
    {
        id: 'chk-2',
        title: 'Checklist de Preparação para Captação de Recursos',
        description: 'Tudo o que precisa de organizar antes de abrir a sua primeira ronda com investidores.',
        badge: 'Premium',
        extension: 'DOCX',
        size: '3.4 MB',
        downloadsCount: '1.9k',
        image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=600',
        items: [
            { id: '2-1', text: 'Elaborar Pitch Deck com 10 a 12 slides claros', completed: false },
            { id: '2-2', text: 'Construir Modelo Financeiro e projeção de 3 anos', completed: false },
            { id: '2-3', text: 'Estruturar Cap Table atualizada', completed: false },
            { id: '2-4', text: 'Organizar Data Room (contratos, registo legal, BI)', completed: false },
            { id: '2-5', text: 'Lista com 30 fundos/anjos alinhados ao seu setor', completed: false }
        ]
    },
    {
        id: 'chk-3',
        title: 'Checklist de Due Diligence Legal & Compliance',
        description: 'Auditoria preventiva dos ativos, contratos de trabalho, LGPD/RGPD e patentes.',
        badge: 'Freemium',
        extension: 'PDF',
        size: '1.9 MB',
        downloadsCount: '3.1k',
        image: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=600',
        items: [
            { id: '3-1', text: 'Registo oficial da marca no instituto de propriedade industrial', completed: true },
            { id: '3-2', text: 'Contratos de prestação de serviços com cláusula de propriedade intelectual', completed: true },
            { id: '3-3', text: 'Política de privacidade e Termos de Uso atualizados no site', completed: false },
            { id: '3-4', text: 'Registo de certidões negativas fiscais e laborais', completed: false }
        ]
    }
];

const appTools: AppTool[] = [
    { id: 'tool-1', name: 'Notion for Startups', category: 'Gestão & Documentação', type: 'Freemium', description: 'Workspace centralizado para documentar wikis, gerir projetos e organizar processos.', rating: 4.9, icon: '📝', url: 'https://notion.so' },
    { id: 'tool-2', name: 'Stripe Payments', category: 'Finanças & Pagamentos', type: 'Freemium', description: 'Infraestrutura de pagamentos global para cobranças recorrentes e checkout rápido.', rating: 4.8, icon: '💳', url: 'https://stripe.com' },
    { id: 'tool-3', name: 'Figma Design', category: 'Design & Prototipagem', type: 'Freemium', description: 'Ferramenta colaborativa de criação de interfaces e protótipos de produtos.', rating: 4.9, icon: '🎨', url: 'https://figma.com' },
    { id: 'tool-4', name: 'Make (Integromat)', category: 'Automação & No-Code', type: 'Freemium', description: 'Plataforma visual para conectar aplicações e automatizar fluxos de trabalho.', rating: 4.7, icon: '⚡', url: 'https://make.com' },
    { id: 'tool-5', name: 'ChatGPT Enterprise', category: 'IA & Produtividade', type: 'Premium', description: 'Assistente virtual avançado para análise de dados, redação e estratégia comercial.', rating: 4.9, icon: '🤖', url: 'https://openai.com' },
    { id: 'tool-6', name: 'Mixpanel Analytics', category: 'Análise de Dados', type: 'Freemium', description: 'Métricas de produto e acompanhamento de comportamento do utilizador em tempo real.', rating: 4.6, icon: '📊', url: 'https://mixpanel.com' }
];

const generalDownloadables: DownloadableResource[] = [
    {
        id: 'file-1',
        title: 'Modelo Oficial de Pitch Deck para Captação',
        category: 'Apresentação & Pitch',
        format: 'Documento PDF / Slides',
        extension: 'PDF',
        size: '4.2 MB',
        type: 'Freemium',
        downloadsCount: '3.4k',
        image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=600',
        description: 'Estrutura testada e aprovada por investidores com os 10 slides indispensáveis para apresentar o seu negócio.',
        content: `=====================================================
FOUNDR FORGE - MODELO OFICIAL DE PITCH DECK
=====================================================

SLIDE 1: A OPORTUNIDADE & O PROBLEMA
- Qual a dor principal do seu cliente?
- Quanto custa não resolver este problema hoje?

SLIDE 2: A SUA SOLUÇÃO (O PRODUTO)
- Demonstração visual do MVP em ação.
- Proposta de valor única em 1 frase.

SLIDE 3: TAMANHO DE MERCADO (TAM / SAM / SOM)
- Mercado Total Obtível (TAM)
- Mercado Endereçável (SAM)
- Mercado Alvo Inicial (SOM)

SLIDE 4: MODELO DE NEGÓCIO (BUSINESS MODEL)
- Como ganha dinheiro? (Assinatura, Comissão, Venda Direta)
- Valor do Ticket Médio e margens brutas.

SLIDE 5: TRACÇÃO & MÉTRICAS CHAVE
- Crescimento mensal (% MRR)
- Número de utilizadores / clientes ativos.

SLIDE 6: ESTRATÉGIA GO-TO-MARKET (GTM)
- Canais de aquisição de clientes (Organic, Paid Ads, B2B Sales)
- Custo de Aquisição de Cliente (CAC).

SLIDE 7: COMPETIÇÃO & DIFERENCIAÇÃO
- Matriz competitiva (Você vs Concorrentes).

SLIDE 8: EQUIPA DE FUNDADORES
- Experiência prévia e papéis chave.

SLIDE 9: PROJEÇÕES FINANCEIRAS
- Projeção de receita e resultado líquido para os próximos 3 anos.

SLIDE 10: O PEDIDO DE INVESTIMENTO (THE ASK)
- Quanto está a captar? (Ex: $250.000 por 10% Equity)
- Destino dos fundos (Marketing 50%, Tech 30%, Ops 20%).

=====================================================
Desenvolvido por FOUNDR FORGE © 2026
`
    },
    {
        id: 'file-2',
        title: 'Planilha de Projeção Financeira & Runway (3 Anos)',
        category: 'Finanças & Modelagem',
        format: 'Folha de Cálculo',
        extension: 'CSV',
        size: '1.8 MB',
        type: 'Premium',
        downloadsCount: '2.1k',
        image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=600',
        description: 'Tabela automatizada para cálculo de Burn Rate mensal, Runway disponível, margem bruta e projeção de faturação.',
        content: `Mês,Receita Bruta ($),Custos Operacionais ($),Burn Rate ($),Saldo em Caixa ($),Runway (Meses)
Mês 1,5000,12000,7000,100000,14.2
Mês 2,7500,12500,5000,95000,19.0
Mês 3,11000,13000,2000,93000,46.5
Mês 4,16000,14000,-2000,95000,Break-Even!
Mês 5,22000,15000,-7000,102000,Lucrativo
Mês 6,30000,16000,-14000,116000,Lucrativo
`
    },
    {
        id: 'file-3',
        title: 'Minuta de Acordo de Co-Fundadores & Termo de NDA',
        category: 'Legal & Jurídico',
        format: 'Minuta Legal DOCX',
        extension: 'DOCX',
        size: '950 KB',
        type: 'Freemium',
        downloadsCount: '4.8k',
        image: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=600',
        description: 'Minuta jurídica completa para regulação de divisão de equity, período de vesting e acordo de confidencialidade.',
        content: `=====================================================
MINUTA PADRÃO DE ACORDO DE CO-FUNDADORES (FOUNDR)
=====================================================

1. DAS PARTES E DO OBJECTIVO
Este acordo estabelece os termos de cooperação entre os Co-Fundadores para a criação e desenvolvimento do empreendimento.

2. DA DIVISÃO DE EQUITY (PARTICIPAÇÃO SOCIETÁRIA)
- Fundador A: 50% das ações de fundador.
- Fundador B: 50% das ações de fundador.

3. DO VESTING E CLIFF
- Período de Vesting: 4 anos (48 meses).
- Período de Cliff: 12 meses (nenhuma ação é atribuída antes de completar 1 ano).

4. DA PROPRIEDADE INTELECTUAL
Toda a propriedade intelectual criada por qualquer um dos Co-Fundadores durante o desenvolvimento pertence exclusivamente à Sociedade.

5. ACORDO DE CONFIDENCIALIDADE (NDA)
As partes obrigam-se a manter sob rigoroso segredo industrial e comercial todas as informações técnicas e financeiras.

Assinado digitalmente por ambos os fundadores.
`
    },
    {
        id: 'file-4',
        title: 'Playbook Completo de Vendas B2B & Prospecção',
        category: 'Vendas & Negociação',
        format: 'Manual Técnico',
        extension: 'PDF',
        size: '3.1 MB',
        type: 'Premium',
        downloadsCount: '1.5k',
        image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=600',
        description: 'Guia de cadência de e-mails, cold calls, ultrapassagem de objeções e roteiros de demonstração comercial.',
        content: `=====================================================
PLAYBOOK DE VENDAS B2B - GUIA PRÁTICO DE EXECUÇÃO
=====================================================

ETAPA 1: PROSPECÇÃO & QUALIFICAÇÃO (ICP)
- Como identificar o Decisor (CEO, CTO, VP de Vendas).
- Template de Cold Email de 3 parágrafos com 40%+ de taxa de resposta.

ETAPA 2: A REUNIÃO DE DESCOBERTA (DISCOVERY CALL)
- Perguntas SPIN: Situação, Problema, Implicação e Necessidade de Solução.

ETAPA 3: APROSENTAÇÃO DA PROPOSTA COMERCIAL
- Como ancorar o preço com base no ROI gerado para o cliente.

ETAPA 4: GESTÃO DE OBJEÇÕES
- Objeção "Está muito caro": Focar no custo da inação.
- Objeção "Preciso falar com o meu sócio": Agendar reunião com o sócio no próprio momento.

=====================================================
FOUNDR FORGE - EXCELÊNCIA EM VENDAS
`
    },
    {
        id: 'file-6',
        title: 'Business Model Canvas (Modelo Editável)',
        category: 'Estratégia & Modelagem',
        format: 'Template Editável',
        extension: 'ZIP',
        size: '2.9 MB',
        type: 'Freemium',
        downloadsCount: '5.1k',
        image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=600',
        description: 'Kit de templates em PDF, PNG e SVG do quadro de modelo de negócios para sessões de trabalho em equipa.',
        content: `KIT BUSINESS MODEL CANVAS - FOUNDR FORGE
========================================
1. Parcerias Chave
2. Atividades Chave
3. Recursos Chave
4. Proposta de Valor
5. Relação com Clientes
6. Canais de Distribuição
7. Segmentos de Clientes
8. Estrutura de Custos
9. Fontes de Receita
`
    }
];

const ResourcesPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Todos');
    const [checklists, setChecklists] = useState<ChecklistGroup[]>(initialChecklists);
    const [selectedTermModal, setSelectedTermModal] = useState<Term | null>(null);
    const [downloadingId, setDownloadingId] = useState<string | null>(null);
    const [dbResources, setDbResources] = useState<any[]>([]);

    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

    useEffect(() => {
        const fetchDbResources = async () => {
            try {
                const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
                const res = await fetch(`${API_URL}/api/resources`);
                if (res.ok) {
                    const data = await res.json();
                    setDbResources(data);
                }
            } catch (err) {
                console.error("Failed to fetch db resources:", err);
            }
        };
        fetchDbResources();
    }, []);

    // Combine Static + Database Downloadables
    const allDownloadables = useMemo(() => {
        const mappedFromDb = dbResources.map(r => ({
            id: r.id,
            title: r.title,
            category: r.category,
            format: `Ficheiro ${r.extension || 'PDF'}`,
            extension: r.extension || 'PDF',
            size: r.size || '2.5 MB',
            type: r.accessType || 'Freemium',
            downloadsCount: `${r.downloadsCount || 0}`,
            image: r.coverImage || 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=600',
            description: r.description,
            content: r.content || `Recurso ${r.title}\nCategoria: ${r.category}`,
            fileUrl: r.fileUrl
        }));

        return [...mappedFromDb, ...generalDownloadables];
    }, [dbResources]);

    // Trigger Browser File Download
    const triggerFileDownload = (title: string, extension: string, contentText: string, id: string, fileUrl?: string) => {
        setDownloadingId(id);
        
        setTimeout(() => {
            if (fileUrl && (fileUrl.startsWith('/uploads') || fileUrl.startsWith('http'))) {
                const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
                const fullUrl = fileUrl.startsWith('http') ? fileUrl : `${API_URL}${fileUrl}`;
                const link = document.createElement('a');
                link.href = fullUrl;
                link.target = '_blank';
                link.download = `${title.toLowerCase().replace(/[^a-z0-9]/g, '_')}.${extension.toLowerCase()}`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            } else {
                const blob = new Blob([contentText || 'FOUNDR Resource Content'], { type: 'text/plain;charset=utf-8' });
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                const fileName = `${title.toLowerCase().replace(/[^a-z0-9]/g, '_')}_FOUNDR.${extension.toLowerCase()}`;
                link.download = fileName;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
            }
            setDownloadingId(null);
        }, 500);
    };

    // Filter terms
    const filteredTerms = useMemo(() => {
        return dictionaryTerms.filter(t => 
            t.term.toLowerCase().includes(searchTerm.toLowerCase()) || 
            t.definition.toLowerCase().includes(searchTerm.toLowerCase()) ||
            t.category.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm]);

    // Filter downloadables
    const filteredDownloadables = useMemo(() => {
        return allDownloadables.filter(item => 
            item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm, allDownloadables]);

    // Filter tools
    const filteredTools = useMemo(() => {
        return appTools.filter(tool => 
            tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            tool.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
            tool.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm]);

    // Toggle checklist item
    const toggleCheckitem = (groupId: string, itemId: string) => {
        setChecklists(prev => prev.map(group => {
            if (group.id !== groupId) return group;
            return {
                ...group,
                items: group.items.map(item => item.id === itemId ? { ...item, completed: !item.completed } : item)
            };
        }));
    };

    return (
        <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', color: '#10171f', fontFamily: 'Inter, sans-serif' }}>
            
            {/* Hero Header Section */}
            <section style={{ backgroundColor: '#f6f7f9', padding: isMobile ? '60px 20px 40px' : '90px 40px 60px', borderBottom: '1px solid #e2e8f0' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
                    
                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '6px 16px',
                        backgroundColor: '#ffffff',
                        border: '1px solid #e2e8f0',
                        borderRadius: '12px',
                        fontSize: '11px',
                        fontWeight: 800,
                        color: '#f83821',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        marginBottom: '20px'
                    }}>
                        <Sparkles size={14} /> CENTRAL DE DOWNLOADS E RECURSOS
                    </div>

                    <h1 style={{
                        fontSize: isMobile ? '32px' : '52px',
                        fontWeight: 900,
                        color: '#10171f',
                        textTransform: 'uppercase',
                        letterSpacing: '-1.5px',
                        lineHeight: 1.1,
                        marginBottom: '20px'
                    }}>
                        FICHEIROS PARA DOWNLOAD, CHECKLISTS <br />
                        <span style={{ color: '#f83821' }}>E DICIONÁRIO DO EMPREENDEDOR</span>
                    </h1>

                    <p style={{
                        fontSize: isMobile ? '15px' : '18px',
                        color: '#64748b',
                        maxWidth: '750px',
                        margin: '0 auto 40px',
                        lineHeight: 1.6
                    }}>
                        Descarregue dicionários, checklists interativas e templates editáveis em PDF, Excel, Word e ZIP. Todos os botões em preto com efeito hover!
                    </p>

                    {/* Global Search Bar */}
                    <div style={{ maxWidth: '650px', margin: '0 auto', position: 'relative' }}>
                        <Search size={22} color="#94a3b8" style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)' }} />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Buscar ficheiros para download, dicionário, checklists ou apps..."
                            style={{
                                width: '100%',
                                padding: '18px 20px 18px 56px',
                                fontSize: '15px',
                                backgroundColor: '#ffffff',
                                border: '1px solid #cbd5e1',
                                borderRadius: '12px',
                                outline: 'none',
                                boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                                boxSizing: 'border-box'
                            }}
                        />
                    </div>

                    {/* Quick Category Selector */}
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '30px', flexWrap: 'wrap' }}>
                        {['Todos', 'Ficheiros para Download', 'Dicionário em Ficheiro', 'Checklists em Ficheiro', 'Ferramentas & Apps'].map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                style={{
                                    padding: '10px 20px',
                                    borderRadius: '12px',
                                    fontSize: '13px',
                                    fontWeight: 800,
                                    border: selectedCategory === cat ? '2px solid #f83821' : '1px solid #e2e8f0',
                                    backgroundColor: selectedCategory === cat ? '#10171f' : '#ffffff',
                                    color: selectedCategory === cat ? '#ffffff' : '#475569',
                                    cursor: 'pointer',
                                    transition: 'all 0.25s'
                                }}
                                onMouseEnter={(e) => {
                                    if (selectedCategory !== cat) {
                                        e.currentTarget.style.backgroundColor = '#f83821';
                                        e.currentTarget.style.color = '#ffffff';
                                        e.currentTarget.style.borderColor = '#f83821';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (selectedCategory !== cat) {
                                        e.currentTarget.style.backgroundColor = '#ffffff';
                                        e.currentTarget.style.color = '#475569';
                                        e.currentTarget.style.borderColor = '#e2e8f0';
                                    }
                                }}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                </div>
            </section>

            {/* Main Content Area */}
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: isMobile ? '40px 20px' : '80px 20px', display: 'flex', flexDirection: 'column', gap: '80px' }}>

                {/* 1. SECÇÃO DE DICIONÁRIO DISPONIBILIZADO EM FORMATO DE FICHEIRO */}
                {(selectedCategory === 'Todos' || selectedCategory === 'Dicionário em Ficheiro' || selectedCategory === 'Ficheiros para Download') && (
                    <section>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '30px', flexWrap: 'wrap', gap: '16px' }}>
                            <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#f83821', fontSize: '12px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px' }}>
                                    <BookOpen size={16} /> GLOSSÁRIOS & LIVROS DIGITAIS PARA DOWNLOAD
                                </div>
                                <h2 style={{ fontSize: '28px', fontWeight: 900, textTransform: 'uppercase', color: '#10171f' }}>
                                    DICIONÁRIO DO EMPREENDEDOR (EM FICHEIRO)
                                </h2>
                            </div>
                            <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 600 }}>{dictionaryDownloadableFiles.length} Ficheiros de Dicionário</span>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
                            {dictionaryDownloadableFiles.map(dictFile => (
                                <div
                                    key={dictFile.id}
                                    style={{
                                        padding: '20px',
                                        backgroundColor: '#ffffff',
                                        border: '1px solid #e2e8f0',
                                        borderRadius: '12px',
                                        boxShadow: '0 4px 14px rgba(0,0,0,0.04)',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justify: 'space-between',
                                        position: 'relative',
                                        transition: 'transform 0.3s, box-shadow 0.3s'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-4px)';
                                        e.currentTarget.style.boxShadow = '0 12px 28px rgba(0,0,0,0.08)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = '0 4px 14px rgba(0,0,0,0.04)';
                                    }}
                                >
                                    <div>
                                        {/* Container de Imagem do Card */}
                                        <div style={{
                                            width: '100%',
                                            height: '170px',
                                            borderRadius: '12px',
                                            overflow: 'hidden',
                                            position: 'relative',
                                            marginBottom: '18px',
                                            backgroundColor: '#10171f'
                                        }}>
                                            <img
                                                src={dictFile.image}
                                                alt={dictFile.title}
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'cover',
                                                    opacity: 0.88,
                                                    transition: 'transform 0.5s ease'
                                                }}
                                                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.06)'}
                                                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                            />

                                            {/* Badges Flutuantes */}
                                            <div style={{
                                                position: 'absolute',
                                                top: '12px',
                                                left: '12px',
                                                right: '12px',
                                                display: 'flex',
                                                justify: 'space-between',
                                                alignItems: 'center',
                                                pointerEvents: 'none'
                                            }}>
                                                <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                                                    <span style={{
                                                        fontSize: '10px',
                                                        fontWeight: 900,
                                                        color: '#ffffff',
                                                        backgroundColor: 'rgba(16, 23, 31, 0.85)',
                                                        backdropFilter: 'blur(8px)',
                                                        padding: '4px 10px',
                                                        borderRadius: '12px',
                                                        border: '1px solid rgba(255,255,255,0.15)'
                                                    }}>
                                                        .{dictFile.extension}
                                                    </span>
                                                    <span style={{
                                                        fontSize: '10px',
                                                        fontWeight: 800,
                                                        color: '#ffffff',
                                                        backgroundColor: 'rgba(0, 0, 0, 0.65)',
                                                        backdropFilter: 'blur(8px)',
                                                        padding: '4px 8px',
                                                        borderRadius: '12px'
                                                    }}>
                                                        {dictFile.size}
                                                    </span>
                                                </div>

                                                <span style={{
                                                    fontSize: '10px',
                                                    fontWeight: 900,
                                                    padding: '4px 12px',
                                                    borderRadius: '12px',
                                                    backgroundColor: dictFile.type === 'Freemium' ? '#00c853' : '#f83821',
                                                    color: '#ffffff',
                                                    textTransform: 'uppercase'
                                                }}>
                                                    {dictFile.type}
                                                </span>
                                            </div>
                                        </div>

                                        <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#10171f', marginBottom: '6px', lineHeight: 1.3 }}>{dictFile.title}</h3>
                                        <p style={{ fontSize: '11px', fontWeight: 800, color: '#f83821', textTransform: 'uppercase', marginBottom: '10px' }}>{dictFile.category}</p>
                                        <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.5, marginBottom: '20px' }}>{dictFile.description}</p>
                                    </div>

                                    <div>
                                        <div style={{ fontSize: '11px', fontWeight: 700, color: '#94a3b8', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            <Download size={12} /> {dictFile.downloadsCount} downloads efetuados
                                        </div>

                                        {/* Botão Preto com Hover Vermelho */}
                                        <button
                                            onClick={() => triggerFileDownload(dictFile.title, dictFile.extension, dictFile.content, dictFile.id)}
                                            disabled={downloadingId === dictFile.id}
                                            style={{
                                                width: '100%',
                                                padding: '14px',
                                                backgroundColor: downloadingId === dictFile.id ? '#00c853' : '#10171f',
                                                color: '#ffffff',
                                                border: 'none',
                                                borderRadius: '12px',
                                                fontSize: '13px',
                                                fontWeight: 900,
                                                textTransform: 'uppercase',
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justify: 'center',
                                                gap: '10px',
                                                boxShadow: '0 4px 14px rgba(16, 23, 31, 0.25)',
                                                transition: 'all 0.25s ease'
                                            }}
                                            onMouseEnter={(e) => {
                                                if (downloadingId !== dictFile.id) {
                                                    e.currentTarget.style.backgroundColor = '#f83821';
                                                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(248, 56, 33, 0.35)';
                                                }
                                            }}
                                            onMouseLeave={(e) => {
                                                if (downloadingId !== dictFile.id) {
                                                    e.currentTarget.style.backgroundColor = '#10171f';
                                                    e.currentTarget.style.boxShadow = '0 4px 14px rgba(16, 23, 31, 0.25)';
                                                }
                                            }}
                                        >
                                            {downloadingId === dictFile.id ? (
                                                <>
                                                    <Check size={16} /> A Baixar Dicionário...
                                                </>
                                            ) : (
                                                <>
                                                    <Download size={16} /> Baixar Dicionário ({dictFile.extension})
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* 2. SECÇÃO DE CHECKLISTS DISPONIBILIZADAS EM FORMATO DE FICHEIRO PARA DOWNLOAD */}
                {(selectedCategory === 'Todos' || selectedCategory === 'Checklists em Ficheiro' || selectedCategory === 'Ficheiros para Download') && (
                    <section>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '30px', flexWrap: 'wrap', gap: '16px' }}>
                            <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#0011fd', fontSize: '12px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px' }}>
                                    <CheckSquare size={16} /> CHECKLISTS EM FORMATO DE FICHEIRO EDITÁVEL
                                </div>
                                <h2 style={{ fontSize: '28px', fontWeight: 900, textTransform: 'uppercase', color: '#10171f' }}>
                                    CHECKLISTS DE NEGÓCIO (EM FICHEIRO)
                                </h2>
                            </div>
                            <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 600 }}>{checklists.length} Checklists disponíveis</span>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '24px' }}>
                            {checklists.map(group => {
                                const completedCount = group.items.filter(i => i.completed).length;
                                const progressPct = Math.round((completedCount / group.items.length) * 100);

                                const checklistTextContent = `=====================================================
${group.title.toUpperCase()}
=====================================================
${group.description}

ITENS E TAREFAS:
${group.items.map(item => `[${item.completed ? 'X' : ' '}] ${item.text}`).join('\n')}

=====================================================
FOUNDR FORGE © 2026
`;

                                return (
                                    <div
                                        key={group.id}
                                        style={{
                                            padding: '20px',
                                            backgroundColor: '#ffffff',
                                            border: '1px solid #e2e8f0',
                                            borderRadius: '12px',
                                            boxShadow: '0 4px 14px rgba(0,0,0,0.04)',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justify: 'space-between',
                                            transition: 'transform 0.3s, box-shadow 0.3s'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.transform = 'translateY(-4px)';
                                            e.currentTarget.style.boxShadow = '0 12px 28px rgba(0,0,0,0.08)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.transform = 'translateY(0)';
                                            e.currentTarget.style.boxShadow = '0 4px 14px rgba(0,0,0,0.04)';
                                        }}
                                    >
                                        <div>
                                            {/* Container de Imagem do Card de Checklist */}
                                            <div style={{
                                                width: '100%',
                                                height: '170px',
                                                borderRadius: '12px',
                                                overflow: 'hidden',
                                                position: 'relative',
                                                marginBottom: '18px',
                                                backgroundColor: '#10171f'
                                            }}>
                                                <img
                                                    src={group.image}
                                                    alt={group.title}
                                                    style={{
                                                        width: '100%',
                                                        height: '100%',
                                                        objectFit: 'cover',
                                                        opacity: 0.88,
                                                        transition: 'transform 0.5s ease'
                                                    }}
                                                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.06)'}
                                                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                                />

                                                {/* Badges Flutuantes */}
                                                <div style={{
                                                    position: 'absolute',
                                                    top: '12px',
                                                    left: '12px',
                                                    right: '12px',
                                                    display: 'flex',
                                                    justify: 'space-between',
                                                    alignItems: 'center',
                                                    pointerEvents: 'none'
                                                }}>
                                                    <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                                                        <span style={{
                                                            fontSize: '10px',
                                                            fontWeight: 900,
                                                            color: '#ffffff',
                                                            backgroundColor: 'rgba(16, 23, 31, 0.85)',
                                                            backdropFilter: 'blur(8px)',
                                                            padding: '4px 10px',
                                                            borderRadius: '12px',
                                                            border: '1px solid rgba(255,255,255,0.15)'
                                                        }}>
                                                            .{group.extension}
                                                        </span>
                                                        <span style={{
                                                            fontSize: '10px',
                                                            fontWeight: 800,
                                                            color: '#ffffff',
                                                            backgroundColor: 'rgba(0, 0, 0, 0.65)',
                                                            backdropFilter: 'blur(8px)',
                                                            padding: '4px 8px',
                                                            borderRadius: '12px'
                                                        }}>
                                                            {group.size}
                                                        </span>
                                                    </div>

                                                    <span style={{
                                                        fontSize: '10px',
                                                        fontWeight: 900,
                                                        padding: '4px 12px',
                                                        borderRadius: '12px',
                                                        backgroundColor: group.badge === 'Freemium' ? '#00c853' : '#f83821',
                                                        color: '#ffffff',
                                                        textTransform: 'uppercase'
                                                    }}>
                                                        {group.badge}
                                                    </span>
                                                </div>
                                            </div>

                                            <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#10171f', marginBottom: '8px' }}>{group.title}</h3>
                                            <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '16px', lineHeight: 1.5 }}>{group.description}</p>

                                            {/* Progress Bar e Items Interativos */}
                                            <div style={{ marginBottom: '20px' }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 800, color: '#64748b', marginBottom: '6px' }}>
                                                    <span>Progresso em Tela</span>
                                                    <span>{completedCount}/{group.items.length} ({progressPct}%)</span>
                                                </div>
                                                <div style={{ width: '100%', height: '6px', backgroundColor: '#e2e8f0', borderRadius: '12px', overflow: 'hidden', marginBottom: '14px' }}>
                                                    <div style={{ width: `${progressPct}%`, height: '100%', backgroundColor: group.badge === 'Freemium' ? '#00c853' : '#f83821', transition: 'width 0.3s' }}></div>
                                                </div>

                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                                    {group.items.map(item => (
                                                        <div
                                                            key={item.id}
                                                            onClick={() => toggleCheckitem(group.id, item.id)}
                                                            style={{
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                gap: '10px',
                                                                padding: '8px 12px',
                                                                backgroundColor: item.completed ? '#f8fafc' : '#ffffff',
                                                                border: '1px solid #e2e8f0',
                                                                borderRadius: '12px',
                                                                cursor: 'pointer'
                                                            }}
                                                        >
                                                            {item.completed ? (
                                                                <CheckCircle2 size={16} color="#00c853" style={{ flexShrink: 0 }} />
                                                            ) : (
                                                                <Circle size={16} color="#94a3b8" style={{ flexShrink: 0 }} />
                                                            )}
                                                            <span style={{
                                                                fontSize: '12px',
                                                                fontWeight: 600,
                                                                color: item.completed ? '#94a3b8' : '#1e293b',
                                                                textDecoration: item.completed ? 'line-through' : 'none'
                                                            }}>
                                                                {item.text}
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <div style={{ fontSize: '11px', fontWeight: 700, color: '#94a3b8', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                <Download size={12} /> {group.downloadsCount} downloads efetuados
                                            </div>

                                            {/* Botão Preto com Hover Vermelho */}
                                            <button
                                                onClick={() => triggerFileDownload(group.title, group.extension, checklistTextContent, group.id)}
                                                disabled={downloadingId === group.id}
                                                style={{
                                                    width: '100%',
                                                    padding: '14px',
                                                    backgroundColor: downloadingId === group.id ? '#00c853' : '#10171f',
                                                    color: '#ffffff',
                                                    border: 'none',
                                                    borderRadius: '12px',
                                                    fontSize: '13px',
                                                    fontWeight: 900,
                                                    textTransform: 'uppercase',
                                                    cursor: 'pointer',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justify: 'center',
                                                    gap: '10px',
                                                    boxShadow: '0 4px 14px rgba(16, 23, 31, 0.25)',
                                                    transition: 'all 0.25s ease'
                                                }}
                                                onMouseEnter={(e) => {
                                                    if (downloadingId !== group.id) {
                                                        e.currentTarget.style.backgroundColor = '#f83821';
                                                        e.currentTarget.style.boxShadow = '0 6px 20px rgba(248, 56, 33, 0.35)';
                                                    }
                                                }}
                                                onMouseLeave={(e) => {
                                                    if (downloadingId !== group.id) {
                                                        e.currentTarget.style.backgroundColor = '#10171f';
                                                        e.currentTarget.style.boxShadow = '0 4px 14px rgba(16, 23, 31, 0.25)';
                                                    }
                                                }}
                                            >
                                                {downloadingId === group.id ? (
                                                    <>
                                                        <Check size={16} /> A Baixar Checklist...
                                                    </>
                                                ) : (
                                                    <>
                                                        <Download size={16} /> Baixar Checklist ({group.extension})
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </section>
                )}

                {/* 3. FICHEIROS DE MODELOS E TEMPLATES GERAIS */}
                {(selectedCategory === 'Todos' || selectedCategory === 'Ficheiros para Download') && (
                    <section>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '30px', flexWrap: 'wrap', gap: '16px' }}>
                            <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#00c853', fontSize: '12px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px' }}>
                                    <Download size={16} /> OUTROS MODELOS EDITÁVEIS PARA DOWNLOAD
                                </div>
                                <h2 style={{ fontSize: '28px', fontWeight: 900, textTransform: 'uppercase', color: '#10171f' }}>
                                    DOCUMENTOS E TEMPLATES DE NEGÓCIO
                                </h2>
                            </div>
                            <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 600 }}>{filteredDownloadables.length} Ficheiros disponíveis</span>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
                            {filteredDownloadables.map(file => (
                                <div
                                    key={file.id}
                                    style={{
                                        padding: '20px',
                                        backgroundColor: '#ffffff',
                                        border: '1px solid #e2e8f0',
                                        borderRadius: '12px',
                                        boxShadow: '0 4px 14px rgba(0,0,0,0.04)',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justify: 'space-between',
                                        position: 'relative',
                                        transition: 'transform 0.3s, box-shadow 0.3s'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-4px)';
                                        e.currentTarget.style.boxShadow = '0 12px 28px rgba(0,0,0,0.08)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = '0 4px 14px rgba(0,0,0,0.04)';
                                    }}
                                >
                                    <div>
                                        {/* Container de Imagem do Card */}
                                        <div style={{
                                            width: '100%',
                                            height: '170px',
                                            borderRadius: '12px',
                                            overflow: 'hidden',
                                            position: 'relative',
                                            marginBottom: '18px',
                                            backgroundColor: '#10171f'
                                        }}>
                                            <img
                                                src={file.image}
                                                alt={file.title}
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'cover',
                                                    opacity: 0.88,
                                                    transition: 'transform 0.5s ease'
                                                }}
                                                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.06)'}
                                                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                            />

                                            {/* Badges Flutuantes */}
                                            <div style={{
                                                position: 'absolute',
                                                top: '12px',
                                                left: '12px',
                                                right: '12px',
                                                display: 'flex',
                                                justify: 'space-between',
                                                alignItems: 'center',
                                                pointerEvents: 'none'
                                            }}>
                                                <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                                                    <span style={{
                                                        fontSize: '10px',
                                                        fontWeight: 900,
                                                        color: '#ffffff',
                                                        backgroundColor: 'rgba(16, 23, 31, 0.85)',
                                                        backdropFilter: 'blur(8px)',
                                                        padding: '4px 10px',
                                                        borderRadius: '12px',
                                                        border: '1px solid rgba(255,255,255,0.15)'
                                                    }}>
                                                        .{file.extension}
                                                    </span>
                                                    <span style={{
                                                        fontSize: '10px',
                                                        fontWeight: 800,
                                                        color: '#ffffff',
                                                        backgroundColor: 'rgba(0, 0, 0, 0.65)',
                                                        backdropFilter: 'blur(8px)',
                                                        padding: '4px 8px',
                                                        borderRadius: '12px'
                                                    }}>
                                                        {file.size}
                                                    </span>
                                                </div>

                                                <span style={{
                                                    fontSize: '10px',
                                                    fontWeight: 900,
                                                    padding: '4px 12px',
                                                    borderRadius: '12px',
                                                    backgroundColor: file.type === 'Freemium' ? '#00c853' : '#f83821',
                                                    color: '#ffffff',
                                                    textTransform: 'uppercase'
                                                }}>
                                                    {file.type}
                                                </span>
                                            </div>
                                        </div>

                                        <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#10171f', marginBottom: '6px', lineHeight: 1.3 }}>{file.title}</h3>
                                        <p style={{ fontSize: '11px', fontWeight: 800, color: '#f83821', textTransform: 'uppercase', marginBottom: '10px' }}>{file.category}</p>
                                        <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.5, marginBottom: '20px' }}>{file.description}</p>
                                    </div>

                                    <div>
                                        <div style={{ fontSize: '11px', fontWeight: 700, color: '#94a3b8', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            <Download size={12} /> {file.downloadsCount} downloads efetuados
                                        </div>

                                        {/* Botão Preto com Hover Vermelho */}
                                        <button
                                            onClick={() => triggerFileDownload(file.title, file.extension, file.content, file.id, file.fileUrl)}
                                            disabled={downloadingId === file.id}
                                            style={{
                                                width: '100%',
                                                padding: '14px',
                                                backgroundColor: downloadingId === file.id ? '#00c853' : '#10171f',
                                                color: '#ffffff',
                                                border: 'none',
                                                borderRadius: '12px',
                                                fontSize: '13px',
                                                fontWeight: 900,
                                                textTransform: 'uppercase',
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justify: 'center',
                                                gap: '10px',
                                                boxShadow: '0 4px 14px rgba(16, 23, 31, 0.25)',
                                                transition: 'all 0.25s ease'
                                            }}
                                            onMouseEnter={(e) => {
                                                if (downloadingId !== file.id) {
                                                    e.currentTarget.style.backgroundColor = '#f83821';
                                                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(248, 56, 33, 0.35)';
                                                }
                                            }}
                                            onMouseLeave={(e) => {
                                                if (downloadingId !== file.id) {
                                                    e.currentTarget.style.backgroundColor = '#10171f';
                                                    e.currentTarget.style.boxShadow = '0 4px 14px rgba(16, 23, 31, 0.25)';
                                                }
                                            }}
                                        >
                                            {downloadingId === file.id ? (
                                                <>
                                                    <Check size={16} /> A Baixar Ficheiro...
                                                </>
                                            ) : (
                                                <>
                                                    <Download size={16} /> Baixar Ficheiro ({file.extension})
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* 4. CARD LINKS DE APLICATIVOS & FERRAMENTAS */}
                {(selectedCategory === 'Todos' || selectedCategory === 'Ferramentas & Apps') && (
                    <section>
                        <div style={{ marginBottom: '30px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#eab308', fontSize: '12px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px' }}>
                                <Zap size={16} /> ECOSSISTEMA DIGITAL
                            </div>
                            <h2 style={{ fontSize: '28px', fontWeight: 900, textTransform: 'uppercase', color: '#10171f' }}>
                                APLICATIVOS E PLATAFORMAS RECOMENDADAS
                            </h2>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
                            {filteredTools.map(tool => (
                                <div
                                    key={tool.id}
                                    style={{
                                        padding: '24px',
                                        backgroundColor: '#ffffff',
                                        border: '1px solid #e2e8f0',
                                        borderRadius: '12px',
                                        boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justify: 'space-between'
                                    }}
                                >
                                    <div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                                            <div style={{ fontSize: '32px', width: '48px', height: '48px', backgroundColor: '#f6f7f9', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                {tool.icon}
                                            </div>
                                            <span style={{
                                                fontSize: '10px',
                                                fontWeight: 900,
                                                padding: '4px 10px',
                                                borderRadius: '12px',
                                                backgroundColor: tool.type === 'Freemium' ? '#e6f4ea' : '#fff0ed',
                                                color: tool.type === 'Freemium' ? '#00c853' : '#f83821',
                                                textTransform: 'uppercase'
                                            }}>
                                                {tool.type}
                                            </span>
                                        </div>

                                        <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#10171f', marginBottom: '4px' }}>{tool.name}</h3>
                                        <p style={{ fontSize: '11px', fontWeight: 800, color: '#f83821', textTransform: 'uppercase', marginBottom: '10px' }}>{tool.category}</p>
                                        <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.5, marginBottom: '20px' }}>{tool.description}</p>
                                    </div>

                                    <a
                                        href={tool.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                            padding: '12px',
                                            backgroundColor: '#10171f',
                                            color: '#ffffff',
                                            borderRadius: '12px',
                                            fontSize: '13px',
                                            fontWeight: 800,
                                            textDecoration: 'none',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justify: 'center',
                                            gap: '8px',
                                            transition: 'all 0.25s'
                                        }}
                                        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#f83821'; }}
                                        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#10171f'; }}
                                    >
                                        Aceder à Plataforma <ArrowUpRight size={16} />
                                    </a>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

            </div>

            {/* Modal de Detalhe de Termo do Dicionário */}
            <AnimatePresence>
                {selectedTermModal && (
                    <div style={{
                        position: 'fixed',
                        inset: 0,
                        backgroundColor: 'rgba(0,0,0,0.6)',
                        backdropFilter: 'blur(4px)',
                        zIndex: 100,
                        display: 'flex',
                        alignItems: 'center',
                        justify: 'center',
                        padding: '20px'
                    }}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            style={{
                                width: '100%',
                                maxWidth: '520px',
                                backgroundColor: '#ffffff',
                                borderRadius: '12px',
                                padding: '36px',
                                boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                                position: 'relative'
                            }}
                        >
                            <span style={{ fontSize: '11px', fontWeight: 900, color: '#f83821', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '8px' }}>
                                {selectedTermModal.category}
                            </span>
                            <h3 style={{ fontSize: '24px', fontWeight: 900, color: '#10171f', marginBottom: '16px' }}>
                                {selectedTermModal.term}
                            </h3>
                            <p style={{ fontSize: '15px', color: '#334155', lineHeight: 1.6, marginBottom: '24px' }}>
                                {selectedTermModal.definition}
                            </p>

                            <div style={{ padding: '16px', backgroundColor: '#f8fafc', borderLeft: '4px solid #0011fd', borderRadius: '12px', marginBottom: '30px' }}>
                                <div style={{ fontSize: '11px', fontWeight: 900, color: '#0011fd', textTransform: 'uppercase', marginBottom: '4px' }}>
                                    EXEMPLO PRÁTICO
                                </div>
                                <p style={{ fontSize: '13px', color: '#475569', fontStyle: 'italic', margin: 0 }}>
                                    "{selectedTermModal.example}"
                                </p>
                            </div>

                            <button
                                onClick={() => setSelectedTermModal(null)}
                                style={{
                                    width: '100%',
                                    padding: '14px',
                                    backgroundColor: '#10171f',
                                    color: '#ffffff',
                                    border: 'none',
                                    borderRadius: '12px',
                                    fontSize: '13px',
                                    fontWeight: 900,
                                    textTransform: 'uppercase',
                                    cursor: 'pointer',
                                    transition: 'all 0.25s'
                                }}
                                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#f83821'; }}
                                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#10171f'; }}
                            >
                                FECHAR DEFINIÇÃO
                            </button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

        </div>
    );
};

export default ResourcesPage;
