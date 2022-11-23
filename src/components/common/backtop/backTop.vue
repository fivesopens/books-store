<template>
    <div class="backTop" @click="backTop"></div>
</template>

<script setup>
const emit = defineEmits(['bTop'])
const backTop = ()=>{
    emit('bTop')
}
</script>

<style lang="scss" scoped>
.backTop{
    width: 40px;
    height: 40px;
    position: fixed;
    bottom: 80px;
    right: 30px;
    box-shadow: 5px 5px 5px #888888;
    border-radius: 50%;
    background: #fcfcfc url('~assets/images/up.png') no-repeat center center;
}
</style>