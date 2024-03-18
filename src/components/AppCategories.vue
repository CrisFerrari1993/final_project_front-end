<script>
import axios, { Axios } from 'axios';
export default {
  name: 'AppCategories',
  data() {
    return {
      categories: [],
    };
  },
  mounted() {
    axios
      .get('http://localhost:8000/api/v1/categories')
      .then(res => {
        const data = res.data;
        this.categories = data.categories;
      })
      .catch(err => {
        console.log(err);
      });
  },
};
</script>
<template>
  <section class="categories p-5 text-center">
    <img
      data-v-0e6b1c7c=""
      src="https://glovoapp.com/images/landing/cities.svg"
      data-test-id="location-title-image"
      width="140"
      height="140"
      role="presentation"
      loading="lazy"
    />
    <h1 class="madimi-one-regular mt-2 mb-5 text-center">
      Categorie più richieste a Milano
    </h1>
    <div class="container">
      <div class="row justify-content-center">
        <div
          v-for="category in categories"
          class="col-sm-12 col-md-3 col-xl-2 mb-2 text-center"
        >
          <a class="badge rounded-pill bg-gold text-dark" href="#">
            <h5 class="m-0 madimi-one-regular">{{ category.name }}</h5>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
<style>
.categories {
  background-color: rgb(235, 235, 235);
  a {
    text-decoration: none;
  }
  .bg-gold {
    background-color: #fff3da;
  }
}
</style>
