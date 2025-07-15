import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function createTestUsers() {
  console.log('Création des utilisateurs de test...');

  // Créer un utilisateur admin
  // Pour l'admin à la correction du TP, il faut directement update le role d'un user en base de données avec prisma studio apès après générer les seed

  // Créer un utilisateur normal
  const userPassword = await bcrypt.hash('user123', 10);
  const user = await prisma.user.upsert({
    where: { email: 'user@pokemon.com' },
    update: {},
    create: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'user@pokemon.com',
      password: userPassword,
      role: 'USER',
    },
  });
  console.log('✅ Utilisateur normal créé:', user.email);

  // Créer un autre utilisateur normal
  const user2Password = await bcrypt.hash('user2123', 10);
  const user2 = await prisma.user.upsert({
    where: { email: 'user2@pokemon.com' },
    update: {},
    create: {
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'user2@pokemon.com',
      password: user2Password,
      role: 'USER',
    },
  });
  console.log('✅ Deuxième utilisateur normal créé:', user2.email);

  console.log('\n📋 Utilisateurs de test créés :');
  console.log('Admin: admin@pokemon.com / admin123');
  console.log('User 1: user@pokemon.com / user123');
  console.log('User 2: user2@pokemon.com / user2123');
}

createTestUsers()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
