<template>
  <div id="Home">
    <div class="category-header">
      <input v-model="searchQuery" placeholder="Search for answers" />
      <button><i class="fas fa-search"></i></button>
    </div>
    <div class="container">
      <div class="category-grid">
        <div v-if="!filteredCategories.length">
          <p class="title-text">No categories found</p>
        </div>
        <div v-for="item in sortListbyOrder(filteredCategories)" :key="item.order">
          <div class="category-card" @click="goToCategory(item.id)">
            <i v-bind:class="iconClassObject(item.icon)"></i>
            <p class="title-text">{{ item.title }}</p>
            <p class="article-text">{{ item.totalArticle }} articles</p>
            <p class="date-text">
              {{ formatLastUpdated(item.updatedOn) }}
            </p>
          </div>
        </div>
      </div>
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
      return `Last update ${diffDays} days ago`;
    },
    sortListbyOrder(list) {
      return list.sort(function (a, b) {
        return a.order - b.order;
      });
    },
    iconClassObject(iconName) {
      return "fas fa-3x fa-" + iconName;
    },
    goToCategory(id) {
      this.$router.push({ name: "Category", params: { id } }); // -> /category/id
      // this.$router.push(`/category/${id}`);
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

<style lang="scss" scoped>
@import "../scss/_variables.scss";

.container {
  background-color: $background-color;
  padding: 20px;
  min-height: 610px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.category-header {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;

  input {
    text-indent: 15px;
    border: 1px solid $border-color;
    border-radius: 4px 0px 0px 4px;
    font-size: 16px;
    width: 720px;
    height: 40px;

    @media (max-width: 768px) {
      width: 100%; // Full width for mobile screens
    }

    ::placeholder {
      color: $text-gray;
    }
  }

  button {

    width: 50px;
    height: 44px;
    margin-left: -5px;
    background-color: $green;
    color: white;
    border: 1px solid $green;
    border-radius: 0px 4px 4px 0px;
    cursor: pointer;
  }

  i {
    margin: 0;
    border: 1px solid $green;
  }
}

.category-grid {
  display: grid;
  display: -ms-grid;
  /* IE 10 */

  grid-template-columns: repeat(3,
      1fr);

  // Large desktops (e.g., 1600px wide)
  @media (max-width: 1600px) {
    grid-template-columns: repeat(3, 1fr); // Four columns for large screens
  }

  // Standard desktops (e.g., 1200px wide)
  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr); // Three columns for desktop
  }

  // Tablets (e.g., 992px wide)
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr); // Two columns for tablets
  }

  // Small tablets and large phones (e.g., 768px wide)
  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr; // Two columns for landscape phones
  }

  // Smaller phones (e.g., 576px wide)
  @media (max-width: 576px) {
    grid-template-columns: 1fr; // One column for smaller phones
  }

  // Extra small devices (e.g., less than 400px)
  @media (max-width: 400px) {
    grid-template-columns: 1fr; // One column for small phones
    gap: 10px; // Smaller gap for very small screens
  }

  gap: 20px;
  justify-items: center;
  margin: 0;
  padding: 0;
}

.category-card {
  width: 315px;
  height: 220px;
  padding: 5px;
  border: 1px solid $border-color;
  border-radius: 5px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: white;

  i {
    color: $green;
  }

  p {
    font-family: $font-family;
    margin: 0;
  }

  .title-text {
    font-size: 20px;
    padding: 20px;
  }

  .article-text {
    font-size: 13px;
    color: $green;
  }

  .date-text {
    font-size: 11px;
    color: $text-gray;
  }
}
</style>
