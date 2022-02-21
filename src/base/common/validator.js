/**
 * create by zhoudatong at 2022-1-14
 * 表单验证
 */

/**
 * 封装策略
 * 
 */
const strategies = {
 
/**
 * 不能为空
 * @param {Object} value
 * @param {Object} errorMsg
 */
 isNonEmpty: function (value, errorMsg) {
    if (value === '') { return { errorMsg: errorMsg, dom: this } }
  },
  /**
   * 多选框至少选一个
   * @param {Object} value 
   * @param {Object} errorMsg 
   */
  isNonCheckbox: function (value, errorMsg) {
      if (value === 0) {return {errorMsg:errorMsg , dom:this} }
  },

  /**
   * 不能为空数组 
   */
  isNonEmptyArr: function (value, errorMsg) {
      if(!value || value.length <1) { return {errorMsg: errorMsg, dom: this } }
  },

  /**
   * 限制最小长度
   * @param {Object} value
   * @param {Object} length
   * @param {Object} errorMsg
   */
  minLength: function (value, length, errorMsg ) {
      if ( value.length<length ) {return {errorMsg: errorMsg , dom: this }}
  }


}

/**
 * 删除字符串两端的空格
 * @param {Object} str
 */
 function trim(str) {
    return str.replace(/(^\s*)|(\s*$)/g, '')
  }

/**
 * validator类
 * 负责接收用户请求并委托给strategies对象
 */
const Validator = function () {
    this.cache = [] //保存校验规则
}

/**
 *
 * @param {Object} dom 节点
 * @param {Object} rules 规则
 * @param{Boolean} judge 判断是否要过滤掉首尾的空格
 */
 Validator.prototype.add = function (dom, rules, judge) {
    const self = this;
    for (let i = 0 , rule; rule = rules[i++];) {
        (function(rule) {
            const strategyAry = rule.strategy.split(":")
            const errorMsg = rule.errorMsg
            self.cache.push(function () {
                const strategy = strategyAry.shift();
                strategyAry.unshift(judge ? dom.value : trim(dom.value))
                strategyAry.push(errorMsg);
                return strategyAry[strategy].apply(dom,strategyAry)
            })
        })(rule)
    } 
}
/**
 * 校验规则二
 */
 Validator.prototype.addAnother = function (dom, val, rules) {
    const self = this;
    for(let i = 0 , rule;rule = rules[i++];){
        (function(rule) {
            const strategyAry = rule.strategy.split(":");
            const errorMsg = rule.errorMsg
            self.cache.push(function() {
                const strategy = strategyAry.shift();
                strategyAry.unshift(val);
                strategyAry.push(errorMsg)
                return strategies[strategy].apply(dom, strategyAry)
            })

        })(rule)
    }
}
Validator.prototype.start = function () {
    for(let i = 0, validatorFunc; validatorFunc = this.cache[i++];){
        const errorMsg = validatorFunc();
        if (errorMsg) {
            return errorMsg
        }
    }
}
export default {
    validator: Validator
}
