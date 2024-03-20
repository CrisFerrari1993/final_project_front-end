<script>

</script>

<template>
  <!-- Definisce il layout del footer, utilizzando una struttura a righe e colonne per organizzare il contenuto in modo responsivo -->
  <footer class="row row-cols-1 row-cols-sm-2 row-cols-md-5 py-5 my-5 border-top bg-dark position-relative justify-content-center">
      <!-- Linea orizzontale decorativa -->
      <div class="hr-content d-flex justify-content-center position-absolute p-0 w-100">
        <hr class="">
      </div>
      
      <!-- Colonna per logo, anno di copyright e links ai profili LinkedIn dei creatori -->
      <div class="col mb-3 d-flex flex-column align-items-center">
        <a href="/" class="d-flex align-items-center mb-3 link-dark text-decoration-none">
          <img src="https://dhhvideos.s3.eu-central-1.amazonaws.com/Delivery-Hero-Comet.png" alt="">
        </a>
        <p class="">© 2024</p>
        <span class="mb-3">Prodotto da</span>
        <!-- Links ai profili LinkedIn -->
        <a href="..." class="text-decoration-none">...</a>
        <!-- Aggiungere altri links secondo necessità -->
      </div>
  
      <!-- Colonne per varie sezioni del sito web. Ripetute per dimostrare la modularità, ma dovrebbero essere personalizzate per riflettere il contenuto reale del sito. -->
      <!-- Prima colonna di navigazione -->
      <div class="col mb-3">
        <h5>Sezione</h5>
        <ul class="nav flex-column">
          <!-- Links di navigazione -->
          <li class="nav-item mb-2"><a href="#" class="nav-link p-0 ">...</a></li>
          <!-- Aggiungere altri links secondo necessità -->
        </ul>
      </div>
      
      <!-- Ripetere le colonne come sopra per altre sezioni -->
  
    </footer>
  </template>
<style lang="scss" scoped>

footer{
    padding: 60px 0!important;
    margin: 0!important;

    *{
      color: rgb(255, 193, 61);
    }

    .hr-content{
      top: 25px;
      hr{
        width: 90%;
        border: 1.7px solid rgb(255, 193, 61);
      }
    }

    .col{
      margin-bottom: 30px!important;

      img{
          width: 60px;
      }

      h5{
        font-size: 1.5em;
        color:rgb(216, 33, 40);
        margin-bottom: 15px;
        text-align: center;
      }
      li{
        text-align: center;
      }
    }
}
    

</style>