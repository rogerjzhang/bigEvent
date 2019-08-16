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
            nitaiBtn(){
                if(this.btnType=='new'){
                    console.log('')
                    this.addType()
                }else if(this.btnType == 'edit'){
                    this.editType()
                }
            },
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
            getList() {
                this.$http.get('http://127.0.0.1:8080/admin/category/list')
                    .then((res) => {
                        if (res.body.code == 200) {
                            this.categorylist = res.body.data
                        }
                    })
            },
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
            // this.$http.get('http://127.0.0.1:8080/admin/category/list')
            //     .then((res) => {
            //         console.log(res)
            //         if(res.body.code == 200){
            //             this.categorylist= res.body.data 
            //         }
            //     })
        },
        components: {
            'mylist': {
                props: ['data'],
                template: '#tr_temp',
                methods: {
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