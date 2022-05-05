package com.yuhua.plus.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.yuhua.plus.dao.MenuDao;
import com.yuhua.plus.dao.UserDao;
import com.yuhua.plus.domain.LoginUser;
import com.yuhua.plus.domain.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private UserDao userDao;

    @Autowired
    private MenuDao menuDao;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // 查询用户信息
        LambdaQueryWrapper<User> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(User::getUsername, username);
        User user = userDao.selectOne(queryWrapper);
        // 如果没有查询到 账户信息
        if (Objects.isNull(user)) {
            throw new RuntimeException("用户名或者密码错误");
        }


        // 查询对应的权限信息 （鉴权）
//        List<String> list = new ArrayList<>(Arrays.asList("test", "admin"));
        List<String> menu_list = menuDao.selectPermsByUserId(user.getId());

        //把数据封装成UserDetails 返回
        return new LoginUser(user, menu_list);
    }
}
