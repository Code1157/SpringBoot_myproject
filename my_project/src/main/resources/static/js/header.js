var operateFlag = false;

// 登录检查
(function () {
    if (!window.localStorage) {
        alert("当前浏览器不支持localstorage");
        return false;
    } else {
        //登录判断
        var userToken = localStorage.getItem("token");
        var userAvatar = $(".header_content_top ul:first");
        var selLogin = $(".mod_top_login");
        var currentPage = pageName();
        if (userToken == undefined || userToken == null || userToken == "") {
            // 未登录
            operateFlag = false;
            if (currentPage === "mymusic_music"
                || currentPage === "mymusic_songlist"
                || currentPage === "mymusic_upload"
                || currentPage === "manager") {
                window.location.replace("http://localhost/pages/mymusic_unlog.html");
            } else if (currentPage === "introduction" && localStorage.getItem('ifLogout') === 'false') {
                // console.log('ifLogout',window.localStorage.setItem('ifLogout', 'false'));
                // window.localStorage.setItem('ifLogout', 'false');
                // // window.location.assign("http://localhost/pages/index.html");
                // // window.open("introduction.html?" + localStorage.getItem('songId'));
                // window.location.assign("http://localhost/pages/introduction.html?" + localStorage.getItem('songId'));
            }
            selLogin.detach();
            unlogin(userAvatar);
        } else {
            // 已登录
            operateFlag = true;
            selLogin.detach();
            logined(userAvatar, window.localStorage.getItem("avatar"));
        }
    }
}());

// ============ 方法() =================
//未登录
function unlogin(userSelect) {
    userSelect.after("" +
        "<div class=\"mod_top_login\">\n" +
        "    <a id='login'>登录</a>\n" +
        "</div>");
}

//已登录
function logined(userSelect, avatar) {
    userSelect.after("" +
        "<div class=\"mod_top_login\">\n" +
        "    <span>\n" +
        "        <a class=\"top_login_link\">\n" +
        "            <img src=\'" + avatar + "\' class=\"top_login_avatar\" alt=\"头像\">\n" +
        "        </a>\n" +
        "    </span>\n" +
        "</div>");
}

//取当前网页名称
function pageName() {
    var a = location.href;
    var b = a.split("/");
    var c = b.slice(b.length - 1, b.length).toString(String).split(".");
    return c.slice(0, 1)[0];
}

// 登出
function logout(page) {
    $(".mod_top_login").on("click", "#logout", function () {
            header.userLogout(page);
        }
    );
}



window.onload = function () {
    // 登出操作
    // 字体图标
    // 点播 和 添加歌曲。显示/隐藏
    // 举报音乐
    var currentPage = pageName();
    if (currentPage === "index") {
        logout(currentPage);
    } else if (currentPage === "mymusic_music") {
        logout(currentPage);
        songListOperate();    // 对音乐列表操作
        songAddOperate();     // 可以添加到歌单
    } else if (currentPage === "mymusic_songlist") {
        logout(currentPage);
        songListOperate();
        songAddOperate();
    } else if (currentPage === "mymusic_upload") {
        logout(currentPage);
        songListOperate();
        // songAddOperate();
    } else if (currentPage === "songlist") {
        logout(currentPage);
        songListOperate();
        songAddOperate();
    } else if (currentPage === "search") {
        logout(currentPage);
        songListOperate();
        songAddOperate();
    } else if (currentPage === "introduction") {
        logout(currentPage);
    } else if (currentPage === "manager") {
        logout(currentPage);
    }
};

var header = new Vue({
    el: '#header',
    data: {},
    methods: {
        // 退出登录
        userLogout(page) {
            axios.post(
                "/user/logout",
                {},
                {
                    headers: {
                        'token': localStorage.getItem('token')
                    }
                }
            ).then(res => {
                window.alert(res.data.msg);
            });
            window.localStorage.removeItem("token");
            window.localStorage.removeItem("username");
            window.localStorage.removeItem("nickname");
            window.localStorage.removeItem("avatar");
            window.localStorage.removeItem("uid");
            window.localStorage.removeItem("identity");
            setTimeout(function () {
                window.location.replace("http://localhost/pages/" + page + ".html");
            }, 100);
        },
        playSong(songId) {
            axios.put("/songs/uploadSongPlayCount",
                {},
                {
                    headers: {
                        songId: songId
                    }
                }
            ).then(res => {
                console.log(res.data.data);
            });
        }
    }
});

var popupbox = new Vue({
    el: '#popupbox',
    data: {
        songBoxList: [], // 歌单列表
        sbidAndsid: {
            songboxId: '',  //歌单id
            songId: ''      //音乐id
        }
    },
    created: function () {
        // 调用 获取歌单列表 接口
        var currentPage = pageName();
        if (currentPage !== "manager"
            || currentPage !== "mymusic_unlog"
            || currentPage !== "songbox_edit") {
            this.getSongBoxList();
        }
    },
    methods: {
        //查询用户歌单（id）名称列表
        getSongBoxList() {
            axios.get("/songbox/" + localStorage.getItem('uid'),
                {
                    headers: {
                        'token': localStorage.getItem('token')
                    }
                }).then(res => {
                this.songBoxList = res.data.data;
                console.log(this.songBoxList);
            });
        },
        // 添加歌曲到用户对应歌单
        addSongToSongBox() {
            axios.post("/songbox/addSong", this.sbidAndsid, {
                headers: {
                    'token': localStorage.getItem('token')
                }
            }).then(res => {
                if (res.data.data === 1) {
                    console.log('音乐添加成功');
                    ShowSuccess('音乐添加成功');
                } else {
                    console.log('音乐已存在');
                    ShowFailure('音乐已存在');
                }
                console.log(res.data.data);
            });
        }
    }
});


