import { createRouter, createWebHistory } from 'vue-router';

import PageHome from './pages/PageHome.vue';
import OurTeam from './pages/OurTeam.vue';
import NotFound from './pages/NotFound.vue';
import RestaurnatMenu from './pages/RestaurnatMenu.vue';
import PageRestaurantDetails from './components/PageRestaurantDetails.vue';
import AppCheckout from './components/AppCheckout.vue';

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

    {
      path: '/checkout',
      name: 'checkout',
      component: AppCheckout,
    },

    {
      path: '/restaurantmenu',
      name: 'RestaurnatMenu',
      component: RestaurnatMenu,
    },



  ],

});
export { router };
