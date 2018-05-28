<template>
  <accordion
    :showInitially="true" 
    parentTag="article" 
    headerTag="div" 
    :containerClasses="{ accordion: true, article: true }" 
    :headerClasses="{ 'toggle-padding': true }">
    <div class="article-header" slot="header">
      <div class="avatar">
         <img :src="`http://localhost${post.author.avatar}`">
      </div>
      <span>
        <h6 class="title is-4">{{post.title}}</h6>
        <small>Posted by {{post.author.username}} on {{formattedDate}}</small>
      </span>
    </div>
    <div class="article-body" v-html="post.body"> 
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
  }
};
</script>

<style lang="scss">
.article {
  position: relative;
  width: 100%;
  top: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.7);
  background-color: #0f0f0f;
  .toggle-padding {
    padding-right: 0.75rem;
  }
  .article-header {
    background-color: #0f0f0f; //#181a1e;
    flex: 1;
    display: flex;
    padding: 0.35rem 0.63rem;
    align-items: center;
    text-align: left;
    z-index: 3;

    h6,
    small {
      color: #cacaca;
    }
    h6 {
      margin-top: 0;
      margin-bottom: 0;
      text-align: left;
    }

    .avatar {
      width: 60px;
      height: 50px;
      img {
        width: 50px;
        height: inherit;
        border-radius: 50%;
      }
    }
  }
  .article-body {
    flex: 1;
    background-color: #1f1f1f; //#383b40
    color: #cacaca;
    padding: 0.75rem;
    text-align: left;
    height: auto;
  }
}

@import "../scss/animations/slide-from-top";
</style>
