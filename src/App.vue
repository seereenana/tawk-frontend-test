<template>
  <div>
    <tawk-header></tawk-header>
    <main class="app">
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
@import "scss/_variables.scss";

.app {
  //   display: flex; // Enable flexbox
  //   justify-content: center; // Center content horizontally
  //   align-items: center; // Center content vertically
  //   width: 100vw; // Full viewport width
  height: 70vh; // Full viewport height
  font-family: $font-family;
}
</style>
