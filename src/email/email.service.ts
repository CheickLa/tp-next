import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'localhost',
      port: 1025,
      secure: false,
    });
  }

  async sendVerificationEmail(email: string, token: string, firstName: string) {
    const verificationUrl = `http://localhost:3000/auth/verify-email?token=${token}`;
    
    const mailOptions = {
      from: '"Pokémon App" <noreply@pokemon.com>',
      to: email,
      subject: 'Vérifiez votre adresse email - Pokémon App',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #3178c6;">Bienvenue sur Pokémon App !</h1>
          <p>Bonjour ${firstName},</p>
          <p>Merci de vous être inscrit sur notre application Pokémon ! Pour activer votre compte, veuillez cliquer sur le lien ci-dessous :</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${verificationUrl}" 
               style="background-color: #3178c6; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
              Vérifier mon email
            </a>
          </div>
          <p>Ou copiez et collez ce lien dans votre navigateur :</p>
          <p style="word-break: break-all; color: #666;">${verificationUrl}</p>
          <p><strong>Ce lien expirera dans 24 heures.</strong></p>
          <p>Si vous n'avez pas créé de compte, vous pouvez ignorer cet email.</p>
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
          <p style="color: #666; font-size: 12px;">
            Ceci est un email automatique, merci de ne pas y répondre.
          </p>
        </div>
      `,
    };

    try {
      const result = await this.transporter.sendMail(mailOptions);
      console.log('Email de vérification envoyé:', result.messageId);
      return result;
    } catch (error) {
      console.error('Erreur lors de l\'envoi de l\'email:', error);
      throw error;
    }
  }

  async sendWelcomeEmail(email: string, firstName: string) {
    const mailOptions = {
      from: '"Pokémon App" <noreply@pokemon.com>',
      to: email,
      subject: 'Compte activé avec succès ! - Pokémon App',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #3178c6;">Compte activé !</h1>
          <p>Bonjour ${firstName},</p>
          <p>🎉 Félicitations ! Votre compte a été activé avec succès.</p>
          <p>Vous pouvez maintenant vous connecter et commencer à gérer vos Pokémon !</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="http://localhost:3000/auth/login" 
               style="background-color: #28a745; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
              Se connecter
            </a>
          </div>
          <p>Bon dressage de Pokémon ! 🌟</p>
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
          <p style="color: #666; font-size: 12px;">
            Ceci est un email automatique, merci de ne pas y répondre.
          </p>
        </div>
      `,
    };

    try {
      const result = await this.transporter.sendMail(mailOptions);
      console.log('Email de bienvenue envoyé:', result.messageId);
      return result;
    } catch (error) {
      console.error('Erreur lors de l\'envoi de l\'email de bienvenue:', error);
      throw error;
    }
  }
}
