<template>
  <section id="error-status">
      <div class="container">
      <div class="columns is-vcentered is-multiline">
          <div class="column is-3">
              <div class="icon is-large">
                  <i :class="errorClasses" aria-hidden="true"></i>
              </div>
              <div class="column is-9">
                  <div class="content">
                      <h6>[{{errorStatus.code}}]: {{errorStatus.type}}</h6>
                      <h4>{{errorStatus.message}}</h4>
                  </div>
              </div>
              <div class="column is-12 is-center">
                <button class="button is-danger is-large" @click.prevent="$router.push('/')">Go Home</button>
              </div>
          </div>
      </div>
  </div>
  </section>
</template>

<script>
export default {
  beforeEnterRoute(from, to, next) {
    next(vm => {
      const errorCode = vm.status;
      if (!(errorCode in vm.error)) {
        vm.$router.push('/')
      }
      vm.$store.dispatch("toggleHeader");
    });
  },

  beforeLeaveRoute(from, to, next) {
    this.$store.dispatch("toggleHeader");
  },

  props: ['status'],

  data() {
    return {
      error: {
        "500": {
            code: 500,
            class: 'fa-exclamation-triangle',
            type: "Internal Server Error",
            message: "We encountered an error and the service is trying to recover."
        },
        "401": {
            code: 401,
            class: 'fa-hand-paper',
            type: "Forbidden",
            message: "You do not have sufficient access privilages"
        },
        "404": {
            code: 404,
            class: 'fa-question-circle',
            type: "Not Found",
            message: "the page you're looking for doesn't exist."
        }
      }
    }
  },

  computed: {
    errorClasses() {
      return ["fa", this.errorStatus.class];
    },
    errorStatus() {
      return this.error[this.status];
    }
  }
};
</script>


<style lang="scss">
#error-status {
  height: 100%;
  width: 100%;
  background-color: 111;
}
</style>
