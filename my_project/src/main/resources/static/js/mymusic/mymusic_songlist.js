$(function () {
    $(".container .profile_name").text(localStorage.getItem('nickname'));

    $(".profile_nav a").on({
        click: function () {
            var index = $(this).index();
            if (index === 0) {
                window.location.assign("mymusic_music.html");
            } else if (index === 1) {
                window.location.assign("mymusic_songlist.html");
                console.log("我的歌单");
            } else if (index === 2) {
                console.log("我的关注");
            } else if (index === 3) {
                console.log("我的粉丝");
            } else {
                window.location.assign("mymusic_upload.html");
                console.log("我上传的音乐");
            }
        }
    });

    // mymusic_songlist.html  我的歌单
    $(".song_box_toolbar").on("click", ".js_create_new", function () {
            create_popup_songlist();  // 创建弹窗
            console.log('show');
        }
    );
    // 取消/关闭弹窗
    $("body").on("click", ".popup_ft button:first-child", function () {
            $("#other").detach();
            console.log('hide');
        }
    );
    $("body").on("click", ".dialog-btn-close", function () {
            $("#other").detach();
            console.log('hide');
        }
    );
    $("body").on("click", "#other", function (e) {
            if ($(e.target).closest('body #other .dialog-content').length === 0) {
                $("#other").detach();
            }
            console.log(e.target);
        }
    );
    // 确定 按钮 - 创建歌单/关闭弹窗
    $("body").on("click", ".popup_ft button:last-child", function () {
            var boxname = $(".form_txt_input").val();   // 歌单标题
            songbox.newSongBox.title = boxname;
            songbox.newSongBox.createrId = localStorage.getItem('uid');
            songbox.createSongBox();
            $("#other").detach();
        }
    );
});

var songbox = new Vue({
    el: '#app',
    data: {
        songBoxList: [], // 歌单列表
        newSongBox: {
            title: ''
        }  // 创建的新歌单
    },
    created: function () {
        // 调用 获取歌单列表 接口
        this.getSongBoxList();
    },
    methods: {
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
        // 创建歌单
        createSongBox() {
            axios.post('/songbox', this.newSongBox,
                {
                    headers: {
                        'token': localStorage.getItem('token')
                    }
                }).then(res => {
                if (res.data.data === 1) {
                    window.confirm("歌单创建成功")
                    console.log(res.data.data);
                } else {
                    window.alert("创建失败，结果" + res.data.data);
                }
            }).finally(() => {
                this.getSongBoxList();  // 重新加载歌单列表
            });
        },
        url_songbox(id) {
            return "http://localhost/pages/songlist.html?" + id;
        }
    },
});

// 获取 当前 网页名称
function pageName() {
    var a = location.href;
    var b = a.split("/");
    var c = b.slice(b.length - 1, b.length).toString(String).split(".");
    return c.slice(0, 1)[0];
}

// 创建歌单 弹窗
function create_popup_songlist() {
    $("#app").after('' +
        '<div id="other">\n' +
        '    <div class="dialog-root">\n' +
        '        <div class="dialog-mask"></div>\n' +
        '        <div class="dialog-wrap">\n' +
        '            <div class="dialog-container">\n' +
        '                <div class="dialog-content">\n' +
        '                    <button class="dialog-btn-close">\n' +
        '                        <span class="dialog-btn-close-x">x</span>\n' +
        '                    </button>\n' +
        '                    <div class="dialog-body">\n' +
        '                        <div class="mod-popup popup_new_list">\n' +
        '                            <div class="popup_hd">\n' +
        '                                <h2 class="popup_tit">创建新歌单</h2>\n' +
        '                            </div>\n' +
        '                            <div class="popup_bd">\n' +
        '                                <label class="form_label">歌单名</label>\n' +
        '                                <div class="mod_form_txt">\n' +
        '                                    <input type="text" class="form_txt_input">\n' +
        '                                </div>\n' +
        '                            </div>\n' +
        '                            <div class="popup_ft">\n' +
        '                                <button class="upload_btn_item mod_btn">取消</button>\n' +
        '                                <button class="upload_btn_item mod_btn_blue"">确定</button>\n' +
        '                            </div>\n' +
        '                        </div>\n' +
        '                    </div>\n' +
        '                </div>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '</div>');
}