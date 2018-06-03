<template>
    <nav id="breadcrumb">
        {{breadcrumbs}}
    </nav>
</template>

<script>
export default {
  computed: {
    breadcrumbs() {
      return this.$route.matched.map(route => {
        if (this.$router.currentRoute === route) {
          return route;
        }
      });
    },

    isCurrentRoute() {
      return !!this.$route.matched.filter(
        route === this.$router.currentRoute
      )[0];
    }
  }
};
</script>
