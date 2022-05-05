// 自动载入 - 新歌放送
(function () {

}());

var rec = new Vue({
    el: '#rec_list',
    data: {
        recSongBoxList: [], //推荐歌单列表
    },
    created: function () {
        // 获取 最多点击量的 歌单
        this.getRecomSongBox5();
    },
    methods: {
        getRecomSongBox5() {
            axios.get("/songbox/recom").then(res=>{
                this.recSongBoxList = res.data.data.records;
                console.log(res.data.data);
            })
        },
        url_songbox(id) {
            return "http://localhost/pages/songlist.html?" + id;
        }
    }
});

var vm = new Vue({
    el: '#newsong',
    data: {
        newSongList: [], // 新歌列表
    },
    created: function () {
        // 获取 最新发布歌曲
        this.getSongByReverseTime();
    },
    methods: {
        getSongByReverseTime() {
            axios.get("/songs/releaseSong").then(res => {
                this.newSongList = res.data.data.records;
                console.log(this.newSongList);
            });
        },
        url(id) {
            return "http://localhost/pages/introduction.html?" + id;
        }
    }
});

$(function () {
    // 重定向 到 其他页面
    $('.search input[search-buttom]').on({
        click: function () {
            window.localStorage.setItem('searchVal', $(".search_ip1").val());
            console.log(window.localStorage.getItem('searchVal'));
            window.location.assign("search.html");
        }
    });

    $('.search_ip1').keydown(function (event) {
        if (event.keyCode === 13) {
            $('.search input[search-buttom]').trigger('click');
        }
    });

    // 新歌 点播
    $('.ns_list').on({
        click: function () {
            var songId = $(this).children().attr('sid');
            console.log('songId', songId);
            window.localStorage.setItem("songId", songId); // 设置歌曲id
            window.open("player.html");
        }
    }, ".ns_list_boxs_cover");

    $('.ns_list').on('click','.ns_list_boxs_detail',function () {
        // var sid = $(this).children().children().attr('sid');
        // console.log('click ', sid);
        // window.localStorage.setItem("songId",sid);
    });
});

