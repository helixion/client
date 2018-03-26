<template>
  <div class="container">
    <section id="recent-news">
      <div class="section-header">
        <h2>Recent News</h2>
      </div>
      <div class="columns is-multiline">
        <div class="column is-12" v-for="(info, index) in mock" :key="index">
          <app-post :id="info.id" :title="info.title" :author="info.author">
            {{info.body}}
          </app-post>
        </div>
    </div>
    </section>
  </div>
</template>

<script>
import Post from '@/components/Post';
import mock from '@/mock-posts';

export default {
  name: 'home',
  components: { appPost: Post },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      mock
    }
  },
  beforeRouteEnter(to, from, next) {
    const { require_login } = to.query;
    const token = localStorage.getItem('bis_access_token');
    if (require_login && !token) {
      next(vm => {
        vm.$store.dispatch('setModal', true);
      })
    } else {
      next();
    }
  }
}
</script>

<style lang="scss">
.section-header {
  width: 100%;
  height: auto;
  position: relative;
  margin-bottom: 1rem;
  h2 {
    display: inline-block;
    position: relative;
    width: auto;
    font-weight: 700;
    margin: 0;
    padding: 0 10px;
    color: #cacaca;
    z-index: 3;
    left: 20px;
    background-color: #23262b;
  }
  &:after {
    content: '';
    position: absolute;
    width: 100%;
    top: 3px;
    left: 0;
    z-index: 1;
    border: 10px solid #3498db;
  }
}

</style>
