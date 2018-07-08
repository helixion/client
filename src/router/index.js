"use strict";

import Vue from "vue";
import Router from "vue-router";

import ProgressBar from "@/components/ProgressBar";

//views
import Home from "@/components/views/Home";
const Verify = () => import("@/components/views/Verify");
const ResetPassword = () => import("@/components/views/ResetPassword");
const ErrorHandler = () => import("@/components/views/ErrorHandler");
const DiscourseSignIn = () => import("@/components/views/DiscourseSignIn");
const Account = () => import("@/components/views/Account");
const ViewPost = () => import("@/components/views/ViewPost");
const PasswordSecurity = () => import("@/components/forms/PasswordSecurity");

const bar = (Vue.prototype.$bar = new Vue(ProgressBar).$mount());
document.body.appendChild(bar.$el);

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      meta: {
        title: "Best In Slot"
      }
    },
    {
      path: "/page/:page",
      props: true,
      component: Home,
      meta: {
        title: "Best In Slot"
      }
    },
    {
      path: "/news/:id/:slug",
      name: "Post",
      component: ViewPost
    },
    {
      path: "/verify/:code",
      name: "verify",
      component: Verify,
      meta: {
        title: "Account activated."
      }
    },
    {
      path: "/account",
      component: Account,
      meta: {
        title: "Best In Slot - My Account"
      },
      children: [
        {
          path: "",
          name: "settings",          
          component: PasswordSecurity,
          meta: { title: "My Account - Security" }
        },
        {
          path: "personal",

          component: PasswordSecurity,
          meta: { title: "My Account - Personal" }
        },
        {
          path: "security",
          component: PasswordSecurity,
          meta: { title: "My Account - Security" }
        }
      ]
    },
    {
      path: "/sso",
      component: DiscourseSignIn,
      meta: {
        title: "Signing into discourse..."
      }
    },
    {
      path: "/reset-password",
      component: ResetPassword
    },
    {
      path: "/error/:status",
      component: ErrorHandler,
      props: true,
      meta: {
        title: "Error!"
      }
    },
    {
      path: "*",
      redirect: Home
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (typeof to.meta !== undefined) {
    document.title = to.meta.title;
  } else {
    document.title = "";
  }
  next();
});

router.onReady(() => {
  router.beforeResolve((to, from, next) => {
    const matched = router.getMatchedComponents(to);
    const prevMatched = router.getMatchedComponents(from);
    let diffed = false;
    const activated = matched.filter((c, i) => {
      return diffed || (diffed = prevMatched[i] !== c);
    });
    bar.start();
    return Promise.all(activated)
      .then(() => {
        bar.finish();
        next();
      })
      .catch(next);
  });
});

export default router;
