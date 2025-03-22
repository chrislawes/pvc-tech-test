// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',
    devtools: {
        enabled: false
    },
    ssr: false,
    vue: {
        compilerOptions: {
            isCustomElement: (tag) => tag.includes('-')
        }
    },
    css: ['@provetcloud/css'],
    app: {
        head: {
            bodyAttrs: {
                class: 'n-reset'
            }
        }
    }
})
