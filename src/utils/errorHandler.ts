/**
 * Log an error without exposing details to user
 * @param context - Where the error occurred
 * @param error - The error object
 */
export function logError(context: string, error: unknown): void {
  console.error(`[StableSave] ${context}:`, error)
}

/**
 * Check if an error is related to user rejection
 */
export function isUserRejection(error: unknown): boolean {
  if (error instanceof Error) {
    const message = error.message.toLowerCase()
    return (
      message.includes('user rejected') ||
      message.includes('user denied') ||
      message.includes('rejected by user')
    )
  }
  return false
}

/**
 * Check if an error is related to network issues
 */
export function isNetworkError(error: unknown): boolean {
  if (error instanceof Error) {
    const message = error.message.toLowerCase()
    return (
      message.includes('network') ||
      message.includes('timeout') ||
      message.includes('fetch') ||
      message.includes('rate limit')
    )
  }
  return false
}
