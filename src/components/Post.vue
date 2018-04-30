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
      <i class="fa fa-chevron-up" @click.prevent="hideBody" v-if="show"></i>
      <i class="fa fa-chevron-down" @click.prevent="showBody" v-else></i>
    </div>
    <div class="article-body" ref="article" :style="{ height }">
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
      timeout: null,
      show: true
    };
  },

  computed: {
    chevronState() {
      return [
        "fa",
        { "fa-chevron-up": this.show, "fa-chevron-down": !this.show }
      ];
    },

    formattedDate() {
      const date = new Date();
      return format(date.toISOString(), "dddd, MMMM DD, YYYY");
    }
  },

  methods: {
    showBody() {
      /*we're transitioning to auto, for this to work we need to manually set an absolute value, 
      let the transition play out and THEN remove the hard value and let auto take over.
      we set a timer on the next tick (dom update) with 250ms to let the transition complete.*/
      this.height = `${this.$refs.article.scrollHeight}px`;
      this.show = true;
      // clearInterval(this.timeout);
      this.$nextTick(() => {
        this.timeout = setTimeout(() => {
          this.height = "";
        }, 250);
      });
    },
    hideBody() {
      /*we're transition from auto to 0, for this to work we need to first set the height to a value it can transition from.
      We set the height to the scrollHeight, just like we did when were transition yo auto, on the next dom update we immediately
      set the height to 0 in a timeout giving the transition time to kick in. By storing the timeout in a property we can cancel
      previous transition without most of the weird side effects.*/
      this.height = `${this.$refs.article.scrollHeight}px`;
      this.show = false;
      clearInterval(this.timeout);
      this.$nextTick(() => {
        this.timeout = setTimeout(() => {
          this.height = "0px";
        }, 50);
      });
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
  box-shadow: 1px 2px 5px rgba(0,0,0,0.7);
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
    height: auto;
    transition: height 250ms ease;
  }
}

@import '../scss/animations/slide-from-top';
</style>
