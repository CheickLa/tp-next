import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEmail, IsString } from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    description: 'Prénom de l\'utilisateur',
    example: 'Jean',
  })
  @IsString()
  @Type(() => String)
  firstName: string;

  @ApiProperty({
    description: 'Nom de famille de l\'utilisateur',
    example: 'Dupont',
  })
  @IsString()
  @Type(() => String)
  lastName: string;
  
  @ApiProperty({
    description: 'Adresse email de l\'utilisateur',
    example: 'jean.dupont@example.com',
  })
  @IsEmail()
  @Type(() => String)
  email: string;

  @ApiProperty({
    description: 'Mot de passe de l\'utilisateur',
    example: 'motdepasse123',
  })
  @IsString()
  @Type(() => String)
  password: string;
}
