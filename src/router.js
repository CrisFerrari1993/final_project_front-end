import { createRouter, createWebHistory } from 'vue-router';

import PageHome from './pages/PageHome.vue';
import OurTeam from './pages/OurTeam.vue';
import NotFound from './pages/NotFound.vue';
import Restaurants from './pages/Restaurants.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: PageHome,
    },
    {
      path: '/Il_nostro_team',
      name: 'ourTeam',
      component: OurTeam,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFound,
    },
    {
      path: '/ristoranti',
      name: 'Restaurants',
      component: Restaurants,
    },
  ],
});
export { router };
