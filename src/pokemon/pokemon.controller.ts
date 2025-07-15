import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { PokemonService } from './pokemon.service';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { ListPokemonDto } from './dto/list-pokemon.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { JwtPayload } from '../auth/guards/auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Role } from '@prisma/client';

@ApiTags('pokemon')
@Controller('pokemon')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Post()
  @ApiOperation({ summary: 'Créer un nouveau Pokémon' })
  @ApiResponse({ status: 201, description: 'Pokémon créé avec succès.' })
  @ApiResponse({ status: 400, description: 'Données invalides.' })
  @ApiResponse({ status: 401, description: 'Non autorisé.' })
  create(
    @Body() createPokemonDto: CreatePokemonDto,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.pokemonService.create(createPokemonDto, user.sub);
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer la liste des Pokémon' })
  @ApiResponse({ status: 200, description: 'Liste des Pokémon récupérée avec succès.' })
  @ApiResponse({ status: 401, description: 'Non autorisé.' })
  findAll(
    @Query() query: ListPokemonDto,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.pokemonService.findAll(query, user.sub, user.role);
  }

  @Get('admin/all')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Admin : Récupérer tous les Pokémon de tous les utilisateurs' })
  @ApiResponse({ status: 200, description: 'Liste complète des Pokémon récupérée avec succès.' })
  @ApiResponse({ status: 401, description: 'Non autorisé.' })
  @ApiResponse({ status: 403, description: 'Accès interdit - Droits admin requis.' })
  findAllForAdmin(@Query() query: ListPokemonDto) {
    return this.pokemonService.findAll(query, 0, Role.ADMIN);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer un Pokémon par son ID' })
  @ApiResponse({ status: 200, description: 'Pokémon trouvé.' })
  @ApiResponse({ status: 404, description: 'Pokémon non trouvé.' })
  @ApiResponse({ status: 401, description: 'Non autorisé.' })
  @ApiResponse({ status: 403, description: 'Accès interdit - Pokémon créé par un autre utilisateur.' })
  findOne(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.pokemonService.findOne(id, user.sub, user.role);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour un Pokémon' })
  @ApiResponse({ status: 200, description: 'Pokémon mis à jour avec succès.' })
  @ApiResponse({ status: 404, description: 'Pokémon non trouvé.' })
  @ApiResponse({ status: 401, description: 'Non autorisé.' })
  @ApiResponse({ status: 403, description: 'Accès interdit - Pokémon créé par un autre utilisateur.' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePokemonDto: UpdatePokemonDto,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.pokemonService.update(id, updatePokemonDto, user.sub, user.role);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un Pokémon' })
  @ApiResponse({ status: 200, description: 'Pokémon supprimé avec succès.' })
  @ApiResponse({ status: 404, description: 'Pokémon non trouvé.' })
  @ApiResponse({ status: 401, description: 'Non autorisé.' })
  @ApiResponse({ status: 403, description: 'Accès interdit - Pokémon créé par un autre utilisateur.' })
  remove(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.pokemonService.remove(id, user.sub, user.role);
  }

  @Get('search/:name')
  @ApiOperation({ summary: 'Rechercher un Pokémon par son nom' })
  @ApiResponse({ status: 200, description: 'Pokémon trouvé.' })
  @ApiResponse({ status: 404, description: 'Pokémon non trouvé.' })
  @ApiResponse({ status: 401, description: 'Non autorisé.' })
  @ApiResponse({ status: 403, description: 'Accès interdit - Pokémon créé par un autre utilisateur.' })
  findByName(
    @Param('name') name: string,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.pokemonService.findByName(name, user.sub, user.role);
  }
}
