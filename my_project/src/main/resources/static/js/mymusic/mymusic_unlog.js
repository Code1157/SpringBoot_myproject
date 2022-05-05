// // 已登录 重定向
// (function () {
//     if (!window.localStorage) {
//         alert("浏览器不支持localstorage");
//         return false;
//     } else {
//         //登录判断
//         var userToken = localStorage.getItem("token");
//         if (userToken !== undefined || userToken !== null || userToken !== "") {  // 已登录
//             window.location.replace("http://localhost/pages/index_mymusic_logined.html");
//         }
//     }
// }());

$(function () {
    $('.concert_hall').click(function () {
        window.location.assign('index.html');
    });

    $('.my_musics').click(function () {
        window.location.assign("mymusic_unlog.html");
    });

    $('.mod_top_login').click(function() {
        // window.location.href = "login.html";  // 效果同下
        window.location.assign("login.html");
    });

    $('.unlogin_btn').click(function () {
        window.location.assign('login.html');
    });
});