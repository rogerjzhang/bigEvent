window.onload = function () {

    let vm = new Vue({
        el: '#article_category',
        data: {
            categorylist: [],
            name: '',
            slug: '',
            id: '',
            btnType: '',
            showType: ''
        },
        methods: {
            //拟态框确认按钮
            nitaiBtn(){
                if(this.btnType=='new'){
                    console.log('')
                    this.addType()
                }else if(this.btnType == 'edit'){
                    this.editType()
                }
            },
            //增加文章类别
            addType() {
                this.$http.post('http://127.0.0.1:8080/admin/category/add', {
                        name: this.name,
                        slug: this.slug
                    }, {
                        emulateJSON: true
                    })
                    .then(res => {
                        // console.log(res)
                        if (res.body.code == 201) {
                            $('#addModal').modal('hide')
                            this.getList()
                            this.name = ''
                            this.slug = ''
                        }
                    }).catch(err => {
                        // console.log(err)
                        alert('分类名称或别名已存在');
                        return
                    })
            },
            //编辑文章类别
            editType(){
                this.$http.post('http://127.0.0.1:8080/admin/category/edit',{id:this.id,name:this.name,slug:this.slug},{emulateJSON:true})
                .then(res=>{
                    console.log(res)
                    if(res.body.code == 200){
                        $('#addModal').modal('hide')
                        this.getList()
                    }
                })


            },
            //获取所有文章类别
            getList() {
                this.$http.get('http://127.0.0.1:8080/admin/category/list')
                    .then((res) => {
                        if (res.body.code == 200) {
                            this.categorylist = res.body.data
                        }
                    })
            },
            //拟态框显示
            nitai(btnType,data){
                this.btnType = btnType
                $('#addModal').modal('show')
                if(btnType=='new'){
                    this.showType = '新增'
                    this.name = ''
                    this.slug = ''
                }else if(btnType == 'edit'){
                    this.showType = '编辑'
                    console.log(data)
                    this.name = data.name
                    this.slug = data.slug
                    this.id = data.id
                }
            }

        },
        mounted() {
            this.getList()
        },
        components: {
            'mylist': {
                props: ['data'],
                template: '#tr_temp',
                methods: {
                    //删除按钮函数
                    del(id) {
                        if (confirm('确定要删除吗?')) {
                            this.$http.post('http://127.0.0.1:8080/admin/category/delete', {
                                    id
                                }, {
                                    emulateJSON: true
                                })
                                .then(res => {
                                    vm.getList()
                                })
                        }
                    },
                    //按钮框按钮调用父组件方法
                    edit(data){
                        this.$emit('link','edit',data)
                    }
                }
            }
        }
    })
    $('#model_shutoff').on('click', function () {
        $('#addModal').modal('hide')
        vm.name = ''
        vm.slug=''
    })
}