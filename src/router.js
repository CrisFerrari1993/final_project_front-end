import { createRouter, createWebHistory } from 'vue-router';

import PageHome from './pages/PageHome.vue';
import OurTeam from './pages/OurTeam.vue';
import NotFound from './pages/NotFound.vue';
import PageRestaurantDetails from './components/PageRestaurantDetails.vue';

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
    {
      path: `/:restaurant.id/details`,
      name: 'details',
      component: PageRestaurantDetails,
    },
  ],
});
export { router };
