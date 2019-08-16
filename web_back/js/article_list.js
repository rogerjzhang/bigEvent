window.onload = function () {
    new Vue({
        el: '#app',
        data: {
            categorylist: [],//文章类型数组
            type:'',//选择的类型
            state:'',//选择的状态
            aritcleList: [],//文章数组
            totalCount: 0,//总文章数
            totalPage: 1,//总页数
            page:1, //当前页
            perpage:10,//每页显示数量
            prevDisabled:'disabled',
            nextDisabled: '',
            isHidden: 'hidden'
        },
        watch: {
            //监视page发送变化时
            page(){
                // console.log(this.page)
                this.getAritcleList()
                if(this.page!=1){
                    this.prevDisabled=''
                }else {
                    this.prevDisabled='disabled'
                }
                if(this.page == this.totalPage){
                    this.nextDisabled='disabled'
                }else {
                    this.nextDisabled = ''
                }
            }
        },
        methods: {
            //下一页
            // next(){
            //     if(this.page != this.totalPage)this.page++
            // },
            // //最后一页
            // next(){
            //     if(this.page != this.totalPage)this.page++
            // },
            //获取所有文章类型
            getTypeList() {
                this.$http.get('http://127.0.0.1:8080/admin/category/list')
                    .then((res) => {
                        if (res.body.code == 200) {
                            this.categorylist = res.body.data
                        }
                    })
            },
            filter(){
                this.page = 1
                this.getAritcleList()
            },
            //获取文章
            getAritcleList(){
                let {type,state,page,perpage} = this
                this.$http.get('http://127.0.0.1:8080/admin/article/query',
                {
                    params: {type,state,page,perpage}
                })
                .then(res=>{
                    // console.log(res)
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