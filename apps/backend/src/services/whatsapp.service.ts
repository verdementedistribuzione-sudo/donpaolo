import axios from 'axios';
import pino from 'pino';
import { userService } from './user.service';
import { aiService } from './ai.service';

const logger = pino();

interface WhatsAppIncomingMessage {
  from: string;
  id: string;
  timestamp: string;
  type: string;
  text?: { body: string };
}

export class WhatsAppService {
  private apiUrl = 'https://graph.instagram.com/v18.0';
  private phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  private accessToken = process.env.WHATSAPP_ACCESS_TOKEN;

  async handleIncomingMessage(message: WhatsAppIncomingMessage): Promise<void> {
    try {
      const phoneNumber = message.from;
      const messageText = message.text?.body || '';

      logger.info(`📨 Message from ${phoneNumber}: ${messageText}`);

      // Get or create user
      let user = await userService.getUserByPhoneNumber(phoneNumber);

      if (!user) {
        // New user - start onboarding
        logger.info(`🆕 New user: ${phoneNumber}`);
        await this.sendMessage(
          phoneNumber,
          'Benvenuto 🙏\nMi piacerebbe conoscerti meglio.\n\nCome preferisci essere chiamato?'
        );
        return;
      }

      // Process message
      const emotion = await aiService.detectEmotion(messageText);
      const hasRisk = await aiService.detectRisk(messageText);

      // Generate response
      const response = await aiService.generateResponse(messageText, []);

      // Send response
      await this.sendMessage(phoneNumber, response);

      // Handle risk
      if (hasRisk) {
        logger.warn(`🚨 Risk detected for ${phoneNumber}`);
        // TODO: Create alert
      }
    } catch (error) {
      logger.error('Error handling incoming message:', error);
    }
  }

  async sendMessage(phoneNumber: string, message: string): Promise<void> {
    try {
      const response = await axios.post(
        `${this.apiUrl}/${this.phoneNumberId}/messages`,
        {
          messaging_product: 'whatsapp',
          to: phoneNumber,
          type: 'text',
          text: { body: message },
        },
        {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
          },
        }
      );

      logger.info(`✅ Message sent to ${phoneNumber}`);
      return response.data;
    } catch (error) {
      logger.error(`❌ Error sending message to ${phoneNumber}:`, error);
      throw error;
    }
  }
}

export const whatsappService = new WhatsAppService();
