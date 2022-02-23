/* eslint-disable camelcase */
/**
 * create by hupanpan at 2018-04-10
 * 表单验证
 */

/**
 * 封装策略
 */
 const strategies = {
	/**
	 * 无效的子网掩码
	 */
  maskZore: function (value, errorMsg) {
    var arr = value.split('.'), judge = false
    for (var i = 0, l = arr.length; i < l; i++) {
      if (parseInt(arr[i], 10) !== 0) {
        judge = true
        return
      }
    }
    if (!judge) { return { errorMsg: errorMsg, dom: this } }
  },
	/**
	 * 无效的IP或网关
	 */
  disableIpOrGateway: function (value, errorMsg) {
    var arr = value.split('.'), num = parseInt(arr[arr.length - 1], 10)
    if (num === 0 || num === 255) { return { errorMsg: errorMsg, dom: this } }
  },
	/**
	 * 不能为空
	 * @param {Object} value
	 * @param {Object} errorMsg
	 */
  isNonEmpty: function (value, errorMsg) {
    if (value === '') { return { errorMsg: errorMsg, dom: this } }
  },
	/**
	 * 多选框至少选择一个
	 * @param {Object} value
	 * @param {Object} errorMsg
	 */
  isNonCheckbox: function (value, errorMsg) {
    if (value === '0') { return { errorMsg: errorMsg, dom: this } }
  },
	/**
	 * 不能为空数组
	 */
  isNonEmptyArr: function (value, errorMsg) {
    if (!value || value.length < 1) { return { errorMsg: errorMsg, dom: this } }
  },
	/**
	 * 限制最小长度
	 * @param {Object} value
	 * @param {Object} length
	 * @param {Object} errorMsg
	 */
  minLength: function (value, length, errorMsg) {
    if (value.length < length) { return { errorMsg: errorMsg, dom: this } }
  },
	/**
	 * 限制最大长度
	 * @param {Object} value
	 * @param {Object} length
	 * @param {Object} errorMsg
	 */
  maxLength: function (value, length, errorMsg) {
    if (value.length > length) { return { errorMsg: errorMsg, dom: this } }
  },
	/**
	 * 限制最大字节
	 * @param {Object} value
	 * @param {Object} length
	 * @param {Object} errorMsg
	 */
  maxByte: function (value, length, errorMsg) {
		/* 计算输入的字节*/
    function strlen(str) {
      var len = 0
      for (var i = 0; i < str.length; i++) {
				// 取出单个字符
        var c = str.charCodeAt(i)
				// 单字节加1 ，0~9，a~z
        if ((c >= 0x0001 && c <= 0x007e) || (c >= 0xff60 && c <= 0xff9f)) {
          len++
        } else {
          len += 2
        }
      }
      return len
    }
    if (strlen(value) > length) { return { errorMsg: errorMsg, dom: this } }
  },
	/**
	 * 手机号码格式
	 * @param {Object} value
	 * @param {Object} errorMsg
	 */
  isMobile: function (value, errorMsg) {
    if (!/(^1[3|5|8][0-9]{9}$)/.test(value)) { return { errorMsg: errorMsg, dom: this } }
  },
	/**
	 * 密码一致性检测
	 * @param {Object} val_1
	 * @param {Object} val_2
	 * @param {Object} errorMsg
	 */
  passwConsistent: function (val_1, val_2, errorMsg) {
    if (val_1 !== val_2) { return { errorMsg: errorMsg, dom: this } }
  },
	/**
	 * 正则验证
	 */
  regexValidator: function (value, regex, errorMsg) {
    const reg = new RegExp(regex)
    if (!reg.test(value)) { return { errorMsg: errorMsg, dom: this } }
  },
	/**
	 * 正则验证
	 */
  regexValidator1: function (value, regex, errorMsg) {
    const reg = new RegExp('^(' + regex + '://)', 'i')
    if (!reg.test(value)) { return { errorMsg: errorMsg, dom: this } }
  },
	/**
	 * 正则验证最多保留五位小数
	 */
  regexValidator2: function (value, errorMsg) {
    if (value) {
      const reg = /^-?\d{1,3}(?:\.\d{1,5})?$/
      if (!reg.test(value)) { return { errorMsg: errorMsg, dom: this } }
    }
  },
  regexValidatorUsbcam: function (value, errorMsg) {
    const reg = new RegExp('^(usbcam://video0|usbcam://video1)$')
    if (!reg.test(value)) { return { errorMsg: errorMsg, dom: this } }
  },
  litterThan: function (value, num, errorMsg) {
    if (Math.abs(value) - num > 0) { return { errorMsg: errorMsg, dom: this } }
  },
  isNotNumber: function(value, errorMsg) {
    if (isNaN(value)) { return { errorMsg: errorMsg, dom: this } }
  },
	/**
	 * 检验首尾是否有空格
	 * @param {Object} value
	 * @param {Object} errorMsg
	 */
  trailingSpaces: function (value, errorMsg) {
    const reg = /(^\s+)|(\s+$)/g
    if (reg.test(value)) { return { errorMsg: errorMsg, dom: this } }
  },
  positiveInteger: function(value, errorMsg) {
    if (isNaN(value)) { return { errorMsg: errorMsg, dom: this } }
    if (parseInt(value) - value !== 0) { return { errorMsg: errorMsg, dom: this } }
  },
  betweenNumber: function(value, obj, errorMsg) {
    const sizeData = JSON.parse(obj)
    if (sizeData[0] - value > 0 || sizeData[1] - value < 0) { return { errorMsg: errorMsg, dom: this } }
  },
  minRatherMax: function (value, obj, errorMsg) {
    const sizeData = JSON.parse(obj)
    if (sizeData[0] - sizeData[1] > 0) { return { errorMsg: errorMsg, dom: this } }
  },
  minNumber: function(value, num, errorMsg) {
    if (value - num < 0) {
      return { errorMsg: errorMsg, dom: this }
    }
  },
  isPort: function(value, errorMsg) {
    const reg = /^([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-4]\d{4}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/
    if (!reg.test(value)) {
      return { errorMsg: errorMsg, dom: this }
    }
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
 * 判断字符长度,
 *一个汉字等于两个字符
 */
// function gblen (str) {
//   var len = 0
//   for (var i = 0; i < str.length; i++) {
//     if (str.charCodeAt(i) > 127 || str.charCodeAt(i) == 94) {
//       len += 2
//     } else {
//       len++
//     }
//   }
//   return len
// };

/**
 * validator类
 * 负责接收用户请求并委托给strategies对象
 */
const Validator = function () {
  this.cache = [] // 保存校验规则
}
/**
 *
 * @param {Object} dom 节点
 * @param {Object} rules 规则
 * @param{Boolean} judge 判断是否要过滤掉首尾的空格
 */
Validator.prototype.add = function (dom, rules, judge) {
  const self = this
  // eslint-disable-next-line no-cond-assign
  for (let i = 0, rule; rule = rules[i++];) {
    (function(rule) {
      const strategyAry = rule.strategy.split(':')
      const errorMsg = rule.errorMsg

      self.cache.push(function () {
        const strategy = strategyAry.shift()
        strategyAry.unshift(judge ? dom.value : trim(dom.value))
        strategyAry.push(errorMsg)
        return strategies[strategy].apply(dom, strategyAry)
      })
    })(rule)
  }
}
/**
 * 校验规则二
 */
Validator.prototype.addAnother = function (dom, val, rules) {
  const self = this
  // eslint-disable-next-line no-cond-assign
  for (let i = 0, rule; rule = rules[i++];) {
    (function(rule) {
      const strategyAry = rule.strategy.split(':')
      const errorMsg = rule.errorMsg

      self.cache.push(function () {
        const strategy = strategyAry.shift()
        strategyAry.unshift(val)
        strategyAry.push(errorMsg)
        return strategies[strategy].apply(dom, strategyAry)
      })
    })(rule)
  }
}
Validator.prototype.start = function () {
  // eslint-disable-next-line no-cond-assign
  for (let i = 0, validatorFunc; validatorFunc = this.cache[i++];) {
    const errorMsg = validatorFunc()
    if (errorMsg) {
      return errorMsg
    }
  }
}
export default {
  validator: Validator
}
