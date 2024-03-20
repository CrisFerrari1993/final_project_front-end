
<script>
export default {
  name: 'AppNabar',
};
</script>

<template>
  <!-- Barra di navigazione principale -->
  <nav class="navbar navbar-expand-lg bg-yellow navBar">
    <div class="container-fluid">
      <!-- Logo e nome dell'applicazione, cliccabile per tornare alla homepage -->
      <a class="navbar-brand d-flex" href="/">
        <img
          class="nav_img" 
          src="https://dhhvideos.s3.eu-central-1.amazonaws.com/Delivery-Hero-Comet.png"
          alt="Logo DeliveBoo"
        />
        <h2 class="img_title"><strong>DeliveBoo</strong></h2> <!-- Nome dell'applicazione -->
      </a>
      <!-- Bottone per il menu a tendina su dispositivi mobili -->
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <!-- Elementi del menu di navigazione -->
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Per i ristoratori
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li>
                <a class="dropdown-item" href="http://localhost:8000/register"
                  >Registrati</a> <!-- Link per la registrazione dei ristoratori -->
              </li>
              <li>
                <a class="dropdown-item" href="http://localhost:8000/login"
                  >Entra</a> <!-- Link per il login dei ristoratori -->
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style lang="scss">
@import '../styles/general.scss'; //Importazione degli stili generali

.navBar {
  background-color: #ffc244;
  .nav_img {
    width: 50px;
  }
  .img_title {
    color: #d82128;
    display: inline;
    margin: 0;
  }
}
</style>
