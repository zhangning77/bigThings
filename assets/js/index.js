$(function () {
  // 调用getUserInfo函数
  getUserInfo()
  
  var layer = layui.layer
// 点击按钮，实现退出功能
  $('#loginOut').on('click', function () {
    // 提示用户是否确认退出
    layer.confirm('确定退出登录?', {icon: 3, title:'提示'}, function(index){
      // 清除本地存储的token
      localStorage.removeItem('token')
      // 跳转到登录界面
      location.href = '/login.html'
       // 关闭 confirm 询问框
      layer.close(index);
    });
  })
})

// 定义getUserInfo函数
function getUserInfo() {
  $.ajax({
    method: 'get',
    url: '/my/userinfo',
    // headers 就是请求头配置对象
    // headers: {
    //   Authorization: localStorage.getItem('token') || ''
    // },

    success: function (res) {
      console.log(res)
      if (res.status !== 0) {
         return layui.layer.msg('获取用户信息失败')
       }
      // 调用 renderAvatar 渲染用户的头像
       renderAvatar(res.data)
    }
    
  })
}

// 定义renderAvatar渲染头像函数
function renderAvatar(user) {
  // 显示用户的名称
  var name = user.nickname || user.username
  $('#welcome').html('欢迎&nbsp&nbsp' + name)
  // 显示用户的头像
  if (user.user_pic !== null) {
    $('.layui-nav-img').attr('src', user.user_pic).show()
    $('.text-avatar').hide()
  } else {
    // 没头像显示名字的第一个字母并转换为大写
    $('.layui-nav-img').hide()
    var first = name[0].toUpperCase()
    $('.text-avatar').html(first).show()
  }

}
