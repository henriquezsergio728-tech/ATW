export type ServiceResult<T> =
  | {
      status: "ok";
      durationMs: number;
      data: T;
    }
  | {
      status: "error";
      durationMs: number;
      error: string;
    };

function errorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  return "Unknown upstream error.";
}

export async function capture<T>(task: () => Promise<T>): Promise<ServiceResult<T>> {
  const startedAt = performance.now();

  try {
    const data = await task();
    return {
      status: "ok",
      durationMs: Math.round(performance.now() - startedAt),
      data,
    };
  } catch (error) {
    return {
      status: "error",
      durationMs: Math.round(performance.now() - startedAt),
      error: errorMessage(error),
    };
  }
}
