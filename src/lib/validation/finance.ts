import { z } from 'zod'

import { toCents } from '#/features/transactions/types'

const amountString = z
  .string()
  .trim()
  .min(1, 'Amount is required')
  .refine((value) => {
    try {
      toCents(value)
      return true
    } catch {
      return false
    }
  }, 'Enter a valid amount with up to 2 decimal places')

const centsFromAmount = amountString.transform((value) => toCents(value))

export const createTransactionSchema = z.object({
  accountId: z.string().trim().min(1, 'Account is required'),
  categoryId: z.string().trim().min(1, 'Category is required'),
  amount: centsFromAmount,
  occurredOn: z.string().trim().min(1, 'Transaction date is required'),
  note: z.string().trim().max(240, 'Note is too long').optional(),
  merchant: z.string().trim().max(120, 'Merchant is too long').optional(),
})

export const editTransactionSchema = createTransactionSchema.extend({
  id: z.string().trim().min(1, 'Transaction id is required'),
})

export const recurringBillSchema = z.object({
  id: z.string().trim().optional(),
  name: z.string().trim().min(1, 'Bill name is required').max(120, 'Bill name is too long'),
  categoryId: z.string().trim().min(1, 'Category is required'),
  accountId: z.string().trim().optional(),
  amount: centsFromAmount,
  dueDay: z.coerce.number().int().min(1).max(31),
  recurrence: z.enum(['weekly', 'monthly', 'quarterly', 'yearly']),
  startsOn: z.string().trim().min(1, 'Start date is required'),
  endsOn: z.string().trim().optional(),
  autoPay: z.boolean().default(false),
  notes: z.string().trim().max(240, 'Notes are too long').optional(),
})

export type CreateTransactionInput = z.input<typeof createTransactionSchema>
export type CreateTransactionData = z.infer<typeof createTransactionSchema>
export type EditTransactionInput = z.input<typeof editTransactionSchema>
export type EditTransactionData = z.infer<typeof editTransactionSchema>
export type RecurringBillInput = z.input<typeof recurringBillSchema>
export type RecurringBillData = z.infer<typeof recurringBillSchema>
