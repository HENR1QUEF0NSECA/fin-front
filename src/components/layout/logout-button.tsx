"use client";

import { useQueryClient } from "@tanstack/react-query";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { logout } from "@/features/auth/services";

export function LogoutButton() {
  const router = useRouter();
  const queryClient = useQueryClient();

  function handleClick() {
    logout();
    queryClient.clear();
    router.replace("/login");
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleClick}
      className="w-full justify-start gap-3 text-danger hover:text-danger"
    >
      <LogOut className="h-4 w-4" aria-hidden />
      <span>Sair do sistema</span>
    </Button>
  );
}
