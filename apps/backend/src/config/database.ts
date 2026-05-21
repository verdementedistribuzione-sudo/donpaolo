import { createClient } from '@supabase/supabase-js';
import pino from 'pino';

const logger = pino();

let supabaseInstance: any = null;

export const initializeSupabase = () => {
  if (supabaseInstance) {
    return supabaseInstance;
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    logger.error('Missing Supabase credentials');
    throw new Error('SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required');
  }

  supabaseInstance = createClient(supabaseUrl, supabaseKey);

  logger.info('✅ Supabase client initialized');
  return supabaseInstance;
};

export const getSupabase = () => {
  if (!supabaseInstance) {
    return initializeSupabase();
  }
  return supabaseInstance;
};
