# Guia de Implementação do Backend com Supabase - Bemol Spaces

Este documento fornece um guia detalhado para implementar o backend do sistema Bemol Spaces usando Supabase.

## 🏗️ Arquitetura com Supabase

### Tecnologias
- Supabase (PostgreSQL + Auth + Storage + Realtime)
- TypeScript
- Next.js API Routes (opcional, para funções serverless)
- Prisma (opcional, para type safety)

## 📊 Estrutura do Banco de Dados

### Tabelas no Supabase

#### Users (gerenciada automaticamente pelo Supabase Auth)
```sql
-- A tabela auth.users é gerenciada automaticamente pelo Supabase
-- Podemos criar uma tabela profiles para dados adicionais
create table public.profiles (
  id uuid references auth.users on delete cascade,
  name text,
  role text check (role in ('admin', 'user')) default 'user',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  primary key (id)
);

-- Habilitar RLS (Row Level Security)
alter table public.profiles enable row level security;

-- Políticas de segurança
create policy "Usuários podem ver seus próprios perfis"
  on public.profiles for select
  using ( auth.uid() = id );

create policy "Usuários podem atualizar seus próprios perfis"
  on public.profiles for update
  using ( auth.uid() = id );
```

#### Spaces
```sql
create table public.spaces (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  type text not null,
  description text,
  price decimal(10,2) not null,
  store_id uuid references public.stores(id),
  sector_id uuid references public.sectors(id),
  status text check (status in ('available', 'unavailable', 'high-demand')) default 'available',
  exposure_potential integer not null,
  occupancy_rate integer not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Políticas de segurança
alter table public.spaces enable row level security;

create policy "Qualquer um pode ver espaços"
  on public.spaces for select
  using ( true );

create policy "Apenas admins podem criar/editar espaços"
  on public.spaces for all
  using ( auth.uid() in (
    select id from public.profiles where role = 'admin'
  ));
```

#### Stores
```sql
create table public.stores (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  address text not null,
  city text not null,
  state text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Políticas de segurança
alter table public.stores enable row level security;

create policy "Qualquer um pode ver lojas"
  on public.stores for select
  using ( true );
```

#### Sectors
```sql
create table public.sectors (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  description text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Políticas de segurança
alter table public.sectors enable row level security;

create policy "Qualquer um pode ver setores"
  on public.sectors for select
  using ( true );
```

#### Reservations
```sql
create table public.reservations (
  id uuid default uuid_generate_v4() primary key,
  space_id uuid references public.spaces(id),
  user_id uuid references auth.users(id),
  start_date date not null,
  end_date date not null,
  status text check (status in ('pending', 'confirmed', 'cancelled', 'completed')) default 'pending',
  total_price decimal(10,2) not null,
  payment_status text check (payment_status in ('pending', 'paid', 'refunded')) default 'pending',
  company_name text,
  contact_name text,
  contact_email text,
  contact_phone text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Políticas de segurança
alter table public.reservations enable row level security;

create policy "Usuários podem ver suas próprias reservas"
  on public.reservations for select
  using ( auth.uid() = user_id );

create policy "Usuários podem criar reservas"
  on public.reservations for insert
  with check ( auth.uid() = user_id );
```

#### SpaceImages (usando Supabase Storage)
```sql
create table public.space_images (
  id uuid default uuid_generate_v4() primary key,
  space_id uuid references public.spaces(id),
  storage_path text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Políticas de segurança
alter table public.space_images enable row level security;

create policy "Qualquer um pode ver imagens"
  on public.space_images for select
  using ( true );
```

## 🔐 Autenticação com Supabase

### Configuração no Frontend
```typescript
// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Tipos
export type Profile = {
  id: string
  name: string
  role: 'admin' | 'user'
  created_at: string
  updated_at: string
}

// Hooks personalizados
export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)

  useEffect(() => {
    // Obter usuário atual
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
    })

    // Escutar mudanças de autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (user) {
      // Obter perfil do usuário
      supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()
        .then(({ data }) => {
          setProfile(data)
        })
    }
  }, [user])

  return { user, profile }
}
```

### Exemplo de Login
```typescript
const handleLogin = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) throw error

    // Redirecionar após login bem-sucedido
    navigate('/dashboard')
  } catch (error) {
    console.error('Erro no login:', error.message)
  }
}
```

## 🌐 APIs com Supabase

### Exemplo de Queries

