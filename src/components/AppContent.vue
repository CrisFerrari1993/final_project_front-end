<template>
  <section>
    <h1 class="madimi-one-regular mt-5 mb-5 text-center">
      Ristoranti vicino a te
    </h1>
    <div class="container px-2">
      <div class="row justify-content-center">
        <div
          v-for="category in categories"
          class="col-sm-3 col-md-3 col-xl-2 p-1"
        >
          <label :for="category.name" />{{ category.name }}
          <input type="checkbox" :id="category.id" :name="category.name" />
        </div>
      </div>
    </div>
    <div class="container px-2">
      <div class="row">
        <div
          v-for="restaurant in restaurants"
          :key="restaurant.id"
          class="col-sm-12 col-md-4 col-xl-3 px-2 py-3"
          @click="getLinkId()"
        >
          <div
            class="card_link"
            @click="
              getMyRest(
                restaurant.id,
                restaurant.name,
                restaurant.adress,
                restaurant.logo
              )
            "
          >
            <div class="container resturant_card">
              <img
                class="card-img-top"
                :src="getImageUrl(restaurant.logo)"
                :alt="restaurant.name"
              />
              <div class="card-body">
                <h5 class="madimi-one-regular text-center mt-2">
                  {{ restaurant.name }}
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import axios from 'axios';
export default {
  name: 'AppContent',
  data() {
    return {
      restaurants: [],
      categories: [],
    };
  },
  methods: {
    getImageUrl(logo) {
      return `http://127.0.0.1:8000/storage/${logo}`;
    },
    getLinkId(restaurants) {
      console.log(this.restaurants.id);
    },
    getMyRest(id, name, address, logo) {
      this.idRestaurant = id;
      this.nameRestaurant = name;
      this.addressRestaurant = address;
      this.logoRestaurant = logo;
      this.ref = !this.ref;
    },
  },
  mounted() {
    axios
      .get('http://127.0.0.1:8000/api/categories')
      .then(res => {
        const data = res.data.results;
        this.categories = data;
        console.log(this.categories);
      })
      .catch(err => {
        console.log(err);
      }),
      axios
        .get('http://127.0.0.1:8000/api/restaurants')
        .then(res => {
          const data = res.data.results;
          this.restaurants = data;
          console.log(this.restaurants);
        })
        .catch(err => {
          console.log(err);
        });
  },
};
</script>
<style lang="scss">
.resturant_card {
  border: 1px solid rgb(237, 237, 237);
  border-radius: 5px;
  box-shadow: 10px 5px 5px rgb(241, 241, 241);
  transition: 100ms;
  &:hover {
    box-shadow: 10px 5px 5px rgb(188, 188, 188);
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
</style>
