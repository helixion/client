<template>
  <div class="f-signin">
      <div class="content">
          <h1>Signing Into Discourse</h1>
          <div class="spinner">
              <img src="http://localhost:8080/src/assets/f-spinner.png" alt="">
          </div>
      </div>
  </div>
</template>

<style lang="scss">
.f-signin {
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1001;
  background-color: rgba(0, 0, 0, 0.7);
  color: #f1f1f1;
  text-shadow: 1px 1px 0 rgba(55, 55, 55, 0.5);
  .content {
    position: absolute;
    top: 25%;
    left: 0;
    right: 0;
    text-align: center;
    h1 {
      color: #f1f1f1;
    }
  }
  .spinner {
    position: relative;
    &:after {
      content: "\f023";
      position: absolute;
      left: 0;
      right: 0;
      top: 1rem;
      font-family: FontAwesome;
      font-size: 3rem;
    }
  }
}
</style>

<script>
export default {
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (!vm.isAuthenticated) {
        vm.$router.push({ path: "/", query: { require_login: true } });
      } else {
        const { sso, sig } = to.query;
        console.log(to.query);
        vm.loginIntoDiscourse(sso, sig);
      }
    });
  },

  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },

    user() {
      return this.$store.getters.currentUser;
    }
  },

  methods: {
    async loginIntoDiscourse(payload, signature) {
      try {
        const res = await this.$http.post("/users/sso", {
          payload,
          signature,
          avatar_url: ''
        });
        const { sso, sig } = res.data;
        window.location.replace(
          `http://${this.$discourse.url}:${
            this.$discourse.port
          }/session/sso_login?sso=${sso}&sig=${sig}`
        );
      } catch (e) {
        console.log(e);
   
        if (e.response) {
            this.$router.push(`/error/${e.response.status}`); 
        } else if (e.request) {
            console.log(e.request);
            this.$router.push('/error/500');
        } else {
            console.log(e);
            this.$router.push('/error/500');            
        }
      }
    }
  }
};
</script>
