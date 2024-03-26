<script>
import { store } from "../store.js";
import axios from "axios";
import dropin from "braintree-web-drop-in";

export default {
  name: "AppCheckout",

  data() {
    return {
      store,
      orderData: {
        customer_name: "",
        customer_lastName: "",
        customer_adress: "",
        customer_mail_adress: "",
        customer_phone_number: "",
        restaurant_id: 2,
      },
      dropInInstance: null,
      showPaymentSection: false,
      paymentSuccess: false,
    };
  },

  methods: {
    async submitCustomerData() {
      // Esegui la validazione dei dati del cliente
      if (this.validateCustomerData()) {
        // Mostra la sezione di pagamento
        this.showPaymentSection = true;
        // Inizializza Braintree Drop-in
        await this.initializeBraintree();
      } else {
        alert("Per favore, completa tutti i campi del modulo del cliente.");
      }
    },

    validateCustomerData() {
      // Esegui la tua logica di validazione dei dati del cliente
      // Restituisci true se i dati sono validi, altrimenti false
      return true; // Esempio di validazione semplice, modifica secondo le tue esigenze
    },

    async initializeBraintree() {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/generate");
        const token = res.data.token;
        this.dropInInstance = await dropin.create({
          authorization: token,
          container: "#dropin-container",
          locale: "it_IT",
        });
      } catch (error) {
        console.error("Errore durante l'inizializzazione di Braintree:", error);
      }
    },

    async submitPayment() {
      try {
        const payload = await new Promise((resolve, reject) => {
          this.dropInInstance.requestPaymentMethod((err, payload) => {
            if (err) {
              reject(err);
            } else {
              resolve(payload);
              console.log('andato@')
            }
          });
        });
        const paymentResponse = await this.makePayment(payload.nonce);

        // Se il pagamento è andato a buon fine, imposta paymentSuccess su true
        this.paymentSuccess = true;

        // Se il pagamento è andato a buon fine, invia i dati dell'ordine al server
        if (paymentResponse.success) {
          await this.sendOrderData();
        } else {
          console.error("Il pagamento non è andato a buon fine:", paymentResponse.error);
        }
      } catch (error) {
        console.error("Errore durante il pagamento:", error);
      }
    }, async makePayment(nonce) {
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
      try {
        const response = await axios.post("http://127.0.0.1:8000/api/makePayment", this.paymentData);

        // Restituisci la risposta dalla chiamata makePayment
        return response.data;
      } catch (error) {
        console.error("Errore durante la chiamata makePayment:", error);
        return { success: false, error: error.message };
      }
    },

    async sendOrderData() {
      // Verifica se il pagamento è avvenuto con successo
      if (!this.paymentSuccess) {
        console.log("Il pagamento non è stato effettuato con successo. Non inviare l'ordine.");
        return;
      }

      const takeInfo = {};

      // Recupera i dati dal localStorage e parsa l'oggetto JSON
      const storedData = JSON.parse(localStorage.getItem("cartItems") || "[]");

      // Itera attraverso gli ordini in storedData e aggiungi le informazioni a takeInfo
      storedData.forEach((order, index) => {
        const { id, quantity } = order;
        // Aggiungi informazioni a takeInfo
        takeInfo[index] = { id, quantity };
        // Aggiungi informazioni a piattiArray
      });

      const requestData = {
        orderData: [{
          customer_name: this.orderData.customer_name,
          customer_lastName: this.orderData.customer_lastName,
          customer_adress: this.orderData.customer_adress,
          customer_mail_adress: this.orderData.customer_mail_adress,
          customer_phone_number: this.orderData.customer_phone_number,
          restaurant_id: this.orderData.restaurant_id
        }],
        takeInfo: takeInfo
      };

      try {
        const response = await fetch('http://127.0.0.1:8000/api/create/order', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(requestData)
        });

        if (!response.ok) {
          throw new Error('Errore durante la richiesta.');
        } else {
          // inserire pagine di ringraziamento
        }

        const data = await response.json();
        console.log('Risposta dal server:', data);
      } catch (error) {
        console.error('Errore durante l\'invio dell\'ordine:', error);
      }
    },

    calculateTotal() {
      let total = 0;
      this.store.cartItems.forEach((item) => {
        total += item.price * item.quantity;
      });
      return total;
    },
  },
};
</script>

<template>
  <div class="container">
    <!-- Riepilogo ordine -->
    <div class="row">
      <div class="col-sm-12 col-md-12 col-xl-12">
        <h1>Riepilogo ordine</h1>
        <div class="container">
          <div class="row">
            <div class="col-sm-12 col-md-12 col-xl-12">
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">Nome prodotto</th>
                    <th scope="col">Prezzo</th>
                    <th scope="col">Quantità</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in store.cartItems" :key="index">
                    <td>{{ item.name }}</td>
                    <td>{{ item.price }}€</td>
                    <td>{{ item.quantity }}</td>
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
    <!-- Form dati cliente -->
    <div class="row">
      <div class="col-sm-12 col-md-12 col-xl-12 text-center">
        <form ref="customerForm" @submit.prevent="submitCustomerData">
          <div class="mb-3">
            <label for="customer_name" class="form-label">Nome</label>
            <input v-model="orderData.customer_name" type="text" class="form-control" id="customer_name" />
          </div>
          <div class="mb-3">
            <label for="customer_surname" class="form-label">Cognome</label>
            <input v-model="orderData.customer_lastName" type="text" class="form-control" id="customer_surname" />
          </div>
          <div class="mb-3">
            <label for="customer_address" class="form-label">Indirizzo del cliente</label>
            <input v-model="orderData.customer_adress" type="text" class="form-control" id="customer_address" />
          </div>
          <div class="mb-3">
            <label for="customer_number" class="form-label">Telefono del cliente</label>
            <input v-model="orderData.customer_phone_number" type="tel" class="form-control" id="customer_number" />
          </div>
          <div class="mb-3">
            <label for="customer_mail_adress" class="form-label">Indirizzo email</label>
            <input v-model="orderData.customer_mail_adress" type="text" class="form-control" id="customer_mail_adress" />
          </div>
          
          <button id="invio" type="submit" class="btn btn-primary">INVIA</button>
        </form>

        <!-- Inserisci i dati di pagamento -->
        <div v-if="showPaymentSection">
          <h1>Inserisci i dati di pagamento</h1>
          <div id="dropin-container" class="mt-5"></div>
          <button @click="submitPayment" class="btn btn-primary">PAGA</button>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped lang="scss"></style>
