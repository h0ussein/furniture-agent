import { useState } from 'react'

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions'

export function useGroq(products) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const buildSystemPrompt = (products) => {
    const catalogText = products
      .map(
        (p) =>
          `- الاسم: ${p.name} | الفئة: ${p.category} | الوصف: ${p.description} | السعر: ${p.price}$ | الصورة: ${p.imageUrl} | متوفر: ${p.inStock ? 'نعم' : 'لا'}`
      )
      .join('\n')

    return `أنت وكيل مبيعات أثاث ذكي ومحترف. مهمتك مساعدة العملاء في إيجاد المنتج المناسب.

كتالوج المنتجات المتاحة:
${catalogText}

قواعد الرد:
1. رد دائماً بالعربية
2. عندما تذكر منتجاً، استخدم هذا الشكل بالضبط:
   **اسم المنتج**
   📝 الوصف هنا
   💰 السعر: XXX$
   🖼️ [عرض الصورة](URL_الصورة)
3. إذا سأل العميل عن منتج غير موجود، اعتذر بلطف واقترح البديل الأقرب
4. كن ودوداً ومحترفاً
5. لا تخترع منتجات غير موجودة في الكتالوج`
  }

  const sendMessage = async (userMessage, history) => {
    setLoading(true)
    setError(null)

    const apiKey =  import.meta.env.VITE_GROQ_API_KEY

    const messages = [
      { role: 'system', content: buildSystemPrompt(products) },
      ...history,
      { role: 'user', content: userMessage },
    ]

    try {
      const res = await fetch(GROQ_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages,
          temperature: 0.7,
          max_tokens: 1024,
        }),
      })

      if (!res.ok) {
        const errData = await res.json()
        throw new Error(errData.error?.message || 'خطأ في الـ API')
      }

      const data = await res.json()
      return data.choices[0].message.content
    } catch (err) {
      setError(err.message)
      return null
    } finally {
      setLoading(false)
    }
  }

  return { sendMessage, loading, error }
}