import ElementPlus from 'element-plus'
import { createI18n } from 'vue-i18n'
import 'element-plus/lib/theme-chalk/index.css'
import localeZH from 'element-plus/lib/locale/lang/zh-cn'
import localeEN from 'element-plus/lib/locale/lang/en'
import messages from '../utils/i18n'
// import Vue from 'vue'
// import { Container, Header, Aside, Main, Footer, Button, Menu, Submenu, MenuItemGroup, MenuItem } from 'element-ui'
//
// Vue.use(Container)
// Vue.use(Header)
// Vue.use(Aside)
// Vue.use(Main)
// Vue.use(Footer)
// Vue.use(Button)
// Vue.use(Menu)
// Vue.use(Submenu)
// Vue.use(MenuItemGroup)
// Vue.use(MenuItem)
const i18n = createI18n({
  locale: localeZH.name,
  fallbackLocale: localeEN.name,
  messages,
})

export default (app) => {
  app.use(ElementPlus, { locale:localeZH })
  app.use(i18n)
}
