package com.yuhua.plus.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.yuhua.plus.controller.utils.spring_security.JwtUtil;
import com.yuhua.plus.controller.utils.spring_security.RedisCache;
import com.yuhua.plus.controller.utils.spring_security.ResponseResult;
import com.yuhua.plus.dao.MenuDao;
import com.yuhua.plus.dao.UserDao;
import com.yuhua.plus.domain.LoginUser;
import com.yuhua.plus.domain.User;
import com.yuhua.plus.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@Service
public class LoginServiceImpl extends ServiceImpl<UserDao, User> implements LoginService {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private RedisCache redisCache;

    @Autowired
    private MenuDao menuDao;

    // 登录
    @Override
    public ResponseResult login(User user) {
        // AuthenticationManager authenticate进行用户认证 参数：（用户登录时输入的账户名和密码）封装成token对象
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword());
        Authentication authenticate = authenticationManager.authenticate(authenticationToken);

        // 如果认证没通过(authenticate is null)，给出对应的提示
        if (Objects.isNull(authenticate)) {
            throw new RuntimeException("登录失败");
        }

        // 如果认证通过，使用userid生成一个jwt jwt存入ResponseResult返回
        LoginUser loginUser = (LoginUser) authenticate.getPrincipal();
        String userid = loginUser.getUser().getId().toString();
        String jwt = JwtUtil.createJWT(userid);
        Map<String, String> map = new HashMap<>();
        map.put("token", jwt);
        map.put("username", loginUser.getUsername());
        map.put("nickname", loginUser.getUser().getNickname());
        map.put("avatar", loginUser.getUser().getAvatar());
        map.put("id", userid);
        List<String> authList = menuDao.selectPermsByUserId(loginUser.getUser().getId());
        map.put("identity", authList.get(0));
        // 把完整的用户信息存入redis userid作为key
        redisCache.setCacheObject("login:" + userid, loginUser);
        return new ResponseResult(200, "登录成功", map);
    }

    // 注销
    @Override
    public ResponseResult logout() {
//        //获取SecurityContextHolder中的用户id
        UsernamePasswordAuthenticationToken authentication =
                (UsernamePasswordAuthenticationToken) SecurityContextHolder.getContext().getAuthentication();
        LoginUser loginUser = (LoginUser) authentication.getPrincipal();
        Long userid = loginUser.getUser().getId();
//        //删除redis中的值
        redisCache.deleteObject("login:" + userid);
        return new ResponseResult(200, "注销成功");
    }
}
