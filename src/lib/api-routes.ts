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
  transactions: {
    list: "/transacoes",
    create: "/transacoes",
    update: (id: string | number) => `/transacoes/${id}`,
    delete: (id: string | number) => `/transacoes/${id}`,
  },
  dashboard: {
    resumo: "/transacoes/dashboard/resumo",
    evolucao: "/transacoes/dashboard/evolucao",
  },
  budgets: {
    list: "/orcamentos",
    create: "/orcamentos",
    update: (id: string | number) => `/orcamentos/${id}`,
    delete: (id: string | number) => `/orcamentos/${id}`,
  },
} as const;

export const BFF_ROUTES = {
  auth: {
    login: "/api/auth/login",
    register: "/api/auth/register",
    logout: "/api/auth/logout",
  },
  backend: (path: string) => `/api/backend/${path.replace(/^\//, "")}`,
} as const;
