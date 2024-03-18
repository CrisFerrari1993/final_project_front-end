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
          <h5 class="madimi-one-regular">
            Pizza, hamburger, poke e tanto altro dal ristorante al salotto di
            casa tua!
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
