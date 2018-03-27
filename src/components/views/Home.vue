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
