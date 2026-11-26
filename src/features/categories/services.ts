import { apiFetch } from "@/lib/api-fetch";
import { API_ROUTES } from "@/lib/api-routes";

import type { Category } from "./types";

export function listCategories(): Promise<Category[]> {
  return apiFetch<Category[]>(API_ROUTES.categories.list);
}
