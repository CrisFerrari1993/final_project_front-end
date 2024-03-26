<script>

import { store } from '../store';

export default {

  name: 'AppNabar',

  data() {
    return {
      store,
    };
  },

  // created() {

  //   // al refresh della pagina il carrello mantiene la memoria
  //   const cartItems = JSON.parse(localStorage.getItem('cartItems'));
  //   if (cartItems) {
  //     this.store.cartItems = cartItems;
  //   }

  // },

  methods: {

    // aggiunta del prodotto al carrelo
    addToCart(product) {
      const cartProduct = this.store.cartItems.find(
        item => item.id === product.id
      );
      if (cartProduct) {
        // Se il prodotto è già nel carrello, rimuovilo
        this.removeFromCart(cartProduct.id);
      } else {
        // Altrimenti, aggiungi il prodotto al carrello
        product.quantity = 1;
        this.store.cartItems.push(product);
        product.isAdded = true;
      }

    },

    // rimozione del prodotto dal carrello
    removeFromCart(productId) {
      const index = this.store.cartItems.findIndex(
        item => item.id === productId
      );
      if (index !== -1) {
        this.store.cartItems.splice(index, 1);
        const product = this.store.products.find(
          product => product.id === productId
        );
        if (product) {
          product.isAdded = false;
        }
      }

    },

    // incrementa quantità
    incrementQuantity(index) {
      this.store.cartItems[index].quantity++;
    },

    // decremeneta quantità
    decrementQuantity(index) {
      if (this.store.cartItems[index].quantity > 1) {
        this.store.cartItems[index].quantity--;
      }
    },

    // elimina piatto dal carrello
    deleteDish(index) {
      this.store.cartItems.splice(index, 1);
    },

    changeCheck() {
      this.store.refToCheck = !this.store.refToCheck;
    }
  },

  computed: {

    // somma quantità
    totalCartItems() {
      return this.store.cartItems.reduce(
        (total, item) => total + item.quantity,
        0
      );
    },

    // somma dei prezzi
    totalOrderPrice() {
      return index =>
        (
          this.store.cartItems[index].price *
          this.store.cartItems[index].quantity
        ).toFixed(2);
    },

  },

};

</script>

<template>

  <body>

    <!-- Barra di navigazione principale -->
    <nav class="navbar navbar-expand-lg bg-yellow navBar d-flex justify-content-between">

      <!-- Logo e nome dell'applicazione, cliccabile per tornare alla homepage -->
      <a class="navbar-brand d-flex" href="/">
        <img class="nav_img" src="https://dhhvideos.s3.eu-central-1.amazonaws.com/Delivery-Hero-Comet.png"
          alt="Logo DeliveBoo" />
        <!-- Nome dell'applicazione -->
        <h2 class="img_title"><strong>DeliveBoo</strong></h2>
      </a>

      <!-- Bottone per il menu a tendina su dispositivi mobili -->
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Elementi del menu di navigazione -->
      <div class="collapse navbar-collapse" id="navbarSupportedContent">

        <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight"
          aria-controls="offcanvasRight">
          Carrello
        </button>

        <ul class="navbar-nav me-0 mb-2 mb-lg-0">
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown"
              aria-expanded="false">
              Per i ristoratori
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li>
                <a class="dropdown-item" href="http://localhost:8000/register">Registrati</a>
                <!-- Link per la registrazione dei ristoratori -->
              </li>
              <li>
                <a class="dropdown-item" href="http://localhost:8000/login">Entra</a>
                <!-- Link per il login dei ristoratori -->
              </li>
            </ul>
          </li>
        </ul>

      </div>
    </nav>

    <!-- elementi del menu offcanvas -->
    <div class="offcanvas offcanvas-end width-custom" tabindex="-1" id="offcanvasRight"
      aria-labelledby="offcanvasRightLabel">
      <div class="offcanvas-header">

        <!-- titolo -->
        <h5 id="offcanvasRightLabel">Il tuo carrello</h5>

        <!-- bottone per chiudere il menu offcanvas -->
        <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>

      </div>

      <!-- body del menu offcanvas -->
      <div class="offcanvas-body">
        <div class="row">
          <div class="col-12 d-flex">

            <!-- se il carrello è vuoto -->
            <div class="EmptyCart text-center" v-if="store.cartItems.length === 0">
              Il carrello è vuoto
            </div>

            <!-- se sono presenti elementi nel carrello -->
            <div v-else>

              <!-- intestazioni -->
              <div class="d-flex">
                <div class="ProdottoStyle">Prodotto</div>
                <div class="PrezzoStyle">Prezzo</div>
                <div class="QuantitaStyle">Quantità</div>
              </div>

              <!-- dettagli del prodotto -->
              <ul class="" v-if="store.cartItems.length > 0">
                <li class="d-flex align-items-center" v-for="(item, index) in store.cartItems" :key="index">
                  <div class="d-flex align-items-center liststyle">
                    <!-- nome prodotto -->
                    <div class="NameStyle">
                      {{ item.name }}
                    </div>
                    <!-- prezzo prodotto -->
                    <div class="PriceStyle">{{ totalOrderPrice(index) }}€</div>
                  </div>
                  <!-- quantità -->
                  <div>
                    <div class="ButtonContainer">
                      <!-- rimuovi -->
                      <button class="decrease-button m-2" @click="decrementQuantity(index)">
                        -
                      </button>
                      <!-- quantità attuale -->
                      <div class="QuantityStyle">
                        {{ item.quantity }}
                      </div>
                      <!-- aggiungi -->
                      <button class="increase-button m-2" @click="incrementQuantity(index)">
                        +
                      </button>
                      <!-- elimina dal carrello -->
                      <button class="increase-button m-2" @click="deleteDish(index)">
                        X
                      </button>
                    </div>
                  </div>
                </li>
              </ul>

              <!-- bottone check-out -->
              <div class="div d-flex justify-content-center">
                <button class="ProdottoStyle" @click="changeCheck()">CHECKOUT</button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </body>

