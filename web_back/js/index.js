$(function () {
    //加载管理员信息
    new Vue({
        el: '#user_info',
        data: {
            nickname: '',
            userPic: ''
        },
        mounted() {
            $.ajax({
                url:'http://localhost:8080/admin/user/info',
                type:'get',
                dataType:'json',
                success:(backData)=>{
                    this.nickname = backData.data.nickname
                    this.userPic = backData.data.userPic
                }
            });
        },
    })

    //退出按钮点击事件
    $('.icon-tuichu').parent().on('click', function (e) {
        e.preventDefault();
        $('#myModal').modal({
            keyboard: true
        })
    })
    $('.btn-primary').on('click', function () {
        window.location.href = 'login.html'
    })
})