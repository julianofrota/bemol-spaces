# Bemol Spaces

Sistema de catálogo e reserva de espaços de mídia.

## 🚀 Tecnologias

- React + TypeScript
- Vite
- Supabase
- TailwindCSS
- Radix UI
- React Query
- React Hook Form + Zod
- Framer Motion

## 📋 Pré-requisitos

- Node.js 18+
- npm ou yarn
- Conta no Supabase

## 🔧 Instalação

1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/bemol-spaces.git
cd bemol-spaces
```

2. Instale as dependências
```bash
npm install
```

3. Configure as variáveis de ambiente
```bash
cp .env.example .env
```

4. Inicie o servidor de desenvolvimento
```bash
npm run dev
```

## 🌐 Estrutura do Projeto

```
src/
├── components/     # Componentes reutilizáveis
├── pages/         # Páginas da aplicação
├── services/      # Serviços de API
├── hooks/         # Custom hooks
├── contexts/      # Contextos React
├── lib/           # Utilitários e configurações
├── types/         # Definições de tipos TypeScript
└── data/          # Dados mockados para desenvolvimento
```

## 🔌 Integração com Backend

O projeto está configurado para consumir APIs RESTful. Para desenvolvimento, utiliza dados mockados, mas pode ser facilmente configurado para usar a API real.

### Configuração da API

1. Configure a URL da API no arquivo `.env`:
```env
VITE_API_URL=http://seu-backend.com/api
```

2. Endpoints disponíveis:
- `GET /spaces` - Lista todos os espaços
- `GET /spaces/:id` - Obtém detalhes de um espaço
- `GET /reservations` - Lista todas as reservas
- `POST /reservations` - Cria uma nova reserva
- `DELETE /reservations/:id` - Cancela uma reserva

### Autenticação

O sistema utiliza autenticação via JWT. O token é armazenado no localStorage e enviado automaticamente em todas as requisições.

## 🎨 Componentes Principais

### SpaceCard
Componente que exibe informações básicas de um espaço de mídia.

```typescript
interface SpaceCardProps {
  space: MediaSpace;
  onSelect: (space: MediaSpace) => void;
}
```

### SpaceDetails
Modal que exibe informações detalhadas de um espaço.

```typescript
interface SpaceDetailsProps {
  space: MediaSpace | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
```

### DashboardStats
Componente que exibe estatísticas do dashboard.

```typescript
interface DashboardStatsProps {
  totalReservations: number;
  activeReservations: number;
  totalInvestment: number;
  estimatedImpact: number;
}
```

## 🔄 Hooks Personalizados

### useSpaces
Hook para gerenciar dados de espaços e reservas.

```typescript
const {
  spaces,
  reservations,
  isLoading,
  error,
  getSpaceById,
  reserveSpace,
  cancelReservation
} = useSpaces();
```

## 📝 Scripts Disponíveis

- `npm run dev`: Inicia o servidor de desenvolvimento
- `npm run build`: Cria a build de produção
- `npm run preview`: Visualiza a build de produção
- `npm run lint`: Executa o linter
- `npm run test`: Executa os testes

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie sua Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a Branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👥 Autores

- Seu Nome - [@seu-usuario](https://github.com/seu-usuario)

## 🙏 Agradecimentos

- [Shadcn/UI](https://ui.shadcn.com/)
- [TailwindCSS](https://tailwindcss.com/)
- [React Query](https://tanstack.com/query/latest)
