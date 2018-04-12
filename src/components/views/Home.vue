<template>
  <div class="container">
    <app-carousel :slides="slides"></app-carousel>
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
    <text-editor></text-editor>
  </div>
</template>

<script>
import Post from '@/components/Post';
import Carousel from '@/components/carousel/Carousel';
import TextEditor from '@/components/editor/EditorContainer'
import mock from '@/mock-posts';

const desc = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged";

export default {
  name: 'home',
  components: { 
    appPost: Post,
    appCarousel: Carousel,
    TextEditor 
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      slides: [
        {
          img: "http://localhost/images/img1.jpeg",
          desc,
          title: "Trees N Shit"
        },
        {
          img:
            "https://images.pexels.com/photos/55821/pyrenees-mountains-snow-zenith-55821.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
          desc,
          title: "Earth N Shit"
        },
        {
          img:
            "https://images.pexels.com/photos/48178/mountains-ice-bergs-antarctica-berg-48178.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
          desc,
          title: "Mountains N Shit"
        }
      ],
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
