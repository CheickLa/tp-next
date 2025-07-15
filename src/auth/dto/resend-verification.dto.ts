import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class ResendVerificationDto {
  @ApiProperty({
    description: 'Adresse email pour renvoyer le lien de vérification',
    example: 'test@example.com',
  })
  @IsEmail()
  email: string;
}
