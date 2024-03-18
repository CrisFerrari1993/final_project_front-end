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
    },
    getLinkId(restaurant) {
      console.log('Hai cliccato il link numero: ', restaurant.id);
    },
  },
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
          :key="restaurant.id"
          class="col-sm-12 col-md-4 col-xl-3 px-2 py-3"
          @clik="getLinkId()"
        >
          <a class="card_link" href="#">
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
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style>
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
