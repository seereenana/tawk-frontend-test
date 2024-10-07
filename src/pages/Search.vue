<template>
  <div id="Search">
    <div class="category-header">
      <input v-model="searchQuery" placeholder="Search for answers" @keyup.enter="searchArticle" />
      <button @click="searchArticle"><i class="fas fa-search"></i></button>
    </div>
    <section class="container">
      <div class="breadcrumb">
        <p>
          <a href="/">All categories</a><i class="fas fa-chevron-right"></i>Search Results
        </p>
      </div>
      <div class="container-content">
        <section class="category-grid">
          <p class="default-text">Showing Result for "{{ searchArticleTitle }}"</p>
          <div v-if="!filteredArticleTitle.length" class="article-card">
            <p class="default-text"> No search result</p>
          </div>
          <div>

            <div v-for="item in filteredArticleTitle" :key="item.id">
              <div class="article-card">
                <div class="article-right-bar">
                  <div class="article-left-icon"> <i v-bind:class="iconClassObject(item.icon)"></i>
                  </div>
                  <div>
                    <p class="article-title">{{ item.title }}</p>
                    <p class="article-description">{{ item.content }}</p>
                  </div>
                  <div class="article-right-icon">
                    <i class="fas fa-chevron-right"></i>
                  </div>
                </div>
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
      articleList: [],
      filteredArticle: [],
    };
  },
  mounted() {
    const articleTitle = this.$route.query.article;
    if (articleTitle) {
      this.fetchSearchArticles(articleTitle);
    }
  },
  computed: {
    searchArticleTitle() {
      return this.$route.query.article;
    },
    filteredArticleTitle() {
      return this.articleList.filter(
        (article) =>
          article.title.toLowerCase().includes(this.searchArticleTitle.toLowerCase())
      );
    },
  },
  methods: {
    searchArticle() {
      this.$router.push({ name: "Search", query: { article: this.searchQuery } });
    },
    async fetchSearchArticles() {
      try {
        const response = await axios.get("/api/search/" + this.searchQuery);
        // theres one typo for the icon deskop
        this.articleList = response.data;
      } catch (error) {
        this.error = "Failed to fetch articles data";
        console.error(error);
      }
    },
    iconClassObject(iconName) {
      return "fas fa-lg fa-" + iconName;
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
  margin-bottom: 20px;

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
    flex-direction: column;
    padding: 0px;
    margin: 0;
    margin-bottom: 20px;

  }


  .article-right-bar {
    display: flex;

  }

  .article-title {
    font-size: 20px;
    margin-bottom: 2px;

    @media (max-width: 768px) {
      margin-right: 20px;
      flex-wrap: wrap;

    }
  }

  .article-description {
    font-size: 11px;
    overflow: hidden;
    text-overflow: ellipsis;
    word-wrap: break-word;
    max-height: 2.2em;
    line-height: 1.2em;
    width: 70%;

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
