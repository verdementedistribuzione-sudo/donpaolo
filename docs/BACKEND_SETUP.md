# Backend Setup - Emmaus AI

## 📁 Backend Structure

```
apps/backend/
├── src/
│   ├── config/           # Configuration
│   │   ├── database.ts
│   │   ├── openai.ts
│   │   ├── whatsapp.ts
│   │   └── stripe.ts
│   ├── api/              # API Routes
│   │   ├── messages.ts
│   │   ├── webhooks.ts
│   │   ├── users.ts
│   │   ├── prayers.ts
│   │   └── admin.ts
│   ├── services/         # Business Logic
│   │   ├── ai.service.ts
│   │   ├── whatsapp.service.ts
│   │   ├── user.service.ts
│   │   ├── prayer.service.ts
│   │   └── emotion.service.ts
│   ├── middleware/       # Express Middleware
│   │   ├── auth.ts
│   │   ├── validation.ts
│   │   └── error-handler.ts
│   ├── types/            # TypeScript types
│   │   ├── user.ts
│   │   ├── message.ts
│   │   ├── prayer.ts
│   │   └── alert.ts
│   ├── utils/            # Utility functions
│   │   ├── logger.ts
│   │   ├── encryption.ts
│   │   └── validators.ts
│   ├── workers/          # Background jobs
│   │   ├── daily-prayer.worker.ts
│   │   └── risk-alert.worker.ts
│   └── index.ts          # Entry point
├── tests/                # Tests
├── .env.local            # Local env vars
├── tsconfig.json         # TypeScript config
└── package.json          # Dependencies
```

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run locally
npm run dev

# Run tests
npm run test

# Build for production
npm run build
```

## 🔧 Key Services

### AI Service (OpenAI Integration)
```typescript
// Handles:
- Chat completions
- Emotion detection
- Risk assessment
- Prompt selection
```

### WhatsApp Service (Meta API)
```typescript
// Handles:
- Message webhook validation
- Send messages
- User onboarding
- Media handling
```

### User Service (Database)
```typescript
// Handles:
- User CRUD
- Profile management
- Preference storage
- Memory/history
```

### Prayer Service
```typescript
// Handles:
- Rosario guidance
- Prayer tracking
- Daily prayers
- Intent collection
```

## 📊 API Endpoints (Backend)

```
POST   /api/v1/webhooks/whatsapp
       Body: { object, entry[] }
       Purpose: Receive WhatsApp messages

GET    /api/v1/users/:id
       Auth: JWT token
       Purpose: Get user profile

PUT    /api/v1/users/:id
       Auth: JWT token
       Body: { name, province, parrocchia, ... }
       Purpose: Update profile

POST   /api/v1/messages
       Auth: JWT token
       Body: { content, type: 'text'|'audio' }
       Purpose: Send/receive messages (internal)

POST   /api/v1/prayers/rosario
       Auth: JWT token
       Body: { mystery, intention }
       Purpose: Start guided rosary

GET    /api/v1/prayers/:id
       Auth: JWT token
       Purpose: Get prayer details

POST   /api/v1/alerts
       Auth: Admin token
       Body: { user_id, type, severity }
       Purpose: Create alert

GET    /api/v1/admin/dashboard
       Auth: Admin token
       Purpose: Dashboard data
```

## 🔐 Authentication

- **Public endpoints**: Webhook (signature verified)
- **User endpoints**: JWT token (from WhatsApp phone verification)
- **Admin endpoints**: Admin JWT token (strong credentials)

## ⚙️ Environment Variables

See `.env.example` for full list.

Key ones for backend:
```
SUPABASE_URL
SUPABASE_SERVICE_ROLE_KEY
OPENAI_API_KEY
WHATSAPP_ACCESS_TOKEN
WHATSAPP_WEBHOOK_VERIFY_TOKEN
JWT_SECRET
```

## 🧪 Testing

```bash
# Run all tests
npm run test

# Run specific test file
npm run test -- src/services/ai.service.test.ts

# Watch mode
npm run test:watch

# Coverage
npm run test:coverage
```

## 📝 Logging

Using structured logging (Winston/Pino):
```typescript
logger.info('User created', { userId, email })
logger.warn('Risk detected', { userId, risk_level })
logger.error('API error', { error, endpoint })
```

## 🚢 Deployment

```bash
# Build
npm run build

# Start production server
npm run start

# Health check endpoint
GET /health → { status: 'ok' }
```

---

**Start here for backend development!**
