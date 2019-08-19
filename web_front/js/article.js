// console.log(window.location.search.split('=')[1])
new Vue({
    el: '#app',
    data: {
        id: 0,
        articleData: {
            author: '',
            category: '',
            categoryId: '',
            comments: '',
            content: '',
            cover: '',
            date: '',
            id: '',
            next: '',
            prev: '',
            read: '',
            state: '',
            title: ''
        },
        comments: [],
        author: '',
        content:''
    },
    methods: {
        getComments() {
            //获取评论列表
            axios.get('http://127.0.0.1:8080/index/get_comment', {
                    params: {
                        articleId: this.id
                    }
                })
                .then(res => {
                    if (res.data.code == 200) {
                        this.comments = res.data.data
                    }
                })
        },
        //发表评论
        postComment(){
            axios.post('http://127.0.0.1:8080/index/post_comment',{
                author: this.author,
                content: this.content,
                articleId: this.id,
            })
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.error(err); 
            })
        }
    },
    mounted() {
        //获取地址栏的id
        this.id = window.location.search.split('=')[1]
        //发送ajax请求获取对应id的文章详情
        axios.get('http://127.0.0.1:8080/index/article', {
                params: {
                    id: this.id
                }
            })
            .then(res => {
                console.log(res);
                this.articleData = res.data.data
            })
        //获取评论
        this.getComments()

    },
})