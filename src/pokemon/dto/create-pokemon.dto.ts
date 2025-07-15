import { IsString, IsInt, IsOptional, Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePokemonDto {
  @ApiProperty({ 
    description: 'Nom du Pokémon',
    example: 'Dracaufeu'
  })
  @IsString()
  name: string;

  @ApiProperty({ 
    description: 'Type principal du Pokémon',
    example: 'Feu'
  })
  @IsString()
  type1: string;

  @ApiProperty({ 
    description: 'Type secondaire du Pokémon', 
    required: false,
    example: 'Vol'
  })
  @IsString()
  @IsOptional()
  type2?: string;

  @ApiProperty({ 
    description: 'Points de vie', 
    minimum: 1, 
    maximum: 999,
    example: 78
  })
  @IsInt()
  @Min(1)
  @Max(999)
  hp: number;

  @ApiProperty({ 
    description: 'Points d\'attaque', 
    minimum: 1, 
    maximum: 999,
    example: 84
  })
  @IsInt()
  @Min(1)
  @Max(999)
  attack: number;

  @ApiProperty({ 
    description: 'Points de défense', 
    minimum: 1, 
    maximum: 999,
    example: 78
  })
  @IsInt()
  @Min(1)
  @Max(999)
  defense: number;

  @ApiProperty({ 
    description: 'Points de vitesse', 
    minimum: 1, 
    maximum: 999,
    example: 100
  })
  @IsInt()
  @Min(1)
  @Max(999)
  speed: number;

  @ApiProperty({ 
    description: 'Description du Pokémon', 
    required: false,
    example: 'Pokémon Flamme. Il crache un feu si chaud qu\'il peut faire fondre n\'importe quoi.'
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ 
    description: 'URL de l\'image du Pokémon', 
    required: false,
    example: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/006.png'
  })
  @IsString()
  @IsOptional()
  imageUrl?: string;
}
