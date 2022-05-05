Vue.component('userupload', {
    props: ['uploadinfo'],
    template: '' +
        '<div class="handle" id="handle">\n' +
        '    <h1>用户上传的音乐</h1>' +
        '    <div class="table-responsive">\n' +
        '        <table class="table table-bordered table-striped" id="mytable">\n' +
        '            <thead>\n' +
        '            <tr>\n' +
        '                <th>上传者</th>\n' +
        '                <th>音乐名称</th>\n' +
        '                <th>作者</th>\n' +
        '                <th>专辑</th>\n' +
        '                <th>标签</th>\n' +
        '                <th>时长</th>\n' +
        '                <th>封面</th>\n' +
        '                <th>歌词</th>\n' +
        '                <th>语言</th>\n' +
        '                <th>派别</th>\n' +
        '                <th>首发时间</th>\n' +
        '                <th>平台发布时间</th>\n' +
        '                <th>版权号</th>\n' +
        '                <th>操作</th>\n' +
        '            </tr>\n' +
        '            </thead>\n' +
        '            <tbody>\n' +
        '            <tr v-for="(upload, index) of uploadinfo" v-bind:sid="upload.id">\n' +
        '                <td>{{upload.uploader}}</td>\n' +
        '                <td>\n' +
        '                    <a href="javascript:;" class="show_btn" onclick="showSong(this)">{{upload.songname}}</a>\n' +
        '                </td>\n' +
        '                <td>{{upload.singer}}</td>\n' +
        '                <td>{{upload.album}}</td>\n' +
        '                <td>{{upload.tag}}</td>\n' +
        '                <td>{{upload.timelength}}</td>\n' +
        '                <td>\n' +
        '                    <img v-bind:src="upload.cover" alt="" style="width: 90px; height: 90px">\n' +
        '                </td>\n' +
        '                <td>{{upload.lyric}}</td>\n' +
        '                <td>{{upload.language}}</td>\n' +
        '                <td>{{upload.sect}}</td>\n' +
        '                <td>{{upload.publishTime}}</td>\n' +
        '                <td style="max-width: 130px">{{upload.releaseTime}}</td>\n' +
        '                <td>{{upload.copyright}}</td>\n' +
        '                <td>\n' +
        '                    <button class="delete_btn" onclick="deleteSongItem(this)" title="永久删除">\n' +
        '                        <span class="iconfont">&#xe900;</span>\n' +
        '                    </button>\n' +
        '                    <button class="pass_btn" onclick="passSongItem(this)" title="通过上传">\n' +
        '                        <span class="iconfont">&#xe640;</span>\n' +
        '                    </button>\n' +
        '                </td>\n' +
        '            </tr>\n' +
        '            </tbody>\n' +
        '        </table>\n' +
        '    </div>\n' +
        '</div>'
});

Vue.component('report', {
    props: ['reportmsg'],
    template: '' +
        '<div class="handle" id="handle">\n' +
        '    <h1>被举报的音乐</h1>' +
        '    <div class="table-responsive">\n' +
        '        <table class="table table-bordered table-striped" id="mytable">\n' +
        '            <thead>\n' +
        '            <tr>\n' +
        '                <th>举报人</th>\n' +
        '                <th>举报原因</th>\n' +
        '                <th>音乐上传者</th>\n' +
        '                <th>音乐名称</th>\n' +
        '                <th>作者</th>\n' +
        '                <th>专辑</th>\n' +
        '                <th>标签</th>\n' +
        '                <th>时长</th>\n' +
        '                <th>封面</th>\n' +
        '                <th>歌词</th>\n' +
        '                <th>派别</th>\n' +
        '                <th>首发时间</th>\n' +
        '                <th>平台发布时间</th>\n' +
        '                <th>版权号</th>\n' +
        '                <th>操作</th>\n' +
        '            </tr>\n' +
        '            </thead>\n' +
        '            <tbody>\n' +
        '            <tr v-for="(rep, index) of reportmsg" v-bind:sid="rep.id">\n' +
        '                <td>{{rep.whistleblower}}</td>\n' +
        '                <td>{{rep.reason}}</td>\n' +
        '                <td>{{rep.uploader}}</td>\n' +
        '                <td>\n' +
        '                    <a href="javascript:;" class="show_btn" onclick="showSong(this)">{{rep.songname}}</a>\n' +
        '                </td>\n' +
        '                <td>{{rep.singer}}</td>\n' +
        '                <td>{{rep.album}}</td>\n' +
        '                <td>{{rep.tag}}</td>\n' +
        '                <td>{{rep.timelength}}</td>\n' +
        '                <td>\n' +
        '                    <img v-bind:src="rep.cover" alt="" style="width: 90px; height: 90px">\n' +
        '                </td>\n' +
        '                <td>{{rep.lyric}}</td>\n' +
        '                <td>{{rep.sect}}</td>\n' +
        '                <td>{{rep.publishTime}}</td>\n' +
        '                <td style="max-width: 130px">{{rep.releaseTime}}</td>\n' +
        '                <td>{{rep.copyright}}</td>\n' +
        '                <td>\n' +
        '                    <button class="delete_btn" onclick="deleteReportItem(this)" title="永久删除">\n' +
        '                        <span class="iconfont">&#xe900;</span>\n' +
        '                    </button>\n' +
        '                    <button class="clean_btn" onclick="cleanReportItem(this)" title="忽略举报">\n' +
        '                        <span class="iconfont">&#xe697;</span>\n' +
        '                    </button>\n' +
        '                </td>\n' +
        '            </tr>\n' +
        '            </tbody>\n' +
        '        </table>\n' +
        '    </div>\n' +
        '</div>'

});

