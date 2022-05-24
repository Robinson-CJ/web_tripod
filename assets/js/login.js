$(function () {
  $('#link_login').on('click', function () {
    $('.login-box').hide()
    $('.reg-box').show()
  })

  $('#link_reg').on('click', function () {
    $('.reg-box').hide()
    $('.login-box').show()
  })
  //从 layui 中获取 form 对象
  var form = layui.form
  var layer = layui.layer
  //通过 form.verify() 函数自定义规则
  form.verify({
    // 通过形参拿到的是确认密码框中的内容
    // 还需要拿到密码框中的内容
    // 然后进行一次等于的判断
    // 如果判断失败，则 return 一个 提示信息即可
    pass: [
      /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
    ],

    repass: function (newpwd) {
      var oldpwd = $('.reg-box [name=password]').val()

      if (newpwd != oldpwd) {
        return '两次密码不一致'
      }
    }
  })
  //监听注册表单的提交事件
  $('#form-reg').on('submit', function (e) {
    e.preventDefault()

    $.ajax({
      url: '/api/reguser',
      type: 'POST',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.msg)
        }
        layer.msg('注册成功')
        $('#link_reg').trigger('click')
      }
    })
  })

  $('#form-login').on('submit', function (e) {
    e.preventDefault()

    $.ajax({
      url: '/api/login',
      type: 'POST',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.msg)
        }
        layer.msg('登录成功')
        localStorage.setItem('token', res.token)
        location.href = './index.html'
      }
    })
  })
})