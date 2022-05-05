package com.yuhua.plus.service;

import com.yuhua.plus.controller.utils.spring_security.ResponseResult;
import com.yuhua.plus.domain.Song;
import com.yuhua.plus.domain.User;

import java.util.List;

public interface UserService {
    int register(User user);

    int getUserByUserName(String username);

//    ResponseResult login(User user);
//
//    ResponseResult logout();
}
