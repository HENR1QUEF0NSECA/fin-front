"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { login } from "@/features/auth/services";
import { loginSchema, type LoginFormValues } from "@/features/auth/schemas";
import { ApiError } from "@/lib/api-fetch";

function safeNextPath(next: string | null): string {
  const fallback = "/painel";
  if (!next) return fallback;
  try {
    const url = new URL(next, window.location.origin);
    if (url.origin !== window.location.origin) return fallback;
    return `${url.pathname}${url.search}${url.hash}`;
  } catch {
    return fallback;
  }
}

export function LoginForm() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const [formError, setFormError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", senha: "" },
  });

  async function onSubmit(values: LoginFormValues) {
    setFormError(null);
    try {
      await login(values);
      queryClient.clear();
      router.replace(safeNextPath(searchParams.get("next")));
    } catch (error) {
      const message =
        error instanceof ApiError ? error.message : "Não foi possível fazer login.";
      setFormError(message);
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
      <FormField label="E-mail" error={errors.email?.message}>
        {(p) => (
          <Input
            type="email"
            placeholder="voce@exemplo.com"
            autoComplete="email"
            autoFocus
            {...p}
            {...register("email")}
          />
        )}
      </FormField>

      <FormField label="Senha" error={errors.senha?.message}>
        {(p) => (
          <Input
            type="password"
            placeholder="••••••••"
            autoComplete="current-password"
            {...p}
            {...register("senha")}
          />
        )}
      </FormField>

      {formError ? (
        <p className="text-sm text-danger" role="alert">
          {formError}
        </p>
      ) : null}

      <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
        {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
        {isSubmitting ? "Entrando..." : "Entrar"}
      </Button>
    </form>
  );
}
