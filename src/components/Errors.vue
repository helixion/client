<template>
  <section id="error-status">
    <div class="container">
      <div class="columns is-vcentered" v-if="error">
        <div class="column is-6">
          <div class="status-icon">
            <i :class="errorClasses" aria-hidden="true"></i>
          </div>
        </div>
        <div class="column is-6">
          <div class="content">
            <h6>[{{errorStatus.code}}]: {{errorStatus.type}}</h6>
            <h4>{{errorStatus.message}}</h4>
          </div>
        </div>
      </div>
       <div class="columns is-centered">
          <button class="button is-danger is-medium" @click.prevent="$router.push({name: 'home'})">Go Home</button>
        </div>
    </div>
  </section>
</template>


<script>
'use strict';
const error = {
    "500": {
        code: 500,
        class: 'fa-exclamation-triangle',
        type: "Internal Server Error",
        message: "We encountered an error and the service is trying to recover."
    },
    "401": {
        code: 401,
        class: 'fa-hand-paper',
        type: "Unauthorized",
        message: "You do not have sufficient access privilages"
    },
    "404": {
        code: 404,
        class: 'fa-question-circle',
        type: "Not Found",
        message: "the page you're looking for doesn't exist."
    },
    "403": {
        code: 404,
        class: 'fa-question-circle',
        type: "Forbidden",
        message: "You have no access privilages."
    },
}
    
export default {
  beforeRouteEnter(to, from, next) {
    const incomingErrorCode = to.params.status;
    const validError = Object.keys(error)
        .find(err => err === incomingErrorCode);
    if (!validError) {
        next('/');
    } else {
        next(vm => vm.error = error);
    }  
  },

  props: ['status'],

  data() {
    return {
      error: null,
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
  padding: 2rem;
  width: 100%;
  background-color: #010101;
}
</style>
