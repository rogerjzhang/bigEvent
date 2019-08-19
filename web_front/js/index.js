window.onload = function () {
    new Vue({
        el: '#app',
        data: {
            articleList: []
        },
        mounted() {
            //获取最新的5篇文章
            axios.get('http://127.0.0.1:8080/index/latest')
                .then(res => {
                    console.log(res)
                    if (res.data.code == 200) {
                        this.articleList = res.data.data
                    }
                })
        },
    })
}