new Vue({
    el: '#songshow',
    data: {
        songList: [], // 歌曲列表
    },
    created: function () {
        if (pageName() === "mymusic_music") {
            this.getDefaultSongBoxList()
        }
    },
    methods: {
        getSongAll() {
            axios.get("/songs/" + localStorage.getItem("username"),
                {
                    headers: {
                        'token': localStorage.getItem('token')
                    }
                }).then(res => {
                this.songList = res.data.data;
                console.log(this.songList);
            });
        },
        // 获取“默认歌单”音乐列表
        getDefaultSongBoxList() {
            axios.get(
                "/songbox/default/" + localStorage.getItem('uid'),
                {
                    headers: {
                        'token': localStorage.getItem('token')
                    }
                }
            ).then(res => {
                this.songList = res.data.data;
                console.log('获取“默认歌单”音乐列表',this.songList);
            });
        },
        url(id) {
            return "http://localhost/pages/introduction.html?" + id;
        }
    }
});


$(function () {
    $(".container .profile_name").text(localStorage.getItem('nickname'));

    $(".mod_btn_blue__play").click(function () {
        // 播放默认歌单
        window.localStorage.setItem('defaultSongBox', 'true');
        window.open("player.html");
    });

    $(".mod_btn").click(function () {
        var index = $(this).index();
        if (index === 0) {
            console.log("0");
        } else if (index === 1) {
            console.log("1");
        } else if (index === 2) {
            console.log("2");
        } else {
            console.log("3");
        }
    });

});

// 获取 当前 网页名称
function pageName() {
    var a = location.href;
    var b = a.split("/");
    var c = b.slice(b.length - 1, b.length).toString(String).split(".");
    return c.slice(0, 1)[0];
}