package com.yuhua.plus.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.yuhua.plus.controller.utils.spring_security.JwtUtil;
import com.yuhua.plus.controller.utils.spring_security.RedisCache;
import com.yuhua.plus.controller.utils.spring_security.ResponseResult;
import com.yuhua.plus.dao.SongBoxDao;
import com.yuhua.plus.dao.UserDao;
import com.yuhua.plus.dao.User_RoleDao;
import com.yuhua.plus.domain.*;
import com.yuhua.plus.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@Service
public class UserServiceImpl extends ServiceImpl<UserDao, User> implements UserService {

    @Autowired
    private UserDao userDao;

    @Autowired
    private SongBoxDao songBoxDao;

    @Autowired
    private User_RoleDao userRoleDao;

    @Autowired
    private User_Role userRole;

    @Override
    public int register(User user) {
        // 创建账户
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String encode = passwordEncoder.encode(user.getPassword());
        user.setPassword(encode);
        int i = userDao.insert(user);
        Long userId = user.getId();  // 获取新建用户id
        // 设置用户权限
        userRole.setUserId(user.getId());
        userRole.setRoleId(2L);
        userRoleDao.insert(userRole);
        // 创建默认歌单
        SongBox songBox = new SongBox();
        songBox.setTitle("默认收藏");
        songBox.setCreaterId(userId);
        songBox.setIsDefault(1);
        songBoxDao.insert(songBox);
        return i;
    }
    /**
     * 查询 账户名 是否存在
     * @param username
     * @return 1 or 0
     */
    @Override
    public int getUserByUserName(String username) {
        QueryWrapper<User> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("username", username);
        return userDao.selectCount(queryWrapper);
    }

}
