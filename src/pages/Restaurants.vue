<script>
import axios from 'axios';

export default {
  name: 'Restaurants',
  data() {
    return {
      restaurants: [],
    };
  },
  mounted() {
    axios
      .get('http://localhost:8000/api/v1/restaurants')
      .then(res => {
        const data = res.data;
        this.restaurants = data.restaurants;
        console.log(data);
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    getImageUrl(logo) {
      return `http://127.0.0.1:8000/storage/${logo}`;
    }
  }
};
</script>

<template>
  <section>
    <h1 class="madimi-one-regular mt-5 mb-5 text-center">
      Ristoranti vicino a te
    </h1>
    <div class="container px-2">
      <div class="row">
        <div
          v-for="restaurant in restaurants"
          class="col-sm-12 col-md-4 col-xl-3 p-2"
        >
          <div class="container">
            <h6 class="madimi-one-regular text-center">
              {{ restaurant.name }}
            </h6>
            <p>{{ restaurant.adress }}</p>
            <img :src="getImageUrl(restaurant.logo)" :alt="restaurant.name" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style></style>
