import { IsOptional, IsString, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class ListPokemonDto {
  @ApiProperty({ description: 'Numéro de page', required: false, default: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiProperty({ description: 'Nombre d\'éléments par page', required: false, default: 10 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = 10;

  @ApiProperty({ description: 'Recherche par nom', required: false })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiProperty({ description: 'Filtrer par type', required: false })
  @IsOptional()
  @IsString()
  type?: string;
}
