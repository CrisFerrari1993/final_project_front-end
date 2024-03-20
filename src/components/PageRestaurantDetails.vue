<script>
import { store } from '../store';
import axios from 'axios';

export default {
  name: 'PageRestaurantDetails',
  props: {
    id: String,
    name: String,
    address: String,
    logo: String,
  },
  data() {
    return {
      store,
      arrDish: [],
    };
  },
  mounted() {
    const t = this;
    axios
      .get(`http://localhost:8000/api/restaurants/${t.id}/dishes`, {
        params: {
          idRest: this.id,
        },
      })
      .then(res => {
        t.arrDish = res.data.results;
        console.log(t.arrDish);
      });
  },
  methods: {
    getImgUrl(url) {
      return `http://127.0.0.1:8000/storage/` + url;
    },
  },
};
</script>

<template>
  <div class="w-100 row">
    <div class="col-12">
      <div
        class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative"
      >
        <div class="col p-4 d-flex flex-column position-static">
          <h3 class="mb-0 madimi-one-regular">{{ name }}</h3>
          <h5 class="mb-1 madimi-one-regular text-muted">{{ address }}</h5>
        </div>
        <div class="col-auto d-none d-lg-block">
          <img
            class="bd-placeholder-img"
            width="200"
            height="250"
            :src="logo"
          />
        </div>
      </div>
    </div>
  </div>

  <div class="w-100 row justify-content-center">
    <div
      class="card col-12 col-sm-5 col-md-3"
      style="width: 18rem"
      v-for="eleDish in arrDish"
    >
      <img
        :src="getImgUrl(eleDish.image)"
        class="card-img-top width_fix"
        alt="..."
      />
      <div class="card-body">
        <h5 class="card-title">{{ eleDish.name }}</h5>
        <p class="card-text">
          {{ eleDish.description }}
        </p>
        <a href="#" class="btn btn-primary">Ordina</a>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.card {
  margin: 10px;
}
.width_fix {
  width: 100%;
  height: 150px;
  object-fit: cover;
}
</style>
