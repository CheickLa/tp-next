import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('API Pokémon')
    .setDescription(`
      API RESTful pour la gestion de Pokémon avec authentification et vérification email.
      
      ## Fonctionnalités principales:
      - 🔐 **Authentification JWT** avec vérification email obligatoire
      - 👤 **Gestion des utilisateurs** (USER/ADMIN)
      - ⚡ **CRUD Pokémon** avec permissions par utilisateur
      - 📧 **Vérification email** lors de l'inscription
      - 🛡️ **Permissions** : chaque utilisateur ne voit que ses Pokémon (sauf admin)
      
      ## Comptes de test:
      - **User**: user@pokemon.com / user123
      - **User2**: user2@pokemon.com / user2123
      
      ## Pour créer un admin:
      Modifiez le rôle d'un utilisateur en base de données (USER → ADMIN)
      
      ## MailDev (pour les tests):
      Interface web pour voir les emails: http://localhost:1080
    `)
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      description: 'Entrez votre token JWT obtenu via /auth/login'
    })
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
