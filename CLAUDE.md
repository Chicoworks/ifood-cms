# ifood-cms

CMS interno do iFood. Plataforma para gerenciamento de conteúdo, analytics e experimentos.

## Stack

- **Framework**: Next.js 15 (App Router) com React 19
- **Linguagem**: TypeScript (strict mode)
- **Backend**: Supabase (auth, database, migrations)
- **Animações**: GSAP
- **Porta dev**: 3000 (dev) / 3001 (start)

## Estrutura do Projeto

```
app/           → Rotas e páginas (App Router)
components/    → Componentes reutilizáveis
lib/           → Utilitários e clients (supabase, google-auth)
types/         → Tipos TypeScript (database.ts)
supabase/      → Migrations do banco de dados
public/        → Assets estáticos
```

## Convenções

### Código
- Path alias: `@/*` mapeia para a raiz do projeto
- Componentes em PascalCase, arquivos `.tsx`
- Hooks e utils em camelCase
- Tipos do banco em `types/database.ts`

### Git
- Branch principal: `main`
- Branches de feature: `feature/nome-da-feature`
- Branches de fix: `fix/nome-do-fix`
- Commits seguem conventional commits: `feat:`, `fix:`, `refactor:`, `docs:`, `chore:`
- Sempre criar PR para mergear em `main` — nunca push direto

### Comandos

```bash
npm run dev    # Dev server (porta 3000)
npm run build  # Build de produção
npm start      # Serve build (porta 3001)
```

## Regras para Claude

- Não modifique arquivos de migração já existentes em `supabase/migrations/` — crie novas migrations
- Use `@supabase/supabase-js` para interações com o banco
- Respeite o App Router do Next.js (server components por padrão, `"use client"` apenas quando necessário)
- Mantenha tipos atualizados em `types/database.ts` ao alterar o schema
