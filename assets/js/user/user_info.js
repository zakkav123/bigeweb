$(function(){
    // 获取表单判断里面的值
    const form = layui.form;
    // 自定义校验规则
    form.verify({
        nickname: (value) => {
            if (value.length > 6)return "长度大于六位！"
        }
    })
    // 获取用户信息
    const initUserInfo= () => {
        $.ajax({
            type: "GET",
            url: "/my/userinfo",
            success: (res) => {
                if (res.status!=0) return layer.msg("获取用户信息失败");
                layer.msg("获取用户信息成功")
                console.log(res);
                form.val("formUserInfo", res.data);
            }
        })
    }

    // 重置按钮重新渲染页面
   $('#btnResrt').click(e => {
    e.preventDefault();
    initUserInfo()
    })
    // 发送请求，刷新页面
    $(".layui-form").submit(function(e){
        e.preventDefault();
        $.ajax({
            type: "POST",
            url:"/my/userinfo",
            data:$(this).serialize(),
            success: function(res){
                if(res.status!==0)return layer.msg("重置失败")
                layer.msg("重置成功")
                window.parent.getUserInfo()
            }
        })
    })

    initUserInfo()
})