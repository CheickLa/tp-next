import { Body, Controller, HttpCode, HttpStatus, Post, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { SignInDto } from './dto/sign-in.dto';
import { ResendVerificationDto } from './dto/resend-verification.dto';

@ApiTags('Authentification')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Connexion utilisateur' })
  @ApiResponse({ 
    status: 200, 
    description: 'Connexion réussie',
    schema: {
      type: 'object',
      properties: {
        access_token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' }
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Email ou mot de passe incorrect / Email non vérifié' })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @ApiOperation({ summary: 'Inscription utilisateur' })
  @ApiResponse({ 
    status: 201, 
    description: 'Compte créé avec succès. Un email de vérification a été envoyé.',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Compte créé avec succès ! Veuillez vérifier votre email pour activer votre compte.' },
        user: {
          type: 'object',
          properties: {
            id: { type: 'number', example: 1 },
            email: { type: 'string', example: 'test@example.com' },
            firstName: { type: 'string', example: 'Jean' },
            lastName: { type: 'string', example: 'Dupont' }
          }
        }
      }
    }
  })
  @ApiResponse({ status: 400, description: 'Un utilisateur avec cet email existe déjà' })
  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @ApiOperation({ summary: 'Vérifier l\'adresse email' })
  @ApiQuery({ 
    name: 'token', 
    description: 'Token de vérification reçu par email',
    example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Email vérifié avec succès',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Email vérifié avec succès ! Votre compte est maintenant actif.' }
      }
    }
  })
  @ApiResponse({ status: 404, description: 'Token de vérification invalide' })
  @ApiResponse({ status: 400, description: 'Le token de vérification a expiré' })
  @Get('verify-email')
  verifyEmail(@Query('token') token: string) {
    return this.authService.verifyEmail(token);
  }

  @ApiOperation({ summary: 'Renvoyer l\'email de vérification' })
  @ApiResponse({ 
    status: 200, 
    description: 'Email de vérification renvoyé avec succès',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Email de vérification renvoyé avec succès' }
      }
    }
  })
  @ApiResponse({ status: 404, description: 'Utilisateur non trouvé' })
  @ApiResponse({ status: 400, description: 'L\'email est déjà vérifié' })
  @HttpCode(HttpStatus.OK)
  @Post('resend-verification')
  resendVerificationEmail(@Body() resendDto: ResendVerificationDto) {
    return this.authService.resendVerificationEmail(resendDto.email);
  }
}
