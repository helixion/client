<template>
  <div id="my-account" class="container">
    <section class="hero is-dark">
      <div class="hero-body">
        <div class="columns is-vcentered">
          <div class="column is-narrow">
            <figure class="avatar image is-96x96">
              <img src="https://bulma.io/images/placeholders/96x96.png" alt="">
            </figure>
          </div>
          <div class="column" v-if="currentUser">
            <h1 class="title">{{currentUser.username}}</h1>
            <h2 class="subtitle">
              <i>Member since {{date}}</i>
            </h2>
          </div>
        </div>
      </div>
    </section>
    <div class="columns is-multiline">
      <edit-password-form :sending.sync="sending"></edit-password-form>
      <edit-email-form :sending.sync="sending"></edit-email-form>  
    </div> 
  </div>
</template>

<script>
'use strict';
import format from 'date-fns/format';
import EditPasswordForm from '@/components/forms/EditPasswordForm';
import EditEmailForm from '@/components/forms/EditEmailForm';


export default {
  name: 'MyAccount',
  components: { EditPasswordForm, EditEmailForm },

  beforeRouteEnter(to, from, next) {
    const { action, key } = to.query;
    next(vm => {
      if (!vm.isAuthenticated) {
        vm.$router.push("/?require_login=true");
      } else if (action === 'password-verify') {
        vm.$http
          .post('/users/edit-password/verify', { key })
          .then(res => {
            vm.$notify({
              group: 'notes',
              type: 'success',
              subject: 'Password successfully changed.',
              text: 'Your password has been succesfully changed.'
            })
          })
          .catch(e => {
            vm.$notify({
              group: 'notes',
              type: 'error',
              subject: 'Error Processing request,',
              text: `${e.response.status}:${e.response.data.message}`
            })
          })
      }
    });
  },

  data() {
    return {
      sending: false
    }
  },

  watch: {
    isAuthenticated() {
      if (!this.isAuthenticated) {
        this.$router.push("/");
      }
    }
  },

  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },
    currentUser() {
      return this.$store.getters.currentUser;
    },
    date() {
      return format(this.currentUser.created_at, 'dddd, MMMM DD, YYYY');
    }
  }
};
</script>

<style lang="scss">

.avatar {
    img {
      border-radius: 50%;
    }
  }

#edit-password {
  margin-top: 1.5rem;
}

.section-head {
    border-left: 3px solid #3f88c5;
    background-color: #222;
    padding: 5px;
    h1,
    h2,
    h3,
    h4 {
      color: #cacaca;
    }
  }

  .section-body {
    padding: 20px;
    background-color: #333;
    border-left: 3px solid #555;
    label {
      color: #cacaca;
    }
  }
</style>
