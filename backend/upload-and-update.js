const { PrismaClient } = require('@prisma/client');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

dotenv.config({ path: path.join(__dirname, '.env') });

const prisma = new PrismaClient();
const API_URL = 'https://bisnoteka.com'; // Use the production backend

async function uploadFile(localPath, filename) {
  console.log(`Getting signed upload URL for ${filename}...`);
  const response = await fetch(`${API_URL}/api/upload-pdf-url`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ filename }),
  });

  if (!response.ok) {
    throw new Error(`Failed to get signed URL: ${response.statusText}`);
  }

  const { signedUrl, publicUrl } = await response.json();
  console.log(`Signed URL acquired. Uploading ${filename} to Supabase...`);

  const fileBuffer = fs.readFileSync(localPath);

  const uploadResponse = await fetch(signedUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/pdf',
    },
    body: fileBuffer,
  });

  if (!uploadResponse.ok) {
    const errorText = await uploadResponse.text();
    throw new Error(`Upload failed: ${uploadResponse.statusText} - ${errorText}`);
  }

  console.log(`Upload successful for ${filename}! Public URL: ${publicUrl}`);
  return publicUrl;
}

async function main() {
  const magazines = await prisma.magazineEdition.findMany();
  
  for (const mag of magazines) {
    if (mag.pdfFileUrl && mag.pdfFileUrl.includes('localhost:3001')) {
      const filename = mag.pdfFileUrl.split('/uploads/')[1];
      const localPath = path.join(__dirname, 'uploads', filename);

      if (fs.existsSync(localPath)) {
        console.log(`Processing magazine "${mag.title}"...`);
        try {
          const publicUrl = await uploadFile(localPath, filename);
          
          console.log(`Updating database record for "${mag.title}"...`);
          await prisma.magazineEdition.update({
            where: { id: mag.id },
            data: { pdfFileUrl: publicUrl }
          });
          console.log(`Database record updated for "${mag.title}"!\n`);
        } catch (err) {
          console.error(`Error processing ${filename}:`, err);
        }
      } else {
        console.warn(`Local file ${localPath} not found for magazine "${mag.title}"`);
      }
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
