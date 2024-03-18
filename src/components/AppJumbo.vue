<script>
export default {
  name: 'AppJumbo',
};
</script>
<template>
  <section class="jumbotron">
    <div class="container p-5">
      <div class="row">
        <div class="container p-5 col-sm-12 col-xl-6">
          <img
            src="../../public/images/jumbooCibo.png"
            alt="Burgher e patatine"
          />
        </div>
        <div class="container p-5 col-sm-12 col-xl-6">
          <h1 class="madimi-one-regular text-danger mb-5">
            <strong>Consegnamo a domicilio il tuo cibo preferito!</strong>
          </h1>
          <h5 class="madimi-one-regular my-5">
            Pizza, hamburger, poke e tanto altro dal ristorante al salotto di
            casa tua! DeliveBoo seleziona per voi i migliori ristoranti e li
            porta a casa nell'arco di 30 minuti!
          </h5>
        </div>
      </div>
    </div>
  </section>
</template>
<style>
.jumbotron {
  background-color: #ffce6b;
  img {
    max-width: 100%;
  }
}
</style>
