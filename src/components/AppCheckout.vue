<script>
import { store } from "../store.js";
import axios from "axios";
import dropin from "braintree-web-drop-in";

export default {

  name: "AppCheckout",

  data() {
    return {

      store,

      userData: {
        customer_name: "Antonio",
        customer_lastName: "",
        customer_adress: "",
        customer_mail_adress: "",
        restaurant_id: "1",
        customer_number: "",
        customer_phone_number: "",
      },

      orderData: {
        "token": "",
        // "dish": 29
      }

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

        // Dopo aver completato il pagamento tramite Braintree, invia i dati del form al server
        this.chiamata();

      });
    },

    onSuccess(payload) {
      let nonce = payload.nonce;
      this.orderData.token = nonce;
      // debug
      // console.log(nonce);
      // Do something great with the nonce...
    },

    onError(error) {
      // let message = error.message;
      // Whoops, an error has occured while trying to get the nonce
    },

    chiamata() {
      axios
        .post(
          'http://127.0.0.1:8000/api/newOrder',
          this.userData
        )

        .then((res) => {
          // debug
          console.log("Questi sono i dati che verranno passati al database", this.userData)
        })

        .catch((err) => {
          console.log(err)
        })

    },

    // async submitOrder() {
    //   try {
    //     const response = await axios.post(
    //       this.store.apiUrl + this.store.apiOrders,
    //       this.orderData
    //     );
    //     console.log(response.data);
    //   } catch (error) {
    //     console.error(error);
    //   }
    // },

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
        <form @submit.prevent="submitOrder" method="POST">
          <div class="mb-3">
            <label for="customer_name" class="form-label">Nome</label>
            <input v-model="orderData.customer_name" type="text" class="form-control" id="customer_name" />
          </div>

          <div class="mb-3">
            <label for="customer_surname" class="form-label">Cognome</label>
            <input v-model="orderData.customer_surname" type="text" class="form-control" id="customer_surname" />
          </div>

          <div class="mb-3">
            <label for="customer_address" class="form-label">Indirizzo del cliente</label>
            <input v-model="orderData.customer_address" type="text" class="form-control" id="customer_address" />
          </div>

          <div class="mb-3">
            <label for="customer_number" class="form-label">Telefono del cliente</label>
            <input v-model="orderData.customer_number" type="text" class="form-control" id="customer_number" />
          </div>

          <button type="submit" class="btn btn-primary">INVIA</button>

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
