import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEmail, IsString } from 'class-validator';

export class SignInDto {
  @ApiProperty({
    description: 'Adresse email de l\'utilisateur',
    example: 'admin@pokemon.com',
  })
  @IsEmail()
  @Type(() => String)
  email: string;

  @ApiProperty({
    description: 'Mot de passe de l\'utilisateur',
    example: 'admin123',
  })
  @IsString()
  @Type(() => String)
  password: string;
}
