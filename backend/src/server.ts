import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { PrismaClient, Business } from '@prisma/client';
import { z } from 'zod';
import { GoogleGenAI } from '@google/genai';
import OpenAI from 'openai';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import rateLimit from 'express-rate-limit';

dotenv.config();

const app = express();

let _prisma: PrismaClient | null = null;
const prisma = new Proxy({} as PrismaClient, {
    get(target, prop) {
        if (!_prisma) {
            _prisma = new PrismaClient();
        }
        return (_prisma as any)[prop];
    }
});

import { createClient } from '@supabase/supabase-js';
const supabaseUrl = process.env.SUPABASE_URL && process.env.SUPABASE_URL !== 'YOUR_SUPABASE_URL'
    ? process.env.SUPABASE_URL
    : 'https://bcobyuxjbbxpgituacai.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || 'YOUR_SUPABASE_KEY';
const supabase = createClient(supabaseUrl, supabaseKey);

const ai = new GoogleGenAI({ apiKey: process.env.VITE_GEMINI_API_KEY || "YOUR_API_KEY" });
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || "YOUR_API_KEY" });

app.use(helmet({
    crossOriginResourcePolicy: false
}));

const allowedOrigins = ['http://localhost:5173'];
app.use(cors({
    origin: (origin, callback) => {
        if (
            !origin || 
            allowedOrigins.includes(origin) || 
            /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin) ||
            /\.vercel\.app$/.test(origin)
        ) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Proteção contra DoS de Payload
app.use(express.json({ limit: '50mb' }));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// 1. Limite Global
const globalLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minuto
    max: 200, // Limite de 200 requisições por IP
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: "Too many requests from this IP, please try again after a minute" }
});
app.use(globalLimiter);

// 2. Limite para Autenticação (Brute Force Protection)
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 20, // Limite de 20 tentativas
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: "Too many authentication attempts, please try again after 15 minutes" }
});

// 3. Limite para Geração de IA (Prevenção de Abuso de Quota)
const aiGenerationLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hora
    max: 10, // Limite de 10 gerações por hora por IP
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: "Too many AI generation requests, please try again after an hour" }
});

const JWT_SECRET = process.env.JWT_SECRET || 'bisnoteka-super-secret-key-2026';

export interface AuthRequest extends express.Request {
    user?: {
        id: string;
        email: string;
        role: string;
    };
}

export const authenticateToken = (req: AuthRequest, res: express.Response, next: express.NextFunction): void => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        res.status(401).json({ error: "Access token required" });
        return;
    }

    jwt.verify(token, JWT_SECRET, (err: any, decoded: any) => {
        if (err) {
            res.status(403).json({ error: "Invalid or expired token" });
            return;
        }
        req.user = decoded;
        next();
    });
};

const businessPayloadSchema = z.object({
    name: z.string().min(1).max(100),
    niche: z.array(z.string()),
    problem: z.string().max(1000),
    audience: z.string().max(200),
    brandVibe: z.array(z.string()),
    colorPalette: z.array(z.string()),
    customColors: z.array(z.string()).optional(),
    visualStyle: z.array(z.string()),
    logoType: z.array(z.string()),
    visuals: z.array(z.string()),
    strategy: z.array(z.string()),
    aiModel: z.enum(['faundr', 'biz']).default('faundr')
});

const DOCUMENT_PROMPTS: Record<string, string> = {
    "Brandbook": "Cria um Brandbook completo, formatado em Markdown, incluindo essência, propósito, missão, visão, valores, posicionamento, proposta de valor, personalidade, proposta única de valor, arquétipos, identidade verbal, tom de voz, narrativa da marca, manifesto, público-alvo, diferenciais competitivos, direcção visual, experiência da marca e aplicações estratégicas.",
    "Manual de Normas": "Cria um Manual de Normas Gráficas completo, formatado em Markdown, incluindo logotipo, versões, construção, área de protecção, redução mínima, cores, tipografia, iconografia, fotografia, padrões, aplicações correctas, usos incorrectos, grelhas, templates e regras técnicas de aplicação.",
    "Plano de Negócio": "Cria um Plano de Negócio completo, formatado em Markdown, incluindo sumário executivo, descrição do negócio, análise de mercado, público-alvo, concorrência, proposta de valor, produtos/serviços, modelo operacional, plano comercial, plano de marketing, plano financeiro, riscos, cronograma e próximos passos.",
    "Modelo de Negócio": "Cria um Modelo de Negócio completo, formatado em Markdown, usando Business Model Canvas, Value Proposition Canvas, fontes de receita, canais, parcerias, actividades-chave, recursos-chave, estrutura de custos, economia unitária, motor de crescimento e vantagem competitiva.",
    "Apresentação Institucional": "Cria uma Apresentação Institucional completa, formatada em Markdown, incluindo quem somos, história, missão, visão, valores, serviços, metodologia, diferenciais, sectores atendidos, projectos, equipa, clientes, impacto e contactos.",
    "Pitch Deck": "Cria um Pitch Deck completo, formatado em Markdown, incluindo problema, oportunidade, solução, produto, mercado, modelo de negócio, tracção, estratégia go-to-market, concorrência, vantagem competitiva, equipa, projecções financeiras, pedido e encerramento.",
    "Portfólio de Projectos": "Cria um Portfólio de Projectos completo, formatado em Markdown, incluindo apresentação, metodologia, categorias de projectos, estudos de caso, desafios, soluções, resultados, imagens sugeridas, métricas, clientes e encerramento comercial.",
    "Portfólio Comercial": "Cria um Portfólio Comercial completo, formatado em Markdown, incluindo apresentação, diagnóstico do problema do cliente, soluções, serviços, pacotes, entregáveis, prazos, benefícios, processo de trabalho, provas de valor, perguntas frequentes e chamada para acção.",
    "Plano de Marketing": "Cria um Plano de Marketing completo, formatado em Markdown, incluindo diagnóstico, mercado, público, posicionamento, objectivos SMART, estratégia de conteúdo, canais, funil, campanhas, tráfego pago, métricas, orçamento e cronograma.",
    "Calendário 30 Dias IG/FB": "Cria um Calendário Editorial de 30 dias para Instagram e Facebook, formatado em Markdown, incluindo objectivo do conteúdo, pilares, temas diários, formatos, ganchos, roteiros, legendas, CTAs, sugestões visuais e métricas.",
    "Plano de Lançamento": "Cria um Plano de Lançamento completo, formatado em Markdown, incluindo oferta, big idea, público, pré-lançamento, aquecimento, captação, evento de lançamento, sequência de venda, funil, cronograma, copies, scripts e métricas.",
    "Plano de Escala": "Cria um Plano de Escala completo, formatado em Markdown, incluindo diagnóstico, metas, produto escalável, estrutura comercial, marketing de escala, operação, equipa, tecnologia, finanças, expansão e indicadores.",
    "Plano 1 Milhão Kz em 3 Meses": "Cria um Plano de Receita para gerar 1.000.000 Kz em 3 meses, formatado em Markdown, incluindo diagnóstico, meta, matemática da receita, oferta principal, oferta de entrada, oferta premium, funil, prospecção, calendário semanal, scripts comerciais, métricas e plano de contingência."
};

