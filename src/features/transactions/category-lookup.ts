import type { Category } from "@/features/categories/types";

/**
 * Nome de exibição da categoria de uma transação ou orçamento: usa o
 * `nomeCategoria` que o backend já manda e, se faltar, procura pelo id na
 * lista de categorias.
 */
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
