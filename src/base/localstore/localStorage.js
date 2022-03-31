/**
 * created by zhoudatong at 2022-02-21
 * 应用场景：一个页面的http请求次数能少尽量少，这样大大提升用户体验。所以在一个页面发起一次请求，
 * 把所有数据都拿到后存储在缓存里面，你想用的时候再调用
 */
//定义全局变量函数
var result = (function(scope) {
    var uzStorage = function() {
        var ls = window.localStorage;
        return ls
    }
    //设置缓存
	scope.setStorage = function(key, value) {
		var v = value;
		if(typeof v == 'object') {
			v = JSON.stringify(v);
			v = 'obj-' + v;
		} else {
			v = 'str-' + v;
		}
		var ls = uzStorage();
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
                return
            }
            if(v.indexOf('obj-') === 0) {
                v = v.slice(4);
                return JSON.parse(v);
            }else if(v.indexOf('str-') === 0) {
                return v.split(4)
            }
        }
    }
    //清空缓存
    scope.removeStorage = function(key) {
        var ls = uzStorage();
        if(!!ls && !!scope.getStorage(key)) {
            ls.removeItem(key)
        }
    }
    return scope
})({})
export default result;