app.post('/api/business/generate', authenticateToken, aiGenerationLimiter, async (req: AuthRequest, res: express.Response): Promise<void> => {
    try {
        const parsedPayload = businessPayloadSchema.parse(req.body);

        const requestedDocsPrompts = parsedPayload.strategy.map(docName => {
            const rule = DOCUMENT_PROMPTS[docName] || `Cria um ${docName} completo e detalhado em Markdown.`;
            return `- **${docName}**: ${rule}`;
        }).join('\n');

        const prompt = `Aja como o diretor de estratégia (CSO) e diretor de arte de uma agência de topo mundial.
A tua missão é construir a documentação estratégica e a identidade da marca para um novo império com base neste briefing:

**DADOS DO NEGÓCIO:**
Nome: ${parsedPayload.name}
Nicho: ${parsedPayload.niche.join(', ')}
Problema Resolvido: ${parsedPayload.problem}
Público-Alvo: ${parsedPayload.audience}

**IDENTIDADE VISUAL:**
Personalidade (Vibe): ${parsedPayload.brandVibe.join(', ')}
Paleta de Cores: ${parsedPayload.colorPalette.join(', ')} (Personalizadas: ${parsedPayload.customColors?.join(', ') || 'N/A'})
Estilo Visual: ${parsedPayload.visualStyle.join(', ')}
Tipo de Logo: ${parsedPayload.logoType.join(', ')}

**INSTRUÇÕES PARA OS DOCUMENTOS SOLICITADOS:**
Para o array JSON "documents", deves gerar os seguintes documentos solicitados, seguindo ESTRITAMENTE as estruturas e requisitos abaixo descritos para cada um:
${requestedDocsPrompts.length > 0 ? requestedDocsPrompts : 'Nenhum documento adicional solicitado.'}

INSTRUÇÕES DE SAÍDA:
Retorna EXCLUSIVAMENTE um objeto JSON válido. NÃO DEVOLVAS MAIS NADA (sem backticks markdown de formatação do bloco se possível). O JSON deve ter estritamente a seguinte estrutura:
{
  "executiveSummary": {
    "mission": "Missão impactante",
    "vision": "Visão de futuro",
    "valueProposition": "A proposta única de valor (1-2 frases)",
    "elevatorPitch": "O pitch de vendas rápido"
  },
  "targetPersona": {
    "name": "Nome e profissão fictícia",
    "demographics": "Idade, localização, rendimento, etc.",
    "painPoints": ["Dor 1", "Dor 2", "Dor 3"],
    "goals": ["Objetivo 1", "Objetivo 2"]
  },
  "brandIdentity": {
    "toneOfVoice": "Descrição detalhada do tom de voz",
    "coreValues": ["Valor 1", "Valor 2", "Valor 3"],
    "typographySuggestions": "Nomes de fontes (ex: Inter, Playfair)"
  },
  "marketingStrategy": {
    "acquisitionChannels": ["Canal 1", "Canal 2"],
    "contentPillars": ["Pilar 1", "Pilar 2"],
    "launchStrategy": "Resumo de como lançar a marca no 1º mês"
  },
  "visualPrompts": {
    "logoPrompt": "Um prompt (EM INGLÊS) extremamente detalhado para o Midjourney/DALL-E gerar o logótipo descrito",
    "brandbookPrompt": "Um prompt (EM INGLÊS) para gerar a capa do manual de marca"
  },
  "documents": {
    // Insere aqui como chaves exatas os nomes dos documentos solicitados e como valor o conteúdo integral gerado formatado em Markdown, seguindo a estrutura exigida. Se nenhum foi pedido, este objeto deve ser vazio.
  }
}`;

        let aiGeneratedPayload = "{}";
        try {
            if (parsedPayload.aiModel === 'faundr') {
                if (process.env.VITE_GEMINI_API_KEY) {
                    const response = await ai.models.generateContent({
                        model: 'gemini-3.1-pro',
                        contents: prompt,
                    });
                    aiGeneratedPayload = response.text || "{}";
                    // Limpar blocos de markdown json se o Gemini os devolver
                    aiGeneratedPayload = aiGeneratedPayload.replace(/^```json\s*/, '').replace(/```\s*$/, '').trim();
                } else {
                    aiGeneratedPayload = JSON.stringify({ error: "Gemini API Key not configured." });
                }
            } else if (parsedPayload.aiModel === 'biz') {
                if (process.env.OPENAI_API_KEY) {
                    const response = await openai.chat.completions.create({
                        model: 'gpt-4o-mini',
                        messages: [{ role: 'user', content: prompt }],
                        response_format: { type: 'json_object' }
                    });
                    aiGeneratedPayload = response.choices[0].message.content || "{}";
                    aiGeneratedPayload = aiGeneratedPayload.replace(/^```json\s*/, '').replace(/```\s*$/, '').trim();
                } else {
                    aiGeneratedPayload = JSON.stringify({ error: "OpenAI API Key not configured." });
                }
            }
        } catch (aiError) {
            console.error("AI Generation failed:", aiError);
            aiGeneratedPayload = JSON.stringify({ error: "AI Generation failed." });
        }

        const savedBusiness = await prisma.business.create({
            data: {
                userId: req.user!.id,
                name: parsedPayload.name,
                niche: JSON.stringify(parsedPayload.niche),
                visualStyle: parsedPayload.visualStyle.length > 0 ? parsedPayload.visualStyle[0] : 'Indefinido',
                colorPalette: JSON.stringify({ preset: parsedPayload.colorPalette, custom: parsedPayload.customColors }),
                aiPayload: aiGeneratedPayload
            }
        });

        res.status(201).json(savedBusiness);
    } catch (error: any) {
        if (error.errors) {
            res.status(400).json({ error: "Invalid payload format.", details: error.errors });
        } else {
            console.error(error);
            res.status(500).json({ error: "Internal server error." });
        }
    }
});

