<template>
  <div>
    <h1>Personalized News Reader</h1>
    <input
      type="text"
      v-model="keyword"
      @keyup.enter="fetchNews"
      placeholder="Enter keyword and press enter"
    />
    <NewsList :articles="articles" />
  </div>
</template>

<script>
import axios from 'axios';
import NewsList from '../components/NewsList.vue';

export default {
  components: {
    NewsList
  },
  data() {
    return {
      keyword: '',
      articles: []
    };
  },
  methods: {
    async fetchNews() {
      if (!this.keyword) return;
      try {
        const response = await axios.get(
          `https://newsapi.org/v2/everything?q=${this.keyword}&apiKey=e21d9532b7684ae0afdfc73073acf391`
        );
        this.articles = response.data.articles;
      } catch (error) {
        console.error('Error fetching news:', error);
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
