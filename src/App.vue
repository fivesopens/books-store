<template>
  <div>

    <router-view/>
    <!-- <router-view v-slot="{Component}">
      <transition>
        <keep-alive>
          <component :is="Component"/>
        </keep-alive>
      </transition>
    </router-view> -->
  
    <div id="nav">
        <router-link class="tab_bar_item" to="/">
          <div class="icon"><i class="iconfont icon-shoucang1"></i></div>
          <div>首页</div>
        </router-link>
        <router-link class="tab_bar_item" to="/categroy">
          <div class="icon"><i class="iconfont icon-fenlei"></i></div>
          <div>分类</div>
        </router-link>
        <router-link  class="tab_bar_item" to="/shopcart">
          <van-badge :content="$store.state.cartCount" max="9">
           <i class="iconfont icon-gouwuche"></i>
          </van-badge>
          <div>购物车</div>
        </router-link>
        <router-link  class="tab_bar_item" to="/profile">
          <div  class="icon"><i class="iconfont icon-gerenzhongxin1"></i></div>
          <div>我的</div>
        </router-link>
      </div>
  </div>
  
</template>

<script setup>
import {onMounted} from 'vue'
import { useStore } from 'vuex';

const store = useStore()
onMounted(()=>{
  store.dispatch('updateCart')
})

</script>

<style lang="scss">

@import "assets/css/base.css";
@import "assets/css/iconfont.css";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  display: flex;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #f6f6f6;
  box-shadow: 0 -3px 1px rgba(100,100,100,0.1);
  .tab_bar_item{
    flex: 1;
    text-align: center;
    height: 50px;
    font-size: var(--font-size);
  }
  .tab_bar_item .icon{
    display: inline-block;
    width: 24px;
    height: 24px;
    margin-top: 5px;
    vertical-align: middle;
  }
  a {
     
    color: var(--color-text);

    &.router-link-exact-active {
      color: var(--color-high-text);
    }
  }
  
}
</style>
