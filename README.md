# FinPlan — Meu Norte (front-end)

Front-end do planejador financeiro pessoal. Next.js 16 (App Router), React 19 e
TypeScript, com Tailwind CSS 4, React Query, react-hook-form + zod e recharts.

## Como rodar

Pré-requisito: o back-end ([fin-back](https://github.com/HENR1QUEF0NSECA/fin-back))
rodando em `http://localhost:8080`.

```bash
npm ci
npm run dev
```

Abra http://localhost:3000.

Variáveis de ambiente opcionais (em `.env.local`):

| Variável | Padrão | Para quê |
|---|---|---|
| `BACKEND_URL` | `http://localhost:8080/api` | Endereço da API Spring |
| `SESSION_COOKIE_NAME` | `finplan_session` | Nome do cookie de sessão |

Scripts: `npm run dev`, `npm run build`, `npm run start` e `npm run lint`.

## Como funciona

O navegador nunca chama o Spring direto. Rotas do próprio Next (`src/app/api`)
fazem o meio de campo:

- `/api/auth/login` e `/api/auth/register` chamam o back. O login guarda o JWT
  num cookie `httpOnly`.
- `/api/auth/logout` apaga o cookie. `/api/auth/expired` apaga o cookie e manda
  para o login quando a sessão não vale mais.
- `/api/backend/<caminho>` repassa qualquer chamada para `BACKEND_URL`, com
  `Authorization: Bearer <token do cookie>`.

`src/proxy.ts` (o antigo `middleware.ts`) manda para `/login` quem abre uma página
interna sem cookie, e para `/painel` quem abre o login ou o registro já logado.

Telas: `/painel`, `/transacoes`, `/relatorios` e `/orcamentos` (em `src/app/(app)`),
além de `/login` e `/registro` (em `src/app/(auth)`).

## Estrutura

```
src/
  app/         rotas: páginas e route handlers
  components/  componentes genéricos (ui/) e de layout (layout/)
  features/    uma pasta por funcionalidade: services (API), hooks (React Query),
               schemas (zod) e components
  lib/         utilitários: fetch, sessão, formatação
  providers/   tema, React Query e modo privado
```
