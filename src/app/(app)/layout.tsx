"use client";

import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";

import { Sidebar } from "@/components/layout/sidebar";
import { fetchUsuarioLogado } from "@/features/auth/services";

export default function AppLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const usuario = useQuery({ queryKey: ["usuario-logado"], queryFn: fetchUsuarioLogado, retry: false });

  useEffect(() => {
    if (usuario.isError) router.replace(`/login?next=${encodeURIComponent(pathname)}`);
  }, [usuario.isError, router, pathname]);

  if (!usuario.data) {
    return (
      <div className="grid min-h-screen place-items-center" aria-busy="true">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" aria-label="Carregando" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      <Sidebar userName={usuario.data.nome} />
      <main className="flex-1 px-4 py-6 sm:px-8 sm:py-10 lg:pl-10">
        <div className="mx-auto w-full max-w-6xl space-y-8">{children}</div>
      </main>
    </div>
  );
}
