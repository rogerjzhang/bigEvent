window.onload = function () {
    Vue.component('mylist', {
        props:['data'],
        template: '#tr_temp'
    })
    new Vue({
        el: '#article_category',
        data: {
            categorylist:[]
        },
        mounted() {
            this.$http.get('http://127.0.0.1:8080/admin/category/list')
                .then((res) => {
                    console.log(res)
                    if(res.body.code == 200){
                        this.categorylist= res.body.data 
                    }
                })
        },
    })
}