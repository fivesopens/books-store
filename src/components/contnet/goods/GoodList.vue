<template>
    <div class="goods">
        <GoodsListItem v-for="item in goods" :key="item" :product="item"/>
    </div>
</template>

<script setup>
import GoodsListItem from './GoodsListItem.vue';
const props = defineProps({
    goods:{
        type:Array,
        default(){
            return [];
        }
    }
})

</script>

<style lang="scss" scoped>
.goods{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 5px;
   
}
</style>