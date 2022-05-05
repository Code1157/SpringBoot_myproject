// 登录检查
(function () {
    if (!window.localStorage) {
        alert("当前浏览器不支持localstorage");
        return false;
    } else {
        //登录判断
        var userToken = localStorage.getItem("token");
        if (userToken == undefined || userToken == null || userToken == "") {
            // 未登录
        } else {
            // 已登录
            window.location.replace("http://localhost/pages/index.html");
        }
    }
}());

/*
*  ==========================Vue.js==========================
* */

var loginV = new Vue({
    el: '#main',
    data: {
        formData: {},  // 登录表单数据
        reFormData: {}, // 注册表单数据
        ifPossword: '', // 重复确认密码
        loginTipUN: '',
        ifInput: {// 输入框是否填写
            username: false,
            nickname: false,
            password: false,
            ifPossword: false
        }
    },
    created() {

    },
    methods: {
        // 登录
        userLogin() {
            axios.post('/login', this.formData).then(res => {
                console.log(res.data.data);
                if (res.data.data === undefined) {
                    console.log('账号或密码错误！');
                    ShowFailure('账号或密码错误！');
                } else {
                    window.localStorage.setItem("token", res.data.data.token);  // 存储token到本地
                    window.localStorage.setItem("username", res.data.data.username);
                    window.localStorage.setItem("nickname", res.data.data.nickname);
                    window.localStorage.setItem("avatar", res.data.data.avatar);
                    window.localStorage.setItem("uid", res.data.data.id);
                    if (res.data.data.identity == "system:cm:test1") {
                        window.localStorage.setItem("identity", "user");
                    } else {
                        window.localStorage.setItem("identity", "manager");
                    }
                    console.log(res.data.data.nickname);
                    console.log(res.data.data.avatar);
                    window.location.replace("http://localhost/pages/index.html");
                }
            });
        },
        // 注册账户
        register() {
            axios.post('/users/register', this.reFormData).then(res => {
                if (res.data.data === 1) {
                    window.confirm("注册成功！马上登录吧↙")
                    console.log('data:', res.data.data);
                } else {
                    window.alert("注册失败，结果" + res.data.data);
                }
            });
        },
        // 查询是否有该账户名
        checkUsername(username) {
            axios.get('/users/' + username).then(res => {
                if (res.data.data !== 1) {
                    unNotExist();
                    this.ifInput.username = true;
                } else {
                    unExist();
                    this.ifInput.username = false;
                }
            });
        },
    },
    watch: {  // 侦听器
        ifPossword: function () {
            // // 当密码栏不为空
            if (this.reFormData.password != undefined && this.reFormData.password != '') {
                // 不相等
                if (this.ifPossword != this.reFormData.password) {
                    pwNotEqual()
                    this.ifInput.ifPossword = false;
                } else {
                    pwEqual();
                    this.ifInput.ifPossword = true;
                }
            } else {
                pwIsEmpty()
                this.ifInput.ifPossword = false;
            }
        },
        ifInput: {
            handler: function (newV, oldV) {  // deep 深侦听
                var count = 4;
                $.each(this.ifInput, function (index, val) {
                    if (val === false) {
                        regOff();  // 禁用注册按钮
                        count--;
                        console.log(index, val);
                        return false;
                    }
                });
                if (count === 4) {
                    regOn();  // 启用注册按钮
                }
            },
            deep: true,
            immediate: true
        }
    }
});

/*
*  ========================JavaScript/JQuery===========================
* */

// 账户名重复检查
function unExist() {
    $('#register_username')
        .next()
        .removeClass('warn_green')
        .addClass('warn_red')
        .text('账户名已存在，请更换');
}

function unNotExist() {
    $('#register_username')
        .next()
        .removeClass('warn_red')
        .addClass('warn_green')
        .text('√√√');
}

function unIsEmpty() {
    $('#register_username')
        .next()
        .removeClass('warn_green')
        .addClass('warn_red')
        .text('用户名不能为空');
}

// 密码确认
function pwNotEqual() {
    $('#register_repassword')
        .next()
        .removeClass('warn_green')
        .addClass('warn_red')
        .text("重复密码不相等，请重新输入！");
}

function pwEqual() {
    $('#register_repassword')
        .next()
        .removeClass('warn_red')
        .addClass('warn_green')
        .text("√√√");
}

function pwIsEmpty() {
    $('#register_repassword')
        .next()
        .removeClass('warn_green')
        .addClass('warn_red')
        .text("密码不能为空");
}

// 注册 按钮 开关
// 开
function regOn() {
    $('#submitto_reg')
        .removeClass('off')
        .attr("disabled", false);
}

// 关
function regOff() {
    $('#submitto_reg')
        .addClass('off')
        .attr("disabled", true);
}

$(function () {
    /*
    * ======================注册表单
    * */
    // 注册 按钮 开关
    $('#submitto_reg').attr("disabled", true);
    $('#submitto_reg').click(function () {
        loginV.register();
        console.log('注册按钮');
        // 清空
        $('#register_username').val('');
        $('#register_nickname').val('');
        $('#register_email').val('');
        $('#register_password').val('');
        $('#register_repassword').val('');
        $('.login_option ul li:first-child').trigger('click');
    });

    // username
    $('#register_username').on({
        blur: function () {
            var account = loginV.reFormData.username;
            if (account != undefined && account.toString().trim() != "") {
                // GET请求 判断账户是否存在
                loginV.checkUsername(account);
            } else {
                loginV.ifInput.username = false;
                unIsEmpty();
            }
            console.log(loginV.ifInput);
        }
    });
    // nickname
    $('#register_nickname').on({
        blur: function () {
            var account = loginV.reFormData.nickname;
            if (account) {
                loginV.ifInput.nickname = true;
            } else {
                loginV.ifInput.nickname = false;
            }
            console.log(loginV.ifInput);
        }
    });
    // password
    $('#register_password').on({
        blur: function () {
            var account = loginV.reFormData.password;
            if (account) {
                loginV.ifInput.password = true;
            } else {
                loginV.ifInput.password = false;
            }
            console.log(loginV.ifInput);
        }
    });


    /*
    * ======================登录表单
    * */

    // 选项卡start
    var options = $('.options');
    var log_table = $('.login');
    var reg_table = $('.register');

    $('#main').on('click', '.login_nav ul li', function () {
        var index = $(this).index();
        $(".login_nav ul li")
            .eq(index)
            .addClass('current')
            .siblings()
            .removeClass('current');
        // 选项卡内容
        if (index == 0) {
            reg_table.css('display', 'none');
            reg_table.detach();
            options.after(log_table);
        } else if (index == 1) {
            log_table.detach();
            options.after(reg_table);
            reg_table.css('display', 'table-row');
        }
    });
    reg_table.detach(); // 移除注册表单
    // end选项卡
});

window.onload = function (ev) {

};


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