<template>
  <accordion
    :showInitially="true" 
    parentTag="article" 
    headerTag="div" 
    :containerClasses="{ accordion: true, post: true }" 
    :headerClasses="{ 'toggle-padding': true }">
    <div class="post-header" slot="header">
      <div class="avatar">
         <img :src="`http://localhost${post.author.avatar}`">
      </div>
      <span>
        <h6 class="title is-4">
          <router-link :to="`/p/${post.id}/${post.slug}`">{{post.title}}</router-link>
        </h6>
        <small>Posted by {{post.author.username}} on {{formattedDate}}</small>
      </span>
    </div>
    <div class="post-body">
      <div class="post-content" v-html="post.body"> 
      </div>
    </div>
    <div class="post-foot">
      <div class="post-foot-right">
        <span class="post-options" role="button" @click.prevent="editPost">
          <i class="fa fa-edit"></i>
          Edit
        </span>
        <span class="post-options" role="button" @click.prevent="deletePost()">
          <i class="fa fa-times"></i>
          Delete
        </span>
      </div>
    </div>
  </accordion>  
</template>

<script>
import format from "date-fns/format";
import Accordion from "@/components/Accordion";

export default {
  name: "news",
  components: { Accordion },
  props: {
    post: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      height: "",
      timeout: null,
      show: true
    };
  },

  computed: {
    formattedDate() {
      return format(this.post.created_at, "dddd, MMMM DD, YYYY");
    }
  },

  methods: {
    editPost() {
      this.$store.dispatch("setVerb", "put");
      this.$store.dispatch('setEditableContent', this.post);
    },
    deletePost() {
      this.$store.dispatch("deletePost", this.post.id);
      setTimeout(() => {
        this.$store.dispatch("fetch");
      }, 100);
    }
  }
};
</script>

<style lang="scss">
@import "../scss/animations/slide-from-top";
</style>
