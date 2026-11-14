export function extractErrorMessage(data: unknown): string | null {
  if (!data || typeof data !== "object") return null;
  const obj = data as Record<string, unknown>;

  if (obj.campos && typeof obj.campos === "object") {
    const fieldMessages = Object.values(obj.campos as Record<string, unknown>).filter(
      (m): m is string => typeof m === "string" && m.trim().length > 0,
    );
    if (fieldMessages.length > 0) return fieldMessages.join(". ");
  }

  for (const key of ["erro", "message", "error"]) {
    const value = obj[key];
    if (typeof value === "string" && value.trim().length > 0) return value;
  }
  return null;
}
