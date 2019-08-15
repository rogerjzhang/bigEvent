window.onload = function () {

    let vm = new Vue({
        el: '#article_category',
        data: {
            categorylist: [],
            name: '',
            slug: '',
            id: ''
        },
        methods: {
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
            getList() {
                this.$http.get('http://127.0.0.1:8080/admin/category/list')
                    .then((res) => {
                        if (res.body.code == 200) {
                            this.categorylist = res.body.data
                        }
                    })
            },
            del(id,index) {
                console.log('123')
                if(confirm('确定要删除吗?')){
                    this.$http.post('http://127.0.0.1:8080/admin/category/delete',{id},{emulateJSON:true})
                    .then(res=>{
                        console.log(res)
                        // this.getList()
                        this.categorylist.splice(index,1)
                    })
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
        // components: {
        //     'mylist': {
        //         props: ['data'],
        //         template: '#tr_temp',
        //         methods: {
        //             del(id) {
        //                 if (confirm('确定要删除吗?')) {
        //                     this.$http.post('http://127.0.0.1:8080/admin/category/delete', {
        //                             id
        //                         }, {
        //                             emulateJSON: true
        //                         })
        //                         .then(res => {
        //                             vm.getList()
        //                         })
        //                 }
        //             }
        //         }
        //     }
        // }
    })
    $('#model_shutoff').on('click', function () {
        $('#addModal').modal('hide')
    })
}