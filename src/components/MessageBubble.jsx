import { ProductCard } from './ProductCard'

// Extract image URLs from the bot's message text
function extractImages(text) {
  const regex = /🖼️ \[عرض الصورة\]\((https?:\/\/[^\)]+)\)/g
  const images = []
  let match
  while ((match = regex.exec(text)) !== null) {
    images.push(match[1])
  }
  return images
}

// Clean message text for display - remove the image markdown lines
function cleanText(text) {
  return text.replace(/🖼️ \[عرض الصورة\]\(https?:\/\/[^\)]+\)/g, '').trim()
}

// Simple bold markdown: **text**
function renderBold(text) {
  const parts = text.split(/\*\*(.*?)\*\*/g)
  return parts.map((part, i) =>
    i % 2 === 1 ? <strong key={i}>{part}</strong> : part
  )
}

export function MessageBubble({ message }) {
  const { role, content } = message
  const isBot = role === 'assistant'

  const images = isBot ? extractImages(content) : []
  const displayText = isBot ? cleanText(content) : content

  return (
    <div className={`bubble-wrapper ${isBot ? 'bot' : 'user'}`}>
      {isBot && (
        <div className="avatar">🛋️</div>
      )}
      <div className={`bubble ${isBot ? 'bubble-bot' : 'bubble-user'}`}>
        <div className="bubble-text">
          {displayText.split('\n').map((line, i) => (
            <p key={i}>{renderBold(line)}</p>
          ))}
        </div>
        {images.length > 0 && (
          <div className="bubble-images">
            {images.map((url, i) => (
              <img
                key={i}
                src={url}
                alt="منتج"
                onError={(e) => (e.target.style.display = 'none')}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
