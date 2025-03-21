import { registerSettings } from '@/settings/register'

export const passwordStrength = (): {
    label: string;
    isValid: (password: string) => boolean;
}[] => [
    ...(registerSettings.PASSWORD_MIN_LENGTH > 0 ? [{
        label: `Password must be at least ${registerSettings.PASSWORD_MIN_LENGTH} characters long`,
        isValid: (password: string) => password.length >= registerSettings.PASSWORD_MIN_LENGTH
    }] : []),
    ...(registerSettings.PASSWORD_UPPERCASE_REQUIRED ? [{
        label: 'Password must contain at least one uppercase letter',
        isValid: (password: string) => /[A-Z]/.test(password)
    }] : []),
    ...(registerSettings.PASSWORD_NUMBER_REQUIRED ? [{
        label: 'Password must contain at least one number',
        isValid: (password: string) => /\d/.test(password)
    }] : []),
]
