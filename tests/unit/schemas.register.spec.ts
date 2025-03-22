// @vitest-environment nuxt
import { expect, test } from 'vitest'
import { registerSchema } from '@/schemas/register'
import { z } from 'zod'

test('Register Schema', () => {
    const schema = registerSchema
    expect(schema).toBeDefined()
})

test('Register Schema returns a zod object', () => {
    const schema = registerSchema
    expect(schema).toBeInstanceOf(z.ZodObject)
})

test('Register Schema has email field', () => {
    const schema = registerSchema
    expect(schema.shape.email).toBeDefined()
})

test('Register Schema has password field', () => {
    const schema = registerSchema
    expect(schema.shape.password).toBeDefined()
})

test('Register Schema has notificationOptIn field', () => {
    const schema = registerSchema
    expect(schema.shape.notificationOptIn).toBeDefined()
})
