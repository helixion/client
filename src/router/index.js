'use strict';

import Vue from 'vue'
import Router from 'vue-router'

import ProgressBar from '@/components/ProgressBar';

//views
import MyAccount from '@/components/views/MyAccount';
import Home from '@/components/views/Home'
import Verify from '@/components/views/Verify'
import ResetPassword from '@/components/views/ResetPassword'
import Errors from '@/components/Errors';
import ForumHandler from '@/components/ForumHandler';
import ManagePost from '@/components/views/ManagePost';


const bar = Vue.prototype.$bar = new Vue(ProgressBar).$mount();
document.body.appendChild(bar.$el);


Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        title: 'Best In Slot'
      }
    },
    {
      path: '/manage-post/create',
      name: 'manage-post',
      component: ManagePost,
      meta: {
        title: 'Manage Post - Create'
      }
    },
    {
      path: '/verify',
      name: 'verify',
      component: Verify,
      meta: {
        title: 'Verify your account'
      }
    },
    {
      path: '/myaccount',
      name: 'myaccount',
      component: MyAccount,
      meta: {
        title: "Best In Slot - My Account"
      }
    },
    {
      path: '/sso',
      component: ForumHandler
    },
    {
      path: '/reset-password',
      component: ResetPassword
    },
    {
      path: '/error/:status',
      component: Errors,
      props: true,
      meta: {
        title: "Error!"
      }
    },
    {
      path: '*',
      redirect: Home
    },
    
  ]
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next();
})

router.onReady(() => {

  router.beforeResolve((to, from, next) => {
    const matched = router.getMatchedComponents(to);
    const prevMatched = router.getMatchedComponents(from);
    let diffed = false;
    const activated = matched.filter((c, i) => {
      return diffed || (diffed = prevMatched[i] !== c);
    })
    bar.start();
    return Promise.all(activated)
      .then(() => {
        bar.finish();
        next();
      })
      .catch(next);
  })

});



export default router;