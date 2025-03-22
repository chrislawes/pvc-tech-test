// @vitest-environment nuxt
import { expect, test } from 'vitest'
import { register } from '@/services/api'

test('API service is defined and has register function', () => {
    expect(register).toBeDefined()
})

test('API service register function returns a promise', () => {
    const result = register()
    expect(result).toBeInstanceOf(Promise)
})
