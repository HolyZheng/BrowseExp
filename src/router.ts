import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home/Home.vue';
import SelectType from './views/SelectType/SelectType.vue';
import SpExp from './views/SpExp/SpExp.vue';
import ExpDetail from './views/ExpDetail/ExpDetail.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/SelectType',
      name: 'SelectType',
      component: SelectType,
    },
    {
      path: '/SpExp/:type',
      name: 'SpExp',
      component: SpExp,
      props: true,
    },
    {
      path: '/ExpDetail',
      name: 'ExpDetail',
      component: ExpDetail,
    },
  ],
});
