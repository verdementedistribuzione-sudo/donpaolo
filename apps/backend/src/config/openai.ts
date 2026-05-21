import { OpenAI } from 'openai';
import pino from 'pino';

const logger = pino();

let openaiInstance: OpenAI | null = null;

export const initializeOpenAI = () => {
  if (openaiInstance) {
    return openaiInstance;
  }

  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    logger.error('Missing OpenAI API key');
    throw new Error('OPENAI_API_KEY is required');
  }

  openaiInstance = new OpenAI({ apiKey });

  logger.info('✅ OpenAI client initialized');
  return openaiInstance;
};

export const getOpenAI = () => {
  if (!openaiInstance) {
    return initializeOpenAI();
  }
  return openaiInstance;
};
