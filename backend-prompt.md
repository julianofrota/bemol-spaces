# Prompt para Criação do Backend com Supabase

## Contexto do Projeto
Criar um backend para o sistema Bemol Spaces, um catálogo e sistema de reserva de espaços de mídia. O backend será implementado usando Supabase, que fornece autenticação, banco de dados PostgreSQL, storage e realtime subscriptions.

## Requisitos Técnicos

### Tecnologias
- Supabase como plataforma principal
- TypeScript para type safety
- React Query para gerenciamento de estado e cache
- Zod para validação de schemas
- React Hook Form para formulários
- TailwindCSS para estilização
- Radix UI para componentes de interface
- Framer Motion para animações

### Funcionalidades Principais
1. Autenticação de usuários
2. Gerenciamento de espaços de mídia
3. Sistema de reservas
4. Upload e gerenciamento de imagens
5. Atualizações em tempo real
6. Dashboard administrativo

## Estrutura do Banco de Dados

### Tabelas Necessárias
1. Users (gerenciada pelo Supabase Auth)
2. Profiles (dados adicionais dos usuários)
3. Spaces (espaços de mídia)
4. Stores (lojas)
5. Sectors (setores)
6. Reservations (reservas)
7. SpaceImages (imagens dos espaços)

### Relacionamentos
- Spaces -> Stores (N:1)
- Spaces -> Sectors (N:1)
- Spaces -> SpaceImages (1:N)
- Reservations -> Spaces (N:1)
- Reservations -> Users (N:1)
- Profiles -> Users (1:1)

## APIs Necessárias

### Autenticação
- POST /api/auth/register
- POST /api/auth/login
- POST /api/auth/forgot-password
- POST /api/auth/reset-password

### Espaços
- GET /api/spaces
- GET /api/spaces/:id
- POST /api/spaces (admin)
- PUT /api/spaces/:id (admin)
- DELETE /api/spaces/:id (admin)

### Reservas
- GET /api/reservations
- GET /api/reservations/:id
- POST /api/reservations
- PUT /api/reservations/:id
- DELETE /api/reservations/:id

### Imagens
- POST /api/spaces/:id/images
- DELETE /api/spaces/:id/images/:imageId

## Segurança

### Políticas de Acesso (RLS)
1. Profiles
   - Usuários podem ver seus próprios perfis
   - Usuários podem atualizar seus próprios perfis

2. Spaces
   - Qualquer um pode ver espaços
   - Apenas admins podem criar/editar espaços

3. Reservations
   - Usuários podem ver suas próprias reservas
   - Usuários podem criar reservas

4. SpaceImages
   - Qualquer um pode ver imagens
   - Apenas admins podem fazer upload/remover imagens

## Realtime Subscriptions
- Atualizações de status de espaços
- Novas reservas
- Mudanças em reservas existentes

## Instruções para Implementação

1. Criar projeto no Supabase
   - Criar nova conta/projeto
   - Configurar variáveis de ambiente
   - Habilitar autenticação por email

2. Configurar Banco de Dados
   - Executar scripts SQL para criar tabelas
   - Configurar políticas de segurança (RLS)
   - Criar índices para otimização

3. Configurar Storage
   - Criar bucket para imagens
   - Configurar políticas de acesso
   - Testar upload de arquivos

4. Implementar Autenticação
   - Configurar provedores de autenticação
   - Implementar fluxos de login/registro
   - Criar hooks personalizados

5. Implementar APIs
   - Criar queries e mutations
   - Implementar validações
   - Adicionar tratamento de erros

6. Configurar Realtime
   - Habilitar realtime para tabelas
   - Implementar subscriptions
   - Testar atualizações em tempo real

7. Testes e Qualidade
   - Implementar testes unitários
   - Testar integração com frontend
   - Verificar segurança e performance

## Variáveis de Ambiente Necessárias
```env
VITE_SUPABASE_URL=sua-url-do-supabase
VITE_SUPABASE_ANON_KEY=sua-chave-anonima-do-supabase
```

## Scripts SQL para Configuração Inicial
[Incluir os scripts SQL do arquivo supabase-guide.md]

## Exemplos de Código
[Incluir os exemplos de código do arquivo supabase-guide.md]

## Checklist de Implementação
[Incluir o checklist do arquivo supabase-guide.md]

## Observações Adicionais
- Manter documentação atualizada
- Seguir boas práticas de segurança
- Implementar logging e monitoramento
- Considerar escalabilidade
- Manter backups regulares
- Implementar CI/CD 