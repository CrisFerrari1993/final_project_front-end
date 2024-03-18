<script>
export default {
  name: 'AppNabar',
};
</script>

<template>
  <nav class="navbar navbar-expand-lg bg-yellow navBar">
    <div class="container-fluid">
      <a class="navbar-brand d-flex" href="/">
        <img
          class="nav_img"
          src="https://dhhvideos.s3.eu-central-1.amazonaws.com/Delivery-Hero-Comet.png"
          alt=""
        />
        <h2 class="img_title"><strong>DeliveBoo</strong></h2>
      </a>
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
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a
              class="nav-link active"
              aria-current="page"
              href="/Il_nostro_team"
              >Il nostro team</a
            >
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/ristoranti">Ristoranti</a>
          </li>
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
              <li><a class="dropdown-item" href="#">Registrati</a></li>
              <li><a class="dropdown-item" href="#">Entra</a></li>
            </ul>
          </li>
        </ul>
        <form class="d-flex">
          <input
            class="form-control me-2"
            type="search"
            placeholder="🔍 Cerca per categoria"
            aria-label="Cerca"
          />
          <button class="btn btn-outline-danger" type="submit">Cerca</button>
        </form>
      </div>
    </div>
  </nav>
</template>

<style lang="scss">
@import '../styles/general.scss';
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
