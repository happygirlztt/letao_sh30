$(function() {
  //需求：
  // 1进行表单校验配置
  // 校验要求
  //     用户名不能为空 长度为2-6位
  //     密码不能为空 长度位6-12位

  //配置小图标
  $("#form").bootstrapValidator({
    feedbackIcons: {
      valid: "glyphicon glyphicon-ok", //校验成功
      invalid: "glyphicon glyphicon-remove", //校验失败
      validating: "glyphicon glyphicon-refresh" //校验中
    },

    //   配置校验字段(配置之前，需要先配置 input 的 name)
    fields: {
      // 配置用户名
      username: {
        // 配置校验规则
        validators: {
          // 非空校验
          notEmpty: {
            message: "用户名不能为空"
          },
          // 长度校验
          stringLength: {
            min: 2,
            max: 6,
            message: "用户名长度必须是2-6位"
          }
        }
      },
      // 配置密码

      password: {
        validators: {
          // 非空校验
          notEmpty: {
            message: "密码不能为空"
          },
          // 长度校验
          stringLength: {
            min: 6,
            max: 12,
            message: "密码长度必须是6-12位"
          }
        }
      }
    }
  });

  // 2 注册表单校验成功事件 在事件中阻止默认成功的表单提交，通过ajax 进行提交
  $("#form").on("success.form.bv", function(e) {
    //阻止默认的表单提交
    e.preventDefault();
    //使用ajax提交逻辑
    // console.log("阻止默认的提交，通过ajax提交");
    $.ajax({
      type: "post",
      url: "/employee/employeeLogin",
      data: $("#form").serialize(),
      dataType: "json",
      success: function(info) {
        console.log(info);
        if (info.sucess) {
          location.href("index.html");
        }
        if (info.error === 1000) {
          alert(info.message);
        }
        if (info.error === 1001) {
          alert(info.message);
        }
      }
    });
  });
});

// 3重置功能(本身reset按钮可以重置内容，需要调用表单校验插件的方法，重置校验验证)
$('[type="reset"]').click(function() {
  // 重置状态
  $("#form")
    .data("bookstrapValidator")
    .resetForm(true);
});