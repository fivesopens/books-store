<template>
  <van-swipe v-if="banners.length" class="my-swipe" :autoplay="3000" indicator-color="white" >
    <van-swipe-item v-for="(item,index) in banners" :key="index">
        <img v-lazy="item.img_url" alt="">
    </van-swipe-item>
 </van-swipe>
</template>

<script setup>
const props = defineProps({
    banners:Array,
    default(){
        return []
    }
})
</script>

<style lang="scss" scoped>
img{
    width: 100%;
    height: auto;
}
</style>