import axios from 'axios'

const $http = axios
const API_VERSION = '1.0'
const PROXY = '/service'
const TYPE_DEV = 'development'
const context = process.env.NODE_ENV === TYPE_DEV ? PROXY : ''
const URL_COMMAND = context + '/action/command'
const URL_LOGIN = context + '/action/login'
// const URL_LOGOUT = context + '/action/logout'

//登录
export const login = (data) => $http.post(URL_LOGIN, Object.assign({}, {
    version: API_VERSION,
    command: 'LOGIN',
    context: data
}))

// 用户管理
export const modifyPassword = (data, config) => $http.post(
    URL_COMMAND, {
        version: API_VERSION,
        command: 'ModifyPassword',
        content: data || {}
    }, {
        loading: (config && config.loading) || true
    }
)
