import express from 'express'
import cors from 'cors'
import axios from 'axios'
import path from 'path'

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

// Serve backend API
app.get('/api/news', async (req, res) => {
  const keyword = req.query.q
  const apiKey = process.env.NEWS_API_KEY

  if (!keyword) return res.status(400).json({ error: 'Missing keyword' })

  try {
    const response = await axios.get(
      `https://newsapi.org/v2/everything?q=${encodeURIComponent(keyword)}&apiKey=${apiKey}`
    )
    res.json(response.data)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to fetch news' })
  }
})

// Serve Vue frontend from dist/
const __dirname = path.resolve()
app.use(express.static(path.join(__dirname, 'dist')))

// Handle SPA routing (all unknown routes serve index.html)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
