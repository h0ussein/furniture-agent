export function ProductCard({ imageUrl, name }) {
  if (!imageUrl) return null
  return (
    <div className="product-card">
      <img src={imageUrl} alt={name} onError={(e) => (e.target.style.display = 'none')} />
      <span className="product-name">{name}</span>
    </div>
  )
}