app.get('/api/business', async (req: express.Request, res: express.Response) => {
    try {
        const businesses = await prisma.business.findMany({
            orderBy: { createdAt: 'desc' }
        });
        
        const parsedBusinesses = businesses.map((b: Business) => ({
            ...b,
            niche: JSON.parse(b.niche),
            colorPalette: JSON.parse(b.colorPalette),
            aiPayload: ((): any => { try { return JSON.parse(b.aiPayload); } catch { return b.aiPayload; } })()
        }));

        res.json(parsedBusinesses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch businesses." });
    }
});
app.get('/api/user/business', authenticateToken, async (req: AuthRequest, res: express.Response) => {
    try {
        const businesses = await prisma.business.findMany({
            where: { userId: req.user!.id },
            orderBy: { createdAt: 'desc' }
        });
        
        const parsedBusinesses = businesses.map((b: Business) => ({
            ...b,
            niche: JSON.parse(b.niche),
            colorPalette: JSON.parse(b.colorPalette),
            aiPayload: ((): any => { try { return JSON.parse(b.aiPayload); } catch { return b.aiPayload; } })()
        }));

        res.json(parsedBusinesses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch user businesses." });
    }
});

app.get('/api/user/courses', authenticateToken, async (req: AuthRequest, res: express.Response) => {
    try {
        const enrollments = await prisma.enrollment.findMany({
            where: { userId: req.user!.id },
            include: { course: true },
            orderBy: { enrolledAt: 'desc' }
        });
        
        const courses = enrollments.map(e => ({
            ...e.course,
            progress: e.progress
        }));

        res.json(courses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch user courses." });
    }
});

// ----------------------------------------------------
// NOVO: Endpoints para Dados Reais
// ----------------------------------------------------

app.get('/api/courses', async (req, res) => {
    try {
        const courses = await prisma.course.findMany({ orderBy: { createdAt: 'desc' } });
        res.json(courses);
    } catch (error) {
        console.error(error); res.status(500).json({ error: "Failed to fetch courses." });
    }
});

const DEFAULT_PRODUCTS = [
    {
        "id": "prod-114-ideias",
        "title": "+114 Ideias Lucrativas de Renda Extra para Começar Hoje",
        "author": "Luciano Bom-Ano",
        "description": "Edição Oficial Definitiva de 581 páginas. O maior arsenal de negócios disruptivos B2B e B2C do mercado angolano com planos de faturamento de 1 milhão de Kwanzas.",
        "price": 15000,
        "oldPrice": 30000,
        "format": "DIGITAL",
        "category": "Ebooks",
        "coverImage": "/media/livros/+114 IDEIAS DE NEGÓCIO/114 IDEIAS BOOK.png",
        "landingUrl": "/livro-114-ideias",
        "stock": 999,
        "featured": true,
        "rating": 5.0,
        "pages": 581
    },
    {
        "id": "prod-mindset-disruptivo",
        "title": "Mindset Disruptivo: A Arte de Pensar Diferente",
        "author": "Luciano Bom-Ano",
        "description": "Princípios práticos de mentalidade inabalável para empreendedores que desejam romper barreiras no mercado africano.",
        "price": 18500,
        "oldPrice": 25000,
        "format": "PHYSICAL",
        "category": "Liderança & Mindset",
        "coverImage": "/media/MINDSET BUSINESS.png",
        "landingUrl": "/disruptivo",
        "stock": 50,
        "featured": false,
        "rating": 4.9,
        "pages": 240
    },
    {
        "id": "prod-faundr-blueprint",
        "title": "Blueprint da Automação com Inteligência Artificial",
        "author": "Equipa Bisnoteka",
        "description": "Como implementar IA, agentes autônomos e automações de ponta a ponta na sua empresa ou consultoria.",
        "price": 22000,
        "oldPrice": 35000,
        "format": "DIGITAL",
        "category": "Estratégia & Negócios",
        "coverImage": "/media/books.png",
        "stock": 999,
        "featured": false,
        "rating": 5.0,
        "pages": 180
    },
    {
        "id": "prod-1m-business-plan",
        "title": "1M: O Plano de Negócios de 1 Milhão",
        "author": "Luciano Bom-Ano & Bisnoteka",
        "description": "O roteiro estratégico direto ao ponto para desenhar, validar e apresentar um plano de negócios com potencial de atingir o primeiro milhão de Kwanzas.",
        "price": 8500,
        "oldPrice": 15000,
        "format": "DIGITAL",
        "category": "Estratégia & Negócios",
        "coverImage": "/media/covers/cover_1m-business-plan.png",
        "fileUrl": "/media/livros/outros livros/1M BUSINESS PLAN.pdf",
        "stock": 999,
        "featured": true,
        "rating": 5.0,
        "pages": 12
    },
    {
        "id": "prod-7-caracteristicas-empreendedor",
        "title": "7 Características de um Empreendedor de Sucesso",
        "author": "Luciano Bom-Ano",
        "description": "Análise profunda dos padrões comportamentais, disciplina mental e hábitos diários que diferenciam os fundadores que prosperam em mercados desafiadores.",
        "price": 7500,
        "oldPrice": 14000,
        "format": "DIGITAL",
        "category": "Liderança & Mindset",
        "coverImage": "/media/covers/cover_7-caracteristicas-empreendedor.png",
        "fileUrl": "/media/livros/outros livros/7 CARACTERÍSTICAS DE UM EMPREENDEDOR DE SUCESSO.pdf",
        "stock": 999,
        "featured": false,
        "rating": 4.9,
        "pages": 30
    },
    {
        "id": "prod-melhor-forma-comecar-empreender",
        "title": "A Melhor Forma de Começar a Empreender a Partir do Zero",
        "author": "Luciano Bom-Ano & Bhao",
        "description": "A trilha de negócios lucrativos sem grande capital inicial. Validação rápida de ideias, captação de clientes iniciais e mitigação de riscos em Angola.",
        "price": 9500,
        "oldPrice": 18000,
        "format": "DIGITAL",
        "category": "Estratégia & Negócios",
        "coverImage": "/media/covers/cover_melhor-forma-comecar-empreender.png",
        "fileUrl": "/media/livros/outros livros/A MELHOR FORMA DE COMEÇAR A EMPREENDER.pdf",
        "stock": 999,
        "featured": true,
        "rating": 5.0,
        "pages": 52
    },
    {
        "id": "prod-apresentacao-geral-bisnoteka",
        "title": "Bisnoteka: A Forja de Futuros Bilionários",
        "author": "Bisnoteka",
        "description": "Dossiê institucional e estratégico sobre a metodologia Bisnoteka, princípios de riqueza geracional, modelo educacional e formação executiva.",
        "price": 6500,
        "oldPrice": 12000,
        "format": "DIGITAL",
        "category": "Estratégia & Negócios",
        "coverImage": "/media/covers/cover_apresentacao-geral-bisnoteka.png",
        "fileUrl": "/media/livros/outros livros/APRESENTAÇÃO GERAL.pdf",
        "stock": 999,
        "featured": false,
        "rating": 4.8,
        "pages": 51
    },
    {
        "id": "prod-negocio-no-automatico",
        "title": "Coloque Seu Negócio no Automático e Ganhe Enquanto Dormes",
        "author": "Luciano Bom-Ano & Bhao",
        "description": "Como estruturar processos operacionais, delegar tarefas críticas, usar ferramentas de automação e gerar fluxos previsíveis de receita sustentável.",
        "price": 14000,
        "oldPrice": 25000,
        "format": "DIGITAL",
        "category": "Estratégia & Negócios",
        "coverImage": "/media/covers/cover_negocio-no-automatico.png",
        "fileUrl": "/media/livros/outros livros/COLOQUE SEU NEGÓCIO NO AUTOMÁTICO E GANHE DINHEIRO ENQUANTO DORMES.pdf",
        "stock": 999,
        "featured": true,
        "rating": 5.0,
        "pages": 92
    },
    {
        "id": "prod-e-commerce-mastermind",
        "title": "E-Commerce Mastermind: Criação, Gestão e Escala de Lojas Online",
        "author": "Luciano Bom-Ano & Bhao",
        "description": "Manual completo sobre seleção de produtos de alta procura, margens de lucro, gateways de pagamento e logística de entrega no comércio eletrónico angolano.",
        "price": 11500,
        "oldPrice": 22000,
        "format": "DIGITAL",
        "category": "Vendas & E-commerce",
        "coverImage": "/media/covers/cover_e-commerce-mastermind.png",
        "fileUrl": "/media/livros/outros livros/E-COMMERCE MASTERMIND.pdf",
        "stock": 999,
        "featured": false,
        "rating": 4.9,
        "pages": 45
    },
    {
        "id": "prod-email-marketing-mastermind",
        "title": "E-mail Marketing Mastermind: Segredos de Alta Conversão",
        "author": "Luciano Bom-Ano & Bhao",
        "description": "Técnicas avançadas de redação de e-mails, títulos magnéticos, cadências de engajamento e funis automatizados que vendem 24 horas por dia.",
        "price": 10500,
        "oldPrice": 20000,
        "format": "DIGITAL",
        "category": "Marketing",
        "coverImage": "/media/covers/cover_email-marketing-mastermind.png",
        "fileUrl": "/media/livros/outros livros/E-MAIL MARKETING MASTERMIND.pdf",
        "stock": 999,
        "featured": false,
        "rating": 4.9,
        "pages": 38
    },
    {
        "id": "prod-email-marketing-estrategico",
        "title": "E-mail Marketing Estratégico: Aumente e Gerencie Sua Base",
        "author": "Bisnoteka & Bhao",
        "description": "Estratégias práticas para construir listas de clientes proprietárias, evitar a dependência de redes sociais e monetizar a base com campanhas segmentadas.",
        "price": 11000,
        "oldPrice": 20000,
        "format": "DIGITAL",
        "category": "Marketing",
        "coverImage": "/media/covers/cover_email-marketing-estrategico.png",
        "fileUrl": "/media/livros/outros livros/E-MAIL MARKETING.pdf",
        "stock": 999,
        "featured": false,
        "rating": 4.8,
        "pages": 62
    },
    {
        "id": "prod-framework-inteligencia-competitiva",
        "title": "Framework: Inteligência Competitiva de Mercado",
        "author": "Bhao Creative & Bisnoteka",
        "description": "Metodologia estruturada para auditar concorrentes discretamente, analisar posicionamento, preços e estratégias para dominar o seu nicho.",
        "price": 5500,
        "oldPrice": 10000,
        "format": "DIGITAL",
        "category": "Checklists & Frameworks",
        "coverImage": "/media/covers/cover_framework-inteligencia-competitiva.png",
        "fileUrl": "/media/livros/outros livros/FRAMEWORK INTEGÊNCIA COMPETITIVA.pdf",
        "stock": 999,
        "featured": false,
        "rating": 4.9,
        "pages": 15
    },
    {
        "id": "prod-framework-inteligencia-cliente",
        "title": "Framework: Inteligência do Cliente e Gatilhos de Decisão",
        "author": "Bhao Creative & Bisnoteka",
        "description": "Mapeamento comportamental detalhado do cliente ideal, identificando dores ocultas, objeções comuns e os estímulos emocionais que fecham contratos.",
        "price": 5000,
        "oldPrice": 9000,
        "format": "DIGITAL",
        "category": "Checklists & Frameworks",
        "coverImage": "/media/covers/cover_framework-inteligencia-cliente.png",
        "fileUrl": "/media/livros/outros livros/FRAMEWORK INTEGÊNCIA DO CLIENTE.pdf",
        "stock": 999,
        "featured": false,
        "rating": 4.8,
        "pages": 11
    },
    {
        "id": "prod-framework-inteligencia-negocio",
        "title": "Framework: Inteligência do Negócio e Painel de KPIs",
        "author": "Bhao Creative & Bisnoteka",
        "description": "Matriz de indicadores de desempenho operacional, financeiro e comercial para manter o controle absoluto sobre o crescimento da sua empresa.",
        "price": 5500,
        "oldPrice": 10000,
        "format": "DIGITAL",
        "category": "Checklists & Frameworks",
        "coverImage": "/media/covers/cover_framework-inteligencia-negocio.png",
        "fileUrl": "/media/livros/outros livros/FRAMEWORK INTEGÊNCIA DO NEGÓCIO.pdf",
        "stock": 999,
        "featured": false,
        "rating": 4.9,
        "pages": 15
    },
    {
        "id": "prod-guia-email-marketing",
        "title": "Guia Prático do E-mail Marketing Direto",
        "author": "Bhao Creative & Bisnoteka",
        "description": "Guia de implementação ágil para redigir propostas comerciais e comunicados objetivos que convertem leitores em clientes pagantes rapidamente.",
        "price": 5000,
        "oldPrice": 9500,
        "format": "DIGITAL",
        "category": "Marketing",
        "coverImage": "/media/covers/cover_guia-email-marketing.png",
        "fileUrl": "/media/livros/outros livros/GUIA DO E-MAIL MARKETING.pdf",
        "stock": 999,
        "featured": false,
        "rating": 4.8,
        "pages": 15
    },
    {
        "id": "prod-guia-marketing-conteudo",
        "title": "O Guia Definitivo do Marketing de Conteúdo",
        "author": "Bhao Creative & Bisnoteka",
        "description": "Como estruturar uma esteira de publicações de alto valor que educa o público, estabelece autoridade incontestável e gera leads orgânicos consistentes.",
        "price": 6500,
        "oldPrice": 12000,
        "format": "DIGITAL",
        "category": "Marketing",
        "coverImage": "/media/covers/cover_guia-marketing-conteudo.png",
        "fileUrl": "/media/livros/outros livros/GUIA DO MARKETING DE CONTEÚDO.pdf",
        "stock": 999,
        "featured": false,
        "rating": 4.9,
        "pages": 22
    },
    {
        "id": "prod-guia-instagram-empreendedores",
        "title": "O Guia Prático do Instagram para Empreendedores e Marcas",
        "author": "Luciano Bom-Ano & Bhao",
        "description": "Manual completo com mais de 100 páginas sobre posicionamento visual, roteiros de stories, reels de alcance e funis diretos para fechar vendas no Direct e WhatsApp.",
        "price": 14500,
        "oldPrice": 26000,
        "format": "DIGITAL",
        "category": "Marketing",
        "coverImage": "/media/covers/cover_guia-instagram-empreendedores.png",
        "fileUrl": "/media/livros/outros livros/GUIA PRÁTICO DO INSTAGRAM PARA EMPREENDEDORES E MARCAS.pdf",
        "stock": 999,
        "featured": true,
        "rating": 5.0,
        "pages": 102
    },
    {
        "id": "prod-high-ticket-vender-conhecimento",
        "title": "High Ticket: Como Vender o Seu Conhecimento a Alto Preço",
        "author": "Luciano Bom-Ano & Bhao",
        "description": "O método para empacotar serviços, consultorias e mentorias de 500.000 a 5.000.000 Kz, atraindo decisores corporativos dispostos a pagar pelo melhor.",
        "price": 13500,
        "oldPrice": 25000,
        "format": "DIGITAL",
        "category": "Vendas & E-commerce",
        "coverImage": "/media/covers/cover_high-ticket-vender-conhecimento.png",
        "fileUrl": "/media/livros/outros livros/HIGH TICKET.pdf",
        "stock": 999,
        "featured": true,
        "rating": 5.0,
        "pages": 48
    },
    {
        "id": "prod-jornada-valor-cliente",
        "title": "Jornada de Valor do Cliente: Os 8 Estágios de Conversão",
        "author": "Bhao Creative & Bisnoteka",
        "description": "Framework visual detalhando o passo a passo para transformar um visitante desconfiado num cliente de alta fidelidade e embaixador da sua marca.",
        "price": 4500,
        "oldPrice": 8000,
        "format": "DIGITAL",
        "category": "Checklists & Frameworks",
        "coverImage": "/media/covers/cover_jornada-valor-cliente.png",
        "fileUrl": "/media/livros/outros livros/JORNADA DE VALOR DO CLIENTE.pdf",
        "stock": 999,
        "featured": false,
        "rating": 4.8,
        "pages": 5
    },
    {
        "id": "prod-checklist-crescimento-marketing",
        "title": "Checklist: Crescimento com Marketing de Alta Performance",
        "author": "Bhao Creative & Bisnoteka",
        "description": "Lista de verificação rápida para diagnosticar gargalos em campanhas de anúncios, páginas de vendas, criativos e taxas de conversão.",
        "price": 4500,
        "oldPrice": 8500,
        "format": "DIGITAL",
        "category": "Checklists & Frameworks",
        "coverImage": "/media/covers/cover_checklist-crescimento-marketing.png",
        "fileUrl": "/media/livros/outros livros/LISTA DE VERIFICAÇÃO CRESCIMENTO COM MARKETING.pdf",
        "stock": 999,
        "featured": false,
        "rating": 4.8,
        "pages": 8
    },
    {
        "id": "prod-checklist-ecommerce-loja",
        "title": "Checklist: Validação e Lançamento de E-Commerce",
        "author": "Bhao Creative & Bisnoteka",
        "description": "Auditoria prática de prontidão com todos os itens mandatórios antes de inaugurar uma loja online: catálogo, estoque, segurança e suporte.",
        "price": 4000,
        "oldPrice": 7500,
        "format": "DIGITAL",
        "category": "Checklists & Frameworks",
        "coverImage": "/media/covers/cover_checklist-ecommerce-loja.png",
        "fileUrl": "/media/livros/outros livros/LISTA DE VERIFICAÇÃO E-COMMERCE.pdf",
        "stock": 999,
        "featured": false,
        "rating": 4.7,
        "pages": 5
    },
    {
        "id": "prod-guia-lancamentos-produtos-servicos",
        "title": "O Guia Prático de Lançamentos de Produtos e Serviços",
        "author": "Luciano Bom-Ano & Bhao",
        "description": "Como orquestrar campanhas de antecipação, gerar desejo reprimido e concentrar vendas maciças em datas de abertura oficiais no mercado nacional.",
        "price": 12500,
        "oldPrice": 24000,
        "format": "DIGITAL",
        "category": "Marketing",
        "coverImage": "/media/covers/cover_guia-lancamentos-produtos-servicos.png",
        "fileUrl": "/media/livros/outros livros/O GUIA PRÁTICO DE LANÇAMENTOS DE PRODUTOS E SERVIÇOS DE SUCESSO.pdf",
        "stock": 999,
        "featured": true,
        "rating": 5.0,
        "pages": 59
    },
    {
        "id": "prod-guia-facebook-empreendedores",
        "title": "O Guia Prático do Facebook para Empreendedores e Marcas",
        "author": "Luciano Bom-Ano & Bhao",
        "description": "Como utilizar a maior rede social de Angola para construir comunidades engajadas, veicular anúncios com ROI positivo e gerar vendas locais contínuas.",
        "price": 11500,
        "oldPrice": 20000,
        "format": "DIGITAL",
        "category": "Marketing",
        "coverImage": "/media/covers/cover_guia-facebook-empreendedores.png",
        "fileUrl": "/media/livros/outros livros/O GUIA PRÁTICO DO FACEBOOK PARA EMPREENDEDORES E MARCAS.pdf",
        "stock": 999,
        "featured": false,
        "rating": 4.9,
        "pages": 62
    },
    {
        "id": "prod-guia-tiktok-empreendedores",
        "title": "O Guia Prático do TikTok para Empreendedores e Marcas",
        "author": "Luciano Bom-Ano & Bhao",
        "description": "Domine o formato mais viral da internet atual. Roteiros de retenção, ganchos de 3 segundos e táticas para converter visualizações em clientes reais.",
        "price": 12000,
        "oldPrice": 22000,
        "format": "DIGITAL",
        "category": "Marketing",
        "coverImage": "/media/covers/cover_guia-tiktok-empreendedores.png",
        "fileUrl": "/media/livros/outros livros/O GUIA PRÁTICO DO TIKTOK PARA EMPREENDEDORES E MARCAS.pdf",
        "stock": 999,
        "featured": false,
        "rating": 4.9,
        "pages": 75
    },
    {
        "id": "prod-poder-do-trafego",
        "title": "O Poder do Tráfego: Cresça o Seu Negócio",
        "author": "Luciano Bom-Ano & Bhao",
        "description": "O guia de geração de tráfego para empresários que não querem depender de sorte. Multiplique as visitas e conversões qualificadas da sua empresa.",
        "price": 11500,
        "oldPrice": 21000,
        "format": "DIGITAL",
        "category": "Marketing",
        "coverImage": "/media/covers/cover_poder-do-trafego.png",
        "fileUrl": "/media/livros/outros livros/O PODER DO TRÁFEGO.pdf",
        "stock": 999,
        "featured": false,
        "rating": 4.9,
        "pages": 61
    },
    {
        "id": "prod-otimizacao-taxa-conversao-cro",
        "title": "Otimização de Taxa de Conversão (CRO Prático)",
        "author": "Bhao Creative & Bisnoteka",
        "description": "Como identificar pontos de atrito no seu funil de vendas, ajustar ofertas e fechar mais pedidos sem aumentar um único Kwanza em publicidade.",
        "price": 5000,
        "oldPrice": 9000,
        "format": "DIGITAL",
        "category": "Vendas & E-commerce",
        "coverImage": "/media/covers/cover_otimizacao-taxa-conversao-cro.png",
        "fileUrl": "/media/livros/outros livros/OTIMIZAÇÃO DE TAXA DE CONVERSÃO.pdf",
        "stock": 999,
        "featured": false,
        "rating": 4.8,
        "pages": 8
    },
    {
        "id": "prod-pmp-366-dias-frases",
        "title": "PMP: 366 Dias e 366 Frases de Sabedoria & Liderança",
        "author": "Bisnoteka & Luciano Bom-Ano",
        "description": "Monumental compêndio de 383 páginas com lições diárias de Propósito, Motivação e Protagonismo para líderes, gestores e fundadores em Angola.",
        "price": 18000,
        "oldPrice": 32000,
        "format": "DIGITAL",
        "category": "Liderança & Mindset",
        "coverImage": "/media/covers/cover_pmp-366-dias-frases.png",
        "fileUrl": "/media/livros/outros livros/PMP-366 DIAS E 366 FRASES 01.pdf",
        "stock": 999,
        "featured": true,
        "rating": 5.0,
        "pages": 383
    },
    {
        "id": "prod-questionario-integracao-cliente",
        "title": "Questionário Estratégico de Onboarding de Cliente VIP",
        "author": "Bhao Creative & Bisnoteka",
        "description": "Documento e protocolo formal para alinhar expectativas com clientes corporativos, levantar briefings precisos e causar uma primeira impressão de elite.",
        "price": 4500,
        "oldPrice": 8500,
        "format": "DIGITAL",
        "category": "Checklists & Frameworks",
        "coverImage": "/media/covers/cover_questionario-integracao-cliente.png",
        "fileUrl": "/media/livros/outros livros/QUESTIONÁRIO DE INTEGRAÇÃO DE CLIENTE.pdf",
        "stock": 999,
        "featured": false,
        "rating": 4.8,
        "pages": 10
    },
    {
        "id": "prod-seo-masterboard",
        "title": "SEO Masterboard: Domínio de Motores de Busca",
        "author": "Bhao Creative & Bisnoteka",
        "description": "Manual técnico e estratégico de otimização para Google. Palavras-chave de intenção de compra, SEO local em Angola e geração contínua de tráfego orgânico.",
        "price": 11000,
        "oldPrice": 20000,
        "format": "DIGITAL",
        "category": "Estratégia & Negócios",
        "coverImage": "/media/covers/cover_seo-masterboard.png",
        "fileUrl": "/media/livros/outros livros/SEO MASTERBOARD.pdf",
        "stock": 999,
        "featured": false,
        "rating": 4.9,
        "pages": 60
    },
    {
        "id": "prod-templates-de-email-alta-resposta",
        "title": "Pack de Templates de E-mail de Alta Resposta",
        "author": "Bhao Creative & Bisnoteka",
        "description": "Coleção de modelos prontos para copiar e colar: e-mails de boas-vindas, reativação de clientes inativos, propostas comerciais e recuperação de orçamentos.",
        "price": 4500,
        "oldPrice": 8000,
        "format": "DIGITAL",
        "category": "Checklists & Frameworks",
        "coverImage": "/media/covers/cover_templates-de-email-alta-resposta.png",
        "fileUrl": "/media/livros/outros livros/TEMPLATES DE E-MAIL.pdf",
        "stock": 999,
        "featured": false,
        "rating": 4.8,
        "pages": 7
    },
    {
        "id": "prod-terceirizacao-geracao-riqueza",
        "title": "A Terceirização como Fator de Geração de Riqueza",
        "author": "Luciano Bom-Ano & Bhao",
        "description": "Como alavancar competências externas e profissionais especializados para reduzir custos fixos, aumentar a agilidade e focar no crescimento do negócio.",
        "price": 12000,
        "oldPrice": 22000,
        "format": "DIGITAL",
        "category": "Estratégia & Negócios",
        "coverImage": "/media/covers/cover_terceirizacao-geracao-riqueza.png",
        "fileUrl": "/media/livros/outros livros/TERCEIRIZAÇÃO DE NEGÓCIO COMO FATOR DE GERAÇÃO DE NEGÓCIO.pdf",
        "stock": 999,
        "featured": false,
        "rating": 4.9,
        "pages": 60
    }
];

app.get('/api/products', async (req, res) => {
    try {
        const products = await prisma.product.findMany({ orderBy: { createdAt: 'desc' } });
        const existingIds = new Set((products || []).map((p: any) => p.id));
        const combined: any[] = [...(products || [])];
        for (const def of DEFAULT_PRODUCTS) {
            if (!existingIds.has(def.id)) {
                combined.push(def);
            }
        }
        res.json(combined);
    } catch (error) {
        console.warn("Prisma error in /api/products, serving fallback products:", error);
        res.json(DEFAULT_PRODUCTS);
    }
});

app.post('/api/products', async (req, res) => {
    try {
        const data = req.body;
        const newProduct = await prisma.product.create({
            data: {
                title: data.title,
                author: data.author || null,
                description: data.description || '',
                price: data.price ? parseFloat(data.price) : 0,
                format: data.format === 'DIGITAL' ? 'DIGITAL' : 'PHYSICAL',
                coverImage: data.coverImage || null,
                fileUrl: data.fileUrl || null,
                stock: data.stock ? parseInt(data.stock) : null,
                category: data.category || 'Geral'
            }
        });
        res.status(201).json(newProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to create product." });
    }
});

app.put('/api/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const updatedProduct = await prisma.product.update({
            where: { id },
            data: {
                title: data.title !== undefined ? data.title : undefined,
                author: data.author !== undefined ? data.author : undefined,
                description: data.description !== undefined ? data.description : undefined,
                price: data.price !== undefined ? parseFloat(data.price) : undefined,
                format: data.format !== undefined ? (data.format === 'DIGITAL' ? 'DIGITAL' : 'PHYSICAL') : undefined,
                coverImage: data.coverImage !== undefined ? data.coverImage : undefined,
                fileUrl: data.fileUrl !== undefined ? data.fileUrl : undefined,
                stock: data.stock !== undefined ? (data.stock ? parseInt(data.stock) : null) : undefined,
                category: data.category !== undefined ? data.category : undefined
            }
        });
        res.json(updatedProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to update product." });
    }
});

app.delete('/api/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.product.delete({ where: { id } });
        res.json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to delete product." });
    }
});


