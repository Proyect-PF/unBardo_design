export default function getErrorMessage (error: unknown) {
    if (error instanceof Error) return {message: error.message}
    return {message: String(error)}
  }
  