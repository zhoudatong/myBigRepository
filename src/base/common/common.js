var result = (function(scope) {
    /**
     * 去掉字符串两端的空格
     */
    scope.trim = (str) =>{
        return str.replace(/(^\s*)|(\s*$)/g, "")
    }
})
export default result;