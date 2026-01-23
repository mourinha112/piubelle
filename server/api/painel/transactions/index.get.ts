import { supabaseAdmin, isSupabaseConfigured } from '../../../utils/supabase'

// Local transactions storage
export const localTransactions = new Map<string, any>()

export default defineEventHandler(async (event) => {
  try {
    const authHeader = getHeader(event, 'authorization')
    if (!authHeader) {
      throw createError({ statusCode: 401, message: 'Token necessário' })
    }

    const query = getQuery(event)
    const salonId = query.salonId as string
    const type = query.type as string
    const date = query.date as string
    const startDate = query.startDate as string
    const endDate = query.endDate as string

    if (!salonId) {
      throw createError({ statusCode: 400, message: 'salonId é obrigatório' })
    }

    if (isSupabaseConfigured()) {
      let queryBuilder = supabaseAdmin
        .from('transactions')
        .select('*')
        .eq('salon_id', salonId)
        .order('created_at', { ascending: false })

      if (type) {
        queryBuilder = queryBuilder.eq('type', type)
      }

      if (date) {
        queryBuilder = queryBuilder.eq('date', date)
      }

      if (startDate && endDate) {
        queryBuilder = queryBuilder.gte('date', startDate).lte('date', endDate)
      }

      const { data, error } = await queryBuilder

      if (error) throw createError({ statusCode: 500, message: error.message })

      const transactions = (data || []).map(t => ({
        id: t.id,
        type: t.type,
        category: t.category,
        description: t.description,
        amount: parseFloat(t.amount),
        paymentMethod: t.payment_method,
        date: t.date,
        createdAt: t.created_at
      }))

      const totalIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0)
      const totalExpense = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0)

      return {
        success: true,
        data: transactions,
        summary: {
          totalIncome,
          totalExpense,
          balance: totalIncome - totalExpense,
          count: transactions.length
        }
      }
    }

    // Local fallback
    let result = Array.from(localTransactions.values())

    result = result.filter(t => t.salonId === salonId)

    if (type) {
      result = result.filter(t => t.type === type)
    }

    if (date) {
      result = result.filter(t => t.date === date)
    }

    if (startDate && endDate) {
      result = result.filter(t => t.date >= startDate && t.date <= endDate)
    }

    const totalIncome = result.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0)
    const totalExpense = result.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0)

    return {
      success: true,
      data: result,
      summary: {
        totalIncome,
        totalExpense,
        balance: totalIncome - totalExpense,
        count: result.length
      }
    }
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Erro interno do servidor'
    })
  }
})
