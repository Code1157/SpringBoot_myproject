var intro = new Vue({
    el: '#app',
    data: {
        songDetail: {}, // 歌曲详情
        user: {
            id: localStorage.getItem('uid')
        }
    },
    created: function () {
        let songid = window.location.search.split("?")[1];
        if (songid !== '' && songid !== undefined) {
            window.localStorage.setItem('introId', songid);
        }
        this.getSongById(parseInt(window.localStorage.getItem('introId')));
        // 登录 事件
        if (localStorage.getItem('uid') !== "") {
            // 判断是否 收藏 了该音乐
            this.querySongIfExist(window.localStorage.getItem('introId'));
            //     window.localStorage.setItem('ifLogout', 'false');
        }
    },
    methods: {
        // 判断是否 收藏 了该音乐
        querySongIfExist(songid) {
            axios.get("/songbox/default/check/" + localStorage.getItem('uid') + "/" + songid,
                {
                    headers: {
                        'token': localStorage.getItem('token')
                    }
                }).then(res => {
                console.log('收藏：', res.data.data);
                if (res.data.data === 1) {
                    Exist();
                } else {
                    notExist();
                }
            });
        },
        // 点击“收藏”按钮 ,歌曲添加到默认歌单
        addSongToDefault() {
            axios.post("/songbox/addSong/" + this.songDetail.id,
                this.user,
                {
                    headers: {
                        'token': localStorage.getItem('token')
                    }
                }).then(res => {
                console.log(res.data.data);  // =1
                Exist();
            });
        },
        // 点击取消收藏 从“默认收藏”歌单中 删除歌曲
        deleteSongByDefault() {
            axios.delete("/songbox/del/" + this.songDetail.id,
                {
                    data: {
                        id: localStorage.getItem('uid')
                    },
                    headers: {
                        'token': localStorage.getItem('token')
                    }

                }).then(res => {
                console.log('del', res.data);  // =1
                notExist();
            });
        },
        getSongById(songid) {
            axios.get("/songs/songDetail/" + songid).then(res => {
                this.songDetail = res.data.data[0];
                console.log('detail:  ', this.songDetail);
            });
        },
        // todo 举报音乐
        reportSong(meg) {
            axios.post("/songs/reportSong",
                {
                    userId: localStorage.getItem('uid'),    // 举报人ID
                    songId: this.songDetail.id,             // 被举报音乐ID
                    reason: meg                            // 举报原因
                },
                {
                    headers: {
                        'token': localStorage.getItem('token')
                    }
                }).then(res => {
                // 响应体
                if (res.data.data === 1) {
                    alert('举报成功');
                } else {
                    alert('重复举报');
                }
            });
        }
    }
});


$(function () {
    $(".data_cont_actions").on('click', '.mod_collect_btn', function () {
        // 点击“收藏”按钮 ,歌曲添加到默认歌单
        intro.addSongToDefault();
    });

    $(".data_cont_actions").on('click', '.mod_collected_btn', function () {
        // 取消收藏 从“默认收藏”歌单中 删除歌曲
        intro.deleteSongByDefault();
    });

    // todo 点击举报音乐
    $(".data_cont_actions").on('click', '.mod_report_btn', function () {
        var report = prompt("举报原因：\ntip：多次恶意举报将封号处理！");
        if (report !== null && report !== "") {
            // 调用举报接口
            console.log(report);
            intro.reportSong(report);
        } else {
            console.log("~无事发生~");
        }
    });

    // 点击“播放”
    $(".data_cont_actions").on('click', '.mod_btn_blue', function () {
        console.log('click player');
        var songId = $(this).attr('sid');// 获取歌曲id
        console.log('songId', songId);
        window.localStorage.setItem("songId", songId); // 设置歌曲id
        window.open("player.html");
    });

    $(" .c_txt_show").on({
        click: function () {
            if ($(this).text().trim() === "[展开]") {
                $(".lyric_cont.limit").removeClass('limit');
                $(this).text("[收起]");
            } else {
                $(".lyric_cont").addClass('limit');
                $(this).text("[展开]");
            }
        }
    });

    $(".comment_tex_default").on({
        focus: function () {
            $(this).css('display', 'none');
            $(".comment_tex_input").css('display', 'block').focus();
        }
    });

    $(".comment_tex_input").on({
        blur: function () {
            if ($(this).text().length == 0) {
                $(".comment_tex_default").css('display', 'block');
                $(this).css('display', 'none');
            }
        }
    });

});


(function () {
    setTimeout(function () {
        if ($("#lyr_content").children().length === 0) {
            $("#lyr_content").html("<p>暂无歌词</p>");
        }
    }, 100);
})();


function Exist() {
    $(".mod_collect_btn span:first-child").html("&#xe61e;").css('color', '#FF0000');
    $(".mod_collect_btn span:last-child").text("已收藏");
    $('.mod_collect_btn').addClass('mod_collected_btn')
        .removeClass('mod_collect_btn');
}

function notExist() {
    $(".mod_collected_btn span:first-child").html("&#xe631;").css('color', '#000');
    $(".mod_collected_btn span:last-child").text("收藏");
    $('.mod_collected_btn').addClass('mod_collect_btn')
        .removeClass('mod_collected_btn');
}
