export default function getErrorMessage (error?: unknown, message?: string) {
    if(message) return {message: message}
    if (error instanceof Error) return {message: error.message}

    return {message: String(error)}
  }
  