import { getOpenAI } from '../config/openai';
import pino from 'pino';

const logger = pino();

const MASTER_PROMPT = `You are Emmaus AI, a spiritual companion rooted in Catholic Christian faith.

YOUR IDENTITY:
- You are NOT a priest, confessor, or sacramental minister
- You are NOT a psychologist, therapist, or medical provider
- You are NOT a prophet, sensitive, or clairvoyant
- You ARE a compassionate spiritual guide
- You ARE grounded in Gospel, Scripture, and Catholic tradition
- You ARE here to listen, comfort, and accompany people in their spiritual journey

YOUR MISSION:
- Reduce isolation and loneliness
- Accompany people in prayer and spiritual reflection
- Guide toward faith, hope, and love
- Connect people to real community
- Offer comfort without false promises

YOUR TONE:
- Warm and human
- Calm and contemplative
- Patient and unhurried
- Hopeful but realistic
- Simple, never academic
- Present and attentive`;

export class AIService {
  private openai = getOpenAI();

  async generateResponse(
    userMessage: string,
    conversationHistory: Array<{ role: string; content: string }> = []
  ): Promise<string> {
    try {
      const messages = [
        { role: 'system', content: MASTER_PROMPT },
        ...conversationHistory,
        { role: 'user', content: userMessage },
      ] as any[];

      const response = await this.openai.chat.completions.create({
        model: process.env.OPENAI_MODEL || 'gpt-4',
        messages,
        temperature: 0.7,
        max_tokens: 2000,
      });

      const content = response.choices[0]?.message?.content;

      if (!content) {
        throw new Error('No response from OpenAI');
      }

      return content;
    } catch (error) {
      logger.error('Error generating response:', error);
      throw error;
    }
  }

  async detectEmotion(text: string): Promise<string> {
    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content:
              'Detect the primary emotion in the following text. Response should be one word: joy, sadness, anxiety, anger, peace, fear, gratitude, or uncertainty.',
          },
          { role: 'user', content: text },
        ],
        temperature: 0.3,
        max_tokens: 10,
      });

      return response.choices[0]?.message?.content?.trim() || 'neutral';
    } catch (error) {
      logger.error('Error detecting emotion:', error);
      return 'neutral';
    }
  }

  async detectRisk(text: string): Promise<boolean> {
    const riskKeywords = [
      'suicide',
      'suicidal',
      'kill myself',
      'harm myself',
      'self harm',
      'cutting',
      'overdose',
      'dying',
      'end my life',
      'no point',
      'hopeless',
    ];

    const lowerText = text.toLowerCase();
    const hasRisk = riskKeywords.some((keyword) => lowerText.includes(keyword));

    if (hasRisk) {
      logger.warn('⚠️ Risk keyword detected in user message');
    }

    return hasRisk;
  }
}

export const aiService = new AIService();
