<template>
  <div class="container">
      <div class="columns is-multiline is-centered">
          <div class="column is-12">
              <div class="status">
                  <i class="fa fa-envelope" aria-hidden="true"></i>
              </div>
          </div>
          <div class="column is-12">
              <div class="content">
                  <h2>We've dispatched an email to the following address: {{email}}</h2>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import {post} from 'axios';

export default {
  beforeRouteEnter(to, from, next) {
      const {email, code} = to.query;
      post(`/users/${email}/reset-password`,  {code})
        .then(res => {
            next(vm => {
                if (vm.isAuthenticated) {
                    vm.$router.push('errors/404');
                } else {
                    vm.email = res.data.user.email;
                }
            }) 
        })
        .catch(e => {
            next('/404')
        });
  },

  data() {
      return {
          email: ''
      }
  },
  
  computed: {
      isAuthenticated() {
          return this.$store.getters.isAuthenticated;
      }
  }
}
</script>

<style lang="scss">
.status {
    font-size: 10rem;
}

.status, .content {
    text-align: center;
}

h2 {
    color: #cacaca !important;
}
</style>

