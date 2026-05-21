# Emmaus AI - Setup Completo

## 🚀 Quick Start con Docker

### 1. Preparazione

```bash
# Clone il repo
git clone https://github.com/verdementedistribuzione-sudo/donpaolo
cd donpaolo

# Copia il .env
cp .env.example .env.local

# Riempi le credenziali API
vim .env.local
# Aggiungi:
# OPENAI_API_KEY=sk-...
# WHATSAPP_ACCESS_TOKEN=...
```

### 2. Start con Docker

```bash
# Build e start
docker-compose up -d

# Controlla i logs
docker-compose logs -f
```

### 3. Accedi ai servizi

- **Frontend**: http://localhost:3001
- **Backend API**: http://localhost:3000
- **Admin**: http://localhost:3001/admin/login (demo@emmaus.it / demo)
- **Chat Test**: http://localhost:3001/admin/chat-test
- **Dashboard CEO**: http://localhost:3001/admin/ceo

---

## 🛠️ Setup Locale (Senza Docker)

### Backend

```bash
cd apps/backend
npm install
npm run dev
```

### Frontend

```bash
cd apps/frontend
npm install
npm run dev
```

---

## 📱 Setup WhatsApp Business API

### 1. Meta Developer Account

- Vai su https://developers.facebook.com
- Crea app (WhatsApp Business API)
- Ottieni: Phone Number ID, Access Token

### 2. Webhook Configuration

```bash
# Callback URL
https://your-domain.com/api/v1/webhooks/whatsapp

# Verify Token (genera uno casuale)
echo $(openssl rand -hex 32)
```

### 3. Variabili Ambiente

```bash
# .env.local
WHATSAPP_BUSINESS_ACCOUNT_ID=...
WHATSAPP_PHONE_NUMBER_ID=...
WHATSAPP_ACCESS_TOKEN=...
WHATSAPP_WEBHOOK_VERIFY_TOKEN=...
```

---

## 🤖 Test Chat Bot

1. Vai su http://localhost:3001/admin/chat-test
2. Usa i pulsanti di test rapido:
   - "Problema famigliare"
   - "Isolamento"
   - "Rosario Guidato"
   - "Crisi di Fede"

### Risposte Attese

| Input | Risposta | Emozione | Rischio |
|-------|----------|----------|----------|
| Problema famigliare | Empatica, consiglio spirituale | ansioso | none |
| Voglio pregare | Guida rosario | sereno | none |
| Mi voglio male | Alert, contatti umani | paura | HIGH |

---

## 📊 Dashboard CEO

Vai su http://localhost:3001/admin/ceo

**Funzionalità**:
- Filtri per provincia e parrocchia
- Statistiche in tempo reale
- Tabella utenti con tutti i dati
- Export CSV
- Visualizzazione stato emotivo
- Monitoraggio rischio

---

## 🔐 Credenziali Demo

**Admin Login**
- Email: `admin@emmaus.it`
- Password: `demo`

---

## 📦 Database Setup (Supabase)

```sql
-- Esegui nel SQL Editor di Supabase

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phone_number VARCHAR(20) UNIQUE NOT NULL,
  name VARCHAR(100),
  province VARCHAR(100),
  parrocchia VARCHAR(200),
  parroco VARCHAR(100),
  status VARCHAR(20) DEFAULT 'active',
  emotional_state VARCHAR(50),
  risk_level VARCHAR(20) DEFAULT 'none',
  privacy_accepted BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

CREATE TABLE conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  message_type VARCHAR(20),
  user_message TEXT,
  ai_response TEXT,
  emotion_detected VARCHAR(50),
  has_risk_indicator BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE prayers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  prayer_type VARCHAR(50),
  completed BOOLEAN DEFAULT false,
  prayer_intention TEXT,
  created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  alert_type VARCHAR(100),
  severity VARCHAR(20),
  description TEXT,
  handled BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT now()
);
```

---

## 🚀 Deployment

### Vercel (Frontend)

```bash
# Connetti GitHub repo
vercel link
vercel deploy
```

### Railway/Render (Backend)

```bash
# Push su GitHub
git push origin main
# Railway automaticamente deploya
```

---

## 📞 Supporto

- Email: support@emmaus-ai.it
- Docs: Questo file
- Issues: GitHub issues

---

**Creato con ❤️ per la comunità cristiana**
