<template>
    <div>
        <NavBar>
            <template v-slot:default>新用户注册</template>
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
                v-model="name"
                name="用户名"
                label="用户名"
                placeholder="用户名"
                :rules="[{ required: true, message: '请填写用户名' }]"
                />
                <van-field
                v-model="password"
                type="password"
                name="密码"
                label="密码"
                placeholder="密码"
                :rules="[{ required: true, message: '请填写密码' }]"
                />
                <van-field
                v-model="password_confirmation"
                type="password"
                name="确认密码"
                label="确认密码"
                placeholder="确认密码"
                :rules="[{ required: true, message: '请填写一致密码' }]"
                />
                <van-field
                v-model="email"
                name="电子邮箱"
                label="电子邮箱"
                placeholder="请输入正确的电子邮箱格式"
                :rules="[{ required: true, message: '请输入正确的电子邮箱格式' }]"
                />
            </van-cell-group>
            <div style="margin: 16px;">
                <div class="link_login" @click="$router.push('/login')">
                    已有账号，立即登录
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
import {register} from 'network/user'
import { Notify,Toast } from 'vant';
    const userInfo = reactive({
        name:'',
        password:'',
        password_confirmation:'',
        email:''
    })
    const router = useRouter()
    const {name,password,password_confirmation,email} = toRefs(userInfo)

    const onSubmit = (values) => {
        
        if(userInfo.password != userInfo.password_confirmation){
            Notify('两次密码不一致' );
        }else{
            register(userInfo).then(res=>{
                console.log(res)
                if(res.status == 201){
                    Toast.success('注册成功')
                    setTimeout(()=>{
                        router.push({path:'/login'})
                    },1000)
                }
                userInfo.password = ''
                userInfo.password_confirmation = ''
            })
        }

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