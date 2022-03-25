$(function() {
  $("#reg").on("click", function () {
    $(".login-box").hide()
    $(".reg-box").show()
    })
  
    $("#log").on("click", function () {
      $(".login-box").show()
      $(".reg-box").hide()
    })
  
  
  
    // 获取layui的form对象
  var form = layui.form
  
  var layer = layui.layer

  // 通过form.verify()方法自定义验证规则
 form.verify({
  pwd: [
    /^[\S]{6,12}$/,'密码必须6到12位，且不能出现空格'
  ],

  repwd: function (value) {
    // 通过形参拿到的是确认密码框中的内容
    // 还需要拿到密码框中的内容
    // 然后进行一次等于的判断
    // 如果判断失败,则return一个提示消息即可
    var pwd = $('.reg-box [name=password]').val()

    if (pwd !== value)
    {
        return "两次密码不一致"
    }
  }

})

 

 // 监听注册表单的提交事件
 $('#form_reg').on('submit', function (e) {
   e.preventDefault();

   var data = {
    username: $('#form_reg [name=userName]').val(),
    password: $('#form_reg [name=password]').val()
   }
   
   $.post('/api/reguser',data,function (res) {
    if (res.status !== 0) {
      return layer.msg(res.message)
    }
    layer.msg("注册成功")
    //  模拟人的点击行为
     $('#log').click()
    })

 })
  
  
  // 监听登录表单的登录事件
  $('#login-form').submit(function (e) {
    // 阻止默认事件触发
    e.preventDefault()
    var data = {
      username: $('#login-form [name=userName]').val(),
      password: $('#login-form [name=password]').val()
    }
    
    $.post('/api/login', data, function (res) {

      if (res.status !== 0) {
        return layer.msg("登录失败") 
      }
      layer.msg("登录成功")
      // 登录成功后会获取token字符串，并把token值保存到localStorage
      localStorage.setItem('token', res.token)
      // 跳转到后台主页
      location.href = '/index.html'
    })
    
  })
})



