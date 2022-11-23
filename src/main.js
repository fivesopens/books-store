import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Lazyload } from 'vant';
import { Toast } from 'vant';
import 'vant/es/toast/style';
createApp(App)
.use(Lazyload,{
    loading:require('./assets/images/default.png')
})
.use(Toast)
.use(store)
.use(router)
.mount('#app')
