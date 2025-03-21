# Guia de Configuração do GitHub para Bemol Spaces

## 1. Configuração Inicial do Git

### Criar arquivo .gitignore
```gitignore
# Dependencies
node_modules
.pnp
.pnp.js

# Testing
coverage

# Production
dist
build

# Environment Variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

# Supabase
.supabase
```

### Inicializar o repositório
```bash
# Inicializar o Git
git init

# Adicionar arquivos
git add .

# Criar primeiro commit
git commit -m "Initial commit"
```

## 2. Configuração do GitHub

### Criar novo repositório
1. Acessar https://github.com/new
2. Nome do repositório: `bemol-spaces`
3. Descrição: "Sistema de catálogo e reserva de espaços de mídia"
4. Visibilidade: Privado
5. Inicializar com:
   - README.md
   - .gitignore (TypeScript)
   - Licença (MIT)

### Configurar branch principal
```bash
# Renomear branch principal para main
git branch -M main

# Adicionar repositório remoto
git remote add origin https://github.com/seu-usuario/bemol-spaces.git

# Enviar código
git push -u origin main
```

## 3. Configuração de Segurança

### Secrets do GitHub
Configurar os seguintes secrets no GitHub (Settings > Secrets and variables > Actions):

```env
SUPABASE_URL=sua-url-do-supabase
SUPABASE_ANON_KEY=sua-chave-anonima-do-supabase
SUPABASE_SERVICE_ROLE_KEY=sua-chave-de-servico-do-supabase
```

### Proteção de Branches
1. Ir para Settings > Branches
2. Adicionar regra para branch `main`:
   - Require pull request reviews before merging
   - Require status checks to pass before merging
   - Require branches to be up to date before merging
   - Include administrators

## 4. Configuração do CI/CD

### GitHub Actions
Criar arquivo `.github/workflows/ci.yml`:

```yaml
name: CI

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '18'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Type check
      run: npm run type-check
      
    - name: Lint
      run: npm run lint
      
    - name: Test
      run: npm test
      
    - name: Build
      run: npm run build
      env:
        VITE_SUPABASE_URL: ${{ secrets.SUPABASE_URL }}
        VITE_SUPABASE_ANON_KEY: ${{ secrets.SUPABASE_ANON_KEY }}
```

## 5. Estrutura de Branches

### Convenção de Nomes
- `main`: Branch principal
- `develop`: Branch de desenvolvimento
- `feature/*`: Novas funcionalidades
- `bugfix/*`: Correções de bugs
- `hotfix/*`: Correções urgentes em produção

### Workflow de Desenvolvimento
1. Criar branch a partir de `develop`:
```bash
git checkout develop
git pull origin develop
git checkout -b feature/nova-funcionalidade
```

2. Desenvolver e commitar:
```bash
git add .
git commit -m "feat: adiciona nova funcionalidade"
```

3. Enviar para o GitHub:
```bash
git push origin feature/nova-funcionalidade
```

4. Criar Pull Request para `develop`

## 6. Convenções de Commits

### Formato
```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

### Tipos
- `feat`: Nova funcionalidade
- `fix`: Correção de bug
- `docs`: Documentação
- `style`: Formatação
- `refactor`: Refatoração
- `test`: Testes
- `chore`: Manutenção

### Exemplo
```bash
git commit -m "feat(auth): adiciona login com Google

- Implementa autenticação OAuth
- Adiciona botão de login
- Atualiza documentação"
```

## 7. Documentação

### README.md
Atualizar o README.md com:

```markdown
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
```

## 8. Checklist de Configuração

1. [ ] Criar repositório no GitHub
2. [ ] Configurar .gitignore
3. [ ] Inicializar Git localmente
4. [ ] Configurar secrets no GitHub
5. [ ] Configurar proteção de branches
6. [ ] Configurar GitHub Actions
7. [ ] Atualizar README.md
8. [ ] Fazer primeiro push
9. [ ] Configurar branch develop
10. [ ] Testar workflow de desenvolvimento 