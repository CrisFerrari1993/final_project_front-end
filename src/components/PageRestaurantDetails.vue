<script>
import { store } from "../store";
import axios from "axios";
// import AppCheckout from "./AppCheckout.vue";

export default {
  data() {
    return {
      restaurant: {},
      arrDish: [],
      addedToCartMap:[],
      store,
    };
  },
  created() {

    // Recupera l'ID del ristorante dalla URL
    const restaurantId = this.$route.params.restaurantId;

    // Utilizza l'ID per recuperare i dettagli del ristorante
    axios.get(`http://localhost:8000/api/restaurants/${restaurantId}`)
      .then(response => {
        this.restaurant = response.data.results;
        // console.log(this.restaurant);
      })
      .catch(error => {
        console.error('Errore durante il recupero dei dettagli del ristorante:', error);
      });

  },

  mounted() {

    // Recupera l'ID del ristorante dalla URL
    const restaurantId = this.$route.params.restaurantId;

    axios.get(`http://localhost:8000/api/restaurants/${restaurantId}/dishes`)
      .then((res) => {
        this.arrDish = res.data.results;
        console.log(this.arrDish);
      })
      .catch((error) => {
        console.error("Errore durante il recupero dei piatti del ristorante:", error);
      });

  },
  methods:{
    getImgUrl(url) {
      return `http://127.0.0.1:8000/storage/` + url;
    },
    addToCart(product) {
      this.store.cartItems.push({ ...product, quantity: 1 });
      this.addedToCartMap[product.id] = true;
      localStorage.setItem("cartItems", JSON.stringify(this.store.cartItems));
    },
    removeFromCart(product) {
      const index = this.store.cartItems.findIndex(
        (item) => item.id === product.id
      );
      if (index !== -1) {
        this.store.cartItems.splice(index, 1);
        delete this.addedToCartMap[product.id]; 
        localStorage.setItem("cartItems", JSON.stringify(this.store.cartItems));
      }
    },
  }

}

// export default {
//   name: "PageRestaurantDetails",
//   components: {
//     AppCheckout
//   },
//   props: {
//     id: String,
//     name: String,
//     address: String,
//     logo: String,
//   },
//   data() {
//     return {
//       ref: true,
//       store,
//       arrDish: [],
//       addedToCartMap: {},
//     };
//   },
//   mounted() {
//     const t = this;
//     axios
//       .get(`http://localhost:8000/api/restaurants/${t.id}/dishes`, {
//         params: {
//           idRest: this.id,
//         },
//       })
//       .then((res) => {
//         t.arrDish = res.data.results;
//         console.log(t.arrDish);
//       });
//   },
//   methods: {
//     getImgUrl(url) {
//       return `http://127.0.0.1:8000/storage/` + url;
//     },
//     addToCart(product) {
//       this.store.cartItems.push({ ...product, quantity: 1 });
//       this.addedToCartMap[product.id] = true;
//       localStorage.setItem("cartItems", JSON.stringify(this.store.cartItems));
//     },
//     removeFromCart(product) {
//       const index = this.store.cartItems.findIndex(
//         (item) => item.id === product.id
//       );
//       if (index !== -1) {
//         this.store.cartItems.splice(index, 1);
//         delete this.addedToCartMap[product.id]; 
//         localStorage.setItem("cartItems", JSON.stringify(this.store.cartItems));
//       }
//     },
//   },
// };

</script>

<template>

  <section class="bg-warning">
    <div class="container d-flex justify-content-between py-3 align-items-center">
      <div class="">
        <h3 class="mb-0 madimi-one-regular">{{ restaurant.name }}</h3>
        <h5 class="mb-1 text-muted">{{ restaurant.adress }}</h5>
      </div>
      <!-- DA FIXARE, NON SI VEDE L'IMMAGINE -->
      <div class="">
        <img class="bd-placeholder-img" width="200" height="250" :src="getImgUrl(restaurant.logo)" />
      </div>
    </div>
    <div class="w-100 row justify-content-center">
      <div class="col-12 col-sm-5 col-md-3 p-2" style="width: 18rem" v-for="eleDish in arrDish">
        <div class="content border p-1 text-center bg-light">
          <img :src="getImgUrl(eleDish.image)" class="width_fix mb-2" alt="..." />
          <div class="card-body">
            <h5 class="card-title madimi-one-regular">{{ eleDish.name }}</h5>
            <p class="card-text">
              {{ eleDish.description }}
            </p>
            <div class="d-flex justify-content-around">
              <h5 class="card-title madimi-one-regular d-flex align-items-center">{{ eleDish.price }} €</h5>
              <button v-if="!addedToCartMap[eleDish.id]" type="button" class="btn btn-primary"
                @click="addToCart(eleDish)">
                <i class="fa-solid fa-cart-shopping"></i>
              </button>
              <button v-else type="button" class="btn btn-danger" @click="removeFromCart(eleDish)">
                <i class="fa-solid fa-cart-shopping"></i>
              </button>
            </div>
          </div>
        </div>-
      </div>
    </div>
  </section>

  <!-- <AppCheckout v-if="store.refToCheck" />
  <div v-else>
    <section class="bg-warning">
      <div class="container d-flex justify-content-between py-3 align-items-center">
        <div class="">
          <h3 class="mb-0 madimi-one-regular">{{ name }}</h3>
          <h5 class="mb-1 text-muted">{{ address }}</h5>
        </div>
        <div class="">
          <img class="bd-placeholder-img" width="200" height="250" :src="logo" />
        </div>
      </div>
    </section>
    <div class="w-100 row justify-content-center">
      <div class="col-12 col-sm-5 col-md-3 p-2" style="width: 18rem" v-for="eleDish in arrDish">
        <div class="content border p-1 text-center bg-light">
          <img :src="getImgUrl(eleDish.image)" class="width_fix mb-2" alt="..." />
          <div class="card-body">
            <h5 class="card-title madimi-one-regular">{{ eleDish.name }}</h5>
            <p class="card-text">
              {{ eleDish.description }}
            </p>
            <h5 class="card-title madimi-one-regular">{{ eleDish.price }} €</h5>
            <button v-if="!addedToCartMap[eleDish.id]" type="button" class="btn btn-primary"
              @click="addToCart(eleDish)">
              Aggiungi al carrello
            </button>
            <button v-else type="button" class="btn btn-danger" @click="removeFromCart(eleDish)">
              Rimuovi dal carrello
            </button>
          </div>
        </div>
      </div>
    </div>
  </div> -->

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

.content {
  height: 330px;
}
</style>
