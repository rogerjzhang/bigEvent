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
                $.ajax({
                    url: 'http://localhost:8080/admin/user/login',
                    type: 'post',
                    dataType: 'json',
                    data: {
                        username,
                        password
                    },
                    success: function (backData) {
                        console.log(backData)
                        if (backData.code == 200) {
                            window.location.href = 'index.html'
                        } else {
                            $('.modal-body').html('用户名或密码错误')
                            $('#myModal').modal({
                                keyboard: true
                            })
                        }
                    }
                });
            }
        },
    })
}