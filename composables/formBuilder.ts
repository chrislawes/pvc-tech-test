import type { FormBuilderData, FormBuilderErrors, FormBuilderItem } from '@/types/form-builder'

export function useFormBuilder() {
    
    const formData = reactive<FormBuilderData>({})
    const formErrors = reactive<FormBuilderErrors>({})

    const hasErrors = computed((): boolean => {
        return Object
            .values(formErrors)
            .some(error => error && Array.isArray(error) && error.length > 0)
    })

    /**
     * Build Form
     * Builds formData, and form Errors
     */
    function buildForm(values: FormBuilderItem[]) {
        values.forEach(item => {
            
            const { key, value } = item

            if (key) {
                formData[key] = value
                formErrors[key] = []
            }

        })
    }

    /**
     * Reset Errors
     * Reset all errors (in formErrors), or by a specific key (in formErrors[key])
     */
    const resetErrors = (key: string): void => {
        if (key) {
            // Reset by key
            if (key in formErrors) {
                (formErrors as Record<string, any[]>)[key] = []
            }
        } else {
            // Reset all errors
            Object.keys(formErrors).forEach(errorKey => {
                (formErrors as Record<string, any[]>)[errorKey] = []
            })
        }
    }
    
    /**
     * Append Errors
     * Append errors to the formErrors object
     * "_errors" format is from Zod
     */
    const appendErrors = (errors: Record<string, { _errors: string[] }> = {}) => {
        Object.entries(errors).forEach(([key, value]) => {
            if (key in formErrors && '_errors' in value) {
                formErrors[key] = value._errors
            }
        })
    }

    return {
        // State
        formData,
        formErrors,
        hasErrors,
        
        // Actions
        buildForm,
        appendErrors,
        resetErrors
    }
}
