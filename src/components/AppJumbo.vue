<script>
export default {
  name: 'AppJumbo',
};
</script>
<template>
  <section class="jumbotron">
    <div class="container">
      <div class="row">
        <div class="container col-sm-12 col-xl-6">
          <img
            src="../../public/images/jumbooCibo.png"
            alt="Burgher e patatine"
          />
        </div>
        <div class="container col-sm-12 col-xl-6">
          <h1>titolo</h1>
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
