<script>
import { store } from "../store.js";
import axios from "axios";
import dropin from "braintree-web-drop-in";

export default {
  name: "AppCheckout",

  data() {
    return {
      store,

      paymentData: {
        token: "",
        dish: "",
      },

      orderData: {
        customer_name: "Antonio",
        customer_lastName: "Laikaufz",
        customer_adress: "via iraq",
        customer_mail_adress: "obaoba@billLaden.org",
        restaurant_id: 4,
        customer_number: "",
        customer_phone_number: "666666666",

        dishes: [
          { id: 2, quantity: 1, name: "Pizza", price: 10 },
          { id: 4, quantity: 2, name: "Pasta", price: 10 },
        ],
      },

      //   {
      //   "token" : "fake-valid-nonce",
      //     "dish" : 19
      // }
    };
  },

  methods: {
    // metodo cl click del bottone paga
    prova() {
      this.dropInInstance.requestPaymentMethod((err, payload) => {
        if (err) {
          console.error("Errore nella richiesta del metodo di pagamento:", err);
          this.onError(err);
          return;
        }
        // richiama il metodo onSuccess
        // Qui invii il payload.nonce al tuo server per processare il pagamento tramite Braintree
        // console.log("Nonce ottenuto:", payload.nonce);
        this.onSuccess(payload);
      });
    },

    // metodo richiamato se il pagamento è andato a buon fine
    onSuccess(payload) {
      let nonce = payload.nonce;
      this.orderData.token = nonce;

      const storedData = JSON.parse(localStorage.getItem("cartItems") || "{}");

      const productIds = {};
      storedData.forEach((order) => {
        const { id, price } = order;
        // Se l'ID del piatto è già presente, aggiungi il prezzo al totale
        // Altrimenti, crea una nuova voce nell'oggetto
        if (productIds[id]) {
          productIds[id] += price;
        } else {
          productIds[id] = price;
        }
      });

      this.paymentData = {
        token: nonce,
        dish: productIds,
      };

      console.log("Prodotti", productIds);

      axios
        .post("http://127.0.0.1:8000/api/makePayment", this.paymentData)

        .then((res) => {
          // Dopo aver completato il pagamento tramite Braintree, invia i dati del form al server
          this.chiamata();
          console.log(res);
        })

        .catch((err) => {
          console.log(err);
        });

      // debug
      // console.log(nonce);
      // Do something great with the nonce...
    },

    onError(error) {
      // let message = error.message;
      // Whoops, an error has occured while trying to get the nonce
    },

    chiamata() {
      let button = document.getElementById("invio");

      button.addEventListener("click", function (event) {
        const takeInfo = {};

        // Recupera i dati dal localStorage e parsa l'oggetto JSON
        const storedData = JSON.parse(
          localStorage.getItem("cartItems") || "{}"
        );

        // Itera attraverso gli ordini in storedData e aggiungi le informazioni a takeInfo
        storedData.forEach((order, index) => {
          const { id, restaurant_id } = order;
          // Aggiungi le informazioni direttamente a orderData come coppie chiave-valore
          this.orderData[index] = { id, restaurant_id };
        });

        console.log(this.orderData);

        axios
          .post("http://127.0.0.1:8000/api/create/order", this.orderData)

          .then((res) => {
            // debug
            console.log(
              "Questi sono i dati che verranno passati al database",
              this.orderData
            );
            console.log("parametri inviati: ");
          })

          .catch((err) => {
            console.log(err);
          });
      });
    },

    calculateTotal() {
      let total = 0;
      this.store.cartItems.forEach((item) => {
        total += item.price * item.quantity;
      });
      return total;
    },
  },

  mounted() {
    axios.get("http://127.0.0.1:8000/api/generate").then((res) => {
      let token = null;
      token = res.data.token;
      console.log(token);
      dropin.create(
        {
          authorization: token,
          container: "#dropin-container",
          //traduzione form
          locale: "it_IT",
        },
        (error, dropinInstance) => {
          if (error) {
            console.error(error);
          } else {
            this.dropInInstance = dropinInstance;
          }
        }
      );
      return {
        token: token,
      };
    });
  },
};
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-12 col-md-12 col-xl-12">
        <h1>Riepilogo ordine</h1>

        <div class="container">
          <div class="row">
            <div class="col-sm-12 col-md-12 col-xl-12">
              <table class="table table-stripied">
                <thead>
                  <tr>
                    <th scope="col">Nome prodotto</th>
                    <th scope="col">Prezzo</th>
                    <th scope="col">Quantità</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in this.store.cartItems">
                    <td>
                      {{ item.name }}
                    </td>
                    <td>{{ item.price }}€</td>
                    <td>
                      {{ item.quantity }}
                    </td>
                  </tr>
                  <tr>
                    <td>Totale</td>
                    <td>{{ calculateTotal() }}€</td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-12 col-md-12 col-xl-12 text-center">
        <!-- form dati cliente -->
        <form @submit.prevent="chiamata" method="POST">
          <div class="mb-3">
            <label for="customer_name" class="form-label">Nome</label>
            <input
              v-model="orderData.customer_name"
              type="text"
              class="form-control"
              id="customer_name"
            />
          </div>

          <div class="mb-3">
            <label for="customer_surname" class="form-label">Cognome</label>
            <input
              v-model="orderData.customer_surname"
              type="text"
              class="form-control"
              id="customer_surname"
            />
          </div>

          <div class="mb-3">
            <label for="customer_address" class="form-label"
              >Indirizzo del cliente</label
            >
            <input
              v-model="orderData.customer_address"
              type="text"
              class="form-control"
              id="customer_address"
            />
          </div>

          <div class="mb-3">
            <label for="customer_number" class="form-label"
              >Telefono del cliente</label
            >
            <input
              v-model="orderData.customer_number"
              type="text"
              class="form-control"
              id="customer_number"
            />
          </div>

          <button id="invio" type="submit" class="btn btn-primary">
            INVIA
          </button>
        </form>

        <h1>Inserisci i dati di pagamento</h1>

        <!-- form dati carta -->
        <div id="dropin-container" class="mt-5"></div>
        <div>{{ invio_dati }}</div>
        <button @click="prova"></button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
