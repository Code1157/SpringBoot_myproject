var songlist = new Vue({
    el: '#app',
    data: {
        songList: [],   // 歌曲列表
        introduction: '', // 歌单简介
        songBoxId: '',   // 歌单ID
    },
    created: function () {
        let songbox = window.location.search.split("?")[1]; // 获取歌单ID
        if (songbox !== '' && songbox !== undefined) {
            window.localStorage.setItem('sonlitId', songbox);
        }
        this.songBoxId = parseInt(window.localStorage.getItem('sonlitId'));
        // 查询歌单内歌曲列表
        this.querySongBoxIntro();
        this.querySongList();
    },
    methods: {
        // 查询歌单简介
        querySongBoxIntro() {
            axios.get("/songbox/intro/" + this.songBoxId).then(res => {
                this.introduction = res.data.data;
                console.log(2, this.introduction);
            })
        },
        // 查询歌单内歌曲列表
        querySongList() {
            axios.get("/songbox/list/" + this.songBoxId).then(res => {
                if (res.data.data[0] !== null) {
                    this.songList = res.data.data;
                } else {
                    this.songList = {}
                }
                console.log('querySongList:', res.data.data);
            })
        },
        url(id) {
            return "http://localhost/pages/introduction.html?" + id;
        },
        url_songbox_edit(songboxId, sngboxName) {
            //中文需要进行两次encodeURI转码( encodeURI:把URI字符串采用UTF-8编码格式转化成escape格式的字符串。)
            var sngboxName = encodeURI(sngboxName);
            return "http://localhost/pages/songbox_edit.html?" + songboxId + '/' + sngboxName;
        },
        // 点击删除图标 从歌单 删除歌曲
        deleteSongBySongBox(songId) {
            axios.delete("/songbox/delete/" + localStorage.getItem('uid'),
                {
                    data: {
                        songboxId: this.songBoxId,
                        songId: songId
                    },
                    headers: {
                        'token': localStorage.getItem('token')
                    }
                }).then(res => {
                console.log('delete', res.data);  // =1
                this.querySongList();
            });
        },
        playSongBox(songBoxId) {
            console.log(1, this.songBoxId);
            axios.put("/songbox/uploadSongBoxPlayCount",
                {
                    id: songBoxId
                }
            ).then(res => {
                console.log(res.data.data);
            })
        }
    }
});

$(function () {
    if (localStorage.getItem('uid') !== '') {
        $('.edit_btn').show();
    } else {
        $('.edit_btn').hide();
    }
    $('.mod_btn_blue').on({
        click: function () {
            if (songlist.songList.length < 1) {
                alert("没有可播放的歌曲，请添加歌曲。");
            } else {
                songlist.playSongBox(Number(window.location.search.split("?")[1]));
                console.log("全部播放");
                window.open("player.html");
            }
        }
    });
    //
    // $(".mod_btn").click(function () {
    //     var index = $(this).index();
    //     if (index === 0) {
    //     } else if (index === 1) {
    //         console.log("收藏");
    //     } else if (index === 2) {
    //         console.log("下载");
    //     } else {
    //         console.log("批量操作");
    //     }
    // });

    // 按键 事件
    // 1.搜索框
    $('.search_ip1').keydown(function (event) {
        if (event.keyCode === 13) {
            $('.mod_search_frame span[search-buttom]').trigger('click');
        }
    });

    // 点击 删除
    $(".songlist_list").on('click', '.songlist_delete', function () {
        console.log('click:', $(this).attr('sid'), songlist.songBoxId, localStorage.getItem('uid'));

        songlist.deleteSongBySongBox($(this).attr('sid'));
    });
});

function txt(T) {
    $('.txt_heightlight').text(T);
}