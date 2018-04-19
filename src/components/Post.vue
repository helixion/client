<template>
  <article :id="id" class="article">
    <div class="article-header">
      <div class="avatar">
         <img src="https://secure.gravatar.com/avatar/2aa55fc44bd53490e81cb92f28988274?d=https://content.invisioncic.com/r256851/monthly_2017_10/S.png.bf066fe426d974c6b7ab1ee11afdacef.png" alt="">
      </div>
      <span>
        <h6 class="title is-4">{{title}}</h6>
        <small>Posted by {{author}} on {{formattedDate}}</small>
      </span>
      <i :class="chevronState" @click.prevent="toggleTransition"></i>
    </div>
    <div class="article-body" ref="article" :style="{ height, transition }">
        <slot></slot>
    </div>
  </article>
</template>

<script>
import format from "date-fns/format";

export default {
  props: {
    title: String,
    author: String,
    date: Number,
    id: [Number, String]
  },

  data() {
    return {
      height: '',
      transition: ''
    };
  },

  mounted() {
    this.height = `${this.$refs.article.scrollHeight}px`;
  },

  computed: {
    chevronState() {
      return [
        "fa",
        { "fa-chevron-up": this.height, "fa-chevron-down": !this.height }
      ];
    },

    formattedDate() {
      const date = new Date();
      return format(date.toISOString(), "dddd, MMMM DD, YYYY");
    }
  },

  methods: {
    toggleTransition() {
      const height = this.$refs.article.scrollHeight;
      this.transition = "height 250ms ease";
      this.height = this.height? '' : `${height}px`;

      const timeout = setTimeout(() => {
        this.$nextTick(() => {
          this.transition = '';
        })
      }, 250);
    }
  }
};
</script>

<style lang="scss">
.article {
  position: relative;
  width: 100%;
  top: 0;
  transition: all 0.15s ease;
  margin-bottom: 1rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  &.open {
    box-shadow: 1px 1px 5px rgba(55, 55, 55, 0.5);
  }
  .article-header {
    background-color: #181a1e;

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
    span {
      flex: 1 1 0;
    }
  }
  .article-body {
    flex: 1;
    background-color: #383b40;
    color: #cacaca;
    padding: 0 0.75rem;
    text-align: left;
    height: 0;
  }
}

@import '../scss/animations/slide-from-top';
</style>
