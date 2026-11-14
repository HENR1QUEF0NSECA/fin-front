# FinPlan — Meu Norte (front-end)

Front-end do planejador financeiro pessoal. Next.js 16 (App Router), React 19 e
TypeScript, com Tailwind CSS 4, React Query, react-hook-form + zod e recharts.

## Como rodar o projeto

O sistema tem duas partes, cada uma num repositório:

- **[fin-back](https://github.com/HENR1QUEF0NSECA/fin-back)**: a API em Spring Boot e o banco
  PostgreSQL, que sobem juntos pelo Docker
- **[fin-front](https://github.com/HENR1QUEF0NSECA/fin-front)** (este): a interface em Next.js

O front depende da API, então os dois precisam estar rodando.

### O que precisa estar instalado

- [Git](https://git-scm.com/downloads)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/), aberto e rodando
- [Node.js](https://nodejs.org/) 20.9 ou mais novo (a versão LTS serve)

Não precisa instalar Java nem PostgreSQL: os dois rodam dentro do Docker.

### Passo a passo

Os comandos funcionam no PowerShell, no Git Bash, no macOS e no Linux.

**1. Clone os dois repositórios na mesma pasta**

```bash
git clone https://github.com/HENR1QUEF0NSECA/fin-back.git
git clone https://github.com/HENR1QUEF0NSECA/fin-front.git
```

**2. Suba a API e o banco**

```bash
cd fin-back
cp .env.example .env
docker compose up -d --build
```

O `.env` guarda a senha do banco e o segredo do JWT. Os valores de exemplo já
funcionam para rodar localmente; só precisam ser trocados num deploy de verdade.
(No Prompt de Comando do Windows, use `copy` no lugar de `cp`.)

Na primeira vez o Docker leva alguns minutos para baixar as imagens e compilar a
API. Para conferir se ela subiu, abra http://localhost:8080/api/categorias no
navegador: deve aparecer `{"status":401,"erro":"Token não fornecido",...}`. Esse
401 é o esperado, porque a rota exige login.

**3. Suba o front**

No mesmo terminal:

```bash
cd ../fin-front
npm ci
npm run dev
```

**4. Use o sistema**

Abra http://localhost:3000, clique em **Criar conta**, cadastre-se e entre. As
categorias (Transporte, Lazer, Salário...) já vêm prontas, então dá para lançar
receitas e despesas, criar orçamentos e ver o painel na hora.

### Para parar

- Front: `Ctrl+C` no terminal do `npm run dev`
- API e banco: `docker compose down` dentro da pasta `fin-back` (os dados ficam
  guardados para a próxima vez)

### Se algo der errado

| Problema | Solução |
|---|---|
| `docker` não é reconhecido, ou erro ao conectar no Docker | Abra o Docker Desktop e espere ele indicar que está rodando |
| Erro de porta na 5432 (`port is already allocated` ou `ports are not available`) | Já existe um PostgreSQL usando essa porta no seu computador. No `fin-back/.env`, troque para `POSTGRES_PORT=5433` e rode `docker compose up -d` de novo |
| Erro de porta na 8080 | Feche o programa que está usando a 8080 e rode `docker compose up -d` de novo |
| No PowerShell: `npm.ps1 não pode ser carregado` | Use `npm.cmd ci` e `npm.cmd run dev`, ou rode os comandos no Git Bash ou no Prompt de Comando |
| O front abriu em outra porta (3001...) | A 3000 estava ocupada; use o endereço que o `npm run dev` mostrar |
| Erro ao entrar ou cadastrar | Confira se a API subiu (passo 2). Os logs dela aparecem com `docker compose logs app`, dentro de `fin-back` |

Mais detalhes sobre a API, inclusive como rodá-la sem Docker, no
[README do fin-back](https://github.com/HENR1QUEF0NSECA/fin-back#readme).

### Variáveis de ambiente (opcionais)

Ficam em `.env.local`, na raiz do front. Sem ele, valem os padrões abaixo:

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
