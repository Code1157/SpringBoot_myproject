$(function () {
    $(".profile_avatar_link img").attr('src', localStorage.getItem('avatar'));

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
});