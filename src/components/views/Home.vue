<template>
  <div class="container" v-if="posts">
    <app-carousel :slides="slides"></app-carousel>
    <section id="recent-news">
      <div class="section-header">
        <h2>Recent News</h2>
      </div>
      <div class="columns is-multiline">
        <div class="column is-12">
          <div class="columns">
            <div class="column">
              <pagination :total="meta.total" :current.sync="currentPage" :size="'is-small'"></pagination>
            </div>
            <div class="right-options column">
              <button class="button is-small is-primary" @click.prevent="toggleEditor(true)">
                <i class="fa fa-plus" aria-hidden="true"></i>
                  <span>Create Post</span>
              </button>
            </div>
          </div>
        </div>
        <template v-if="posts.length">
          <div class="column is-12" v-for="(post, index) in posts" :key="index">
            <app-post :post="post" />
        </div>
        </template>
        <template v-else>
          <div class="column is-12">
            <div class="content has-text-centered no-records">
              <i class="fa fa-search"></i>
              <h2>No records found.</h2>
            </div>
          </div>
        </template>  
    </div>
    </section>
    <text-editor :showEditor="showEditor"></text-editor>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination";
import Post from "@/components/NewsPost";
import Carousel from "@/components/carousel/Carousel";
import TextEditor from "@/components/editor/ComposerNoPreview";
import { mapActions } from "vuex";

export default {
  name: "home",
  components: {
    appPost: Post,
    appCarousel: Carousel,
    Pagination,
    TextEditor
  },

  beforeRouteEnter(to, from, next) {
    const { require_login } = to.query;
    const token = localStorage.getItem("bis_access_token");
    if (require_login && !token) {
      next(vm => {
        vm.$store.dispatch("setModal", true);
      });
    } else {
      next(vm => {
        vm.fetchRecords(1);
      });
    }
  },

  data() {
    return {
      currentPage: 1,
      perPage: 20,
      slides: [
        {
          img: "http://localhost/images/img1.jpeg",
          title: "Trees N Shit"
        },
        {
          img:
            "https://images.pexels.com/photos/55821/pyrenees-mountains-snow-zenith-55821.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
          title: "Earth N Shit"
        },
        {
          img:
            "https://images.pexels.com/photos/48178/mountains-ice-bergs-antarctica-berg-48178.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
          title: "Mountains N Shit"
        }
      ],
      posts: [],
      meta: {}
    };
  },
  computed: {
    showEditor() {
      return this.$store.getters.showEditor;
    }
  },

  methods: {
    ...mapActions(["toggleEditor"]),
    async fetchRecords(page) {
      this.currentPage = page;
      let response;
      try {
        response = await this.$http.get("/posts", {
          params: {
            page
          }
        });
      } catch (e) {
        console.log(e);
        return;
      }

      this.posts = response.data.posts.results;
      this.meta.total = response.data.posts.total;

      console.log(response.data);
    }
  },

  watch: {
    //if the incoming page request is greater than total pages, we redirect it to keep it within parameters
    page(page) {
      if (page > this.meta.totalPages) {
        this.$router.redirect(`/page/${this.meta.totalPages}`);
      } else if (page < 1) {
        this.$router.redirect("/");
      } else {
        if (!page) {
          this.currentPage = 1;
        }
      }
    }
  }
};
</script>

<style lang="scss">
#recent-news {
  .no-records {
    i {
      font-size: 5rem;
    }
  }
  .column:last-child {
    margin-bottom: 1.5rem;
  }
  .right-options {
    display: flex;
    justify-content: flex-end;
    span {
      margin-left: 0.5rem;
    }
  }
}
</style>
