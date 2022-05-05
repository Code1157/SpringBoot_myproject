package com.yuhua.plus.controller;

import com.yuhua.plus.controller.utils.spring_security.ResponseResult;
import com.yuhua.plus.domain.User;
import com.yuhua.plus.service.LoginService;
import com.yuhua.plus.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping
public class LoginController {

    @Autowired
    private LoginService loginService;

    // 登录
    @PostMapping(value = "/login")
    public ResponseResult login(@RequestBody User user) {
        System.out.println("user:\n"+user);
        return loginService.login(user);
    }

    // 登出
    @RequestMapping(value = "/user/logout")
    public ResponseResult logout() {
        return loginService.logout();
    }
}
