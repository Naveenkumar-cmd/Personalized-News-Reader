<template>
  <div>
    <h1>Personalized News Reader</h1>

    <input
      type="text"
      v-model="keyword"
      @keyup.enter="fetchNews"
      placeholder="Enter keyword and press enter"
    />

    <NewsList v-if="articles.length" :articles="articles" />
    <p v-else-if="loading">Loading...</p>
    <p v-else>No articles yet</p>
  </div>
</template>

<script>
import axios from 'axios'
import NewsList from '@/components/NewsList.vue'

export default {
  components: { NewsList },

  data() {
    return {
      keyword: '',
      articles: [],
      loading: false
    }
  },

  methods: {
    async fetchNews() {
      if (!this.keyword.trim()) return

      this.loading = true

      try {
        // Call backend instead of NewsAPI directly
        const res = await axios.get(
          `/api/news?q=${encodeURIComponent(this.keyword)}`
        )
        this.articles = res.data.articles || []
      } catch (err) {
        console.error('Error fetching news:', err)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
input {
  margin-bottom: 20px;
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
}
</style>
