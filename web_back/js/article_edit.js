new Vue({
    el: "#app",
    data: {
        categorylist: [],
        id: 222,
        title: '',
        date: '',
        cover: '',
        categoryId: '',
        content: '',
        imgSrc: ''
    },
    methods: {
        //图片上传按钮
        uploadImg() {
            this.cover = this.$refs.file.files[0]
            this.imgSrc = URL.createObjectURL(this.cover)
        },
        // 提交编辑
        submit() {
            let fd = new FormData(this.$refs.maForm)
            //添加id
            fd.append('id', this.id)
            //添加富文本框内容
            fd.append('content',tinyMCE.activeEditor.getContent() )
            console.log(fd)
            console.log(fd.get('id'))
            console.log(fd.get('title'))
            console.log(fd.get('date'))
            console.log(fd.get('cover'))
            console.log(fd.get('categoryId'))
            console.log(fd.get('content'))
            //发送ajax请求
            axios.post('http://127.0.0.1:8080/admin/article/edit',fd)
                .then(res=>{
                    console.log(res)
                    if(res.data.code == 200){
                        alert('修改成功');
                        window.location.href='article_list.html'
                    }
                })
        }
    },
    mounted() {
        //获取点击时id
        let id = window.location.search.split('=')[1]
        console.log(id)
        this.id = id

        //获取文章类型列表
        axios.get("http://127.0.0.1:8080/admin/category/list").then(res => {
            if (res.data.code == 200) {
                this.categorylist = res.data.data;
            }
        });
        //根据id获取文章信息
        axios({
            url: "http://127.0.0.1:8080/admin/article/search",
            params: {
                id: this.id
            }
        }).then(res => {
            if (res.data.code == 200) {
                let current = res.data.data;
                // console.log(current);
                for (const key in current) {
                    this[key] = current[key];
                }
                this.imgSrc = this.cover
            }
        });
    }
});