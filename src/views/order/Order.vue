<template>
    <div class="order_box">
        <NavBar class="nav-bar">
            <template v-slot:default> 订单列表 </template>
        </NavBar>

        <van-tabs ref="tabs" class="order_tab" @click="onChangeTab">
            <van-tab title="全部"></van-tab>
            <van-tab title="待付款"></van-tab>
            <van-tab title="已支付"></van-tab>
            <van-tab title="发货"></van-tab>
            <van-tab title="交易完成"></van-tab>
            <van-tab title="过期"></van-tab>
        </van-tabs>
        <div class="content">
            <van-pull-refresh v-model="refreshing" @refresh="onRefresh" class="order_list_refresh">
                <van-list
                    v-model:loading="loading"
                    :finished="finished"
                    finished-text="没有更多了"
                    @load="onLoad"
                    @offset="10"
                >
                    <div class="order_item_box" v-for="(item,index) in list" :key="index" @click="goTo(item.id)"> 
                        <div class="order_item_header">
                            <span style="line-height: 30px;">订单号：{{item.order_no}} <br>创建时间：{{item.created_at}} </span>
                        </div>
                        <van-card
                        v-for="sub in item.orderDetails.data"
                        :key="sub.id"
                        :num="sub.num"
                        :price="sub.goods.price"
                        desc="全场包邮"
                        :title="sub.goods.title"
                        :thumb="sub.goods.cover_url"
                        />
                    </div>
                </van-list>
            </van-pull-refresh>
        </div>
    </div>
</template>

<script setup>
import { reactive, toRefs,ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import NavBar from "components/common/navbar/NavBar"
import { getOrderList } from "network/order";
import { useRouter, useRoute } from "vue-router";
const router = useRouter()
const route = useRoute()
let tabs = ref(null)
const state = reactive({
    loading:false,
    finished:false,
    refreshing:false,
    list:[],
    page:1,
    totalPage:0,
    status:0,
})

const {loading,finished,refreshing,list,page,totalPage,status} = toRefs(state)

const loadData = ()=>{
    getOrderList({page:state.page,status:state.status,include:'orderDetails.goods'}).then(res=>{
       
        state.list = state.list.concat(res.data)
        state.loading = false
        state.totalPage = res.meta.pagination.total_pages

        if(state.page >=state.totalPage){
            state.finished = true
        }

    })
}

const onLoad = ()=>{

    if(!state.refreshing && state.page<state.totalPage){

        state.page = state.page + 1
    }
    

    if(state.refreshing){
        state.list = []
        state.refreshing = false
    }

    loadData()
}


const onRefresh=()=>{
    state.refreshing = true
    state.finished = false

    state.loading = true

    state.page = 1
    onLoad()
}


//tab 切换
const onChangeTab=(name)=>{
    state.status = name
    onRefresh()
}


const goTo = (id)=>{
    router.push({path:'/orderdetail',query:{id}})
}
onMounted(()=>{
    onRefresh()
})


</script>

<style lang="scss" scoped>
.order_box {
  text-align: left;
  .order_hea der {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10000;
    width: 100%;
    height: 44px;
    line-height: 44px;
    padding: 0 10px;
    color: #252525;
    background: #fff;
    border-bottom: 1px solid #dcdcdc;
    .order_name {
      font-size: 14px;
    }
  }
  .order_tab {
    margin-top: 44px;
    position: fixed;
    left: 0;
    z-index: 1000;
    width: 100%;
    border-bottom: 1px solid #e9e9e9;
  }

  .content {
    height: 100vh;
    overflow: hidden;
    overflow-y: scroll;
    padding-top: 100px;
  }
  .order_list_refresh {
    .van-card__content {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .van-pull-refresh__head {
      background: #f9f9f9;
    }

    .order_item_box {
      margin: 20px 10px;
      background-color: #fafafa;
      .order_item_header {
        padding: 10px 20px 0 20px;
        display: flex;
        justify-content: space-between;
      }
      .van-card {
        background-color: #ffffff;
        border-radius: 3px;
        margin-top: 10px;
      }
    }
  }
}
</style>