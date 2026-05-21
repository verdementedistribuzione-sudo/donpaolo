import { getSupabase } from '../config/database';
import { User } from '../types';
import pino from 'pino';
import { v4 as uuidv4 } from 'uuid';

const logger = pino();

export class UserService {
  private supabase = getSupabase();

  async getUserByPhoneNumber(phoneNumber: string): Promise<User | null> {
    try {
      const { data, error } = await this.supabase
        .from('users')
        .select('*')
        .eq('phone_number', phoneNumber)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          // No rows found
          return null;
        }
        throw error;
      }

      return data as User;
    } catch (error) {
      logger.error('Error fetching user:', error);
      throw error;
    }
  }

  async createUser(
    phoneNumber: string,
    name: string,
    province: string
  ): Promise<User> {
    try {
      const userId = uuidv4();

      const { data, error } = await this.supabase
        .from('users')
        .insert([
          {
            id: userId,
            phone_number: phoneNumber,
            name,
            province,
            status: 'active',
            risk_level: 'none',
            privacy_accepted: false,
            whatsapp_verified: true,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        ])
        .select()
        .single();

      if (error) throw error;

      logger.info(`✅ User created: ${phoneNumber}`);
      return data as User;
    } catch (error) {
      logger.error('Error creating user:', error);
      throw error;
    }
  }

  async updateUserProfile(
    userId: string,
    updates: Partial<User>
  ): Promise<User> {
    try {
      const { data, error } = await this.supabase
        .from('users')
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq('id', userId)
        .select()
        .single();

      if (error) throw error;

      logger.info(`✅ User updated: ${userId}`);
      return data as User;
    } catch (error) {
      logger.error('Error updating user:', error);
      throw error;
    }
  }

  async updateRiskLevel(
    userId: string,
    riskLevel: 'none' | 'low' | 'medium' | 'high'
  ): Promise<void> {
    try {
      await this.updateUserProfile(userId, { risk_level: riskLevel });
      logger.info(`Risk level updated for user ${userId}: ${riskLevel}`);
    } catch (error) {
      logger.error('Error updating risk level:', error);
      throw error;
    }
  }
}

export const userService = new UserService();
