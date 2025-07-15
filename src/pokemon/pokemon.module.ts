import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { PrismaService } from '../prisma.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your-secret-key',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [PokemonController],
  providers: [PokemonService, PrismaService, AuthGuard, RolesGuard],
  exports: [PokemonService],
})
export class PokemonModule {}