</template>

<style lang="scss">
@import '../styles/general.scss'; //Importazione degli stili generali

.width-custom {
  min-width: 600px;
}

.navBar {
  background-color: #ffc244;

  .nav_img {
    width: 50px;
  }

  .img_title {
    color: #d82128;
    display: inline;
    margin: 0;
  }
}

.modal-backdrop {
  display: none;
}

.cart-icon {
  position: absolute;
  top: 18px;
  right: 70px;
  width: 20px;
  height: 20px;
  background-color: rgb(217, 0, 0);
  color: white;
  border-radius: 50%;
  padding: 5px;
  text-align: center;

  p {
    font-size: 12px;
    margin: 0 !important;
    line-height: 10px;
    font-weight: 800;
  }
}

.ProdottoStyle {
  margin: 0px 5px 10px 20px;
  padding: 8px 10px;
  color: #000000;
  border: 2px solid #333;
  border-radius: 5px;
  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;
  height: 41px;
}

.totalpriceStyle {
  margin: 0px 5px 10px 20px;
  padding: 8px 10px;
  color: #000000;
  border: 2px solid #333;
  border-radius: 5px;
  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;
  height: 41px;
}

.PrezzoStyle {
  margin: 0px 20px 10px 22px;
  padding: 8px 10px;
  color: #000000;
  border: 2px solid #333;
  border-radius: 5px;
  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;
  height: 41px;
}

.QuantitaStyle {
  margin: 0px 20px 10px 25px;
  padding: 8px 10px;
  color: #000000;
  border: 2px solid #333;
  border-radius: 5px;
  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;
  height: 41px;
}

.PrezzoTotaleStyle {
  margin: 0px 10px 10px 25px;
  padding: 8px 10px;
  color: #000000;
  border: 2px solid #333;
  border-radius: 5px;
  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;
  height: 41px;
}

.QuantityStyle {
  color: #000000;
  border: 2px solid #333;
  padding: 8px 15px;
  border-radius: 5px;
  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;
  height: 41px;
  margin-left: 17px;
  margin-right: 35px;
}

.EmptyCart {
  font-weight: bold;
  font-size: 30px;
}

.priceStyle {
  margin-left: 30px;
}

.liststyle {
  width: 250px;
}

.NameStyle {
  width: 120px;
}

.ButtonContainer {
  display: flex;
  width: 200px;
  align-items: center;
}

.remove-button {
  background-color: transparent;
  color: #333;
  border: 2px solid #333;
  padding: 8px 15px;
  border-radius: 5px;
  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;
  height: 41px;
}

.decrease-button {
  background-color: transparent;
  color: #333;
  border: 2px solid #333;
  padding: 8px 15px;
  border-radius: 5px;
  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;
  height: 41px;
}

.increase-button {
  background-color: transparent;
  color: #333;
  border: 2px solid #333;
  padding: 8px 15px;
  border-radius: 5px;
  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;
  height: 41px;
}

.decrease-button:hover,
.increase-button:hover {
  background-color: #333;
  color: #fff;
}

.nav {
  height: 80px;
  width: 100%;
  padding: 0 5%;
  background-color: #000000;

  i {
    color: #575756;
    font-size: 15px;
    padding: 0.5rem;
  }

  i:hover {
    color: #000000;
    transition: all 0.3s ease-in-out;
  }
}

.header-btn {
  border-radius: 10px;
  border-style: none;
  background: #64646421;
  margin: 0 0.25rem;
  color: color(#575756 a(0.8));

  span {
    padding-left: 0.5rem;
  }
}

.header-btn:hover {
  background: none;
  transition: all 0.5s ease-in-out;
  border: 1px solid #646464;

  span {
    color: #646464;
  }
}
</style>
