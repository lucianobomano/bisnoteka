const { PrismaClient } = require('@prisma/client');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const prisma = new PrismaClient();

async function main() {
  const magazines = await prisma.magazineEdition.findMany();
  const cleanMagazines = magazines.map(mag => ({
    ...mag,
    coverImage: mag.coverImage ? (mag.coverImage.substring(0, 50) + '... (truncated)') : null
  }));
  console.log('Magazines in database:', JSON.stringify(cleanMagazines, null, 2));
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

