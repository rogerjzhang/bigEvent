window.onload = function () {
    // $('#submitBtn').on('click',function(e){
    //     e.preventDefault()
    //     console.log(parent.userVm)
    // })
    new Vue({
        el: '#userInfo',
        data: {
            username: '',
            nickname: '',
            email: '',
            userPic: '',
            password: '',
            pic: ''
        },
        methods: {
            //图片预览
            reloadPic(e){
                this.userPic = URL.createObjectURL(e.target.files[0])
            },
            //修改个人信息
            recompose(){
                let fd = new FormData()
                // console.log(fd.get('username'))
                for(let key in this._data){
                    fd.append(key,this._data[key])
                    // console.log(fd.get(key))
                }
                // console.log(fd.get('userPic'))
                fd.append('userPic',this.$refs.userPic.files[0])
                // console.log(fd.get('userPic'))
                this.$http.post('http://127.0.0.1:8080/admin/user/edit',fd)
                    .then((res) => {
                        if(res.body.code == 200){
                            // alert('修改成功');
                            parent.userVm.nickname = this.nickname
                            parent.userVm.userPic = this.userPic
                            parent.headVm.userPic = this.userPic
                        }
                    })
            }
        },
        mounted() {
            //获取用户信息
            this.$http.get('http://127.0.0.1:8080/admin/user/detail')
                .then((res) => {
                    if (res.body.code == 200) {
                        let data = res.body.data
                        for (let key in data) {
                            this[key] = data[key]
                        }
                    }
                })
        },
    })
}