#### Listar Espaços
```typescript
const getSpaces = async (filters?: {
  search?: string
  type?: string
  city?: string
  sector?: string
  store?: string
  minPrice?: number
  maxPrice?: number
  status?: string
}) => {
  let query = supabase
    .from('spaces')
    .select(`
      *,
      store:stores(*),
      sector:sectors(*),
      images:space_images(*)
    `)

  if (filters?.search) {
    query = query.ilike('name', `%${filters.search}%`)
  }

  if (filters?.type) {
    query = query.eq('type', filters.type)
  }

  if (filters?.city) {
    query = query.eq('store.city', filters.city)
  }

  if (filters?.sector) {
    query = query.eq('sector_id', filters.sector)
  }

  if (filters?.store) {
    query = query.eq('store_id', filters.store)
  }

  if (filters?.minPrice) {
    query = query.gte('price', filters.minPrice)
  }

  if (filters?.maxPrice) {
    query = query.lte('price', filters.maxPrice)
  }

  if (filters?.status) {
    query = query.eq('status', filters.status)
  }

  const { data, error } = await query

  if (error) throw error
  return data
}
```

#### Criar Reserva
```typescript
const createReservation = async (reservation: {
  spaceId: string
  startDate: string
  endDate: string
  companyName: string
  contactName: string
  contactEmail: string
  contactPhone: string
}) => {
  const { data: space } = await supabase
    .from('spaces')
    .select('price')
    .eq('id', reservation.spaceId)
    .single()

  const totalPrice = calculateTotalPrice(space.price, reservation.startDate, reservation.endDate)

  const { data, error } = await supabase
    .from('reservations')
    .insert({
      space_id: reservation.spaceId,
      start_date: reservation.startDate,
      end_date: reservation.endDate,
      total_price: totalPrice,
      company_name: reservation.companyName,
      contact_name: reservation.contactName,
      contact_email: reservation.contactEmail,
      contact_phone: reservation.contactPhone,
    })
    .select()
    .single()

  if (error) throw error
  return data
}
```

## 📦 Upload de Imagens

### Exemplo de Upload
```typescript
const uploadSpaceImage = async (spaceId: string, file: File) => {
  const fileExt = file.name.split('.').pop()
  const fileName = `${spaceId}/${Math.random()}.${fileExt}`
  const filePath = `spaces/${fileName}`

  const { error: uploadError } = await supabase.storage
    .from('spaces')
    .upload(filePath, file)

  if (uploadError) throw uploadError

  const { data: { publicUrl } } = supabase.storage
    .from('spaces')
    .getPublicUrl(filePath)

  const { data, error } = await supabase
    .from('space_images')
    .insert({
      space_id: spaceId,
      storage_path: filePath,
    })
    .select()
    .single()

  if (error) throw error
  return { ...data, url: publicUrl }
}
```

## 🔄 Realtime Subscriptions

### Exemplo de Subscription
```typescript
const subscribeToSpaceUpdates = (spaceId: string) => {
  return supabase
    .channel(`space:${spaceId}`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'spaces',
        filter: `id=eq.${spaceId}`,
      },
      (payload) => {
        console.log('Mudança recebida:', payload)
      }
    )
    .subscribe()
}
```

## 🔧 Configuração do Ambiente

### Variáveis de Ambiente (.env)
```env
VITE_SUPABASE_URL=sua-url-do-supabase
VITE_SUPABASE_ANON_KEY=sua-chave-anonima-do-supabase
```

## 🔒 Segurança

1. **Row Level Security (RLS)**
   - Políticas de segurança por tabela
   - Controle de acesso granular
   - Proteção contra acesso não autorizado

2. **Autenticação**
   - JWT gerenciado pelo Supabase
   - Refresh tokens automáticos
   - Proteção contra CSRF

3. **Storage**
   - Políticas de acesso por bucket
   - URLs assinadas
   - Proteção contra uploads maliciosos

## 📈 Monitoramento

1. **Dashboard do Supabase**
   - Métricas de uso
   - Logs de queries
   - Monitoramento de performance

2. **Logs**
   - Logs de autenticação
   - Logs de queries
   - Logs de storage

## 🔍 Checklist de Implementação

1. [ ] Criar projeto no Supabase
2. [ ] Configurar banco de dados e tabelas
3. [ ] Implementar políticas de segurança (RLS)
4. [ ] Configurar autenticação
5. [ ] Configurar storage para imagens
6. [ ] Implementar queries e mutations
7. [ ] Configurar realtime subscriptions
8. [ ] Implementar upload de imagens
9. [ ] Testar segurança e permissões
10. [ ] Configurar ambiente de produção
11. [ ] Realizar testes de integração com o frontend
12. [ ] Fazer deploy 