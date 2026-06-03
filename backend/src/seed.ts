import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // 1. Seed Courses
  console.log('Seeding courses...');
  await prisma.course.createMany({
    data: [
      {
        title: "Mastering Scale em Angola",
        description: "Domine as estratégias de escalonamento específicas para o mercado angolano e leve seu negócio ao próximo nível.",
        instructor: "Por Bisnoteka",
        category: "Negócios",
        price: 150000,
        oldPrice: 250000,
        coverImage: "/media/COURSE_SCALE.png",
        rating: 5.0,
        level: "Avançado",
        duration: "12h 30min",
        isPublished: true,
      },
      {
        title: "Branding de Emboscada",
        description: "Aprenda técnicas disruptivas de marketing para destacar sua marca mesmo com orçamentos limitados.",
        instructor: "Por Bisnoteka",
        category: "Branding",
        price: 85000,
        oldPrice: 120000,
        coverImage: "/media/COURSE_BRANDING.png",
        rating: 4.9,
        level: "Intermédio",
        duration: "8h 15min",
        isPublished: true,
      },
      {
        title: "Ecommerce do Zero AKZ Milhão",
        description: "Construa sua loja online do zero e alcance seu primeiro milhão com estratégias validadas de vendas.",
        instructor: "Por Bisnoteka",
        category: "Ecommerce",
        price: 200000,
        coverImage: "/media/COURSE_ECOMMERCE.png",
        rating: 5.0,
        level: "Iniciante",
        duration: "15h 20min",
        isPublished: true,
      }
    ],
    skipDuplicates: true
  });

  // 2. Seed Products (Books)
  console.log('Seeding books...');
  await prisma.product.createMany({
    data: [
      {
        title: "O Código do Escalador",
        description: "Guia definitivo para escalar empresas em mercados emergentes com estratégias validadas.",
        price: 12500,
        format: "PHYSICAL",
        coverImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800",
        category: "Livro Físico",
      },
      {
        title: "Marketing Disruptivo na Era Digital",
        description: "E-book completo sobre táticas de marketing que quebram padrões e geram atenção massiva.",
        price: 8500,
        format: "DIGITAL",
        coverImage: "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=800",
        category: "E-book",
      },
      {
        title: "Mentalidade de Founder",
        description: "Os modelos mentais e hábitos dos empreendedores mais bem sucedidos da nossa geração.",
        price: 15000,
        format: "PHYSICAL",
        coverImage: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=800",
        category: "Livro Físico",
      }
    ],
    skipDuplicates: true
  });

  // 3. Seed Success Stories
  console.log('Seeding success stories...');
  await prisma.successStory.createMany({
    data: [
      {
        title: "Como a Nexus Digital faturou 50M AKZ em 6 meses",
        entrepreneurName: "Kizua Tech",
        content: "A Nexus Digital começou como uma pequena agência e, utilizando as estratégias Faundr, escalou massivamente.",
        coverImage: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=1600",
      },
      {
        title: "Revolução no Varejo: O caso da Kixilo",
        entrepreneurName: "Ana Silva",
        content: "Uma marca local de vestuário que usou Branding de Emboscada para dominar o mercado Luandense.",
        coverImage: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1600",
      }
    ],
    skipDuplicates: true
  });

  // 4. Seed Podcasts
  console.log('Seeding podcasts...');
  await prisma.podcastEpisode.createMany({
    data: [
      {
        title: "O Segredo do Capital de Risco em Angola",
        guestName: "Hélder Silva, CEO Bantou Capital",
        description: "Neste episódio discutimos o panorama do capital de risco e como startups podem levantar investimento.",
        duration: "45:20",
        releaseDate: new Date("2026-05-10T10:00:00Z"),
      },
      {
        title: "Construindo uma Marca de Luxo",
        guestName: "Nádia Costa, Designer",
        description: "Os pilares para construir uma marca que as pessoas amam e pagam prémio.",
        duration: "52:10",
        releaseDate: new Date("2026-05-17T10:00:00Z"),
      }
    ],
    skipDuplicates: true
  });

  // 5. Seed Magazine
  console.log('Seeding magazines...');
  await prisma.magazineEdition.createMany({
    data: [
      {
        issueNumber: 1,
        title: "Edição de Lançamento: O Novo Empreendedor",
        description: "A primeira edição focada nas fundações de negócios modernos em Angola.",
        coverImage: "https://images.unsplash.com/photo-1585241936939-f9c40212004d?auto=format&fit=crop&q=80&w=800",
        pdfFileUrl: "https://example.com/magazine-1.pdf",
        releaseDate: new Date("2026-01-01T10:00:00Z"),
      },
      {
        issueNumber: 2,
        title: "A Revolução Web3 e IA",
        description: "Como as novas tecnologias estão a mudar as regras do jogo no mundo corporativo.",
        coverImage: "https://images.unsplash.com/photo-1586339949916-3e9b67eb6df2?auto=format&fit=crop&q=80&w=800",
        pdfFileUrl: "https://example.com/magazine-2.pdf",
        releaseDate: new Date("2026-02-01T10:00:00Z"),
      }
    ],
    skipDuplicates: true
  });

  // 6. Seed Forge Programs
  console.log('Seeding forge programs...');
  await prisma.faundrForgeProgram.createMany({
    data: [
      {
        name: "Incubação Alpha",
        cohort: "S1 2026",
        description: "Programa intensivo de 3 meses para startups seed stage.",
        startDate: new Date("2026-06-01T00:00:00Z"),
        endDate: new Date("2026-09-01T00:00:00Z"),
        status: "OPEN"
      },
      {
        name: "Aceleração Scaling Tech",
        cohort: "S2 2026",
        description: "Aceleração para startups com produto validado que precisam de tracionar.",
        startDate: new Date("2026-10-01T00:00:00Z"),
        endDate: new Date("2027-01-01T00:00:00Z"),
        status: "UPCOMING"
      }
    ],
    skipDuplicates: true
  });

  // 7. Seed Experience Events
  console.log('Seeding experience events...');
  await prisma.experienceEvent.createMany({
    data: [
      {
        name: "Faundr Summit 2026",
        description: "O maior evento de empreendedorismo de Luanda, focado em networking de alto nível.",
        location: "Centro de Convenções de Talatona",
        date: new Date("2026-08-15T09:00:00Z"),
        ticketPrice: 50000,
        capacity: 1000,
        coverImage: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1600"
      },
      {
        name: "Mastermind Executivo",
        description: "Sessão fechada para 20 CEOs discutirem estratégias corporativas e M&A.",
        location: "Hotel Epic Sana",
        date: new Date("2026-06-10T14:00:00Z"),
        ticketPrice: 250000,
        capacity: 20,
        coverImage: "https://images.unsplash.com/photo-1515169067868-5387ec356754?auto=format&fit=crop&q=80&w=1600"
      }
    ],
    skipDuplicates: true
  });

  // 8. Seed Mindset
  console.log('Seeding mindset tracks...');
  await prisma.mindsetTrack.createMany({
    data: [
      {
        title: "Foco Absoluto (Morning Track)",
        audioUrl: "https://example.com/audio1.mp3",
        duration: "5:00",
        category: "FOCUS"
      },
      {
        title: "Mentalidade de Abundância",
        audioUrl: "https://example.com/audio2.mp3",
        duration: "7:30",
        category: "WEALTH"
      }
    ],
    skipDuplicates: true
  });

  console.log('✅ Seeding completed!');
}

main().then(() => {
  prisma.$disconnect();
}).catch((e) => {
  console.error(e);
  prisma.$disconnect();
});
