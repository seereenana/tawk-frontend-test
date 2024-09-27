<template>
  <div id="Home">
    <div>
      <input v-model="searchQuery" placeholder="Search for answers" />
      <button><i class="fas fa-search"></i></button>
    </div>
    <div v-for="item in sortListbyOrder(filteredCategories)" :key="item.order">
      <button @click="goToCategory(item.id)">
        <i v-bind:class="iconClassObject(item.icon)"></i>
        <br />
        {{ item.title }}
        <br />
        {{ item.totalArticle }} articles
        <br />
        {{ formatLastUpdated(item.updatedOn) }}
        <br />
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      searchQuery: "",
      categoriesList: [],
    };
  },
  mounted() {
    this.fetchCategoriesData();
  },
  computed: {
    filteredCategories() {
      return this.categoriesList.filter(
        (category) =>
          category.title
            .toLowerCase()
            .includes(this.searchQuery.toLowerCase()) && category.enabled
      );
    },
  },
  methods: {
    formatLastUpdated(dateString) {
      const updatedDate = new Date(dateString);
      const today = new Date();

      const diffTime = Math.abs(today - updatedDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return `Last update ${diffDays} days ago)`;
    },
    sortListbyOrder(list) {
      return list.sort(function (a, b) {
        return a.order - b.order;
      });
    },
    iconClassObject(iconName) {
      return "fas fa-" + iconName;
    },
    goToCategory(id) {
      this.$router.push(`/category/${id}`);
    },
    async fetchCategoriesData() {
      try {
        const response = await axios.get("/api/categories");
        // theres one typo for the icon deskop
        this.categoriesList = response.data;
      } catch (error) {
        this.error = "Failed to fetch categories data";
        console.error(error);
      }
    },
  },
};
</script>
