import type { RegisterSchema } from '@/schemas/register'

/**
 * Register
 * Mock API endpoint
 */
export const register = async (data: RegisterSchema | null = null): Promise<void> => {
    // Simulate network delay (1-2 seconds)
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000))
    return Promise.resolve()
}
