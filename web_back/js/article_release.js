new Vue({
    el: '#app',
    data: {
        categorylist: [],
        imgSrc: './images/2.jpg',
        date: '',
        title: '',
        cover: null,
        categoryId: 1
    },
    methods: {
        //发表文章
        release(state) {
            let fd = new FormData(this.$refs.form)
            fd.append('state', state)
            //获取富文本框纯文本
            // var activeEditor = tinymce.activeEditor;
            // var editBody = activeEditor.getBody();
            // activeEditor.selection.select(editBody);
            // var content = activeEditor.selection.getContent({
            //     'format': 'text'
            // });
            //获取富文本框内容带标签
            var content = tinyMCE.activeEditor.getContent() 
            //将其添加到
            fd.append('content', content)

            if (fd.get('title') == '') {
                alert('请输入标题');
                return
            }
            if (fd.get('cover').name == '') {
                alert('上传图片');
                return
            }
            if (content == '') {
                alert('请输入内容');
                return
            }
            axios.post('http://127.0.0.1:8080/admin/article/publish', fd)
                .then((res) => {
                    if(res.data.code == 200){
                        if(state == '已发布'){
                            alert('发布成功');
                        }else {
                            alert('已存入草稿');
                        }
                        window.location.href = "article_list.html"
                    }
                })

        },
        //更换图片时切换图片预览
        showImg() {
            let icon = this.$refs.uploadImg.files[0]
            this.cover = icon
            let url = URL.createObjectURL(icon)
            this.imgSrc = url
        }
    },
    mounted() {
        //获取文章类型列表
        axios.get('http://127.0.0.1:8080/admin/category/list')
            .then(res => {
                if (res.data.code == 200) {
                    this.categorylist = res.data.data
                }
            })
        //获取当前时间
        this.date = moment().format('YYYY-MM-DD'); // 八月 13日 2019, 5:16:01 下午
    },
})