$(function () {
    // 登录头像 信息
    $(".mod_top_login").on({
        mouseenter: function () {
            var popupUser = $(".mod_top_login span");
            popupUser.after("" +
                "<div class=\"popup_user drop\">\n" +
                "    <div class=\"popup_user_data\"></div>\n" +
                "    <div class=\"popup_user_toolbar\">\n" +
                "        <div class=\"popup_user_toolbar_item\">\n" +
                "            <div class=\"popup_user_toolbar_tit\">\n" +
                "                <a id='logout'>退出登录</a>\n" +
                "            </div>\n" +
                "        </div>\n" +
                "    </div>\n" +
                "</div>");
        },
        mouseleave: function () {
            var popupUser = $(".mod_top_login .popup_user");
            popupUser.detach();
        }
    });


    $('.concert_hall').click(function () {
        window.location.assign("index.html");
    });

    $('.my_musics').click(function () {
        //登录判断
        var userToken = localStorage.getItem("token");
        if (userToken == undefined || userToken == null || userToken == "") {
            // 未登录
            window.location.assign("mymusic_unlog.html");          // 未登录页
        } else {
            // 已登录
            window.location.assign("mymusic_music.html");  // 登录页
        }
    });

    $('#login').click(function () {
        // window.location.href = "login.html";  // 效果同下
        // window.location.assign("login.html");
        //登录判断
        var userToken = localStorage.getItem("token");
        if (userToken == undefined || userToken == null || userToken == "") {
            // 未登录
            window.location.assign("login.html");         // 未登录页
        } else {
            // 已登录
        }
    });

    if (localStorage.getItem('identity') === "manager") {
        $(".header").on("click", ".top_login_link", function () {
                window.open("manager.html");
            }
        );
    }

    // ===================================upload.html ==================>
});

// 歌曲列表 显示操作
function songListOperate() {

    var mlm_index;
    $('#songshow').on({
        mouseenter: function () {
            mlm_index = $(this).index();
            $('.mod_list_menu').eq(mlm_index).show();
            $('.songlist_time').eq(mlm_index).hide();
            $('.songlist_delete').eq(mlm_index).show();
        },
        mouseleave: function () {
            $('.mod_list_menu').eq(mlm_index).hide();
            $('.songlist_delete').eq(mlm_index).hide();
            $('.songlist_time').eq(mlm_index).show();
        },
    }, ".songlist_list li");

    // 单曲点播
    $('#songshow').on({
        click: function () {
            var songId = $(this).attr('sid');// 获取歌曲id
            console.log('songId', songId);
            window.localStorage.setItem("songId", songId); // 设置歌曲id
            header.playSong(songId);
            window.open("player.html");
        }
    }, ".list_menu_play");

}

// 添加歌曲到用户歌单中（方法）
function songAddOperate() {
    if (operateFlag) {
        $('#app .list_menu_add').on({
            click: function (event) {
                $('.mod_operate_menu').css({
                    left: event.screenX + 18,
                    top: event.pageY
                });
                $('#popupbox').show();
                popupbox.sbidAndsid.songId = $(this).attr('sid');
                console.log('tset')
            }
        });

        $("body").on("click", "#app", function (e) {
                if ($(e.target).closest("#app .lmi_add").length === 0) {
                    $("#popupbox").hide();
                }
            }
        );

        // 添加歌曲到用户歌单中（方法）-3个参数
        $('.operate_menu_item').on({
            click: function () {
                var index = $(this).index();
                popupbox.sbidAndsid.songboxId = $('.operate_menu_link')
                    .eq(index)
                    .attr('songboxid');
                console.log(
                    'uid: ', localStorage.getItem('uid'),
                    '\nsid: ', popupbox.sbidAndsid.songId,
                    '\nsongboxId: ', popupbox.sbidAndsid.songboxId);
                popupbox.addSongToSongBox();
            }
        });

    }
}

// 消息 提示
function ShowMsg(msg) {
    showTip(msg, 'info');
}

// 成功 提示
function ShowSuccess(msg) {
    showTip(msg, 'success');
}

// 失败 提示
function ShowFailure(msg) {
    showTip(msg, 'danger');
}

// 警告 提示
function ShowWarn(msg, $focus, clear) {
    showTip(msg, 'warning');
    if ($focus) {
        $focus.focus();
        if (clear) $focus.val('');
    }
    return false;
}

// 自动隐藏 信息框
//tip是提示信息，type:'success'是成功信息，'danger'是失败信息,'info'是普通信息,'warning'是警告信息
function showTip(tip, type) {
    var $tip = $('#tip');
    $tip.stop(true).prop('class', 'alert alert-' + type).text(tip).css('margin-left', -$tip.outerWidth() / 2).fadeIn(500).delay(2000).fadeOut(500);
}


