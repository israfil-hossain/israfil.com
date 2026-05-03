export interface User {
  id: string
  email: string
  name: string
  subscription?: {
    planId: string
    status: string
  }
}

export async function getCurrentUser(): Promise<User | null> {
  // TODO: Implement with your auth provider (Clerk, NextAuth, etc.)
  // For now, return null (not authenticated)
  return null
}