Vue.component('pass', {
    props: ['passuploadinfo'],
    template: '' +
        '<div class="handle" id="handle">\n' +
        '    <h1>已通过的上传</h1>' +
        '    <div class="table-responsive">\n' +
        '        <table class="table table-bordered table-striped" id="mytable">\n' +
        '            <thead>\n' +
        '            <tr>\n' +
        '                <th>上传者</th>\n' +
        '                <th>音乐名称</th>\n' +
        '                <th>作者</th>\n' +
        '                <th>专辑</th>\n' +
        '                <th>标签</th>\n' +
        '                <th>时长</th>\n' +
        '                <th>封面</th>\n' +
        '                <th>歌词</th>\n' +
        '                <th>语言</th>\n' +
        '                <th>派别</th>\n' +
        '                <th>首发时间</th>\n' +
        '                <th>平台发布时间</th>\n' +
        '                <th>版权号</th>\n' +
        '                <th>操作</th>\n' +
        '            </tr>\n' +
        '            </thead>\n' +
        '            <tbody>\n' +
        '            <tr v-for="(upload, index) of passuploadinfo" v-bind:sid="upload.id">\n' +
        '                <td>{{upload.uploader}}</td>\n' +
        '                <td>\n' +
        '                    <a href="javascript:;" class="show_btn" onclick="showSong(this)">{{upload.songname}}</a>\n' +
        '                </td>\n' +
        '                <td>{{upload.singer}}</td>\n' +
        '                <td>{{upload.album}}</td>\n' +
        '                <td>{{upload.tag}}</td>\n' +
        '                <td>{{upload.timelength}}</td>\n' +
        '                <td>\n' +
        '                    <img v-bind:src="upload.cover" alt="" style="width: 90px; height: 90px">\n' +
        '                </td>\n' +
        '                <td>{{upload.lyric}}</td>\n' +
        '                <td>{{upload.language}}</td>\n' +
        '                <td>{{upload.sect}}</td>\n' +
        '                <td>{{upload.publishTime}}</td>\n' +
        '                <td style="max-width: 130px">{{upload.releaseTime}}</td>\n' +
        '                <td>{{upload.copyright}}</td>\n' +
        '                <td>\n' +
        '                    <button class="delete_btn" onclick="deleteSongItem(this)" title="永久删除">\n' +
        '                        <span class="iconfont">&#xe900;</span>\n' +
        '                    </button>\n' +
        '                </td>\n' +
        '            </tr>\n' +
        '            </tbody>\n' +
        '        </table>\n' +
        '    </div>\n' +
        '</div>'
});

