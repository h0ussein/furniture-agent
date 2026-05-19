import { useState, useRef, useEffect } from 'react'
import { useCatalog } from './hooks/useCatalog'
import { useGroq } from './hooks/useGroq'
import { MessageBubble } from './components/MessageBubble'
import './App.css'

const WELCOME = {
  role: 'assistant',
  content: 'أهلاً وسهلاً! 👋\nأنا وكيل الأثاث الذكي. يسعدني مساعدتك في إيجاد قطعة الأثاث المثالية.\n\nيمكنك أن تسألني مثلاً:\n• **ما هي الكنب المتاحة؟**\n• **أريد طاولة سفرة**\n• **ما هو أرخص منتج عندكم؟**',
}

export default function App() {
  const { products, loading: catalogLoading } = useCatalog()
  const { sendMessage, loading: botLoading } = useGroq(products)

  const [messages, setMessages] = useState([WELCOME])
  const [input, setInput] = useState('')
  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, botLoading])

  const handleSend = async () => {
    const text = input.trim()
    if (!text || botLoading || catalogLoading) return

    const userMsg = { role: 'user', content: text }
    const history = messages.filter((m) => m.role !== 'system')

    setMessages((prev) => [...prev, userMsg])
    setInput('')

    const reply = await sendMessage(
      text,
      history.map((m) => ({ role: m.role, content: m.content }))
    )

    if (reply) {
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }])
    }
  }

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="app" dir="rtl">
      {/* Header */}
      <header className="header">
        <div className="header-inner">
          <div className="header-logo">
            <span className="logo-icon">🛋️</span>
            <div>
              <h1>وكيل الأثاث الذكي</h1>
              <p>مساعدك الشخصي لاختيار الأثاث المثالي</p>
            </div>
          </div>
          <div className="header-status">
            <span className="status-dot" />
            <span>متصل</span>
          </div>
        </div>
      </header>

      {/* Messages */}
      <main className="messages">
        {catalogLoading && (
          <div className="catalog-loading">
            <span className="spinner" />
            جاري تحميل الكتالوج...
          </div>
        )}

        {messages.map((msg, i) => (
          <MessageBubble key={i} message={msg} />
        ))}

        {botLoading && (
          <div className="bubble-wrapper bot">
            <div className="avatar">🛋️</div>
            <div className="bubble bubble-bot typing">
              <span /><span /><span />
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </main>

      {/* Input */}
      <footer className="input-area">
        <div className="input-inner">
          <button
            className="send-btn"
            onClick={handleSend}
            disabled={botLoading || !input.trim()}
          >
            ➤
          </button>
          <textarea
            ref={inputRef}
            className="input-box"
            placeholder="اسألني عن أي قطعة أثاث..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            rows={1}
            dir="rtl"
          />
        </div>
      </footer>
    </div>
  )
}
