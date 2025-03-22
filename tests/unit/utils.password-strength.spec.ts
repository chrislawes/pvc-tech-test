// @vitest-environment nuxt
import { expect, test } from 'vitest'
import { passwordStrength } from '@/utils/password-strength'

test('passwordStrength function returns an array', () => {
    const result = passwordStrength()
    expect(result).toBeInstanceOf(Array)
})

test('passwordStrength function returns an array of objects with label and isValid properties', () => {
    const result = passwordStrength()
    expect(result).toBeInstanceOf(Array)
    expect(result[0]).toBeInstanceOf(Object)
    expect(result[0].label).toBeDefined()
    expect(result[0].isValid).toBeDefined()
})

test('passing a parameter to passwordStrength function shouldn\'t change the result', () => {
    const result = passwordStrength()
    const resultLength = result.length
    const result2 = passwordStrength(10)
    const result2Length = result2.length
    expect(result2).toBeInstanceOf(Array)
    expect(result2Length).toBe(resultLength)
})