var manager = new Vue({
    el: '#app',
    data: {
        uploadinfo: [],  // 上传操作通知
        itemCount: '',   // 上传信息条数
        current_info: 'userupload',  // 1、当前显示组件
        last_info: 'userupload',     // 2、上次显示组件
        reportmsg: [], // 举报音乐的信息
        passuploadinfo: [], // 通过的上传信息
    },
    created: function () {
        // 自动获取上传通知
        this.getUploadSongsInfo();
        this.getReportSongInfo();
        this.getPassSongInfo();
    },
    methods: {
        // 通过上传
        passSong() {
            axios.put("/songs/pass",
                {},
                {
                    headers: {
                        'token': localStorage.getItem('token'),
                        'songId': localStorage.getItem('deleteId')
                    }
                }).then(res => {
                if (res.data.data >= 1) {
                    console.log('成功');
                    this.itemCount--;
                    songMsgDisplay();
                } else {
                    console.log('失败');
                }
                console.log(res.data.data);
            });
        },
        // 忽略 举报信息
        ignoreReport() {
            axios.delete("/songs/delete/RSI",
                {
                    headers: {
                        'token': localStorage.getItem('token'),
                        'songId': localStorage.getItem('deleteId')
                    }
                }).then(res => {
                if (res.data.data >= 1) {
                    console.log('成功');
                    this.itemCount--;
                    songMsgDisplay();
                } else {
                    console.log('失败');
                }
                console.log(res.data.data);
            });
        },
        // 获取 举报信息
        getReportSongInfo() {
            axios.get("/songs/reportSongInfo",
                {
                    headers: {
                        'token': localStorage.getItem('token'),
                    }
                }).then(res => {
                this.reportmsg = res.data.data;
                console.log("reportmsg:", this.reportmsg);
            });
        },
        // 获取 上传通知
        getUploadSongsInfo() {
            axios.get("/songs/uploadInfo",
                {
                    headers: {
                        'token': localStorage.getItem('token'),
                    }
                }
            ).then(res => {
                this.itemCount = res.data.data.length;
                this.uploadinfo = res.data.data;
                console.log("uploadinfo:", this.uploadinfo);
            })
        },
        // 获取 上传通过的音乐信息
        getPassSongInfo() {
            axios.get("/songs/passInfo",
                {
                    headers: {
                        'token': localStorage.getItem('token'),
                    }
                }
            ).then(res => {
                this.passuploadinfo = res.data.data;
                console.log("passuploadinfo:", this.passuploadinfo);
            })
        },
        // 删除音乐数据
        deleteSong() {
            console.log(localStorage.getItem('deleteId'));
            axios.delete("/songs/delete",
                {
                    data: {
                        id: localStorage.getItem('deleteId')
                    },
                    headers: {
                        'token': localStorage.getItem('token')
                    }
                }
            ).then(res => {
                if (res.data.data === 1) {
                    console.log('成功');
                    this.itemCount--;
                    songMsgDisplay();
                } else {
                    console.log('失败');
                }
                console.log(res.data.data);
            });
        },
    },
    watch: {  // 侦听器
        current_info: function () {   //当数据改变后才执行
            // 1、先更新数据
            if (this.last_info === 'userupload') {
                this.getUploadSongsInfo();
                this.getPassSongInfo();
                console.log('userupload 更新');
            } else if (this.last_info === 'report') {
                this.getReportSongInfo();
                console.log('report 更新');
            } else if (this.last_info === 'pass') {
                this.getPassSongInfo();
                console.log('pass 更新');
            }
            // 2、记录当前显示组件名
            this.last_info = this.current_info;
        },
    }
});

$(function () {
    $('.wrap').on('click', 'tbody a.show', function () {
        console.log('点击播放');
    });
});

$(document).ready(function () {
    $(".ss-menu").ssMenu({
        theme: "teal",
    });

    songMsgDisplay();
});

// 播放音乐
function showSong(link) {
    let songId = $(link).closest('tr').attr('sid');
    console.log('showSong:', songId);
    window.localStorage.setItem("songId", songId);
    window.open("player.html");
}

// 通过上传
function passSongItem(butt) {
    let $row = $(butt).parents('tr');  //accede a la fila
    let sid = $(butt).closest('tr').attr('sid');
    window.localStorage.setItem('deleteId', sid);
    let r = confirm("要“通过”这条上传内容吗？");
    if (r == true) {
        $row.remove();
        manager.passSong();
    } else {
        window.localStorage.removeItem('deleteId');
    }
    console.log(0, sid);
}

// 删除音乐（userupload组件）
function deleteSongItem(butt) {
    let $row = $(butt).parents('tr');  //accede a la fila
    let sid = $(butt).closest('tr').attr('sid');
    window.localStorage.setItem('deleteId', sid);
    let r = confirm("要“删除”这条上传内容吗？");
    if (r == true) {
        $row.remove();
        manager.deleteSong();
    } else {
        window.localStorage.removeItem('deleteId');
    }
    console.log(1, sid);
}

// 删除音乐（report组件）
function deleteReportItem(butt) {
    let sid = $(butt).closest('tr').attr('sid');
    let $row = $('#mytable tbody tr[sid=' + sid + ']');
    window.localStorage.setItem('deleteId', sid);
    let r = confirm("要“删除”这首音乐吗？");
    if (r == true) {
        $row.remove();
        manager.deleteSong();
    } else {
        window.localStorage.removeItem('deleteId');
    }
    console.log(2, sid);
}

// 删除举报信息（report组件）
function cleanReportItem(butt) {
    let sid = $(butt).closest('tr').attr('sid');
    let $row = $('#mytable tbody tr[sid=' + sid + ']');
    window.localStorage.setItem('deleteId', sid);
    let r = confirm("要“忽略”这条举报吗？");
    if (r == true) {
        $row.remove();
        manager.ignoreReport();
    } else {
        window.localStorage.removeItem('deleteId');
    }
    console.log(3, sid);
}

// 音乐信息显示
function songMsgDisplay() {
    if (manager.itemCount === 0) {
        $('.manageSong .ss-badge').hide();
    } else {
        $('.manageSong .ss-badge').show();
    }
}