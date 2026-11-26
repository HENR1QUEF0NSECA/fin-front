export const API_ROUTES = {
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
    update: (id: number) => `/transacoes/${id}`,
    delete: (id: number) => `/transacoes/${id}`,
  },
  dashboard: {
    resumo: "/transacoes/dashboard/resumo",
    evolucao: "/transacoes/dashboard/evolucao",
  },
  budgets: {
    list: "/orcamentos",
    create: "/orcamentos",
    update: (id: number) => `/orcamentos/${id}`,
    delete: (id: number) => `/orcamentos/${id}`,
  },
  investments: {
    list: "/investimentos",
    create: "/investimentos",
    delete: (id: number) => `/investimentos/${id}`,
  },
} as const;
