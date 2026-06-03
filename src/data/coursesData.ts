export interface Course {
    id: number;
    title: string;
    description: string;
    instructor: string;
    category: string;
    price: string;
    oldPrice?: string;
    img: string;
    rating: number;
    students: number;
    duration: string;
    lessons: number;
    level: string;
}

export const courses: Course[] = [
    {
        id: 1,
        title: "Mastering Scale em Angola",
        description: "Domine as estratégias de escalonamento específicas para o mercado angolano e leve seu negócio ao próximo nível.",
        instructor: "Por Bisnoteka",
        category: "Negócios",
        price: "AKZ 150.000",
        oldPrice: "AKZ 250.000",
        img: "/media/COURSE_SCALE.png",
        rating: 5.0,
        students: 1240,
        duration: "12h 30min",
        lessons: 45,
        level: "Avançado"
    },
    {
        id: 2,
        title: "Branding de Emboscada",
        description: "Aprenda técnicas disruptivas de marketing para destacar sua marca mesmo com orçamentos limitados.",
        instructor: "Por Bisnoteka",
        category: "Branding",
        price: "AKZ 85.000",
        oldPrice: "AKZ 120.000",
        img: "/media/COURSE_BRANDING.png",
        rating: 4.9,
        students: 850,
        duration: "8h 15min",
        lessons: 32,
        level: "Intermédio"
    },
    {
        id: 3,
        title: "Financial Blueprint Pro",
        description: "O guia completo para gestão financeira empresarial, desde o fluxo de caixa até investimentos estratégicos.",
        instructor: "Por Bisnoteka",
        category: "Negócios",
        price: "AKZ 120.000",
        img: "/media/COURSE_FINANCE_BLUEPRINT.png",
        rating: 4.8,
        students: 620,
        duration: "10h 45min",
        lessons: 38,
        level: "Avançado"
    },
    {
        id: 4,
        title: "Ecommerce do Zero AKZ Milhão",
        description: "Construa sua loja online do zero e alcance seu primeiro milhão com estratégias validadas de vendas.",
        instructor: "Por Bisnoteka",
        category: "Ecommerce",
        price: "AKZ 200.000",
        img: "/media/COURSE_ECOMMERCE.png",
        rating: 5.0,
        students: 2100,
        duration: "15h 20min",
        lessons: 52,
        level: "Iniciante"
    },
    {
        id: 5,
        title: "Marketing Digital de Elite",
        description: "Domine as ferramentas e táticas de marketing digital que as grandes empresas utilizam para dominar o mercado.",
        instructor: "Por Bisnoteka",
        category: "Marketing",
        price: "AKZ 95.000",
        img: "/media/COURSE_MARKETING.png",
        rating: 4.7,
        students: 1560,
        duration: "11h 00min",
        lessons: 40,
        level: "Intermédio"
    },
    {
        id: 6,
        title: "A Arte da Negociação",
        description: "Desenvolva habilidades de persuasão e negociação para fechar acordos imbatíveis em qualquer situação.",
        instructor: "Por Bisnoteka",
        category: "Vendas",
        price: "AKZ 180.000",
        img: "/media/COURSE_NEGOTIATION.png",
        rating: 4.9,
        students: 730,
        duration: "7h 45min",
        lessons: 28,
        level: "Avançado"
    },
    {
        id: 7,
        title: "Liderança de Alto Impacto",
        description: "Torne-se o líder que sua equipe precisa, inspirando confiança e alcançando resultados extraordinários.",
        instructor: "Por Bisnoteka",
        category: "Liderança",
        price: "AKZ 220.000",
        img: "/media/COURSE_LEADERSHIP.png",
        rating: 5.0,
        students: 480,
        duration: "9h 30min",
        lessons: 35,
        level: "Avançado"
    },
    {
        id: 8,
        title: "Growth Hacking Estratégico",
        description: "Aprenda a metodologia de crescimento acelerado utilizada pelas startups mais bem-sucedidas do mundo.",
        instructor: "Por Bisnoteka",
        category: "Marketing",
        price: "AKZ 110.000",
        img: "/media/COURSE_GROWTH.png",
        rating: 4.8,
        students: 920,
        duration: "10h 15min",
        lessons: 42,
        level: "Avançado"
    },
    {
        id: 9,
        title: "Vendas Complexas B2B",
        description: "Estratégias avançadas para vender produtos e serviços de alto valor para outras empresas.",
        instructor: "Por Bisnoteka",
        category: "Vendas",
        price: "AKZ 165.000",
        img: "/media/COURSE_SALES.png",
        rating: 4.9,
        students: 540,
        duration: "8h 50min",
        lessons: 30,
        level: "Avançado"
    },
    {
        id: 10,
        title: "Startup de Alto Crescimento",
        description: "Como transformar uma ideia em uma empresa escalável e atrair o interesse de investidores.",
        instructor: "Por Bisnoteka",
        category: "Negócios",
        price: "AKZ 300.000",
        img: "/media/COURSE_STARTUP.png",
        rating: 5.0,
        students: 310,
        duration: "14h 20min",
        lessons: 48,
        level: "Avançado"
    },
    {
        id: 11,
        title: "Branding Pessoal",
        description: "Construa sua autoridade online e torne-se a referência máxima em seu nicho de atuação.",
        instructor: "Por Bisnoteka",
        category: "Branding",
        price: "AKZ 0 (Grátis)",
        img: "/media/COURSE_BRANDING_PERSONAL.png",
        rating: 4.9,
        students: 4500,
        duration: "5h 30min",
        lessons: 20,
        level: "Iniciante"
    },
    {
        id: 12,
        title: "Psicologia do Consumidor",
        description: "Entenda os gatilhos mentais que influenciam as decisões de compra e use-os de forma ética.",
        instructor: "Por Bisnoteka",
        category: "Marketing",
        price: "AKZ 140.000",
        img: "/media/COURSE_CONSUMER.png",
        rating: 5.0,
        students: 670,
        duration: "9h 10min",
        lessons: 34,
        level: "Intermédio"
    }
];
