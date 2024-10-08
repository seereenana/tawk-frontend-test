import Vue from "vue";
import Router from "vue-router";
import Home from "../pages/Home.vue";
import Category from "../pages/Category.vue";
import Search from "../pages/Search.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
    },
    {
      path: "/category/:id",
      name: "Category",
      component: Category,
    },
    {
      path: "/search",
      name: "Search",
      component: Search,
    },
  ],
});
