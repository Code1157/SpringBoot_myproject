package com.yuhua.plus.controller;


import com.yuhua.plus.controller.utils.R;
import com.yuhua.plus.domain.User;
import com.yuhua.plus.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/hello")
//    @PreAuthorize("hasAuthority('system:mg:test1')")  //判断用户信息中是否有‘test’权限，有为true，否则为false
    public String hello() {
        return "hello world!";
    }

    // 注册
    @PostMapping("/register")
    public R register(@RequestBody User user) {
        System.out.println("账户: \n"+user);
        return new R(true, userService.register(user));
    }

    // 查询账户是否存在
    @GetMapping("/{username}")
    public R checkUserByUserName(@PathVariable String username) {
        int influence = userService.getUserByUserName(username);
        return new R(true, influence);
    }

}
