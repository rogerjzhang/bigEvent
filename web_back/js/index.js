$(function () {
    let headVm = new Vue({
        el: '.header_bar',
        data: {
            userPic: ''
        },
        methods: {
            showModal(){
                $('#myModal').modal({
                    keyboard: true
                })
            }
        },
    }) 
    //加载管理员信息
    let userVm = new Vue({
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
                    headVm.userPic = res.body.data.userPic
                })
        },
    })
    //退出按钮点击事件
    $('.btn-primary').on('click', function () {
        window.location.href = 'login.html'
    })
    window.userVm=userVm
    window.headVm=headVm
})