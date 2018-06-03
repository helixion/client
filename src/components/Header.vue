<template>
<nav id="header" class="navbar is-black" @click.stop>
    <div class="container">
        <div class="navbar-brand">
                <img src="http://localhost/images/bis-logo-sm.png" alt="">
                <button :class="['button navbar-burger', { 'is-active': showMobileMenu }]" @click.prevent="toggleMobile(!showMobileMenu)">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
            <div class="navbar-menu">
                <div class="navbar-start">
                    <router-link class="navbar-item" to="/">Home</router-link> 
                    <router-link class="navbar-item" to="/">History</router-link> 
                    <router-link class="navbar-item" to="/">Recruitment</router-link> 
                    <router-link class="navbar-item" to="/">Media</router-link> 
                    <a :href="`${forumUrl}/session/sso`" class="navbar-item" v-if="isAuthenticated" target="_blank">Discussion</a>           
                    <a :href="forumUrl" class="navbar-item" v-if="!isAuthenticated" target="_blank">Discussion</a>                                                 
                </div>
                <div id="account-panel" class="navbar-end" v-if="!isAuthenticated">
                    <a class="navbar-item" @click.prevent="setModal(true)">
                        <i class="fa fa-user-circle"/>
                        <span>Sign In / Up</span>
                    </a>
                </div>
                <div class="navbar-end" v-else>
                    <div class="dropdown is-right is-hoverable" v-if="currentUser">
                        <div class="dropdown-trigger">
                            <div aria-haspopup="true" aria-controls="dropdown-menu">
                                <div class="profile">
                                    <img :src="`http://localhost${currentUser.avatar}`" alt="" class="avatar-sm">    
                                    <span>{{currentUser.username}}</span>
                                    <span class="icon is-small">
                                        <i class="fa fa-chevron-down" aria-hidden="true"></i>
                                    </span>
                                </div>
                                
                            </div>
                        </div>
                        <div class="dropdown-menu" id="dropdown-menu" role="menu">
                            <div class="dropdown-content">
                                <router-link to="/myaccount" class="dropdown-item">
                                    <i class="fa fa-gear"></i>
                                    Settings
                                </router-link>
                                <a class="dropdown-item" @click.prevent="invalidate">
                                    <i class="fa fa-sign-out"></i>
                                    Logout
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </div>
</nav>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: "header",
  computed: {
      ...mapGetters([
          'isAuthenticated',
          'currentUser',
          'showMobileMenu'
      ]),

      forumUrl() {
          return `http://${this.$discourse.url}:${this.$discourse.port}`;
      }
  },

  created() {
      const token = window.localStorage.getItem('bis_access_token');
      if (token) {                         
          this.setAuthentication(true);
      } else {
          this.invalidate();
      }
  },

  methods: {
      ...mapActions([
          'setCurrentUser',
          'setAuthentication',
          'invalidate',
          'setModal',
          'toggleMobile'
      ])
  },

  
}
</script>

<style lang="scss">
.avatar-sm {
    width: 32px;
    height: 32px;
    border-radius: 50%;
}

.profile {
    display: flex;
    justify-content: center;
    align-items: center;
    span {
        padding: 0 0.5rem;
    }
}

.dropdown-header {
    display: flex;
    justify-content: center;
    align-content: center;
    background-color: #000;
    border-bottom: 1px solid #555;
}
</style>


