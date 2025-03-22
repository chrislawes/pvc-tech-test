import { expect, test } from '@nuxt/test-utils/playwright'

test('welcome page redirects back to register page on load', async ({ page, goto }) => {
    await goto('/welcome', { waitUntil: 'hydration' })
    await expect(page).toHaveURL('/')
})
