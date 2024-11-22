import * as Sentry from "@sentry/nextjs";

export class AppError extends Error {
  constructor(
    public code: string,
    message: string,
  ) {
    super(message);
    this.name = "AppError";
  }
}

export async function handleError(error: unknown) {
  if (error instanceof AppError) {
    console.error(`AppError: ${error.code} - ${error.message}`);
    Sentry.captureException(error, {
      tags: { errorType: "AppError", errorCode: error.code },
    });
  } else if (error instanceof Error) {
    console.error(`Unexpected error: ${error.message}`);
    Sentry.captureException(error);
  } else {
    console.error("Unknown error:", error);
    Sentry.captureMessage("Unknown error occurred", {
      level: "error",
      extra: { error },
    });
  }
}
