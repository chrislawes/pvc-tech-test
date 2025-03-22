import { registerSettings } from '@/settings/register'

/**
 * Password Strength
 * Lst of rules to test password strength
 * Used to generate list of requirements for PasswordRules
 * Used to build totalizer sections for PasswordStrength component
 */
export const passwordStrength = (): {
    label: string
    isValid: (password: string) => boolean
}[] => {
    const rules = []
    
    if (registerSettings.PASSWORD_MIN_LENGTH > 0) {
        rules.push({
            label: `Password must be at least ${registerSettings.PASSWORD_MIN_LENGTH} characters long`,
            isValid: (password: string) => password.length >= registerSettings.PASSWORD_MIN_LENGTH
        })
    }
    
    if (registerSettings.PASSWORD_UPPERCASE_REQUIRED) {
        rules.push({
            label: 'Password must contain at least one uppercase letter',
            isValid: (password: string) => /[A-Z]/.test(password)
        })
    }
    
    if (registerSettings.PASSWORD_NUMBER_REQUIRED) {
        rules.push({
            label: 'Password must contain at least one number',
            isValid: (password: string) => /\d/.test(password)
        })
    }
    
    return rules

}
