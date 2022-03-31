<template>
  <div id="app" :lang="curLang">
    <div id="nav">

      <router-view />
    </div>
  </div>
</template>

<script>
// import axios from 'axios'
import en from 'element-ui/lib/locale/lang/en'
import zh from 'element-ui/lib/locale/lang/zh-CN'
import SessionStorageResult from '@/base/sessionStorage/sessionStorage'
import { LOCAL_STORAGE } from '@/base/global/constant'
import locale from 'element-ui/lib/locale'
// const DEFAULT_LANG_STR = 'CN'
export default {
  name: 'App',
  computed: {
   curLang() {
      const lang = SessionStorageResult.getStorage(LOCAL_STORAGE.LANG) || 'CN'
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.$root.$i18n.locale = lang
      if (lang === 'CN') {
        locale.use(zh)
      } else {
        locale.use(en)
      }
      return this.$root.$i18n.locale
    }

  }
}
</script>
<style lang="less">


</style>
