import express from 'express'
import cors from 'cors'
import axios from 'axios'

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.get('/api/news', async (req, res) => {
  const keyword = req.query.q
  const apiKey = process.env.NEWS_API_KEY   // secret key in Render

  if (!keyword) {
    return res.status(400).json({ error: 'Missing keyword' })
  }

  try {
    const response = await axios.get(
      `https://newsapi.org/v2/everything?q=${encodeURIComponent(keyword)}&apiKey=${apiKey}`
    )
    res.json(response.data)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to fetch news' })
  }
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
