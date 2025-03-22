import { expect, test } from '@nuxt/test-utils/playwright'
import { passwordStrength } from '@/utils/password-strength'

const passwordRules = passwordStrength().map((rule) => rule.label)

const validData = {
    email: 'test@test.com',
    password: 'Password123!'
}

const invalidData = {
    email: 'invalid-email',
    password: 'weak'
}

test('page is rendered', async ({ page, goto }) => {
    await goto('/', { waitUntil: 'hydration' })
    await expect(page.getByRole('heading')).toHaveText('Register')
})

test('Register form (email and password) inputs are rendered', async ({ page, goto }) => {
    await goto('/', { waitUntil: 'hydration' })
    await expect(page.getByRole('textbox', { name: 'Email' })).toBeVisible()
    await expect(page.getByRole('textbox', { name: 'Password' })).toBeVisible()
})

test('Register form accepts valid email and password', async ({ page, goto }) => {
    await goto('/', { waitUntil: 'hydration' })
    await page.getByRole('textbox', { name: 'Email' }).fill(validData.email)
    await page.getByRole('textbox', { name: 'Password' }).fill(validData.password)
    await page.getByRole('button', { name: 'Register' }).click()
    await expect(page).toHaveURL('/welcome')
})

test('Register form shows password rules', async ({ page, goto }) => {
    await goto('/', { waitUntil: 'hydration' })
    for (let i = 0; i < passwordRules.length; i++) {
        await expect(page.getByText(passwordRules[i])).toBeVisible()
    }
})

test('Register form shows password strength indicator', async ({ page, goto }) => {
    await goto('/', { waitUntil: 'hydration' })
    await page.getByRole('textbox', { name: 'Password' }).click()
    await expect(page.getByTestId('password-strength-indicator')).toBeVisible()
})

test('Strength indicator is complete when password is strong', async ({ page, goto }) => {
    await goto('/', { waitUntil: 'hydration' })
    await page.getByRole('textbox', { name: 'Password' }).fill(validData.password)
    await expect(page.getByTestId('password-strength-indicator')).toBeVisible()
    const activeItems = await page.getByTestId('password-strength-indicator').locator('.password-strength__item--active')
    await expect(activeItems).toHaveCount(passwordRules.length)
})

test('Strength indicator is incomplete when password is weak', async ({ page, goto }) => {
    await goto('/', { waitUntil: 'hydration' })
    await page.getByRole('textbox', { name: 'Password' }).fill(invalidData.password)
    await expect(page.getByTestId('password-strength-indicator')).toBeVisible()
    const activeItems = await page.getByTestId('password-strength-indicator').locator('.password-strength__item--active')
    await expect(activeItems).toHaveCount(0)
})

test('Register form should not change URL, when form is submitted without email or password', async ({ page, goto }) => {
    await goto('/', { waitUntil: 'hydration' })
    await page.getByRole('button', { name: 'Register' }).click()
    await expect(page).toHaveURL('/')
})

test('Register form shows error messages, and doesn\'t change URL, when email is invalid and form is submitted', async ({ page, goto }) => {
    await goto('/', { waitUntil: 'hydration' })
    await page.getByRole('textbox', { name: 'Email' }).fill(invalidData.email)
    await page.getByRole('textbox', { name: 'Password' }).fill(validData.password)
    await page.getByRole('button', { name: 'Register' }).click()
    await expect(page.locator('.invalid-form')).toBeVisible()
    await expect(page).toHaveURL('/')
})

test('Register form shows error messages, and doesn\'t change URL, when password is invalid and form is submitted', async ({ page, goto }) => {
    await goto('/', { waitUntil: 'hydration' })
    await page.getByRole('textbox', { name: 'Email' }).fill(validData.email)
    await page.getByRole('textbox', { name: 'Password' }).fill(invalidData.password)
    await page.getByRole('button', { name: 'Register' }).click()
    await expect(page.locator('.invalid-form')).toBeVisible()
    await expect(page).toHaveURL('/')
})
