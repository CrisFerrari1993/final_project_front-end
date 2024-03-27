<script>
export default {
  name: 'OutTeam',
};
</script>

<template>
   <h1>Chi sono i membri del team?</h1>
    <!-- Contenitore per i cinque servizi offerti -->

    <div class="five-card">

        <!-- riga1 -->
        <div class="riga1">
             <!-- card 1 -->
            <div class="card-container">
                <div class="card">
                    <img src="" alt="">
                    <h3>persona</h3>
                </div>  
            </div>

            <!-- card 2 -->
            <div class="card-container">
                <div class="card">
                    <img src="" alt="">
                    <h3>persona</h3>
                </div>  
            </div>
        </div>

        <!-- riga 2 -->
        <div class="riga2">

        <!-- card 3 -->
            <div class="card-container">
                <div class="card">
                    <img src="" alt="">
                    <h3>persona</h3>
                </div>  
            </div>

            <!-- card 4 -->
            <div class="card-container">
                <div class="card">
                    <img src="" alt="">
                    <h3>persona</h3>
                </div>  
            </div>

            <!-- card 5 -->
            <div class="card-container">
                <div class="card">
                    <img src="" alt="">
                    <h3>persona</h3>
                </div>  
            </div>
        </div>
    </div>
</template>

<style lang="scss">

main h1{
    text-align: center;
    font-size: 3rem;
}

.five-card{ 
    /* Occupa l'intera larghezza della sezione */
  width: 70%;
  /* Centra il contenuto orizzontalmente */
  margin: auto;
  /* Layout flessibile con spaziatura uniforme */
  display: block;

  .riga1{
    display: flex;
    justify-content: space-around;
    margin-top: 20px;

    .riga1 .card-container{
      width: 40%;
      height: 200px;
      border: 1px solid #198754;
    }
  }

  .riga2{
    display: flex;
    justify-content: space-around;
    margin-top: 20px;
    margin-bottom: 30px;

    .riga2 .card-container{
      width: 30%;
      height: 200px;
      border: 1px solid #198754;
    }
  }


  .card h3{
      text-align: center;
      font-size: 2rem;
  }

  .card img{
      width: 90%;
      height: 90%;
      background-color: aqua;
  }
}



</style>
