import { z } from 'zod'
import { registerSettings } from '@/settings/register'

export const registerSchema = z.object({
    email: z.
        string({ message: 'Email is required.' })
        .email({ message: 'Invalid email address, please enter a valid email.' }),
    password: z
        .string({ message: 'Password is required.' })
        .min(registerSettings.PASSWORD_MIN_LENGTH, { message: 'Password must be at least 8 characters long.' })
        .max(registerSettings.PASSWORD_MAX_LENGTH, { message: 'Password must be less than 128 characters long.' })
        .regex(registerSettings.PASSWORD_NUMBER_REQUIRED ? /[0-9]/ : /^/, { message: 'Password must contain at least one number.' })
        .regex(registerSettings.PASSWORD_UPPERCASE_REQUIRED ? /[A-Z]/ : /^/, { message: 'Password must contain at least one uppercase letter.' }),
    notificationOptIn: z.boolean().optional(),
}).strict()

export const registerErrorsSchema = z.object({
    email: z.array(z.string()).optional(),
    password: z.array(z.string()).optional()
})

export type RegisterSchema = z.infer<typeof registerSchema>
export type RegisterErrorsSchema = z.infer<typeof registerErrorsSchema>
