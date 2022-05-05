var search = new Vue({
    el: '#app',
    data: {
        inputValue: '',  // input输入值
        searchValue: '', // 搜索的关键词
        songList: [],   // 歌曲列表
        isHidden: true,
        isShow: false,
    },
    created: function () {
        this.inputValue = window.localStorage.getItem('searchVal');
        this.querySearchSong();
    },
    methods: {
        // 搜索音乐
        querySearchSong() {
            if (this.inputValue === "") {
                axios.get("/songs").then(res => {
                    console.log(res.data);
                    this.songList = res.data.data;
                });
            } else {
                axios.get("/songs/s/" + this.inputValue).then(res => {
                    console.log(res.data);
                    this.songList = res.data.data;
                    this.searchValue = this.inputValue;
                    if (this.songList.length < 1) {
                        txt(this.inputValue);
                        this.isHidden = false;
                        this.isShow = true;
                    } else {
                        this.isShow = false;
                        this.isHidden = true;
                    }
                });
            }
        },
        url(id) {
            return "http://localhost/pages/introduction.html?" + id;
        }
    }
});

$(function () {
    $('.search_icon').on({
        click: function () {
            search.querySearchSong();
        }
    });

    $(".mod_btn").click(function () {
        var index = $(this).index();
        if (index === 0) {
            if (search.songList.length < 1) {
                alert("没有可播放的歌曲，请重新搜索。")
            } else {
                window.localStorage.setItem('searchVal', search.searchValue);  // 保存搜索关键词
                window.localStorage.setItem('ifSearch', 'true');  // 用户是否从搜索页进入
                console.log('searchVal',localStorage.getItem('searchVal'));
                window.open("player.html");
            }
        } else if (index === 1) {
            console.log("添加到");
        } else if (index === 2) {
            console.log("下载");
        } else {
            console.log("批量操作");
        }
    });

    // 按键 事件
    // 1.搜索框
    $('.search_ip1').keydown(function (event) {
        if (event.keyCode === 13) {
            $('.mod_search_frame span[search-buttom]').trigger('click');
        }
    });
});

function txt(T) {
    $('.txt_heightlight').text(T);
}