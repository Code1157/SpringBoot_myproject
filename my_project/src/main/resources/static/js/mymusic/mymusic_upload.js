var timelength;

$(function () {
    $(".container .profile_name").text(localStorage.getItem('nickname'));

    // 选择了上传文件
    $("#file").change(function () {
        var objUrl = getObjectURL(this.files[0]);
        $("#audio").attr("src", objUrl);
        // $("#audio")[0].play();
        // $("#audio").show();
        getTime();
        console.log(1, timelength);
    });

    // 确认按钮 - 上传
    $(".upload_btn_confirm").click(function () {
        var file = $(".file")[0].files[0];
        if (upload.songDetail.songname === ""
            || upload.songDetail.singer === "") {
            ShowWarn("带 * 号的输入框不能为空。");
        } else if (!file) {
            ShowFailure("您还没有选择要上传的文件!!!");
        } else {
            upload.songDetail .timelength = timelength;
            var formData = new FormData();
            formData.append("file", file);
            var song = JSON.stringify(upload.songDetail);
            formData.append('contentParam', new Blob([song], {type: "application/json"}));
            upload.uploadSong(formData);
            $('.upload_form').css('display', 'none');
            console.log(2, timelength);
        }
    });
});

var upload = new Vue({
    el: '#app',
    data: {
        songList: {},  // 音乐列表
        songDetail: {
            songname: '',  //歌名
            singer: '',// 歌手
            album: '',// 专辑
            tag: '',// 标签（如轻音乐）
            timelength: '',// 歌曲时长
            lyric: '',// 歌词
            language: '',// 语种
            sect: '', // 音乐流派/派别
            // publishTime: ''//发行时间
        }
    },
    created: function () {
        this.queryUploadSongByUser();
    },
    methods: {
        uploadSong(formData) {
            axios.post(
                "/songs/upload/" + localStorage.getItem('uid'),
                formData,
                {
                    headers: {
                        'token': localStorage.getItem('token'),
                        'Content-Type': 'multipart/form-data'
                    }
                }
            ).then(res => {
                if (res.data.data === 1) {
                    showList();
                    ShowSuccess("上传成功");
                    this.queryUploadSongByUser();
                    hideWeiShangChuan();
                } else {
                    hideList();
                    ShowFailure("上传失败");
                }
                console.log(res.data.data);
            });
        },
        // 查询用户的上传音乐列表
        queryUploadSongByUser() {
            axios.get("/songs/uploaded/" + localStorage.getItem('uid'),
                {
                    headers: {
                        'token': localStorage.getItem('token'),
                    }
                }).then(res => {
                if (res.data.data.length > 0) {
                    this.songList = res.data.data;
                    hideWeiShangChuan();
                    showList();
                } else {
                    showWeiShangChuan();
                    hideList();
                }
                console.log(this.songList);
            });
        },
        // 弹出上传表单
        formCreate() {
            $('.upload_form').css('display', 'block');
        },
        // 关闭上传表单
        formClose() {
            $('.upload_form').css('display', 'none');
        },
        url(id) {
            return "http://localhost/pages/introduction.html?" + id;
        }
    }
});

<!--获取mp3文件的时间 兼容浏览器-->
function getTime() {
    setTimeout(function () {
        var duration = $("#audio")[0].duration;
        if (isNaN(duration)) {
            getTime();
        } else {
            console.info("该歌曲的总时间为：" + $("#audio")[0].duration + "秒")
            console.info("该歌曲的总时间为：" + getFormatTime(duration));
            timelength = getFormatTime(duration);
            console.log(0, timelength);
        }
    }, 10);
}

<!--把文件转换成可读URL-->
function getObjectURL(file) {
    var url = null;
    if (window.createObjectURL != undefined) { // basic
        url = window.createObjectURL(file);
    } else if (window.URL != undefined) { // mozilla(firefox)
        url = window.URL.createObjectURL(file);
    } else if (window.webkitURL != undefined) { // webkit or chrome
        url = window.webkitURL.createObjectURL(file);
    }
    return url;
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

// 显示上传音乐列表
function showList() {
    $('.mod_songlist').css('display', 'block');
}

// 隐藏上传音乐列表
function hideList() {
    $('.mod_songlist').css('display', 'none');
}

// 显示 ‘未上传’提示
function showWeiShangChuan() {
    $('.upload_empty_msg').css('display', 'block');
}

// 隐藏 ‘未上传’
function hideWeiShangChuan() {
    $('.upload_empty_msg').css('display', 'none');
}

// 消息 提示
function ShowMsg(msg) {
    $('#tip').css('color', 'green');
    showTip(msg, 'info');
}

// 成功 提示
function ShowSuccess(msg) {
    $('#tip').css('color', '#00c3ff');
    showTip(msg, 'success');
}

// 失败 提示
function ShowFailure(msg) {
    $('#tip').css('color', 'red');
    showTip(msg, 'danger');
}

// 警告 提示
function ShowWarn(msg, $focus, clear) {
    $('#tip').css('color', 'yellow');
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