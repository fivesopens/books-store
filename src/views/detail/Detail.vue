<template>
  <div>
    <NavBar>
        <template v-slot:default>商品详情:{{id}}</template>
    </NavBar>
   
      <van-image
        style="margin-top: 50px;"
        width="100%"
        lazy-load
        :src="detail.cover_url"
      />
      <van-card
      style="text-align: left;"
        :num="detail.stock"
        :price="detail.price+'.00'"
        :desc="detail.description"
        :title="detail.title"
      >
        <template #tags>
          <van-tag plain type="danger">新书</van-tag>
          <van-tag plain type="danger">推荐</van-tag>
        </template>
        <template #footer>
          <van-button type="warning" @click="handleAddCart">加入购物车</van-button>
          <van-button type="danger" @click="goToCart">立即购买</van-button>
        </template>
      </van-card>

      <van-tabs v-model="active">
        <van-tab title="概述">
          <div class="content" v-html="detail.details">

          </div>
        </van-tab>
        <van-tab title="热评">

            <van-card v-for="item in detail.comments" :key="item.id"
              style="text-align: left; font-size: 20px;"
              :desc="item.content"
              :title="item.user.name"
              :thumb="item.user.avatar_url"
            />

        </van-tab>
        <van-tab title="相关图书">
          <GoodList :goods="like_goods"/>
        </van-tab>
      </van-tabs>

   </div>
   
</template>

<script setup>
import { onMounted,reactive, ref, toRefs } from 'vue'
import { useStore } from 'vuex'
import NavBar from "components/common/navbar/NavBar"
import GoodList from "components/contnet/goods/GoodList"
import {getDetail} from 'network/detail'
import {addCart} from 'network/cart'
import {useRoute,useRouter} from 'vue-router'
import { Toast } from 'vant';

    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    const active = ref(0);
    const book = reactive({
      detail:{},
      like_goods:[],
    })
    const {detail,like_goods} = toRefs(book)
    let id = ref(0) 


    const handleAddCart =()=>{
        addCart({goods_id:book.detail.id,num:1}).then(res=>{
          if(res.status=='201' || res.status=='204' ){

            Toast.success('添加成功')
            store.dispatch('updateCart')

          }
            
        })
    }


    const goToCart =()=>{
      addCart({goods_id:book.detail.id,num:1}).then(res=>{
          if(res.status=='201' || res.status=='204' ){

            Toast.success('添加成功')
            store.dispatch('updateCart')
            router.push({path:'/shopcart'})
          }
            
        })
    }

    onMounted(()=>{
      id.value = route.query.id

     getDetail(id.value).then(res=>{
          book.detail = res.goods
          book.like_goods = res.like_goods
      
      })
    
    })
</script>

<style lang="scss" scoped>
.content {
  padding: 10px;
  ::v-deep img{
    max-width:100%;
    height: auto;
  }
}
</style>
