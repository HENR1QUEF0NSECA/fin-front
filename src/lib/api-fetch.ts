import { clearToken, getToken } from "./auth-token";

const API_URL = (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api").replace(/\/$/, "");

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

type ApiFetchOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: unknown;
  searchParams?: Record<string, string | number>;
};

type ErroDaApi = {
  erro?: string;
  campos?: Record<string, string>;
};

function mensagemDeErro(data: ErroDaApi | null): string {
  if (data?.campos) return Object.values(data.campos).join(". ");
  return data?.erro ?? "Não foi possível concluir a operação.";
}

export async function apiFetch<T>(path: string, options: ApiFetchOptions = {}): Promise<T> {
  const { method = "GET", body, searchParams } = options;

  const url = new URL(API_URL + path);
  for (const [key, value] of Object.entries(searchParams ?? {})) {
    url.searchParams.set(key, String(value));
  }

  const headers: Record<string, string> = { Accept: "application/json" };
  if (body !== undefined) headers["Content-Type"] = "application/json";
  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;

  let res: Response;
  try {
    res = await fetch(url, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new ApiError(0, "Não foi possível conectar à API. Confira se o back está rodando.");
  }

  const isJson = res.headers.get("content-type")?.includes("application/json") ?? false;
  const data = isJson ? await res.json() : null;

  if (!res.ok) {
    if (res.status === 401 && token) {
      clearToken();
      window.location.assign("/login");
    }
    throw new ApiError(res.status, mensagemDeErro(data));
  }

  return data as T;
}
