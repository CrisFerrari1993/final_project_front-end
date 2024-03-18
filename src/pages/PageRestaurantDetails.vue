<script>
import {store} from '../store';
export default {
  name: 'PageRestaurantDetails',
  props:{
    id:String,
  },
  data(){
    return{
      store
    }
  }
};
</script>

<template>
  <h1>{{id}}</h1>
</template>
<style></style>
