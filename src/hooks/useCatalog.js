import { useState, useEffect } from 'react'
import Papa from 'papaparse'

const SHEET_URL =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vS3awJWE5yoRHSKWD7QtE-ivWL8fehzcDpOOo4S0LRganyM08mtJk3-jl56FQf75CAy7ef_VrRZaSan/pub?gid=0&single=true&output=csv'

export function useCatalog() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(SHEET_URL)
      .then((res) => res.text())
      .then((csvText) => {
        const results = Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
        })
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
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  return { products, loading, error }
}