
import store from '../store'
import { createRouter, createWebHistory } from 'vue-router'

const Home = () => import('../views/home/Home')
const Categroy = () => import('../views/categroy/Categroy')
const Detail = () => import('../views/detail/Detail')
const Profile = () => import('../views/profile/Profile')
const Shopcart = () => import('../views/shopcart/Shopcart')
const Register = ()=>import('../views/profile/Register')
const Login = () =>import('../views/profile/Login')
const Address = ()=>import('../views/profile/Address')
const AddressEdit =()=>import('../views/profile/AddressEdit')
const CreateOrder = ()=>import('../views/order/CreateOrder')
const OrderDetail = ()=>import('../views/order/OrderDetail')
const Order = ()=>import('../views/order/Order')
const routes = [
  {
    path: '',
    name: 'DefaultHome',
    component: Home,
    meta:{
      title:'图书兄弟'
    }
  },
  {
    path: '/home',
    name: 'Home',
    component:Home,
    meta:{
      title:'图书兄弟'
    }
  },
  {
    path: '/categroy',
    name: 'Categroy',
    component:Categroy,
    meta:{
      title:'图书兄弟-商品分类'
    }
  },
  {
    path: '/detail',
    name: 'Detail',
    component:Detail,
    meta:{
      title:'图书兄弟-商品详情'
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component:Profile,
    meta:{
      title:'图书兄弟-个人中心',
      isAuthRequired:true
    }
  },
  {
    path: '/address',
    name: 'Address',
    component:Address,
    meta:{
      title:'图书兄弟-地址管理',
      isAuthRequired:true
    }
  },
  {
    path: '/addressedit',
    name: 'AddressEdit',
    component:AddressEdit,
    meta:{
      title:'图书兄弟-地址编辑',
      isAuthRequired:true
    }
  },
  {
    path: '/register',
    name: 'Register',
    component:Register,
    meta:{
      title:'图书兄弟-注册账号'
    }
  },
  {
    path: '/login',
    name: 'Login',
    component:Login,
    meta:{
      title:'图书兄弟-登录'
    }
  },
  {
    path: '/shopcart',
    name: 'Shopcart',
    component:Shopcart,
    meta:{
      title:'图书兄弟-购物车',
      isAuthRequired:true
    }
  },
  {
    path: '/createorder',
    name: 'CreateOrder',
    component:CreateOrder,
    meta:{
      title:'图书兄弟-订单预览',
      isAuthRequired:true
    }
  },
  {
    path: '/orderdetail',
    name: 'OrderDetail',
    component:OrderDetail,
    meta:{
      title:'图书兄弟-订单详情',
      isAuthRequired:true
    }
  },
  {
    path: '/order',
    name: 'Order',
    component:Order,
    meta:{
      title:'图书兄弟-订单列表',
      isAuthRequired:true
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to,from,next)=>{
  
  if(to.meta.isAuthRequired && store.state.user.isLogin === false ){

    return next('/login')

  }else{

    
    next();

  }

 
  document.title = to.meta.title

})

export default router
