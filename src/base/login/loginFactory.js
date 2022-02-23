/**
 *  login 的相关组件
 */
import {
    login
} from '@/api'
import {
    Message
} from 'element-ui'
import router from '@/router'
import localStorageFunc from '@/base/localstore/localStorage'
import {
    DEFAULT_ROUTE,
    ERRCODE,
    LOCAL_STORAGE,
    REMEMBER_PASSWORD
} from '@/base/global/constant'
import md5 from 'js-md5'
import i18n from '@/i18n'
import {
    SERVER_ERRCODE
} from '../global/constant'
console.log(localStorageFunc,'111');
console.log(LOCAL_STORAGE.INFOR,'222');
console.log(login,'44');
var result = (function (scope) {

    /**
     * 登录处理
     * @param {string} user
     * @param {string} pwd
     */
    scope.dealLogin = (user, pwd) => {
        let userInfor = localStorageFunc.getStorage(LOCAL_STORAGE.INFOR);
        if (!!userInfor && pwd === REMEMBER_PASSWORD && user === userInfor.username) {
            var data = userInfor;
        } else {
            var data = {
                username: user,
                passwd: md5(`${user}&${pwd}`)
            }
        }
        login(data).then(res => {
            if (res.data.errcode === ERRCODE.OK) {
                localStorage.storeUserInfo(user, data.passwd, res.data.content.token);

                console.log(res, '888');
                router.push({
                    path: DEFAULT_ROUTE.PATH
                });
            } else if (res.data.errcode === ERRCODE.NOT_AUTH) {
                Message({
                    message: i18n.t("common.usernameOrPasswordError"),
                    duration: '1500',
                    showClose: true,
                    type: 'error'
                })
            } else {
                Message({
                    type: 'error',
                    duration: '1500',
                    showClose: true,
                    message: i18n.t("serverError." + SERVER_ERRCODE[res.data.errcode])
                })
            }
        })

    }
})({})
export default result;