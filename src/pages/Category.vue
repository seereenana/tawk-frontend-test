<template>
  <div id="Category">
    <section class="category-header">
      <input v-model="searchQuery" placeholder="Search for answers" />
      <button><i class="fas fa-search"></i></button>
    </section>
    <section class="container">
      <div class="container-content">
        <div class="breadcrumb">
          <p>
            <a href="/">All categories</a><i class="fas fa-chevron-right"></i>{{ categoryData.title }}
          </p>
        </div>
        <section class="category-card">
          <div class="category-card-header">
            <i v-bind:class="iconCategoryClassObject(categoryData.icon)"></i>
            <p class="title-text">{{ categoryData.title }}</p>
            <p class="date-text">
              {{ formatLastUpdated(categoryData.updatedOn) }}
            </p>
          </div>
          <hr class="divider" />
          <div class="category-card-footer">
            <i class="fas fa-info"></i>
            <p class="description-text">{{ categoryData.description }}</p>
          </div>
        </section>
        <section class="articles-grid">
          <div v-if="!filteredArticles.length" class="article-card">
            <p class="default-text"> No articles found</p>
          </div>
          <div v-for="item in filteredArticles" :key="item.id">
            <div class="article-card">
              <div class="article-right-bar">
                <div class="article-left-icon"> <i v-bind:class="iconClassObject(item.icon)"></i>
                </div>
                <div>
                  <p class="article-title">{{ item.title }}</p>
                  <p class="article-date">Updated {{ formatDate(item.updatedOn) }}</p>
                </div>
              </div>
              <div class="article-right-icon">
                <i class="fas fa-chevron-right"></i>
              </div>
            </div>

          </div>
        </section>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      searchQuery: "",
      articlesList: [],
      categoriesList: [],
    };
  },
  mounted() {
    const categoryId = this.$route.params.id;
    this.fetchArticlesData(categoryId);
    this.fetchCategoriesData();
  },
  computed: {
    categoryId() {
      return this.$route.params.id;
    },
    filteredArticles() {
      if (this.searchQuery.length === 0) {
        return this.articlesList.filter((article) => article.status == "published");
      } else {
        return this.articlesList.filter(
          (article) =>
            article.title
              .toLowerCase()
              .includes(this.searchQuery.toLowerCase()) && article.status == "published"
        );
      }

    },
    categoryData() {
      return this.findCategoryById(this.categoryId);
    },
  },
  methods: {
    findCategoryById(id) {
      return this.categoriesList.find((category) => category.id === id);
    },
    formatDate(date) {
      const options = { year: "numeric", month: "short", day: "2-digit" };
      return new Intl.DateTimeFormat("en-US", options).format(new Date(date));
    },
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
    iconCategoryClassObject(iconName) {
      return "fas fa-3x fa-" + iconName;
    },
    iconClassObject(iconName) {
      return "fas fa-lg fa-" + iconName;
    },
    // fetch categories data again here to display the breadcrumbs title name
    // note: not perfomance optimize
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
    // note: should return current category data to display on UI instead of using the /api/categories api
    //current api return all articles when fetch
    async fetchArticlesData(categoryId) {
      try {
        const response = await axios.get("/api/category/" + categoryId);
        this.articlesList = response.data;
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

<style lang="scss" scoped>
@import "../scss/_variables.scss";

.container {
  background-color: $background-color;
  padding: 0px 20px;
  min-height: 100vh;
  width: auto;
  display: flex;
  justify-items: center;
  justify-content: center;
}

.container-content {
  padding: 20px;
  justify-items: center;
  width: auto;

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

    i {
      color: white;
    }
  }

  i {
    margin: 0;
    border: 1px solid $green;
  }
}

.breadcrumb {
  font-family: $font-family;
  font-size: 13px;

  i {
    padding: 10px;
  }

  p {
    color: $text-gray;
  }

  a {
    text-decoration: none;
    color: $green;
  }
}

i {
  color: $green;
}

.category-card-header {
  padding: 10px;

  i {
    padding: 10px
  }
}

.category-card {
  float: left;
  width: 315px;
  height: 220px;
  padding: 30px;
  border: 1px solid $border-color;
  border-radius: 5px;
  display: flex;
  text-align: center;
  flex-direction: column;
  justify-content: center;
  background-color: white;

  @media (max-width: 768px) {
    float: none;
    margin-bottom: 10px;
  }

  p {
    font-family: $font-family;
    margin: 0;
  }



  .title-text {
    font-size: 20px;
    margin-bottom: 5px;
  }

  .date-text {
    font-size: 11px;
    color: $text-gray;
    margin-top: 0px;
  }

  .description-text {
    font-size: 11px;
    color: $text-gray;
    padding: 10px;
  }
}

.divider {
  width: inherit;
  border: 0;
  border-top: 1px solid $text-gray;
  margin: 20px auto;
}

.articles-grid {
  height: inherit;
  display: grid;
  display: -ms-grid;
  grid-auto-columns: 1fr 200px;
  padding-left: 20px;
  gap: 10px;

  /* IE 10 */
  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }

  @media (max-width: 768px) {
    float: none;
    padding-left: 0;

  }
}

.article-card {
  padding: 20px;
  border: 1px solid $border-color;
  border-radius: 5px;
  display: flex;
  background-color: white;
  flex-wrap: wrap;
  width: 640px;
  height: 90px;
  margin: 0;
  justify-content: space-between;

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
    flex-direction: column;
    padding: 0px;
    margin: 0;
  }


  .article-right-bar {
    display: flex;

  }

  .article-title {
    font-size: 20px;
    margin-bottom: 10px;

    @media (max-width: 768px) {
      margin-right: 20px;
      flex-wrap: wrap;

    }
  }

  .article-date {
    font-size: 11px;
    color: $text-gray;
    margin: 0;
  }

  .article-left-icon {
    float: left;
    align-self: center;
    margin-right: 20px;
    margin-left: 20px;
  }

  .article-right-icon {
    float: right;
    align-self: center;
    margin-right: 20px;
    margin-left: 20px;

    @media (max-width: 768px) {
      justify-content: center;
      margin-left: 20px;
      padding: 20px;
      align-self: flex-end;
    }
  }

  .default-text {
    padding: 20px;
  }
}
</style>
