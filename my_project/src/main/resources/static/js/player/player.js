// 登录检查
(function () {
    if (!window.localStorage) {
        alert("当前浏览器不支持localstorage");
        return false;
    } else {
        //登录判断
        var userToken = localStorage.getItem("token");
        var selLogin = $(".mod_player_login");
        if (userToken == undefined || userToken == null || userToken == "") {
            // 未登录
            selLogin.empty();
            selLogin.append("" +
                "<a class=\"player_login_username\">登录</a>");
        } else {
            // 已登录
            selLogin.empty();
            selLogin.append("" +
                "<a href=\"javascript:;\" class=\"player_login_link\">\n" +
                "    <img class=\"player_login_avatar\" src=\"../images/avatar/a3.png\" alt=\"头像\">\n" +
                "    <span class=\"player_login_username\">yooooooh</span>\n" +
                "</a>\n" +
                "<a class=\"player_login_out\">注销账号</a>");
        }
    }
}());

/*
*  ==========================Vue.js==========================
* */

var vm = new Vue({
    el: '#app',
    data: {
        songList: [],  // 歌曲列表
        currentTime: '00:00',
        totalTime: '00:00',
        songTime: 0,  // 音乐时长（单位：秒）
        currentSongIndex: -1, // 当前播放的歌曲数组索引号
        user: {
            id: localStorage.getItem('uid')
        },
        playType: 'listLoop', // 播放类型（默认 listLoop：列表循环）
    },
    created: function () {  // 钩子函数，vue对象初始化完成后自动执行
        var userToken = localStorage.getItem("token");
        var searchKeyWord = localStorage.getItem('searchVal');  // 歌曲名称
        var songId = localStorage.getItem('songId');  // 歌曲id
        var songBoxId = localStorage.getItem('songBoxId'); // 歌单ID
        var ifSearch = localStorage.getItem('ifSearch');
        var defaultSongBox = localStorage.getItem('defaultSongBox');  // ‘我的音乐’全播放
        if (searchKeyWord != "" && searchKeyWord != null && searchKeyWord != undefined) {
            console.log('关键词搜索的 播放列表', ifSearch);
            this.querySearchSongByWord(searchKeyWord);
            window.localStorage.setItem('ifSearch', 'false');
            // 删除搜索关键词
            window.localStorage.removeItem('searchVal');
        } else if (ifSearch === "true") {
            console.log('关键词为空的 播放列表', ifSearch);
            this.getAll();
            window.localStorage.setItem('ifSearch', 'false');
        } else if (defaultSongBox == 'true') {
            this.getDefaultSongBoxList();
            console.log('我的音乐 播放列表', ifSearch);
            window.localStorage.setItem('defaultSongBox', 'false');
        } else if (songId != "" && songId != null && songId != undefined) {
            this.querySearchSongById(songId);
            console.log('指定歌曲播放', songId);
            // 删除歌曲id
            window.localStorage.removeItem('songId');
        } else if (songBoxId != "" && songBoxId != null && songBoxId != undefined) {
            this.getSongBoxCentent(songBoxId);
            console.log('歌单播放', songBoxId);
            // 删除歌单id
            window.localStorage.removeItem('songBoxId');
        } else if (userToken == undefined || userToken == null || userToken == "") {
            this.getAll();
            console.log('游客 播放列表', searchKeyWord);
        } else {  // 缓存歌单
            this.getCacheSongList();
            console.log('缓存歌单', this.songList);
        }
    },
    methods: {
        // 查询上次缓存的播放列表
        getCacheSongList() {
            axios.get("/songs/cache",
                {
                    headers: {
                        cacheSongList: localStorage.getItem('cacheSongList')
                    }
                }).then(res => {
                this.songList = res.data.data;
                if (vm.songList.length > 0) {
                    setMusic(0);
                }
            });
        },
        // 获取所有歌曲
        getAll() {
            axios.get("/songs").then(res => {
                console.log(res.data);
                this.songList = res.data.data;
                cacheSongList(this.songList);
                if (vm.songList.length > 0) {
                    setMusic(0);
                }
                console.log("缓存:", localStorage.getItem('cacheSongList'));
            });
        },
        // 获取用户的歌曲列表
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
                cacheSongList(this.songList);
                if (vm.songList.length > 0) {
                    setMusic(0);
                }
                console.log("缓存:", localStorage.getItem('cacheSongList'));
            });
        },
        // 退出登录
        userLogout() {
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
            setTimeout(function () {
                window.location.replace("http://localhost/pages/player.html");
            }, 100);
        },
        // 搜索音乐（名称）
        querySearchSongByWord(keyword) {
            axios.get("/songs/s/" + keyword).then(res => {
                console.log(res.data);
                this.songList = res.data.data;
                cacheSongList(this.songList);
                if (vm.songList.length > 0) {
                    setMusic(0);
                }
                console.log("缓存:", localStorage.getItem('cacheSongList'));
            });
        },
        // 搜索音乐（ID）
        querySearchSongById(sid) {
            axios.get("/songs/songDetail/" + sid).then(res => {
                this.songList = res.data.data;
                cacheSongList(this.songList);
                console.log(this.songList);
                if (vm.songList.length > 0) {
                    setMusic(0);
                }
                console.log("缓存:", localStorage.getItem('cacheSongList'));
            });
        },
        // 获取歌单音乐列表
        getSongBoxCentent(songBoxId) {
            axios.get("/songbox/list/" + songBoxId).then(res => {
                if (res.data.data[0] !== null) {
                    this.songList = res.data.data;
                    cacheSongList(this.songList);
                    setMusic(0);
                } else {
                    this.songList = {}
                }
                console.log('歌单音乐', this.songList);
                console.log("缓存:", localStorage.getItem('cacheSongList'));
            });
        },
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
        addSongToDefault(sid) {
            axios.post("/songbox/addSong/" + sid,
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
        deleteSongByDefault(sid) {
            axios.delete("/songbox/del/" + sid,
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
    },
    watch: {  // 侦听器
        currentTime: function () {
            this.currentTime = this.currentTime;
        },
        totalTime: function () {
            if (this.totalTime === '' || this.totalTime == null) {
                this.totalTime = '00:00';
            }
        }
    }
});

/*
*  ========================JavaScript/JQuery===========================
* */
// 打开页面（或刷新）自动加载
(function () {
})();


// JQuery 在 html 所有标签(DOM)都加载之后，就会去执行
$(function () {
    // 登录
    $(".player_login_username").click(function () {
        window.location.replace("http://localhost/pages/login.html");
    });
    // 登出
    $(".player_login_out").click(function () {
        vm.userLogout();
    });


    $(".player_ft").on('click', '.collect', function () {
        // 点击“收藏”按钮 ,歌曲添加到默认歌单
        let sid = $(this).attr('data-sid');
        vm.addSongToDefault(sid);
    });

    $(".player_ft").on('click', '.collected', function () {
        // 取消收藏 从“默认收藏”歌单中 删除歌曲
        let sid = $(this).attr('data-sid');
        vm.deleteSongByDefault(sid);
    });
});

// js原生代码  window.onload 当整个文档加载完后才执行
window.onload = function (ev) {
    var audio = $('audio')[0];  // HTML5 音乐播放器
    var progressLength = 0;  // 进度条 - 白
    var timeScale = 0;  // 进度条长度比
    var mlm_index;  // 字体图标


    $('.msl_overview').css('height', $(document.body).height() - ($(document.body).height() * 0.12) - 281);
    //当浏览器大小变化时
    $(window).resize(function () {
        // alert($(window).height());          //浏览器时下窗口可视区域高度
        // alert($(document).height());        //浏览器时下窗口文档的高度
        // alert($(document.body).height());   //浏览器时下窗口文档body的高度
        // alert($(document.body).outerHeight(true)); //浏览器时下窗口文档body的总高度 包括border padding margin
        mod_songlist_list($(document.body).height());
    });

    // 登录页
    $('.mod_player_login').on({
        mouseenter: function () {
            $('.player_login_out')
                .css('visibility', 'visible');
        },
        mouseleave: function () {
            $('.player_login_out')
                .css('visibility', 'hidden');
        }
    });

    // 字体图标
    // 点播 和 添加歌曲。显示/隐藏
    $('.songlist_list li').on({
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
    });

    // 单曲点播
    $('.list_menu_play').on({
        click: function () {
            var index = $(this).attr('index');// songList数组索引号
            setMusic(parseInt(index));  // 设置播放器
            // 立即播放
            immPlay();
        }
    });

    // 歌曲控件 - 播放/暂停  时间进度条 - 继续/暂停
    $('.btn_big_play').click(function () {
        if (audio.paused) {  //如果已暂停
            musicPlay(audio);  // 方法 - 播放
            audio.addEventListener('timeupdate', function (e) {  // 音频播放时间变化监听

                let ct = this.currentTime;  //当前播放时间进度
                let dt = this.duration;     //音乐时长
                vm.songTime = this.duration;

                // 进度条
                let progress = $('.player_music_progress .music_progress_play');
                progressLength = (ct / dt) * 100 + '%';
                progress.css('width', progressLength);

                // 时间进度显示
                vm.currentTime = getFormatTime(ct);
                vm.totalTime = getFormatTime(dt);
                // $('.player_music .player_music_time').text(getFormatTime(ct) + ' / ' + getFormatTime(dt));

                // 播放/暂停
                if (ct === dt) {
                    if (vm.playType === "singleLoop") {
                        this.currentTime = 0;  // 播放进度置零
                        audio.play();
                        console.log("再次播放");
                    } else {
                        // 自动播放下一首
                        nextPlay();
                    }
                }
            });
        } else {
            musicPause(audio);  // 方法 - 暂停
        }
    });

    $(document).keydown(function (event) {
        if (event.keyCode === 32) {
            immPlay();
        }
    });

    // 下一首歌
    $('.btn_big_next').on({
        click: function () {
            nextSong();
        }
    });

    // 上一首歌
    $('.btn_big_previous').on({
        click: function () {
            prevSong();
        }
    });

    // 播放时间点控制
    $('.music_progress_load').click(function (e) {
        // console.log(e.offsetX);
        // console.log(e.originalEvent.offsetX);  // 鼠标点击的位置x
        // console.log(e.target.offsetWidth);  // div容器总宽度width
        timeScale = (e.originalEvent.offsetX / e.target.offsetWidth).toPrecision(3);  // 当前时间长度 比 总时间长度
        let calculateTime = Math.floor(timeScale * vm.songTime);
        immPlay();
        musicPlay(audio);
        audio.currentTime = calculateTime;
        console.log('calculateTime=', calculateTime);
    });

    // 播放顺序 顺序/列表循环/单循环/随机播放
    $('.btn_big_style_order').click(function () {
        var setorder = $(this).attr('title');
        if (setorder === '单首循环') {
            $(this).attr('title', '列表循环');
            $('.bbso_iconfont').empty().html('&#xea75;');
            vm.playType = 'listLoop'
        } else if (setorder === '列表循环') {
            $(this).attr('title', '顺序播放');
            $('.bbso_iconfont').empty().html('&#xe61d;');
            vm.playType = 'order';
        } else if (setorder === '顺序播放') {
            $(this).attr('title', '随机播放');
            $('.bbso_iconfont').empty().html('&#xe712;');
            vm.playType = 'random'
        } else {
            $(this).attr('title', '单首循环');
            $('.bbso_iconfont').empty().html('&#xea76;');
            vm.playType = 'singleLoop'
        }
    });

    // 播放器音量控制
    $('.btn_big_voice').click(function () {
        // 进度条 - 白
        var volumeProgress = $('.player_progress_inner .music_progress_play');
        if (audio.volume > 0) {
            audio.volume = 0;
            $('.btn_big_voice .iconfont').empty().html('&#xe673;');
            volumeProgress.css('width', '0%');
            console.log("静音", audio.volume);
        } else {
            audio.volume = 1;
            $('.btn_big_voice .iconfont').empty().html('&#xe672;')
            volumeProgress.css('width', '100%');
            console.log("有声", audio.volume);
        }
    });
};

// 下一首音乐
function nextSong() {
    switch (vm.playType) {
        case "listLoop":
        case "singleLoop":
            if (vm.currentSongIndex >= 0 && vm.currentSongIndex < vm.songList.length - 1) {
                setMusic(vm.currentSongIndex + 1);  // 下一首歌
                // 立即播放
                immPlay();
            } else if (vm.currentSongIndex === vm.songList.length - 1) {
                setMusic(0);  // 回到第一首歌
                // 立即播放
                immPlay();
            }
            break;
        case "order":
            if (vm.currentSongIndex >= 0 && vm.currentSongIndex < vm.songList.length - 1) {
                setMusic(vm.currentSongIndex + 1);  // 下一首歌
                // 立即播放
                immPlay();
            }
            break;
        case "random":
            let random = Math.floor(Math.random() * (vm.songList.length));
            setMusic(random);  // 随机下一首歌
            // 立即播放
            immPlay();
            break;
    }
}

// 上一首音乐
function prevSong() {
    switch (vm.playType) {
        case "listLoop":
        case "singleLoop":
            if (vm.currentSongIndex > 0 && vm.currentSongIndex != null) {
                setMusic(vm.currentSongIndex - 1);  // 上一首歌
                // 立即播放
                immPlay();
            } else if (vm.currentSongIndex === 0) {
                setMusic(vm.songList.length - 1);  // 跳到最后一首歌
                // 立即播放
                immPlay();
            }
            break;
        case "order":
            if (vm.currentSongIndex > 0 && vm.currentSongIndex != null) {
                setMusic(vm.currentSongIndex - 1);  // 上一首歌
                // 立即播放
                immPlay();
            } else if (vm.currentSongIndex === 0) {
                setMusic(vm.songList.length - 1);  // 跳到最后一首歌
                // 立即播放
                immPlay();
            }
            break;
        case "random":
            let random = Math.floor(Math.random() * (vm.songList.length));
            setMusic(random);  // 随机下一首歌
            // 立即播放
            immPlay();
            break;
    }
}

// 按钮·立即播放
function immPlay() {
    $('.btn_big_play').trigger('click');
}

// 按钮·播放下一首
function nextPlay() {
    $('.btn_big_next').trigger('click');
}

// 歌曲列表 高度设置
function mod_songlist_list(initHeight) {
    $('.msl_overview').css('height', initHeight - 201);
}

// 音乐播放（播放器）
function musicPlay(audio) {
    setTimeout(function () {
        audio.play();  // 播放
    }, 10);
    $('.btn_big_play .iconfont').empty().html('&#xe654;');
}

// 音乐暂停（播放器）
function musicPause(audio) {
    audio.pause();  // 暂停
    $('.btn_big_play .iconfont').empty().html('&#xe655;');
}

// 音乐播放器/显示器 设置
function setMusic(index) {
    // 设置歌名
    $('.player_music_info a:first').empty().text(vm.songList[index].songname);
    $('.player_music_info a:last').empty().text(vm.songList[index].singer);
    // 设置总时长
    vm.totalTime = vm.songList[index].timelength;
    vm.songTime = getSecond(vm.totalTime);
    // 设置当前歌曲索引号
    vm.currentSongIndex = index;

    // ==显示器==
    var picture = $('.songinfo_picture');
    picture.attr('alt', vm.songList[index].songname);
    picture.attr('src', vm.songList[index].cover);
    $('.songinfo_name a').empty().text(vm.songList[index].songname);
    $('.songinfo_singer a').empty().text(vm.songList[index].singer);
    $('.songinfo_album a').empty().text(vm.songList[index].album);

    // 背景
    var style = 'background:url(' + vm.songList[index].cover + ') no-repeat fixed center;' +
        'background-size: cover;';
    $('.bg_screen').attr('style', style);

    // 设置播放歌曲路径
    $('#myaudio').attr('src', vm.songList[index].path);

    // 设置音乐id
    $('.btn_big_like').attr('data-sid', vm.songList[index].id);

    // 判断是否收藏
    vm.querySongIfExist(vm.songList[index].id);
}

// 时间格式化(秒→xx:xx)
function getFormatTime(s) {
    var t;
    s = parseInt(s);  // 取整
    if (s > -1) {
        var min = Math.floor(s / 60) % 60;
        var sec = s % 60;

        if (min < 10) {
            t = "0";    // 0x:
        }
        t += min + ":";  // xx:
        if (sec < 10) {
            t += "0";    // xx:0x
        }
        t += sec;   //  xx:xx
    }
    return t;
}

// 时间格式化（xx:xx→秒）
function getSecond(time) {
    let s;
    var min = time.split(':')[0];
    var sec = time.split(':')[1];
    s = Number(min * 60) + Number(sec);
    return s;
}

function Exist() {
    $(".btn_big_like span").html("&#xe61e;").css('color', '#FF0000');
    $(".btn_big_like").attr('title', "已收藏");
    $('.btn_big_like').addClass('collected')
        .removeClass('collect');
}

function notExist() {
    $(".btn_big_like span").html("&#xe631;").css('color', '#000');
    $(".btn_big_like").attr('title', "未收藏");
    $('.btn_big_like').addClass('collect')
        .removeClass('collected');
}

function cacheSongList(songList) {
    var cacheArry = new Array();
    for (let i = 0; i < songList.length; i++) {
        cacheArry += songList[i].id + '/';
        if (songList.length === 20) {  // 只缓存前20首
            break;
        }
    }
    window.localStorage.setItem('cacheSongList', cacheArry);
}