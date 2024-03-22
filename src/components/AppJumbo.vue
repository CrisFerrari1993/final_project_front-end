<script>
import { store } from '../store';
export default {
  name: 'AppJumbo',
  data(){
    return{
      store,
    }
  }
};
</script>
<template>
  <!-- Sezione jumbotron per un impatto visivo forte -->
  <section class="jumbotron" v-if="!store.refToCheck">
    <div class="container p-5">
      <!-- Container con padding per distanziare il contenuto dai bordi -->
      <div class="row">
        <!-- Colonna immagine -->
        <div class="container p-5 col-sm-12 col-xl-6">
          <!-- Immagine rappresentativa del servizio offerto -->
          <img
            src="../../public/images/jumbooCibo.png"
            alt="Burgher e patatine"
          />
        </div>
        <!-- Colonna testo -->
        <div class="container p-5 col-sm-12 col-xl-6">
          <!-- Titolo principale -->
          <h1 class="madimi-one-regular text-danger mb-5">
            <strong>Consegnamo a domicilio il tuo cibo preferito!</strong>
          </h1>
          <!-- Testo descrittivo -->
          <h5 class="my-5">
            Pizza, hamburger, poke e tanto altro dal ristorante al salotto di
            casa tua! DeliveBoo seleziona per voi i migliori ristoranti e li
            porta a casa nell'arco di 30 minuti!
          </h5>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
.jumbotron {
  background-color: #ffce6b;
  img {
    max-width: 100%;
  }
}

@media (max-width: 767px) {
  .jumbotron {
    img {
      display: none;
    }
  }
}
</style>
