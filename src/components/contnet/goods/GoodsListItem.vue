<template>
    <div class="goods_item" @click="itemClick">
        <img v-lazy="product.cover_url" alt="">
        <div class="goods_info">
            <p>{{product.title}}</p>
            <span class="price"><small>￥</small>{{product.price}}</span>
            <span class="collect">{{product.collects_count}}</span>
        </div>
    </div>
</template>

<script setup>
import {useRouter} from 'vue-router'
const props = defineProps({
    product:Object,
    default(){
        return {}
    }
})

const router = useRouter()
const itemClick = ()=>{
    router.push({path:'/detail',query:{id:props.product.id}})
}
</script>

<style lang="scss" scoped>
.goods_item{
    width: 46%;
    padding-bottom: 40px;
    position: relative;
    img{
        width: 100%;
        border-radius: 5px;
    }

    .goods_info{
        font-size: 12px;
        position: absolute;
        bottom: 5px;
        left: 0;
        right: 0;
        overflow: hidden;
        p{
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            margin-bottom: 3px;
        }
        .price{
            color: red;
            margin-right: 20px;
        }
        .collect{
            position: relative;
        }
        .collect::before{
            content: '';
            width: 12px;
            height: 12px;
            position: absolute;
            left: -13px;
            top: 1px;
            background: url('~assets/logo.png') 0 0/14px 14px;
        }
    }
}
</style>