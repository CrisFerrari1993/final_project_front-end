<script>
import { store } from "../store";
export default {
  name: "PageRestaurantDetails",
  props: {
    id: String,
    name:String,
    address:String,
    logo:String,
  },
  data() {
    return {
      store,
    };
  },
};
</script>

<template>
  <div class="w-100 row">
    <div class="col-12">
      <div
        class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative"
      >
        <div class="col p-4 d-flex flex-column position-static">
          <strong class="d-inline-block mb-2 text-primary">categoria</strong>
          <h3 class="mb-0">{{ name }}</h3>
          <div class="mb-1 text-muted">{{ address }}</div>
        </div>
        <div class="col-auto d-none d-lg-block">
          <img
            class="bd-placeholder-img"
            width="200"
            height="250"
            :src="logo"
          >
        </div>
      </div>
    </div>
  </div>

  <div class="w-100 row justify-content-center">
    <div class="card col-12 col-sm-5 col-md-3" style="width: 18rem;">
      <img src="https://www.pugliainesclusiva.it/puglia/wp-content/uploads/2015/02/spaghetti-allo-scoglio-1.jpg" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">Spaghetti allo scoglio</h5>
        <p class="card-text">Spaghetti al dente in salsa di pomodoro, arricchiti con vongole, cozze e gamberi freschi. Un'esplosione di sapori marini in ogni boccone.</p>
        <a href="#" class="btn btn-primary">Ordina</a>
      </div>
    </div>
    <div class="card col-12 col-sm-5 col-md-3" style="width: 18rem;">
      <img src="https://www.conad.it/assets/images/ricette/viabagutta/logo-rosso/lasagne-alla-bolognese.jpg/renditions/all.jpeg?_u=6d9f70e7cdbb81bff44b9a40a57cfd411f382ebd" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">Lasagne alla bolognese</h5>
        <p class="card-text">Strati di pasta fresca intercalati con una deliziosa miscela di frutti di mare, inclusi gamberi succosi, cozze tenere e calamari morbidi. Il tutto avvolto in una ricca salsa di pomodoro e arricchito con formaggio fuso. Un'esperienza culinaria che trasporta direttamente sulla costa mediterranea con ogni morso.</p>
        <a href="#" class="btn btn-primary">Ordina</a>
      </div>
    </div>
    <div class="card col-12 col-sm-5 col-md-3" style="width: 18rem;">
      <img src="https://www.donnamoderna.com/content/uploads/2008/08/bistecca-classica-alla-fiorentina-immagine.jpg" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">Bistecca alla Fiorentina</h5>
        <p class="card-text">Bistecca di manzo grigliata, tenera e succosa, con una crosta dorata. Un'esplosione di sapore toscano in ogni boccone.</p>
        <a href="#" class="btn btn-primary">Ordina</a>
      </div>
    </div>
    <div class="card col-12 col-sm-5 col-md-3" style="width: 18rem;">
      <img src="https://www.donnamoderna.com/content/uploads/2006/09/aragosta-in-salsa-al-cognac-immagine-1200x630.jpg" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">Aragosta Grigliata</h5>
        <p class="card-text">Deliziosa aragosta fresca, grigliata alla perfezione per esaltarne il sapore dolce e succoso. Servita con una leggera spruzzata di limone e burro fuso per un'esperienza culinaria sublime.</p>
        <a href="#" class="btn btn-primary">Ordina</a>
      </div>
    </div>
    <div class="card col-12 col-sm-5 col-md-3" style="width: 18rem;">
      <img src="https://www.cucina-naturale.it/wp-content/uploads/2016/11/tiramisu.jpg" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">Tiramisù</h5>
        <p class="card-text">Il dolce italiano per eccellenza - strati di savoiardi imbevuti nel caffè, crema di mascarpone e cacao. Pura delizia in ogni cucchiaio.</p>
        <a href="#" class="btn btn-primary">Ordina</a>
      </div>
    </div>
    <div class="card col-12 col-sm-5 col-md-3" style="width: 18rem;">
      <img src="https://www.galbani.it/sites/default/files/styles/width_1920/public/2022-10/Cheesecake_SHub_1280x595_Visual.jpg?itok=BxYDP8Qz" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">Cheesecake</h5>
        <p class="card-text">Delizioso e cremoso dessert - base di biscotti con crema di formaggio, accompagnato da salsa di frutti di bosco o caramello. Perfetto per chi ama il dolce.</p>
        <a href="#" class="btn btn-primary">Ordina</a>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  .card{
    margin: 10px;
  }
</style>
