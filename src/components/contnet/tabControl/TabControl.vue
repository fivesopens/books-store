<template>
    <div class="tab_control">
        <div v-for="(item,index) in titles" 
        :key="index" 
        class="tab_control_item"
        @click="itemClick(index)"
        :class="{active:currentIndex==index}">
            <span>{{item}}</span>
        </div>
      
    </div>
</template>

<script setup>
import { ref } from "@vue/reactivity";
const emit = defineEmits(['tabClick'])
   const props = defineProps({
       titles:{
            type:Array,
            default(){
                return[];
            }
       }
   })

   let currentIndex = ref(0)

   const itemClick = (index)=>{
     currentIndex.value = index
     emit('tabClick',index)
   }
</script>

<style lang="scss" scoped>
.tab_control{
    display: flex;
    position: sticky;
    top: 44px;
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 14px;
    background-color: #ffffff;
    z-index: 10;
    .tab_control_item{
        flex: 1;
        span{
            padding: 5px;
        }
    }
    .active{
        color: var(--color-tint);
        span{
            border-bottom:3px solid var(--color-tint);
        }
    }
}
</style>