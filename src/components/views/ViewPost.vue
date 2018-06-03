<template>
    <div id="post-view" class="container" v-if="post">
        <div class="columns is-multiline">
            <div class="column is-12">
                <div class="post-view-title">
                    <img :src="`http://localhost:${post.author.avatar}`" alt="" class="icon">
                    <div>
                        <h4 class="title is-4">{{post.title}}</h4>
                        <p class="meta">Submitted on: {{date}}</p>
                    </div>
                </div>
            </div>
            <div class="column is-12">
                <div class="columns is-gapless post-view-outer">
                    <div class="column is-narrow">
                        <div class="side">
                            <img :src="`http://localhost${post.author.avatar}`" alt="" class="icon">
                            <span>{{post.author.username}}</span>
                        </div>
                        
                    </div>
                    <div class="column">
                        <div class="post-view-body" v-html="post.body"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import format from "date-fns/format";
import { get } from "axios";

export default {
  name: "view-post",
  data() {
      return {
        title: ""  
      }
  },
  async beforeRouteEnter(to, from, next) {
    let response;
    try {
      response = await get(`/posts/${to.params.id}`);
      document.title = response.data.post.title;
      next(vm => {
          vm.post = response.data.post;
      });
    } catch (e) {
      if (e.response) {
        next(`/error/${e.response.status}`);
      }
    }
  },

  computed: {
    date() {
      return format(this.post.created_at, "dddd, MMMM DD, YYYY");
    }
  },

  watch: {
      '$route'(to, from) {
          console.log(this.$route.matched);
      }
  },

  data() {
    return {
      post: null
    };
  }
};
</script>

