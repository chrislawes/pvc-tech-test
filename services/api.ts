import type { RegisterSchema } from '@/types/register'

/**
 * Register
 * Mock API endpoint
 */
export const register = async (data: RegisterSchema): Promise<void> => {
    // Simulate network delay (1-2 seconds)
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000))
    return Promise.resolve()
}
