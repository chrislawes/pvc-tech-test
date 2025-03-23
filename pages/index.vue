<script setup lang="ts">
import '@provetcloud/web-components/lib/icon'
import '@provetcloud/web-components/lib/input'
import '@provetcloud/web-components/lib/checkbox'
import '@provetcloud/web-components/lib/button'
import '@provetcloud/web-components/lib/stack'
import '@provetcloud/web-components/lib/tooltip'

import { useRouter } from 'vue-router'
import { register } from '@/services/api'
import { registerSchema } from '@/schemas/register'
import { useFormBuilder } from '@/composables/formBuilder.ts'

const router = useRouter()

const {
    formData,
    formErrors,
    buildForm,
    appendErrors,
    resetErrors,
    hasErrors 
} = useFormBuilder()

buildForm([
    {
        key: 'email',
        value: ''
    },
    {
        key: 'password',
        value: ''
    },
    {
        key: 'notificationOptIn',
        value: false
    }
])

const showPassword = ref<boolean>(false)
const isSubmitting = ref<boolean>(false)

/**
 * Handle the submit event for the form
 * Checks validation, mocks API call, and redirects
 */
const handleSubmit = async (): Promise<void> => {

    if (isSubmitting.value) return

    resetErrors()

    const validationStatus = registerSchema.safeParse(formData)

    if (validationStatus.error) {

        const formattedErrors = validationStatus.error.format()
        
        appendErrors(formattedErrors)

    } else {
        
        isSubmitting.value = true

        // This would be in a try/catch, but I'm expecting it will work as it's a mock API call
        await register(formData)
        await router.push('/welcome')

    }
}
</script>

<template>
    <div class="n-margin-b-xl">
        
        <h1 class="n-margin-be-s">Register</h1>
        <p class="n-margin-b-l n-font-size-m">Discover the complete cloud-based practice management solution for the modern veterinary practice.</p>

        <form
            @submit.prevent="handleSubmit"
            :class="{ 'invalid-form': hasErrors }"
        >
            <provet-stack direction="vertical" gap="l">

                <provet-input
                    expand
                    required
                    id="email"
                    label="Email"
                    type="email"
                    :error="formErrors.email ? formErrors.email[0] : undefined"
                    :disabled="isSubmitting"
                    :value="formData.email"
                    @input="
                        resetErrors('email');
                        formData.email = ($event.target as HTMLInputElement).value;
                    "
                />
                
                <provet-input
                    expand
                    required
                    id="password"
                    label="Password"
                    :type="showPassword ? 'text' : 'password'"
                    :error="formErrors.password ? formErrors.password[0] : undefined"
                    :value="formData.password"
                    :disabled="isSubmitting"
                    @input="
                        resetErrors('password');
                        formData.password = ($event.target as HTMLInputElement).value;
                    "
                >
                    <provet-button
                        square
                        slot="end"
                        type="button"
                        aria-describedby="password-tooltip"
                        @click="showPassword = !showPassword"
                    >
                        <provet-icon :name="showPassword ? 'interface-edit-on' : 'interface-edit-off'" />
                    </provet-button>
                </provet-input>

                <provet-tooltip id="password-tooltip">Show / hide password</provet-tooltip>

                <PasswordStrength :input="formData.password" />
                
                <PasswordRules :input="formData.password" />

                <provet-checkbox
                    label="Updates and announcements"
                    hint="Receive product updates and new feature announcements to your inbox, unsubscribe at anytime."
                    :disabled="isSubmitting"
                    :checked="formData.notificationOptIn"
                    @change="formData.notificationOptIn = ($event.target as HTMLInputElement).checked"
                />

                <provet-button
                    expand
                    variant="primary"
                    :loading="isSubmitting"
                >
                    Register
                </provet-button>

            </provet-stack>
        </form>

    </div>
</template>
