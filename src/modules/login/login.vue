<template>
  <div class="login">
    <div class="login-tr-box">
      <el-select v-model="curSelectLang" @change="selectLang">
        <el-option
          v-for="item in langList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
    <div class="login-wrap">
      <div class="login-title">
        <!-- <h2 class="login-cn">登录</h2> -->
        <h2 class="login-en h1-title">{{$t("login.login")}}</h2>
      </div>
      <form>
        <div class="input-box">
          <label>{{$t("login.username")}}</label>
          <input type="text" id="loginUserName" v-model="username" autocomplete="off" @keyup.enter.native="dealLogin"/>
        </div>
        <div class="input-box">
          <label>{{$t("login.password")}}</label>
          <input type="password" id="loginPassword" v-model="password" autocomplete="off" @keyup.enter.native="dealLogin"/>
        </div>
        <div class="remenber-me">
          <el-checkbox checked v-model="checked" >{{$t("login.rememberpwd")}}</el-checkbox>
        </div>
        <button class="sub-bottom" @keyup.enter.native="dealLogin" @click.enter="dealLogin">{{$t("login.submit")}}</button>
        <!-- <el-button type="primary" popper-class="sub-bottom" :popper-append-to-body="false">Submit</el-button> -->
      </form>
    </div>
  </div>
</template>
<script>
// import axios from "axios";
import { DEFAULT_LANG, LOCAL_STORAGE } from "@/base/global/constant";
import SessionStorageResult from "@/base/sessionStorage/sessionStorage";
import loginFactory from "@/base/login/loginFactory";
import locale from "element-ui/lib/locale";
import en from "element-ui/lib/locale/lang/en";
import zh from "element-ui/lib/locale/lang/zh-CN";
import Validator from "@/base/common/validator";
export default {
  data() {
    return {
      curSelectLang: DEFAULT_LANG,
      username:"",
      password:"",
    };
  },
  mounted() {
    let _language = SessionStorageResult.getStorage(LOCAL_STORAGE.LANG);
    this.curSelectLang =
      (_language && _language === "CN" ? "chinese" : "english") || DEFAULT_LANG;
    // this.$root.eventsBus.$on("locale.change", (language) => {
    // this.curSelectLang =
    //     (language && (language === "CN" ? "chinese" : "english")) ||
    //     DEFAULT_LANG;
    //   // 将标题也进行修改
    //   // document.getElementsByTagName('title')[0].innerText = this.$root.$t('common.productName');
    // });
  },
  methods: {
    //选择语言
    selectLang(value) {
      if (value === "chinese") {
         SessionStorageResult.setStorage(LOCAL_STORAGE.LANG, "CN");
         this.$root.$i18n.locale = "CN"; //在main.js里面设置i18n的值
         locale.use(zh);
      } else if (value === 'english') {
         SessionStorageResult.setStorage(LOCAL_STORAGE.LANG,'EN');
         this.$root.$i18n.locale = "EN"; //在main.js里面设置i18n的值
         locale.use(en);
      }
    },
    //表单验证
    validataFunc(){
      const validator = new Validator.validator();//创建一个创建一个validator对象
      //添加一些校验规则
      validator.add(document.getElementById("loginUserName"),[
        {
          strategy: "isNonEmpty",
          errorMsg: this.$t("login.nameIsNotEmpty")
        }
      ]);
      validator.add(document.getElementById("loginPassword"),[
        {        
          strategy: "isNonEmpty",
          errorMsg: this.$t("login.passwordLengthLimit")
        },
        {
          strategy: "minLength:6",
          errorMsg: this.$t("login.passwordLengthLimit"),
        },
        {
           strategy: "maxLength:18",
          errorMsg: this.$t("login.passwordLengthMax"),
        }
      ]);
     
      return validator.start()
    },

    //处理登录
    dealLogin() {
    const errorMsg = this.validataFunc();
    if(errorMsg) {
       this.$message({
          type: "error",
          showClose: true,
          duration: "1500",
          message: errorMsg.errorMsg,
        });
        return; // 阻止提交表单
    }
    }
  },
  computed: {
    langList() {
      return [
        {
          value: "chinese",
          label: this.$root.$t("language.chinese"),
        },
        {
          value: "english",
          label: this.$root.$t("language.english"),
        }
      ];
    },
  },
  beforeDestroy(){
    this.$root.eventsBus.$off("locale.change");
  }
};
</script>
<style lang="less">
.login {
  position: fixed;
  width: 100%;
  height: 100%;
  background-size: cover;
  -webkit-background-size: cover;
  background: url("~@/assets/login/login-bgc.png") no-repeat center;
  background-size: 100% 100%;
  z-index: -10;
  .login-wrap {
    width: 400px;
    height: 400px;
    background: rgba(182, 160, 160, 0.6);
    box-shadow: 0 15px 25px rgba(0, 0, 0, 0.5);
    border-radius: 10px;
    box-sizing: border-box;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    overflow: hidden;
    .login-title {
      h2 {
        color: #fff;
        padding: 30px 0;
        height: 24px;
        line-height: 24px;
      }
    }
     form{
         color: #fff;
         .input-box{
             height: 60px;
             line-height: 60px;
             width: 80%;
             margin: 0 auto;
             border-bottom: 1px solid #fff;
             display: flex;
             margin-top: 10px;
            input{
               width: 100%;
               float: right;
               flex: 7;
               font-size: 14px;
               caret-color: #fff;
               color: #fff;
               
            }
            label{
              flex: 3;
              float: left;
              // background: lightcoral;
            }
        }
        button{
          margin-left: 40px;
        }
        .remenber-me{
          font-size: 12px;
          margin: 20px 20px 0 40px;
          .el-checkbox__label{
            color: #fff;
          }
        }
     }
  }
}
</style>