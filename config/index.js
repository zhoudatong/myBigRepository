/**
 * index.js主要配置文件
 */
// config/index.js
'use strict'
const path = require('path')

module.exports = {
  dev: {
    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
        '/service': {
            target: "http://192.168.129.42", //目标接口域名
            pathRewrite: {
                '^/service': ''
            }
            
        }
    },

    // Various Dev Server settings
    host: 'localhost',
    port: 8000, 
    autoOpenBrowser: true,

    // skipping other options as they are only convenience features
  },
  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../../html/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../../html'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',

    productionSourceMap: true,

    // skipping the rest ...
  },
}