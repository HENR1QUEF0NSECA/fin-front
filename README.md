# FinPlan — Interface (fin-front)

Interface do planejador financeiro pessoal, feita em Next.js 16 e React 19. Ela usa a API do [fin-back](https://github.com/HENR1QUEF0NSECA/fin-back), que precisa estar rodando antes.

## Como rodar o projeto

### O que precisa estar instalado

- [Git](https://git-scm.com/downloads)
- [Node.js](https://nodejs.org/) 20.9 ou mais novo (a versão LTS serve). O `npm` já vem junto.
- A API do fin-back rodando em `http://localhost:8080`. Siga o [README do fin-back](https://github.com/HENR1QUEF0NSECA/fin-back#readme) primeiro.

### Passo a passo

Os comandos funcionam no PowerShell, no Git Bash, no macOS e no Linux.

**1. Clone o repositório**

```bash
git clone https://github.com/HENR1QUEF0NSECA/fin-front.git
cd fin-front
```

**2. Instale as dependências**

```bash
npm ci
```

O `npm ci` baixa as dependências do front (Next.js, React...) para a pasta `node_modules`, nas versões exatas do `package-lock.json`. Na primeira vez é preciso internet e leva alguns minutos. Ele só precisa rodar de novo quando o `package-lock.json` mudar.

**3. Suba o front**

```bash
npm run dev
```

**4. Use o sistema**

Abra http://localhost:3000, clique em **Criar conta**, cadastre-se e entre. As categorias (Transporte, Lazer, Salário...) já vêm prontas, então dá para lançar receitas e despesas, criar orçamentos e ver o painel na hora.

### Parar e rodar de novo

| Para | Comando (dentro da pasta `fin-front`) |
|---|---|
| Parar o front | `Ctrl+C` no terminal do `npm run dev` |
| Rodar de novo | `npm run dev` |
| Atualizar depois de um `git pull` | `npm ci` e depois `npm run dev` |

### Se algo der errado

| Problema | Solução |
|---|---|
| No PowerShell: `npm.ps1 não pode ser carregado` | Use `npm.cmd ci` e `npm.cmd run dev`, ou rode os comandos no Git Bash ou no Prompt de Comando |
| `npm run dev` mostra `You are using Node.js ...` e para | O Node.js é antigo: instale o 20.9 ou mais novo e abra um terminal novo |
| O front abriu em outra porta (3001...) | A 3000 estava ocupada; use o endereço que o `npm run dev` mostrar |
| Erro ao entrar ou cadastrar | A API não está rodando: confira o passo 4 do [README do fin-back](https://github.com/HENR1QUEF0NSECA/fin-back#readme) |

## Configuração (opcional)

O front procura a API em `http://localhost:8080/api`. Para usar outro endereço, crie um arquivo `.env.local` na pasta `fin-front`:

```env
BACKEND_URL=http://localhost:8080/api
```