app.get('/api/success-stories', async (req, res) => {
    try {
        const stories = await prisma.successStory.findMany({ orderBy: { publishedAt: 'desc' } });
        res.json(stories);
    } catch (error) {
        console.error(error); res.status(500).json({ error: "Failed to fetch success stories." });
    }
});

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
});

app.get('/api/magazine', async (req, res) => {
    try {
        const magazines = await prisma.magazineEdition.findMany({ 
            orderBy: { releaseDate: 'desc' },
            select: {
                id: true,
                issueNumber: true,
                title: true,
                description: true,
                coverImage: true,
                releaseDate: true,
                createdAt: true,
                // topics excluded: PostgreSQL array column unreliable via PgBouncer
                // pdfFileUrl excluded: prevent massive payloads
            }
        });
        res.json(magazines);
    } catch (error) {
        console.error('GET /api/magazine error:', error);
        res.status(500).json({ error: "Failed to fetch magazines." });
    }
});

app.get('/api/magazine/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const magazine = await prisma.magazineEdition.findUnique({
            where: { id },
            select: {
                id: true,
                issueNumber: true,
                title: true,
                description: true,
                coverImage: true,
                pdfFileUrl: true,
                releaseDate: true,
                createdAt: true,
                // topics excluded: PostgreSQL array column unreliable via PgBouncer
            }
        });
        if (!magazine) {
            return res.status(404).json({ error: "Magazine not found." });
        }
        res.json(magazine);
    } catch (error) {
        console.error('GET /api/magazine/:id error:', error);
        res.status(500).json({ error: "Failed to fetch magazine." });
    }
});

