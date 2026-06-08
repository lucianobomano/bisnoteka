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

app.use(helmet());

const allowedOrigins = ['http://localhost:5173'];
app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin) || /\.vercel\.app$/.test(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Proteção contra DoS de Payload (Reduzido de 100mb para 2mb)
app.use(express.json({ limit: '2mb' }));

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

app.get('/api/products', async (req, res) => {
    try {
        const products = await prisma.product.findMany({ orderBy: { createdAt: 'desc' } });
        res.json(products);
    } catch (error) {
        console.error(error); res.status(500).json({ error: "Failed to fetch products." });
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
            onboardingData: user.onboardingData
        });
    } catch (error) {
        console.error("Auth me error:", error);
        res.status(500).json({ error: "Failed to fetch user profile" });
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

const PORT = process.env.PORT || 3001;
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log("✅ Secure Backend running on port " + PORT);
    });
}

export default app;
