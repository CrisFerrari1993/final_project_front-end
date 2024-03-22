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

    mounted() {
      braintree.client.create({
        authorization: "YOUR_AUTHORIZATION_KEY"
      })
        .then(clientInstance => {
          let options = {
            client: clientInstance,
            styles: {
              input: {
                'font-size': '14px',
                'font-family': 'Open Sans'
              }
            },
            fields: {
              number: {
                selector: '#creditCardNumber',
                placeholder: 'Enter Credit Card'
              },
              cvv: {
                selector: '#cvv',
                placeholder: 'Enter CVV'
              },
              expirationDate: {
                selector: '#expireDate',
                placeholder: '00 / 0000'
              }
            }
          }
          return braintree.hostedFields.create(options)
        })
        .then(hostedFieldInstance => {
          // @TODO - Use hostedFieldInstance to send data to Braintree
        })
        .catch(err => {
        });
    },

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
        <form>
          <div class="form-group">
            <label for="amount">Amount</label>
            <div class="input-group">
              <div class="input-group-prepend"><span class="input-group-text">€</span></div>
              <input type="number" id="amount" class="form-control" placeholder="Enter Amount">
            </div>
          </div>
          <hr />
          <div class="form-group">
            <label>Credit Card Number</label>
            <div id="creditCardNumber" class="form-control"></div>
          </div>
          <div class="form-group">
            <div class="row">
              <div class="col-6">
                <label>Expire Date</label>
                <div id="expireDate" class="form-control"></div>
              </div>
              <div class="col-6">
                <label>CVV</label>
                <div id="cvv" class="form-control"></div>
              </div>
            </div>
          </div>
        </form>

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
