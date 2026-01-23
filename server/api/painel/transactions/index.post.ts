import { supabaseAdmin, isSupabaseConfigured } from '../../../utils/supabase'
import { localTransactions } from './index.get'

export default defineEventHandler(async (event) => {
  try {
    const authHeader = getHeader(event, 'authorization')
    if (!authHeader) {
      throw createError({ statusCode: 401, message: 'Token necessário' })
    }

    const body = await readBody(event)
    const { salonId, type, category, description, amount, paymentMethod } = body

    if (!salonId || !type || !description || !amount) {
      throw createError({ statusCode: 400, message: 'Campos obrigatórios: salonId, type, description, amount' })
    }

    if (isSupabaseConfigured()) {
      const { data, error } = await supabaseAdmin
        .from('transactions')
        .insert({
          salon_id: salonId,
          type,
          category: category || (type === 'income' ? 'Serviço' : 'Despesa'),
          description,
          amount,
          payment_method: paymentMethod || 'cash',
          date: new Date().toISOString().split('T')[0],
          is_paid: true,
          paid_at: new Date().toISOString()
        })
        .select()
        .single()

      if (error) throw createError({ statusCode: 500, message: error.message })

      return {
        success: true,
        data: {
          id: data.id,
          type: data.type,
          category: data.category,
          description: data.description,
          amount: parseFloat(data.amount),
          paymentMethod: data.payment_method,
          date: data.date,
          createdAt: data.created_at
        }
      }
    }

    // Local fallback
    const id = `trx-${Date.now()}`
    const newTransaction = {
      id,
      salonId,
      type,
      category: category || (type === 'income' ? 'Serviço' : 'Despesa'),
      description,
      amount,
      paymentMethod: paymentMethod || 'cash',
      date: new Date().toISOString().split('T')[0],
      createdAt: new Date().toISOString()
    }

    localTransactions.set(id, newTransaction)

    return { success: true, data: newTransaction }
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Erro interno do servidor'
    })
  }
})
