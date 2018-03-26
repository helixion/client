<template>
  <transition enter-active-class="slide-in-from-left" leave-active-class="slide-out-from-left" mode="out-in">
    <nav id="mobile" class="navbar is-black">
      <div class="navbar-brand">
        <router-link to="/" class="navbar-link">
          <img src="http://localhost:8080/src/assets/bis-logo-sm.png" alt="">
        </router-link>
        <span class="close">&times;</span>
      </div>
      <div class="navbar-head">
        <a href="" class="navbar-item" @click.prevent="toggle(!modal)">
          <i class="fa fa-user-circle"></i>
          Sign In / Up
        </a>
      </div>
      <div class="navbar-menu" id="mobile">
        <div class="navbar-start">
          <router-link to="/">Home</router-link>
          <router-link to="/">History</router-link>
          <router-link to="/">Recruitment</router-link>
          <router-link to="/">Media</router-link>
          <router-link to="/">Discussion</router-link>
        </div>
      </div>
    </nav>
  </transition>
</template>


<script>
export default {
  name: 'mobile-menu',
  methods: {
      toggle(bool) {
          this.$store.dispatch('setModal', bool);
      }
  },
  computed: {
      modal() {
          return this.$store.getters.modal;
      }
  }
}
</script>


<style lang="scss">
#mobile {
    background-color: #1d1d1d;
    position: fixed;
    top: 0;
    left: 0;
    box-shadow: 1px 1px 3px -2px rgba(0,0,0,0.5);
    min-width: 256px;
    height: 100%;
    z-index: 4;
    .close {
        padding: 3px;
        background-color: #333;
        border-radius: 50%;
        position: absolute;
        top: 5px;
        right: 5px;
    }
    .navbar-head {
        text-align: center;
        background-color: #111;
        font-weight: 700;
        text-transform: uppercase;
    }
    .navbar-menu, 
    .navbar-start {
        display: flex;
        flex-direction: column;
    }
    .navbar-item {
        color: #cacaca;
    }
    .navbar-menu {
        background-color: #1d1d1d;
    }
}



.slide-in-from-left {
  animation: slideInFromLeft 0.15s linear forwards;
}

.slide-out-from-left {
  animation: slideOutFromLeft 0.15s linear forwards;
}




@keyframes slideInFromLeft {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}

@keyframes slideOutFromLeft {
  from {
    transform: translateX(0);
  }
  to {
    transform: translate(-100%);
  }
}

</style>
