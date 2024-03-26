<template>
  <section class="bg-gold">
    <PageRestaurantDetails v-if="ref" :id="idRestaurant" :logo="getImageUrl(logoRestaurant)"
      :address="addressRestaurant" :name="nameRestaurant" />
    <div v-else>

      <h1 class="madimi-one-regular mb-5 text-center">
        Ristoranti vicino a te
      </h1>

      <!-- test -->

      <h1>Restaurant menu</h1>


      <div class="container px-2">
        <div class="row justify-content-center">
          <div v-for="category in categories" :key="category.id" class="col-sm-3 col-md-3 col-xl-2 p-1 p-2" @click="
      getMyRest(
        restaurant.id,
        restaurant.name,
        restaurant.adress,
        restaurant.logo
      )
      ">
            <div class="d-flex justify-content-center align-items-center">
              <h4 class="madimi-one-regular m-0">
                {{ category.name }}
              </h4>
              <input type="checkbox" :id="category.id" :value="category.id" v-model="selectedCategories" class="mx-1" />
            </div>
          </div>
        </div>
      </div>
      <div class="container px-2">
        <div class="row">

          <div v-for="restaurant in filteredRestaurants" :key="restaurant.id"
            class="col-sm-12 col-md-4 col-xl-3 px-2 py-3" @click="getMyRest(restaurant)">
            <router-link to="/restaurantmenu" class="nav-link">
              <div class="card_link">
                <div class="container resturant_card">
                  <img class="card-img-top" :src="getImageUrl(restaurant.logo)" :alt="restaurant.name" />
                  <div class="card-body">
                    <h5 class="madimi-one-regular text-center mt-2">
                      {{ restaurant.name }}
                    </h5>
                  </div>
                </div>
              </div>
            </router-link>
          </div>

        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios';
import PageRestaurantDetails from './PageRestaurantDetails.vue';
export default {
  name: 'AppContent',
  components: {
    PageRestaurantDetails,
  },
  data() {
    return {
      restaurants: [],
      categories: [],
      selectedCategories: [],
      idRestaurant: '',
      logoRestaurant: '',
      addressRestaurant: '',
      nameRestaurant: '',
      ref: false,
    };
  },
  methods: {
    getImageUrl(logo) {
      return `http://127.0.0.1:8000/storage/${logo}`;
    },
    getMyRest(restaurant) {
      this.idRestaurant = restaurant.id;
      this.nameRestaurant = restaurant.name;
      this.addressRestaurant = restaurant.adress;
      this.logoRestaurant = restaurant.logo;
      this.ref = !this.ref;
      console.log('hai cliccato', restaurant.id);
      console.log(this.ref);
    },
    fetchCategoriesAndRestaurants() {
      axios
        .all([
          axios.get('http://127.0.0.1:8000/api/categories'),
          axios.get('http://127.0.0.1:8000/api/restaurants'),
        ])
        .then(
          axios.spread((categoriesRes, restaurantsRes) => {
            this.categories = categoriesRes.data.results;
            this.restaurants = restaurantsRes.data.results;
            console.log(this.restaurants);
          })
        )
        .catch(err => {
          console.error('Error fetching data:', err);
        });
    },
  },

  computed: {
    filteredRestaurants() {
      if (this.selectedCategories.length === 0) {
        return this.restaurants;
      } else {
        return this.restaurants.filter(restaurant => {
          return restaurant.categories.some(category => {
            return this.selectedCategories.includes(category.id);
          });
        });
      }
    },
  },
  mounted() {
    this.fetchCategoriesAndRestaurants();
  },

};

</script>

<style lang="scss">
.resturant_card {
  background-color: white;
  border: 1px solid rgb(237, 237, 237);
  border-radius: 5px;
  box-shadow: 10px 5px 5px rgb(255, 214, 188);
  transition: 100ms;

  &:hover {
    box-shadow: 10px 5px 5px rgb(255, 200, 123);
  }

  img {
    height: 300px;
    object-fit: contain;
    object-position: center;
  }
}

.card_link {
  color: black;
  text-decoration: none;
}

.bg-gold {
  background-color: rgb(255, 249, 226);
}
</style>
