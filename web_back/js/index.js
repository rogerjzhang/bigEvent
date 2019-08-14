$(function () {
    //加载管理员信息
    new Vue({
        el: '#user_info',
        data: {
            nickname: '',
            userPic: ''
        },
        mounted() {
            this.$http.get('http://localhost:8080/admin/user/info')
                .then(res => {
                    console.log(res)
                    this.nickname = res.body.data.nickname
                    this.userPic = res.body.data.userPic
                })
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