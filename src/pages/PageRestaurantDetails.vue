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
      arrDish:[],
    };
  },
  mounted(){
    const t = this
    axios
      .get('http://localhost:8000/api/dishes', {
        params: {
          idRest: this.id,
        }
      })
      .then(res => {
        t.arrDish = res.data.dishes;
        console.log(t.arrDish);
      })
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
          <h3 class="mb-0">{{ name }}</h3>
          <div class="mb-1 text-muted">{{ address }}</div>
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
    <div class="card col-12 col-sm-5 col-md-3" style="width: 18rem" v-for="eleDish in arrDish">
      <img
        src="https://www.pugliainesclusiva.it/puglia/wp-content/uploads/2015/02/spaghetti-allo-scoglio-1.jpg"
        class="card-img-top"
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
</style>
