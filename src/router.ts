import Vue from 'vue';
import Router from 'vue-router';

const Home = () => import('./views/Home/Home.vue');
const SelectType = () => import('./views/SelectType/SelectType.vue');
const SpExp = () => import('./views/SpExp/SpExp.vue');
const ExpDetail = () => import('./views/ExpDetail/ExpDetail.vue');

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
