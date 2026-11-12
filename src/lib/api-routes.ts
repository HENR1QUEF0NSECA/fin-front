/**
 * Rotas do backend Spring Boot. Todas relativas a BACKEND_URL (http://localhost:8080/api).
 * Confirmadas pelo backend em 2026-06-10.
 */
export const BACKEND_ROUTES = {
  auth: {
    login: "/auth/login",
    register: "/users/register",
  },
  users: {
    me: "/users/me",
  },
  categories: {
    list: "/categoria",
  },
  // Os filtros por tipo, mês, período e categoria são feitos no navegador sobre a
  // lista completa, então só as rotas abaixo são usadas.
  transactions: {
    list: "/transaction",
    create: "/transaction",
    delete: (id: string | number) => `/transaction/${id}`,
  },
  dashboard: {
    resumo: "/transaction/dashboard/resumo",
    evolucao: "/transaction/dashboard/evolucao",
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
