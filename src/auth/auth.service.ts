import { Injectable, UnauthorizedException, BadRequestException, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from '../users/users.service';
import { EmailService } from '../email/email.service';

interface Register {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface Payload {
  sub: number;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private prisma: PrismaService,
    private emailService: EmailService,
  ) {}

  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);

    if (
      !user ||
      !user.password ||
      !(await bcrypt.compare(pass, user?.password))
    ) {
      throw new UnauthorizedException('Email ou mot de passe incorrect');
    }

    if (!user.isEmailVerified) {
      throw new UnauthorizedException('Veuillez vérifier votre email avant de vous connecter');
    }

    const payload: Payload = {
      sub: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async register(registerBody: Register) {
    // Vérifier si l'utilisateur existe déjà
    const existingUser = await this.prisma.user.findUnique({
      where: { email: registerBody.email },
    });

    if (existingUser) {
      throw new BadRequestException('Un utilisateur avec cet email existe déjà');
    }

    // Générer un token de vérification
    const verificationToken = uuidv4();
    const verificationExpiry = new Date();
    verificationExpiry.setHours(verificationExpiry.getHours() + 24); // 24h d'expiration

    // Créer l'utilisateur (non vérifié)
    const user = await this.prisma.user.create({
      data: {
        email: registerBody.email,
        password: await bcrypt.hash(registerBody.password, 10),
        firstName: registerBody.firstName,
        lastName: registerBody.lastName,
        isEmailVerified: false,
        emailVerifyToken: verificationToken,
        emailVerifyExpiry: verificationExpiry,
      },
    });

    // Envoyer l'email de vérification
    try {
      await this.emailService.sendVerificationEmail(
        user.email,
        verificationToken,
        user.firstName,
      );
    } catch (error) {
      console.error('Erreur lors de l\'envoi de l\'email:', error);
      // Même si l'email échoue, on ne supprime pas l'utilisateur
      // L'utilisateur peut demander un nouveau token plus tard
    }

    return {
      message: 'Compte créé avec succès ! Veuillez vérifier votre email pour activer votre compte.',
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    };
  }

  async verifyEmail(token: string) {
    const user = await this.prisma.user.findUnique({
      where: { emailVerifyToken: token },
    });

    if (!user) {
      throw new NotFoundException('Token de vérification invalide');
    }

    if (!user.emailVerifyExpiry || new Date() > user.emailVerifyExpiry) {
      throw new BadRequestException('Le token de vérification a expiré');
    }

    // Activer le compte
    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        isEmailVerified: true,
        emailVerifyToken: null,
        emailVerifyExpiry: null,
      },
    });

    // Envoyer l'email de bienvenue
    try {
      await this.emailService.sendWelcomeEmail(user.email, user.firstName);
    } catch (error) {
      console.error('Erreur lors de l\'envoi de l\'email de bienvenue:', error);
    }

    return {
      message: 'Email vérifié avec succès ! Votre compte est maintenant actif.',
    };
  }

  async resendVerificationEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new NotFoundException('Utilisateur non trouvé');
    }

    if (user.isEmailVerified) {
      throw new BadRequestException('L\'email est déjà vérifié');
    }

    // Générer un nouveau token
    const verificationToken = uuidv4();
    const verificationExpiry = new Date();
    verificationExpiry.setHours(verificationExpiry.getHours() + 24);

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerifyToken: verificationToken,
        emailVerifyExpiry: verificationExpiry,
      },
    });

    // Renvoyer l'email
    await this.emailService.sendVerificationEmail(
      user.email,
      verificationToken,
      user.firstName,
    );

    return {
      message: 'Email de vérification renvoyé avec succès',
    };
  }
}
