import { createRouter, createWebHistory } from 'vue-router';

import PageHome from './pages/PageHome.vue';
import OurTeam from './pages/OurTeam.vue';
import NotFound from './pages/NotFound.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: PageHome,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFound,
    },
  ],
});
export { router };
