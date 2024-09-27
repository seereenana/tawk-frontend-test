<template>
  <div>
    <tawk-header></tawk-header>
    <main>
      <router-view />
    </main>
  </div>
</template>

<script>
import Header from "./components/Header.vue";

export default {
  components: {
    "tawk-header": Header,
  },
};
</script>

<style lang="scss" scoped>
@import "scss/main.scss";
</style>
