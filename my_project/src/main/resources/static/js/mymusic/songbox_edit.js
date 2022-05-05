var edit = new Vue({
    el: '#edit_form',
    data: {
        songbox: {
            id: '',
            title: '',
            detail: ''
        }
    },
    created: function () {
        // 获取歌单ID
        this.songbox.id = window.location.search.split("?")[1].split("/")[0];
        // 获取歌单名称
        this.songbox.title = window.location.search.split("?")[1].split("/")[1];
        console.log(1, this.songbox.title);
        this.songbox.title = decodeURI(this.songbox.title); //只需要转一次码
        console.log(2, this.songbox.title);
    },
    methods: {
        // 有上传封面
        uploadCover(formData) {
            axios.put("/songbox/update/" + localStorage.getItem('uid'),
                formData,
                {
                    headers: {
                        'token': localStorage.getItem('token'),
                        'Content-Type': 'multipart/form-data'
                    }
                }).then(res => {
                if (res.data.data === 1) {
                    ShowSuccess('编辑成功');
                } else {
                    ShowFailure('编辑失败/未更新数据');
                }
                console.log(res.data.data);
            });
        },
        // 无上传封面
        uploadData() {
            axios.put("/songbox/update2/" + localStorage.getItem('uid'),
                this.songbox,
                {
                    headers: {
                        'token': localStorage.getItem('token'),
                    }
                }).then(res => {
                if (res.data.data === 1) {
                    ShowSuccess('编辑成功');
                } else {
                    ShowFailure('编辑失败/未更新数据');
                }
                console.log("无封面,", res.data.data);
            });
        },
        // 删除歌单
        deleteSongBox() {
            axios.delete("/songbox/delete/sb",
                {
                    data: {
                        songboxId: parseInt(this.songbox.id),
                        uid: parseInt(localStorage.getItem('uid'))
                    },
                    headers: {
                        'token': localStorage.getItem('token')
                    }
                }).then(res => {
                console.log("歌单被删除", res.data.data);
                window.location.replace("http://localhost/pages/mymusic_songlist.html");
            })
        }
    }
});

$(function () {
    $(".file").change(function () {
        var objUrl = getObjectURL(this.files[0]);//获取文件信息
        if (objUrl) {
            $("#preview_pic").attr("src", objUrl);
        }
    });

    $(".songbox_edit_btn").click(function () {
        var file = $(".file")[0].files[0];
        if (edit.songbox.title === "") {
            ShowWarn("带 * 号的输入框不能为空。");
        } else if (!file) {  // 没有封面
            console.log(33, edit.songbox);
            edit.uploadData();
        } else {
            var formData = new FormData();
            formData.append("file", file);
            var songbox = JSON.stringify(edit.songbox);
            console.log(edit.songbox);
            formData.append('contentParam', new Blob([songbox], {type: "application/json"}));
            console.log(formData.get('file')); //FormData私有类对象，访问不到，可以通过get判断值是否传进去
            edit.uploadCover(formData);
        }
    });

    $(".upload_btn .songbox_delete_btn").click(function () {
        var r = confirm("您确定要删除歌单吗？");
        if (r == true) {
            edit.deleteSongBox();
        }
    });
});

function getObjectURL(file) {
    var url = null;
    if (window.createObjectURL != undefined) {
        url = window.createObjectURL(file);
    } else if (window.URL != undefined) { // mozilla(firefox)
        url = window.URL.createObjectURL(file);
    } else if (window.webkitURL != undefined) { // webkit or chrome
        url = window.webkitURL.createObjectURL(file);
    }
    return url;
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
