$(function () {
  
  var form = layui.form
  var layer = layui.layer

  form.verify({
    pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],

    samePwd: function (value) {
      if (value === $('[name=oldPwd]').val()) {
        return '新密码与原密码不能一样！'
      }
    },

    rePwd: function (value) {
      if (value !== $('[name=newPwd]').val()) {
        return '两次密码不一致！'
      }
    }
  })
  // 密码表单的重新设置密码的提交事件
  $('.layui-form').on('submit',function (e) {
    e.preventDefault();
    $.ajax({
      method: 'post',
      url: '/my/updatepwd',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('更新密码失败！')
        }

        layer.msg('更新密码成功！')

        // 重置表单
        $('.layui-form')[0].reset()
      }
    })
  })

})