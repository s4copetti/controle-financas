# FinanceWallet 

Aplicação web full-stack de controle de finanças pessoais, desenvolvida como projeto final da disciplina de Desenvolvimento Web. O objetivo do trabalho é aplicar, na prática, os conceitos de arquitetura moderna do **Next.js (App Router)**, integrando frontend e backend em um único projeto, com autenticação e persistência de dados em nuvem via **Supabase**.

**🔗 Aplicação publicada:** [controle-financas.vercel.app](https://controle-financas-amber.vercel.app/login)

---

## Sobre o projeto

O FinanceWallet permite que cada usuário controle suas receitas e despesas de forma simples e visual: cadastrar transações, categorizá-las, visualizar o saldo atualizado em tempo real e acompanhar a distribuição dos gastos por categoria através de um gráfico.

Não há tela de cadastro: os usuários são criados previamente no painel do Supabase, e cada um enxerga **apenas as próprias transações**, graças às políticas de segurança em nível de linha (Row Level Security) configuradas no banco de dados.

---

## Funcionalidades

-  **Autenticação** com e-mail e senha (Supabase Auth)
-  **Dados isolados por usuário**, garantidos por Row Level Security no PostgreSQL
-  **Dashboard** com saldo atual, total de receitas e total de despesas
-  **Categorização** das transações (Alimentação, Transporte, Moradia, Saúde, Lazer, Compras, Salário, Investimentos, Outros)
-  **Gráfico de despesas por categoria** (donut chart em SVG, sem dependências externas)
-  **Histórico de transações** com diferenciação visual (cores e ícones) entre receitas e despesas
-  **Busca e filtros** no histórico (por descrição, tipo e categoria)
-  **Edição e exclusão** de transações, com modal de confirmação customizado
-  **Feedback visual** (toasts) após criar, editar ou excluir uma transação
-  **Design responsivo**, adaptado para desktop e mobile

---

## Tecnologias utilizadas

| Tecnologia                                     | Função no projeto |
|
| [Next.js 16](https://nextjs.org/) (App Router) | Framework principal: rotas, Server/Client Components e Server Actions |
| [React](https://react.dev/)                    | Biblioteca de interface |
| [TypeScript](https://www.typescriptlang.org/)  | Tipagem estática |
| [Tailwind CSS](https://tailwindcss.com/)       | Estilização utilitária |
| [Supabase](https://supabase.com/)              | Backend: banco PostgreSQL + autenticação |
| [Vercel](https://vercel.com/)                  | Hospedagem e deploy contínuo |
| `next/font/google`                             | Fontes otimizadas (Playfair Display e Lora) |

---

## Arquitetura e conceitos aplicados

O projeto foi construído para demonstrar, na prática, a divisão entre **Server Components**, **Client Components** e **Server Actions**, conforme o foco da disciplina:

- **Server Components** (padrão): usados nas páginas que buscam dados diretamente no banco, como o Dashboard e o Gráfico de despesas. O HTML já chega pronto ao navegador, sem exigir JavaScript para exibir os dados.
- **Client Components** (`"use client"`): usados onde há interatividade, como o histórico com filtros (`HistoricoTransacoes`), o modal de exclusão (`CardTransacao`), o campo de senha com mostrar/ocultar (`PasswordInput`) e o toast de feedback (`SuccessToast`).
- **Server Actions** (`"use server"`): funções que rodam exclusivamente no servidor e são chamadas diretamente por formulários ou eventos, sem a necessidade de criar rotas de API tradicionais. Usadas para login, logout, e para criar, atualizar e excluir transações.
- **Proxy** (`proxy.ts`): intercepta toda requisição antes de chegar às páginas, redirecionando usuários não autenticados para `/login` e usuários já autenticados para `/dashboard`.

### Segurança dos dados

A separação de dados entre usuários acontece em duas camadas:

1. **Row Level Security (RLS)** no PostgreSQL: cada linha da tabela `transacoes` só pode ser lida, criada, atualizada ou excluída pelo usuário dono daquele registro (`auth.uid() = user_id`).
2. **Grants de acesso**: permissões explícitas (`SELECT`, `INSERT`, `UPDATE`, `DELETE`) concedidas apenas a usuários autenticados (`authenticated`).

---

## Estrutura de pastas

```
controle-financas/
├── app/
│   ├── actions/
│   │   └── transacoes.ts               # Server Actions: criar, editar e excluir transações
│   ├── components/
│   │   ├── PasswordInput.tsx           # Campo de senha reutilizável (mostrar/ocultar)
│   │   └── SuccessToast.tsx            # Notificação de sucesso após ações
│   ├── dashboard/
│   │   ├── components/
│   │   │   ├── CardTransacao.tsx       # Card de cada transação no histórico
│   │   │   ├── GraficoDespesas.tsx     # Gráfico donut de despesas por categoria
│   │   │   └── HistoricoTransacoes.tsx # Lista com busca e filtros
│   │   ├── editar-transacao/[id]/
│   │   │   └── page.tsx                # Tela de edição de transação
│   │   ├── nova-transacao/
│   │   │   └── page.tsx                # Tela de nova transação
│   │   └── page.tsx                    # Dashboard principal
│   ├── login/
│   │   ├── actions.ts                  # Server Actions de login e logout
│   │   └── page.tsx                    # Tela de login
│   ├── icon.svg                        # Favicon
│   ├── layout.tsx
│   └── page.tsx                        # Redireciona para /dashboard
├── lib/
│   ├── categorias.ts                   # Lista de categorias disponíveis
│   └── supabase/
│       └── server.ts                   # Cliente Supabase para uso no servidor
├── proxy.ts                            # Proteção de rotas (redireciona não autenticados)
└── .env.local                          # Variáveis de ambiente (não versionado)
```

---

## Como rodar o projeto localmente

### Pré-requisitos

- [Node.js](https://nodejs.org/) (versão LTS)
- Uma conta no [Supabase](https://supabase.com/) com um projeto criado

### Passo a passo

1. **Clone o repositório**
   ```bash
   git clone https://github.com/s4copetti/controle-financas.git
   cd controle-financas
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente**

   Crie um arquivo `.env.local` na raiz do projeto:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-publica-aqui
   ```

4. **Configure o banco de dados**

   No SQL Editor do Supabase, execute:
   ```sql
   create table transacoes (
     id uuid default gen_random_uuid() primary key,
     user_id uuid not null references auth.users(id) default auth.uid(),
     descricao text not null,
     valor numeric not null check (valor > 0),
     tipo text not null check (tipo in ('receita', 'despesa')),
     categoria text not null default 'outros',
     criado_em timestamp with time zone default now()
   );

   alter table transacoes enable row level security;

   create policy "ver apenas as proprias transacoes"
     on transacoes for select to authenticated
     using (auth.uid() = user_id);

   create policy "inserir apenas para si mesmo"
     on transacoes for insert to authenticated
     with check (auth.uid() = user_id);

   create policy "atualizar apenas as proprias transacoes"
     on transacoes for update to authenticated
     using (auth.uid() = user_id) with check (auth.uid() = user_id);

   create policy "excluir apenas as proprias transacoes"
     on transacoes for delete to authenticated
     using (auth.uid() = user_id);

   grant select, insert, update, delete on public.transacoes to authenticated;
   ```

5. **Crie os usuários**

   No painel do Supabase, em **Authentication → Users → Add user**, crie os usuários que irão acessar o sistema (marcando a opção *Auto Confirm User*). Não há tela de cadastro público.

6. **Rode o servidor de desenvolvimento**
   ```bash
   npm run dev
   ```

   Acesse [http://localhost:3000](http://localhost:3000).

---

## Deploy

O deploy é feito na [Vercel](https://vercel.com/), com integração contínua a partir do repositório no GitHub. As variáveis de ambiente (`NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY`) são configuradas diretamente no painel do projeto na Vercel.

---

## Autores

Amanda Pauletto
Sabrina Copetti
Tanise Müller

Trabalho final da disciplina de Desenvolvimento Web
