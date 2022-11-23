<template>
   <div>
    <NavBar>
        <template v-slot:default>商品分类</template>
    </NavBar>

    <div id="mainBox">
        <div class="order_tab">
            <van-tabs v-model="activeTab"  @click-tab="tabClick" sticky>
                <van-tab title="销量排序"></van-tab>
                <van-tab title="价格排序"></van-tab>
                <van-tab title="评化排序"></van-tab>
            </van-tabs>
        </div>
        <div class="left_menu">
            <van-sidebar v-model="active">
                <van-collapse v-model="activeName" accordion>
                    <van-collapse-item v-for="(item,index) in categories" :key="index" :title="item.name" :name="item.name">
                        <van-sidebar-item v-for="(sub,index) in item.children" :key="index" :title="sub.name" @click="getGoods(sub.id)" />
                    </van-collapse-item>
                </van-collapse>       
            </van-sidebar>
        </div>
        <div class="goods_list">
            <div class="content">
                <van-card
                v-for="item in shwoGoods" :key="item.id"
                :num="item.comments_count"
                :tag="item.comments_count >=0?'流行':'标签'"
                :price="item.price"
                :desc="item.updated_at"
                :title="item.title"
                :thumb="item.cover_url"
                :lazy-load="true"
                @click="itemClick(item.id)"
                />
            </div>
        </div>
    </div>
   </div>
</template>

<script setup>
import { ref,onMounted, reactive, computed} from 'vue'
import {getCategory,getCategoryGoods} from 'network/category'
import NavBar from "components/common/navbar/NavBar"
import {useRouter} from 'vue-router'

const activeName = ref('1');
const  active = ref(0)
const activeTab = ref(0);
const goods = reactive({
    sales:{page:1,list:[]},
    price:{page:1,list:[]},
    comments_count:{page:1,list:[]},
})
const router = useRouter()
let currentOrder = ref('sales')
let currentCid = ref(0)
let  categories =ref([]) 



const tabClick = (index)=>{
    let orders = ['sales','price','comments_count']
    currentOrder.value = orders[index.name]

    getCategoryGoods(currentOrder.value,currentCid.value).then(res=>{
        goods[currentOrder.value].list = res.goods.data
    })

   
}
const getGoods = (cid)=>{

    currentCid.value = cid
    init()
   

}

const init = ()=>{
    getCategoryGoods('sales',currentCid.value).then(res=>{
        goods.sales.list = res.goods.data
       
    })
    getCategoryGoods('price',currentCid.value).then(res=>{
        goods.price.list = res.goods.data
       
    })
    getCategoryGoods('comments_count',currentCid.value).then(res=>{
        goods.comments_count.list = res.goods.data
       
    })
}

const itemClick = (id)=>{
    router.push({
        path:'/detail',
        query:{id}
    })
}

const  shwoGoods = computed(()=>{
    return goods[currentOrder.value].list
})



   onMounted(()=>{
        getCategory().then(res=>{
            categories.value = res.categories
        })

        init()

   })
</script>

<style lang="scss" scoped>
#mainBox{
    display: flex;
    flex-wrap: wrap;
 
    .order_tab{
        width: 100%;
        height:50px;
      
        margin-top: 45px;
       
    }
    .left_menu{
       
        width:35%;
        
        height: auto;
        .van-sidebar{
            width: 100%;
        }
    }
    .goods_list{
       
        width: 65%;
        height: 100vh;
        padding: 10px;
      
    }
}
::v-deep .van-card_thumb{
    width: 68px;
}
</style>
