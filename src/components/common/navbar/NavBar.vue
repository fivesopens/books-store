<template>
  <div class="nav_bar">
    <div class="left" @click="goBack"><slot name="left">&lt;</slot></div>
    <div class="center"><slot>EWShop</slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script setup>
import {useRouter} from 'vue-router'
   name:'NavBar' 
    
   const router = useRouter()
   const goBack = ()=>{
    router.go(-1)
   }
</script>

<style lang="scss" scoped>
.nav_bar{
    display: flex;
    position: fixed;
    height: 45px;
    left: 0;
    right: 0;
    top: 0;
    background-color: var(--color-tint);
    line-height: 45px;
    text-align: center;
    color: #ffffff;
    z-index: 9999;
    box-shadow: 0 2px 0px rgba(100,100,100,0.1);
    
    .left{
        font-size: 30px;
    }
    .left,.right{
        width: 60px;
    }
    .center{
        flex: 1;
    }
}

</style>