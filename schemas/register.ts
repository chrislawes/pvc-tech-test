import { z } from 'zod'
import { registerSettings } from '@/settings/register'

export const registerSchema = z.object({
    email: z
        .string({
            message: 'Email is required.'
        })
        .email({
            message: 'Invalid email address, please enter a valid email.'
        }),
    password: z
        .string({
            message: 'Password is required.'
        })
        .min(
            registerSettings.PASSWORD_MIN_LENGTH, 
            {
                message: `Password must be at least ${registerSettings.PASSWORD_MIN_LENGTH} characters long.` 
            }
        )
        .max(
            registerSettings.PASSWORD_MAX_LENGTH, 
            { 
                message: `Password must be less than ${registerSettings.PASSWORD_MAX_LENGTH} characters long.` 
            }
        )
        .regex(
            registerSettings.PASSWORD_UPPERCASE_REQUIRED ? /[A-Z]/ : /^/, 
            { 
                message: 'Password must contain at least one uppercase letter.' 
            }
        )
        .regex(
            registerSettings.PASSWORD_NUMBER_REQUIRED ? /\d/ : /^/, 
            { 
                message: 'Password must contain at least one number.' 
            }
        ),
    notificationOptIn: z.boolean().optional(),
}).strict()
