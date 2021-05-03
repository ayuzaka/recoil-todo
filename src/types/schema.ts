import * as z from 'zod'

const textSchema = z
  .string()
  .max(120, { message: 'Must be 120 or fewer characters long' })
  .min(1, { message: 'Must be 1 or more characters long' })

export const todoItem = z.object({
  id: z.string().uuid(),
  text: textSchema,
  isComplete: z.boolean(),
})
export type TodoItem = z.infer<typeof todoItem>

const filterType = z.union([z.literal('Show All'), z.literal('Show Completed'), z.literal('Show Uncompleted')])
export type FilterType = z.infer<typeof filterType>
