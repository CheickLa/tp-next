import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { ListPokemonDto } from './dto/list-pokemon.dto';
import { Role } from '@prisma/client';

@Injectable()
export class PokemonService {
  constructor(private prisma: PrismaService) {}

  async create(createPokemonDto: CreatePokemonDto, userId: number) {
    return this.prisma.pokemon.create({
      data: {
        ...createPokemonDto,
        createdBy: userId,
      },
      include: {
        creator: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });
  }

  async findAll(query: ListPokemonDto, userId: number, userRole: string) {
    const { page = 1, limit = 10, search, type } = query;
    const skip = (page - 1) * limit;

    const where: any = {};

    // Si l'utilisateur n'est pas admin, ne montrer que ses Pokémon
    if (userRole !== Role.ADMIN) {
      where.createdBy = userId;
    }

    if (search) {
      where.name = {
        contains: search,
        mode: 'insensitive',
      };
    }

    if (type) {
      where.OR = [
        { type1: { contains: type, mode: 'insensitive' } },
        { type2: { contains: type, mode: 'insensitive' } },
      ];
    }

    const [pokemon, total] = await Promise.all([
      this.prisma.pokemon.findMany({
        where,
        skip,
        take: limit,
        orderBy: { id: 'asc' },
        include: {
          creator: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
            },
          },
        },
      }),
      this.prisma.pokemon.count({ where }),
    ]);

    return {
      data: pokemon,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: number, userId: number, userRole: string) {
    const pokemon = await this.prisma.pokemon.findUnique({
      where: { id },
      include: {
        creator: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });

    if (!pokemon) {
      throw new NotFoundException(`Pokémon avec l'ID ${id} non trouvé`);
    }

    // Si l'utilisateur n'est pas admin et n'est pas le créateur, interdire l'accès
    if (userRole !== Role.ADMIN && pokemon.createdBy !== userId) {
      throw new ForbiddenException('Vous ne pouvez accéder qu\'aux Pokémon que vous avez créés');
    }

    return pokemon;
  }

  async update(id: number, updatePokemonDto: UpdatePokemonDto, userId: number, userRole: string) {
    await this.findOne(id, userId, userRole);

    return this.prisma.pokemon.update({
      where: { id },
      data: updatePokemonDto,
      include: {
        creator: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });
  }

  async remove(id: number, userId: number, userRole: string) {
    await this.findOne(id, userId, userRole);

    return this.prisma.pokemon.delete({
      where: { id },
      include: {
        creator: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });
  }

  async findByName(name: string, userId: number, userRole: string) {
    const pokemon = await this.prisma.pokemon.findUnique({
      where: { name },
      include: {
        creator: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });

    if (!pokemon) {
      throw new NotFoundException(`Pokémon avec le nom "${name}" non trouvé`);
    }

    // Si l'utilisateur n'est pas admin et n'est pas le créateur, interdire l'accès
    if (userRole !== Role.ADMIN && pokemon.createdBy !== userId) {
      throw new ForbiddenException('Vous ne pouvez accéder qu\'aux Pokémon que vous avez créés');
    }

    return pokemon;
  }
}
