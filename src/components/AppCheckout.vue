<script>
import { store } from '../store.js';
import axios from 'axios';

import braintree from 'braintree-web';

export default {

  name: 'AppCheckout',

  data() {
    return {
      store,
      orderData: {
        customer_name: '',
        customer_surname: '',
        customer_address: '',
        customer_number: '',
        total_order: '100',
        state_payment: 1,
      },
    };
  },

  props: {
    authorization: {
      required: true,
      type: String
    }
  },

  methods: {



    async submitOrder() {
      try {
        const response = await axios.post(
          this.store.apiUrl + this.store.apiOrders,
          this.orderData
        );
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    },

    calculateTotal() {
      let total = 0;
      this.store.cartItems.forEach(item => {
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

  }

};
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col-8">
        <h1>Riepilogo ordine</h1>

        <div class="container">
          <div class="row">
            <div class="col-12 mt-2">
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
      <div class="col-8">
        <h1>Inserisci i dati di pagamento</h1>

        <!-- form di test -->
        <div id="dropin-container" class="mt-5"></div>

        <v-braintree
          authorization="eyJ2ZXJzaW9uIjoyLCJhdXRob3JpemF0aW9uRmluZ2VycHJpbnQiOiJleUowZVhBaU9pSktWMVFpTENKaGJHY2lPaUpGVXpJMU5pSXNJbXRwWkNJNklqSXdNVGd3TkRJMk1UWXRjMkZ1WkdKdmVDSXNJbWx6Y3lJNkltaDBkSEJ6T2k4dllYQnBMbk5oYm1SaWIzZ3VZbkpoYVc1MGNtVmxaMkYwWlhkaGVTNWpiMjBpZlEuZXlKbGVIQWlPakUzTVRFME5EZzVNRGNzSW1wMGFTSTZJbU00WmpNek1UTTFMVGt4WldRdE5EWTNZeTA1TmpaaUxUSTFOVFE0TXpFeU1qVTVZaUlzSW5OMVlpSTZJbUpyWW01NGQycHdOWGhrY0djMWF6a2lMQ0pwYzNNaU9pSm9kSFJ3Y3pvdkwyRndhUzV6WVc1a1ltOTRMbUp5WVdsdWRISmxaV2RoZEdWM1lYa3VZMjl0SWl3aWJXVnlZMmhoYm5RaU9uc2ljSFZpYkdsalgybGtJam9pWW10aWJuaDNhbkExZUdSd1p6VnJPU0lzSW5abGNtbG1lVjlqWVhKa1gySjVYMlJsWm1GMWJIUWlPbVpoYkhObGZTd2ljbWxuYUhSeklqcGJJbTFoYm1GblpWOTJZWFZzZENKZExDSnpZMjl3WlNJNld5SkNjbUZwYm5SeVpXVTZWbUYxYkhRaVhTd2liM0IwYVc5dWN5STZlMzE5LmdpNmNUTW54STdQRW5KcnVWSG1jdmdSVTU1ZTBoTzVONWw1RHJYWFFzeWdJV1hCZGZBYW1zb2h2Vi1kWjNFWkp0RUJkYlIyeENITHI1cm5XcTdhMUFnIiwiY29uZmlnVXJsIjoiaHR0cHM6Ly9hcGkuc2FuZGJveC5icmFpbnRyZWVnYXRld2F5LmNvbTo0NDMvbWVyY2hhbnRzL2JrYm54d2pwNXhkcGc1azkvY2xpZW50X2FwaS92MS9jb25maWd1cmF0aW9uIiwiZ3JhcGhRTCI6eyJ1cmwiOiJodHRwczovL3BheW1lbnRzLnNhbmRib3guYnJhaW50cmVlLWFwaS5jb20vZ3JhcGhxbCIsImRhdGUiOiIyMDE4LTA1LTA4IiwiZmVhdHVyZXMiOlsidG9rZW5pemVfY3JlZGl0X2NhcmRzIl19LCJjbGllbnRBcGlVcmwiOiJodHRwczovL2FwaS5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tOjQ0My9tZXJjaGFudHMvYmtibnh3anA1eGRwZzVrOS9jbGllbnRfYXBpIiwiZW52aXJvbm1lbnQiOiJzYW5kYm94IiwibWVyY2hhbnRJZCI6ImJrYm54d2pwNXhkcGc1azkiLCJhc3NldHNVcmwiOiJodHRwczovL2Fzc2V0cy5icmFpbnRyZWVnYXRld2F5LmNvbSIsImF1dGhVcmwiOiJodHRwczovL2F1dGgudmVubW8uc2FuZGJveC5icmFpbnRyZWVnYXRld2F5LmNvbSIsInZlbm1vIjoib2ZmIiwiY2hhbGxlbmdlcyI6W10sInRocmVlRFNlY3VyZUVuYWJsZWQiOnRydWUsImFuYWx5dGljcyI6eyJ1cmwiOiJodHRwczovL29yaWdpbi1hbmFseXRpY3Mtc2FuZC5zYW5kYm94LmJyYWludHJlZS1hcGkuY29tL2JrYm54d2pwNXhkcGc1azkifSwicGF5cGFsRW5hYmxlZCI6dHJ1ZSwicGF5cGFsIjp7ImJpbGxpbmdBZ3JlZW1lbnRzRW5hYmxlZCI6dHJ1ZSwiZW52aXJvbm1lbnROb05ldHdvcmsiOnRydWUsInVudmV0dGVkTWVyY2hhbnQiOmZhbHNlLCJhbGxvd0h0dHAiOnRydWUsImRpc3BsYXlOYW1lIjoiVGVzdCIsImNsaWVudElkIjpudWxsLCJiYXNlVXJsIjoiaHR0cHM6Ly9hc3NldHMuYnJhaW50cmVlZ2F0ZXdheS5jb20iLCJhc3NldHNVcmwiOiJodHRwczovL2NoZWNrb3V0LnBheXBhbC5jb20iLCJkaXJlY3RCYXNlVXJsIjpudWxsLCJlbnZpcm9ubWVudCI6Im9mZmxpbmUiLCJicmFpbnRyZWVDbGllbnRJZCI6Im1hc3RlcmNsaWVudDMiLCJtZXJjaGFudEFjY291bnRJZCI6InRlc3QiLCJjdXJyZW5jeUlzb0NvZGUiOiJFVVIifX0="
          @success="onSuccess" @error="onError">
        </v-braintree>

        <!-- <form @submit.prevent="submitOrder" method="POST">
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

          <div class="mb-3">
            <label for="credit_card" class="form-label">Carta di credito</label>
            <input type="text" class="form-control" id="customer_number" />
          </div>

          <button type="submit" class="btn btn-primary">INVIA</button>

          <div
            class="modal fade text-dark"
            id="staticBackdrop"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabindex="-1"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h1 class="modal-title fs-5" id="staticBackdropLabel">
                    ORDINE INVIATO
                  </h1>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    chiudi
                  </button>
                  
                </div>
              </div>
            </div>
          </div>
        </form> -->
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
