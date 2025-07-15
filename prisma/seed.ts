import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const pokemonData = [
  {
    name: 'Pikachu',
    type1: 'Electric',
    hp: 35,
    attack: 55,
    defense: 40,
    speed: 90,
    description: 'Un Pokémon électrique adorable avec des joues qui stockent l\'électricité.',
    imageUrl: 'https://img.pokemondb.net/artwork/large/pikachu.jpg',
  },
  {
    name: 'Charizard',
    type1: 'Fire',
    type2: 'Flying',
    hp: 78,
    attack: 84,
    defense: 78,
    speed: 100,
    description: 'Un puissant dragon de feu capable de voler à haute altitude.',
    imageUrl: 'https://img.pokemondb.net/artwork/large/charizard.jpg',
  },
  {
    name: 'Blastoise',
    type1: 'Water',
    hp: 79,
    attack: 83,
    defense: 100,
    speed: 78,
    description: 'Un Pokémon tortue avec des canons à eau sur sa carapace.',
    imageUrl: 'https://img.pokemondb.net/artwork/large/blastoise.jpg',
  },
  {
    name: 'Venusaur',
    type1: 'Grass',
    type2: 'Poison',
    hp: 80,
    attack: 82,
    defense: 83,
    speed: 80,
    description: 'Un Pokémon plante avec une grande fleur sur le dos.',
    imageUrl: 'https://img.pokemondb.net/artwork/large/venusaur.jpg',
  },
  {
    name: 'Alakazam',
    type1: 'Psychic',
    hp: 55,
    attack: 50,
    defense: 45,
    speed: 120,
    description: 'Un Pokémon psychique extrêmement intelligent.',
    imageUrl: 'https://img.pokemondb.net/artwork/large/alakazam.jpg',
  },
];

async function main() {
  console.log('Début du peuplement des données Pokémon...');
  
  const users = await prisma.user.findMany();
  
  if (users.length === 0) {
    console.log('❌ Aucun utilisateur trouvé. Veuillez d\'abord créer des utilisateurs avec le script create-test-users.');
    return;
  }
  
  console.log(`📋 ${users.length} utilisateurs trouvés. Attribution des Pokémon...`);
  
  for (let i = 0; i < pokemonData.length; i++) {
    const pokemon = pokemonData[i];
    const user = users[i % users.length]; 
    
    const existingPokemon = await prisma.pokemon.findUnique({
      where: { name: pokemon.name },
    });
    
    if (!existingPokemon) {
      await prisma.pokemon.create({
        data: {
          ...pokemon,
          createdBy: user.id,
        },
      });
      console.log(`✅ ${pokemon.name} ajouté (créé par ${user.firstName} ${user.lastName})`);
    } else {
      console.log(`⏭️  ${pokemon.name} existe déjà`);
    }
  }
  
  console.log('Peuplement terminé !');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
