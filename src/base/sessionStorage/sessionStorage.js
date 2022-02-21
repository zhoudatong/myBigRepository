/*
created by zhoudatong at 2022-01-10
这个技术应用场景：一个页面的HTTP请求次数能少就尽量少，这样使得用户体验大大提升。
所以在一个页面发起一个请求，把所有数据都拿到后储存在缓存里面，你想用的时候再调出来。
*/

//定义全局变量
 var result = (function(scope){
     var uzStorage = function() {
         var ls = window.sessionStorage;
         return ls;
     }
     //设置缓存
     scope.setStorage = function(key,value) {
        var v = value;
        if(typeof v == 'object') {
            v = JSON.stringify(v);
            v = 'obj-' + v;
        }else{
            v = 'str-' + v;
        }
        var ls = uzStorage() 
            if(ls) {
                ls.setItem(key, v);
            }
     };
     //获取缓存
     scope.getStorage = function(key) {
        var ls = uzStorage();
        if(ls) {
            var v = ls.getItem(key); 
            if(!v) {
				return;
			}
            if(v.indexOf('obj-') === 0) {  //检索第0位是否是obj-
                v = v.slice(4);  //为了去除拼接的obj-
                return JSON.parse(v);
            }else if(v.indexOf('str-') === 0 ) {
                return v.slice(4);
            }
        }
     };
     //清空缓存
     scope.removeStorage = function (key) {
        var ls = uzStorage();
        if(!!ls && !!scope.getStorage(key)) { //类型转换，将任意变量转成bool值。
            ls.removeItem(key)
        }
     }
     return scope
 }) ({})
 export default result;