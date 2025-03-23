import { z } from 'zod'
import { registerSchema } from "@/schemas/register"

export type RegisterSchema = z.infer<typeof registerSchema>
