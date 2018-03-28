<template>
  <div class="expand navbar-item">
      <div class="head">
        <slot name="header"></slot>
        <span class="toggle">
          <i :class="toggleState" aria-hidden="true" @click.prevent="show = !show"></i>
        </span>
      </div>
      <div v-show="show">
        <slot name="links"></slot>    
      </div>  
  </div>
</template>

<script>
export default {
  data() {
      return {
          show: false
      }
  },
  computed: {
      toggleState() {
          return ['fa', { 'fa-chevron-down': !this.show, 'fa-chevron-up': this.show}];
      }
  }
}
</script>

<style lang="scss">
.expand {
    .head {
        position: relative;
        span {
            position: absolute;
            right: 0;
        }
    }
    .submenu {
        padding: 0;
        margin: 0;
        list-style-type: none;
    }
    
}
</style>

