<template>
     <div id="box">
        <NavBar>
            <template v-slot:default>个人中心</template>
        </NavBar>

        <div class="user_box">
            <div class="user_info">
                <div class="info">
                    <img src="~assets/images/kuishou.jpg" alt="">
                    <div class="user_desc">
                        <span>昵称：{{user.name}}</span>
                        <span>登录名：{{user.email}}</span>
                        <span class="name">个性签名：练习时长连年半</span>
                    </div>
                </div>
            </div>

            <ul class="user_list">
                <li class="van_hairline_bottom" @click="goTo('/collect')">
                    <span>我的收藏</span>
                    <van-icon name="arrow" />
                </li>
                <li class="van_hairline_bottom" @click="goTo('/order')">
                    <span>我的订单</span>
                    <van-icon name="arrow" />
                </li>
                <li class="van_hairline_bottom"  @click="goTo('/setting')">
                    <span>账户管理</span>
                    <van-icon name="arrow" />
                </li>
                <li class="van_hairline_bottom"  @click="goTo('/address')">
                    <span>地址管理</span>
                    <van-icon name="arrow" />
                </li>
                <li class="van_hairline_bottom"  @click="goTo('/about')">
                    <span>关于我们</span>
                    <van-icon name="arrow" />
                </li>
            </ul>
        </div>

        
        <div style="margin: 15px;margin-top: 100px;">
            <van-button type="success" round block @click="tologout">退出登录</van-button>
        </div>
   </div>
</template>

<script setup>
import { onMounted, reactive, toRefs } from "@vue/runtime-core";
import NavBar from "components/common/navbar/NavBar"

import {logout,getUser}  from 'network/user'
import { Toast } from "vant";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
const store = useStore()
const  router = useRouter()
    const tologout = ()=>{
        logout().then(res=>{
            if(res.status=='204'){
                Toast.success('退出成功')

                localStorage.setItem('token1','')

                store.commit('setIsLogin',false)
                
                setTimeout(()=>{
                    router.push({path:'/login'})
                },500)
            }
        })
    }

    const state = reactive({
        user:{

        }
    })

    const {user} = toRefs(state)

    const goTo=(path,query)=>{
        router.push({path,query:query || {}})
    }

    onMounted(()=>{
        getUser().then(res=>{
            state.user = res
            
        })
    })
</script>

<style lang="scss" scoped>
#box{
    background: #fcfcfc;
    height: 90vh;
    .user_box{
        margin-top: 65px;
        .user-header{
            position: fixed;
            top: 0;
            left: 0;
            z-index: 1000000;
            width: 100%;
            height: 44px;
            padding: 0 10px;
            color: #252525;
            background: #fff;
            border-bottom: 1px solid #dcdcdc;
            .user-name{
                font-size: 14px;
            }
        }

        .user_info{
            width: 94%;
            margin: 10px;
            height: 115px;
            background: linear-gradient(90deg, #31c7a7, #a1c7c7);
            box-shadow: 0 2px 5px #269090;
            border-radius: 6px;
            margin-top: 50px;
            text-align: left;
            .info{
                position: relative;
                display: flex;
                width: 100%;
                height: 100px;
                padding: 25px 20px;
                img{
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    margin-top: 4px;
                }
                .user_desc{
                    display: flex;
                    flex-direction: column;
                    margin-left: 10px;
                    line-height: 20px;
                    font-size: 14px;
                    color: #fff;
                }
            }

            .account-setting {
                position: absolute;
                top: 10px;
                right: 20px;
                font-size: 13px;
                color: #fff;
                .van-icon-setting-o {
                font-size: 16px;
                vertical-align: -3px;
                margin-right: 4px;
                }
            }

        }
    }

    .user_list{
        padding: 0 8px;
        margin-top: 40px;
        li{
            display: flex;
            justify-content: space-between;
            padding-left: 5px;
            padding-right: 5px;
            height: 40px;
            line-height: 40px;
            font-size: 14px;
            margin: 10px 0 !important;
            background: #ffffff;
            border-radius: 3px;
            .van-icon-arrow {
                margin-top: 13px;
            }

        }
    }
}
</style>
