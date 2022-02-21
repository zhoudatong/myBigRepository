import axios from 'axios'

const $http = axios
const context = process.env.NODE_ENV === TYPE_DEV ? PROXY : ''
const URL_LOGIN = context + '/action/login'
const URL_LOGOUT = context + '/action/logout'

//登录
export const login (data, config) => $http.post() 