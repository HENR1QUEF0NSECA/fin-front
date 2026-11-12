import {
  BookOpen,
  Briefcase,
  Car,
  CircleDollarSign,
  Coffee,
  Home,
  HeartPulse,
  PiggyBank,
  ShoppingBag,
  Smile,
  Sparkles,
  Utensils,
  Wifi,
  type LucideIcon,
} from "lucide-react";

// Chaves em minúsculas. As categorias do backend (data.sql) são: Transporte, Lazer,
// Contas da casa, Saúde, Compras, Salário e Freelance; as demais são sinônimos
// para categorias que forem criadas depois.
const CATEGORY_ICON_MAP: Record<string, LucideIcon> = {
  transporte: Car,
  carro: Car,
  lazer: Smile,
  entretenimento: Sparkles,
  salário: Briefcase,
  salario: Briefcase,
  freelance: Briefcase,
  trabalho: Briefcase,
  "contas da casa": Home,
  "contas de casa": Home,
  moradia: Home,
  aluguel: Home,
  casa: Home,
  alimentação: Utensils,
  alimentacao: Utensils,
  comida: Utensils,
  mercado: ShoppingBag,
  compras: ShoppingBag,
  saúde: HeartPulse,
  saude: HeartPulse,
  educação: BookOpen,
  educacao: BookOpen,
  internet: Wifi,
  café: Coffee,
  cafe: Coffee,
  investimento: PiggyBank,
  investimentos: PiggyBank,
};

export function getCategoryIcon(categoria: string): LucideIcon {
  return CATEGORY_ICON_MAP[categoria.toLowerCase().trim()] ?? CircleDollarSign;
}
