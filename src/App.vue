<script>
import AppNavbar from './components/AppNavbar.vue';
import AppFooter from './components/AppFooter.vue';

export default {
  components: {
    AppNavbar,
    AppFooter,
  },
};
</script>

<template>
  <AppNavbar />
  <router-view></router-view>
  <AppFooter />
</template>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Madimi+One&display=swap');
</style>
