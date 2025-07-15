import { IsString, IsInt, IsOptional, Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePokemonDto {
  @ApiProperty({ description: 'Nom du Pokémon' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Type principal du Pokémon' })
  @IsString()
  type1: string;

  @ApiProperty({ description: 'Type secondaire du Pokémon', required: false })
  @IsString()
  @IsOptional()
  type2?: string;

  @ApiProperty({ description: 'Points de vie', minimum: 1, maximum: 999 })
  @IsInt()
  @Min(1)
  @Max(999)
  hp: number;

  @ApiProperty({ description: 'Points d\'attaque', minimum: 1, maximum: 999 })
  @IsInt()
  @Min(1)
  @Max(999)
  attack: number;

  @ApiProperty({ description: 'Points de défense', minimum: 1, maximum: 999 })
  @IsInt()
  @Min(1)
  @Max(999)
  defense: number;

  @ApiProperty({ description: 'Points de vitesse', minimum: 1, maximum: 999 })
  @IsInt()
  @Min(1)
  @Max(999)
  speed: number;

  @ApiProperty({ description: 'Description du Pokémon', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'URL de l\'image du Pokémon', required: false })
  @IsString()
  @IsOptional()
  imageUrl?: string;
}
