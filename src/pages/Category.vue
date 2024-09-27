<template>
  <div id="Category">
    <!-- {{ categoryId }} -->
    <div v-for="item in filteredArticles" :key="item.id">
      <div>
        <i v-bind:class="iconClassObject(item.icon)"></i>
        <br />
        {{ item.title }}
        <br />
        Updated {{ formatDate(item.updatedOn) }}
        <br />
        <!-- {{ fetchAuthorData(item.authorId) }} -->
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      articles: [],
    };
  },
  mounted() {
    this.fetchArticlesData(this.$route.params.id);
  },
  computed: {
    categoryId() {
      return this.$route.params.id;
    },
    filteredArticles() {
      return this.articles.filter((article) => article.status == "published");
    },
  },
  methods: {
    formatDate(date) {
      const options = { year: "numeric", month: "short", day: "2-digit" };
      return new Intl.DateTimeFormat("en-US", options).format(new Date(date));
    },
    iconClassObject(iconName) {
      return "fas fa-" + iconName;
    },
    //current api return all articles when fetch
    async fetchArticlesData(categoryId) {
      try {
        const response = await axios.get("/api/category/" + categoryId);
        this.articles = response.data;
      } catch (error) {
        this.error = "Failed to fetch articles data";
        console.error(error);
      }
    },
    // current view doesnt required the display of authors
    async fetchAuthorData(authorId) {
      try {
        const response = await axios.get("/api/author/" + authorId);
        this.author = response.data;
      } catch (error) {
        this.error = "Failed to fetch author data";
        console.error(error);
      }
    },
  },
};
</script>
