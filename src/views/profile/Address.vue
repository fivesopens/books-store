<template>
    <div class="address_box">
        <NavBar class="nav-bar">
         <template v-slot:default> 地址管理 </template>
        </NavBar>
        <div v-show="list.length ===0" style="margin-top: 200px; text-align: center;">
            还没有地址信息，去添加吧！
        </div>
        <div class="address_item">
            <van-address-list
                v-model="chosenAddressId"
                :list="list"
                default-tag-text="默认"
                @add="onAdd"
                @edit="onEdit"
                @select="select"
            />
        </div>
    </div>
</template>

<script setup>
import NavBar from '@/components/common/navbar/NavBar.vue';
import { useRoute,useRouter } from 'vue-router';
import {getAddressList} from 'network/address'
import { reactive, toRefs } from '@vue/reactivity';
import { onMounted } from '@vue/runtime-core';

const route = useRoute()
const router = useRouter()
const state = reactive({
    chosenAddressId:'1',
    list:[]
})

const {chosenAddressId,list} = toRefs(state)


const onAdd=()=>{
    router.push({path:'/addressedit',query:{type:'add'}})
}



const onEdit=(item)=>{
    router.push({path:'/addressedit',query:{type:'edit',addressId:item.id}})
}


const select=(item)=>{
    router.push({path:'/createorder',query:{addressId:item.id}})
}

onMounted(()=>{
    getAddressList().then(res=>{
        if(res.data.length==0){
            state.list=[]
            return
        }

        state.list = res.data.map(item=>{
            return{
                id:item.id,
                name:item.name,
                tel:item.phone,
                address:`${item.province} ${item.city} ${item.county} ${item.address}` ,
                isDefault:!!item.is_default
            }
        })
    })
})
</script>

<style lang="scss" scoped>
.address_box{
    height: 300px;
    .van-radio__icon {
        display: none;
    }
    .address_item{
        margin-top: 45px;
        .van-button {
            background: var(--color-tint);
            border-color: var(--color-tint);
        }
    }
}
.van-address-list__bottom {
  bottom: 100px !important;
}
</style>