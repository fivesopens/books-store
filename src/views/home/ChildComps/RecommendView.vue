<template>
    <div class="recommend">
       <div class="recommend_item" v-for="item in recommends.slice(0,4)" :key="item.id">
          <a href="javascript:;" @click="goDeatil(item.id)">
              <img v-lazy="item.cover_url" alt="">
              <div>{{item.title}}</div>
          </a>
       </div>  
    </div>
</template>

<script setup>
import {useRouter} from 'vue-router'
name: 'RecommendView'
const props = defineProps({
      recommends:{
        type:Array,
        default(){
          return [];
        }
      }
})

const router = useRouter()
const goDeatil = (id)=>{
  router.push({
    path:'/detail',
    query:{id}
  })
}
</script>

<style lang="scss" scoped>
  .recommend{
    display: flex;
    width: 100%;
    padding: 15px 0 30px;
    border-bottom: 8px solid #eee;
    text-align: center;
    font-size: 12px;
    .recommend_item{
      flex: 1;
      img{
        width: 70px;
        height: 70px;
        margin-bottom: 10px;
      }
    }
  }
</style>