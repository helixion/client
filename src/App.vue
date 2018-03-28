<template>
  <div id="app">
    <app-header></app-header>
    <mobile-menu v-show="showMobileMenu"></mobile-menu>
    <main id="main" :class="mainClasses" @click.prevent="closeMobile" v-if="showMobileMenu">
      <router-view></router-view>
    </main>
    <main id="main" :class="mainClasses" v-else>
      <router-view></router-view>
    </main>
    <app-footer></app-footer>
    <notifications group="notes" :position="'top center'"></notifications>
    <app-modal v-if="!isAuthenticated"></app-modal>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import MobileMenu from '@/components/menus/Mobile'
import Modal from '@/components/UserModal'

export default {
  name: 'app',
  components: {
    appHeader: Header,
    appFooter: Footer,
    appModal: Modal,
    MobileMenu,
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },
    showMobileMenu() {
      return this.$store.getters.showMobileMenu;
    },
    mainClasses() {
      return ['page', { 'mobile mobile-open': this.showMobileMenu }]
    }
  },
  methods: {
    closeMobile(e) {
      const target = document.querySelector('.mobile-open');
      if (target) {

        const zIndex = window.getComputedStyle(target, '::before')
        .getPropertyValue('z-index');

        console.log(zIndex);

        if (target.classList.contains('mobile') && zIndex > -1) {
          this.$store.dispatch('toggleMobile', false);
        }
      }
      
    }
  }
}
</script>

<style lang="scss" src="./scss/main.scss">
</style>