// Simple script to test POST /api/billing/subscribe locally
(async () => {
  try {
    const res = await fetch('http://localhost:3000/api/billing/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer test'
      },
      body: JSON.stringify({
        salonId: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
        planKey: 'free',
        purchaseNow: false
      })
    })
    const text = await res.text()
    console.log('STATUS', res.status)
    console.log(text)
  } catch (err) {
    console.error('Error calling subscribe:', err)
  }
})()

