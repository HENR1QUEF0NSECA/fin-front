import type { Category } from "@/features/categories/types";

export function getCategoryName(
  item: { idCategoria: number; nomeCategoria?: string },
  categoriesById: Map<number, Category>,
): string {
  if (item.nomeCategoria?.trim()) return item.nomeCategoria;
  return categoriesById.get(item.idCategoria)?.nome ?? `Categoria #${item.idCategoria}`;
}

export function buildCategoryMap(categories: Category[]): Map<number, Category> {
  const map = new Map<number, Category>();
  for (const c of categories) map.set(c.id, c);
  return map;
}
