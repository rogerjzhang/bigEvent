window.onload = function () {
    new Vue({
        el: '#app',
        data: {
            categorylist: [],//文章类型数组
            selCategory:'',//选择的类型
            selStatus:'',//选择的状态
            aritcleList: [],//文章数组
            totalCount: 0,//总文章数
            totalPage: 1,//总页数
        },
        methods: {
            //获取所有文章类型
            getTypeList() {
                this.$http.get('http://127.0.0.1:8080/admin/category/list')
                    .then((res) => {
                        if (res.body.code == 200) {
                            this.categorylist = res.body.data
                        }
                    })
            },
            getAritcleList(){
                let {selCategory,selStatus} = this
                this.$http.get('http://127.0.0.1:8080/admin/article/query',
                {selCategory,selStatus,page:1,perpage:'10'})
                .then(res=>{
                    console.log(res)
                    if(res.body.code == 200){
                        this.aritcleList = res.body.data.data
                        this.totalCount = +res.body.data.totalCount
                        this.totalPage = +res.body.data.totalPage
                    }
                })
            }
        },
        mounted() {
            this.getTypeList()
            this.getAritcleList()
        },
    })
}