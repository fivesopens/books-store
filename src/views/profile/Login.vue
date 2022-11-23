<template>
    <div>
        <NavBar>
            <template v-slot:default>登录</template>
        </NavBar>

        <div style="margin-top: 50px;">
            <div style="text-align: center;padding-top: 50px;">
                <van-image
                width="200"
                height="50"
                src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
                />
            </div>
        </div>

        <van-form @submit="onSubmit">
            <van-cell-group inset>
                <van-field
                v-model="email"
                name="邮箱"
                label="邮箱"
                placeholder="请输入邮箱"
                :rules="[{ required: true, message: '请填正确的邮箱' }]"
                />
                <van-field
                v-model="password"
                type="password"
                name="密码"
                label="密码"
                placeholder="密码"
                :rules="[{ required: true, message: '请填写密码' }]"
                />
            </van-cell-group>
            <div style="margin: 16px;">
                <div class="link_login" @click="$router.push('/register')">
                    没有账号，立即注册
                </div>
                <van-button round block color="#44b83" type="primary" native-type="submit">
                提交
                </van-button>
            </div>
        </van-form>
      
    </div>
</template>

<script setup>
import { reactive, ref, toRefs } from "@vue/reactivity";
import NavBar from "components/common/navbar/NavBar"
import { useRouter } from "vue-router";
import {login} from 'network/user'
import { Notify,Toast } from 'vant';
import { useStore } from "vuex";
    const userInfo = reactive({
        email:'',
        password:'',
    })
    const router = useRouter()
    const store = useStore()
    const {email,password} = toRefs(userInfo)

    const onSubmit = (values) => {
        
        login(userInfo).then(res=>{

            store.commit('setIsLogin',true)

            localStorage.setItem('token1',res.access_token)
            Toast.success('登录成功')
            userInfo.email = ''
            userInfo.password = ''

            setTimeout(()=>{
                router.go(-1)
            },500)
        })
    };
</script>

<style lang="scss" scoped>
.link_login{
    font-size: 14px;
    margin-bottom: 20px;
    color:#42b983;
    display: inline-block;

}
</style>