import { supabaseAdmin } from '../../utils/supabase'

export default defineEventHandler(async (event) => {
  try {
    const payload = await readBody(event)
    // Basic logging for incoming webhook
    console.log('Billing webhook received:', JSON.stringify(payload).slice(0, 2000))

    // Attempt to handle common fields: provider subscription id and status
    const providerId = payload?.id || payload?.subscription?.id || payload?.data?.id
    const status = payload?.status || payload?.event || payload?.type

    if (providerId) {
      // find local subscription by provider id
      const { data: subs } = await supabaseAdmin
        .from('subscriptions')
        .select('*')
        .eq('provider_subscription_id', providerId)
        .limit(1)

      const sub = subs?.[0]
      if (sub) {
        const updates: any = {}
        if (status) updates.status = String(status)
        await supabaseAdmin.from('subscriptions').update(updates).eq('id', sub.id)
      }
    }

    return { success: true, received: true }
  } catch (err: any) {
    console.error('webhook.post error:', err)
    throw createError({ statusCode: 500, message: err.message || 'Webhook handler error' })
  }
})

