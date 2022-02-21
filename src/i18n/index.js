import VueI18n from 'vue-i18n'
import Vue from 'vue'
import * as i18nCN from './lang/cn.js' //会将若干export导出的内容组合成一个对象返回
import * as i18nEN from './lang/en.js'
import enLocale from "element-ui/lib/locale/lang/en"
import zhLocale from "element-ui/lib/locale/lang/zh-CN"

Vue.use(VueI18n)

export default new VueI18n({
    locale:'CN',
    messages:{
        CN: Object.assign({},i18nCN,zhLocale),
        EN: Object.assign({},i18nEN,enLocale),
    }
})