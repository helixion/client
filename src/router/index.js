import Vue from 'vue'
import Router from 'vue-router'

import ProgressBar from '@/components/ProgressBar';

//views
import MyAccount from '@/components/views/MyAccount';
import Home from '@/components/views/Home'
import Verify from '@/components/views/Verify'
import ResetPassword from '@/components/views/ResetPassword'
import Errors from '@/components/errors/Errors';
import ForumHandler from '@/components/ForumHandler';


const bar = Vue.prototype.$bar = new Vue(ProgressBar).$mount();
document.body.appendChild(bar.$el);


Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/verify',
      name: 'verify',
      component: Verify,
    },
    {
      path: '/myaccount',
      name: 'myaccount',
      component: MyAccount
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
      path: '/error/:status(\\d)',
      component: Errors,
      props: true
    },
    {
      path: '*',
      redirect: Home
    },
    
  ]
});

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