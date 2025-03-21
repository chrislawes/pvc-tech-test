<script setup lang="ts">
import '@provetcloud/web-components/lib/icon'
import '@provetcloud/web-components/lib/input'
import '@provetcloud/web-components/lib/checkbox'
import '@provetcloud/web-components/lib/button'
import '@provetcloud/web-components/lib/stack'
import '@provetcloud/web-components/lib/tooltip'

import { registerSchema, type RegisterSchema, type RegisterErrorsSchema } from '@/schemas/register'

const formData = reactive<RegisterSchema>({
    email: '',
    password: '',
    notificationOptIn: false
})

const formErrors = reactive<RegisterErrorsSchema>({
    email: [],
    password: []
})

const showPassword = ref<boolean>(false)
const isSubmitting = ref<boolean>(false)

const resetErrors = (key: keyof RegisterErrorsSchema | null = null): void => {
    if (key) {
        formErrors[key] = []
    } else {
        Object.keys(formErrors).forEach(key => {
            formErrors[key as keyof typeof formErrors] = []
        })
    }
}

const handleSubmit = (): void => {

    const result = registerSchema.safeParse(formData)

    resetErrors()

    if (result.error) {

        const formatted = result.error.format()

        Object.keys(formatted).forEach(field => {
            
            const fieldErrors = formatted[field as keyof typeof formatted]

            if (fieldErrors && '_errors' in fieldErrors) {
                formErrors[field as keyof typeof formErrors] = fieldErrors._errors;
            }
        })

    } else {
        console.log('submit')
        isSubmitting.value = true
    }
}
</script>

<template>
    <div class="n-margin-b-xl">
        
        <h1 class="n-margin-be-s">Register</h1>
        <p class="n-margin-b-l n-font-size-m">Discover the complete cloud-based practice management solution for the modern veterinary practice.</p>

        <form @submit.prevent="handleSubmit">
            <provet-stack direction="vertical" gap="l">

                <provet-input
                    expand
                    required
                    id="email"
                    label="Email"
                    type="email"
                    :error="formErrors.email ? formErrors.email[0] : undefined"
                    :value="formData.email"
                    @input="
                        formData.email = ($event.target as HTMLInputElement).value;
                        resetErrors('email');
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
                    @input="
                        formData.password = ($event.target as HTMLInputElement).value;
                        resetErrors('password');
                    "
                >
                    <provet-button
                        square
                        slot="end"
                        type="button"
                        aria-describedby="password-tooltip"
                        @click="showPassword = !showPassword"
                    >
                        <provet-icon
                            v-if="showPassword"
                            name="interface-edit-on"
                        />
                        <provet-icon
                            v-else
                            name="interface-edit-off"
                        />
                    </provet-button>
                </provet-input>

                <provet-tooltip id="password-tooltip">Show / hide password</provet-tooltip>

                <PasswordStrength :input="formData.password" />
                
                <PasswordRules :input="formData.password" />

                <provet-checkbox
                    label="Updates and announcements"
                    hint="Receive product updates and new feature announcements to your inbox, unsubscribe anytime."
                    :checked="formData.notificationOptIn"
                    @change="formData.notificationOptIn = ($event.target as HTMLInputElement).checked"
                />

                <provet-button
                    expand
                    :loading="isSubmitting"
                    variant="primary"
                >
                    Register
                </provet-button>

            </provet-stack>
        </form>
    </div>
</template>
