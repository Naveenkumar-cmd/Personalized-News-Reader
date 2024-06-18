<template>
  <div>
    <h2>News Articles</h2>
    <div v-for="article in articles" :key="article.url" class="article">
      <h3>{{ article.title }}</h3>
      <p>{{ article.description }}</p>
      <a :href="article.url" target="_blank">Read more</a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    articles: Array
  }
}
</script>

<style scoped>
.article {
  margin-bottom: 20px;
}
</style>
