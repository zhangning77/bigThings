$.ajaxPrefilter(function (options) {
  // url路径的自动拼接
  options.url = 'http://www.liulongbin.top:3007' + options.url

   // 统一为有权限的接口，设置 headers 请求头
  if (options.url.indexOf('/my/') !== -1) {
    options.headers = {
      Authorization: localStorage.getItem('token') || ''
    }
  }
  
  // 无论请求成功还是不成功都会执行这个函数
  options.complete = function (res) {
    // 在 complete 回调函数中，可以使用 res.responseJSON 拿到服务器响应回来的数据
    if (res.responseJSON.status === 0 || res.responseJSON.message === '身份认证失败！') {
      // 强制清空缓存的token
      localStorage.removeItem('token')

      // 重新跳转到登录页
      location.href = '/login.html'
    }
  }

})