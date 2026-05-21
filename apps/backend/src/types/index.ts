export interface User {
  id: string;
  phone_number: string;
  name: string;
  province: string;
  parrocchia?: string;
  parroco?: string;
  status: 'active' | 'inactive' | 'paused';
  emotional_state?: string;
  risk_level: 'none' | 'low' | 'medium' | 'high';
  created_at: string;
  updated_at: string;
  privacy_accepted: boolean;
}

export interface Conversation {
  id: string;
  user_id: string;
  message_type: 'text' | 'audio' | 'prayer';
  user_message: string;
  ai_response: string;
  emotion_detected?: string;
  has_risk_indicator: boolean;
  created_at: string;
}

export interface Prayer {
  id: string;
  user_id: string;
  prayer_type: 'rosario' | 'contemplazione' | 'esame' | 'generale';
  duration_minutes?: number;
  mystery?: string;
  completed: boolean;
  prayer_intention?: string;
  created_at: string;
}

export interface Alert {
  id: string;
  user_id: string;
  alert_type: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  handled: boolean;
  created_at: string;
}

export interface WhatsAppMessage {
  object: string;
  entry: Array<{
    id: string;
    changes: Array<{
      value: {
        messaging_product: string;
        messages?: Array<{
          from: string;
          id: string;
          timestamp: string;
          type: string;
          text?: { body: string };
        }>;
      };
      field: string;
    }>;
  }>;
}
