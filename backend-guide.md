# Guia de Implementação do Backend - Bemol Spaces

Este documento fornece um guia detalhado para implementar o backend do sistema Bemol Spaces.

## 🏗️ Arquitetura Proposta

### Tecnologias Recomendadas
- Node.js + Express.js
- TypeScript
- PostgreSQL (ou MongoDB)
- Prisma (ORM)
- JWT para autenticação
- Jest para testes
- Docker para containerização

## 📊 Estrutura do Banco de Dados

### Tabelas Principais

#### Users
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('admin', 'user') DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### Spaces
```sql
CREATE TABLE spaces (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  type VARCHAR(50) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  store_id UUID REFERENCES stores(id),
  sector_id UUID REFERENCES sectors(id),
  status ENUM('available', 'unavailable', 'high-demand') DEFAULT 'available',
  exposure_potential INTEGER NOT NULL,
  occupancy_rate INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### Stores
```sql
CREATE TABLE stores (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  address TEXT NOT NULL,
  city VARCHAR(100) NOT NULL,
  state VARCHAR(2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### Sectors
```sql
CREATE TABLE sectors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### Reservations
```sql
CREATE TABLE reservations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  space_id UUID REFERENCES spaces(id),
  user_id UUID REFERENCES users(id),
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  status ENUM('pending', 'confirmed', 'cancelled', 'completed') DEFAULT 'pending',
  total_price DECIMAL(10,2) NOT NULL,
  payment_status ENUM('pending', 'paid', 'refunded') DEFAULT 'pending',
  company_name VARCHAR(255),
  contact_name VARCHAR(255),
  contact_email VARCHAR(255),
  contact_phone VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### SpaceImages
```sql
CREATE TABLE space_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  space_id UUID REFERENCES spaces(id),
  url VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🔐 Autenticação e Autorização

### JWT Implementation
```typescript
interface JWTPayload {
  userId: string;
  email: string;
  role: 'admin' | 'user';
}

// Middleware de autenticação
const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Token não fornecido' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET) as JWTPayload;
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido' });
  }
};
```

## 🌐 APIs Endpoints

### Autenticação
```typescript
// POST /api/auth/register
interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

// POST /api/auth/login
interface LoginRequest {
  email: string;
  password: string;
}

// POST /api/auth/forgot-password
interface ForgotPasswordRequest {
  email: string;
}
```

### Espaços
```typescript
// GET /api/spaces
interface GetSpacesQuery {
  search?: string;
  type?: string;
  city?: string;
  sector?: string;
  store?: string;
  minPrice?: number;
  maxPrice?: number;
  status?: string;
}

// GET /api/spaces/:id
// POST /api/spaces (admin only)
// PUT /api/spaces/:id (admin only)
// DELETE /api/spaces/:id (admin only)
```

### Reservas
```typescript
// GET /api/reservations
// GET /api/reservations/:id
// POST /api/reservations
interface CreateReservationRequest {
  spaceId: string;
  startDate: string;
  endDate: string;
  companyName: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
}

// DELETE /api/reservations/:id
```

## 🛠️ Estrutura do Projeto Backend

```
backend/
├── src/
│   ├── config/           # Configurações
│   ├── controllers/      # Controladores
│   ├── middlewares/      # Middlewares
│   ├── models/          # Modelos
│   ├── routes/          # Rotas
│   ├── services/        # Serviços
│   ├── utils/           # Utilitários
│   └── validators/      # Validações
├── prisma/              # Schema do Prisma
├── tests/               # Testes
├── .env                 # Variáveis de ambiente
└── package.json
```

## 🔧 Configuração do Ambiente

### Variáveis de Ambiente (.env)
```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/bemol_spaces"

# JWT
JWT_SECRET="your-secret-key"
JWT_EXPIRES_IN="24h"

# Server
PORT=3000
NODE_ENV="development"

# AWS S3 (para imagens)
AWS_ACCESS_KEY_ID="your-access-key"
AWS_SECRET_ACCESS_KEY="your-secret-key"
AWS_BUCKET_NAME="your-bucket-name"
AWS_REGION="your-region"
```

## 🧪 Testes

### Estrutura de Testes
```typescript
// Exemplo de teste de integração
describe('Spaces API', () => {
  it('should list all spaces', async () => {
    const response = await request(app)
      .get('/api/spaces')
      .set('Authorization', `Bearer ${token}`);
    
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
```

## 📦 Scripts Disponíveis

```json
{
  "scripts": {
    "dev": "ts-node-dev --respawn --transpile-only src/server.ts",
    "build": "tsc",
    "start": "node dist/server.js",
    "test": "jest",
    "prisma:generate": "prisma generate",
    "prisma:migrate": "prisma migrate dev",
    "prisma:studio": "prisma studio"
  }
}
```

## 🔒 Segurança

1. **Autenticação**
   - JWT com refresh tokens
   - Senhas hasheadas com bcrypt
   - Rate limiting nas rotas de autenticação

2. **Autorização**
   - Middleware de verificação de roles
   - Proteção de rotas admin
   - Validação de permissões

3. **Validação**
   - Zod para validação de schemas
   - Sanitização de inputs
   - Proteção contra SQL injection

4. **CORS**
   - Configuração específica para o frontend
   - Métodos HTTP permitidos
   - Headers permitidos

## 🚀 Deploy

### Docker
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

### Docker Compose
```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://user:password@db:5432/bemol_spaces
    depends_on:
      - db

  db:
    image: postgres:14-alpine
    environment:
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password
      - POSTGRES_DB=bemol_spaces
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

## 📝 Documentação da API

Recomenda-se usar Swagger/OpenAPI para documentar as APIs:

```typescript
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Bemol Spaces API',
      version: '1.0.0',
      description: 'API para o sistema de catálogo e reserva de espaços de mídia',
    },
  },
  apis: ['./src/routes/*.ts'],
};

const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
```

## 🔄 CI/CD

### GitHub Actions
```yaml
name: CI/CD

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm test
      - run: npm run build
```

## 📈 Monitoramento

1. **Logs**
   - Winston para logging
   - Rotação de logs
   - Níveis de log configuráveis

2. **Métricas**
   - Prometheus para métricas
   - Grafana para visualização
   - Alertas configuráveis

3. **Tracing**
   - OpenTelemetry
   - Jaeger para visualização
   - Correlação de IDs

## 🔍 Checklist de Implementação

1. [ ] Configurar ambiente de desenvolvimento
2. [ ] Implementar estrutura do banco de dados
3. [ ] Configurar autenticação JWT
4. [ ] Implementar endpoints da API
5. [ ] Adicionar validações
6. [ ] Implementar testes
7. [ ] Configurar CI/CD
8. [ ] Implementar monitoramento
9. [ ] Documentar API
10. [ ] Configurar ambiente de produção
11. [ ] Realizar testes de integração com o frontend
12. [ ] Fazer deploy 