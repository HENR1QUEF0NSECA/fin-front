/**
 * Rotas do backend Spring Boot. Todas relativas a BACKEND_URL (http://localhost:8080/api).
 * Padrão do backend: português, plural, e o usuário sempre vem do token.
 */
export const BACKEND_ROUTES = {
  auth: {
    login: "/auth/login",
    register: "/auth/registro",
  },
  users: {
    me: "/usuarios/me",
  },
  categories: {
    list: "/categorias",
  },
  // Os filtros por tipo, mês, período e categoria são feitos no navegador sobre a
  // lista completa, então só as rotas abaixo são usadas.
  transactions: {
    list: "/transacoes",
    create: "/transacoes",
    delete: (id: string | number) => `/transacoes/${id}`,
  },
  dashboard: {
    resumo: "/transacoes/dashboard/resumo",
    evolucao: "/transacoes/dashboard/evolucao",
  },
  budgets: {
    list: "/orcamentos",
    create: "/orcamentos",
    delete: (id: string | number) => `/orcamentos/${id}`,
  },
} as const;

/**
 * Rotas do BFF (Route Handlers do próprio Next). Same-origin a partir do browser.
 */
export const BFF_ROUTES = {
  auth: {
    login: "/api/auth/login",
    register: "/api/auth/register",
    logout: "/api/auth/logout",
  },
  backend: (path: string) => `/api/backend/${path.replace(/^\//, "")}`,
} as const;
