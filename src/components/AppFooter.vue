<script>

</script>

<template>
<footer class="row row-cols-1 row-cols-sm-2 row-cols-md-5 py-5 my-5 border-top bg-dark position-relative justify-content-center">
    <div class="hr-content d-flex justify-content-center position-absolute p-0 w-100">
      <hr class="">
    </div>
    
    <div class="col mb-3 d-flex flex-column align-items-center">
      <a href="/" class="d-flex align-items-center mb-3 link-dark text-decoration-none">
        <img src="https://dhhvideos.s3.eu-central-1.amazonaws.com/Delivery-Hero-Comet.png" alt="">
      </a>
      <p class="">© 2024</p>
      <span class="mb-3">Prodotto da</span>
      <a href="https://www.linkedin.com/in/fabbri-rebecchi/" class="text-decoration-none"><i class="fa-brands fa-linkedin"></i> Francesco</a>
      <a href="https://www.linkedin.com/in/jacopo-biagi-97a98a2b8/" class="text-decoration-none"><i class="fa-brands fa-linkedin"></i> Jacopo</a>
      <a href="https://www.linkedin.com/in/sergio-buzi-91b7ab223/" class="text-decoration-none"><i class="fa-brands fa-linkedin"></i> Sergio</a>
      <a href="https://www.linkedin.com/in/cristopher-ferrari-648944197/" class="text-decoration-none"><i class="fa-brands fa-linkedin"></i> Cristopher</a>
      <a href="https://www.linkedin.com/in/alissa-cavallera-961887178/" class="text-decoration-none"><i class="fa-brands fa-linkedin"></i> Alissa</a>
    </div>

    <!-- <div class="col mb-3">

    </div> -->

    <div class="col mb-3">
      <h5>Sezione</h5>
      <ul class="nav flex-column">
        <li class="nav-item mb-2"><a href="#" class="nav-link p-0 ">Home</a></li>
        <li class="nav-item mb-2"><a href="#" class="nav-link p-0 ">Features</a></li>
        <li class="nav-item mb-2"><a href="#" class="nav-link p-0 ">Prezzi</a></li>
        <li class="nav-item mb-2"><a href="#" class="nav-link p-0 ">FAQs</a></li>
        <li class="nav-item mb-2"><a href="#" class="nav-link p-0 ">About</a></li>
      </ul>
    </div>

    <div class="col mb-3">
      <h5>Sezione</h5>
      <ul class="nav flex-column">
        <li class="nav-item mb-2"><a href="#" class="nav-link p-0 ">Home</a></li>
        <li class="nav-item mb-2"><a href="#" class="nav-link p-0 ">Features</a></li>
        <li class="nav-item mb-2"><a href="#" class="nav-link p-0 ">Prezzi</a></li>
        <li class="nav-item mb-2"><a href="#" class="nav-link p-0 ">FAQs</a></li>
        <li class="nav-item mb-2"><a href="#" class="nav-link p-0 ">About</a></li>
      </ul>
    </div>

    <div class="col mb-3">
      <h5>Section</h5>
      <ul class="nav flex-column">
        <li class="nav-item mb-2"><a href="#" class="nav-link p-0">Home</a></li>
        <li class="nav-item mb-2"><a href="#" class="nav-link p-0">Features</a></li>
        <li class="nav-item mb-2"><a href="#" class="nav-link p-0">Prezzi</a></li>
        <li class="nav-item mb-2"><a href="#" class="nav-link p-0">FAQs</a></li>
        <li class="nav-item mb-2"><a href="#" class="nav-link p-0">About</a></li>
      </ul>
    </div>
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

      .nav{
        height: unset;
        width: unset;
        padding: unset;
        background-color: unset;
      }
      li{
        text-align: center;
      }
    }
}
    

</style>