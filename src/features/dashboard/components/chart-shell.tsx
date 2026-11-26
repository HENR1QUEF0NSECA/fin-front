"use client";

import type { ReactNode } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

type ChartShellProps = {
  title: string;
  description?: string;
  isLoading?: boolean;
  isEmpty?: boolean;
  emptyMessage?: string;
  height?: number;
  className?: string;
  children: ReactNode;
};

export function ChartShell({
  title,
  description,
  isLoading,
  isEmpty,
  emptyMessage = "Sem dados para exibir",
  height = 280,
  className,
  children,
}: ChartShellProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
        {description ? <CardDescription>{description}</CardDescription> : null}
      </CardHeader>
      <CardContent className="relative">
        <div style={{ height }} className="relative">
          {isLoading ? (
            <Skeleton className="h-full w-full" />
          ) : isEmpty ? (
            <div className="grid h-full place-items-center text-sm text-muted-foreground">
              {emptyMessage}
            </div>
          ) : (
            <div className="h-full w-full">{children}</div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
