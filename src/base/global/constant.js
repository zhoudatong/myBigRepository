// import result from "../common/common"
export const DEFAULT_LANG = 'chinese';

export const DEV_HOST = 'http://192.168.129.42/';
export const REMEMBER_PASSWORD = "**********";

export const HOST = process.env.NODE_ENV === 'development'? DEV_HOST :  window.location.origin + '/';

/**
 * localstorage存储关键字
 */
export const LOCAL_STORAGE = {
    LANG:'language',
    INFOR: 'userInformation',
    ALARMDATAS: 'alarmDatas'
}


// TX1 http接口错误码
export const ERRCODE = {
    OK: 0,                  /*成功*/ 
    UNKNOWN: -1,            /*未知错误*/
    NOT_AUTH: -8,           /*用户密码错误*/
}

export const SERVER_ERRCODE = {

}