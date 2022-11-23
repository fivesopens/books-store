<template>
    <div class="create_order">
        <NavBar class="nav-bar">
            <template v-slot:default> 订单预览 </template>
        </NavBar>
        <div class="address_wrap">
            <div class="name" @click="goTo">
                <span>{{address.name}}</span>
                <span>{{address.phone}}</span>
            </div>
            <div class="address">
               {{addressDetail}}
            </div>
            <van-icon class="arrow" name="arrow" />
        </div>
        <div class="good">
            <div class="good_item" v-for="(item,index) in cartList" :key="index">
                <div class="good_img"><img v-lazy="item.goods.cover_url" alt=""></div>
                <div class="good_desc">
                    <div class="good_title">
                        <span>{{item.goods.title}}</span>
                        <span>x{{item.num}}</span>
                    </div>
                    <div class="good_btn">
                        <div class="price"><small>￥</small>{{item.goods.price + '.00'}}</div>
                    </div>
                </div>
            </div>
        </div>

        <van-submit-bar
        class="submit-all"
        :price="total*100"
        button-text="生成订单"
        @submit="handleCreateOrder"
        >
        商品金额
        </van-submit-bar>


        <van-popup
        closeable
        :close-on-click-overlay="false"
        v-model:show="showPay"
        position="bottom"
        :style="{ height: '40%' }"
        @close="close"
        >
        <van-grid :border="false" :column-num="2">
            <van-grid-item>
                支付宝二维码<br>
                <van-image
                width="150"
                height="150"
                :src="aliyun"
                />
            </van-grid-item>
        </van-grid>
        </van-popup>
    </div>
</template>

<script setup>
import { reactive, toRefs } from "@vue/reactivity";
import NavBar from "components/common/navbar/NavBar"
import { useRoute, useRouter} from "vue-router";
import {getOrderPreview,createOrder,payOrder,payOrderStatus} from 'network/order'
import { Toast } from "vant";
import { useStore } from "vuex";
import { computed, onMounted } from "@vue/runtime-core";
const router = useRouter()
const route = useRoute()
const store = useStore()
const state = reactive({
    cartList:[],
    address:{},
    showPay:false,
    orderNo:'',
    aliyun:'',
    wechat:''
})

const {cartList,address,showPay,aliyun,wechat} = toRefs(state)

const goTo=()=>{
    router.push({path:'/address'})
}

const handleCreateOrder =()=>{
    const params = {
        address_id:state.address.id
    }
    createOrder(params).then(res=>{
        Toast('创建订单成功')
        store.dispatch('updateCart')

        state.showPay = true

        state.orderNo = res.id

        payOrder(state.orderNo,{type:'aliyun'}).then(res=>{
            state.aliyun = res.qr_code_url
        })

        //轮询
        const timer = setInterval(()=>{
            payOrderStatus(state.orderNo).then(res=>{
                if(res=='2'){
                    clearInterval(timer)
                    router.push({path:'/orderdetail',query:{id:state.orderNo}})
                }
            })
        },2000)
        
    })
}

const close = ()=>{
    router.push({path:'orderdetail',query:{id:state.orderNo}})
}

const init=()=>{
  Toast.loading({message:'加载中...',forbidClickt:true})

  getOrderPreview().then(res=>{
    let address = res.address.filter(n=>n.is_default =='1')

    if(address.length ==0){
        state.address ={
            address:'还没有设置默认地址，请填写地址信息'
        }
    }else{
        state.address = address[0]
    }

    state.cartList = res.carts
    Toast.clear()
  })
}

const addressDetail = computed(()=>{
    return state.address.province +' '+ state.address.city +' '+ state.address.county +' '+ state.address.address
})

const total = computed(()=>{
    let sum = 0

    state.cartList.forEach(item=>{
        sum +=parseInt(item.num) * parseFloat(item.goods.price)
    })

    return sum
})

onMounted(()=>{
    init()
})
</script>

<style lang="scss" scoped>
.create_order{
    background-color: #f9f9f9;
    .address_wrap{
        text-align: left;
        margin-bottom: 20px;
        background: #fff;
        position: relative;
        margin-top: 44px;
        font-size: 14px;
        padding: 15px;
        color: #222333;
    }
    .name,
    .address{
        margin: 10px 0;
    }

    .arrow{
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        font-size: 20px;
    }
    &::before {
      position: absolute;
      right: 0;
      bottom: 0;
      left: 0;
      height: 2px;
      background: -webkit-repeating-linear-gradient(
        135deg,
        #ff6c6c 0,
        #ff6c6c 20%,
        transparent 0,
        transparent 25%,
        #1989fa 0,
        #1989fa 45%,
        transparent 0,
        transparent 50%
      );
      background: repeating-linear-gradient(
        -45deg,
        #ff6c6c 0,
        #ff6c6c 20%,
        transparent 0,
        transparent 25%,
        #1989fa 0,
        #1989fa 45%,
        transparent 0,
        transparent 50%
      );
      background-size: 80px;
      content: "";
    }
    .good {
         margin-bottom: 120px;
        
    }
    .good_item{
        display: flex;
        img{
            width: 100px;
            height: auto;
        }
    }
    .good_desc{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        flex: 1;
        padding: 20px;
        .good_title{
            display: flex;
            justify-content: space-between;
        }
        .good_btn{
            display: flex;
            justify-content: space-between;
            .price{
                font-size: 16px;
                color: red;
                line-height: 28px;
            }

            .van-icon-delete {
                font-size: 20px;
                margin-top: 4px;
            }
        }
    }
    .pay-wrap {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background: #fff;
    padding: 10px 0;
    padding-bottom: 50px;
    border-top: 1px solid #e9e9e9;
    > div {
      display: flex;
      justify-content: space-between;
      padding: 0 5%;
      margin: 10px 0;
      font-size: 14px;
      span:nth-child(2) {
        color: red;
        font-size: 18px;
      }
    }
    .pay-btn {
      position: fixed;
      bottom: 7px;
      right: 0;
      left: 0;
      width: 90%;
      margin: 0 auto;
    }
  }
}
.submit-all {
  margin-bottom: 50px;
  z-index: 9 !important;
}
</style>