package com.yuhua.plus.service;

import com.yuhua.plus.controller.utils.spring_security.ResponseResult;
import com.yuhua.plus.domain.User;

public interface LoginService {

    ResponseResult login(User user);

    ResponseResult logout();
}
