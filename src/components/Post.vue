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
      <i :class="chevronState" @click.prevent="show = !show"></i>
    </div>
    <transition mode="out-in" enter-active-class="slide-down" leave-active-class="slide-up">
      <div class="article-body" v-show="show">
        <slot></slot>
      </div>
    </transition>
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
    background-color: #1d1d1d;

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
    background-color: #333;
    color: #cacaca;
    padding: 0 0.75rem;
    text-align: left;
  }
}
.slide-down {
  animation: slideInDown 0.15s linear forwards;
}

.slide-up {
  animation: slideOutUp 0.15s linear forwards;
}

@keyframes slideInDown {
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0);
  }
}

@keyframes slideOutUp {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-100%);
  }
}

</style>
