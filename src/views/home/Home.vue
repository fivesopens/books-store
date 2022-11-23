<template>
  <div id="home"> 
   <NavBar>
     <template v-slot:default>图书兄弟</template>
   </NavBar>

   <TabControl v-show="isTabFixe" @tabClick="tabClick" :titles="['畅销','新书','精选']"/>

   <div class="wrapper">
    <div class="content">
      <div ref="banref">
        <HomeSwiper :banners="banners"/>
        <RecommendView :recommends="recommends"/>
      </div>
     

      <TabControl @tabClick="tabClick" :titles="['畅销','新书','精选']"/>
      <GoodList :goods="showGoods"/>
    </div>
   </div>
  
   <backTop @bTop='bTop'  v-show="isTabFixe"/>
  </div>
</template>

<script setup>
import NavBar from "components/common/navbar/NavBar"
import RecommendView from "views/home/ChildComps/RecommendView"
import TabControl from "components/contnet/tabControl/TabControl"
import GoodList from "components/contnet/goods/GoodList"
import backTop from 'components/common/backtop/backTop'
import HomeSwiper from './ChildComps/HomeSwiper.vue'
import {getHomeAllData,getHomeGoods} from 'network/home'
import betterScroll from 'better-scroll'
import {computed, nextTick, onMounted, reactive, ref, watchEffect} from 'vue'
   

    const recommends = ref([])
    //商品列表数据
    const goods = reactive({
      sales:{page:1,list:[]},
      new:{page:1,list:[]},
      recommend:{page:1,list:[]}
    })
  
    let currenType = ref('sales')
    let bs = reactive({})
    let isTabFixe = ref(false)
    let banref = ref(null)
    let banners = ref([])
    const showGoods = computed(()=>{
      return goods[currenType.value].list
    })


    const tabClick = (index)=>{
     
      let types = ['sales','new','recommend']
      currenType.value = types[index]

      nextTick(()=>{
            bs && bs.refresh()
      })
    }

    const bTop=()=>{
      bs.scrollTo(0,0,500)
    }

    onMounted(async ()=>{
      getHomeAllData().then(res=>{
        recommends.value = res.goods.data
        banners.value = res.slides
       
      })

     await getHomeGoods('sales').then(res=>{
      
        goods.sales.list = res.goods.data
      })

      await getHomeGoods('recommend').then(res=>{
       
        goods.recommend.list = res.goods.data
      })

      await getHomeGoods('new').then(res=>{
       
        goods.new.list =res.goods.data
      })
     
      //创建bs对象
      bs = new betterScroll(document.querySelector('.wrapper'),{
        probeType:3,
        click:true,
        pullUpLoad:true
      })

     

      //触发滚动事件
      bs.on('scroll',(postion)=>{
        
          isTabFixe.value = (-postion.y)>banref.value.offsetHeight
      })

      //上拉加载数据
      bs.on('pullingUp',()=>{
       
        const page = goods[currenType.value].page+1

        getHomeGoods(currenType.value,page).then(res=>{
          goods[currenType.value].list.push(...res.goods.data)
          goods[currenType.value].page +=1
        })

        bs.finishPullUp()

        //重新计算高度
        bs.refresh()
      })

    })

    //监听 
    // watchEffect(()=>{
    //   nextTick(()=>{
        
    //       bs && bs.refresh()
    //   })
    // })
    
</script>

<style lang="scss" scoped>
.banners img{
  width: 100%;
  height: auto;
  
}

#home{
  height: 100vh;
  position: relative;
}
.wrapper{
  position: absolute;
  top: 45px;
  bottom: 50px;
  left: 0px;
  right: 0px;
  overflow: hidden;
}
</style>
