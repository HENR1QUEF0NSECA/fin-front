import { redirect } from "next/navigation";
import type { ReactNode } from "react";

import { Sidebar } from "@/components/layout/sidebar";
import { getSessionUser } from "@/lib/auth-user";

export default async function AppLayout({ children }: { children: ReactNode }) {
  const user = await getSessionUser();
  if (!user) {
    // Sem sessão válida. Passa pela rota que apaga o cookie antes de ir ao login:
    // ir direto para /login com o cookie ainda lá faria o proxy.ts devolver para
    // /painel, em loop.
    redirect("/api/auth/expired");
  }

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      <Sidebar userName={user.nome} />
      <main className="flex-1 px-4 py-6 sm:px-8 sm:py-10 lg:pl-10">
        <div className="mx-auto w-full max-w-6xl space-y-8">{children}</div>
      </main>
    </div>
  );
}
