<template>
    <section id="account" class="section" v-if="Object.keys(currentUser).length">
        <div class="container">
            <div class="columns is-vcentered has-text-centered-mobile">
                <div class="column is-narrow is-flex centered">
                    <app-avatar/>
                </div>
                <div class="column">
                    <h4 class="title">{{currentUser.username}}</h4>
                </div>
            </div>
            <div class="columns">
                <div class="column is-one-third is-narrow">
                    <div class="panel">
                        <router-link to="/settings/personal" :active-class="'is-active'" class="panel-block">
                            <span class="panel-icon">
                                <i class="fa fa-user"></i>
                            </span>
                            Personal
                        </router-link>
                        <router-link to="/settings/security" class="panel-block" :active-class="'is-active'">
                            <span class="panel-icon">
                                <i class="fa fa-user"></i>
                            </span>
                            Security
                        </router-link>
                    </div>
                </div>
                <div class="column is-two-thirds">
                    <router-view/>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import Avatar from "@/components/Avatar";

export default {
  name: "settings",
  components: { appAvatar: Avatar },

  beforeRouteEnter(to, from, next) {
    const { action, type, code, username } = to.query;
    next(vm => {
      if (!vm.isAuthenticated) {
        vm.$router.push("/?require_login=true");
      } else if (action === "edit") {
        // const data = type === "password" ? { username, key } : { key };
        let data = {};
        Object.keys(to.query).forEach(key => {
          if (key !== "action" || key !== "type") {
            data[key] = to.query[key];
          }
        });
        vm.saveChanges(`/users/update/${type}`, data);
      }
    });
  },

  data() {
    return {
      toast: {
        theme: "primary",
        icon: "check",
        duration: 3000,
        className: ["bis-notification", "success"]
      }
    };
  },

  computed: {
    currentUser() {
      return this.$store.getters.currentUser;
    },
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    }
  },

  watch: {
    isAuthenticated() {
      if (!this.isAuthenticated) {
        this.$router.push("/");
      }
    }
  },

  methods: {
    async saveChanges(url, data) {
      let response;
      try {
        response = await this.$http.put(url, data);
        this.toast.icon = "check";
        this.toast.className[1] = "success";
        const message = "Changes saved.";
        this.$toasted.show(message, this.toast);
      } catch (e) {
        this.notificationOpts.icon = "exclamation-triangle";
        this.notificationsOpts.className[1] = "danger";
        if (e.response) {
          const message = `[${e.response.status}]:${e.response.data.message}`;
          this.$toasted.show(message, this.toast);
        } else if (e.request) {
          console.log(e.request);
        } else {
          console.log(e.message);
        }
      }
    }
  }
};
</script>
