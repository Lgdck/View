import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlus from './plugins/element'
import './assets/css/icon.css'
import 'lib-flexible'
import './assets/font/iconfont.css'
// import Vue from 'vue'
import './plugins/element.js'

const app = createApp(App)
app.config.productionTip = false
installElementPlus(app)
app
    .use(store)
    .use(router)
    .mount('#app')
