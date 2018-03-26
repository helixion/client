<template>
  <div id="app">
    <app-header v-if="hasHeader"></app-header>
    <mobile-menu v-show="showMobileMenu"></mobile-menu>
    <main id="main" :class="mainClasses">
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
    hasHeader() {
      return this.$store.getters.header;
    },
    showMobileMenu() {
      return this.$store.getters.showMobileMenu;
    },
    mainClasses() {
      return ['page', { 'menu-open': this.showMobileMenu }]
    }
  }
}
</script>

<style lang="scss" src="./scss/main.scss">
</style>