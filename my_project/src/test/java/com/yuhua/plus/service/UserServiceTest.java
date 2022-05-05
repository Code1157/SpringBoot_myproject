package com.yuhua.plus.service;

import com.yuhua.plus.dao.UserDao;
import com.yuhua.plus.domain.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class UserServiceTest {

    @Autowired
    private UserService userService;

    @Autowired
    private LoginService loginService;

    @Autowired
    private UserDao userDao;

    @Test
    void getAll() {
        System.out.println(userDao.selectList(null));
    }
}
