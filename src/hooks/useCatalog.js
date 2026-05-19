import { useState, useEffect } from 'react'
import Papa from 'papaparse'

const SHEET_URL = import.meta.env.VITE_SHEET_CSV_URL
export function useCatalog() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    Papa.parse(SHEET_URL, {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const cleaned = results.data.map((row) => ({
          id: row.id,
          name: row.name,
          category: row.category,
          description: row.description,
          price: row.price,
          imageUrl: row.imageUrl,
          inStock: row.inStock === 'TRUE' || row.inStock === 'true',
        }))
        setProducts(cleaned)
        setLoading(false)
      },
      error: (err) => {
        setError(err.message)
        setLoading(false)
      },
    })
  }, [])

  return { products, loading, error }
}
