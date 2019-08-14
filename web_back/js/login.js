window.onload = () => {
    new Vue({
        el: '.main_wrap',
        data: {
            username: '',
            password: '',
        },
        methods: {
            login() {
                const {
                    username,
                    password
                } = this
                if (username == '' || password == '') {
                    $('.modal-body').html('请输入用户名或密码')
                    $('#myModal').modal({
                        keyboard: true
                    })
                    return
                }
                this.$http
                    .post('http://localhost:8080/admin/user/login', {
                        username,
                        password
                    }, {
                        emulateJSON: true
                    })
                    .then((res) => {
                        console.log('')
                        if (res.body.code == 200) {
                            window.location.href = 'index.html'
                        } else {
                            $('.modal-body').html('用户名或密码错误,请重新输入')
                            $('#myModal').modal({
                                keyboard: true
                            })
                        }
                    })
            }
        },
    })
}