app.post('/api/upload-pdf-url', async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        const { filename } = req.body;
        if (!filename) {
            res.status(400).json({ error: "Missing filename" });
            return;
        }

        const ext = path.extname(filename) || '.pdf';
        const uniqueFilename = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}${ext}`;
        
        const { data, error } = await supabase.storage
            .from('magazines')
            .createSignedUploadUrl(uniqueFilename);

        if (error) {
            throw error;
        }

        const { data: publicUrlData } = supabase.storage
            .from('magazines')
            .getPublicUrl(data.path);

        res.json({ 
            signedUrl: data.signedUrl,
            publicUrl: publicUrlData.publicUrl 
        });
    } catch (error: any) {
        console.error("Upload URL error:", error);
        res.status(500).json({ error: error.message || "Failed to generate upload URL" });
    }
});

app.post('/api/magazine', async (req, res) => {
    try {
        const data = req.body;
        const newMagazine = await prisma.magazineEdition.create({
            data: {
                issueNumber: data.issueNumber ? parseInt(data.issueNumber) : 1,
                title: data.title,
                description: data.description,
                topics: data.topics || [],
                coverImage: data.coverImage,
                pdfFileUrl: data.pdfFileUrl,
                releaseDate: data.releaseDate ? new Date(data.releaseDate) : new Date()
            }
        });
        res.status(201).json(newMagazine);
    } catch (error) {
        console.error(error); res.status(500).json({ error: "Failed to create magazine." });
    }
});

app.put('/api/magazine/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        
        const updateData: any = {
            issueNumber: data.issueNumber ? parseInt(data.issueNumber) : undefined,
            title: data.title,
            description: data.description,
            topics: data.topics,
            coverImage: data.coverImage,
            releaseDate: data.releaseDate ? new Date(data.releaseDate) : undefined
        };
        
        if (data.pdfFileUrl && data.pdfFileUrl.trim() !== '') {
            updateData.pdfFileUrl = data.pdfFileUrl;
        }

        const updatedMagazine = await prisma.magazineEdition.update({
            where: { id },
            data: updateData
        });
        res.json(updatedMagazine);
    } catch (error) {
        console.error(error); res.status(500).json({ error: "Failed to update magazine." });
    }
});

app.delete('/api/magazine/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.magazineEdition.delete({ where: { id } });
        res.json({ message: "Deleted successfully" });
    } catch (error) {
        console.error(error); res.status(500).json({ error: "Failed to delete magazine." });
    }
});

app.get('/api/podcasts', async (req, res) => {
    try {
        const podcasts = await prisma.podcastEpisode.findMany({ orderBy: { releaseDate: 'desc' } });
        res.json(podcasts);
    } catch (error) {
        console.error(error); res.status(500).json({ error: "Failed to fetch podcasts." });
    }
});

app.get('/api/forge-programs', async (req, res) => {
    try {
        const programs = await prisma.faundrForgeProgram.findMany({ orderBy: { startDate: 'asc' } });
        res.json(programs);
    } catch (error) {
        console.error(error); res.status(500).json({ error: "Failed to fetch forge programs." });
    }
});

app.get('/api/events', async (req, res) => {
    try {
        const events = await prisma.experienceEvent.findMany({ orderBy: { date: 'asc' } });
        res.json(events);
    } catch (error) {
        console.error(error); res.status(500).json({ error: "Failed to fetch events." });
    }
});

app.get('/api/mindset', async (req, res) => {
    try {
        const tracks = await prisma.mindsetTrack.findMany({ orderBy: { createdAt: 'desc' } });
        res.json(tracks);
    } catch (error) {
        console.error(error); res.status(500).json({ error: "Failed to fetch mindset tracks." });
    }
});

// ====================================================
// COMMUNITY & JOBS API
// ====================================================

// 1. Get community posts
app.get('/api/community/posts', authenticateToken, async (req: AuthRequest, res: express.Response) => {
    try {
        const userId = req.user?.id;
        const posts = await prisma.communityPost.findMany({
            orderBy: { createdAt: 'desc' },
            include: {
                user: {
                    select: {
                        name: true,
                        avatarUrl: true,
                        subscriptionTier: true
                    }
                },
                likes: true,
                comments: {
                    include: {
                        user: {
                            select: {
                                name: true,
                                avatarUrl: true,
                                subscriptionTier: true
                            }
                        }
                    },
                    orderBy: { createdAt: 'asc' }
                }
            }
        });

        // Format posts to include like count, liked by user, comment count
        const formattedPosts = posts.map(post => {
            const hasLiked = userId ? post.likes.some(l => l.userId === userId) : false;
            return {
                id: post.id,
                content: post.content,
                category: post.category,
                createdAt: post.createdAt,
                user: post.user,
                likesCount: post.likes.length,
                likedByUser: hasLiked,
                commentsCount: post.comments.length,
                comments: post.comments
            };
        });

        res.json(formattedPosts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao carregar publicações da comunidade." });
    }
});

// 2. Create a community post
app.post('/api/community/posts', authenticateToken, async (req: AuthRequest, res: express.Response) => {
    try {
        const userId = req.user?.id;
        const { content, category } = req.body;

        if (!userId) {
            res.status(401).json({ error: "Utilizador não autenticado" });
            return;
        }

        if (!content || content.trim() === '') {
            res.status(400).json({ error: "O conteúdo da publicação não pode estar vazio" });
            return;
        }

        const newPost = await prisma.communityPost.create({
            data: {
                userId,
                content,
                category: category || "GERAL"
            },
            include: {
                user: {
                    select: {
                        name: true,
                        avatarUrl: true,
                        subscriptionTier: true
                    }
                }
            }
        });

        res.json({
            ...newPost,
            likesCount: 0,
            likedByUser: false,
            commentsCount: 0,
            comments: []
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao criar publicação." });
    }
});

// 3. Like/Unlike a post
app.post('/api/community/posts/:id/like', authenticateToken, async (req: AuthRequest, res: express.Response) => {
    try {
        const userId = req.user?.id;
        const postId = req.params.id as string;

        if (!userId) {
            res.status(401).json({ error: "Utilizador não autenticado" });
            return;
        }

        const existingLike = await prisma.postLike.findUnique({
            where: {
                postId_userId: {
                    postId,
                    userId
                }
            }
        });

        if (existingLike) {
            // Unlike
            await prisma.postLike.delete({
                where: {
                    postId_userId: {
                        postId,
                        userId
                    }
                }
            });
            res.json({ liked: false });
        } else {
            // Like
            await prisma.postLike.create({
                data: {
                    postId,
                    userId
                }
            });
            res.json({ liked: true });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao processar like." });
    }
});

// 4. Create comment on a post
app.post('/api/community/posts/:id/comments', authenticateToken, async (req: AuthRequest, res: express.Response) => {
    try {
        const userId = req.user?.id;
        const postId = req.params.id as string;
        const { content } = req.body;

        if (!userId) {
            res.status(401).json({ error: "Utilizador não autenticado" });
            return;
        }

        if (!content || content.trim() === '') {
            res.status(400).json({ error: "O comentário não pode estar vazio" });
            return;
        }

        const comment = await prisma.postComment.create({
            data: {
                postId,
                userId,
                content
            },
            include: {
                user: {
                    select: {
                        name: true,
                        avatarUrl: true,
                        subscriptionTier: true
                    }
                }
            }
        });

        res.json(comment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao criar comentário." });
    }
});

// 5. Get job opportunities
app.get('/api/community/jobs', authenticateToken, async (req: express.Request, res: express.Response) => {
    try {
        const jobs = await prisma.jobOpportunity.findMany({
            orderBy: { createdAt: 'desc' },
            include: {
                user: {
                    select: {
                        name: true,
                        avatarUrl: true
                    }
                }
            }
        });
        res.json(jobs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao carregar vagas." });
    }
});

// 6. Post a job opportunity
app.post('/api/community/jobs', authenticateToken, async (req: AuthRequest, res: express.Response) => {
    try {
        const userId = req.user?.id;
        const { title, company, location, type, salary, description, requirements, applyUrlOrEmail } = req.body;

        if (!userId) {
            res.status(401).json({ error: "Utilizador não autenticado" });
            return;
        }

        if (!title || !company || !location || !type || !description || !applyUrlOrEmail) {
            res.status(400).json({ error: "Campos obrigatórios em falta (título, empresa, localização, tipo, descrição, contacto)" });
            return;
        }

        const newJob = await prisma.jobOpportunity.create({
            data: {
                userId,
                title,
                company,
                location,
                type,
                salary: salary || null,
                description,
                requirements: requirements || null,
                applyUrlOrEmail
            },
            include: {
                user: {
                    select: {
                        name: true,
                        avatarUrl: true
                    }
                }
            }
        });

        res.json(newJob);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao publicar vaga." });
    }
});

// ====================================================
// AUTHENTICATION & ONBOARDING API
// ====================================================

// (Auth definitions moved to top of file)

// 1. Register
app.post('/api/auth/register', authLimiter, async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            res.status(400).json({ error: "Name, email and password are required" });
            return;
        }

        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            res.status(400).json({ error: "Email is already registered" });
            return;
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                passwordHash,
                role: 'USER',
                subscriptionTier: 'FREE'
            }
        });

        const token = jwt.sign(
            { id: newUser.id, email: newUser.email, role: newUser.role },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.status(201).json({
            token,
            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role,
                subscriptionTier: newUser.subscriptionTier,
                onboardingCompleted: newUser.onboardingCompleted,
                onboardingData: newUser.onboardingData
            }
        });
    } catch (error) {
        console.error("Register error:", error);
        res.status(500).json({ error: "Failed to register user" });
    }
});

// 2. Login
app.post('/api/auth/login', authLimiter, async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).json({ error: "Email and password are required" });
            return;
        }

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user || !user.passwordHash) {
            res.status(401).json({ error: "Invalid email or password" });
            return;
        }

        const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
        if (!isPasswordValid) {
            res.status(401).json({ error: "Invalid email or password" });
            return;
        }

        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.json({
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                subscriptionTier: user.subscriptionTier,
                onboardingCompleted: user.onboardingCompleted,
                onboardingData: user.onboardingData
            }
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ error: "Failed to login" });
    }
});

// 3. Me (Get current profile)
app.get('/api/auth/me', authenticateToken, async (req: AuthRequest, res: express.Response): Promise<void> => {
    try {
        if (!req.user) {
            res.status(401).json({ error: "Unauthorized" });
            return;
        }

        const user = await prisma.user.findUnique({ where: { id: req.user.id } });
        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }

        res.json({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            subscriptionTier: user.subscriptionTier,
            onboardingCompleted: user.onboardingCompleted,
            onboardingData: user.onboardingData,
            avatarUrl: user.avatarUrl
        });
    } catch (error) {
        console.error("Auth me error:", error);
        res.status(500).json({ error: "Failed to fetch user profile" });
    }
});

// 3b. Update Profile
app.put('/api/auth/profile', authenticateToken, async (req: AuthRequest, res: express.Response): Promise<void> => {
    try {
        if (!req.user) {
            res.status(401).json({ error: "Unauthorized" });
            return;
        }

        const { name, email, password, avatarUrl } = req.body;

        if (!name || !email) {
            res.status(400).json({ error: "Name and email are required" });
            return;
        }

        // Check if email is already taken by another user
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser && existingUser.id !== req.user.id) {
            res.status(400).json({ error: "Email is already registered by another user" });
            return;
        }

        const updateData: any = {
            name,
            email,
            avatarUrl: avatarUrl !== undefined ? avatarUrl : undefined
        };

        if (password && password.trim() !== '') {
            updateData.passwordHash = await bcrypt.hash(password, 10);
        }

        const updatedUser = await prisma.user.update({
            where: { id: req.user.id },
            data: updateData
        });

        res.json({
            success: true,
            user: {
                id: updatedUser.id,
                name: updatedUser.name,
                email: updatedUser.email,
                role: updatedUser.role,
                subscriptionTier: updatedUser.subscriptionTier,
                onboardingCompleted: updatedUser.onboardingCompleted,
                onboardingData: updatedUser.onboardingData,
                avatarUrl: updatedUser.avatarUrl
            }
        });
    } catch (error) {
        console.error("Update profile error:", error);
        res.status(500).json({ error: "Failed to update profile" });
    }
});

// 4. Submit Onboarding Answers
app.post('/api/auth/onboarding', authenticateToken, async (req: AuthRequest, res: express.Response): Promise<void> => {
    try {
        if (!req.user) {
            res.status(401).json({ error: "Unauthorized" });
            return;
        }

        const { answers } = req.body;
        if (!answers) {
            res.status(400).json({ error: "Onboarding answers are required" });
            return;
        }

        const updatedUser = await prisma.user.update({
            where: { id: req.user.id },
            data: {
                onboardingCompleted: true,
                onboardingData: JSON.stringify(answers)
            }
        });

        res.json({
            success: true,
            user: {
                id: updatedUser.id,
                name: updatedUser.name,
                email: updatedUser.email,
                role: updatedUser.role,
                subscriptionTier: updatedUser.subscriptionTier,
                onboardingCompleted: updatedUser.onboardingCompleted,
                onboardingData: updatedUser.onboardingData
            }
        });
    } catch (error) {
        console.error("Onboarding submission error:", error);
        res.status(500).json({ error: "Failed to submit onboarding answers" });
    }
});

// ====================================================
// RESOURCES & FILES API (GERENCIAMENTO DE RECURSOS E DOWNLOADS)
// ====================================================

app.get('/api/resources', async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        const { kind } = req.query;
        const whereCondition = kind ? { resourceKind: String(kind) } : {};
        const resources = await prisma.resource.findMany({
            where: whereCondition,
            orderBy: { createdAt: 'desc' }
        });
        res.json(resources);
    } catch (error) {
        console.error('GET /api/resources error:', error);
        res.status(500).json({ error: "Failed to fetch resources" });
    }
});

app.post('/api/resources/upload', async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        const { fileName, fileData } = req.body;
        if (!fileName || !fileData) {
            res.status(400).json({ error: "fileName and fileData are required" });
            return;
        }

        const uploadsDir = path.join(__dirname, '../uploads');
        if (!fs.existsSync(uploadsDir)) {
            fs.mkdirSync(uploadsDir, { recursive: true });
        }

        const ext = path.extname(fileName) || '.pdf';
        const cleanName = path.basename(fileName, ext).replace(/[^a-zA-Z0-9_-]/g, '_');
        const uniqueFileName = `${Date.now()}_${cleanName}${ext}`;
        const filePath = path.join(uploadsDir, uniqueFileName);

        const base64Data = fileData.replace(/^data:[^;]+;base64,/, '');
        const buffer = Buffer.from(base64Data, 'base64');
        fs.writeFileSync(filePath, buffer);

        const sizeInMb = (buffer.length / (1024 * 1024)).toFixed(1);
        const fileUrl = `/uploads/${uniqueFileName}`;

        res.status(201).json({
            fileUrl,
            fileName: uniqueFileName,
            extension: ext.replace('.', '').toUpperCase(),
            size: `${sizeInMb} MB`
        });
    } catch (error: any) {
        console.error('Upload resource error:', error);
        res.status(500).json({ error: error.message || "Failed to upload file" });
    }
});

app.post('/api/resources', async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        const {
            title, description, category, resourceKind, extension, fileUrl,
            content, size, accessType, coverImage, icon, externalUrl,
            checklistItems, termExample
        } = req.body;

        if (!title || !category) {
            res.status(400).json({ error: "title and category are required" });
            return;
        }

        const newResource = await prisma.resource.create({
            data: {
                title,
                description: description || '',
                category,
                resourceKind: resourceKind || 'FILE',
                extension: extension ? extension.toUpperCase() : 'PDF',
                fileUrl: fileUrl || null,
                content: content || null,
                size: size || '2.5 MB',
                accessType: accessType || 'Freemium',
                coverImage: coverImage || null,
                icon: icon || null,
                externalUrl: externalUrl || null,
                checklistItems: checklistItems ? (typeof checklistItems === 'string' ? checklistItems : JSON.stringify(checklistItems)) : null,
                termExample: termExample || null
            }
        });

        res.status(201).json(newResource);
    } catch (error: any) {
        console.error('POST /api/resources error:', error);
        res.status(500).json({ error: "Failed to create resource" });
    }
});

app.put('/api/resources/:id', async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        const id = String(req.params.id);
        const {
            title, description, category, resourceKind, extension, fileUrl,
            content, size, accessType, downloadsCount, coverImage, icon,
            externalUrl, checklistItems, termExample
        } = req.body;

        const updatedResource = await prisma.resource.update({
            where: { id },
            data: {
                title,
                description,
                category,
                resourceKind,
                extension: extension ? extension.toUpperCase() : undefined,
                fileUrl,
                content,
                size,
                accessType,
                downloadsCount: downloadsCount !== undefined ? parseInt(downloadsCount) : undefined,
                coverImage,
                icon,
                externalUrl,
                checklistItems: checklistItems ? (typeof checklistItems === 'string' ? checklistItems : JSON.stringify(checklistItems)) : undefined,
                termExample
            }
        });

        res.json(updatedResource);
    } catch (error: any) {
        console.error('PUT /api/resources/:id error:', error);
        res.status(500).json({ error: "Failed to update resource" });
    }
});

app.delete('/api/resources/:id', async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        const id = String(req.params.id);
        await prisma.resource.delete({ where: { id } });
        res.json({ success: true, message: "Resource deleted successfully" });
    } catch (error: any) {
        console.error('DELETE /api/resources/:id error:', error);
        res.status(500).json({ error: "Failed to delete resource" });
    }
});

const PORT = process.env.PORT || 3001;
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log("✅ Secure Backend running on port " + PORT);
    });
}

export default app;
